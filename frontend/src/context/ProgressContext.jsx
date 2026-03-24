import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';
import useProgress from '../hooks/useProgress';

const ProgressContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;
const DEVICE_KEY = 'blockquest_device_id';
const LAST_ACTIVE_KEY = 'blockquest_last_active';
const LOCAL_SCORES_KEY = 'blockquest_local_scores';
const RETURNING_THRESHOLD_MS = 4 * 60 * 60 * 1000; // 4 hours

const getDeviceId = () => {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : 'dev-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
};

export const ProgressProvider = ({ children }) => {
  const progress = useProgress();
  const deviceId = useRef(getDeviceId());
  const syncTimeout = useRef(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [inactiveHours, setInactiveHours] = useState(0);

  // Sync progress TO Supabase (debounced)
  const syncToCloud = useCallback(async (progressData) => {
    if (!API_URL) return;
    try {
      await fetch(`${API_URL}/api/progress/${deviceId.current}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_id: deviceId.current,
          progress: {
            xp: progressData.xp || 0,
            quests_completed: progressData.questsCompleted || [],
            badges: progressData.badges || [],
            heroes_unlocked: progressData.heroesUnlocked || [],
            selected_avatar: progressData.selectedAvatar || 'gerry',
            daily_streak: progressData.dailyStreak || 0,
            last_daily_claim: progressData.lastDailyClaim || null,
            display_name: progressData.displayName || '',
          }
        })
      });
    } catch (e) {
      console.warn('Supabase sync failed (offline?)', e);
    }
  }, []);

  // Save display name to backend profile
  const saveDisplayName = useCallback(async (name) => {
    progress.setDisplayName(name);
    if (!API_URL) return;
    try {
      await fetch(`${API_URL}/api/profile/${deviceId.current}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: name })
      });
    } catch (e) {
      console.warn('Profile sync failed', e);
    }
  }, [progress]);

  // Debounced sync - triggers 2s after last change
  const debouncedSync = useCallback((data) => {
    clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => syncToCloud(data), 2000);
  }, [syncToCloud]);

  // Watch for progress changes and sync
  useEffect(() => {
    if (progress.hasProgress) {
      debouncedSync(progress.progress);
    }
  }, [progress.progress, progress.hasProgress, debouncedSync]);

  // Track last_active & detect returning explorer
  useEffect(() => {
    const now = Date.now();
    const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || '0', 10);

    if (lastActive > 0 && progress.hasProgress) {
      const gap = now - lastActive;
      if (gap > RETURNING_THRESHOLD_MS) {
        setInactiveHours(Math.floor(gap / (60 * 60 * 1000)));
        setShowWelcomeBack(true);
      }
    }

    // Update last_active now
    localStorage.setItem(LAST_ACTIVE_KEY, now.toString());

    // Update periodically while active
    const interval = setInterval(() => {
      localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }, 60000); // every 60s

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On mount: fetch from Supabase and merge
  useEffect(() => {
    const fetchAndMerge = async () => {
      if (!API_URL) return;
      try {
        // Fetch progress
        const resp = await fetch(`${API_URL}/api/progress/${deviceId.current}`);
        const data = await resp.json();
        if (data.progress && data.xp > 0) {
          const localXp = progress.progress.xp || 0;
          if (data.xp > localXp) {
            console.log('Restoring progress from cloud:', data.xp, 'XP');
          }
        }
        // Fetch display name if not set locally
        if (!progress.progress.displayName) {
          const profileResp = await fetch(`${API_URL}/api/profile/${deviceId.current}`);
          const profileData = await profileResp.json();
          if (profileData.display_name) {
            progress.setDisplayName(profileData.display_name);
          }
        }
      } catch (e) {
        console.warn('Could not fetch cloud progress', e);
      }
    };
    fetchAndMerge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissWelcomeBack = useCallback(() => {
    setShowWelcomeBack(false);
  }, []);

  // ─── Local Score Storage + Auto-Sync ─────────────────────
  // Save a score to localStorage (called by games or hub)
  const saveLocalScore = useCallback((game, score, playerName) => {
    try {
      const existing = JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY) || '[]');
      const name = playerName || progress.progress.displayName || 'Explorer';
      // Check if we already have a higher score for this game
      const idx = existing.findIndex(s => s.game === game);
      if (idx >= 0 && existing[idx].score >= score) return; // existing is higher
      const entry = { game, score, name, ts: Date.now(), synced: false };
      if (idx >= 0) {
        existing[idx] = entry;
      } else {
        existing.push(entry);
      }
      localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('Could not save local score', e);
    }
  }, [progress.progress.displayName]);

  // Auto-sync unsynced local scores to backend on mount
  useEffect(() => {
    const syncLocalScores = async () => {
      if (!API_URL) return;
      try {
        const scores = JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY) || '[]');
        const unsynced = scores.filter(s => !s.synced);
        if (unsynced.length === 0) return;

        const name = progress.progress.displayName || 'Explorer';
        let changed = false;

        for (const s of unsynced) {
          try {
            const resp = await fetch(`${API_URL}/api/leaderboard/submit`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                device_id: deviceId.current,
                game: s.game,
                score: s.score,
                player_name: s.name || name,
              })
            });
            if (resp.ok) {
              s.synced = true;
              changed = true;
            }
          } catch { /* will retry next load */ }
        }

        if (changed) {
          localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(scores));
        }
      } catch (e) {
        console.warn('Local score sync failed', e);
      }
    };
    syncLocalScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get local scores (for offline leaderboard)
  const getLocalScores = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY) || '[]');
    } catch { return []; }
  }, []);

  const value = {
    ...progress,
    deviceId: deviceId.current,
    syncToCloud: () => syncToCloud(progress.progress),
    saveDisplayName,
    saveLocalScore,
    getLocalScores,
    showWelcomeBack,
    dismissWelcomeBack,
    inactiveHours,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used within ProgressProvider');
  return ctx;
};

export default ProgressContext;
