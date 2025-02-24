const CACHE_NAME = "budget-planner-cache-v2";
const FILES_TO_CACHE = [
  "/budget-planner/",
  "/budget-planner/index.html",
  "/budget-planner/style.css",
  "/budget-planner/script.js",
  "/budget-planner/manifest.json",
  "/budget-planner/icons/icon-128.png",
  "/budget-planner/icons/icon-512.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
