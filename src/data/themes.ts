
import { Heart, Home, Lightbulb, Users, Shield, Gift, Compass, Star, HandHeart, Coins, UserCheck, TreePine, Globe, Church, ShieldCheck, Brain, UsersRound } from 'lucide-react';

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
  },
  {
    id: 'healing-comfort',
    title: 'Guérison & Réconfort',
    description: 'Trouvez la guérison physique, émotionnelle et spirituelle',
    icon: HandHeart,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    category: 'healing-comfort'
  },
  {
    id: 'provision-blessing',
    title: 'Provision & Bénédictions',
    description: 'Priez pour la provision divine et les bénédictions matérielles',
    icon: Coins,
    gradient: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    category: 'provision-blessing'
  },
  {
    id: 'pardon',
    title: 'Pardon & Réconciliation',
    description: 'Cherchez le pardon et la réconciliation dans vos relations',
    icon: UserCheck,
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
    category: 'pardon'
  },
  {
    id: 'spiritual-growth',
    title: 'Croissance Spirituelle',
    description: 'Développez votre relation avec Dieu et votre maturité spirituelle',
    icon: TreePine,
    gradient: 'bg-gradient-to-br from-lime-500 to-green-600',
    category: 'spiritual-growth'
  },
  {
    id: 'societal-global',
    title: 'Société & Monde',
    description: 'Priez pour les problèmes sociaux et les enjeux mondiaux',
    icon: Globe,
    gradient: 'bg-gradient-to-br from-slate-500 to-gray-600',
    category: 'societal-global'
  },
  {
    id: 'church-community',
    title: 'Église & Communauté',
    description: 'Fortifiez votre communauté de foi et l\'unité de l\'Église',
    icon: Church,
    gradient: 'bg-gradient-to-br from-red-500 to-rose-600',
    category: 'church-community'
  },
  {
    id: 'protection-deliverance',
    title: 'Protection & Délivrance',
    description: 'Cherchez la délivrance spirituelle et la protection contre le mal',
    icon: ShieldCheck,
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    category: 'protection-deliverance'
  },
  {
    id: 'wisdom-guidance',
    title: 'Sagesse Relationnelle',
    description: 'Obtenez la sagesse pour naviguer dans les relations humaines',
    icon: Brain,
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    category: 'wisdom-guidance'
  },
  {
    id: 'family-relationship',
    title: 'Relations Familiales',
    description: 'Renforcez les liens familiaux et résolvez les conflits',
    icon: UsersRound,
    gradient: 'bg-gradient-to-br from-pink-400 to-rose-500',
    category: 'family-relationship'
  }
];
