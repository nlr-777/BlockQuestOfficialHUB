import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const GERRY_IMG = 'https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/3oc0w6yi_blockquest_logo_primary.png';

const AVATARS = [
  { id: 'gerry', name: 'Gerry', emoji: '🐐', color: 'orange', quote: 'BAAAAH! Ready to cause some chaos?!', border: 'border-orange-500', bg: 'from-orange-600 to-yellow-600', text: 'text-orange-400', image: GERRY_IMG },
  { id: 'zara', name: 'Zara', emoji: '⚡', color: 'purple', quote: 'Every blockchain tells a story... you just need to know how to read it!', border: 'border-purple-500', bg: 'from-purple-600 to-indigo-600', text: 'text-purple-400', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b537425e0c1f544cff5534a3da97e77eefc43623d32af9c8c23d20448d130072.png' },
  { id: 'sam', name: 'Sam', emoji: '🛡️', color: 'orange', quote: 'If it sounds too good to be true, it probably needs more research.', border: 'border-orange-500', bg: 'from-orange-600 to-red-600', text: 'text-orange-400', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/0040d00c35e50c3d66db0100a6d8dd608dd3efde4d252a69791c59e2fa608c6b.png' },
  { id: 'miko', name: 'Miko', emoji: '🎨', color: 'cyan', quote: "NFTs aren't just pictures—they're proof that creativity has value!", border: 'border-cyan-500', bg: 'from-cyan-600 to-teal-600', text: 'text-cyan-400', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b460503e58b9a3dcc3c579ba8d0ba6f2ee5b17bab28ea17c13633b4c8109051b.png' },
  { id: 'ollie', name: 'Ollie', emoji: '🎮', color: 'green', quote: 'Play-to-earn? More like play-to-LEARN... and earn!', border: 'border-green-500', bg: 'from-green-600 to-emerald-600', text: 'text-green-400', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/f73b9f9dbf5be8de2b7d00b96c5f36a762d38522b0295ab61dac7976bdf406bd.png' },
  { id: 'lila', name: 'Lila', emoji: '🤝', color: 'yellow', quote: "The future of finance is decentralized—and we're building it together.", border: 'border-yellow-500', bg: 'from-yellow-600 to-amber-600', text: 'text-yellow-400', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/641198b91feeae555974749d558ad4d63dc19fb2c16c4539babb50123dbb367b.png' },
];

const AvatarSelector = ({ selectedAvatar, onSelect, onUnlockHero, unlockedHeroes }) => {
  const [showQuote, setShowQuote] = useState(null);

  const handleClick = (avatar) => {
    onSelect(avatar.id);
    if (!unlockedHeroes.includes(avatar.id)) onUnlockHero(avatar.id);
    setShowQuote(avatar.id);
    setTimeout(() => setShowQuote(null), 3000);
  };

  return (
    <section className="py-8 px-4 relative" id="avatar-section">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-black mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400">CHOOSE YOUR HERO</span>
          <span className="ml-2">🦸</span>
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">Tap a character to select & unlock!</p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {AVATARS.map((av) => {
            const isSelected = selectedAvatar === av.id;
            const isUnlocked = unlockedHeroes.includes(av.id);
            return (
              <button
                key={av.id}
                onClick={() => handleClick(av)}
                className={`group relative flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? `bg-gray-800 border-2 ${av.border} shadow-lg scale-105`
                    : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-gray-500/50 hover:scale-105'
                }`}
                data-testid={`avatar-${av.id}`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  </div>
                )}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 mb-1 transition-colors ${
                  isSelected ? av.border : 'border-gray-600/50'
                }`}>
                  {av.id === 'gerry' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-2xl">🐐</div>
                  ) : (
                    <img src={av.image} alt={av.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <span className={`text-xs font-bold ${isSelected ? av.text : 'text-gray-400'}`}>
                  {av.name} {av.emoji}
                </span>
                {!isUnlocked && (
                  <span className="text-[10px] text-gray-600">🔒</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quote Bubble */}
        {showQuote && (
          <div className="text-center animate-bounce">
            <div className="inline-block px-4 py-2 rounded-xl bg-gray-800/80 border border-purple-500/30 max-w-md">
              <p className="text-sm text-gray-200 italic">
                "{AVATARS.find(a => a.id === showQuote)?.quote}"
              </p>
              <p className={`text-xs font-bold mt-1 ${AVATARS.find(a => a.id === showQuote)?.text}`}>
                — {AVATARS.find(a => a.id === showQuote)?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvatarSelector;
