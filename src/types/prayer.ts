
export interface PrayerTopic {
  id: number;
  title: string;
  content: string;
  category: PrayerCategory;
  isCompleted: boolean;
  completedAt?: Date;
  readCount: number;
}

export type PrayerCategory = 
  | 'foi'
  | 'famille'
  | 'sagesse'
  | 'amour'
  | 'pardon'
  | 'reconnaissance'
  | 'protection'
  | 'direction'
  | 'paix'
  | 'healing-comfort'
  | 'wisdom-guidance'
  | 'family-relationship'
  | 'protection-deliverance'
  | 'spiritual-growth'
  | 'church-community'
  | 'provision-blessing'
  | 'societal-global';

export interface UserStats {
  totalPrayers: number;
  completedPrayers: number;
  currentStreak: number;
  longestStreak: number;
  lastPrayedDate?: Date;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface PrayerSession {
  id: string;
  prayerId: number;
  date: Date;
  duration?: number;
}
