const CACHE_NAME = "app-cache-v1";

const ASSETS = [
  "index.html",
  "style.css",
  "app.js",
  "action.js",

  "action_eat.html",
  "action_sleep.html",
  "action_bath.html",
  "action_toilet.html",
  "action_change.html",
  "action_play.html",
  "action_study.html",

  "living_base.webp",
  "living_pastel.webp",
  "kitchen_base.webp",
  "bath_base.webp",
  "toilet_base.webp",
  "bedroom_base.webp",
  "study_base.webp",
  "closet_base.webp",

  "char_idle.png",
  "char_walk1.png",
  "char_walk2.png",
  "char_eat.png",
  "char_sleep.png",
  "char_bath.png",
  "char_toilet.png",
  "char_change.png",
  "char_play.png",
  "char_study.png",

  "default.png",
  "outfit1.png",
  "outfit2.png",

  "cushion.png",
  "wall_art.png",
  "sofa_upgrade.png",

  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

/* -----------------------------------
   インストール（初回キャッシュ）
----------------------------------- */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

/* -----------------------------------
   リクエスト処理
----------------------------------- */
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // HTML → Network First（更新を優先）
  if (req.headers.get("accept").includes("text/html")) {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // 画像 → Cache First（高速表示）
  if (url.pathname.match(/\.(png|webp|jpg|jpeg)$/)) {
    event.respondWith(
      caches.match(req).then(res => res || fetch(req))
    );
    return;
  }

  // CSS / JS → Stale-While-Revalidate（高速＋更新）
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(req, networkRes.clone());
        });
        return networkRes;
      });
      return cached || fetchPromise;
    })
  );
});
