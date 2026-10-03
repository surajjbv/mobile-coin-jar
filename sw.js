// Coin Jar offline support.
// - The page itself: network first (so a push to main shows up straight away), falling back to the cached copy
//   when offline or when the network is slow.
// - Everything else (icons, sounds, fonts, the pinned three.js / Rapier builds): served from the cache, refreshed
//   in the background.
const CACHE = 'coin-jar-v8';
const CDN = 'https://cdn.jsdelivr.net/npm/';
const PRECACHE = [
  './', 'manifest.webmanifest', 'icon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'officer.glb',
  ...['clink-1', 'clink-2', 'clink-3', 'clink-4', 'clink-5', 'bounce-1', 'bounce-2', 'bounce-3', 'bounce-4', 'jingle-1', 'jingle-2']
    .map(n => `sounds/${n}.m4a`),
  CDN + 'three@0.186.1/build/three.module.min.js',
  CDN + 'three@0.186.1/build/three.core.min.js',
  CDN + 'three@0.186.1/examples/jsm/environments/RoomEnvironment.js',
  CDN + 'three@0.186.1/examples/jsm/loaders/GLTFLoader.js',
  CDN + 'three@0.186.1/examples/jsm/utils/BufferGeometryUtils.js',
  CDN + 'three@0.186.1/examples/jsm/utils/SkeletonUtils.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/EffectComposer.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/RenderPass.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/UnrealBloomPass.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/OutputPass.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/Pass.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/MaskPass.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/ShaderPass.js',
  CDN + 'three@0.186.1/examples/jsm/shaders/CopyShader.js',
  CDN + 'three@0.186.1/examples/jsm/shaders/LuminosityHighPassShader.js',
  CDN + 'three@0.186.1/examples/jsm/shaders/OutputShader.js',
  CDN + 'three@0.186.1/examples/jsm/geometries/RoundedBoxGeometry.js',
  CDN + 'three@0.186.1/examples/jsm/postprocessing/BokehPass.js',
  CDN + 'three@0.186.1/examples/jsm/shaders/BokehShader.js',
  CDN + '@dimforge/rapier3d-compat@0.21.0/dist/rapier.mjs',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  // Always save the fresh page when it arrives, even if it was too slow to show this time:
  // otherwise a phone on a slow connection could keep opening an old version.
  const fresh = fetch(req.url, { cache: 'no-cache' }).then(res => { if (res.ok) cache.put('./', res.clone()); return res; }); // skip the host's HTTP cache too
  try {
    return await Promise.race([fresh, new Promise((_, no) => setTimeout(() => no(new Error('slow')), 4000))]);
  } catch (e) {
    fresh.catch(() => {});
    return (await cache.match('./')) || fresh.catch(() => Response.error());
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const update = fetch(req).then(res => { if (res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; });
  if (hit) { update.catch(() => {}); return hit; }
  return update;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.endsWith('/version.json')) return; // always ask the network: it's how the app spots updates
  if (req.mode === 'navigate' && url.origin === location.origin) return e.respondWith(networkFirst(req));
  if (url.origin === location.origin || url.href.startsWith(CDN) ||
      url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(req));
  }
});
