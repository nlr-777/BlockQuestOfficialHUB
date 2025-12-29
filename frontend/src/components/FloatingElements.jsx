import React from 'react';
import { Gamepad2, Gem, Coins, Box, Link2, Hexagon, Star, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  // Floating icons configuration
  const floatingIcons = [
    { Icon: Gamepad2, color: 'text-cyan-400', size: 'w-8 h-8', delay: '0s', duration: '15s', left: '5%' },
    { Icon: Gem, color: 'text-pink-400', size: 'w-6 h-6', delay: '2s', duration: '18s', left: '15%' },
    { Icon: Coins, color: 'text-yellow-400', size: 'w-7 h-7', delay: '4s', duration: '20s', left: '25%' },
    { Icon: Box, color: 'text-purple-400', size: 'w-6 h-6', delay: '1s', duration: '16s', left: '35%' },
    { Icon: Link2, color: 'text-green-400', size: 'w-5 h-5', delay: '3s', duration: '14s', left: '45%' },
    { Icon: Hexagon, color: 'text-orange-400', size: 'w-8 h-8', delay: '5s', duration: '17s', left: '55%' },
    { Icon: Star, color: 'text-yellow-300', size: 'w-6 h-6', delay: '2.5s', duration: '19s', left: '65%' },
    { Icon: Sparkles, color: 'text-cyan-300', size: 'w-7 h-7', delay: '1.5s', duration: '15s', left: '75%' },
    { Icon: Gamepad2, color: 'text-pink-300', size: 'w-5 h-5', delay: '4.5s', duration: '21s', left: '85%' },
    { Icon: Gem, color: 'text-lime-400', size: 'w-6 h-6', delay: '0.5s', duration: '16s', left: '95%' },
  ];

  return (
    <div className="floating-elements-container fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={`icon-${index}`}
          className={`floating-icon absolute ${item.color}`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <item.Icon className={`${item.size} drop-shadow-glow`} />
        </div>
      ))}

      {/* Blockchain Chain Links */}
      <div className="chain-link-animation">
        {[...Array(5)].map((_, i) => (
          <div
            key={`chain-${i}`}
            className="chain-block"
            style={{
              animationDelay: `${i * 0.5}s`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingElements;
