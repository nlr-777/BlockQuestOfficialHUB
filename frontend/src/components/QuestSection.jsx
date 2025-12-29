import React, { useState } from 'react';
import { Button } from './ui/button';
import { Zap, Trophy, Rocket, Star } from 'lucide-react';
import { games } from '../data/mock';

// Game screenshot URLs - actual game preview images
const gameScreenshots = {
  1: 'https://blocky-arcade.preview.emergentagent.com/', // Blocky Multiverse
  2: 'https://crtblitz.preview.emergentagent.com/' // CRT Blitz
};

const QuestSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const createConfetti = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.left = `${rect.left + rect.width / 2}px`;
    confettiContainer.style.top = `${rect.top}px`;
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff69b4'];
    const emojis = ['🎉', '✨', '⭐', '💥', '🚀'];
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('span');
      particle.textContent = Math.random() > 0.5 ? emojis[Math.floor(Math.random() * emojis.length)] : '●';
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 10}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        animation: confetti-burst 1s ease-out forwards;
        --tx: ${(Math.random() - 0.5) * 200}px;
        --ty: ${-Math.random() * 150 - 50}px;
      `;
      confettiContainer.appendChild(particle);
    }
    
    document.body.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 1000);
  };

  return (
    <section id="quest-section" className="quest-section py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
      
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="section-title text-4xl sm:text-6xl md:text-7xl font-black mb-4">
          QUEST EXPLOSION!
        </h2>
        <div className="flex justify-center gap-4">
          <Rocket className="w-8 h-8 text-cyan-400 animate-bounce" />
          <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
          <Zap className="w-8 h-8 text-pink-400 animate-bounce" />
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
              >
                <Button 
                  className={`play-button w-full h-16 sm:h-20 text-xl sm:text-2xl font-black ${game.theme === 'rainbow' ? 'play-button-rainbow' : 'play-button-neon'}`}
                  onMouseEnter={createConfetti}
                >
                  <Trophy className="w-6 h-6 mr-2" />
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
