/* =====================================================
   FEATURED GAMES CAROUSEL COMPONENT
   Showcases the 16 educational mini-games with retro styling
   ===================================================== */

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';

/* 16 Educational Mini-Games Data */
const miniGames = [
  { id: 1, name: "Chain Builder", icon: "⛓️", description: "Learn how blockchain links work by connecting blocks!", difficulty: "Easy", teaches: "Blockchain basics" },
  { id: 2, name: "NFT Collector", icon: "🖼️", description: "Discover digital ownership by collecting unique items!", difficulty: "Easy", teaches: "NFT fundamentals" },
  { id: 3, name: "Token Trader", icon: "🪙", description: "Trade tokens and learn about supply & demand!", difficulty: "Medium", teaches: "Tokenomics" },
  { id: 4, name: "Hash Matcher", icon: "🔐", description: "Match hashes to unlock secrets - cryptography fun!", difficulty: "Medium", teaches: "Hashing & security" },
  { id: 5, name: "DAO Voter", icon: "🗳️", description: "Vote on proposals and see democracy in action!", difficulty: "Easy", teaches: "Governance & DAOs" },
  { id: 6, name: "Smart Contract Lab", icon: "📜", description: "Build simple if-then rules like real contracts!", difficulty: "Hard", teaches: "Smart contracts" },
  { id: 7, name: "Wallet Wizard", icon: "👛", description: "Learn wallet safety by protecting your keys!", difficulty: "Easy", teaches: "Wallet security" },
  { id: 8, name: "Gas Fee Racer", icon: "⚡", description: "Race to understand transaction fees!", difficulty: "Medium", teaches: "Gas & fees" },
  { id: 9, name: "Ledger Legend", icon: "📒", description: "Keep the ledger balanced - accounting adventure!", difficulty: "Medium", teaches: "Distributed ledgers" },
  { id: 10, name: "Consensus Quest", icon: "🤝", description: "Get nodes to agree - teamwork makes the dream work!", difficulty: "Hard", teaches: "Consensus mechanisms" },
  { id: 11, name: "DeFi Farmer", icon: "🌾", description: "Plant, grow, and harvest in the DeFi garden!", difficulty: "Medium", teaches: "DeFi basics" },
  { id: 12, name: "Metaverse Explorer", icon: "🌐", description: "Explore virtual worlds and digital spaces!", difficulty: "Easy", teaches: "Metaverse concepts" },
  { id: 13, name: "Scam Spotter", icon: "🕵️", description: "Spot the scam before it's too late - stay safe!", difficulty: "Easy", teaches: "Security awareness" },
  { id: 14, name: "Block Miner", icon: "⛏️", description: "Mine blocks and earn rewards - dig deep!", difficulty: "Medium", teaches: "Mining & validation" },
  { id: 15, name: "Bridge Builder", icon: "🌉", description: "Connect different chains with bridges!", difficulty: "Hard", teaches: "Cross-chain bridges" },
  { id: 16, name: "Web3 Whiz", icon: "🚀", description: "Final boss - combine all your knowledge!", difficulty: "Boss", teaches: "Everything!" }
];

/* Difficulty color mapping */
const difficultyColors = {
  Easy: "text-green-400 border-green-500/30 bg-green-900/20",
  Medium: "text-yellow-400 border-yellow-500/30 bg-yellow-900/20",
  Hard: "text-orange-400 border-orange-500/30 bg-orange-900/20",
  Boss: "text-red-400 border-red-500/30 bg-red-900/20"
};

const FeaturedGamesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  
  /* Show 4 games at a time on desktop, 2 on tablet, 1 on mobile */
  const gamesPerView = 4;
  const maxIndex = Math.ceil(miniGames.length / gamesPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  /* Get visible games based on current index */
  const visibleGames = miniGames.slice(
    currentIndex * gamesPerView,
    (currentIndex + 1) * gamesPerView
  );

  return (
    <section 
      className="featured-games-section py-16 px-4 relative overflow-hidden"
      aria-labelledby="featured-games-title"
      role="region"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-orange-900/10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-cyan-400" aria-hidden="true" />
            <h2 
              id="featured-games-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400"
            >
              16 MINI-GAMES TO MASTER
            </h2>
            <Star className="w-8 h-8 text-yellow-400" aria-hidden="true" />
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Each game teaches a different Web3 concept - from blockchain basics to advanced DeFi!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-purple-800/80 border border-purple-500/50 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous games"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>

          <Button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-purple-800/80 border border-purple-500/50 hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next games"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>

          {/* Games Grid - CSS Grid with auto-fit for responsiveness */}
          <div 
            ref={carouselRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8"
            role="list"
            aria-live="polite"
          >
            {visibleGames.map((game) => (
              <div
                key={game.id}
                role="listitem"
                className="game-card group relative p-5 rounded-xl bg-gray-900/70 border-2 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] focus-within:outline focus-within:outline-2 focus-within:outline-blue-500"
                tabIndex={0}
                aria-label={`${game.name}: ${game.description}`}
              >
                {/* Game Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {game.id}
                </div>

                {/* Game Icon - with pixelated hover glow effect */}
                <div className="text-5xl mb-3 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
                  {game.icon}
                </div>

                {/* Game Name */}
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {game.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>

                {/* Difficulty Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[game.difficulty]}`}>
                  {game.difficulty}
                </span>

                {/* What it teaches */}
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <p className="text-xs text-purple-400">
                    <Zap className="w-3 h-3 inline mr-1" aria-hidden="true" />
                    Teaches: {game.teaches}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Game carousel pages">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-cyan-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <a 
            href="https://block-quest-retro-arcade-v1-2026.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-400 hover:via-pink-400 hover:to-purple-400 text-white font-black text-lg rounded-xl border-2 border-orange-400/50 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 focus:outline focus:outline-2 focus:outline-blue-500"
          >
            <Gamepad2 className="w-6 h-6" aria-hidden="true" />
            PLAY ALL 16 GAMES NOW
            <span className="text-yellow-300">🎮</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGamesCarousel;
