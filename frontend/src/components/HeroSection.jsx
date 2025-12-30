import React, { useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';

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
    
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff69b4', '#ff6600'];
    const shapes = ['●', '★', '◆', '▲', '■', '✦', '⬡', '💎', '🌟', '⚡', '🚀', '🎉'];
    
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

    // Particle stars
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff69b4'][Math.floor(Math.random() * 5)],
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
      
      {/* Floating Emojis Container */}
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
            {['🚀', '🌟', '⬡', '💥', '🎉', '⭐', '💎', '⚡', '🔥', '🏆'][i % 10]}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* BlockQuest Logo */}
        <div className="mb-6">
          <img 
            src={LOGO_URL} 
            alt="BlockQuest" 
            className="hero-logo glitch-hover w-64 sm:w-80 md:w-96 lg:w-[500px] mx-auto cursor-pointer"
          />
          <div className="flex justify-center gap-3 mt-4">
            <Sparkles className="w-8 h-8 text-yellow-400 bounce-rotate neon-glow-yellow" />
            <Zap className="w-8 h-8 text-cyan-400 wobble neon-glow-cyan" />
            <Sparkles className="w-8 h-8 text-pink-400 bounce-rotate neon-glow-magenta" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl mb-8 font-bold">
          Epic Adventures & Learning Through Arcade Games + Books 🚀💥 Fun for the entire family!
        </p>
      </div>

      {/* Scroll Hint */}
      <button 
        onClick={handleScrollHint}
        className="absolute bottom-8 z-20 animate-bounce cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-12 h-12 text-cyan-400 drop-shadow-glow" />
      </button>
    </section>
  );
};

export default HeroSection;
