# BlockQuest Official 🎮📚

A vibrant, kid-friendly, retro-arcade-themed landing page for the BlockQuest brand - an edutainment ecosystem teaching Web3/crypto concepts through books and games.

## 🚀 Live Features

- **Hero Section** - Engaging intro with animated elements
- **Arcade Zone** - BlockQuest Retro Arcade game preview with live link
- **Book Section** - Web3 Chaos Chronicles 5-book series carousel with character showcase
- **Parent Hub** - Trust badges, FAQ dropdowns, and safety information
- **Newsletter Signup** - Functional email collection (Supabase storage)
- **FAQ Page** - Accordion-style frequently asked questions
- **Legal Pages** - Privacy Policy & Terms and Conditions
- **Game Stats** - Save/load game progress with Supabase

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TailwindCSS
- Shadcn/UI components
- React Router DOM
- Lucide React icons
- Supabase JS Client

**Backend:**
- FastAPI (Python)
- Supabase (PostgreSQL)
- Pydantic models

## 📁 Project Structure

```
/app
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── data/       # Mock data
│   │   ├── lib/        # Utilities (Supabase client)
│   │   └── App.js      # Main router
│   ├── public/
│   └── package.json
├── backend/            # FastAPI backend
│   ├── server.py       # Main API server
│   ├── requirements.txt
│   └── .env
├── vercel.json         # Vercel deployment config
└── README.md
```

## 🗄️ Supabase Database Schema

### `site_content` table
| Column | Type | Description |
|--------|------|-------------|
| id | int8 | Primary key |
| title | text | Content title |
| type | text | 'video', 'book', or 'game' |
| url | text | Link to content |
| thumbnail_url | text | Thumbnail image URL |

### `game_stats` table
| Column | Type | Description |
|--------|------|-------------|
| id | int8 | Primary key |
| user_id | uuid | User identifier (Supabase Auth) |
| score | int4 | Player score |
| inventory | jsonb | Badges, XP, faction data |
| last_played | timestamptz | Last activity timestamp |

### `newsletter_subscribers` table
| Column | Type | Description |
|--------|------|-------------|
| id | int8 | Primary key |
| email | text | Subscriber email |
| created_at | timestamptz | Subscription date |

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase account
- Yarn package manager

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your Supabase credentials
yarn install
yarn start
```

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

## 🚀 Vercel Deployment

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Create the required tables (see schema above)
3. Get your project URL and anon key from Settings > API

### 2. Deploy to Vercel

1. **Push to GitHub**
2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Environment Variables (Vercel Dashboard):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   REACT_APP_BACKEND_URL=/api
   CORS_ORIGINS=https://your-domain.vercel.app
   ```

4. **Deploy!**

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| GET | `/api/content` | Get all site content |
| GET | `/api/content/videos` | Get video content |
| GET | `/api/content/books` | Get book content |
| GET | `/api/content/games` | Get game content |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| GET | `/api/newsletter/subscribers` | List subscribers (admin) |
| GET | `/api/game/stats/{user_id}` | Get user's game stats |
| POST | `/api/game/stats` | Create game stats |
| PUT | `/api/game/stats/{user_id}` | Update game stats |
| DELETE | `/api/game/stats/{user_id}` | Delete game stats |

## 🔧 Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API (optional if using Supabase directly)
REACT_APP_BACKEND_URL=https://your-api-url.com

# CORS (backend only)
CORS_ORIGINS=https://your-frontend.com
```

## 🏗️ Build Locally

```bash
# Frontend build
cd frontend
yarn build

# Test production build
npx serve -s build
```

## 📄 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/faq` | FAQ page |
| `/parents` | Parent Hub page |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |

## 🎨 Brand Assets

- **Logo:** BlockQuest Official logo
- **Colors:** Orange (#ff6b35), Purple (#9b5de5), Cyan (#00d4ff)
- **Fonts:** Press Start 2P, Orbitron, Rajdhani

## 📞 Contact

BlockQuest Official | ABN: 71 926 421 644 | Capricorn Coast, QLD

---

Made with 🚀 in Australia
