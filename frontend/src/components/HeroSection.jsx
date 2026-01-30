import React, { useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Sparkles, Zap, Gamepad2, BookOpen } from 'lucide-react';
import { CHAOS_CHRONICLES_PROMO } from '../data/mock';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/3oc0w6yi_blockquest_logo_primary.png";

const HeroSection = () => {
  const canvasRef = useRef(null);

  // Particle explosion on button click
  const createExplosion = useCallback((e) => {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9999;
    `;
    
    const colors = ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff00ff', '#00ff00'];
    const shapes = ['●', '★', '◆', '▲', '■', '✦', '⬡', '💎', '🐐', '⚡', '🚀', '📚'];
    
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 35;
      const velocity = 60 + Math.random() * 120;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.cssText = `
        position: absolute;
        font-size: ${12 + Math.random() * 18}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        animation: particle-explode 0.8s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
        --rotation: ${Math.random() * 720 - 360}deg;
      `;
      container.appendChild(particle);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1000);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle stars with chaos colors
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff69b4'][Math.floor(Math.random() * 5)],
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.05;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const glowSize = Math.max(0.5, p.size + Math.sin(p.pulse) * 1.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const handleScrollHint = () => {
    document.getElementById('quest-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Scanline Overlay */}
      <div className="scanlines absolute inset-0 z-10 pointer-events-none" />
      
      {/* Floating Emojis Container - Now with goats! */}
      <div className="emoji-rain absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span 
            key={i} 
            className="floating-emoji"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              fontSize: `${1.5 + Math.random() * 2}rem`
            }}
          >
            {['🐐', '⬡', '₿', '💥', '📚', '⭐', '💎', '⚡', '🎮', '🏆'][i % 10]}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* BlockQuest Logo + Gary */}
        <div className="mb-6 relative">
          {/* Gary the Goat - floating beside logo on larger screens */}
          <div className="hidden lg:block absolute -left-32 top-1/2 -translate-y-1/2">
            <img 
              src={GARY_MASCOT} 
              alt="Gary the Goat" 
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-500/50 shadow-lg shadow-orange-500/30 animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
          
          <img 
            src={LOGO_URL} 
            alt="BlockQuest" 
            className="hero-logo glitch-hover w-64 sm:w-80 md:w-96 lg:w-[500px] mx-auto cursor-pointer"
          />
          
          {/* Gary on mobile - below logo */}
          <div className="lg:hidden flex justify-center mt-4">
            <img 
              src={GARY_MASCOT} 
              alt="Gary the Goat" 
              className="w-20 h-20 rounded-full object-cover border-4 border-orange-500/50 shadow-lg shadow-orange-500/30 animate-bounce"
              style={{ animationDuration: '3s' }}
            />
          </div>
          
          <div className="flex justify-center gap-3 mt-4">
            <Sparkles className="w-8 h-8 text-orange-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #ff6b35)' }} />
            <Zap className="w-8 h-8 text-purple-400 wobble" style={{ filter: 'drop-shadow(0 0 10px #9b5de5)' }} />
            <Sparkles className="w-8 h-8 text-cyan-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }} />
          </div>
        </div>

        {/* New Chaos Tagline */}
        <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl mb-4 font-bold">
          Chaos Unlocked: Epic Books + Retro Arcade Games 🎮📚
        </p>
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          From bartering goats to blockchain rebellion – read the stories, play the chaos, master Web3 the fun way!
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#quest-section" onClick={(e) => { e.preventDefault(); document.getElementById('quest-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}>
            <Button className="hero-cta-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black text-lg px-8 py-6 rounded-xl border-2 border-orange-400/50 shadow-lg shadow-orange-500/30 flex items-center gap-2">
              <Gamepad2 className="w-6 h-6" />
              Play the Arcade
            </Button>
          </a>
          <a href="#book-section" onClick={(e) => { e.preventDefault(); document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}>
            <Button className="hero-cta-btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-black text-lg px-8 py-6 rounded-xl border-2 border-purple-400/50 shadow-lg shadow-purple-500/30 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Read the Books
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Hint */}
      <button 
        onClick={handleScrollHint}
        className="absolute bottom-8 z-20 animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-12 h-12 text-orange-400 drop-shadow-glow" />
      </button>
    </section>
  );
};

export default HeroSection;
