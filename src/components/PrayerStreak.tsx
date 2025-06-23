
import React from 'react';
import { Card } from './ui/card';
import { Flame, Calendar, Trophy, Star } from 'lucide-react';

const PrayerStreak = () => {
  // Simuler des données de streak
  const currentStreak = 7;
  const longestStreak = 21;
  const thisWeek = [true, true, false, true, true, true, true]; // Lun-Dim

  return (
    <Card className="glass-card border-white/30 p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-semibold text-prayer-800 font-nunito">
          Série de Prière
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-serenity-600">Jours consécutifs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-prayer-600 mb-1">
            {longestStreak}
          </div>
          <div className="text-sm text-serenity-600">Record personnel</div>
        </div>
      </div>

      {/* Calendrier de la semaine */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-prayer-700">
          <Calendar className="w-4 h-4" />
          Cette semaine
        </div>
        <div className="flex gap-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <div key={`day-${index}`} className="flex-1 text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mx-auto mb-1 ${
                thisWeek[index] 
                  ? 'bg-prayer-gradient text-white shadow-prayer' 
                  : 'bg-white/40 text-serenity-500'
              }`}>
                {thisWeek[index] ? <Star className="w-3 h-3" /> : day}
              </div>
              <div className="text-xs text-serenity-600">{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="mt-6 p-4 bg-gradient-to-r from-prayer-50 to-harmony-50 rounded-xl border border-white/30">
        <div className="flex items-center gap-2 text-prayer-700 mb-2">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Continuez ainsi !</span>
        </div>
        <p className="text-xs text-serenity-600">
          Encore 3 jours pour battre votre record personnel de 10 jours.
        </p>
      </div>
    </Card>
  );
};

export default PrayerStreak;
