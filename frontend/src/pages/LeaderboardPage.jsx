import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Medal, Star, Crown, Flame, Filter, ArrowLeft, Zap, User, Plus, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useProgressContext } from '../context/ProgressContext';
import SetNameModal from '../components/SetNameModal';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const GAME_META = {
  'Retro Arcade': { color: 'from-purple-500 to-pink-500', icon: Zap, emoji: '🕹️' },
  'Miners': { color: 'from-amber-500 to-orange-500', icon: Flame, emoji: '⛏️' },
  'Wallet Adventure': { color: 'from-cyan-500 to-blue-500', icon: Star, emoji: '💰' },
  'NFT Studio': { color: 'from-green-500 to-emerald-500', icon: Crown, emoji: '🎨' },
  'Mini Money Quest': { color: 'from-yellow-500 to-red-500', icon: Medal, emoji: '🪙' },
};

const RANK_STYLES = {
  1: { bg: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/40', badge: '🥇' },
  2: { bg: 'bg-gradient-to-r from-gray-300/10 to-gray-400/10', border: 'border-gray-400/40', badge: '🥈' },
  3: { bg: 'bg-gradient-to-r from-orange-600/15 to-amber-700/15', border: 'border-orange-600/40', badge: '🥉' },
};

const AVAILABLE_GAMES = ['Retro Arcade', 'Miners', 'Wallet Adventure', 'NFT Studio', 'Mini Money Quest'];

const LeaderboardPage = () => {
  const { progress, deviceId, saveDisplayName } = useProgressContext();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameFilter, setGameFilter] = useState(null);
  const [games, setGames] = useState([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitGame, setSubmitGame] = useState(AVAILABLE_GAMES[0]);
  const [submitScore, setSubmitScore] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const displayName = progress.displayName || '';

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = gameFilter
        ? `${API_URL}/api/leaderboard?game=${encodeURIComponent(gameFilter)}&limit=50`
        : `${API_URL}/api/leaderboard?limit=50`;
      const resp = await fetch(url);
      const data = await resp.json();
      setEntries(data.leaderboard || []);
    } catch (e) {
      console.error('Failed to fetch leaderboard:', e);
    }
    setLoading(false);
  }, [gameFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/leaderboard/games`);
        const data = await resp.json();
        setGames(data.games || []);
      } catch (e) {
        console.error('Failed to fetch games:', e);
      }
    };
    if (games.length === 0) fetchGames();
  }, [games.length]);

  const handleSubmitScore = async () => {
    if (!displayName) {
      setShowNameModal(true);
      return;
    }
    const scoreNum = parseInt(submitScore, 10);
    if (!scoreNum || scoreNum < 1) return;

    setSubmitting(true);
    try {
      await fetch(`${API_URL}/api/leaderboard/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_id: deviceId,
          game: submitGame,
          score: scoreNum,
          player_name: displayName,
        })
      });
      setSubmitScore('');
      setShowSubmit(false);
      fetchData();
    } catch (e) {
      console.error('Failed to submit score:', e);
    }
    setSubmitting(false);
  };

  const handleNameSave = (name) => {
    saveDisplayName(name);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white" data-testid="leaderboard-page">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-5xl mx-auto px-4 pt-8 pb-6">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors mb-6" data-testid="leaderboard-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </a>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Trophy className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Leaderboard</h1>
                <p className="text-gray-400 text-sm">Top explorers across all BlockQuest games</p>
              </div>
            </div>

            {/* Profile badge / set name */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNameModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 border border-gray-700/60 hover:border-orange-500/50 transition-all text-sm"
                data-testid="profile-name-btn"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-[10px] font-black text-black">
                  {displayName ? displayName.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
                </div>
                <span className="font-bold text-gray-300">
                  {displayName || 'Set Your Name'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game filter tabs + Submit button */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin flex-1" data-testid="game-filter-tabs">
            <Button
              variant={gameFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setGameFilter(null)}
              className={`rounded-full text-xs font-bold whitespace-nowrap ${
                !gameFilter ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black border-0' : 'border-gray-700 text-gray-400 hover:text-white'
              }`}
              data-testid="filter-all"
            >
              <Filter className="w-3 h-3 mr-1" /> All Games
            </Button>
            {games.map(g => {
              const meta = GAME_META[g] || {};
              return (
                <Button
                  key={g}
                  variant={gameFilter === g ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGameFilter(g)}
                  className={`rounded-full text-xs font-bold whitespace-nowrap ${
                    gameFilter === g
                      ? `bg-gradient-to-r ${meta.color || 'from-gray-500 to-gray-600'} text-black border-0`
                      : 'border-gray-700 text-gray-400 hover:text-white'
                  }`}
                  data-testid={`filter-${g.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {meta.emoji || '🎮'} {g}
                </Button>
              );
            })}
          </div>
          <Button
            size="sm"
            onClick={() => setShowSubmit(!showSubmit)}
            className="rounded-full text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 hover:from-green-500 hover:to-emerald-500"
            data-testid="submit-score-toggle"
          >
            <Plus className="w-3 h-3 mr-1" /> Submit Score
          </Button>
        </div>

        {/* Score submission form */}
        {showSubmit && (
          <div className="mt-4 p-4 rounded-xl bg-gray-900/80 border border-gray-700/50 animate-in slide-in-from-top-2 duration-200" data-testid="submit-score-form">
            <p className="text-sm font-bold text-gray-300 mb-3">Submit your game score to the leaderboard</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={submitGame}
                onChange={(e) => setSubmitGame(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500"
                data-testid="submit-game-select"
              >
                {AVAILABLE_GAMES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <input
                type="number"
                value={submitScore}
                onChange={(e) => setSubmitScore(e.target.value)}
                placeholder="Your score..."
                min="1"
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-full sm:w-40"
                data-testid="submit-score-input"
              />
              <Button
                onClick={handleSubmitScore}
                disabled={submitting || !submitScore}
                className="rounded-lg text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-black border-0"
                data-testid="submit-score-btn"
              >
                <Send className="w-3 h-3 mr-1" /> {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
            {!displayName && (
              <p className="text-xs text-orange-400 mt-2">
                You need to set your explorer name first!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Leaderboard table */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-bold">No scores yet!</p>
            <p className="text-sm">Play some games and be the first on the board.</p>
          </div>
        ) : (
          <div className="space-y-2" data-testid="leaderboard-entries">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-3">Game</div>
              <div className="col-span-2 text-right">Score</div>
              <div className="col-span-2 text-right">Bonus</div>
            </div>

            {entries.map((entry, idx) => {
              const rank = entry.rank || idx + 1;
              const style = RANK_STYLES[rank] || { bg: 'bg-gray-900/40', border: 'border-gray-800/50', badge: null };
              const gameMeta = GAME_META[entry.game] || {};
              const isReal = entry.is_real;

              return (
                <div
                  key={entry.id || idx}
                  className={`grid grid-cols-12 gap-2 items-center px-4 py-3 rounded-xl border transition-all hover:scale-[1.01] ${style.bg} ${style.border} ${isReal ? 'ring-1 ring-orange-500/20' : ''}`}
                  data-testid={`leaderboard-row-${rank}`}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    {style.badge ? (
                      <span className="text-2xl">{style.badge}</span>
                    ) : (
                      <span className="text-lg font-black text-gray-500">#{rank}</span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="col-span-4 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${isReal ? 'bg-gradient-to-br from-orange-500 to-amber-600' : `bg-gradient-to-br ${gameMeta.color || 'from-gray-600 to-gray-700'}`} flex items-center justify-center text-sm font-bold ${isReal ? 'text-black' : 'text-white'}`}>
                      {entry.player_name?.charAt(0) || '?'}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-sm truncate">{entry.player_name}</span>
                      {isReal && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-[9px] font-black bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                          PLAYER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Game */}
                  <div className="col-span-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold`}
                      style={{ background: 'linear-gradient(to right, rgba(107,114,128,0.15), rgba(107,114,128,0.15))' }}>
                      {gameMeta.emoji || '🎮'} {entry.game}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 text-right">
                    <span className="font-black text-lg tabular-nums" style={{
                      background: 'linear-gradient(90deg, #f97316, #eab308)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {entry.score?.toLocaleString()}
                    </span>
                  </div>

                  {/* Bonus */}
                  <div className="col-span-2 text-right">
                    {entry.faction_bonus > 0 && (
                      <span className="text-xs text-green-400 font-bold">+{entry.faction_bonus}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats summary */}
        {entries.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Scores', value: entries.length, icon: Trophy },
              { label: 'Top Score', value: Math.max(...entries.map(e => e.score)).toLocaleString(), icon: Crown },
              { label: 'Games', value: [...new Set(entries.map(e => e.game))].length, icon: Star },
              { label: 'Real Players', value: entries.filter(e => e.is_real).length, icon: User },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="p-4 rounded-xl bg-gray-900/60 border border-gray-800/50 text-center">
                <Icon className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <p className="text-lg font-black">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Set Name Modal */}
      <SetNameModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSave={handleNameSave}
        currentName={displayName}
      />
    </div>
  );
};

export default LeaderboardPage;
