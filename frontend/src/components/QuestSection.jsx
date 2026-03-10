import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Zap, Rocket, Star, Gamepad2, Coins, Lock, Play } from 'lucide-react';
import { games, GAME_PREVIEW_IMAGE } from '../data/mock';

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
    
    const colors = ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff69b4', '#00ff00'];
    const shapes = ['●', '★', '◆', '▲', '■', '✦', '⬡', '💎', '🐐', '⚡', '🎮', '🏆'];
    
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
      <div className="absolute inset-0 bg-gradient-radial from-orange-900/10 via-purple-900/10 to-transparent" />

      {/* Floating decorative icons */}
      <div className="absolute left-4 bottom-1/4 hidden lg:block">
        <Gamepad2 className="w-10 h-10 text-orange-400/30 spin-slow" />
      </div>
      <div className="absolute right-4 top-1/4 hidden lg:block">
        <Coins className="w-8 h-8 text-yellow-400/30 bounce-rotate" />
      </div>
      <div className="absolute left-1/4 top-20 hidden lg:block text-3xl wobble">
        🐐
      </div>
      
      {/* Goat Resource Intro */}
      <div className="max-w-3xl mx-auto mb-10 relative z-10">
        <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-900/40 via-purple-900/30 to-cyan-900/40 border border-orange-500/20 text-center">
          <p className="text-sm sm:text-base text-gray-300">
            Played the Mini Money Quest or Retro Arcade? Tap the floating goat 🐐 (bottom-right) for all slide decks, stories, videos & extras!
          </p>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="section-title rgb-split text-4xl sm:text-5xl md:text-6xl font-black mb-4 cursor-pointer" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.5))' }}>
          ARCADE ZONE!
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          <Rocket className="w-7 h-7 text-orange-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #ff6b35)' }} />
          <Star className="w-7 h-7 text-yellow-400 wobble" style={{ filter: 'drop-shadow(0 0 10px #ffff00)' }} />
          <Zap className="w-7 h-7 text-purple-400 bounce-rotate" style={{ filter: 'drop-shadow(0 0 10px #9b5de5)' }} />
        </div>
        
        {/* Story Connection Description */}
        <div className="max-w-2xl mx-auto mb-6">
          <p className="text-gray-300 text-base sm:text-lg mb-3">
            <span className="text-cyan-400 font-bold">Play what you read!</span> The 5 friends from Web3 Chaos Chronicles built this arcade to test everything they learned.
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            🐐 From Gary&apos;s legendary goat trade to smart contracts — <span className="text-orange-400 font-semibold">master each concept through gameplay!</span>
          </p>
        </div>
        
        {/* XP & Badges Teaser Banner */}
        <div className="inline-block">
          <div className="xp-badge-banner px-5 py-2 rounded-full bg-gradient-to-r from-orange-900/60 via-purple-900/40 to-orange-900/60 border border-orange-500/30">
            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-purple-400 flex items-center justify-center gap-2 flex-wrap">
              <span>⭐</span>
              Earn XP, Levels & Fun Badges!
              <span>🏆</span>
            </p>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card rounded-3xl overflow-hidden transition-all duration-500 ${
              game.comingSoon 
                ? 'border-2 border-purple-500/30 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' 
                : 'border-2 border-orange-500/50 bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900'
            }`}
            style={{ boxShadow: game.comingSoon ? '0 0 30px rgba(155, 93, 229, 0.2)' : '0 0 30px rgba(255, 107, 53, 0.2)' }}
            onMouseEnter={() => setHoveredCard(game.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Game Preview Area */}
            <div className="game-screenshot relative h-48 sm:h-56 overflow-hidden">
              {game.comingSoon ? (
                // Coming Soon placeholder
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
                  <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>🚀</div>
                  <p className="text-purple-300 font-bold text-xl">More Chaos Loading...</p>
                </div>
              ) : (
                // Game Preview with screenshot image
                <div className="absolute inset-0 bg-black overflow-hidden">
                  <img 
                    src={game.preview || GAME_PREVIEW_IMAGE}
                    alt={`${game.title} Preview`}
                    className="w-full h-full object-cover object-top"
                    data-testid="game-preview-image"
                  />
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
              
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

              {/* Coming Soon Badge */}
              {game.comingSoon && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-lg">
                  <Lock className="w-4 h-4" />
                  COMING SOON
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5">
              <h3 className={`game-title text-xl sm:text-2xl font-black mb-2 ${game.comingSoon ? 'text-purple-400' : 'text-orange-400'}`}>
                {game.title}
              </h3>
              <p className="text-gray-300 text-sm mb-2 font-medium">
                {game.description}
              </p>
              {/* XP & Badges Teaser - Per Card */}
              {!game.comingSoon && (
                <p className="text-xs mb-3 font-semibold text-orange-400/80">
                  ⭐ Earn XP, Levels & Fun Badges! 🏆
                </p>
              )}
              
              {game.comingSoon ? (
                <Button 
                  className="w-full h-12 sm:h-14 text-lg sm:text-xl font-black bg-purple-800/50 border-2 border-purple-500/50 text-purple-300 cursor-not-allowed"
                  disabled
                >
                  <Lock className="w-5 h-5 mr-2" />
                  COMING SOON
                </Button>
              ) : (
                <a 
                  href={game.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                  onClick={createExplosion}
                >
                  <Button 
                    className="play-button crt-distort ripple-effect w-full h-12 sm:h-14 text-lg sm:text-xl font-black bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-2 border-orange-400/50 text-white"
                    style={{ boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' }}
                  >
                    <Play className="w-5 h-5 mr-2 bounce-rotate" />
                    PLAY NOW!
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestSection;
