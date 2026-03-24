import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Medal, Star, Crown, Flame, Filter, ArrowLeft, Zap, User, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useProgressContext } from '../context/ProgressContext';
import SetNameModal from '../components/SetNameModal';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const LB_CACHE_KEY = 'blockquest_leaderboard_cache';
const LB_GAMES_CACHE_KEY = 'blockquest_leaderboard_games';

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

// Cache helpers
const cacheData = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
};
const getCachedData = (key) => {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    return raw ? raw.data : null;
  } catch { return null; }
};

const LeaderboardPage = () => {
  const { progress, saveDisplayName, getLocalScores } = useProgressContext();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [gameFilter, setGameFilter] = useState(null);
  const [games, setGames] = useState([]);
  const [showNameModal, setShowNameModal] = useState(false);

  const displayName = progress.displayName || '';

  // Merge backend entries with any unsynced local scores
  const mergeWithLocal = useCallback((backendEntries) => {
    const localScores = getLocalScores();
    const unsynced = localScores.filter(s => !s.synced);
    if (unsynced.length === 0) return backendEntries;

    const merged = [...backendEntries];
    for (const ls of unsynced) {
      // Check if this local score is already represented (higher or equal in backend)
      const existing = merged.find(e => e.is_real && e.game === ls.game && e.score >= ls.score);
      if (existing) continue;
      merged.push({
        id: `local_${ls.ts}`,
        player_name: ls.name || 'Explorer',
        game: ls.game,
        score: ls.score,
        faction_bonus: 0,
        created_at: new Date(ls.ts).toISOString(),
        is_real: true,
        is_local: true,
      });
    }
    // Re-sort and re-rank
    merged.sort((a, b) => b.score - a.score);
    merged.forEach((e, i) => { e.rank = i + 1; });
    return merged;
  }, [getLocalScores]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setOffline(false);
    try {
      const url = gameFilter
        ? `${API_URL}/api/leaderboard?game=${encodeURIComponent(gameFilter)}&limit=50`
        : `${API_URL}/api/leaderboard?limit=50`;
      const resp = await fetch(url);
      const data = await resp.json();
      const backendEntries = data.leaderboard || [];
      const merged = mergeWithLocal(backendEntries);
      setEntries(merged);
      // Cache for offline use
      cacheData(LB_CACHE_KEY, backendEntries);
    } catch (e) {
      console.warn('Leaderboard fetch failed, using cache:', e);
      setOffline(true);
      // Load from cache
      const cached = getCachedData(LB_CACHE_KEY) || [];
      const filtered = gameFilter ? cached.filter(e => e.game === gameFilter) : cached;
      const merged = mergeWithLocal(filtered);
      setEntries(merged);
    }
    setLoading(false);
  }, [gameFilter, mergeWithLocal]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/leaderboard/games`);
        const data = await resp.json();
        const g = data.games || [];
        setGames(g);
        cacheData(LB_GAMES_CACHE_KEY, g);
      } catch {
        const cached = getCachedData(LB_GAMES_CACHE_KEY) || [];
        setGames(cached);
      }
    };
    if (games.length === 0) fetchGames();
  }, [games.length]);

  const handleNameSave = (name) => { saveDisplayName(name); };

  return (
    <div className="min-h-screen bg-gray-950 text-white" data-testid="leaderboard-page">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-5xl mx-auto px-4 pt-8 pb-6">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors mb-6" data-testid="leaderboard-back">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </a>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Trophy className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Leaderboard</h1>
                <p className="text-gray-400 text-sm">
                  Top explorers across all BlockQuest games
                  {offline && <span className="ml-2 text-amber-400 text-xs font-bold">(cached)</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {offline && (
                <button
                  onClick={fetchData}
                  className="p-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
                  title="Retry connection"
                  data-testid="retry-btn"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setShowNameModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 border border-gray-700/60 hover:border-orange-500/50 transition-all text-sm"
                data-testid="profile-name-btn"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-[10px] font-black text-black">
                  {displayName ? displayName.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
                </div>
                <span className="font-bold text-gray-300">{displayName || 'Set Your Name'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offline banner */}
      {offline && (
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm" data-testid="offline-banner">
            <WifiOff className="w-4 h-4 flex-shrink-0" />
            <span>You're viewing cached scores. Scores sync automatically when you're back online.</span>
          </div>
        </div>
      )}

      {/* Game filter tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin" data-testid="game-filter-tabs">
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
              const isLocal = entry.is_local;

              return (
                <div
                  key={entry.id || idx}
                  className={`grid grid-cols-12 gap-2 items-center px-4 py-3 rounded-xl border transition-all hover:scale-[1.01] ${style.bg} ${style.border} ${isReal ? 'ring-1 ring-orange-500/20' : ''}`}
                  data-testid={`leaderboard-row-${rank}`}
                >
                  <div className="col-span-1">
                    {style.badge ? (
                      <span className="text-2xl">{style.badge}</span>
                    ) : (
                      <span className="text-lg font-black text-gray-500">#{rank}</span>
                    )}
                  </div>

                  <div className="col-span-4 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${isReal ? 'bg-gradient-to-br from-orange-500 to-amber-600' : `bg-gradient-to-br ${gameMeta.color || 'from-gray-600 to-gray-700'}`} flex items-center justify-center text-sm font-bold ${isReal ? 'text-black' : 'text-white'}`}>
                      {entry.player_name?.charAt(0) || '?'}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-sm truncate">{entry.player_name}</span>
                      {isReal && !isLocal && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-[9px] font-black bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                          PLAYER
                        </span>
                      )}
                      {isLocal && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-[9px] font-black bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                          SYNCING
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-3">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold"
                      style={{ background: 'rgba(107,114,128,0.15)' }}>
                      {gameMeta.emoji || '🎮'} {entry.game}
                    </span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-black text-lg tabular-nums" style={{
                      background: 'linear-gradient(90deg, #f97316, #eab308)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {entry.score?.toLocaleString()}
                    </span>
                  </div>

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
              { label: 'Players', value: entries.filter(e => e.is_real).length, icon: User },
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
