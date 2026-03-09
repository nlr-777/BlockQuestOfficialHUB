import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Unlock } from 'lucide-react';

const GERRY_IMG = 'https://customer-assets.emergentagent.com/job_1b7103cb-60b2-49d7-8677-886184523930/artifacts/3oc0w6yi_blockquest_logo_primary.png';

const AVATARS = [
  { id: 'gerry', name: 'Gerry', emoji: '🐐', quote: 'BAAAAH! Ready to cause some chaos?!', border: 'border-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400', bgGlow: 'from-orange-600 to-yellow-600', image: GERRY_IMG, xpNeeded: 0 },
  { id: 'zara', name: 'Zara', emoji: '⚡', quote: 'Every blockchain tells a story... you just need to know how to read it!', border: 'border-purple-500', glow: 'shadow-purple-500/50', text: 'text-purple-400', bgGlow: 'from-purple-600 to-indigo-600', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b537425e0c1f544cff5534a3da97e77eefc43623d32af9c8c23d20448d130072.png', xpNeeded: 100 },
  { id: 'sam', name: 'Sam', emoji: '🛡️', quote: 'If it sounds too good to be true, it probably needs more research.', border: 'border-orange-500', glow: 'shadow-orange-500/50', text: 'text-orange-400', bgGlow: 'from-orange-600 to-red-600', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/0040d00c35e50c3d66db0100a6d8dd608dd3efde4d252a69791c59e2fa608c6b.png', xpNeeded: 200 },
  { id: 'miko', name: 'Miko', emoji: '🎨', quote: "NFTs aren't just pictures\u2014they're proof that creativity has value!", border: 'border-cyan-500', glow: 'shadow-cyan-500/50', text: 'text-cyan-400', bgGlow: 'from-cyan-600 to-teal-600', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/b460503e58b9a3dcc3c579ba8d0ba6f2ee5b17bab28ea17c13633b4c8109051b.png', xpNeeded: 300 },
  { id: 'ollie', name: 'Ollie', emoji: '🎮', quote: 'Play-to-earn? More like play-to-LEARN... and earn!', border: 'border-green-500', glow: 'shadow-green-500/50', text: 'text-green-400', bgGlow: 'from-green-600 to-emerald-600', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/f73b9f9dbf5be8de2b7d00b96c5f36a762d38522b0295ab61dac7976bdf406bd.png', xpNeeded: 400 },
  { id: 'lila', name: 'Lila', emoji: '🤝', quote: "The future of finance is decentralized\u2014and we're building it together.", border: 'border-yellow-500', glow: 'shadow-yellow-500/50', text: 'text-yellow-400', bgGlow: 'from-yellow-600 to-amber-600', image: 'https://static.prod-images.emergentagent.com/jobs/d8dff59b-4fda-48a1-a05d-f027b59837f6/images/641198b91feeae555974749d558ad4d63dc19fb2c16c4539babb50123dbb367b.png', xpNeeded: 500 },
];

const AvatarSelector = ({ selectedAvatar, onSelect, onUnlockHero, unlockedHeroes, currentXp }) => {
  const [activeQuote, setActiveQuote] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(null);

  const handleClick = (avatar) => {
    const isUnlocked = unlockedHeroes.includes(avatar.id);
    if (!isUnlocked && currentXp >= avatar.xpNeeded) {
      onUnlockHero(avatar.id);
      setJustUnlocked(avatar.id);
      setTimeout(() => setJustUnlocked(null), 2000);
    }
    if (isUnlocked || currentXp >= avatar.xpNeeded) {
      onSelect(avatar.id);
      setActiveQuote(avatar.id);
    }
  };

  /* Auto-dismiss quote */
  useEffect(() => {
    if (!activeQuote) return;
    const t = setTimeout(() => setActiveQuote(null), 4000);
    return () => clearTimeout(t);
  }, [activeQuote]);

  const activeAv = AVATARS.find(a => a.id === activeQuote);

  return (
    <section className="py-8 px-4 relative" id="avatar-section">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-black mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400">CHOOSE YOUR HERO</span>
          <span className="ml-2">🦸</span>
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">Tap to select! Earn XP to unlock more heroes.</p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {AVATARS.map((av) => {
            const isSelected = selectedAvatar === av.id;
            const isUnlocked = unlockedHeroes.includes(av.id);
            const canUnlock = !isUnlocked && currentXp >= av.xpNeeded;
            const isLocked = !isUnlocked && !canUnlock;
            const wasJustUnlocked = justUnlocked === av.id;

            return (
              <button
                key={av.id}
                onClick={() => handleClick(av)}
                className={`group relative flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? `bg-gray-800 border-2 ${av.border} shadow-lg ${av.glow} scale-105`
                    : isLocked
                    ? 'bg-gray-900/40 border-2 border-gray-800/50 opacity-60 cursor-not-allowed'
                    : canUnlock
                    ? 'bg-gray-900/60 border-2 border-yellow-500/50 hover:border-yellow-400 hover:scale-105 animate-pulse'
                    : 'bg-gray-900/60 border-2 border-gray-700/50 hover:border-gray-500/50 hover:scale-105'
                } ${wasJustUnlocked ? 'ring-4 ring-yellow-400/60 animate-bounce' : ''}`}
                data-testid={`avatar-${av.id}`}
                disabled={isLocked}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                )}
                {canUnlock && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-1.5 py-0.5 rounded-full bg-yellow-500 text-[9px] font-black text-black whitespace-nowrap">
                    TAP TO UNLOCK!
                  </div>
                )}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 mb-1 transition-all ${
                  isSelected ? `${av.border} shadow-md ${av.glow}` : isLocked ? 'border-gray-700 grayscale' : 'border-gray-600/50'
                }`}>
                  {av.id === 'gerry' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-2xl">🐐</div>
                  ) : (
                    <img src={av.image} alt={av.name} className={`w-full h-full object-cover ${isLocked ? 'grayscale' : ''}`} />
                  )}
                </div>
                <span className={`text-xs font-bold ${isSelected ? av.text : isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
                  {av.name} {av.emoji}
                </span>
                {isLocked ? (
                  <span className="flex items-center gap-0.5 text-[10px] text-gray-600">
                    <Lock className="w-3 h-3" /> {av.xpNeeded} XP
                  </span>
                ) : !isUnlocked && canUnlock ? (
                  <span className="flex items-center gap-0.5 text-[10px] text-yellow-400 font-bold">
                    <Unlock className="w-3 h-3" /> Ready!
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Quote Popup */}
        {activeAv && (
          <div className="text-center">
            <div className={`inline-block px-5 py-3 rounded-2xl bg-gray-800/90 backdrop-blur border-2 ${activeAv.border} max-w-md transition-all duration-300 shadow-lg ${activeAv.glow}`}>
              <p className="text-sm text-gray-100 italic mb-1">
                &ldquo;{activeAv.quote}&rdquo;
              </p>
              <p className={`text-xs font-black ${activeAv.text}`}>
                — {activeAv.name} {activeAv.emoji}
              </p>
            </div>
          </div>
        )}

        {/* Next unlock hint */}
        {(() => {
          const nextLocked = AVATARS.find(a => !unlockedHeroes.includes(a.id) && currentXp < a.xpNeeded);
          if (!nextLocked) return null;
          return (
            <p className="text-center text-xs text-gray-500 mt-3">
              🔓 Next unlock: <span className="text-yellow-400 font-bold">{nextLocked.name}</span> at {nextLocked.xpNeeded} XP ({nextLocked.xpNeeded - currentXp} XP to go!)
            </p>
          );
        })()}
      </div>
    </section>
  );
};

export default AvatarSelector;
