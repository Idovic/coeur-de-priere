
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePWAInstall = () => {
  const { toast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Vérifier si PWA est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA déjà installée');
      return;
    }

    // Vérifier le support du navigateur pour PWA
    const isSupported = 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
    if (!isSupported) {
      console.log('PWA non supportée par ce navigateur');
      return;
    }

    // Gérer l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt déclenché');
      // Stocker l'événement pour utilisation ultérieure
      setDeferredPrompt(e);
      
      // Attacher à window pour accès global (fallback) avec assertion de type
      (window as any).deferredPrompt = e;
      
      console.log('Prompt PWA prêt - le navigateur affichera son menu natif');
    };

    // Gérer l'installation
    const handleAppInstalled = () => {
      console.log('PWA installée avec succès');
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
      
      toast({
        title: "Installation réussie !",
        description: "Cœur de Prière est maintenant installé sur votre appareil",
        duration: 3000
      });
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Vérifier si un prompt est déjà disponible avec assertion de type
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
    }

    // Nettoyer les écouteurs
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  // Fonction pour déclencher manuellement l'installation (si nécessaire)
  const triggerInstall = async () => {
    if (!deferredPrompt) {
      console.log('Aucun prompt d\'installation disponible');
      return false;
    }

    try {
      // Afficher le prompt d'installation natif
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      console.log('Choix utilisateur:', choiceResult.outcome);
      
      if (choiceResult.outcome === 'accepted') {
        console.log('Installation acceptée');
      } else {
        console.log('Installation refusée');
      }
      
      // Nettoyer le prompt utilisé
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
      
      return choiceResult.outcome === 'accepted';
    } catch (error) {
      console.error('Erreur lors de l\'installation PWA:', error);
      return false;
    }
  };

  return {
    canInstall: !!deferredPrompt,
    triggerInstall
  };
};
