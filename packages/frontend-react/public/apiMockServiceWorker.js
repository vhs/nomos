// eslint-disable-next-line no-undef
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    if (!url.pathname.startsWith('/services/')) {
        // Do not propagate this event to other listeners (from MSW)
        event.stopImmediatePropagation()
    }
})

// eslint-disable-next-line no-undef
importScripts('./mockServiceWorker.js')
