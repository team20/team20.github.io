// Increment when you update the repo
const cacheName = "KnowledgeBase-v13";
// URLs for all the assets
const resourceFiles = [
	// Just The Docs assets
	"/assets/css/just-the-docs-default.css",
	"/assets/js/vendor/lunr.min.js",
	"/assets/js/just-the-docs.js",
	"/assets/js/search-data.json",
	// Actual assets
	"/icons/apple-touch-icon.png",
	"/icons/favicon.svg",
	"/icons/maskable-icon-512.png",
	// Homepage path is /
	"/",
	// Pages and other assets
	"/assets/color_index_example.svg",
	"/assets/i_example.svg",
	"/leds/creating_patterns.html",
	"/leds/",
	"/common_vs_code_keyboard_shortcuts.html",
	"/dashboards.html",
	"/installing_dev_tools.html",
	"/i2c.html",
	"/pids.html",
	"/sensors.html",
	"/subsystems_and_commands.html",
	"/suppliers_and_lambda_expressions.html",
	"/team20_styleguide.html",
];
self.addEventListener("install", (e) => {
	// Make this the current service worker
	self.skipWaiting();
	console.log("[Service Worker] Install");
	e.waitUntil(
		(async () => {
			// Retrieve our cache object
			const cache = await caches.open(cacheName);
			console.log("[ServiceWorker] Caching assets");
			// Add our files to the cache
			await cache.addAll(resourceFiles);
		})()
	);
});
self.addEventListener("fetch", (e) => {
	e.respondWith(
		(async () => {
			// Check if the requested resource is in the cache
			const r = await caches.match(e.request);
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
			// If the resource is in the cache, respond back with the resource
			if (r) {
				return r;
			}
			// Otherwise, download the resource
			const response = await fetch(e.request);
			// Retrieve our cache object
			const cache = await caches.open(cacheName);
			console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
			// Add the resource to the cache
			cache.put(e.request, response.clone());
			// Respond to the request with the resource
			return response;
		})()
	);
});
self.addEventListener("activate", (e) => {
	// Immediately start controlling the page with this service worker
	// Allows PWA to be updated on navigation, without a need to close the app
	clients.claim();
	e.waitUntil(
		// Iterate through the names of all the cache objects
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					// If the one of the cache objects shares the same name with our current cache name, return
					if (key === cacheName) {
						return;
					}
					// Otherwise, delete it, as it is no longer needed
					return caches.delete(key);
				})
			);
		})
	);
});
