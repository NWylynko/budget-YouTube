if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,n,a)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const t={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return i;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/JjSvduCYJaiOfH_L7wLlW/_buildManifest.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/JjSvduCYJaiOfH_L7wLlW/_ssgManifest.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/0c428ae2-d080c8db2bf0c512ab0d.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/313-1194653598fa04698d37.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/656-d606dcd171e331ad484d.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/902-46f4b7c12cf244881c30.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/d7eeaac4-5c9d6bd28d4bf90bcda4.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/main-9b796a8e26f1b0e48c20.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/_app-a1175284a0104847ac8e.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/index-775852aa29829ee6327e.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/newVideo-cd9af3fe544c2e6d18a6.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/reset-2ea7dbb72ed6f1ee6968.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/search-1d886b5c323380cd00ac.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/search/%5BsearchString%5D-fdc9c42165fef0424cab.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-3a34995ef6d67f75748f.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/pages/video/%5Bid%5D-c9b9e8c14cf581262a53.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/_next/static/css/c80690483d3825e24f19.css",revision:"JjSvduCYJaiOfH_L7wLlW"},{url:"/favicon.ico",revision:"96d45eeb01432bd5ff90e34dcceddb1e"},{url:"/favicon.ico:Zone.Identifier",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/logo.png",revision:"737fd3cb09d4a33f45556b4c2eb6da20"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
