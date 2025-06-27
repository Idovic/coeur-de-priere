
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePWAInstall = () => {
  const { toast } = useToast();
  const [hasShownPrompt, setHasShownPrompt] = useState(false);

  useEffect(() => {
    // Vérifier si PWA est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Vérifier si on a déjà montré le prompt cette session
    const sessionPromptShown = sessionStorage.getItem('pwa-prompt-shown');
    if (sessionPromptShown) {
      return;
    }

    // Vérifier si l'utilisateur a refusé récemment
    const lastRefused = localStorage.getItem('pwa-install-refused');
    if (lastRefused) {
      const refusedTime = parseInt(lastRefused);
      const daysSinceRefused = (Date.now() - refusedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceRefused < 7) { // Ne pas redemander pendant 7 jours
        return;
      }
    }

    const handleInstall = async () => {
      try {
        // @ts-ignore
        if (window.deferredPrompt) {
          // @ts-ignore
          await window.deferredPrompt.prompt();
          // @ts-ignore
          const choiceResult = await window.deferredPrompt.userChoice;
          
          if (choiceResult.outcome === 'accepted') {
            localStorage.removeItem('pwa-install-refused');
          }
          
          // @ts-ignore
          window.deferredPrompt = null;
        }
      } catch (error) {
        console.error('Erreur installation PWA:', error);
      }
    };

    const handleDismiss = () => {
      localStorage.setItem('pwa-install-refused', Date.now().toString());
    };

    const showInstallPrompt = () => {
      if (hasShownPrompt) return;
      
      setHasShownPrompt(true);
      sessionStorage.setItem('pwa-prompt-shown', 'true');

      toast({
        title: "Installer Cœur de Prière ?",
        description: "Accédez rapidement à vos prières depuis votre écran d'accueil",
        duration: 8000,
        action: (
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="px-3 py-1 bg-prayer-600 text-white rounded text-sm hover:bg-prayer-700"
            >
              Installer
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
            >
              Plus tard
            </button>
          </div>
        )
      });
    };

    // Écouter l'événement installable
    const handleInstallable = () => {
      // Attendre un peu avant de montrer le prompt pour une meilleure UX
      setTimeout(showInstallPrompt, 3000);
    };

    // Vérifier si prompt déjà disponible
    // @ts-ignore
    if (window.deferredPrompt) {
      setTimeout(showInstallPrompt, 3000);
    }

    window.addEventListener('pwa-installable', handleInstallable);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
    };
  }, [toast, hasShownPrompt]);

  return null;
};
