import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-cyan-400" />
          <span className="header-logo text-xl sm:text-2xl font-black">BLOCKQUEST</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('quest-section')}
            className="nav-link text-gray-300 hover:text-cyan-400 font-bold transition-colors"
          >
            Games
          </button>
          <button 
            onClick={() => scrollToSection('book-section')}
            className="nav-link text-gray-300 hover:text-cyan-400 font-bold transition-colors"
          >
            Books
          </button>
          <button 
            onClick={() => scrollToSection('parent-section')}
            className="nav-link text-gray-300 hover:text-cyan-400 font-bold transition-colors"
          >
            Parents
          </button>
        </nav>

        {/* CTA */}
        <a 
          href="https://blocky-arcade.preview.emergentagent.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="header-cta flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">PLAY NOW</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
