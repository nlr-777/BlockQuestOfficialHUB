import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Zap, Trophy, Rocket, Star, Gamepad2, Coins, Hexagon } from 'lucide-react';
import { games } from '../data/mock';

// Game screenshot URLs - actual game preview images
const gameScreenshots = {
  1: 'https://blocky-arcade.preview.emergentagent.com/', // Blocky Multiverse
  2: 'https://crtblitz.preview.emergentagent.com/' // CRT Blitz
};

const QuestSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced particle explosion on button click
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
    const shapes = ['●', '★', '◆', '▲', '■', '✦', '⬡', '💎', '🌟', '⚡', '🚀', '🎉', '🏆', '🎮'];
    
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 40;
      const velocity = 80 + Math.random() * 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.cssText = `
        position: absolute;
        font-size: ${14 + Math.random() * 20}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        animation: particle-explode 1s ease-out forwards;
        --tx: ${tx}px;
        --ty: ${ty}px;
        --rotation: ${Math.random() * 720 - 360}deg;
      `;
      container.appendChild(particle);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1200);
  }, []);

  return (
    <section id="quest-section" className="quest-section py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

      {/* Floating decorative icons */}
      <div className="absolute left-4 bottom-1/4 hidden lg:block">
        <Gamepad2 className="w-10 h-10 text-cyan-400/30 spin-slow" />
      </div>
      <div className="absolute right-4 top-1/4 hidden lg:block">
        <Coins className="w-8 h-8 text-yellow-400/30 bounce-rotate" />
      </div>
      <div className="absolute left-1/4 top-20 hidden lg:block">
        <Hexagon className="w-6 h-6 text-pink-400/20 wobble" />
      </div>
      
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="section-title rgb-split text-4xl sm:text-6xl md:text-7xl font-black mb-4 cursor-pointer">
          QUEST EXPLOSION!
        </h2>
        <div className="flex justify-center gap-4">
          <Rocket className="w-8 h-8 text-cyan-400 bounce-rotate neon-glow-cyan" />
          <Star className="w-8 h-8 text-yellow-400 wobble neon-glow-yellow" />
          <Zap className="w-8 h-8 text-pink-400 bounce-rotate neon-glow-magenta" />
        </div>
        
        {/* XP & Badges Teaser Banner */}
        <div className="mt-8 inline-block">
          <div className="xp-badge-banner px-6 py-3 rounded-full bg-gradient-to-r from-purple-900/60 via-pink-900/40 to-purple-900/60 border border-pink-500/30">
            <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-pink-400 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg">⭐</span>
              Earn XP, Levels & Fun Badges in games!
              <span className="text-lg">🏆</span>
            </p>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card ${game.theme === 'rainbow' ? 'game-card-rainbow' : 'game-card-neon'}`}
            onMouseEnter={() => setHoveredCard(game.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Game Screenshot - Live Preview */}
            <div className="game-screenshot relative h-48 sm:h-64 rounded-t-2xl overflow-hidden">
              <iframe
                src={gameScreenshots[game.id]}
                title={game.title}
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                style={{ 
                  transform: 'scale(0.5)', 
                  transformOrigin: 'top left',
                  width: '200%',
                  height: '200%'
                }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
              {/* Overlay gradient for better blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating emojis on hover */}
              {hoveredCard === game.id && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {game.emojis.map((emoji, i) => (
                    <span
                      key={i}
                      className="absolute animate-float-up text-3xl"
                      style={{
                        left: `${20 + i * 15}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8">
              <h3 className={`game-title text-2xl sm:text-3xl font-black mb-4 ${game.theme === 'rainbow' ? 'text-rainbow' : 'text-neon-cyan'}`}>
                {game.title}
              </h3>
              <p className="text-gray-300 text-lg mb-6 font-medium">
                {game.description}
              </p>
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
                onClick={createExplosion}
              >
                <Button 
                  className={`play-button crt-distort ripple-effect w-full h-16 sm:h-20 text-xl sm:text-2xl font-black ${game.theme === 'rainbow' ? 'play-button-rainbow' : 'play-button-neon'}`}
                >
                  <Trophy className="w-6 h-6 mr-2 bounce-rotate" />
                  PLAY NOW!
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestSection;
