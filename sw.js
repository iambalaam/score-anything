"use strict";
const cacheFiles = [
    '/',
    '/index.html',
    '/main.bundle.js',
    '/main.css',
    '/manifest.json',
    '/static/icon-500.png',
];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open('v1').then((cache) => {
        return cache.addAll(cacheFiles);
    }));
});
const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
};
const cacheFirst = async (request) => {
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
