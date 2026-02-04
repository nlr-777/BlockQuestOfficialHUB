from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any
import uuid
from datetime import datetime, timezone
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase connection
supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL') or os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY') or os.environ.get('SUPABASE_ANON_KEY')

supabase: Client = None

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

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Models ============

# Site Content Models
class SiteContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int
    title: str
    type: str  # 'video', 'book', or 'game'
    url: str
    thumbnail_url: Optional[str] = None

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: Optional[int] = None
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
    """Get all newsletter subscribers (admin)"""
    try:
        response = supabase.table("newsletter_subscribers").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching subscribers: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch subscribers")


# ------------ Game Stats ------------

@api_router.get("/game/stats/{user_id}", response_model=GameStats)
async def get_game_stats(user_id: str):
    """Get game stats for a user"""
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
    try:
        supabase.table("game_stats").delete().eq("user_id", user_id).execute()
        return {"success": True, "message": "Game stats deleted"}
    except Exception as e:
        logging.error(f"Error deleting game stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete game stats")


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
