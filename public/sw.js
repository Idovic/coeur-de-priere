
const CACHE_NAME = 'coeur-de-priere-v6';
const STATIC_CACHE = 'static-v6';
const DYNAMIC_CACHE = 'dynamic-v6';

// Ressources essentielles - seulement celles qui existent
const CORE_ASSETS = [
  '/',
  '/manifest.json'
];

// Installation
self.addEventListener('install', (event) => {
  console.log('🔧 SW: Installation v6...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 SW: Cache des ressources de base...');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('✅ SW: Installation terminée v6');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ SW: Erreur installation:', error);
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('🚀 SW: Activation v6...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ SW: Suppression cache obsolète:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ SW: Activé et prêt v6');
        return self.clients.claim();
      })
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('📦 SW: Servi depuis le cache:', event.request.url);
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('💾 SW: Ajout au cache:', event.request.url);
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.log('🔄 SW: Fallback pour:', event.request.url);
            return caches.match('/');
          });
      })
  );
});

// Notifications
self.addEventListener('push', (event) => {
  console.log('📱 SW: Push reçu');
  const options = {
    body: 'Une nouvelle prière vous attend',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%237c7af2;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%235b59f0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M96 160c-40-28-68-60-68-88 0-24 16-40 40-40 12 0 24 5 28 16 4-11 16-16 28-16 24 0 40 16 40 40 0 28-28 60-68 88z' fill='url(%23g)'/%3E%3C/svg%3E",
    badge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cpath d='M48 80c-20-14-34-30-34-44 0-12 8-20 20-20 6 0 12 3 14 8 2-5 8-8 14-8 12 0 20 8 20 20 0 14-14 30-34 44z' fill='%237c7af2'/%3E%3C/svg%3E",
    vibrate: [100, 50, 100],
    tag: 'coeur-de-priere'
  };

  event.waitUntil(
    self.registration.showNotification('Cœur de Prière', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔔 SW: Notification cliquée');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
