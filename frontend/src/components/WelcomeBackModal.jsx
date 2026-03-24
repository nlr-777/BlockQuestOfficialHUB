import React from 'react';
import { Sparkles, Flame, Trophy, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const WelcomeBackModal = ({ isOpen, onDismiss, inactiveHours, progress }) => {
  if (!isOpen) return null;

  const streakStatus = progress.streak > 0
    ? `${progress.streak}-day streak still going!`
    : 'Start a new streak today!';

  const xpMessage = progress.xp > 0
    ? `You have ${progress.xp} XP`
    : 'Ready to earn your first XP?';

  const hoursText = inactiveHours >= 24
    ? `${Math.floor(inactiveHours / 24)} day${Math.floor(inactiveHours / 24) > 1 ? 's' : ''}`
    : `${inactiveHours} hour${inactiveHours > 1 ? 's' : ''}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="welcome-back-modal">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />
      <div className="relative w-full max-w-md bg-gray-900 border border-gray-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glow header */}
        <div className="relative py-8 px-6 text-center bg-gradient-to-b from-purple-900/40 to-transparent">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px]" />
          <div className="relative">
            <div className="text-5xl mb-3">
              <span role="img" aria-label="wave">Welcome back!</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Hey Explorer!</h2>
            <p className="text-gray-400 text-sm">
              It's been {hoursText} since your last visit
            </p>
          </div>
        </div>

        {/* Stats summary */}
        <div className="px-6 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/40 text-center">
              <Sparkles className="w-5 h-5 mx-auto mb-1 text-orange-400" />
              <p className="text-sm font-black text-white">{xpMessage}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/40 text-center">
              <Flame className="w-5 h-5 mx-auto mb-1 text-red-400" />
              <p className="text-sm font-black text-white">{streakStatus}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-800/60 border border-gray-700/40 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Leaderboard awaits</p>
              <p className="text-xs text-gray-500">Check if anyone beat your score!</p>
            </div>
          </div>

          {progress.questsCompleted && progress.questsCompleted.length > 0 && (
            <p className="text-center text-xs text-gray-500">
              You've completed {progress.questsCompleted.length} quest{progress.questsCompleted.length > 1 ? 's' : ''} so far. Keep going!
            </p>
          )}

          <Button
            onClick={onDismiss}
            className="w-full py-3 rounded-xl font-black text-base bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white border-0 transition-all"
            data-testid="welcome-back-dismiss"
          >
            Continue Exploring
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBackModal;
