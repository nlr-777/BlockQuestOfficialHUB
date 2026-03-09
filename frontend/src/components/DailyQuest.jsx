import React from 'react';
import { Flame, Gift } from 'lucide-react';

const DAILY_CHALLENGES = [
  { text: "Trade with Gerry! Play Mini Money Quest", reward: "Earn sticker", emoji: "🐐" },
  { text: "Beat Level 1 in Retro Arcade", reward: "Earn XP boost", emoji: "🎮" },
  { text: "Read a chapter of Chaos Chronicles", reward: "Earn knowledge badge", emoji: "📚" },
  { text: "Unlock a new hero in the Hub", reward: "Earn hero card", emoji: "🦸" },
  { text: "Share BlockQuest with a friend", reward: "Earn friendship token", emoji: "🤝" },
  { text: "Explore the Resource Hub (tap the goat!)", reward: "Earn explorer badge", emoji: "🗺️" },
  { text: "Visit the Arcade Zone & play a round", reward: "Earn arcade token", emoji: "🕹️" },
];

const DailyQuest = ({ streak, isDone, onClaim }) => {
  const dayIndex = new Date().getDay();
  const challenge = DAILY_CHALLENGES[dayIndex % DAILY_CHALLENGES.length];

  return (
    <section className="py-6 px-4" id="daily-quest">
      <div className="max-w-2xl mx-auto">
        <div className={`relative p-4 rounded-2xl border-2 transition-all ${
          isDone
            ? 'bg-green-900/20 border-green-500/40'
            : 'bg-gradient-to-r from-orange-900/30 via-purple-900/20 to-cyan-900/30 border-orange-500/40 hover:border-orange-400/60'
        }`}>
          {/* Streak Badge */}
          {streak > 0 && (
            <div className="absolute -top-3 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600 text-white text-xs font-black">
              <Flame className="w-3 h-3" />
              {streak} day streak!
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="text-3xl flex-shrink-0">{challenge.emoji}</div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-orange-400 mb-0.5" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                DAILY QUEST
              </h3>
              <p className="text-sm text-gray-200">
                Today's Challenge: <span className="font-semibold">{challenge.text}</span>
              </p>
              <p className="text-xs text-purple-400 mt-0.5">→ {challenge.reward}</p>
            </div>
            <button
              onClick={onClaim}
              disabled={isDone}
              className={`flex-shrink-0 px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                isDone
                  ? 'bg-green-800/50 text-green-400 cursor-default'
                  : 'bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:scale-105'
              }`}
              data-testid="daily-quest-claim"
            >
              {isDone ? (
                <span>✅ Done!</span>
              ) : (
                <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Claim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyQuest;
