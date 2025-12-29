import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef(null);

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
        {/* Explosive Title */}
        <div className="mb-6">
          <h1 className="hero-title text-6xl sm:text-8xl md:text-9xl font-black tracking-wider">
            BLOCKQUEST
          </h1>
          <div className="flex justify-center gap-2 mt-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <Zap className="w-8 h-8 text-cyan-400 animate-bounce" />
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl mb-12 font-bold">
          MAX FUN GAMES + BOOKS TO MASTER WEB3! 🚀💥 Ages 5+
        </p>

        {/* TWO ENORMOUS BUTTONS */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-center w-full">
          <a 
            href="https://blocky-arcade.preview.emergentagent.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full lg:w-auto"
          >
            <Button className="mega-button mega-button-cyan w-full lg:w-80 h-24 sm:h-32 text-lg sm:text-2xl font-black">
              <span className="flex flex-col items-center gap-2">
                <span>ENTER BLOCKY MULTIVERSE</span>
                <span className="text-2xl sm:text-3xl">🌟🎉</span>
              </span>
            </Button>
          </a>
          
          <a 
            href="https://crtblitz.preview.emergentagent.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full lg:w-auto"
          >
            <Button className="mega-button mega-button-magenta w-full lg:w-80 h-24 sm:h-32 text-lg sm:text-2xl font-black">
              <span className="flex flex-col items-center gap-2">
                <span>CRT BLITZ ARCADE</span>
                <span className="text-2xl sm:text-3xl">⬡🔥</span>
              </span>
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
        <ChevronDown className="w-12 h-12 text-cyan-400 drop-shadow-glow" />
      </button>
    </section>
  );
};

export default HeroSection;
