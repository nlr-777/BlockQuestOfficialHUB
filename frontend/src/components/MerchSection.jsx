import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag, Sparkles, Lock } from 'lucide-react';

const MerchSection = () => {
  return (
    <section className="merch-section py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      {/* Floating decorations */}
      <div className="absolute left-10 top-1/4 hidden md:block text-3xl animate-bounce" style={{ animationDuration: '3s' }}>
        👕
      </div>
      <div className="absolute right-10 bottom-1/4 hidden md:block text-3xl bounce-rotate">
        🧢
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div 
          className="rounded-3xl overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          style={{ boxShadow: '0 0 30px rgba(155, 93, 229, 0.2)' }}
        >
          {/* Preview Area */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
              <div className="flex gap-4 text-5xl mb-4">
                <span className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>👕</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>🧢</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>🎒</span>
              </div>
              <p className="text-purple-300 font-bold text-xl">Epic Gear Loading...</p>
            </div>
            
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-lg">
              <Lock className="w-4 h-4" />
              COMING SOON
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl sm:text-3xl font-black text-purple-400">
                Merch Dropping Soon! 🚀✨
              </h3>
            </div>
            <p className="text-gray-300 text-lg mb-6 font-medium">
              Rep the BlockQuest crew with exclusive tees, hoodies, hats & more! Stay tuned for the official drop.
            </p>
            
            <Button 
              className="w-full h-14 sm:h-16 text-lg sm:text-xl font-black bg-purple-800/50 border-2 border-purple-500/50 text-purple-300 cursor-not-allowed"
              disabled
              data-testid="merch-coming-soon-btn"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              NOTIFY ME WHEN IT DROPS
            </Button>
            
            <p className="text-purple-400/60 text-sm mt-4">
              🐐 Goat-approved style coming your way!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
