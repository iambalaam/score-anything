export const cacheFiles = [
    '/main.bundle.js',
    '/main.css',
    '/manifest.json',
    '/static/icon-500.png',
];
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
};
self.addEventListener('install', (event) => {
    console.log('[[[ installed ]]]');
});
self.addEventListener('fetch', (_event) => {
    console.log('[[[ fetching ]]]');
});
