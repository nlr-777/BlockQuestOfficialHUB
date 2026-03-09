import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Users, Zap, Shield, Flame, RotateCcw, Star } from 'lucide-react';

const BADGE_MAP = {
  first_quest: { label: 'First Steps', emoji: '👣', desc: 'Completed first quest' },
  mini_money: { label: 'Money Maverick', emoji: '💰', desc: 'Completed Mini Money Quest' },
  retro_arcade: { label: 'Arcade Master', emoji: '🕹️', desc: 'Completed Retro Arcade' },
  chaos_reader: { label: 'Chaos Reader', emoji: '📚', desc: 'Explored Chaos Chronicles' },
  hero_collector: { label: 'Hero Collector', emoji: '🦸', desc: 'Unlocked 3+ heroes' },
  streak_3: { label: '3-Day Streak', emoji: '🔥', desc: '3 daily quests in a row' },
  streak_7: { label: 'Week Warrior', emoji: '⭐', desc: '7 daily quests in a row' },
  xp_master: { label: 'XP Master', emoji: '💎', desc: 'Earned 500+ XP' },
};

/* Confetti burst effect */
const spawnConfetti = (x, y) => {
  const container = document.createElement('div');
  container.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;`;
  const colors = ['#ff6b35', '#9b5de5', '#00d4ff', '#ffff00', '#ff69b4', '#00ff88', '#ff4444'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 40;
    const v = 50 + Math.random() * 120;
    p.textContent = ['🎉', '⭐', '✨', '💎', '🏆', '🐐', '⚡'][Math.floor(Math.random() * 7)];
    p.style.cssText = `position:absolute;font-size:${10+Math.random()*16}px;color:${colors[Math.floor(Math.random()*colors.length)]};animation:particle-explode 1s ease-out forwards;--tx:${Math.cos(angle)*v}px;--ty:${Math.sin(angle)*v}px;--rotation:${Math.random()*720-360}deg;`;
    container.appendChild(p);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 1200);
};

const ProgressOverview = ({ progress, totalQuests, totalHeroes, onClaimQuest, onReset, lastClaimed, heroThresholds }) => {
  const [xpFlash, setXpFlash] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const questPercent = Math.round((progress.questsCompleted.length / totalQuests) * 100);
  const heroPercent = Math.round((progress.heroesUnlocked.length / totalHeroes) * 100);

  /* Flash XP on claim */
  useEffect(() => {
    if (lastClaimed) {
      setXpFlash(true);
      setTimeout(() => setXpFlash(false), 600);
    }
  }, [lastClaimed]);

  const handleClaim = useCallback((questId, xp, e) => {
    if (progress.questsCompleted.includes(questId)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spawnConfetti(rect.left + rect.width / 2, rect.top);
    onClaimQuest(questId, xp);
  }, [onClaimQuest, progress.questsCompleted]);

  /* Next hero unlock message */
  const nextHero = heroThresholds?.find(h => !progress.heroesUnlocked.includes(h.id) && progress.xp < h.xp);

  return (
    <section className="py-8 px-4 relative" id="progress-section">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-black mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">YOUR QUEST LOG</span>
          <span className="ml-2">📊</span>
        </h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className={`p-3 rounded-xl bg-gray-900/70 border border-yellow-500/30 text-center transition-all duration-300 ${xpFlash ? 'scale-110 border-yellow-400 shadow-lg shadow-yellow-500/30' : ''}`}>
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className={`text-2xl font-black text-yellow-400 transition-all ${xpFlash ? 'scale-125' : ''}`}>{progress.xp}</p>
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
              <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${questPercent}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-purple-400">Heroes Unlocked</span>
              <span className="text-gray-400">{heroPercent}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${heroPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Next hero milestone */}
        {nextHero && (
          <div className="mb-4 p-2 rounded-lg bg-yellow-900/20 border border-yellow-500/20 text-center">
            <p className="text-xs text-yellow-400">
              <Star className="w-3 h-3 inline mb-0.5" /> Next hero unlock at <span className="font-black">{nextHero.xp} XP</span> — {nextHero.xp - progress.xp} XP to go!
            </p>
          </div>
        )}

        {/* Claim Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { id: 'mini_money', xp: 100, label: '🐐 Claim from Mini Money Quest', claimed: '✅ Mini Money +100 XP!', color: 'cyan', colorDark: 'green' },
            { id: 'retro_arcade', xp: 200, label: '🎮 Claim from Retro Arcade', claimed: '✅ Retro Arcade +200 XP!', color: 'orange', colorDark: 'yellow' },
            { id: 'chaos_chronicles', xp: 50, label: '📚 Claim from Chaos Chronicles', claimed: '✅ Chaos Chronicles +50 XP!', color: 'purple', colorDark: 'pink' },
          ].map((q) => {
            const done = progress.questsCompleted.includes(q.id);
            return (
              <button
                key={q.id}
                onClick={(e) => handleClaim(q.id, q.xp, e)}
                disabled={done}
                className={`p-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  done
                    ? 'bg-gray-800/50 border border-green-500/30 text-green-400 cursor-default'
                    : `bg-gradient-to-r from-${q.color}-900/40 to-${q.colorDark}-900/40 border-2 border-${q.color}-500/50 text-${q.color}-400 hover:border-${q.color}-400 hover:scale-105 hover:shadow-lg hover:shadow-${q.color}-500/20`
                }`}
                data-testid={`claim-${q.id.replace('_', '-')}`}
              >
                {done ? q.claimed : q.label}
                {!done && <span className="block text-[10px] text-gray-500 mt-0.5">+{q.xp} XP</span>}
              </button>
            );
          })}
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> BADGES EARNED ({progress.badges.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map((b) => {
                const badge = BADGE_MAP[b];
                if (!badge) return null;
                return (
                  <div key={b} className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-900/30 border border-yellow-500/30 hover:scale-105 transition-transform cursor-default" title={badge.desc}>
                    <span>{badge.emoji}</span>
                    <span className="text-xs font-bold text-yellow-400">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to Hub + Reset */}
        <div className="flex items-center justify-between mt-4 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
          <p className="text-xs text-gray-500">
            🔗 <span className="text-gray-400 font-semibold">Back to Hub:</span> After playing, return here to claim rewards! Cross-game linking coming soon.
          </p>
          <button
            onClick={() => setShowReset(!showReset)}
            className="text-gray-600 hover:text-gray-400 transition-colors ml-2 flex-shrink-0"
            title="Reset progress (for testing)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        {showReset && (
          <div className="mt-2 p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-center">
            <p className="text-xs text-red-400 mb-2">Reset all progress? This cannot be undone.</p>
            <button
              onClick={() => { onReset(); setShowReset(false); }}
              className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors"
              data-testid="reset-progress"
            >
              🗑️ Reset Progress
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressOverview;
