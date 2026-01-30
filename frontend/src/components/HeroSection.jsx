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
        {/* Curiosity Hook - Floating Question */}
        <div className="mb-4 animate-pulse">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-bold">
            🤔 Ever wondered why money exists? Or what a blockchain actually IS?
          </span>
        </div>

        {/* BlockQuest Logo - SMALLER */}
        <div className="mb-6 relative">
          <img 
            src={LOGO_URL} 
            alt="BlockQuest" 
            data-testid="blockquest-logo"
            className="hero-logo glitch-hover w-48 sm:w-56 md:w-64 lg:w-72 mx-auto cursor-pointer"
          />
          
          <div className="flex justify-center gap-4 mt-3">
            <Sparkles className="w-6 h-6 text-orange-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #ff6b35)' }} />
            <Zap className="w-6 h-6 text-purple-400 wobble" style={{ filter: 'drop-shadow(0 0 10px #9b5de5)' }} />
            <Sparkles className="w-6 h-6 text-cyan-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }} />
          </div>
        </div>

        {/* Epic Tagline */}
        <h1 className="hero-subtitle text-2xl sm:text-3xl md:text-4xl mb-3 font-black">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400">
            CHAOS UNLOCKED
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-6 max-w-xl mx-auto font-medium">
          Epic Books + Retro Arcade Games 🎮📚
        </p>
        
        {/* Curiosity Description */}
        <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
          5 friends. 1 goat trade. Infinite chaos. <br className="hidden sm:block" />
          <span className="text-cyan-400">Discover how money went from shells to Bitcoin</span> – through stories you&apos;ll actually want to read!
        </p>

        {/* Featured Content Cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          {/* Book Promo Card */}
          <a 
            href="#book-section" 
            onClick={(e) => { e.preventDefault(); document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}
            className="group relative cursor-pointer"
            data-testid="book-promo-card"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative flex items-center gap-4 px-6 py-4 bg-gray-900 rounded-xl border border-purple-500/30 group-hover:border-purple-400/60 transition-all">
              <img 
                src={CHAOS_CHRONICLES_PROMO} 
                alt="Web3 Chaos Chronicles" 
                className="w-16 h-20 rounded-lg object-cover shadow-lg"
              />
              <div className="text-left">
                <p className="text-purple-400 text-xs font-bold mb-1">📚 5-BOOK SERIES</p>
                <p className="text-white font-bold text-lg">Web3 Chaos Chronicles</p>
                <p className="text-gray-400 text-sm">Ages 10+ & confused adults!</p>
              </div>
              <ChevronDown className="w-5 h-5 text-purple-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Game Promo Card */}
          <a 
            href="#quest-section" 
            onClick={(e) => { e.preventDefault(); document.getElementById('quest-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}
            className="group relative cursor-pointer"
            data-testid="game-promo-card"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative flex items-center gap-4 px-6 py-4 bg-gray-900 rounded-xl border border-orange-500/30 group-hover:border-orange-400/60 transition-all">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-orange-400 text-xs font-bold mb-1">🎮 PLAY FREE</p>
                <p className="text-white font-bold text-lg">Retro Arcade</p>
                <p className="text-gray-400 text-sm">Learn Web3 while you play!</p>
              </div>
              <ChevronDown className="w-5 h-5 text-orange-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#quest-section" onClick={(e) => { e.preventDefault(); document.getElementById('quest-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}>
            <Button className="hero-cta-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-black text-base px-6 py-5 rounded-lg border-2 border-orange-400/50 shadow-lg shadow-orange-500/30 flex items-center gap-2" data-testid="play-arcade-btn">
              <Gamepad2 className="w-5 h-5" />
              INSERT COIN
            </Button>
          </a>
          <a href="#book-section" onClick={(e) => { e.preventDefault(); document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' }); createExplosion(e); }}>
            <Button className="hero-cta-btn bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-black text-base px-6 py-5 rounded-lg border-2 border-purple-400/50 shadow-lg shadow-purple-500/30 flex items-center gap-2" data-testid="read-books-btn">
              <BookOpen className="w-5 h-5" />
              UNLOCK CHAOS
            </Button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-500 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
