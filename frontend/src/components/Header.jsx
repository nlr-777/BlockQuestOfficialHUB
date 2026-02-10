/* =====================================================
   UPGRADED HEADER COMPONENT
   - Sticky navigation with CSS position: sticky
   - Hamburger menu for mobile (CSS checkbox hack)
   - Smooth scrolling with scrollIntoView
   - WCAG 2.1 compliant with ARIA roles
   ===================================================== */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Gamepad2, BookOpen, Users, Mail, Home } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/3oc0w6yi_blockquest_logo_primary.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  /* Track scroll position for header background effect */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Smooth scroll to section with scrollIntoView */
  const scrollToSection = (sectionId) => {
    // If not on home page, navigate first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  /* Scroll to top */
  const scrollToTop = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  /* Navigation items */
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: scrollToTop },
    { id: 'quest-section', label: 'Arcade', icon: Gamepad2, action: () => scrollToSection('quest-section') },
    { id: 'books-section', label: 'Books', icon: BookOpen, action: () => scrollToSection('books-section') },
    { id: 'parent-section', label: 'Parents', icon: Users, action: () => scrollToSection('parent-section') }
  ];

  return (
    <header 
      className={`header-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-purple-500/10' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav 
        className="max-w-7xl mx-auto px-4 py-3"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline focus:outline-2 focus:outline-blue-500 rounded"
            aria-label="BlockQuest Home"
          >
            <img 
              src={LOGO_URL} 
              alt="BlockQuest Official Logo"
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="nav-link flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-cyan-400 font-bold transition-colors rounded-lg hover:bg-gray-800/50 focus:outline focus:outline-2 focus:outline-blue-500"
                role="menuitem"
                data-testid={`nav-${item.id}`}
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <a 
            href="https://retro-quest-hub.preview.emergentagent.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex header-cta items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:from-orange-400 hover:to-purple-500 transition-all shadow-lg shadow-orange-500/20 focus:outline focus:outline-2 focus:outline-blue-500"
            data-testid="play-now-cta"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            PLAY NOW
          </a>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-cyan-400 transition-colors focus:outline focus:outline-2 focus:outline-blue-500 rounded"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          role="menu"
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-2 p-4 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-gray-700/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 font-bold transition-colors rounded-lg hover:bg-gray-800/50 focus:outline focus:outline-2 focus:outline-blue-500"
                role="menuitem"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                {item.label}
              </button>
            ))}
            
            {/* Mobile CTA */}
            <a 
              href="https://retro-quest-hub.preview.emergentagent.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:from-orange-400 hover:to-purple-500 transition-all focus:outline focus:outline-2 focus:outline-blue-500"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              PLAY NOW
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
