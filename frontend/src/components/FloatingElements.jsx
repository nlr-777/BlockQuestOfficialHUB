import React from 'react';
import { Gamepad2, Gem, Coins, Box, Link2, Hexagon, Star, Sparkles } from 'lucide-react';

// AI Image URLs
const AI_IMAGES = {
  pixelArt1: 'https://images.unsplash.com/photo-1746047226443-2ba1d7bfaef6?w=200&h=200&fit=crop',
  pixelArt2: 'https://images.unsplash.com/photo-1725181213820-b68b89db5767?w=200&h=200&fit=crop',
  arcade1: 'https://images.unsplash.com/photo-1572289758057-3e0f4327833b?w=200&h=200&fit=crop',
  arcade2: 'https://images.unsplash.com/photo-1700085664050-43cea0e1c3fd?w=200&h=200&fit=crop',
  mascot1: 'https://images.unsplash.com/photo-1636899333723-2194ed81d1ce?w=150&h=150&fit=crop',
};

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

  // Floating images configuration
  const floatingImages = [
    { src: AI_IMAGES.mascot1, delay: '0s', duration: '25s', left: '8%', size: 'w-16 h-16' },
    { src: AI_IMAGES.pixelArt1, delay: '3s', duration: '30s', left: '88%', size: 'w-20 h-20' },
    { src: AI_IMAGES.arcade1, delay: '6s', duration: '28s', left: '70%', size: 'w-14 h-14' },
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

      {/* Floating AI Images */}
      {floatingImages.map((item, index) => (
        <div
          key={`img-${index}`}
          className="floating-image absolute"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <img
            src={item.src}
            alt="Floating element"
            className={`${item.size} rounded-lg object-cover opacity-70 hover:opacity-100 transition-opacity`}
            loading="lazy"
          />
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
