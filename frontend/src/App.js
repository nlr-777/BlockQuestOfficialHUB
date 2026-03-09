import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AvatarSelector from "./components/AvatarSelector";
import DailyQuest from "./components/DailyQuest";
import ProgressOverview from "./components/ProgressOverview";
import QuestSection from "./components/QuestSection";
import BookSection from "./components/BookSection";
import CompactParentFooter from "./components/ParentSection";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";
import FloatingGoatPanel from "./components/FloatingGoatPanel";
import useProgress from "./hooks/useProgress";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FAQPage from "./pages/FAQPage";
import ParentHubPage from "./pages/ParentHubPage";

const LandingPage = () => {
  const {
    progress, claimQuest, unlockHero, selectAvatar,
    claimDailyQuest, resetProgress, hasProgress, totalQuests, totalHeroes,
    lastClaimed, heroThresholds
  } = useProgress();

  useEffect(() => {
    document.title = "BlockQuest HQ – Epic Games and Books for All Ages";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BlockQuest HQ - Chaos Unlocked! Web3 Chaos Chronicles book series featuring Gary the Goat + BlockQuest Retro Arcade games.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'BlockQuest HQ - Chaos Unlocked! Web3 Chaos Chronicles book series featuring Gary the Goat + BlockQuest Retro Arcade games.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="blockquest-app">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection questsCompleted={progress.questsCompleted} />
        <AvatarSelector
          selectedAvatar={progress.selectedAvatar}
          onSelect={selectAvatar}
          onUnlockHero={unlockHero}
          unlockedHeroes={progress.heroesUnlocked}
          currentXp={progress.xp}
        />
        <DailyQuest
          streak={progress.streak}
          isDone={progress.dailyQuestDate === new Date().toDateString()}
          onClaim={claimDailyQuest}
        />
        <ProgressOverview
          progress={progress}
          totalQuests={totalQuests}
          totalHeroes={totalHeroes}
          onClaimQuest={claimQuest}
          onReset={resetProgress}
          lastClaimed={lastClaimed}
          heroThresholds={heroThresholds}
        />
        <section>
          <QuestSection />
        </section>
        <section id="books-section">
          <BookSection />
        </section>
        <section id="parent-section">
          <CompactParentFooter />
        </section>
      </main>
      <Footer />
      <FloatingGoatPanel hasProgress={hasProgress} currentXp={progress.xp} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/parents" element={<ParentHubPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
