
import React, { useState, useEffect } from 'react';
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
  const [favorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('prayerFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Vérifier si PWA est installable
    const checkInstallability = () => {
      // @ts-ignore
      if (window.deferredPrompt) {
        console.log('🎯 PWA: Bouton installation affiché');
        setShowInstallButton(true);
      }
    };

    // Vérifier immédiatement
    checkInstallability();

    // Écouter l'événement personnalisé
    window.addEventListener('pwa-installable', checkInstallability);

    return () => {
      window.removeEventListener('pwa-installable', checkInstallability);
    };
  }, []);

  const handleFavoritesClick = () => {
    console.log('Bouton favoris cliqué, nombre de favoris:', favorites.length);
    onFavorites();
  };

  const installPWA = async () => {
    console.log('🚀 PWA: Tentative installation...');
    try {
      // @ts-ignore
      if (window.deferredPrompt) {
        // @ts-ignore
        const result = await window.deferredPrompt.prompt();
        console.log('📊 PWA: Choix utilisateur:', result);
        
        // @ts-ignore
        const choiceResult = await window.deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ PWA: Installation acceptée');
        } else {
          console.log('❌ PWA: Installation refusée');
        }
        
        // @ts-ignore
        window.deferredPrompt = null;
        setShowInstallButton(false);
      } else {
        console.log('❌ PWA: Pas de prompt disponible');
      }
    } catch (error) {
      console.error('❌ PWA: Erreur installation:', error);
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
          className="bg-white/40 border-red-400 text-red-800 hover:bg-red-100 hover:border-red-500 h-auto py-3 flex-col gap-2 font-semibold"
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

      {showInstallButton && (
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
