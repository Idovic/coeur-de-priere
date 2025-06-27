
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('SW état:', newWorker.state);
            });
          }
        });
      })
      .catch((error) => {
        console.error('Erreur SW:', error);
      });
  });
}

// Gestion PWA installation
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Attacher à window pour accès global
  // @ts-ignore
  window.deferredPrompt = deferredPrompt;
  
  // Dispatch événement personnalisé
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: e }));
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  // @ts-ignore
  window.deferredPrompt = null;
  
  // Dispatch événement d'installation
  window.dispatchEvent(new CustomEvent('pwa-installed'));
});

createRoot(document.getElementById("root")!).render(<App />);
