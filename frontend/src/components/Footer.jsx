import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Send, Rocket, Zap, Shield, FileText, Wallet, ExternalLink, Gem, Coins } from 'lucide-react';
import { socialLinks } from '../data/mock';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'instagram': return Instagram;
      default: return Instagram;
    }
  };

  return (
    <footer className="footer-section py-12 px-4 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/90 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          {socialLinks.map((social) => {
            const Icon = getIcon(social.icon);
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-icon-link ${social.icon === 'instagram' ? 'social-icon-instagram' : ''}`}
                aria-label={social.name}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </a>
            );
          })}
        </div>

        {/* Newsletter */}
        <div className="newsletter-container max-w-md mx-auto mb-10">
          <h4 className="text-xl sm:text-2xl font-bold text-center mb-4 text-cyan-400 flex items-center justify-center gap-2">
            <Zap className="w-6 h-6" />
            POWER-UP YOUR INBOX!
            <Rocket className="w-6 h-6" />
          </h4>
          
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input flex-1 h-12 text-lg"
              required
            />
            <Button 
              type="submit" 
              className="newsletter-btn h-12 px-6"
              disabled={subscribed}
            >
              {subscribed ? (
                <span className="text-sm">🎉 YAY!</span>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          
          {subscribed && (
            <p className="text-center text-green-400 mt-3 font-bold animate-pulse">
              ✨ You're in the quest! Check your inbox! ✨
            </p>
          )}
        </div>

        {/* Blockchain Coming Soon Section */}
        <div className="blockchain-coming-soon mb-10 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border border-purple-500/30 relative overflow-hidden">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gem className="w-6 h-6 text-purple-400 animate-pulse" />
              <h4 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Coming Soon for Collectors!
              </h4>
              <span className="text-xl animate-bounce">✨</span>
            </div>
            
            <p className="text-center text-gray-300 text-sm sm:text-base mb-4 max-w-2xl mx-auto">
              Optional wallet to mint your badges on <span className="text-cyan-400 font-semibold">Apertum chain</span>, 
              BLQ adventure surprises, and visit the marketplace!
            </p>

            {/* Features Grid */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-purple-800/40 border border-purple-500/30 text-xs sm:text-sm font-semibold text-purple-300 flex items-center gap-1.5">
                <Coins className="w-4 h-4" />
                BLQ Adventure Points – Coming Soon!
              </span>
              <span className="px-3 py-1.5 rounded-full bg-cyan-800/40 border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-300">
                🏅 Mintable Badges
              </span>
              <span className="px-3 py-1.5 rounded-full bg-pink-800/40 border border-pink-500/30 text-xs sm:text-sm font-semibold text-pink-300">
                94M BLQ Cap
              </span>
            </div>

            {/* OpenPlaza Link & Wallet Button */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <a 
                href="https://openplaza.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="coming-soon-link group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/40 text-purple-300 hover:text-white hover:border-purple-400/70 transition-all cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-semibold">OpenPlaza Marketplace</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 animate-pulse">Coming Soon!</span>
              </a>
              
              <button 
                className="wallet-connect-btn flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/60 border border-gray-600/40 text-gray-400 cursor-not-allowed opacity-70"
                disabled
              >
                <Wallet className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-semibold">Optional – Coming Soon Collector Fun</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-px mb-8" />

        {/* Legal Links */}
        <div className="flex justify-center gap-6 mb-6">
          <Link 
            to="/privacy" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            to="/terms" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            © 2025 BlockQuest Official – 
            <span className="text-cyan-400 font-bold"> "Get ready to level up!"</span>
          </p>
          <p className="text-gray-500 text-sm">
            Made with 🚀 in Australia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
