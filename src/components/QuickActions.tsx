
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Shuffle, BookOpen, Share2, Download, Smartphone, AlertCircle } from 'lucide-react';
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
  const [installStatus, setInstallStatus] = useState<'waiting' | 'available' | 'installed' | 'error'>('waiting');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    console.log('🎯 QuickActions: Initialisation PWA...');
    
    const addDebug = (message: string) => {
      console.log(message);
      setDebugInfo(prev => [...prev.slice(-4), message]);
    };

    // Vérifier si PWA est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      addDebug('📱 PWA: Déjà installée');
      setInstallStatus('installed');
      return;
    }

    // Vérifier si prompt disponible immédiatement
    // @ts-ignore
    if (window.deferredPrompt) {
      addDebug('🎯 PWA: Prompt disponible immédiatement');
      setShowInstallButton(true);
      setInstallStatus('available');
    }

    // Écouter l'événement installable
    const handleInstallable = (event: any) => {
      addDebug('📡 PWA: Événement installable reçu');
      console.log('📱 PWA: Détails événement:', event.detail);
      setShowInstallButton(true);
      setInstallStatus('available');
    };

    // Écouter l'installation
    const handleInstalled = () => {
      addDebug('🎉 PWA: Installation confirmée');
      setShowInstallButton(false);
      setInstallStatus('installed');
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);

    // Vérification périodique
    const checkInterval = setInterval(() => {
      // @ts-ignore
      if (window.deferredPrompt && !showInstallButton) {
        addDebug('🔄 PWA: Prompt détecté en vérification');
        setShowInstallButton(true);
        setInstallStatus('available');
      }
    }, 2000);

    // Timeout pour détecter les problèmes
    const timeout = setTimeout(() => {
      if (installStatus === 'waiting') {
        addDebug('⏰ PWA: Timeout - critères non remplis');
        setInstallStatus('error');
      }
    }, 10000);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [installStatus, showInstallButton]);

  const handleFavoritesClick = () => {
    console.log('❤️ Bouton favoris cliqué, nombre:', favorites.length);
    onFavorites();
  };

  const installPWA = async () => {
    console.log('🚀 PWA: Tentative installation...');
    
    try {
      // @ts-ignore
      if (window.deferredPrompt) {
        console.log('📱 PWA: Affichage du prompt...');
        // @ts-ignore
        const result = await window.deferredPrompt.prompt();
        console.log('📊 PWA: Résultat prompt:', result);
        
        // @ts-ignore
        const choiceResult = await window.deferredPrompt.userChoice;
        console.log('👤 PWA: Choix utilisateur:', choiceResult);
        
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ PWA: Installation acceptée');
          setInstallStatus('installed');
        } else {
          console.log('❌ PWA: Installation refusée');
        }
        
        // @ts-ignore
        window.deferredPrompt = null;
        setShowInstallButton(false);
      } else {
        console.log('❌ PWA: Pas de prompt disponible');
        setInstallStatus('error');
      }
    } catch (error) {
      console.error('❌ PWA: Erreur installation:', error);
      setInstallStatus('error');
    }
  };

  const getInstallButtonContent = () => {
    switch (installStatus) {
      case 'available':
        return (
          <>
            <Download className="w-4 h-4 mr-2" />
            Installer l'app
          </>
        );
      case 'installed':
        return (
          <>
            <Smartphone className="w-4 h-4 mr-2" />
            App installée ✅
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Non installable
          </>
        );
      default:
        return (
          <>
            <Download className="w-4 h-4 mr-2" />
            Vérification...
          </>
        );
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

      {/* Bouton d'installation PWA */}
      {(showInstallButton || installStatus !== 'waiting') && (
        <Button
          onClick={installPWA}
          disabled={installStatus === 'installed' || installStatus === 'error'}
          className={`w-full mt-3 font-semibold ${
            installStatus === 'available' 
              ? 'bg-prayer-gradient text-white hover:opacity-90' 
              : installStatus === 'installed'
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {getInstallButtonContent()}
        </Button>
      )}

      {/* Debug info en développement */}
      {process.env.NODE_ENV === 'development' && debugInfo.length > 0 && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <div className="font-bold mb-1">Debug PWA:</div>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-gray-600">{info}</div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default QuickActions;
