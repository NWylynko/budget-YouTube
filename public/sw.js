if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return t[e]||(s=new Promise((async s=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},s=(s,t)=>{Promise.all(s.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(s)};self.define=(s,n,r)=>{t[s]||(t[s]=Promise.resolve().then((()=>{let t={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return t;case"module":return a;default:return e(s)}}))).then((e=>{const s=r(...e);return t.default||(t.default=s),t}))})))}}define("./sw.js",["./workbox-0a95ea09"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/174-36f6efc060aea9557cbe.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/1d839a1f-987d0f54472caf7be773.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/228-f274199cd7ae86a66e0d.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/966-5f1c810f6adfaebd2f50.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/fa8240de-1ba288898a0e65cf487a.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/framework-51fe56f9bc15abb3c448.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/main-392ce967d238cad92b52.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/_app-195c258c4bd0f2d69322.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/_error-20232ec8f98e9e15cbdf.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/index-17b3e62a85108c9013e6.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/newVideo-668432bcc66d042b2040.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-9fa6e88981dd4bd90384.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/pages/video/%5Bid%5D-0039e0dec78d3964fa55.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/polyfills-8130d45192adfebf9200.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/chunks/webpack-189c53927ffd3caf09c3.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/css/c65b6fc8bf08cb350d5c.css",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/dx5tsTtpnBruOC8ouoqVb/_buildManifest.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/_next/static/dx5tsTtpnBruOC8ouoqVb/_ssgManifest.js",revision:"dx5tsTtpnBruOC8ouoqVb"},{url:"/logo.png",revision:"737fd3cb09d4a33f45556b4c2eb6da20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
