import { useState, useCallback } from 'react';

const STORAGE_KEY = 'blockquest_progress';

const DEFAULT_PROGRESS = {
  xp: 0,
  questsCompleted: [],
  heroesUnlocked: ['gerry'],
  badges: [],
  streak: 0,
  lastClaimDate: null,
  selectedAvatar: 'gerry',
  dailyQuestDone: false,
  dailyQuestDate: null,
};

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_PROGRESS };
};

const saveProgress = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
};

const useProgress = () => {
  const [progress, setProgress] = useState(loadProgress);

  const update = useCallback((updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveProgress(next);
      return next;
    });
  }, []);

  const claimQuest = useCallback((questId, xpReward = 100) => {
    update((prev) => {
      if (prev.questsCompleted.includes(questId)) return prev;
      return {
        ...prev,
        xp: prev.xp + xpReward,
        questsCompleted: [...prev.questsCompleted, questId],
      };
    });
  }, [update]);

  const unlockHero = useCallback((heroId) => {
    update((prev) => {
      if (prev.heroesUnlocked.includes(heroId)) return prev;
      return {
        ...prev,
        heroesUnlocked: [...prev.heroesUnlocked, heroId],
        xp: prev.xp + 50,
        badges: prev.badges.includes('hero_collector') ? prev.badges : (prev.heroesUnlocked.length >= 3 ? [...prev.badges, 'hero_collector'] : prev.badges),
      };
    });
  }, [update]);

  const selectAvatar = useCallback((id) => {
    update((prev) => ({ ...prev, selectedAvatar: id }));
  }, [update]);

  const claimDailyQuest = useCallback(() => {
    const today = new Date().toDateString();
    update((prev) => {
      if (prev.dailyQuestDate === today) return prev;
      const isConsecutive = prev.lastClaimDate && (new Date(today) - new Date(prev.lastClaimDate)) <= 86400000 * 1.5;
      return {
        ...prev,
        xp: prev.xp + 25,
        streak: isConsecutive ? prev.streak + 1 : 1,
        dailyQuestDone: true,
        dailyQuestDate: today,
        lastClaimDate: today,
        badges: !prev.badges.includes('streak_3') && (isConsecutive ? prev.streak + 1 : 1) >= 3 ? [...prev.badges, 'streak_3'] : prev.badges,
      };
    });
  }, [update]);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    saveProgress(fresh);
    setProgress(fresh);
  }, []);

  const totalQuests = 3;
  const totalHeroes = 6;
  const hasProgress = progress.xp > 0 || progress.questsCompleted.length > 0;

  return { progress, claimQuest, unlockHero, selectAvatar, claimDailyQuest, resetProgress, hasProgress, totalQuests, totalHeroes };
};

export default useProgress;
