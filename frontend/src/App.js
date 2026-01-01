import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import QuestSection from "./components/QuestSection";
import BookSection from "./components/BookSection";
import ParentSection from "./components/ParentSection";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";
import FloatingSidePanel from "./components/FloatingSidePanel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

const LandingPage = () => {
  useEffect(() => {
    // Set page title and meta for SEO
    document.title = "BlockQuest – Epic Games and Books for All Ages";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BlockQuest Official - Epic arcade games and books for all ages! Fun for the whole family with safe, ad-free learning adventures. Suitable for ages 5 and up.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'BlockQuest Official - Epic arcade games and books for all ages! Fun for the whole family with safe, ad-free learning adventures. Suitable for ages 5 and up.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="blockquest-app">
      <FloatingElements />
      <FloatingSidePanel />
      <Header />
      <main>
        <HeroSection />
        <section id="quest-section">
          <QuestSection />
        </section>
        <section id="book-section">
          <BookSection />
        </section>
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
