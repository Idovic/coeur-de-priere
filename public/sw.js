
const CACHE_NAME = 'coeur-de-priere-v4';
const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v4';

// Ressources essentielles à mettre en cache
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Mise en cache des ressources...');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erreur installation:', error);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Suppression cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activé');
        return self.clients.claim();
      })
  );
});

// Stratégie de cache simplifiée
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            return caches.match('/');
          });
      })
  );
});

// Notifications push
self.addEventListener('push', (event) => {
  const options = {
    body: 'Une nouvelle prière vous attend',
    icon: '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png',
    badge: '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png',
    vibrate: [100, 50, 100]
  };

  event.waitUntil(
    self.registration.showNotification('Cœur de Prière', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
