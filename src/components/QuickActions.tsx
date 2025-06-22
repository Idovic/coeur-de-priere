
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Shuffle, BookOpen, Bell, Share2, Download } from 'lucide-react';
import { PrayerTopic } from '../types/prayer';

interface QuickActionsProps {
  onRandomPrayer: () => void;
  onFavorites: () => void;
  onDailyReading: () => void;
  onShare: () => void;
  prayers?: PrayerTopic[];
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onRandomPrayer,
  onFavorites,
  onDailyReading,
  onShare,
  prayers = []
}) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('prayerFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const handleFavoritesClick = () => {
    console.log('Favorites clicked, count:', favorites.length);
    // For now, we'll filter prayers and show them
    const favoritePrayers = prayers.filter(p => favorites.includes(p.id));
    console.log('Favorite prayers:', favoritePrayers);
    onFavorites(); // This will switch to list view
  };

  const installPWA = () => {
    // @ts-ignore
    if (window.deferredPrompt) {
      // @ts-ignore
      window.deferredPrompt.prompt();
      // @ts-ignore
      window.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installée');
        }
        // @ts-ignore
        window.deferredPrompt = null;
      });
    }
  };

  return (
    <Card className="glass-card border-white/40 bg-white/60 backdrop-blur-xl p-6 animate-fade-in shadow-xl">
      <h3 className="text-lg font-semibold text-prayer-900 mb-4 font-nunito">
        Actions Rapides
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onRandomPrayer}
          variant="outline"
          className="bg-white/40 border-prayer-400 text-prayer-800 hover:bg-prayer-100 hover:border-prayer-500 h-auto py-3 flex-col gap-2 font-semibold"
        >
          <Shuffle className="w-5 h-5" />
          <span className="text-xs">Prière surprise</span>
        </Button>

        <Button
          onClick={handleFavoritesClick}
          variant="outline"
          className="bg-white/40 border-mystic-400 text-mystic-800 hover:bg-mystic-100 hover:border-mystic-500 h-auto py-3 flex-col gap-2 font-semibold"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Mes favoris ({favorites.length})</span>
        </Button>

        <Button
          onClick={onDailyReading}
          variant="outline"
          className="bg-white/40 border-harmony-400 text-harmony-800 hover:bg-harmony-100 hover:border-harmony-500 h-auto py-3 flex-col gap-2 font-semibold"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs">Lecture du jour</span>
        </Button>

        <Button
          onClick={onShare}
          variant="outline"
          className="bg-white/40 border-serenity-400 text-serenity-800 hover:bg-serenity-100 hover:border-serenity-500 h-auto py-3 flex-col gap-2 font-semibold"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-xs">Partager</span>
        </Button>
      </div>

      {/* @ts-ignore */}
      {window.deferredPrompt && (
        <Button
          onClick={installPWA}
          className="w-full mt-3 bg-prayer-gradient text-white hover:opacity-90 font-semibold"
        >
          <Download className="w-4 h-4 mr-2" />
          Installer l'application
        </Button>
      )}
    </Card>
  );
};

export default QuickActions;
