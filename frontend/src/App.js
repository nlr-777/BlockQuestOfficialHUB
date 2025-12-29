import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import QuestSection from "./components/QuestSection";
import BookSection from "./components/BookSection";
import ParentSection from "./components/ParentSection";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Set page title and meta for SEO
    document.title = "BlockQuest – Max Fun Web3 Games & Books for Kids Ages 5+";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BlockQuest Official - The ultimate dopamine-fueled Web3 learning adventure! Play arcade games, read exciting books, and master blockchain concepts. Safe, ad-free fun for ages 5+!');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'BlockQuest Official - The ultimate dopamine-fueled Web3 learning adventure! Play arcade games, read exciting books, and master blockchain concepts. Safe, ad-free fun for ages 5+!';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="App blockquest-app">
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
}

export default App;
