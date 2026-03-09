import React from 'react';
import { Trophy, Star, Users, Zap, Shield, Flame } from 'lucide-react';

const BADGE_MAP = {
  hero_collector: { label: 'Hero Collector', emoji: '🦸', desc: 'Unlocked 3+ heroes' },
  streak_3: { label: '3-Day Streak', emoji: '🔥', desc: '3 daily quests in a row' },
  first_quest: { label: 'First Steps', emoji: '👣', desc: 'Completed first quest' },
  mini_money: { label: 'Money Maverick', emoji: '💰', desc: 'Completed Mini Money Quest' },
  retro_arcade: { label: 'Arcade Master', emoji: '🕹️', desc: 'Completed Retro Arcade' },
  chaos_reader: { label: 'Chaos Reader', emoji: '📚', desc: 'Explored Chaos Chronicles' },
};

const ProgressOverview = ({ progress, totalQuests, totalHeroes, onClaimQuest }) => {
  const questPercent = Math.round((progress.questsCompleted.length / totalQuests) * 100);
  const heroPercent = Math.round((progress.heroesUnlocked.length / totalHeroes) * 100);

  return (
    <section className="py-8 px-4 relative" id="progress-section">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-black mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">YOUR QUEST LOG</span>
          <span className="ml-2">📊</span>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gray-900/70 border border-yellow-500/30 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-yellow-400">{progress.xp}</p>
            <p className="text-xs text-gray-400 font-bold">XP EARNED</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/70 border border-cyan-500/30 text-center">
            <Trophy className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-cyan-400">{progress.questsCompleted.length}/{totalQuests}</p>
            <p className="text-xs text-gray-400 font-bold">QUESTS DONE</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/70 border border-purple-500/30 text-center">
            <Users className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-purple-400">{progress.heroesUnlocked.length}/{totalHeroes}</p>
            <p className="text-xs text-gray-400 font-bold">HEROES</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/70 border border-orange-500/30 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-orange-400">{progress.streak}</p>
            <p className="text-xs text-gray-400 font-bold">DAY STREAK</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3 mb-6">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-cyan-400">Quests Completed</span>
              <span className="text-gray-400">{questPercent}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${questPercent}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-purple-400">Heroes Unlocked</span>
              <span className="text-gray-400">{heroPercent}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${heroPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Claim Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => onClaimQuest('mini_money', 100)}
            disabled={progress.questsCompleted.includes('mini_money')}
            className={`p-3 rounded-xl font-bold text-sm transition-all ${
              progress.questsCompleted.includes('mini_money')
                ? 'bg-gray-800/50 border border-green-500/30 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-cyan-900/40 to-green-900/40 border-2 border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:scale-105'
            }`}
            data-testid="claim-mini-money"
          >
            {progress.questsCompleted.includes('mini_money') ? '✅ Mini Money Quest Claimed!' : '🐐 Claim from Mini Money Quest'}
          </button>
          <button
            onClick={() => onClaimQuest('retro_arcade', 150)}
            disabled={progress.questsCompleted.includes('retro_arcade')}
            className={`p-3 rounded-xl font-bold text-sm transition-all ${
              progress.questsCompleted.includes('retro_arcade')
                ? 'bg-gray-800/50 border border-green-500/30 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border-2 border-orange-500/50 text-orange-400 hover:border-orange-400 hover:scale-105'
            }`}
            data-testid="claim-retro-arcade"
          >
            {progress.questsCompleted.includes('retro_arcade') ? '✅ Retro Arcade Claimed!' : '🎮 Claim from Retro Arcade'}
          </button>
          <button
            onClick={() => onClaimQuest('chaos_chronicles', 75)}
            disabled={progress.questsCompleted.includes('chaos_chronicles')}
            className={`p-3 rounded-xl font-bold text-sm transition-all ${
              progress.questsCompleted.includes('chaos_chronicles')
                ? 'bg-gray-800/50 border border-green-500/30 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 text-purple-400 hover:border-purple-400 hover:scale-105'
            }`}
            data-testid="claim-chaos-chronicles"
          >
            {progress.questsCompleted.includes('chaos_chronicles') ? '✅ Chaos Chronicles Claimed!' : '📚 Claim from Chaos Chronicles'}
          </button>
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> BADGES EARNED
            </h3>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map((b) => {
                const badge = BADGE_MAP[b];
                if (!badge) return null;
                return (
                  <div key={b} className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-900/30 border border-yellow-500/30" title={badge.desc}>
                    <span>{badge.emoji}</span>
                    <span className="text-xs font-bold text-yellow-400">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to Hub note */}
        <div className="mt-6 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30 text-center">
          <p className="text-xs text-gray-500">
            🔗 <span className="text-gray-400 font-semibold">Back to Hub:</span> After playing games, come back here to claim rewards & track progress! Cross-game linking coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgressOverview;
