
import { useState, useEffect } from 'react';
import { UserStats, Badge, PrayerSession } from '../types/prayer';

const STORAGE_KEY = 'prayer-stats';
const SESSIONS_KEY = 'prayer-sessions';

export const usePrayerStats = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        lastPrayedDate: parsed.lastPrayedDate ? new Date(parsed.lastPrayedDate) : undefined,
        badges: parsed.badges?.map((badge: any) => ({
          ...badge,
          unlockedAt: new Date(badge.unlockedAt)
        })) || []
      };
    }
    return {
      totalPrayers: 0,
      completedPrayers: 0,
      currentStreak: 0,
      longestStreak: 0,
      badges: []
    };
  });

  const [sessions, setSessions] = useState<PrayerSession[]>(() => {
    const saved = localStorage.getItem(SESSIONS_KEY);
    if (saved) {
      return JSON.parse(saved).map((session: any) => ({
        ...session,
        date: new Date(session.date)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const addPrayerSession = (prayerId: number, duration?: number) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Vérifier si c'est la première prière d'aujourd'hui
    const todaySessions = sessions.filter(session => {
      const sessionDate = new Date(session.date.getFullYear(), session.date.getMonth(), session.date.getDate());
      return sessionDate.getTime() === today.getTime();
    });

    const isFirstToday = todaySessions.length === 0;
    
    // Ajouter la session
    const newSession: PrayerSession = {
      id: Date.now().toString(),
      prayerId,
      date: now,
      duration
    };

    setSessions(prev => [...prev, newSession]);
    
    // Mettre à jour les statistiques
    setStats(prev => {
      let newStreak = prev.currentStreak;
      
      if (isFirstToday) {
        // Calculer la nouvelle série
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const yesterdaySessions = sessions.filter(session => {
          const sessionDate = new Date(session.date.getFullYear(), session.date.getMonth(), session.date.getDate());
          return sessionDate.getTime() === yesterday.getTime();
        });

        if (yesterdaySessions.length > 0 || prev.currentStreak === 0) {
          newStreak = prev.currentStreak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newStats = {
        ...prev,
        totalPrayers: prev.totalPrayers + 1,
        completedPrayers: prev.completedPrayers + 1,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPrayedDate: now
      };

      // Vérifier les nouveaux badges
      const newBadges = checkForNewBadges(newStats, prev);
      if (newBadges.length > 0) {
        newStats.badges = [...prev.badges, ...newBadges];
      }

      return newStats;
    });
  };

  const checkForNewBadges = (newStats: UserStats, prevStats: UserStats): Badge[] => {
    const badges: Badge[] = [];
    const now = new Date();

    // Badge première prière
    if (newStats.totalPrayers === 1 && prevStats.totalPrayers === 0) {
      badges.push({
        id: 'first-prayer',
        name: 'Premier Pas',
        description: 'Votre première prière',
        icon: '🙏',
        unlockedAt: now
      });
    }

    // Badge 7 jours consécutifs
    if (newStats.currentStreak === 7 && prevStats.currentStreak < 7) {
      badges.push({
        id: 'week-streak',
        name: 'Fidèle Semaine',
        description: '7 jours de prière consécutifs',
        icon: '🔥',
        unlockedAt: now
      });
    }

    // Badge 30 jours consécutifs
    if (newStats.currentStreak === 30 && prevStats.currentStreak < 30) {
      badges.push({
        id: 'month-streak',
        name: 'Persévérant',
        description: '30 jours de prière consécutifs',
        icon: '👑',
        unlockedAt: now
      });
    }

    // Badge 50 prières au total
    if (newStats.totalPrayers >= 50 && prevStats.totalPrayers < 50) {
      badges.push({
        id: 'fifty-prayers',
        name: 'Cœur Dévoué',
        description: '50 prières accomplies',
        icon: '❤️',
        unlockedAt: now
      });
    }

    return badges;
  };

  const resetStats = () => {
    setStats({
      totalPrayers: 0,
      completedPrayers: 0,
      currentStreak: 0,
      longestStreak: 0,
      badges: []
    });
    setSessions([]);
  };

  return {
    stats,
    sessions,
    addPrayerSession,
    resetStats
  };
};
