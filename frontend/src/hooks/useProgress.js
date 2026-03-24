import { useState, useCallback } from 'react';

const STORAGE_KEY = 'blockquest_progress';

const HERO_XP_THRESHOLDS = [
  { id: 'gerry', xp: 0 },
  { id: 'zara', xp: 100 },
  { id: 'sam', xp: 200 },
  { id: 'miko', xp: 300 },
  { id: 'ollie', xp: 400 },
  { id: 'lila', xp: 500 },
];

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
  displayName: '',
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

/* Check which heroes should be unlocked at a given XP */
const getUnlockedHeroes = (xp, current) => {
  const earned = HERO_XP_THRESHOLDS.filter(h => xp >= h.xp).map(h => h.id);
  const merged = [...new Set([...current, ...earned])];
  return merged;
};

/* Check which badges should be awarded */
const checkBadges = (prev, questId, newXp, newQuestsCount) => {
  const badges = [...prev.badges];
  if (newQuestsCount >= 1 && !badges.includes('first_quest')) badges.push('first_quest');
  if (questId === 'mini_money' && !badges.includes('mini_money')) badges.push('mini_money');
  if (questId === 'retro_arcade' && !badges.includes('retro_arcade')) badges.push('retro_arcade');
  if (questId === 'chaos_chronicles' && !badges.includes('chaos_reader')) badges.push('chaos_reader');
  const heroes = getUnlockedHeroes(newXp, prev.heroesUnlocked);
  if (heroes.length >= 3 && !badges.includes('hero_collector')) badges.push('hero_collector');
  if (newXp >= 500 && !badges.includes('xp_master')) badges.push('xp_master');
  return badges;
};

const useProgress = () => {
  const [progress, setProgress] = useState(loadProgress);
  const [lastClaimed, setLastClaimed] = useState(null);

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
      const newXp = prev.xp + xpReward;
      const newQuests = [...prev.questsCompleted, questId];
      const newHeroes = getUnlockedHeroes(newXp, prev.heroesUnlocked);
      const newBadges = checkBadges(prev, questId, newXp, newQuests.length);
      return {
        ...prev,
        xp: newXp,
        questsCompleted: newQuests,
        heroesUnlocked: newHeroes,
        badges: newBadges,
      };
    });
    setLastClaimed(questId);
    setTimeout(() => setLastClaimed(null), 2500);
  }, [update]);

  const unlockHero = useCallback((heroId) => {
    update((prev) => {
      if (prev.heroesUnlocked.includes(heroId)) return prev;
      const newHeroes = [...prev.heroesUnlocked, heroId];
      const badges = [...prev.badges];
      if (newHeroes.length >= 3 && !badges.includes('hero_collector')) badges.push('hero_collector');
      return { ...prev, heroesUnlocked: newHeroes, xp: prev.xp + 50, badges };
    });
  }, [update]);

  const selectAvatar = useCallback((id) => {
    update((prev) => ({ ...prev, selectedAvatar: id }));
  }, [update]);

  const claimDailyQuest = useCallback(() => {
    const today = new Date().toDateString();
    update((prev) => {
      if (prev.dailyQuestDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = prev.lastClaimDate === yesterday.toDateString();
      const newStreak = isConsecutive ? prev.streak + 1 : 1;
      const newXp = prev.xp + 50;
      const newHeroes = getUnlockedHeroes(newXp, prev.heroesUnlocked);
      const badges = [...prev.badges];
      if (newStreak >= 3 && !badges.includes('streak_3')) badges.push('streak_3');
      if (newStreak >= 7 && !badges.includes('streak_7')) badges.push('streak_7');
      return {
        ...prev,
        xp: newXp,
        streak: newStreak,
        dailyQuestDone: true,
        dailyQuestDate: today,
        lastClaimDate: today,
        heroesUnlocked: newHeroes,
        badges,
      };
    });
    setLastClaimed('daily');
    setTimeout(() => setLastClaimed(null), 2500);
  }, [update]);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    saveProgress(fresh);
    setProgress(fresh);
    setLastClaimed(null);
  }, []);

  const totalQuests = 3;
  const totalHeroes = 6;
  const hasProgress = progress.xp > 0 || progress.questsCompleted.length > 0;

  const setDisplayName = useCallback((name) => {
    update((prev) => ({ ...prev, displayName: name }));
  }, [update]);

  return {
    progress, claimQuest, unlockHero, selectAvatar, claimDailyQuest,
    resetProgress, hasProgress, totalQuests, totalHeroes, lastClaimed,
    heroThresholds: HERO_XP_THRESHOLDS, setDisplayName,
  };
};

export default useProgress;
