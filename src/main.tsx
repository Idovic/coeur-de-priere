
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enregistrement du Service Worker optimisé pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ SW: Enregistré avec succès', registration.scope);
        
        // Écouter les mises à jour du service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('SW: Nouvel état:', newWorker.state);
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('SW: Nouvelle version disponible');
                // Optionnel: notifier l'utilisateur qu'une mise à jour est disponible
              }
            });
          }
        });
        
        // Vérifier périodiquement les mises à jour
        setInterval(() => {
          registration.update();
        }, 60000); // Vérifier toutes les minutes
        
      })
      .catch((error) => {
        console.error('❌ SW: Erreur d\'enregistrement:', error);
      });
  });
}

// Gestion PWA installation optimisée
let deferredPrompt: any;

// Écouter l'événement beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('🎯 PWA: beforeinstallprompt déclenché');
  
  // IMPORTANT: Ne pas empêcher l'événement par défaut pour permettre le menu natif
  // e.preventDefault(); // <- Commenté pour permettre le menu natif
  
  // Stocker l'événement pour usage ultérieur si nécessaire
  deferredPrompt = e;
  
  // Attacher à window pour accès global (compatibilité)
  // @ts-ignore
  window.deferredPrompt = deferredPrompt;
  
  // Dispatch événement personnalisé pour le hook
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: e }));
  
  console.log('🎯 PWA: Prompt disponible - le navigateur peut afficher son menu natif');
});

// Écouter l'installation
window.addEventListener('appinstalled', (e) => {
  console.log('🎉 PWA: Application installée avec succès');
  
  // Nettoyer les références
  deferredPrompt = null;
  // @ts-ignore
  window.deferredPrompt = null;
  
  // Dispatch événement d'installation
  window.dispatchEvent(new CustomEvent('pwa-installed', { detail: e }));
});

// Détecter si l'app est déjà installée
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('📱 PWA: Application déjà installée (mode standalone)');
}

// Optimisation pour les performances
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    console.log('⚡ PWA: Initialisation optimisée terminée');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
