interface Window extends ServiceWorkerGlobalScope { }
interface WindowEventMap extends ServiceWorkerGlobalScopeEventMap { }

const SW_FILE = '/sw.js';
const root = self.location.pathname.replace(SW_FILE, '');
const cacheFiles = [
    '',
    'index.html',
    'main.bundle.js',
    'main.css',
    'manifest.json',
    'static/icon-500.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll(
                cacheFiles.map((file) => `${root}/${file}`)
            );
        })
    );
});

const putInCache = async (request: Request, response: Response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
};

const cacheFirst = async (request: Request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
});