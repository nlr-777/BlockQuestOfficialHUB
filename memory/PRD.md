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
- `game_progress`: id, player_id, current_level, current_phase, inventory, etc.
- `smart_contracts`: id, player_id, placed_blocks, tests_passed, etc.
- `notebooks`: id, player_id, entries, villager_copies, etc.
- `game_stats`: id, user_id, score, inventory, last_played
- `player_progress`: user_id, game_id, level, xp, inventory

### Scores/Leaderboard
- `scores`: id, user_id, game, score, faction_bonus
- `unified_scores`: id, user_id, game_id, score, metadata

### Other
- `newsletter_subscribers`: id, email, created_at
- `unified_user_achievements`: id, user_id, achievement_id, unlocked_at

## What's Been Implemented

### Phase 1: Core Landing Page (Complete)
- Hero section with banner, game funnel cards
- Header, footer, parent section
- Book section with character portraits
- FAQ page, Privacy Policy, Terms & Conditions

### Phase 2: Interactive Dashboard (Complete)
- `useProgress` hook with localStorage persistence
- CharacterSelector, QuestLog, DailyQuest, ProgressOverview
- Confetti animations on claim actions
- FloatingGoatPanel resource hub with Web3 glossary

### Phase 3: Arcade Zone (Complete)
- 4-card QuestSection grid (Retro Arcade, Miners, Wallet Adventure, NFT Studio)
- Links to Vercel-hosted games

### Phase 4: Backend + Supabase (Complete)
- FastAPI server connected to Supabase
- Newsletter subscribe/read endpoints
- Game stats CRUD endpoints
- Site content endpoints

### Phase 5: RLS Security Fix (Complete - March 2026)
- Full audit of all 17 tables
- Comprehensive SQL migration applied
- RLS enabled on ALL tables with proper policies:
  - CMS tables: public read, admin-only write
  - Newsletter: public subscribe, admin read
  - Leaderboards: public read, player submit
  - Game data: anon read/write (for no-login games)
  - Users: auth-only, own-row access (password_hash protected)
- Admin endpoints: /api/admin/rls-audit, /api/admin/rls-verify, /api/admin/rls-sql
- Service role key integrated for admin operations
- `users_public` view created to exclude password_hash
- 21/21 backend tests passing

### Phase 6: Book 1 PDF Download (Complete - March 2026)
- Added Book 1 "Money's Origin Story" PDF as free download
- Book 1 button changed from "Coming Soon" to "Free Download" (green, links to PDF)
- Resource Hub Stories tab updated with Book 1 download entry
- Resource Hub Decks updated: Book 1 renamed "From Goats to Bitcoin", Book 2 added "The Unbreakable Record", Books 3-4 removed
- 5 new glossary terms + Public Key added (17 total)
- Rolling announcement banner in hero section (3 rotating messages)
- Other books (2-5) retain "Coming Soon" buttons

### Phase 7: Gerry AI Companion (Complete - March 2026)
- Floating draggable goat chat bubble (bottom-right)
- Rule-based response engine with 17 Web3 concepts, game-specific hints for all 5 games, hero-personalized stories
- Web Speech API voice-over on hover and for responses
- Auto-detect stuck state (45s idle timer → proactive tip)
- Personalized "what-if" stories based on selected hero (Gerry, Zara, Sam, Miko, Ollie, Lila)
- Difficulty auto-scaling: 3 fails → easy mode flag in localStorage
- Conversation history persisted in localStorage
- Parent Hub toggle to enable/disable Gerry
- Injectable vanilla JS script for all 5 Vercel games (`/gerry-injectable.js`)
- Quick action buttons: "What is blockchain?", "Tell me a story", "Game hint", "What is an NFT?"

### Phase 8: Full Stack Upgrade (Complete - March 2026)
- **Progress Sync to Supabase**: Device UUID-based, uses `game_progress` table with jsonb inventory
  - `GET /api/progress/{device_id}` + `PUT /api/progress/{device_id}`
  - ProgressContext provider syncs localStorage → Supabase (debounced 2s)
  - localStorage stays as fast cache, Supabase as cloud backup
- **Cross-Game Leaderboard**: `/leaderboard` route with 60 demo scores across 5 games
  - Filter by game, medals for top 3, stats summary
  - `GET /api/leaderboard`, `POST /api/leaderboard/submit`, `GET /api/leaderboard/games`
  - Header nav link added
- **Gerry LLM Integration**: GPT-4.1-mini via Emergent Universal Key
  - `POST /api/gerry/chat` with conversation memory per session
  - Kid-friendly system prompt, hero-personalized, rule-based fallback
- **React Context Refactor**: ProgressProvider wraps app, removes prop drilling
- **Data Module Split**: mock.js → books.js, characters.js, games.js, social.js

## Pending/Known Issues
- `game_stats` has FK constraint to `users` table (expected behavior)
- Vercel deployments may need "Save to GitHub" sync before redeploy

## Backlog (P2)
- Refine leaderboard with real user profiles when auth is added
- Add more books to the Stories/Decks sections
- Optional: Connect injectable script to hub for cross-game conversation sync

## Key API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Newsletter signup
- `GET /api/newsletter/subscribers` - Admin: list subscribers
- `GET /api/content` - Site content
- `GET/POST/PUT/DELETE /api/game/stats/{user_id}` - Game stats CRUD
- `GET /api/progress/{device_id}` - Fetch player progress
- `PUT /api/progress/{device_id}` - Save/update progress to Supabase
- `GET /api/leaderboard` - Cross-game leaderboard (filterable by ?game=)
- `POST /api/leaderboard/submit` - Submit score
- `GET /api/leaderboard/games` - List games with scores
- `POST /api/gerry/chat` - LLM-powered Gerry chat (GPT-4.1-mini)
- `GET /api/admin/rls-audit` - RLS audit results
- `GET /api/admin/rls-verify` - RLS verification tests
- `GET /api/admin/rls-sql` - Get migration SQL

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- react-confetti (animations)
