importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox)
    console.log(`Workbox berhasil dimuat`)
else
    console.log(`Workbox gagal dimuat`)

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/favicon.ico', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/tim.html', revision: '1' },
  { url: '/pages/standing.html', revision: '1' },
  { url: '/pages/team.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/icons/icon-192x192.png', revision: '1' },
  { url: '/icons/icon-512x512.png', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/sw-register.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },

]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.cacheableResponse.Plugin({
       statuses: [200],
      }),

      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, 
      }),
    ]
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options),
  );
});
