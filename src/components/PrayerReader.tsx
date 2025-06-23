
import React, { useState } from 'react';
import { PrayerTopic } from '../types/prayer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowDown, Check, Heart } from 'lucide-react';
import { usePrayerStats } from '../hooks/usePrayerStats';

interface PrayerReaderProps {
  prayer: PrayerTopic;
  onBack: () => void;
  onComplete: (prayerId: number) => void;
}

const PrayerReader: React.FC<PrayerReaderProps> = ({ prayer, onBack, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(prayer.isCompleted);
  const { addPrayerSession } = usePrayerStats();

  const handleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      onComplete(prayer.id);
      addPrayerSession(prayer.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-prayer-50 via-serenity-50 to-purple-50 animate-fade-in">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header avec navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-prayer-600 hover:text-prayer-700 hover:bg-white/50"
          >
            <ArrowDown className="w-4 h-4 mr-2 rotate-90" />
            Retour
          </Button>
        </div>

        {/* Contenu principal */}
        <Card className="glass-strong border-white/40 shadow-prayer animate-scale-in">
          <div className="p-8 zen-reading">
            <h1 className="text-2xl md:text-3xl font-semibold text-prayer-800 mb-6 leading-relaxed">
              {prayer.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-serenity-700 leading-relaxed whitespace-pre-wrap">
                {prayer.content}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-white/30">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button
                  onClick={handleComplete}
                  disabled={isCompleted}
                  className={`
                    px-8 py-3 text-lg font-medium transition-all duration-300
                    ${isCompleted 
                      ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed' 
                      : 'bg-prayer-500 hover:bg-prayer-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    }
                  `}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Prière accomplie
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Marquer comme priée
                    </>
                  )}
                </Button>
                
                {prayer.readCount > 0 && (
                  <div className="flex items-center gap-2 text-serenity-600">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">
                      Lue {prayer.readCount} fois
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Message d'encouragement après completion */}
        {isCompleted && (
          <Card className="glass mt-6 border-emerald-200/50 animate-fade-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                Que Dieu bénisse votre prière
              </h3>
              <p className="text-emerald-600 text-sm">
                Votre cœur s'est élevé vers le Seigneur. Il entend et répond.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PrayerReader;
