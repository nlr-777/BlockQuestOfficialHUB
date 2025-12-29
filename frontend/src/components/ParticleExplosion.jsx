import React, { useCallback } from 'react';

const ParticleExplosion = () => {
  const createExplosion = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const container = document.createElement('div');
    container.className = 'particle-explosion-container';
    container.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9999;
    `;
    
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff69b4', '#ff6600'];
    const shapes = ['●', '★', '◆', '▲', '■', '✦', '⬡', '💎', '🌟', '⚡'];
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      particle.style.cssText = `
        position: absolute;
        font-size: ${10 + Math.random() * 15}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        text-shadow: 0 0 10px currentColor;
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

  return { createExplosion };
};

export default ParticleExplosion;
