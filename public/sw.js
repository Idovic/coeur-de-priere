
const CACHE_NAME = 'coeur-de-priere-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';

// Ressources essentielles à mettre en cache
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Cache statique ouvert');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Ressources essentielles mises en cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Erreur lors de l\'installation:', error);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Suppression ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activé avec succès');
        return self.clients.claim();
      })
  );
});

// Stratégie de cache: Cache First pour les ressources statiques, Network First pour le reste
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes vers d'autres domaines
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Si en cache, retourner la réponse en cache
        if (cachedResponse) {
          return cachedResponse;
        }

        // Sinon, faire la requête réseau
        return fetch(request)
          .then((networkResponse) => {
            // Vérifier que la réponse est valide
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Cloner la réponse pour le cache
            const responseToCache = networkResponse.clone();

            // Mettre en cache les ressources statiques
            if (request.destination === 'script' || 
                request.destination === 'style' || 
                request.destination === 'image' ||
                request.url.includes('/assets/')) {
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            } else {
              // Cache dynamique pour les autres ressources
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }

            return networkResponse;
          })
          .catch((error) => {
            console.log('Service Worker: Erreur réseau:', error);
            // Retourner une réponse de fallback si disponible
            return caches.match('/');
          });
      })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Une nouvelle prière vous attend',
    icon: '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png',
    badge: '/lovable-uploads/44cc5b7e-c6a2-43ec-887b-1d8cf3f39dc5.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Découvrir'
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
