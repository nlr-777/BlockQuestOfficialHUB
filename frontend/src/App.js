import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import QuestSection from "./components/QuestSection";
import BookSection from "./components/BookSection";
import AvatarSelector from "./components/AvatarSelector";
import ProgressOverview from "./components/ProgressOverview";
import DailyQuest from "./components/DailyQuest";
import CompactParentFooter from "./components/ParentSection";
import FloatingGoatPanel from "./components/FloatingGoatPanel";
import GerryCompanion from "./components/GerryCompanion";
import WelcomeBackModal from "./components/WelcomeBackModal";
import FAQPage from "./pages/FAQPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { ProgressProvider, useProgressContext } from "./context/ProgressContext";
import "./App.css";

const LandingPage = () => {
  const {
    progress, claimQuest, unlockHero, selectAvatar,
    claimDailyQuest, resetProgress, hasProgress, totalQuests, totalHeroes,
    lastClaimed, heroThresholds, showWelcomeBack, dismissWelcomeBack, inactiveHours
  } = useProgressContext();

  const [gerryEnabled, setGerryEnabled] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('blockquest_gerry_settings'))?.enabled !== false; }
    catch { return true; }
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main>
        <section id="hero-section">
          <HeroSection questsCompleted={progress.questsCompleted} />
        </section>
        <section id="quest-log-section">
          <ProgressOverview
            progress={progress}
            onClaimQuest={claimQuest}
            totalQuests={totalQuests}
          />
        </section>
        <section id="character-selector">
          <AvatarSelector
            selectedAvatar={progress.selectedAvatar}
            unlockedHeroes={progress.heroesUnlocked}
            onSelect={selectAvatar}
            onUnlockHero={unlockHero}
            currentXp={progress.xp}
          />
        </section>
        <section id="daily-quest">
          <DailyQuest
            onClaimDailyQuest={claimDailyQuest}
            lastClaimed={lastClaimed}
            dailyStreak={progress.dailyStreak}
          />
        </section>
        <section id="games-section">
          <QuestSection />
        </section>
        <section id="books-section">
          <BookSection />
        </section>
        <section id="parent-section">
          <CompactParentFooter gerryEnabled={gerryEnabled} onToggleGerry={setGerryEnabled} />
        </section>
      </main>
      <FloatingGoatPanel hasProgress={hasProgress} currentXp={progress.xp} />
      <GerryCompanion selectedHero={progress.selectedAvatar} enabled={gerryEnabled} />
      <WelcomeBackModal
        isOpen={showWelcomeBack}
        onDismiss={dismissWelcomeBack}
        inactiveHours={inactiveHours}
        progress={progress}
      />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </ProgressProvider>
  );
}

export default App;
