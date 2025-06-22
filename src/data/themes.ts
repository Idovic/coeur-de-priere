
import { Heart, Home, Lightbulb, Users, Shield, Gift, Compass, Star } from 'lucide-react';

export interface ThemeData {
  id: string;
  title: string;
  description: string;
  icon: typeof Heart;
  gradient: string;
  category: string;
}

export const themes: ThemeData[] = [
  {
    id: 'foi',
    title: 'Foi & Confiance',
    description: 'Renforcez votre foi et votre confiance en Dieu dans les moments de doute',
    icon: Star,
    gradient: 'bg-gradient-to-br from-prayer-500 to-prayer-700',
    category: 'foi'
  },
  {
    id: 'famille',
    title: 'Famille & Relations',
    description: 'Priez pour l\'harmonie familiale, l\'amour et la réconciliation',
    icon: Users,
    gradient: 'bg-gradient-to-br from-mystic-500 to-mystic-700',
    category: 'famille'
  },
  {
    id: 'sagesse',
    title: 'Sagesse & Guidance',
    description: 'Demandez la sagesse divine pour vos décisions importantes',
    icon: Lightbulb,
    gradient: 'bg-gradient-to-br from-harmony-500 to-harmony-700',
    category: 'sagesse'
  },
  {
    id: 'amour',
    title: 'Amour & Compassion',
    description: 'Cultivez l\'amour inconditionnel et la compassion envers autrui',
    icon: Heart,
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
    category: 'amour'
  },
  {
    id: 'protection',
    title: 'Protection & Sécurité',
    description: 'Cherchez la protection divine pour vous et vos proches',
    icon: Shield,
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    category: 'protection'
  },
  {
    id: 'reconnaissance',
    title: 'Gratitude & Louange',
    description: 'Exprimez votre reconnaissance pour les bénédictions reçues',
    icon: Gift,
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    category: 'reconnaissance'
  },
  {
    id: 'direction',
    title: 'Direction & Appel',
    description: 'Découvrez votre mission et suivez la volonté divine',
    icon: Compass,
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    category: 'direction'
  },
  {
    id: 'paix',
    title: 'Paix Intérieure',
    description: 'Trouvez la sérénité et la paix qui surpasse l\'entendement',
    icon: Home,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    category: 'paix'
  }
];
