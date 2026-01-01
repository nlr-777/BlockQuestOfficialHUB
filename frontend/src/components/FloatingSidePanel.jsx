import React, { useState } from 'react';
import { Gem, X, ExternalLink, Coins, Wallet, ChevronRight } from 'lucide-react';

const FloatingSidePanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="floating-side-panel fixed right-0 top-1/2 -translate-y-1/2 z-40">
      {/* Collapsed State - Just a glowing tab */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="floating-tab flex items-center gap-2 px-3 py-4 rounded-l-xl bg-gradient-to-r from-purple-900/90 to-purple-800/90 border border-purple-500/40 border-r-0 text-purple-300 hover:text-white hover:from-purple-800/90 hover:to-purple-700/90 transition-all shadow-lg shadow-purple-500/20"
        >
          <div className="flex flex-col items-center gap-1">
            <Gem className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold writing-mode-vertical" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              SOON
            </span>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </div>
        </button>
      )}

      {/* Expanded State - Full Panel */}
      {isExpanded && (
        <div className="floating-panel-expanded w-72 sm:w-80 rounded-l-2xl bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-900/95 border border-purple-500/40 border-r-0 shadow-2xl shadow-purple-500/30 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Collector Zone
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 animate-pulse">
                Soon!
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full hover:bg-purple-700/50 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* BLQ Token Info */}
            <div className="p-3 rounded-xl bg-purple-800/30 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-300">BLQ Adventure Points</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">
                Earn & collect BLQ tokens through gameplay! 94M total supply.
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                Coming Soon!
              </span>
            </div>

            {/* Apertum Chain */}
            <div className="p-3 rounded-xl bg-cyan-800/30 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⛓️</span>
                <span className="text-sm font-semibold text-cyan-300">Apertum Chain</span>
              </div>
              <p className="text-xs text-gray-400">
                Optional badge minting on kid-friendly blockchain.
              </p>
            </div>

            {/* OpenPlaza Link */}
            <a
              href="https://openplaza.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl bg-pink-800/30 border border-pink-500/20 hover:bg-pink-800/40 transition-colors group"
              onClick={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-semibold text-pink-300">OpenPlaza</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 animate-pulse">
                  Soon!
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Marketplace for your collectibles!
              </p>
            </a>

            {/* Wallet Connect Button */}
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-600/40 text-gray-400 cursor-not-allowed"
              disabled
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-semibold">Connect Wallet</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-500">
                Optional
              </span>
            </button>

            <p className="text-center text-xs text-gray-500">
              Optional – Coming Soon Collector Fun 🎮
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSidePanel;
