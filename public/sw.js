if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,r)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=r(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-0a95ea09"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/GG976lGN4qXSOXv0SUjXm/_buildManifest.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/GG976lGN4qXSOXv0SUjXm/_ssgManifest.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/1d839a1f-987d0f54472caf7be773.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/210-121dfc737b6a691bcb09.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/777-fcbe3b52a923cae13ed4.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/966-5f1c810f6adfaebd2f50.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/fa8240de-1ba288898a0e65cf487a.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/framework-51fe56f9bc15abb3c448.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/main-392ce967d238cad92b52.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/_app-47061a0b65d513a6e49e.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/_error-20232ec8f98e9e15cbdf.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/index-51a5c2b66678839f573e.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/newVideo-842ad23048694d708f5d.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-d041ce257045133cd432.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/pages/video/%5Bid%5D-34378cb42e13273b6137.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/polyfills-8130d45192adfebf9200.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/chunks/webpack-189c53927ffd3caf09c3.js",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/_next/static/css/c65b6fc8bf08cb350d5c.css",revision:"GG976lGN4qXSOXv0SUjXm"},{url:"/logo.png",revision:"737fd3cb09d4a33f45556b4c2eb6da20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
