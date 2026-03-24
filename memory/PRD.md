# BlockQuest PRD

## Original Problem Statement
A kid-friendly Web3 hub at blockquestofficial.com — React + FastAPI + Supabase. Central dashboard for kids with interactive games, progress tracking, AI companion, and Web3 educational content.

## Architecture
- **Frontend:** React + TailwindCSS + Shadcn/UI (deployed on Vercel)
- **Backend:** FastAPI + Supabase (PostgreSQL)
- **Games:** 5+ browser games on Vercel, sharing same Supabase DB
- **State:** localStorage (offline-first) + Supabase cloud sync

## What's Been Implemented

### Phases 1-11 (Complete)
Core app, RLS security, book PDFs, glossary, banner, Gerry AI companion, progress sync, leaderboard profiles, returning explorer, Gerry animations, cross-game conversation sync, Gerry remembers.

### Phase 12: Offline-First Leaderboard + Gerry Voice & Visuals (Complete - March 2026)
- **Leaderboard**: All scores from Supabase `scores` table, no manual submit UI. Scores sync to user profile automatically. localStorage cache for offline viewing with amber banner + retry button.
- **Auto-sync**: Local scores from `blockquest_local_scores` auto-pushed to backend on load via `POST /api/leaderboard/submit`.
- **Gerry Voice Improvement**: Rate 0.92, pitch 1.15, prefers warm natural voices (Samantha, Karen, Fiona, Moira) for less robotic, more friendly companion feel. Same settings in both hub component and injectable script.
- **Concept Visualizations**: 8 kid-friendly illustrations generated for blockchain, NFT, mining, wallet, Web3, smart contracts, tokens, metaverse. When Gerry explains a concept, a purple "Show me: [Concept]" button appears. Clicking reveals the illustration inline in the chat with a label. Toggle to hide/show.

## Key API Endpoints
- `GET /api/leaderboard` - Merged leaderboard (scores + game_progress real players)
- `POST /api/leaderboard/submit` - Programmatic score sync (auto-sync only)
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
