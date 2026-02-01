# BlockQuest Official 🎮📚

A vibrant, kid-friendly, retro-arcade-themed landing page for the BlockQuest brand - an edutainment ecosystem teaching Web3/crypto concepts through books and games.

## 🚀 Live Features

- **Hero Section** - Engaging intro with animated elements
- **Arcade Zone** - BlockQuest Retro Arcade game preview with live link
- **Book Section** - Web3 Chaos Chronicles 5-book series carousel with character showcase
- **Parent Hub** - Trust badges, FAQ dropdowns, and safety information
- **Newsletter Signup** - Functional email collection (MongoDB storage)
- **FAQ Page** - Accordion-style frequently asked questions
- **Legal Pages** - Privacy Policy & Terms and Conditions

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TailwindCSS
- Shadcn/UI components
- React Router DOM
- Lucide React icons

**Backend:**
- FastAPI (Python)
- MongoDB (Motor async driver)
- Pydantic models

## 📁 Project Structure

```
/app
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── data/       # Mock data
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

## 🏃‍♂️ Local Development

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)
- Yarn package manager

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL
yarn install
yarn start
```

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

## 🚀 Vercel Deployment

### Option 1: Frontend Only (Static)

If deploying frontend only (without backend):

1. **Push to GitHub**
2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   
3. **Configure Build:**
   - Framework Preset: Create React App
   - Build Command: `yarn build`
   - Output Directory: `build`

4. **Environment Variables:**
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

5. **Deploy!**

### Option 2: Full Stack (Frontend + Backend)

1. **Set up MongoDB Atlas:**
   - Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Get your connection string

2. **Deploy Backend (Vercel Serverless):**
   - The `vercel.json` is configured for full-stack deployment
   - Backend routes are handled at `/api/*`

3. **Environment Variables (Vercel Dashboard):**
   ```
   # Frontend
   REACT_APP_BACKEND_URL=/api
   
   # Backend
   MONGO_URL=mongodb+srv://...
   DB_NAME=blockquest_db
   CORS_ORIGINS=https://your-domain.vercel.app
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Option 3: Separate Deployments

Deploy frontend and backend separately:

**Frontend (Vercel):**
- Root: `frontend`
- Build: `yarn build`

**Backend (Railway/Render/Fly.io):**
- Use `backend/` directory
- Set environment variables
- Update frontend `REACT_APP_BACKEND_URL`

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| GET | `/api/newsletter/subscribers` | List subscribers (admin) |

## 🔧 Environment Variables

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-api-url.com
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://...
DB_NAME=blockquest_db
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
