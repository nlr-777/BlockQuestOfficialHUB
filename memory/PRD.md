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
- Other books (2-5) retain "Coming Soon" buttons

## Pending/Known Issues
- `game_stats` has FK constraint to `users` table (expected behavior)
- Vercel deployments may need "Save to GitHub" sync before redeploy

## Backlog (P1-P2)
- P1: Migrate localStorage progress tracking to Supabase backend (UUID-based, no login)
- P1: Cross-game leaderboard page/section
- P2: Refactor state management (prop drilling → React Context)
- P2: Split mock.js into focused data modules

## Key API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Newsletter signup (FIXED)
- `GET /api/newsletter/subscribers` - Admin: list subscribers
- `GET /api/content` - Site content
- `GET/POST/PUT/DELETE /api/game/stats/{user_id}` - Game stats CRUD
- `GET /api/admin/rls-audit` - RLS audit results
- `GET /api/admin/rls-verify` - RLS verification tests
- `GET /api/admin/rls-sql` - Get migration SQL

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- react-confetti (animations)
