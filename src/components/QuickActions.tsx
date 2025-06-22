
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Shuffle, BookOpen, Bell, Share2, Download } from 'lucide-react';

interface QuickActionsProps {
  onRandomPrayer: () => void;
  onFavorites: () => void;
  onDailyReading: () => void;
  onShare: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onRandomPrayer,
  onFavorites,
  onDailyReading,
  onShare
}) => {
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
    <Card className="glass-card border-white/30 p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-prayer-800 mb-4 font-nunito">
        Actions Rapides
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onRandomPrayer}
          variant="outline"
          className="bg-white/20 border-prayer-300 text-prayer-700 hover:bg-prayer-50 h-auto py-3 flex-col gap-2"
        >
          <Shuffle className="w-5 h-5" />
          <span className="text-xs">Prière surprise</span>
        </Button>

        <Button
          onClick={onFavorites}
          variant="outline"
          className="bg-white/20 border-mystic-300 text-mystic-700 hover:bg-mystic-50 h-auto py-3 flex-col gap-2"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Mes favoris</span>
        </Button>

        <Button
          onClick={onDailyReading}
          variant="outline"
          className="bg-white/20 border-harmony-300 text-harmony-700 hover:bg-harmony-50 h-auto py-3 flex-col gap-2"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs">Lecture du jour</span>
        </Button>

        <Button
          onClick={onShare}
          variant="outline"
          className="bg-white/20 border-serenity-300 text-serenity-700 hover:bg-serenity-50 h-auto py-3 flex-col gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-xs">Partager</span>
        </Button>
      </div>

      {/* @ts-ignore */}
      {window.deferredPrompt && (
        <Button
          onClick={installPWA}
          className="w-full mt-3 bg-prayer-gradient text-white hover:opacity-90"
        >
          <Download className="w-4 h-4 mr-2" />
          Installer l'application
        </Button>
      )}
    </Card>
  );
};

export default QuickActions;
