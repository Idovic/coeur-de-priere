
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debugging PWA détaillé
console.log('🎯 PWA: Initialisation du debugging...');

// Vérification du support PWA
if ('serviceWorker' in navigator) {
  console.log('✅ PWA: Service Worker supporté');
} else {
  console.log('❌ PWA: Service Worker NON supporté');
}

if ('beforeinstallprompt' in window) {
  console.log('✅ PWA: beforeinstallprompt supporté');
} else {
  console.log('❌ PWA: beforeinstallprompt NON supporté');
}

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('🔄 PWA: Enregistrement du SW...');
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ PWA: SW enregistré avec succès');
        console.log('📍 PWA: Scope:', registration.scope);
        console.log('🔧 PWA: SW actif:', registration.active?.state);
        
        registration.addEventListener('updatefound', () => {
          console.log('🔄 PWA: Mise à jour SW trouvée');
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('🔄 PWA: État SW:', newWorker.state);
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ PWA: Erreur enregistrement SW:', error);
      });
  });
}

// Gestion PWA installation avec debugging détaillé
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('🎯 PWA: beforeinstallprompt déclenché!');
  console.log('📱 PWA: Critères PWA remplis');
  console.log('🔍 PWA: Événement:', e);
  
  e.preventDefault();
  deferredPrompt = e;
  
  // Attacher à window pour accès global
  // @ts-ignore
  window.deferredPrompt = deferredPrompt;
  
  // Dispatch événement personnalisé
  console.log('📡 PWA: Dispatch événement pwa-installable');
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: e }));
  
  // Vérifier les critères PWA
  checkPWACriteria();
});

window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA: Application installée avec succès!');
  deferredPrompt = null;
  // @ts-ignore
  window.deferredPrompt = null;
  
  // Dispatch événement d'installation
  window.dispatchEvent(new CustomEvent('pwa-installed'));
});

// Fonction pour vérifier les critères PWA
function checkPWACriteria() {
  console.log('🔍 PWA: Vérification des critères...');
  
  // Vérifier manifest
  fetch('/manifest.json')
    .then(response => {
      if (response.ok) {
        console.log('✅ PWA: Manifest accessible');
        return response.json();
      } else {
        console.log('❌ PWA: Manifest inaccessible');
      }
    })
    .then(manifest => {
      if (manifest) {
        console.log('📄 PWA: Manifest:', manifest);
        console.log('🎨 PWA: Icônes:', manifest.icons?.length || 0);
      }
    })
    .catch(error => {
      console.error('❌ PWA: Erreur manifest:', error);
    });
  
  // Vérifier HTTPS
  if (location.protocol === 'https:' || location.hostname === 'localhost') {
    console.log('✅ PWA: HTTPS ou localhost');
  } else {
    console.log('❌ PWA: Pas HTTPS');
  }
  
  // Vérifier SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        if (registration) {
          console.log('✅ PWA: Service Worker enregistré');
        } else {
          console.log('❌ PWA: Service Worker non enregistré');
        }
      });
  }
}

// Debugging initial
console.log('🌐 PWA: URL:', window.location.href);
console.log('🔒 PWA: Protocole:', window.location.protocol);
console.log('🖥️ PWA: User Agent:', navigator.userAgent);

// Vérifier si déjà installé
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('📱 PWA: Déjà installé (standalone)');
} else {
  console.log('🌐 PWA: Mode navigateur');
}

createRoot(document.getElementById("root")!).render(<App />);
