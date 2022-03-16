const CACHE_NAME = 'Andres-v2',
    urlsToCache = [
        'index.html',
        'assets/images/Portafolio.png',
        'assets/images/andres_icon.png',
        'assets/css/style.css',
        'assets/js/scrollreveal.min.js',
        'assets/js/index.js',
        'assets/images/Profile.jpg',
        'assets/images/undraw_version_control_re_mg66.svg',
        'assets/images/undraw_designer_re_5v95.svg',
        'assets/images/undraw_programming_re_kg9v.svg',
        'assets/images/undraw_server_status_-5-pbv.svg',
        'assets/images/papper_img.png',
        'assets/images/mors.png',
        'assets/images/expresso.png',
        'assets/images/Lexachange.png',
        'assets/images/SOT.png',
    ]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res
            }
            return fetch(e.request)
        })
    )
})