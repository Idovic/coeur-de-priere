
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker enregistré avec succès:', registration.scope);
        
        // Vérifier les mises à jour
        registration.addEventListener('updatefound', () => {
          console.log('🔄 Nouvelle version du Service Worker disponible');
        });
      })
      .catch((error) => {
        console.error('❌ Échec de l\'enregistrement du Service Worker:', error);
      });

    // Écouter les changements de statut du Service Worker
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker contrôleur changé');
    });
  });
}

// Gestion de l'installation PWA
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📱 Événement beforeinstallprompt déclenché - PWA installable');
  e.preventDefault();
  deferredPrompt = e;
  // @ts-ignore
  window.deferredPrompt = deferredPrompt;
});

// Détecter l'installation PWA
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installée avec succès');
  deferredPrompt = null;
});

createRoot(document.getElementById("root")!).render(<App />);
