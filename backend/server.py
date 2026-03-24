from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone
import re
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase connection
supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL') or os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY') or os.environ.get('SUPABASE_ANON_KEY')
supabase_service_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = None
supabase_admin: Client = None

# Only create client if valid credentials are provided
if supabase_url and supabase_key and supabase_url != 'placeholder' and supabase_key != 'placeholder':
    try:
        supabase = create_client(supabase_url, supabase_key)
        logging.info("Supabase client initialized successfully")
    except Exception as e:
        logging.warning(f"Failed to initialize Supabase client: {e}")
        supabase = None
else:
    logging.warning("Supabase credentials not configured. Database features will be disabled.")

# Admin client (bypasses RLS) for admin-only operations
if supabase_url and supabase_service_key:
    try:
        supabase_admin = create_client(supabase_url, supabase_service_key)
        logging.info("Supabase admin client initialized successfully")
    except Exception as e:
        logging.warning(f"Failed to initialize Supabase admin client: {e}")
        supabase_admin = None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Models ============

# Site Content Models
class SiteContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: Any  # Can be int or UUID string in Supabase
    title: str
    type: Optional[str] = None  # 'video', 'book', or 'game' - can be null
    url: str
    thumbnail_url: Optional[str] = None

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: Optional[str] = None  # UUID in Supabase
    email: str
    created_at: Optional[datetime] = None

class NewsletterSubscribeRequest(BaseModel):
    email: str

class NewsletterSubscribeResponse(BaseModel):
    success: bool
    message: str

# Game Stats Models
class GameStats(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: Optional[int] = None
    user_id: str
    score: int = 0
    inventory: dict = Field(default_factory=dict)  # JSONB for badges/XP/factions
    last_played: Optional[datetime] = None

class GameStatsCreate(BaseModel):
    user_id: str
    score: int = 0
    inventory: dict = Field(default_factory=dict)

class GameStatsUpdate(BaseModel):
    score: Optional[int] = None
    inventory: Optional[dict] = None


# Progress Sync Models
class ProgressData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    xp: int = 0
    quests_completed: List[str] = Field(default_factory=list)
    badges: List[str] = Field(default_factory=list)
    heroes_unlocked: List[str] = Field(default_factory=list)
    selected_avatar: str = "gerry"
    daily_streak: int = 0
    last_daily_claim: Optional[str] = None

class ProgressSyncRequest(BaseModel):
    device_id: str
    progress: ProgressData

class ProgressSyncResponse(BaseModel):
    device_id: str
    progress: dict
    last_sync: Optional[str] = None

# Leaderboard Models
class LeaderboardEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    player_name: str = "Anonymous"
    game: str
    score: int
    created_at: Optional[str] = None

# Gerry Chat Models
class GerryChatRequest(BaseModel):
    message: str
    hero: str = "gerry"
    session_id: str = "default"

class GerryChatResponse(BaseModel):
    reply: str
    source: str = "llm"


# ============ Helper Functions ============

def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def check_supabase():
    """Check if Supabase is configured and raise error if not"""
    if supabase is None:
        raise HTTPException(
            status_code=503, 
            detail="Database not configured. Please set Supabase credentials."
        )


# ============ Routes ============

# Health check
@api_router.get("/")
async def root():
    return {
        "message": "BlockQuest API", 
        "status": "healthy", 
        "database": "supabase" if supabase else "not configured"
    }


# ------------ Site Content ------------

@api_router.get("/content", response_model=List[SiteContent])
async def get_all_content():
    """Get all site content (videos, books, games)"""
    check_supabase()
    try:
        response = supabase.table("site_content").select("*").execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching content: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch content")

@api_router.get("/content/videos", response_model=List[SiteContent])
async def get_videos():
    """Get all video content"""
    check_supabase()
    try:
        response = supabase.table("site_content").select("*").eq("type", "video").execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching videos: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch videos")

@api_router.get("/content/books", response_model=List[SiteContent])
async def get_books():
    """Get all book content"""
    check_supabase()
    try:
        response = supabase.table("site_content").select("*").eq("type", "book").execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching books: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch books")

@api_router.get("/content/games", response_model=List[SiteContent])
async def get_games():
    """Get all game content"""
    check_supabase()
    try:
        response = supabase.table("site_content").select("*").eq("type", "game").execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching games: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch games")


# ------------ Newsletter ------------

@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscribeResponse)
async def subscribe_newsletter(request: NewsletterSubscribeRequest):
    """Subscribe to newsletter"""
    check_supabase()
    email = request.email.strip().lower()
    
    # Validate email
    if not email or not is_valid_email(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address")
    
    try:
        # Check if already subscribed
        existing = supabase.table("newsletter_subscribers").select("*").eq("email", email).execute()
        
        if existing.data and len(existing.data) > 0:
            return NewsletterSubscribeResponse(
                success=True,
                message="You're already subscribed! Thanks for being part of the BlockQuest crew! 🎮"
            )
        
        # Insert new subscriber
        supabase.table("newsletter_subscribers").insert({
            "email": email,
            "created_at": datetime.now(timezone.utc).isoformat()
        }).execute()
        
        logging.info(f"New newsletter subscriber: {email}")
        
        return NewsletterSubscribeResponse(
            success=True,
            message="Welcome to the BlockQuest crew! 🚀 You'll be the first to know about new chaos!"
        )
    except Exception as e:
        logging.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe. Please try again!")

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscriber])
async def get_subscribers():
    """Get all newsletter subscribers (admin - uses service_role to bypass RLS)"""
    admin = supabase_admin or supabase
    if not admin:
        raise HTTPException(status_code=503, detail="Database not configured.")
    try:
        response = admin.table("newsletter_subscribers").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching subscribers: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscribers")


# ------------ Game Stats ------------

@api_router.get("/game/stats/{user_id}", response_model=GameStats)
async def get_game_stats(user_id: str):
    """Get game stats for a user"""
    check_supabase()
    try:
        response = supabase.table("game_stats").select("*").eq("user_id", user_id).execute()
        
        if not response.data or len(response.data) == 0:
            # Return default stats if user doesn't exist
            return GameStats(
                user_id=user_id,
                score=0,
                inventory={"xp": 0, "badges": [], "faction": None},
                last_played=None
            )
        
        return response.data[0]
    except Exception as e:
        logging.error(f"Error fetching game stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch game stats")

@api_router.post("/game/stats", response_model=GameStats)
async def create_game_stats(stats: GameStatsCreate):
    """Create game stats for a new user"""
    check_supabase()
    try:
        data = {
            "user_id": stats.user_id,
            "score": stats.score,
            "inventory": stats.inventory,
            "last_played": datetime.now(timezone.utc).isoformat()
        }
        
        response = supabase.table("game_stats").insert(data).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        
        raise HTTPException(status_code=500, detail="Failed to create game stats")
    except Exception as e:
        logging.error(f"Error creating game stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to create game stats")

@api_router.put("/game/stats/{user_id}", response_model=GameStats)
async def update_game_stats(user_id: str, stats: GameStatsUpdate):
    """Update game stats for a user"""
    check_supabase()
    try:
        # Check if user exists
        existing = supabase.table("game_stats").select("*").eq("user_id", user_id).execute()
        
        update_data = {"last_played": datetime.now(timezone.utc).isoformat()}
        
        if stats.score is not None:
            update_data["score"] = stats.score
        if stats.inventory is not None:
            update_data["inventory"] = stats.inventory
        
        if existing.data and len(existing.data) > 0:
            # Update existing
            response = supabase.table("game_stats").update(update_data).eq("user_id", user_id).execute()
        else:
            # Create new
            update_data["user_id"] = user_id
            update_data["score"] = stats.score or 0
            update_data["inventory"] = stats.inventory or {"xp": 0, "badges": [], "faction": None}
            response = supabase.table("game_stats").insert(update_data).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        
        raise HTTPException(status_code=500, detail="Failed to update game stats")
    except Exception as e:
        logging.error(f"Error updating game stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to update game stats")

@api_router.delete("/game/stats/{user_id}")
async def delete_game_stats(user_id: str):
    """Delete game stats for a user"""
    check_supabase()
    try:
        supabase.table("game_stats").delete().eq("user_id", user_id).execute()
        return {"success": True, "message": "Game stats deleted"}
    except Exception as e:
        logging.error(f"Error deleting game stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete game stats")


# ============ Progress Sync (localStorage → Supabase) ============

@api_router.get("/progress/{device_id}")
async def get_progress(device_id: str):
    """Fetch player progress by device UUID"""
    check_supabase()
    try:
        progress_id = f"{device_id}_hub"
        resp = supabase.table("game_progress").select("*").eq("id", progress_id).execute()
        if resp.data and len(resp.data) > 0:
            row = resp.data[0]
            inv = row.get("inventory", {}) or {}
            return {
                "device_id": device_id,
                "progress": inv,
                "xp": inv.get("xp", 0),
                "level": row.get("current_level", 1),
                "last_sync": inv.get("_synced_at")
            }
        return {"device_id": device_id, "progress": None, "xp": 0, "level": 1, "last_sync": None}
    except Exception as e:
        logging.error(f"Error fetching progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch progress")

@api_router.put("/progress/{device_id}")
async def save_progress(device_id: str, request: ProgressSyncRequest):
    """Save/update player progress to Supabase using game_progress table"""
    check_supabase()
    try:
        progress_dict = request.progress.model_dump()
        xp = progress_dict.get("xp", 0)
        progress_id = f"{device_id}_hub"
        sync_ts = datetime.now(timezone.utc).isoformat()

        # Check if row exists
        resp = supabase.table("game_progress").select("id").eq("id", progress_id).execute()
        if resp.data and len(resp.data) > 0:
            supabase.table("game_progress").update({
                "inventory": {**progress_dict, "_synced_at": sync_ts},
                "current_level": max(1, xp // 100 + 1),
            }).eq("id", progress_id).execute()
        else:
            supabase.table("game_progress").insert({
                "id": progress_id,
                "player_id": device_id,
                "current_level": max(1, xp // 100 + 1),
                "inventory": {**progress_dict, "_synced_at": sync_ts},
            }).execute()

        return {"success": True, "device_id": device_id, "synced_at": sync_ts}
    except Exception as e:
        logging.error(f"Error saving progress: {e}")
        raise HTTPException(status_code=500, detail="Failed to save progress")


# ============ Player Profile (Display Name) ============

class ProfileUpdateRequest(BaseModel):
    display_name: str

@api_router.get("/profile/{device_id}")
async def get_profile(device_id: str):
    """Get player profile (display name) from game_progress hub entry"""
    check_supabase()
    try:
        progress_id = f"{device_id}_hub"
        resp = supabase.table("game_progress").select("user_name,inventory").eq("id", progress_id).execute()
        if resp.data and len(resp.data) > 0:
            row = resp.data[0]
            inv = row.get("inventory") or {}
            # inventory can be list (game data) or dict (hub data)
            display_name = row.get("user_name") or ""
            if isinstance(inv, dict):
                display_name = display_name or inv.get("display_name", "")
            return {"device_id": device_id, "display_name": display_name}
        return {"device_id": device_id, "display_name": ""}
    except Exception as e:
        logging.error(f"Error fetching profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch profile")

@api_router.put("/profile/{device_id}")
async def update_profile(device_id: str, request: ProfileUpdateRequest):
    """Set player display name in game_progress hub entry"""
    check_supabase()
    try:
        name = request.display_name.strip()[:20]
        if not name:
            raise HTTPException(status_code=400, detail="Display name cannot be empty")

        progress_id = f"{device_id}_hub"
        resp = supabase.table("game_progress").select("inventory").eq("id", progress_id).execute()

        if resp.data and len(resp.data) > 0:
            inv = resp.data[0].get("inventory") or {}
            if isinstance(inv, dict):
                inv["display_name"] = name
            else:
                inv = {"display_name": name}
            supabase.table("game_progress").update({
                "user_name": name,
                "inventory": inv
            }).eq("id", progress_id).execute()
        else:
            # Use progress_id as both id and player_id to avoid unique constraint
            supabase.table("game_progress").insert({
                "id": progress_id,
                "player_id": progress_id,
                "current_level": 1,
                "current_phase": "hub",
                "user_name": name,
                "inventory": {"display_name": name, "_synced_at": datetime.now(timezone.utc).isoformat()}
            }).execute()

        # Also update any leaderboard entries for this device
        try:
            lb_entries = supabase.table("game_progress").select("id").eq("current_phase", "leaderboard").like("id", f"lb_{device_id}_%").execute()
            for entry in (lb_entries.data or []):
                supabase.table("game_progress").update({"user_name": name}).eq("id", entry["id"]).execute()
        except Exception:
            pass

        return {"success": True, "device_id": device_id, "display_name": name}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to update profile")


# ============ Leaderboard ============

@api_router.get("/leaderboard")
async def get_leaderboard(game: Optional[str] = None, limit: int = 50):
    """Get leaderboard: merges demo scores + real player scores"""
    check_supabase()
    try:
        # 1. Demo scores from scores table
        query = supabase.table("scores").select("*").order("score", desc=True).limit(limit)
        if game:
            query = query.eq("game", game)
        demo_resp = query.execute()

        anon_names = [
            'CryptoKid', 'BlockMaster', 'GoatRider', 'NFTNinja', 'TokenTornado',
            'ChainChamp', 'HashHero', 'MintMonster', 'DeFiDragon', 'WalletWizard',
            'PixelPioneer', 'ByteBoss', 'CodeCrusader', 'DataDuke', 'BitBandit',
            'SatoshiJr', 'EtherEagle', 'MinerMike', 'StakeShark', 'AirdropAce',
        ]

        all_entries = []
        for i, row in enumerate(demo_resp.data):
            all_entries.append({
                "id": row.get("id"),
                "player_name": anon_names[i % len(anon_names)],
                "game": row.get("game", "unknown"),
                "score": row.get("score", 0),
                "faction_bonus": row.get("faction_bonus", 0),
                "created_at": row.get("created_at"),
                "is_real": False
            })

        # 2. Real player scores from game_progress (leaderboard entries)
        try:
            lb_query = supabase.table("game_progress").select("*").eq("current_phase", "leaderboard")
            lb_resp = lb_query.execute()
            for row in (lb_resp.data or []):
                inv = row.get("inventory") or {}
                if not isinstance(inv, dict):
                    continue
                entry_game = inv.get("game", "unknown")
                entry_score = inv.get("score", 0)
                if game and entry_game != game:
                    continue
                all_entries.append({
                    "id": row.get("id"),
                    "player_name": row.get("user_name") or inv.get("display_name") or "Explorer",
                    "game": entry_game,
                    "score": entry_score,
                    "faction_bonus": inv.get("faction_bonus", 0),
                    "created_at": row.get("created_at"),
                    "is_real": True
                })
        except Exception as e:
            logging.warning(f"Could not fetch real player scores: {e}")

        # Sort all by score descending and assign ranks
        all_entries.sort(key=lambda x: x["score"], reverse=True)
        for i, entry in enumerate(all_entries[:limit]):
            entry["rank"] = i + 1

        return {"leaderboard": all_entries[:limit], "total": len(all_entries[:limit]), "game_filter": game}
    except Exception as e:
        logging.error(f"Error fetching leaderboard: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch leaderboard")


class ScoreSubmitRequest(BaseModel):
    device_id: str
    game: str
    score: int
    player_name: str = "Explorer"

@api_router.post("/leaderboard/submit")
async def submit_score(request: ScoreSubmitRequest):
    """Submit a player score to the leaderboard via game_progress"""
    check_supabase()
    try:
        game_slug = request.game.lower().replace(" ", "_")
        entry_id = f"lb_{request.device_id}_{game_slug}"
        # Use a unique player_id per device+game to avoid unique constraint
        lb_player_id = f"lb_{request.device_id}_{game_slug}"
        name = request.player_name.strip()[:20] or "Explorer"

        # Check if entry exists (one best score per device per game)
        existing = supabase.table("game_progress").select("inventory").eq("id", entry_id).execute()

        if existing.data and len(existing.data) > 0:
            old_inv = existing.data[0].get("inventory") or {}
            old_score = old_inv.get("score", 0) if isinstance(old_inv, dict) else 0
            # Only update if new score is higher
            if request.score <= old_score:
                return {"success": True, "message": "Existing score is higher", "entry": {
                    "game": request.game, "score": old_score, "player_name": name
                }}
            supabase.table("game_progress").update({
                "user_name": name,
                "inventory": {
                    "type": "leaderboard",
                    "game": request.game,
                    "score": request.score,
                    "display_name": name,
                    "submitted_at": datetime.now(timezone.utc).isoformat()
                }
            }).eq("id", entry_id).execute()
        else:
            supabase.table("game_progress").insert({
                "id": entry_id,
                "player_id": lb_player_id,
                "current_level": 1,
                "current_phase": "leaderboard",
                "user_name": name,
                "inventory": {
                    "type": "leaderboard",
                    "game": request.game,
                    "score": request.score,
                    "display_name": name,
                    "submitted_at": datetime.now(timezone.utc).isoformat()
                }
            }).execute()

        return {"success": True, "entry": {
            "game": request.game, "score": request.score, "player_name": name
        }}
    except Exception as e:
        logging.error(f"Error submitting score: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit score")

@api_router.get("/leaderboard/games")
async def get_game_list():
    """Get list of games with scores"""
    check_supabase()
    try:
        # Get games from both sources
        games_set = set()
        resp = supabase.table("scores").select("game").execute()
        for row in resp.data:
            if row.get("game"):
                games_set.add(row["game"])
        try:
            lb_resp = supabase.table("game_progress").select("inventory").eq("current_phase", "leaderboard").execute()
            for row in (lb_resp.data or []):
                inv = row.get("inventory") or {}
                if isinstance(inv, dict) and inv.get("game"):
                    games_set.add(inv["game"])
        except Exception:
            pass
        return {"games": sorted(games_set)}
    except Exception as e:
        logging.error(f"Error fetching game list: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch game list")


# ============ Gerry AI Chat (LLM-powered) ============

gerry_chats: Dict[str, Any] = {}

# Gerry Conversation History Models
class GerryHistoryMessage(BaseModel):
    role: str
    text: str
    ts: int

class GerryHistorySaveRequest(BaseModel):
    messages: List[GerryHistoryMessage]
    game: str = "hub"

GERRY_SYSTEM_PROMPT = """You are Gerry the Goat, a fun and friendly Web3 companion for kids on BlockQuest. 
Your personality: cheerful, encouraging, a bit silly (you're a goat after all!), and passionate about teaching blockchain/Web3 concepts.

Rules:
- Keep ALL responses kid-friendly (ages 8-14)
- Explain Web3/blockchain concepts using simple analogies (lunchboxes, playgrounds, trading cards)
- Keep responses SHORT (2-3 sentences max)
- Use occasional goat puns ("baaaa-rilliant!", "that's no kidding!")
- Never mention real cryptocurrency prices, trading, or investing
- If asked about the current hero, personalize your response
- If asked for a game hint, give educational Web3 tips related to the game
- You can reference these BlockQuest games: Retro Arcade, Miners, Wallet Adventure, NFT Studio, Mini Money Quest
- Always be encouraging, especially when someone seems stuck
- End responses with a fun follow-up question when appropriate"""

@api_router.post("/gerry/chat")
async def gerry_chat(request: GerryChatRequest):
    """Chat with Gerry using LLM (with rule-based fallback)"""
    llm_key = os.environ.get("EMERGENT_LLM_KEY")

    if llm_key:
        try:
            from emergentintegrations.llm.chat import LlmChat, UserMessage

            session_key = f"gerry_{request.session_id}"
            if session_key not in gerry_chats:
                hero_context = f"\nThe current player's hero is: {request.hero}. Personalize responses to mention this character."
                gerry_chats[session_key] = LlmChat(
                    api_key=llm_key,
                    session_id=session_key,
                    system_message=GERRY_SYSTEM_PROMPT + hero_context
                ).with_model("openai", "gpt-4.1-mini")

            chat = gerry_chats[session_key]
            user_msg = UserMessage(text=request.message)
            reply = await chat.send_message(user_msg)
            return {"reply": reply, "source": "llm"}
        except Exception as e:
            logging.warning(f"LLM call failed, falling back to rules: {e}")

    # Rule-based fallback
    return {"reply": _rule_based_response(request.message, request.hero), "source": "rules"}

def _rule_based_response(msg: str, hero: str) -> str:
    q = msg.lower()
    knowledge = {
        "blockchain": "A blockchain is like a digital notebook everyone shares! Once you write in it, nobody can change it.",
        "bitcoin": "Bitcoin is digital gold — the very first cryptocurrency, invented in 2009!",
        "mining": "Mining is computers racing to solve puzzles. Winners add pages to the blockchain and earn crypto!",
        "wallet": "A crypto wallet is a digital piggy bank with a public address (mailbox) and private key (secret combo).",
        "nft": "An NFT is a one-of-a-kind digital certificate proving YOU own something unique online!",
        "token": "Tokens are like digital arcade coins — they can represent points, votes, or ownership!",
        "web3": "Web3 is the internet where YOU own your stuff. Web1=read, Web2=read+write, Web3=read+write+OWN!",
    }
    for key, answer in knowledge.items():
        if key in q:
            return answer
    if any(w in q for w in ["hello", "hi", "hey"]):
        return f"Hey there! I'm Gerry the Goat, your Web3 buddy! Ask me about blockchain, tokens, or NFTs!"
    if any(w in q for w in ["hint", "help", "stuck"]):
        return "Don't worry — every great explorer gets stuck sometimes! Try breaking the problem into smaller steps."
    if any(w in q for w in ["story", "what if", "imagine"]):
        return f"What if {hero} discovered a secret level in the blockchain that gives unlimited knowledge tokens? They'd share them with everyone!"
    return "Baaaa-rilliant question! Try asking about blockchain, NFTs, mining, or say 'hint' for game tips!"


# ─── Gerry Cross-Game Conversation Sync ─────────────────────

@api_router.get("/gerry/history/{device_id}")
async def get_gerry_history(device_id: str, game: Optional[str] = None):
    """Fetch Gerry conversation history for a device, optionally filtered by game"""
    check_supabase()
    try:
        history_id = f"gerry_{device_id}"
        resp = supabase.table("game_progress").select("inventory").eq("id", history_id).execute()
        if resp.data and len(resp.data) > 0:
            inv = resp.data[0].get("inventory") or {}
            if isinstance(inv, dict):
                all_messages = inv.get("messages", [])
                if game:
                    # Filter messages by game source
                    all_messages = [m for m in all_messages if m.get("game", "hub") == game or m.get("game") is None]
                return {"device_id": device_id, "messages": all_messages[-50:], "total": len(all_messages)}
            return {"device_id": device_id, "messages": [], "total": 0}
        return {"device_id": device_id, "messages": [], "total": 0}
    except Exception as e:
        logging.error(f"Error fetching gerry history: {e}")
        return {"device_id": device_id, "messages": [], "total": 0}

@api_router.put("/gerry/history/{device_id}")
async def save_gerry_history(device_id: str, request: GerryHistorySaveRequest):
    """Save/merge Gerry conversation history for cross-game sync"""
    check_supabase()
    try:
        history_id = f"gerry_{device_id}"
        history_player_id = f"gerry_{device_id}"
        new_messages = [{"role": m.role, "text": m.text, "ts": m.ts, "game": request.game} for m in request.messages]

        resp = supabase.table("game_progress").select("inventory").eq("id", history_id).execute()

        if resp.data and len(resp.data) > 0:
            inv = resp.data[0].get("inventory") or {}
            if not isinstance(inv, dict):
                inv = {}
            existing = inv.get("messages", [])
            # Merge: add new messages that don't already exist (by timestamp)
            existing_ts = set(m.get("ts", 0) for m in existing)
            merged = existing + [m for m in new_messages if m["ts"] not in existing_ts]
            # Keep last 100 messages
            merged = merged[-100:]
            inv["messages"] = merged
            inv["last_sync"] = datetime.now(timezone.utc).isoformat()
            inv["last_game"] = request.game
            supabase.table("game_progress").update({"inventory": inv}).eq("id", history_id).execute()
        else:
            supabase.table("game_progress").insert({
                "id": history_id,
                "player_id": history_player_id,
                "current_level": 1,
                "current_phase": "gerry_history",
                "inventory": {
                    "messages": new_messages[-100:],
                    "last_sync": datetime.now(timezone.utc).isoformat(),
                    "last_game": request.game,
                }
            }).execute()

        return {"success": True, "synced": len(new_messages)}
    except Exception as e:
        logging.error(f"Error saving gerry history: {e}")
        return {"success": False, "error": str(e)}


# ============ Admin / RLS Management ============

ALL_TABLES = [
    "site_content", "unified_games", "factions", "game_progress",
    "profiles", "unified_user_achievements", "game_stats",
    "smart_contracts", "player_progress", "newsletter_subscribers",
    "unified_faq_items", "unified_page_content", "unified_achievements",
    "notebooks", "unified_scores", "users", "scores"
]

class RlsApplyRequest(BaseModel):
    service_role_key: Optional[str] = None
    db_connection_string: Optional[str] = None

@api_router.get("/admin/rls-audit")
async def rls_audit():
    """Audit RLS status of all tables by probing with anon key"""
    check_supabase()

    results = []
    for table_name in ALL_TABLES:
        table_result = {
            "table": table_name,
            "select": "unknown",
            "insert": "unknown",
        }
        # Test SELECT
        try:
            resp = supabase.table(table_name).select("*").limit(1).execute()
            table_result["select"] = "allowed"
            table_result["row_count_sample"] = len(resp.data)
        except Exception as e:
            err_msg = str(e)
            if "42501" in err_msg or "row-level security" in err_msg:
                table_result["select"] = "blocked_by_rls"
            elif "relation" in err_msg and "does not exist" in err_msg:
                table_result["select"] = "table_not_found"
            else:
                table_result["select"] = f"error: {err_msg[:100]}"

        # Test INSERT with a probe (will rollback)
        try:
            probe_data = {"id": "rls_probe_" + str(uuid.uuid4())[:8]}
            resp = supabase.table(table_name).insert(probe_data).execute()
            table_result["insert"] = "allowed_WARNING"
            # Clean up probe
            try:
                if resp.data and len(resp.data) > 0:
                    row_id = resp.data[0].get("id")
                    if row_id:
                        supabase.table(table_name).delete().eq("id", row_id).execute()
            except Exception:
                pass
        except Exception as e:
            err_msg = str(e)
            if "42501" in err_msg or "row-level security" in err_msg:
                table_result["insert"] = "blocked_by_rls"
            elif "violates not-null" in err_msg or "null value" in err_msg:
                table_result["insert"] = "blocked_schema_validation"
            elif "invalid input syntax" in err_msg:
                table_result["insert"] = "blocked_type_validation"
            else:
                table_result["insert"] = f"error: {err_msg[:100]}"

        results.append(table_result)

    # Classify issues
    warnings = []
    for r in results:
        if r["insert"] == "allowed_WARNING":
            warnings.append(f"{r['table']}: INSERT wide open (anon can write)")
        if r["select"] == "blocked_by_rls" and r["table"] in ["site_content", "unified_games", "factions"]:
            warnings.append(f"{r['table']}: SELECT blocked (should be public read)")

    return {
        "audit_time": datetime.now(timezone.utc).isoformat(),
        "total_tables": len(results),
        "tables": results,
        "warnings": warnings,
        "service_role_configured": supabase_service_key is not None
    }


@api_router.post("/admin/apply-rls")
async def apply_rls(request: RlsApplyRequest):
    """Apply RLS migration using Supabase Management API or service role key"""
    service_key = request.service_role_key or supabase_service_key
    if not service_key:
        # Return the SQL for manual application
        sql_path = ROOT_DIR / "migrations" / "fix_rls_policies.sql"
        if sql_path.exists():
            sql_content = sql_path.read_text()
            return {
                "status": "manual_required",
                "message": "No service_role_key provided. Apply this SQL in Supabase Dashboard > SQL Editor.",
                "sql": sql_content,
                "instructions": [
                    "1. Go to your Supabase Dashboard: https://supabase.com/dashboard",
                    "2. Select your BlockQuest project",
                    "3. Click 'SQL Editor' in the left sidebar",
                    "4. Click 'New Query'",
                    "5. Paste the SQL below and click 'Run'",
                    "6. Verify: All tables should show green RLS icons",
                    "7. Come back here and hit GET /api/admin/rls-verify to confirm"
                ]
            }

    # Try to apply using service_role key + Supabase SQL endpoint
    try:
        sql_path = ROOT_DIR / "migrations" / "fix_rls_policies.sql"
        if not sql_path.exists():
            raise HTTPException(status_code=500, detail="Migration file not found")

        sql_content = sql_path.read_text()

        # Use Supabase REST API with service_role to execute SQL via pg-meta
        # The /pg/query endpoint allows SQL execution with service_role
        project_ref = supabase_url.replace("https://", "").replace(".supabase.co", "")

        headers = {
            "apikey": service_key,
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "application/json"
        }

        # Split SQL into individual statements and execute via RPC
        # Try the pg-meta endpoint first
        async with httpx.AsyncClient(timeout=60.0) as client:
            # Method: Use supabase-js compatible SQL execution
            resp = await client.post(
                f"{supabase_url}/rest/v1/rpc/exec_sql",
                headers=headers,
                json={"query": sql_content}
            )

            if resp.status_code == 404:
                # exec_sql function doesn't exist, return manual instructions
                return {
                    "status": "manual_required",
                    "message": "SQL execution endpoint not available. Apply this SQL in Supabase Dashboard > SQL Editor.",
                    "sql": sql_content,
                    "instructions": [
                        "1. Go to Supabase Dashboard > SQL Editor",
                        "2. Paste the SQL and click 'Run'",
                        "3. Verify with GET /api/admin/rls-verify"
                    ]
                }

            if resp.status_code >= 400:
                return {
                    "status": "error",
                    "message": f"SQL execution failed: {resp.text}",
                    "sql": sql_content
                }

            return {
                "status": "applied",
                "message": "RLS policies applied successfully!",
                "details": resp.json() if resp.headers.get("content-type", "").startswith("application/json") else resp.text
            }

    except Exception as e:
        logging.error(f"Error applying RLS: {e}")
        sql_path = ROOT_DIR / "migrations" / "fix_rls_policies.sql"
        return {
            "status": "error",
            "message": f"Failed to apply: {str(e)}",
            "sql": sql_path.read_text() if sql_path.exists() else "Migration file not found",
            "instructions": [
                "Apply the SQL manually in Supabase Dashboard > SQL Editor"
            ]
        }


@api_router.get("/admin/rls-verify")
async def rls_verify():
    """Verify RLS policies are working correctly after applying migration"""
    check_supabase()

    tests = []

    # Test 1: Newsletter INSERT should work
    test_email = f"rls_verify_{uuid.uuid4().hex[:8]}@test.blockquest.com"
    try:
        resp = supabase.table("newsletter_subscribers").insert({
            "email": test_email,
            "created_at": datetime.now(timezone.utc).isoformat()
        }).execute()
        tests.append({"test": "newsletter_insert", "status": "PASS", "detail": "Anon can subscribe"})
        # Clean up
        try:
            supabase.table("newsletter_subscribers").delete().eq("email", test_email).execute()
        except Exception:
            pass
    except Exception as e:
        tests.append({"test": "newsletter_insert", "status": "FAIL", "detail": str(e)[:200]})

    # Test 2: site_content SELECT should work
    try:
        resp = supabase.table("site_content").select("*").limit(1).execute()
        tests.append({"test": "site_content_read", "status": "PASS", "detail": "Public read works"})
    except Exception as e:
        tests.append({"test": "site_content_read", "status": "FAIL", "detail": str(e)[:200]})

    # Test 3: scores SELECT should work (leaderboard)
    try:
        resp = supabase.table("scores").select("*").limit(1).execute()
        tests.append({"test": "scores_read", "status": "PASS", "detail": "Leaderboard readable"})
    except Exception as e:
        tests.append({"test": "scores_read", "status": "FAIL", "detail": str(e)[:200]})

    # Test 4: scores INSERT should work (anon game submission)
    try:
        resp = supabase.table("scores").insert({
            "game": "rls_verify_test",
            "score": 0,
            "faction_bonus": 0
        }).execute()
        tests.append({"test": "scores_insert", "status": "PASS", "detail": "Anon score submission works"})
        # Clean up
        try:
            if resp.data:
                supabase.table("scores").delete().eq("id", resp.data[0]["id"]).execute()
        except Exception:
            pass
    except Exception as e:
        tests.append({"test": "scores_insert", "status": "FAIL", "detail": str(e)[:200]})

    # Test 5: game_progress INSERT should work
    test_id = f"rls_verify_{uuid.uuid4().hex[:8]}"
    try:
        resp = supabase.table("game_progress").insert({
            "id": test_id,
            "player_id": "rls_verify_player",
            "current_level": 1
        }).execute()
        tests.append({"test": "game_progress_insert", "status": "PASS", "detail": "Game progress write works"})
        # Clean up
        try:
            supabase.table("game_progress").delete().eq("id", test_id).execute()
        except Exception:
            pass
    except Exception as e:
        tests.append({"test": "game_progress_insert", "status": "FAIL", "detail": str(e)[:200]})

    # Test 6: game_stats INSERT should work
    test_uuid = str(uuid.uuid4())
    try:
        resp = supabase.table("game_stats").insert({
            "user_id": test_uuid,
            "score": 0,
            "inventory": {"xp": 0}
        }).execute()
        tests.append({"test": "game_stats_insert", "status": "PASS", "detail": "Game stats write works"})
        # Clean up
        try:
            supabase.table("game_stats").delete().eq("user_id", test_uuid).execute()
        except Exception:
            pass
    except Exception as e:
        tests.append({"test": "game_stats_insert", "status": "FAIL", "detail": str(e)[:200]})

    # Test 7: unified_games SELECT should work
    try:
        resp = supabase.table("unified_games").select("*").limit(1).execute()
        tests.append({"test": "unified_games_read", "status": "PASS", "detail": "Game registry readable"})
    except Exception as e:
        tests.append({"test": "unified_games_read", "status": "FAIL", "detail": str(e)[:200]})

    # Test 8: users table should NOT be readable by anon
    try:
        resp = supabase.table("users").select("password_hash").limit(1).execute()
        if resp.data and len(resp.data) > 0 and resp.data[0].get("password_hash"):
            tests.append({"test": "users_password_protected", "status": "FAIL", "detail": "CRITICAL: password_hash readable by anon!"})
        else:
            tests.append({"test": "users_password_protected", "status": "PASS", "detail": "password_hash not exposed"})
    except Exception as e:
        tests.append({"test": "users_password_protected", "status": "PASS", "detail": "Users table properly restricted"})

    # Test 9: unified_faq_items SELECT should work
    try:
        resp = supabase.table("unified_faq_items").select("*").limit(1).execute()
        tests.append({"test": "faq_read", "status": "PASS", "detail": "FAQ readable"})
    except Exception as e:
        tests.append({"test": "faq_read", "status": "FAIL", "detail": str(e)[:200]})

    # Test 10: smart_contracts INSERT should work
    test_sc_id = f"rls_verify_{uuid.uuid4().hex[:8]}"
    try:
        resp = supabase.table("smart_contracts").insert({
            "id": test_sc_id,
            "player_id": "rls_verify_player",
            "placed_blocks": [],
            "tests_passed": [],
            "tests_failed": [],
            "contract_valid": False
        }).execute()
        tests.append({"test": "smart_contracts_insert", "status": "PASS", "detail": "Miners game write works"})
        try:
            supabase.table("smart_contracts").delete().eq("id", test_sc_id).execute()
        except Exception:
            pass
    except Exception as e:
        tests.append({"test": "smart_contracts_insert", "status": "FAIL", "detail": str(e)[:200]})

    passed = sum(1 for t in tests if t["status"] == "PASS")
    failed = sum(1 for t in tests if t["status"] == "FAIL")

    return {
        "verify_time": datetime.now(timezone.utc).isoformat(),
        "summary": f"{passed}/{len(tests)} tests passed",
        "all_pass": failed == 0,
        "tests": tests,
        "next_steps": [
            "If tests fail: Run the SQL migration in Supabase Dashboard > SQL Editor",
            "GET /api/admin/apply-rls to get the SQL",
            "After applying, re-run this verification"
        ] if failed > 0 else ["All RLS policies are correctly configured!"]
    }


@api_router.get("/admin/rls-sql")
async def get_rls_sql():
    """Get the RLS migration SQL for manual application"""
    sql_path = ROOT_DIR / "migrations" / "fix_rls_policies.sql"
    if not sql_path.exists():
        raise HTTPException(status_code=404, detail="Migration file not found")

    return {
        "sql": sql_path.read_text(),
        "instructions": [
            "1. Go to Supabase Dashboard: https://supabase.com/dashboard",
            "2. Select your BlockQuest project (gsypujlaqbitcetzlban)",
            "3. Click 'SQL Editor' in the left sidebar",
            "4. Click 'New Query'",
            "5. Paste ALL the SQL below and click 'Run'",
            "6. Check: All tables should show green RLS checkmarks",
            "7. Verify: GET /api/admin/rls-verify"
        ],
        "tables_affected": ALL_TABLES,
        "policy_summary": {
            "public_read_only": ["site_content", "unified_games", "unified_achievements", "unified_faq_items", "unified_page_content", "factions"],
            "public_subscribe": ["newsletter_subscribers"],
            "public_leaderboard": ["scores", "unified_scores"],
            "anon_game_play": ["game_progress", "smart_contracts", "notebooks", "game_stats", "player_progress"],
            "protected_user_data": ["users"],
            "public_profiles": ["profiles", "unified_user_achievements"]
        }
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
