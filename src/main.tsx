
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker enregistré:', registration.scope);
        
        registration.addEventListener('updatefound', () => {
          console.log('🔄 Mise à jour SW disponible');
        });
      })
      .catch((error) => {
        console.error('❌ Erreur SW:', error);
      });
  });
}

// Gestion PWA installation
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📱 PWA: Installable détecté');
  e.preventDefault();
  deferredPrompt = e;
  // @ts-ignore - Attacher à window pour accès global
  window.deferredPrompt = deferredPrompt;
  
  // Dispatch événement personnalisé pour notifier les composants
  window.dispatchEvent(new CustomEvent('pwa-installable'));
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA: Installation réussie');
  deferredPrompt = null;
  // @ts-ignore
  window.deferredPrompt = null;
});

createRoot(document.getElementById("root")!).render(<App />);
