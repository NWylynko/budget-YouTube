if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise((async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},s=(s,t)=>{Promise.all(s.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(s)};self.define=(s,r,n)=>{t[s]||(t[s]=Promise.resolve().then((()=>{let t={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return t;case"module":return a;default:return e(s)}}))).then((e=>{const s=n(...e);return t.default||(t.default=s),t}))})))}}define("./sw.js",["./workbox-0a95ea09"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/0GxbUEhTLoU2DtKjvrfez/_buildManifest.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/0GxbUEhTLoU2DtKjvrfez/_ssgManifest.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/1d839a1f-987d0f54472caf7be773.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/210-121dfc737b6a691bcb09.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/755-2484585440bbbfbf9022.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/873-25c451d27d2452e24916.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/fa8240de-1ba288898a0e65cf487a.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/framework-694ecec5cb0e555e8e7f.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/main-a0423d81c6e34e3c2e47.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/_app-1941bd9536a7e33f26dd.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/_error-f24407c8cc8b94d6dff6.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/index-39f24c13e4444b6a98a3.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/newVideo-fce866c022705849174a.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/reset-8b96e0780dd95eb5e03d.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-a0e0c340a9a8d58b61fe.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/pages/video/%5Bid%5D-3143cb82fe24c9092053.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/polyfills-dd91df1c67653d75386b.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/chunks/webpack-715970c8028b8d8e1f64.js",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/_next/static/css/445d848fd27da01d1492.css",revision:"0GxbUEhTLoU2DtKjvrfez"},{url:"/logo.png",revision:"737fd3cb09d4a33f45556b4c2eb6da20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
