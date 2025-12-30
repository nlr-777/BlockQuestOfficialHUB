import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Send, Rocket, Zap, Shield, FileText } from 'lucide-react';
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
            Made with love 🚀 in Australia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
