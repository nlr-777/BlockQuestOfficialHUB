# BlockQuest PRD

## Original Problem Statement
Create a landing page for "BlockQuest" that evolved into a comprehensive, interactive single-page application with a React frontend and a FastAPI/Supabase backend. The hub at blockquestofficial.com serves as the central dashboard for kids, featuring interactive games, progress tracking, and Web3 educational content.

## Architecture
- **Frontend:** React + TailwindCSS + Shadcn/UI (deployed on Vercel)
- **Backend:** FastAPI + Supabase (PostgreSQL)
- **Games:** 5+ browser games deployed on Vercel, sharing the same Supabase DB
- **State:** Client-side progress via localStorage + Supabase for persistent data

## What's Been Implemented

### Phase 1-8 (Complete)
Core app, RLS security, book PDFs, glossary, banner, Gerry AI, progress sync, leaderboard, React Context refactor.

### Phase 9: Leaderboard Profiles + Returning Explorer (Complete)
- Display name system, real player score submission, merged leaderboard, welcome-back modal

### Phase 10: Gerry Animation + Cross-Game Sync (Complete)
- Idle bounce + sparkle animations, Chaos Chronicles avatar, bottom-left position, cross-game chat history sync

### Phase 11: Gerry Remembers (Complete - March 2026)
- **Memory Context System**: Backend builds player memory from cross-game chat history (topics discussed, games played, display name, interaction count). Injected into LLM system prompt so Gerry naturally references past conversations.
- **Personalized Greetings**: `GET /api/gerry/greeting/{device_id}` generates LLM-powered welcome messages for returning players, referencing their name, past topics, and games played. Falls back to rule-based greeting if LLM unavailable.
- **Enhanced Chat**: `POST /api/gerry/chat` now accepts optional `device_id`, fetches memory context, and includes it in the LLM system prompt. Gerry references past conversations naturally.
- **Hub Component Updates**: `GerryCompanion.jsx` passes device_id in chat requests, fetches personalized greeting on first open, shows Gerry avatar image in header and messages, displays "from [game]" tags on cross-game synced messages.
- **Injectable Script Updates**: `gerry-injectable.js` passes device_id in chat/greeting calls, uses personalized greeting on first open.

## Key API Endpoints
- `GET /api/` - Health check
- `POST /api/newsletter/subscribe` - Newsletter
- `GET/POST/PUT/DELETE /api/game/stats/{user_id}` - Game stats CRUD
- `GET/PUT /api/progress/{device_id}` - Progress sync
- `GET/PUT /api/profile/{device_id}` - Display name
- `GET /api/leaderboard` - Merged leaderboard
- `POST /api/leaderboard/submit` - Submit player score
- `GET /api/leaderboard/games` - Game list
- `POST /api/gerry/chat` - LLM chat (with memory context via device_id)
- `GET /api/gerry/greeting/{device_id}` - Personalized greeting
- `GET/PUT /api/gerry/history/{device_id}` - Cross-game chat history
- `GET /api/admin/rls-audit` / `rls-verify` / `rls-sql`

## 3rd Party Integrations
- Supabase (PostgreSQL + Auth + RLS)
- Emergent LLM Key (GPT-4.1-mini for Gerry AI + memory + greetings)

## Constraints
- DO NOT activate dormant Web3 teasers or Merch Section
- scores.user_id has FK to profiles.id — real player scores stored in game_progress instead

## Backlog (P2)
- Add more books to Stories/Decks sections
