if(!self.define){let e,s={};const t=(t,a)=>(t=new URL(t+".js",a).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const r=e=>t(e,c),f={module:{uri:c},exports:n,require:r};s[c]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"9f3538c53ad925bbf0390745b50fcf54"},{url:"/_next/static/6w4kJu0DpFSAk9vTwUFyi/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/6w4kJu0DpFSAk9vTwUFyi/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/472-43481341d3714405.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/867-854d17ae8da2bcc2.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/app/_not-found-d15f7efadb1b59ca.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/app/layout-805788adf861ea8b.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/app/page-050e01a94b1e1fe7.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/fd9d1056-e49aae1bdad4a4d8.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/main-921268804cc70c2c.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/main-app-7deab9f6d6fd1a25.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c5870b2a5bb2d28d.js",revision:"6w4kJu0DpFSAk9vTwUFyi"},{url:"/_next/static/css/271dffe78ec9e4ad.css",revision:"271dffe78ec9e4ad"},{url:"/_next/static/css/417096b0943025ef.css",revision:"417096b0943025ef"},{url:"/_next/static/media/1188694531f36d8f-s.p.ttf",revision:"58c34bebcf85bacd220671cefe6c1440"},{url:"/_next/static/media/1efe2df38ee70740-s.p.ttf",revision:"3975abaf5a8c27c85c1c817133e2b31d"},{url:"/_next/static/media/3fcaee930f90035e-s.p.ttf",revision:"9e9b2236c1f18d74238e07b5e445bd00"},{url:"/_next/static/media/457e44f982aebfd6-s.p.ttf",revision:"479c781efd08274ad2457c20c8538114"},{url:"/_next/static/media/5420de7b34db7b07-s.p.ttf",revision:"755e2d8c7d81af76a117ad698c3b9224"},{url:"/_next/static/media/649642a8db70f2cb-s.p.ttf",revision:"6e4182e4fab423a8bd3983451b9352a4"},{url:"/_next/static/media/77788b1719935473-s.p.ttf",revision:"6d90ade07a3201416ff6319720e0a1c4"},{url:"/_next/static/media/7e8ec4628d14a8c9-s.p.ttf",revision:"1de2dcd167c70829db880adb625a0206"},{url:"/_next/static/media/90f78023f430028c-s.p.ttf",revision:"b04daf7bffd5c6a726f66f49fac93bf5"},{url:"/_next/static/media/a850d51a023f64c0-s.p.ttf",revision:"e66299ee9618b424457cc0ff898ca865"},{url:"/_next/static/media/b4636581442c281a-s.p.ttf",revision:"56bbe179f4b43dd1ee5e6c0db44a2008"},{url:"/_next/static/media/d61f11402d0bb439-s.p.ttf",revision:"9e537c72da37b2ac2dfc5353fb4ac304"},{url:"/_next/static/media/d8d2fcc502cb0fd3-s.p.ttf",revision:"457d8d73739fe8d3ecf5872b5a18b2ab"},{url:"/_next/static/media/dd6548de978ee38f-s.p.ttf",revision:"b9d4482944bfd135b2a65621f3725c4d"},{url:"/_next/static/media/ef67524af038191e-s.p.ttf",revision:"db3eaac931645ee23be46d098baca484"},{url:"/_next/static/media/fb501ce1dc57a689-s.p.ttf",revision:"ecd7b887a074d12e0fd7c354e1300e4c"},{url:"/fonts/Caros Black Italic.ttf",revision:"755e2d8c7d81af76a117ad698c3b9224"},{url:"/fonts/Caros Black.ttf",revision:"1de2dcd167c70829db880adb625a0206"},{url:"/fonts/Caros Bold Italic.ttf",revision:"3975abaf5a8c27c85c1c817133e2b31d"},{url:"/fonts/Caros Bold.ttf",revision:"457d8d73739fe8d3ecf5872b5a18b2ab"},{url:"/fonts/Caros ExtraBold Italic.ttf",revision:"6e4182e4fab423a8bd3983451b9352a4"},{url:"/fonts/Caros ExtraBold.ttf",revision:"ecd7b887a074d12e0fd7c354e1300e4c"},{url:"/fonts/Caros ExtraLight Italic.ttf",revision:"fcb89a95bc3fff0179e0f5803fa28c5b"},{url:"/fonts/Caros ExtraLight.ttf",revision:"f07c6107e68ac7b6cc52b5a1e503056d"},{url:"/fonts/Caros Heavy Italic.ttf",revision:"479c781efd08274ad2457c20c8538114"},{url:"/fonts/Caros Heavy.ttf",revision:"9e9b2236c1f18d74238e07b5e445bd00"},{url:"/fonts/Caros Italic.ttf",revision:"b04daf7bffd5c6a726f66f49fac93bf5"},{url:"/fonts/Caros Light Italic.ttf",revision:"9e537c72da37b2ac2dfc5353fb4ac304"},{url:"/fonts/Caros Light.ttf",revision:"58c34bebcf85bacd220671cefe6c1440"},{url:"/fonts/Caros Medium Italic.ttf",revision:"db3eaac931645ee23be46d098baca484"},{url:"/fonts/Caros Medium.ttf",revision:"e66299ee9618b424457cc0ff898ca865"},{url:"/fonts/Caros Thin Italic.ttf",revision:"6d90ade07a3201416ff6319720e0a1c4"},{url:"/fonts/Caros Thin.ttf",revision:"b9d4482944bfd135b2a65621f3725c4d"},{url:"/fonts/Caros.ttf",revision:"56bbe179f4b43dd1ee5e6c0db44a2008"},{url:"/icon-192x192.png",revision:"75b90ee7800017ab8ea2b22d7245c513"},{url:"/icon-256x256.png",revision:"1f6a69751b51c6890ed0dffd3769c4db"},{url:"/icon-384x384.png",revision:"04a6c17438f8df18ac3a1fcf31b1251c"},{url:"/icon-512x512.png",revision:"55a76e370cc228256c332fd8ba26550d"},{url:"/logo.png",revision:"777e0e469834f371c38896bd458003ab"},{url:"/logo.svg",revision:"244835dc0986a465062b7feafc1bd2a3"},{url:"/manifest.json",revision:"4b887e14eb105b7133ea6f8df876be9c"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
