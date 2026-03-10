import React, { useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d8dff59b-4fda-48a1-a05d-f027b59837f6/artifacts/w2ll1mya_gemini-2.5-flash-image_BlockQuest_HQ_logo_design_bold_retro_arcade.jpg";

const CARD_IMAGES = {
  miniMoney: "https://customer-assets.emergentagent.com/job_d8dff59b-4fda-48a1-a05d-f027b59837f6/artifacts/y9goe8fx_generated_image_20260201_032529_1.png",
  retroArcade: "https://customer-assets.emergentagent.com/job_d8dff59b-4fda-48a1-a05d-f027b59837f6/artifacts/archm6de_generated_image_20260128_052005_1.png",
  chaosChronicles: "https://customer-assets.emergentagent.com/job_d8dff59b-4fda-48a1-a05d-f027b59837f6/artifacts/2xl5flfa_generated_image_20260124_035327_1.png",
};

const HeroSection = ({ questsCompleted = [] }) => {
  const canvasRef = useRef(null);

  const createExplosion = useCallback((e) => {
    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9999;`;
    const colors = ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff00ff', '#00ff00'];
    const shapes = ['●', '★', '◆', '▲', '💎', '🐐', '⚡', '🚀'];
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 25;
      const velocity = 60 + Math.random() * 100;
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.cssText = `position:absolute;font-size:${12+Math.random()*16}px;color:${colors[Math.floor(Math.random()*colors.length)]};text-shadow:0 0 10px currentColor;animation:particle-explode 0.8s ease-out forwards;--tx:${Math.cos(angle)*velocity}px;--ty:${Math.sin(angle)*velocity}px;--rotation:${Math.random()*720-360}deg;`;
      container.appendChild(particle);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1000);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, speedX: (Math.random() - 0.5) * 0.5, speedY: (Math.random() - 0.5) * 0.5,
        color: ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff69b4'][Math.floor(Math.random() * 5)],
        pulse: Math.random() * Math.PI * 2
      });
    }
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.pulse += 0.05;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size + Math.sin(p.pulse) * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.shadowBlur = 15; ctx.shadowColor = p.color; ctx.fill(); ctx.shadowBlur = 0;
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const scrollToBooks = (e) => {
    e.preventDefault();
    document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' });
    createExplosion(e);
  };

  const isMiniDone = questsCompleted.includes('mini_money');
  const isArcadeDone = questsCompleted.includes('retro_arcade');
  const isChaosDone = questsCompleted.includes('chaos_chronicles');

  return (
    <section className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="scanlines absolute inset-0 z-10 pointer-events-none" />
      <div className="emoji-rain absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="floating-emoji"
            style={{ left: `${Math.random()*100}%`, animationDelay: `${Math.random()*5}s`, animationDuration: `${8+Math.random()*7}s`, fontSize: `${1.5+Math.random()*2}rem` }}>
            {['🐐','⬡','₿','💥','📚','⭐','💎','⚡','🎮','🏆'][i % 10]}
          </span>
        ))}
      </div>

      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto w-full">
        <div className="mb-4 relative">
          <img src={LOGO_URL} alt="BlockQuest" data-testid="blockquest-logo"
            className="hero-logo glitch-hover w-36 sm:w-44 md:w-52 mx-auto cursor-pointer" />
          <div className="flex justify-center gap-4 mt-2">
            <Sparkles className="w-5 h-5 text-orange-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #ff6b35)' }} />
            <Zap className="w-5 h-5 text-purple-400 wobble" style={{ filter: 'drop-shadow(0 0 10px #9b5de5)' }} />
            <Sparkles className="w-5 h-5 text-cyan-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }} />
          </div>
        </div>

        <h1 className="hero-subtitle text-2xl sm:text-3xl md:text-4xl mb-3 font-black">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400">
            CHAOS CHRONICLES UNLOCKED!
          </span>
          <span className="ml-2">🐐🎮⚡</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
          Your kid understands TikTok but not money? We fixed that. 💸
        </p>

        {/* 3-Way Funnel Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-5xl mx-auto">
          {/* Card 1: Mini Money Quest */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative flex flex-col h-full bg-gray-900 rounded-2xl border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-all overflow-hidden">
              <div className="h-32 sm:h-40 overflow-hidden">
                <img src={CARD_IMAGES.miniMoney} alt="Mini Money Quest" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-black text-cyan-400 mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  MINI MONEY QUEST 🐐
                </h3>
                <p className="text-xs text-purple-400 font-bold mb-1">The Future Frontier – Quick teaser</p>
                <p className="text-sm text-gray-300 mb-2 flex-1">Help Gary the Goat trade & discover why money exists! (~5-15 min)</p>
                {isMiniDone && <p className="text-xs text-green-400 font-bold mb-1">✅ Completed! Reward claimed.</p>}
                <p className="text-[10px] text-gray-500 mb-2">After playing, return & claim in Quest Log below!</p>
                <a href="https://block-quest-future-frontier.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={createExplosion} className="block">
                  <Button className="crt-distort ripple-effect w-full py-2.5 font-black text-xs bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 border-2 border-cyan-400/50 text-black rounded-lg"
                    style={{ boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)' }}>
                    {isMiniDone ? 'PLAY AGAIN 🐐' : 'PLAY TEASER NOW 🐐'}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Retro Arcade */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative flex flex-col h-full bg-gray-900 rounded-2xl border-2 border-orange-500/30 group-hover:border-orange-400/60 transition-all overflow-hidden">
              <div className="h-32 sm:h-40 overflow-hidden">
                <img src={CARD_IMAGES.retroArcade} alt="Retro Arcade" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-black text-orange-400 mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  RETRO ARCADE 🎮
                </h3>
                <p className="text-xs text-purple-400 font-bold mb-1">Main free playground</p>
                <p className="text-sm text-gray-300 mb-2 flex-1">Retro levels, leaderboards, endless chaos!</p>
                {isArcadeDone && <p className="text-xs text-green-400 font-bold mb-1">✅ Completed! Reward claimed.</p>}
                <p className="text-[10px] text-gray-500 mb-2">After playing, return & claim in Quest Log to unlock heroes!</p>
                <a href="https://block-quest-retro-arcade-v1-2026.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={createExplosion} className="block">
                  <Button className="crt-distort ripple-effect w-full py-2.5 font-black text-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-2 border-orange-400/50 text-white rounded-lg"
                    style={{ boxShadow: '0 0 15px rgba(255, 107, 53, 0.4)' }}>
                    {isArcadeDone ? 'PLAY AGAIN 🎮' : 'INSERT COIN – PLAY FULL 🎮'}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Chaos Chronicles */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative flex flex-col h-full bg-gray-900 rounded-2xl border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-all overflow-hidden">
              <div className="h-32 sm:h-40 overflow-hidden">
                <img src={CARD_IMAGES.chaosChronicles} alt="Chaos Chronicles" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-black text-purple-400 mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  CHAOS CHRONICLES 📚
                </h3>
                <p className="text-xs text-orange-400 font-bold mb-1">Stories + slide decks</p>
                <p className="text-sm text-gray-300 mb-2 flex-1">Unlock the real 'why' behind the games!</p>
                {isChaosDone && <p className="text-xs text-green-400 font-bold mb-1">✅ Completed! Reward claimed.</p>}
                <p className="text-[10px] text-gray-500 mb-2">Explore the books & claim XP bonuses below!</p>
                <a href="#books-section" onClick={scrollToBooks} className="block">
                  <Button className="crt-distort ripple-effect w-full py-2.5 font-black text-xs bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 border-2 border-purple-400/50 text-white rounded-lg"
                    style={{ boxShadow: '0 0 15px rgba(155, 93, 229, 0.4)' }}>
                    {isChaosDone ? 'EXPLORE MORE 📚' : 'MEET THE SQUAD & DIVE IN 📚'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-500 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
