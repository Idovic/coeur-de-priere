
const CACHE_NAME = 'coeur-de-priere-v2';
const urlsToCache = [
  '/',
  '/assets/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
});

// Stratégie de cache: Cache First pour les ressources statiques
self.addEventListener('fetch', (event) => {
  event.respon dWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la version en cache si disponible
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch((error) => {
        console.log('Fetch failed:', error);
      })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Une nouvelle prière vous attend',
    icon: '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Découvrir',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Plus tard'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Cœur de Prière', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
