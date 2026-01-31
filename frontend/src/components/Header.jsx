import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/3oc0w6yi_blockquest_logo_primary.png";

const Header = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={LOGO_URL} 
            alt="BlockQuest" 
            className="h-10 sm:h-12 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('quest-section')}
            className="nav-link text-gray-300 hover:text-cyan-400 font-bold transition-colors"
            data-testid="nav-games"
          >
            Games
          </button>
          <button 
            onClick={() => scrollToSection('book-section')}
            className="nav-link text-gray-300 hover:text-cyan-400 font-bold transition-colors"
            data-testid="nav-books"
          >
            Books
          </button>
          <Link 
            to="/parents"
            className="nav-link text-gray-300 hover:text-green-400 font-bold transition-colors"
            data-testid="nav-parents"
          >
            Parents
          </Link>
        </nav>

        {/* CTA */}
        <a 
          href="https://readtext-fix.preview.emergentagent.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="header-cta flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
          data-testid="play-now-cta"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">PLAY NOW</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
