import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import QuestSection from "./components/QuestSection";
import BookSection from "./components/BookSection";
// import MerchSection from "./components/MerchSection"; // Hidden for now - ready for future use
import ParentSection from "./components/ParentSection";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FAQPage from "./pages/FAQPage";
import ParentHubPage from "./pages/ParentHubPage";

const LandingPage = () => {
  useEffect(() => {
    // Set page title and meta for SEO
    document.title = "BlockQuest HQ – Epic Games and Books for All Ages";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BlockQuest HQ - Chaos Unlocked! Web3 Chaos Chronicles book series featuring Gary the Goat + BlockQuest Retro Arcade games. Learn Web3 the fun way! Ages 10+ and confused adults welcome.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'BlockQuest HQ - Chaos Unlocked! Web3 Chaos Chronicles book series featuring Gary the Goat + BlockQuest Retro Arcade games. Learn Web3 the fun way! Ages 10+ and confused adults welcome.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="blockquest-app">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <section id="quest-section">
          <QuestSection />
        </section>
        <section id="book-section">
          <BookSection />
        </section>
        {/* MerchSection - Hidden for now, ready for future use */}
        <section id="parent-section">
          <ParentSection />
        </section>
      </main>
      <Footer />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
