if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const i={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return i;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-fe65099d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/27-9d9eb08b1c18dea7f45a.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/3094943b-2f658b0dae7c10732d5b.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/375-45e93962566148393fac.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/909-701a6414a19f7cd1d6c5.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/a4c23e0b-cad5a5d6d24bce76ae49.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/framework-a5af755040276602e85e.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/main-1692a829cb4d6b3d0f82.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/_app-684a64be9bfbf5ba66a7.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/_error-14d5b12eab1c57c8891e.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/index-6b39a4501c587e54113a.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/newVideo-3eeed6ca8883dc584cfc.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/reset-dfe1f5c2b3ff87c1abf4.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/search-4dff4713e53dc8d949e0.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/search/%5BsearchString%5D-c8e47dc621f70b28abcb.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-c28ad8ca0d5669da08eb.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/pages/video/%5Bid%5D-2ab7fee07516df5b5ae4.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/css/c80690483d3825e24f19.css",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/ejSlXkyF4dUTqJZXbbgVn/_buildManifest.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/_next/static/ejSlXkyF4dUTqJZXbbgVn/_ssgManifest.js",revision:"ejSlXkyF4dUTqJZXbbgVn"},{url:"/logo.png",revision:"737fd3cb09d4a33f45556b4c2eb6da20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
