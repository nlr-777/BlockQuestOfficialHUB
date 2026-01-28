# BlockQuest Landing Page - Product Requirements Document

## Original Problem Statement
Build a vibrant, kid-friendly, retro-arcade-themed landing page for the "BlockQuest" brand - an edutainment ecosystem teaching Web3/crypto concepts. The page should serve as a promotional hub featuring:
- **Hero Section:** Brand name, tagline, and mascot
- **Arcade Zone:** Promoting the "BlockQuest Retro Arcade" game
- **Book Section:** Showcasing the "Web3 Chaos Chronicles" book series
- **Parent Calm Zone:** Safety badges for parents (ad-free, no real crypto)
- **Footer:** Social links, legal pages, newsletter signup

**Aesthetic:** High-energy, retro-neon arcade with extensive animations, floating elements, black background with neon gradients.

## Brand Story
The "Web3 Chaos Chronicles" follows **5 friends** exploring Web3 concepts:
- **Zara Chen** (15) - Tech Whiz
- **Sam Rodriguez** (14) - Skeptic  
- **Miko Tanaka** (15) - Artist
- **Ollie Okafor** (13) - Gamer
- **Lila Nakamura** (16) - Leader

The story begins with Gary's legendary goat trade and follows the friends as they discover blockchain, tokens, NFTs, DeFi, and more.

## Target Audience
- Kids 10+ and curious adults
- Families looking for educational Web3 content
- All ages (not limited to 5+)

---

## What's Been Implemented

### Core Landing Page (Completed)
- [x] **Header:** BlockQuest logo, navigation (Games, Books, Parents), Play Now CTA
- [x] **Hero Section:** Retro-neon title, tagline, mascot (Gary the Goat), CTAs
- [x] **Arcade Zone (QuestSection):** Game cards for "BlockQuest Retro Arcade" and coming soon placeholder
- [x] **Book Section:** Complete with:
  - "Meet the 5 Friends" character showcase with cropped group image (text labels removed)
  - Individual character cards showing name and trait (with hover tooltips showing character quotes)
  - "Their Quest" storyline teaser
  - Book carousel (5 books: 2 with covers, 3 coming soon)
  - Series teaser with character names highlighted
- [x] **Parent Calm Zone:** Safety badges (Safe, Ad-free, No real crypto, Fun for all ages)
- [x] **Footer:** Newsletter signup (MOCKED), Instagram link, Privacy/Terms links

### Legal Pages
- [x] Privacy Policy (`/privacy`)
- [x] Terms & Conditions (`/terms`)

### Design & Styling
- [x] Retro-neon arcade aesthetic with CSS animations
- [x] Press Start 2P, Orbitron, Rajdhani fonts
- [x] Floating elements, sparkles, glitch effects
- [x] Orange/purple "Web3 Chaos Chronicles" color palette
- [x] Mobile responsive design

### Technical
- [x] React SPA with React Router
- [x] TailwindCSS + custom CSS animations
- [x] Shadcn/UI components
- [x] FastAPI backend (basic template, not integrated)
- [x] ESLint compliant code

### Cleanup (Completed Jan 28, 2026)
- [x] Deleted unused `FloatingSidePanel.jsx`
- [x] Fixed Math.random impurity issues in BookSection
- [x] Fixed unescaped apostrophe lint errors

---

## What's MOCKED (Not Functional)
- Newsletter signup form (frontend only, no backend integration)
- "Coming Soon" buttons on books
- "Play Now" buttons (link to previews)

---

## Prioritized Backlog

### P1 - Upcoming
- [ ] **Unified Profile System:** Single profile for the entire BlockQuest ecosystem (pending user requirements clarification)

### P2 - Future
- [ ] **Blockchain/Web3 Teasers:** Re-introduce BLQ token, Apertum blockchain, OpenPlaza marketplace (removed at user request for later)
- [ ] **Merch Section:** "Merch Dropping Soon!" with email waitlist
- [ ] **Newsletter Backend:** Connect to email service (SendGrid, etc.)

### P3 - Enhancements
- [ ] Individual character profile pages
- [ ] Interactive book previews
- [ ] Game achievement badges
- [ ] Social sharing features

---

## Code Architecture
```
/app
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── server.py
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js, App.css, index.css
        ├── components/
        │   ├── BookSection.jsx (Updated Jan 28)
        │   ├── FloatingElements.jsx
        │   ├── Footer.jsx
        │   ├── Header.jsx
        │   ├── HeroSection.jsx
        │   ├── ParentSection.jsx
        │   ├── ParticleExplosion.jsx
        │   ├── QuestSection.jsx
        │   └── ui/ (Shadcn components)
        ├── data/mock.js
        └── pages/
            ├── PrivacyPolicy.jsx
            └── TermsConditions.jsx
```

---

## Key Files
- `/app/frontend/src/components/BookSection.jsx` - Book section with 5 friends showcase
- `/app/frontend/src/data/mock.js` - All mock data (books, characters, games)
- `/app/frontend/src/App.css` - Custom CSS animations and neon effects

---

## Notes
- All blockchain features were **intentionally removed** - do not re-implement without explicit instruction
- The application is **frontend-only** - backend is a basic FastAPI template
- Target audience is "all ages" not just "ages 5+"
