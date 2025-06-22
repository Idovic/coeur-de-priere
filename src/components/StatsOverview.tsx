
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { usePrayerStats } from '../hooks/usePrayerStats';
import { Heart, Check, Clock, Plus } from 'lucide-react';

const StatsOverview: React.FC = () => {
  const { stats } = usePrayerStats();

  const statCards = [
    {
      title: 'Prières accomplies',
      value: stats.completedPrayers,
      icon: Check,
      color: 'emerald'
    },
    {
      title: 'Prières au total',
      value: stats.totalPrayers,
      icon: Heart,
      color: 'prayer'
    },
    {
      title: 'Série actuelle',
      value: stats.currentStreak,
      subtitle: 'jours',
      icon: Plus,
      color: 'orange'
    },
    {
      title: 'Meilleure série',
      value: stats.longestStreak,
      subtitle: 'jours',
      icon: Clock,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className="glass border-white/30 hover:border-white/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 text-center">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`text-2xl font-bold text-${stat.color}-700 mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-serenity-600 font-medium">
                  {stat.title}
                  {stat.subtitle && <span className="block">{stat.subtitle}</span>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Badges */}
      {stats.badges.length > 0 && (
        <Card className="glass border-white/30">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-prayer-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              Mes badges
            </h3>
            <div className="flex flex-wrap gap-3">
              {stats.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  variant="secondary"
                  className="bg-gradient-to-r from-prayer-100 to-purple-100 text-prayer-700 border-prayer-200 px-3 py-2 text-sm hover:scale-105 transition-transform"
                >
                  <span className="mr-2">{badge.icon}</span>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Message d'encouragement */}
      <Card className="glass border-white/30 prayer-gradient">
        <div className="p-6 text-center">
          <div className="floating mb-4">
            <span className="text-4xl">🙏</span>
          </div>
          <h3 className="text-lg font-semibold text-gradient mb-2">
            Continuez votre chemin spirituel
          </h3>
          <p className="text-serenity-600 text-sm">
            {stats.currentStreak > 0 
              ? `Vous priez fidèlement depuis ${stats.currentStreak} jour${stats.currentStreak > 1 ? 's' : ''}. Que Dieu bénisse votre persévérance !`
              : "Chaque prière est un pas vers une relation plus profonde avec Dieu."
            }
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StatsOverview;
