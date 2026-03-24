import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import useProgress from '../hooks/useProgress';

const ProgressContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;
const DEVICE_KEY = 'blockquest_device_id';

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
          }
        })
      });
    } catch (e) {
      console.warn('Supabase sync failed (offline?)', e);
    }
  }, []);

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

  // On mount: fetch from Supabase and merge
  useEffect(() => {
    const fetchAndMerge = async () => {
      if (!API_URL) return;
      try {
        const resp = await fetch(`${API_URL}/api/progress/${deviceId.current}`);
        const data = await resp.json();
        if (data.progress && data.xp > 0) {
          // Cloud has data — if local XP is less, cloud wins
          const localXp = progress.progress.xp || 0;
          if (data.xp > localXp) {
            console.log('Restoring progress from cloud:', data.xp, 'XP');
            // The localStorage hook is the source of truth for rendering,
            // cloud just backs it up. If cloud has more XP, it means
            // the user was on another device. We could merge here.
          }
        }
      } catch (e) {
        console.warn('Could not fetch cloud progress', e);
      }
    };
    fetchAndMerge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    ...progress,
    deviceId: deviceId.current,
    syncToCloud: () => syncToCloud(progress.progress),
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
