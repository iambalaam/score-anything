if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let t={};const o=e=>n(e,r),l={module:{uri:r},exports:t,require:o};i[r]=Promise.all(s.map((e=>l[e]||o(e)))).then((e=>(c(...e),t)))}}define(["./workbox-2b403519"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"e8a72293db5c211628a1d93c9882cc5a"},{url:"main.01cca61cf2a87e287ad3.js",revision:null},{url:"main.01cca61cf2a87e287ad3.js.LICENSE.txt",revision:"24b2f157c93c969ea273704c14bab474"},{url:"main.0329e2cabbb6e77f2b13.css",revision:null}],{})}));
//# sourceMappingURL=sw.js.map
