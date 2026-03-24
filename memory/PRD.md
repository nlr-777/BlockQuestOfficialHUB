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
- `site_content`: id, title, type, url, thumbnail_url
- `unified_games`: id, name, slug, description, app_source, is_active
- `unified_achievements`: id, name, description, icon, requirement_type, requirement_value
- `unified_faq_items`: id, question, answer, category, display_order, is_published
- `unified_page_content`: id, page_name, title, content, is_published
- `factions`: id, name, lore, total_points

### User/Auth
- `users`: user_id, email, name, password_hash, picture, quest_coins, auth_provider
- `profiles`: id, username, faction_id, avatar_seed, public_title

### Game Data
- `game_progress`: id, player_id (unique), current_level, current_phase, inventory (jsonb), user_name, user_email, auth_user_id, etc.
- `smart_contracts`: id, player_id, placed_blocks, tests_passed, etc.
- `notebooks`: id, player_id, entries, villager_copies, etc.
- `game_stats`: id, user_id, score, inventory, last_played
- `player_progress`: user_id, game_id, level, xp, inventory

### Scores/Leaderboard
- `scores`: id, user_id (FK -> profiles.id, nullable), game, score, faction_bonus
- `unified_scores`: id, user_id, game_id, score, metadata

### Other
- `newsletter_subscribers`: id, email, created_at
- `unified_user_achievements`: id, user_id, achievement_id, unlocked_at

## What's Been Implemented

### Phase 1-4: Core App (Complete)
- Hero section, header, footer, parent section, book section
- Interactive dashboard with useProgress hook, character selector, quest log, daily quests
- Arcade zone with 4 game cards
- FastAPI backend + Supabase integration, newsletter, game stats CRUD

### Phase 5: RLS Security Fix (Complete - March 2026)
- Full audit and migration of all 17 tables with proper RLS policies

### Phase 6: Book 1 PDF + Glossary + Banner (Complete - March 2026)
- Book PDFs, 17-term glossary, rolling announcement banner

### Phase 7: Gerry AI Companion (Complete - March 2026)
- Floating draggable goat chat with LLM integration (GPT-4.1-mini)
- Injectable script for external games

### Phase 8: Full Stack Upgrade (Complete - March 2026)
- Progress sync (localStorage -> Supabase via device UUID)
- Cross-game leaderboard with demo data
- Gerry LLM integration
- React Context refactor, data module split

### Phase 9: Leaderboard Profiles + Returning Explorer (Complete - March 2026)
- **Display Name System**: Users set custom names via modal, saved to game_progress.user_name + inventory JSONB
  - `GET/PUT /api/profile/{device_id}` endpoints
  - Name synced to backend on save, propagated to all leaderboard entries
- **Real Player Score Submission**: Submit Score form on leaderboard page
  - Stored in game_progress with current_phase='leaderboard' (bypasses scores FK constraint)
  - One best score per device per game (higher scores replace lower)
  - `POST /api/leaderboard/submit` with ScoreSubmitRequest body
- **Merged Leaderboard**: Demo scores from `scores` table + real player scores from `game_progress`
  - Real players marked with "PLAYER" badge (is_real: true)
  - Sorted by score descending, ranked
- **Returning Explorer**: Welcome-back modal after 4+ hours of inactivity
  - Tracks `last_active` in localStorage, updated every 60s
  - Shows XP, streak status, quest count, leaderboard encouragement
  - Dismissible modal on homepage

## Pending/Known Issues
- `game_stats` has FK constraint to `users` table (expected behavior)
- `scores.user_id` has FK to `profiles.id` - real player scores stored in game_progress instead
- Vercel deployments may need "Save to GitHub" sync before redeploy

## Backlog (P2)
- Add more books to the Stories/Decks sections
- Optional: Connect injectable script to hub for cross-game conversation sync
- DO NOT activate dormant Web3 teasers or Merch Section

## Key API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Newsletter signup
- `GET /api/newsletter/subscribers` - Admin: list subscribers
- `GET /api/content` - Site content
- `GET/POST/PUT/DELETE /api/game/stats/{user_id}` - Game stats CRUD
- `GET /api/progress/{device_id}` - Fetch player progress
- `PUT /api/progress/{device_id}` - Save/update progress
- `GET /api/profile/{device_id}` - Get player display name
- `PUT /api/profile/{device_id}` - Set player display name
- `GET /api/leaderboard` - Merged leaderboard (demo + real players)
- `POST /api/leaderboard/submit` - Submit real player score (JSON body)
- `GET /api/leaderboard/games` - List games with scores
- `POST /api/gerry/chat` - LLM-powered Gerry chat
- `GET /api/admin/rls-audit` - RLS audit
- `GET /api/admin/rls-verify` - RLS verification tests
- `GET /api/admin/rls-sql` - Get migration SQL

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- Emergent LLM Key (GPT-4.1-mini for Gerry AI)
- react-confetti (animations)
