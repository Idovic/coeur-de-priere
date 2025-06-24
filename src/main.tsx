
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Gestion de l'installation PWA
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt déclenché');
  e.preventDefault();
  deferredPrompt = e;
  // @ts-ignore
  window.deferredPrompt = deferredPrompt;
});

createRoot(document.getElementById("root")!).render(<App />);
