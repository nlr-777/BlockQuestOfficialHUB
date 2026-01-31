import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Send, Rocket, Zap, Shield, FileText, HelpCircle, Users } from 'lucide-react';
import { socialLinks } from '../data/mock';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }
      
      setSubscribed(true);
      setMessage(data.message);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
        setMessage('');
      }, 5000);
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again!');
    } finally {
      setLoading(false);
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
                data-testid={`social-link-${social.icon}`}
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
          
          <form onSubmit={handleSubscribe} className="flex gap-2" data-testid="newsletter-form">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input flex-1 h-12 text-lg"
              required
              disabled={loading}
              data-testid="newsletter-email-input"
            />
            <Button 
              type="submit" 
              className="newsletter-btn h-12 px-6"
              disabled={subscribed || loading}
              data-testid="newsletter-submit-btn"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : subscribed ? (
                <span className="text-sm">🎉 YAY!</span>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          
          {message && (
            <p className="text-center text-green-400 mt-3 font-bold animate-pulse" data-testid="newsletter-success">
              ✨ {message} ✨
            </p>
          )}
          
          {error && (
            <p className="text-center text-red-400 mt-3 font-bold" data-testid="newsletter-error">
              ❌ {error}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-px mb-8" />

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <Link 
            to="/faq" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
            data-testid="faq-link"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            to="/parents" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
            data-testid="parents-link"
          >
            <Users className="w-4 h-4" />
            <span>Parent Hub</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            to="/privacy" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            data-testid="privacy-link"
          >
            <Shield className="w-4 h-4" />
            <span>Privacy</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            to="/terms" 
            className="legal-link flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
            data-testid="terms-link"
          >
            <FileText className="w-4 h-4" />
            <span>Terms</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            © 2026 BlockQuest Official – 
            <span className="text-cyan-400 font-bold"> &quot;Get ready to level up!&quot;</span>
          </p>
          <p className="text-gray-500 text-sm mb-1">
            BlockQuest Official | ABN: 71 926 421 644 | Capricorn Coast, QLD
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
