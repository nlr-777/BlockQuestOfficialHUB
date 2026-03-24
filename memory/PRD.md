# BlockQuest PRD

## Original Problem Statement
Create a landing page for "BlockQuest" that evolved into a comprehensive, interactive single-page application with a React frontend and a FastAPI/Supabase backend. The hub at blockquestofficial.com serves as the central dashboard for kids, featuring interactive games, progress tracking, and Web3 educational content.

## Architecture
- **Frontend:** React + TailwindCSS + Shadcn/UI (deployed on Vercel)
- **Backend:** FastAPI + Supabase (PostgreSQL)
- **Games:** 5+ browser games deployed on Vercel, sharing the same Supabase DB
- **State:** Client-side progress via localStorage + Supabase for persistent data

## Core Requirements
1. Interactive dashboard for kids with XP, quests, badges, hero unlocks
2. Arcade zone with 4+ mini-game cards linking to external Vercel games
3. Character selector, daily quests, quest log
4. Newsletter subscription
5. Resource hub (floating goat panel) with glossary, PDFs, videos
6. Proper RLS security across all Supabase tables

## Database Schema (17 Tables)
### CMS/Config (Read-Only)
- `site_content`, `unified_games`, `unified_achievements`, `unified_faq_items`, `unified_page_content`, `factions`

### User/Auth
- `users`, `profiles` (profiles.id FK -> users.id)

### Game Data
- `game_progress`: id, player_id (unique), current_level, current_phase, inventory (jsonb), user_name, user_email, auth_user_id
- `smart_contracts`, `notebooks`, `game_stats`, `player_progress`

### Scores/Leaderboard
- `scores`: id, user_id (FK -> profiles.id, nullable), game, score, faction_bonus
- `unified_scores`

### Other
- `newsletter_subscribers`, `unified_user_achievements`

## What's Been Implemented

### Phase 1-4: Core App (Complete)
- Hero section, header, footer, parent section, book section
- Interactive dashboard with useProgress hook, character selector, quest log, daily quests
- Arcade zone with 4 game cards
- FastAPI backend + Supabase integration, newsletter, game stats CRUD

### Phase 5: RLS Security Fix (Complete)
- Full audit and migration of all 17 tables with proper RLS policies

### Phase 6: Book 1 PDF + Glossary + Banner (Complete)
- Book PDFs, 17-term glossary, rolling announcement banner

### Phase 7: Gerry AI Companion (Complete)
- Floating draggable goat chat with LLM integration (GPT-4.1-mini)
- Injectable script for external games

### Phase 8: Full Stack Upgrade (Complete)
- Progress sync (localStorage -> Supabase via device UUID)
- Cross-game leaderboard with demo data
- React Context refactor, data module split

### Phase 9: Leaderboard Profiles + Returning Explorer (Complete)
- Display Name System (modal + backend sync)
- Real Player Score Submission (game_progress with current_phase='leaderboard')
- Merged Leaderboard (demo + real players with PLAYER badge)
- Returning Explorer welcome-back modal (4+ hours threshold)

### Phase 10: Gerry Enhancement + Cross-Game Sync (Complete - March 2026)
- **Idle Animation**: Bouncing wobble + sparkle particles around Gerry bubble (CSS-only)
- **New Avatar**: Chaos Chronicles Gerry Goat (cute cartoon with crown, cape, blockchain cube)
- **Position Fix**: Moved Gerry to bottom-left to avoid blocking Resource Hub (bottom-right)
- **Cross-Game Conversation Sync**:
  - Backend: `GET/PUT /api/gerry/history/{device_id}` stores chat history in game_progress (current_phase='gerry_history')
  - Messages tagged with game source, merged across games, capped at 100
  - Hub `GerryCompanion.jsx` syncs on mount + debounced after each message
  - Injectable `gerry-injectable.js` fully rewritten: LLM-powered via hub API, cloud history sync, new avatar, sparkle animations, game-source tagging, difficulty auto-scaling

## Key API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Newsletter signup
- `GET/POST/PUT/DELETE /api/game/stats/{user_id}` - Game stats CRUD
- `GET /api/progress/{device_id}` / `PUT /api/progress/{device_id}` - Progress sync
- `GET /api/profile/{device_id}` / `PUT /api/profile/{device_id}` - Display name
- `GET /api/leaderboard` - Merged leaderboard
- `POST /api/leaderboard/submit` - Submit player score (JSON body)
- `GET /api/leaderboard/games` - Game list
- `POST /api/gerry/chat` - LLM-powered Gerry chat
- `GET /api/gerry/history/{device_id}` - Fetch cross-game chat history
- `PUT /api/gerry/history/{device_id}` - Save/merge chat history
- `GET /api/admin/rls-audit` / `GET /api/admin/rls-verify` / `GET /api/admin/rls-sql`

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- Emergent LLM Key (GPT-4.1-mini for Gerry AI)
- react-confetti (animations)

## Constraints
- DO NOT activate dormant Web3 teasers or Merch Section
- scores.user_id has FK to profiles.id — real player scores stored in game_progress instead

## Backlog (P2)
- Add more books to Stories/Decks sections
