# BlockQuest PRD

## Original Problem Statement
A kid-friendly Web3 hub at blockquestofficial.com — React + FastAPI + Supabase. Central dashboard for kids with interactive games, progress tracking, AI companion, and Web3 educational content.

## Architecture
- **Frontend:** React + TailwindCSS + Shadcn/UI (deployed on Vercel)
- **Backend:** FastAPI + Supabase (PostgreSQL)
- **Games:** 5+ browser games on Vercel, sharing same Supabase DB
- **State:** localStorage (offline-first) + Supabase cloud sync

## What's Been Implemented

### Phases 1-9 (Complete)
Core app, RLS security, book PDFs, glossary, banner, Gerry AI companion, progress sync, leaderboard profiles, returning explorer welcome-back.

### Phase 10: Gerry Animation + Cross-Game Sync (Complete)
Idle bounce + sparkle animations, Chaos Chronicles avatar, bottom-left position, cross-game chat history sync.

### Phase 11: Gerry Remembers (Complete)
Memory context system, personalized LLM greetings, cross-game conversation awareness.

### Phase 12: Offline-First Leaderboard Sync (Complete - March 2026)
- **Supabase-driven scores**: Leaderboard reads from `scores` table (all games share same backend). No manual score submission UI.
- **localStorage caching**: API response cached in `blockquest_leaderboard_cache`. When offline, cached scores displayed with amber offline banner + retry button.
- **Local score storage**: Games save scores to `blockquest_local_scores` in localStorage via `saveLocalScore(game, score, name)` from ProgressContext.
- **Auto-sync**: On app load, ProgressContext checks for unsynced local scores and pushes them to backend via `POST /api/leaderboard/submit`. Scores marked `synced: true` after successful upload.
- **Merged view**: Backend entries + unsynced local entries merged, sorted by score, ranked. Unsynced entries show "SYNCING" badge, synced real players show "PLAYER" badge.
- **Display names**: Player-set names persist across sessions and show on leaderboard entries.
- **Shared key convention for games**: `blockquest_local_scores` localStorage key — any game writes `{game, score, name, ts, synced}` entries.

## Key API Endpoints
- `GET /api/leaderboard` - Merged leaderboard (scores table + game_progress real players)
- `POST /api/leaderboard/submit` - Programmatic score sync (from auto-sync, not manual UI)
- `GET /api/leaderboard/games` - Game list
- `GET/PUT /api/profile/{device_id}` - Display name
- `GET/PUT /api/progress/{device_id}` - Progress sync
- `POST /api/gerry/chat` - LLM chat with memory context
- `GET /api/gerry/greeting/{device_id}` - Personalized greeting
- `GET/PUT /api/gerry/history/{device_id}` - Cross-game chat history

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- Emergent LLM Key (GPT-4.1-mini for Gerry AI)

## Constraints
- DO NOT activate dormant Web3 teasers or Merch Section
- scores.user_id has FK to profiles.id — real player scores stored in game_progress instead

## Backlog (P2)
- Add more books to Stories/Decks sections
