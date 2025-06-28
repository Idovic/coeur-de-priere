
const CACHE_NAME = 'coeur-de-priere-v7';
const STATIC_CACHE = 'static-v7';
const DYNAMIC_CACHE = 'dynamic-v7';

// Ressources essentielles optimisées pour PWA
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/index.html'
];

// Installation optimisée
self.addEventListener('install', (event) => {
  console.log('🔧 SW: Installation v7 (PWA optimisé)...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 SW: Cache des ressources essentielles...');
        return cache.addAll(CORE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      })
      .then(() => {
        console.log('✅ SW: Installation PWA terminée v7');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ SW: Erreur installation PWA:', error);
      })
  );
});

// Activation optimisée
self.addEventListener('activate', (event) => {
  console.log('🚀 SW: Activation PWA v7...');
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ SW: Suppression cache obsolète:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Prendre contrôle immédiatement
      self.clients.claim()
    ]).then(() => {
      console.log('✅ SW: PWA activé et prêt v7');
    })
  );
});

// Stratégie de cache optimisée pour PWA
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-GET et les URLs externes
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📦 SW: Servi depuis le cache:', event.request.url);
          // Pour les ressources critiques, les servir immédiatement du cache
          return cachedResponse;
        }
        
        // Fetch et cache pour les nouvelles ressources
        return fetch(event.request)
          .then((response) => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cloner la réponse pour le cache
            const responseToCache = response.clone();
            
            // Mettre en cache de manière asynchrone
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('💾 SW: Ajout au cache:', event.request.url);
                cache.put(event.request, responseToCache);
              })
              .catch(err => console.log('Cache error:', err));
            
            return response;
          })
          .catch((error) => {
            console.log('🔄 SW: Erreur réseau, fallback pour:', event.request.url);
            // Fallback vers la page principale pour la navigation
            if (event.request.mode === 'navigate') {
              return caches.match('/') || caches.match('/index.html');
            }
            throw error;
          });
      })
  );
});

// Gestion des notifications push optimisée
self.addEventListener('push', (event) => {
  console.log('📱 SW: Push reçu pour PWA');
  
  const options = {
    body: 'Une nouvelle prière vous attend dans Cœur de Prière',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%237c7af2;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%235b59f0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M96 160c-40-28-68-60-68-88 0-24 16-40 40-40 12 0 24 5 28 16 4-11 16-16 28-16 24 0 40 16 40 40 0 28-28 60-68 88z' fill='url(%23g)'/%3E%3C/svg%3E",
    badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cpath d='M48 80c-20-14-34-30-34-44 0-12 8-20 20-20 6 0 12 3 14 8 2-5 8-8 14-8 12 0 20 8 20 20 0 14-14 30-34 44z' fill='%237c7af2'/%3E%3C/svg%3E",
    vibrate: [100, 50, 100],
    tag: 'coeur-de-priere',
    data: { url: '/' },
    actions: [
      {
        action: 'open',
        title: 'Ouvrir l\'app',
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/%3E%3Cpolyline points='15,3 21,3 21,9'/%3E%3Cline x1='10' y1='14' x2='21' y2='3'/%3E%3C/svg%3E"
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Cœur de Prière', options)
  );
});

// Gestion des clics sur notifications
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 SW: Notification PWA cliquée');
  event.notification.close();
  
  const targetUrl = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Chercher si l'app est déjà ouverte
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        // Sinon, ouvrir une nouvelle fenêtre
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});

// Message de contrôle pour les mises à jour
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('SW: Activation forcée');
    self.skipWaiting();
  }
});
