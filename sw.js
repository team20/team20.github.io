// Increment when you update the repo
const cacheName = "KnowledgeBase-v1";
// URLs for all the assets
const resourceFiles = [
	// Just The Docs assets
	"/assets/css/just-the-docs-default.css",
	"/assets/js/vendor/lunr.min.js",
	"/assets/js/just-the-docs.js",
	"/assets/js/search-data.json",
	// Actual assets
	"/favicon.png",
	"/apple-touch-icon.png",
	"/icons/icon-512.png",
	"/docs/index.html",
	"/docs/advanced_command_construction.html",
	"/docs/arduino_on_vs_code.html",
	"/docs/command_timers.html",
	"/docs/leds.html",
	"/docs/pids.html",
	"/docs/singleton.html",
	"/docs/subsystems_and_commands.html",
	"/docs/suppliers_and_lambda_expressions.html",
	"/docs/team20_styleguide.html"
]
self.addEventListener("install", (e) => {
	console.log("[Service Worker] Install");
	e.waitUntil(
		(async () => {
			const cache = await caches.open(cacheName);
			console.log("[ServiceWorker] Caching assets");
			await cache.addAll(resourceFiles);
		})()
	)
})
self.addEventListener("fetch", (e) => {
	e.respondWith(
		(async () => {
			const r = await caches.match(e.request);
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
			if (r) {
				return r;
			}
			const response = await fetch(e.request);
			const cache = await caches.open(cacheName);
			console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
			cache.put(e.request, response.clone());
			return response;
		})()
	);
});
self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key === cacheName) {
						return;
					}
					return caches.delete(key);
				})
			);
		})
	);
});
