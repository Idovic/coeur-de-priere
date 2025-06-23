
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { usePrayerStats } from '../hooks/usePrayerStats';
import { allPrayers } from '../data/prayers';
import { Heart, Calendar } from 'lucide-react';

const PrayerHistory: React.FC = () => {
  const { sessions } = usePrayerStats();

  // Grouper les sessions par date
  const sessionsByDate = sessions.reduce((acc, session) => {
    const dateKey = session.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  // Trier les dates par ordre décroissant
  const sortedDates = Object.keys(sessionsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const getPrayerTitle = (prayerId: number) => {
    const prayer = allPrayers.find(p => p.id === prayerId);
    return prayer?.title || 'Prière inconnue';
  };

  if (sessions.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="glass border-white/30 text-center py-12">
          <div className="floating mb-4">
            <span className="text-4xl">📖</span>
          </div>
          <h3 className="text-lg font-semibold text-prayer-800 mb-2">
            Votre historique est vide
          </h3>
          <p className="text-serenity-600 text-sm">
            Commencez à prier pour voir vos moments spirituels ici
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gradient mb-2">
          Votre parcours spirituel
        </h2>
        <p className="text-serenity-600 text-sm">
          Retracez vos moments de prière et de méditation
        </p>
      </div>

      {sortedDates.map((dateKey, index) => {
        const dateSessions = sessionsByDate[dateKey];
        
        return (
          <Card 
            key={dateKey}
            className="glass border-white/30 hover:border-white/50 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-prayer-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-prayer-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-prayer-800">
                    {formatDate(dateKey)}
                  </h3>
                  <p className="text-xs text-serenity-600">
                    {dateSessions.length} prière{dateSessions.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {dateSessions.map((session) => (
                  <div 
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-white/20 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-heart-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-prayer-800 line-clamp-1">
                          {getPrayerTitle(session.prayerId)}
                        </p>
                        <p className="text-xs text-serenity-600">
                          {session.date.toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 border-emerald-200"
                    >
                      Accomplie
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default PrayerHistory;
