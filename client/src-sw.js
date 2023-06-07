// dependencies
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// precacheAndRoute is a function that takes an array of files
precacheAndRoute(self.__WB_MANIFEST);

// pageCache is a strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// warmStrategyCache is a function that takes an object with urls and a strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// registerRoute is a function that takes a callback function and a strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implemented asset caching
registerRoute(
  ({ request}) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

