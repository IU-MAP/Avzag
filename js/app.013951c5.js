(function(e){function t(t){for(var r,c,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)c=u[l],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&d.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},c={app:0},a={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d217db3":"8f6361c6","chunk-68518a58":"d1927e6a","chunk-69ad5f42":"68549c70","chunk-edcfe3ae":"c3f9c9c3","chunk-2d9553c2":"f2e18a5b","chunk-596cc62c":"ace8e884"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-68518a58":1,"chunk-69ad5f42":1,"chunk-edcfe3ae":1,"chunk-2d9553c2":1,"chunk-596cc62c":1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d217db3":"31d6cfe0","chunk-68518a58":"f378756b","chunk-69ad5f42":"04fc3d56","chunk-edcfe3ae":"d15048b8","chunk-2d9553c2":"79121b79","chunk-596cc62c":"4ef00c6b"}[e]+".css",a=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete c[e],f.parentNode.removeChild(f),n(o)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){c[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",d.name="ChunkLoadError",d.type=r,d.request=c,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/Avzag/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"3a0b":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return i}));n("b85c");var r,c=n("1da1"),a=(n("96cf"),n("d3b7"),n("7a23")),o=Object(a["w"])([]),u=null!==(r="https://raw.githubusercontent.com/IU-MAP/Avzag/store/")&&void 0!==r?r:"https://raw.githubusercontent.com/alkaitagi/Avzag/store/";function i(e,t){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(u+t+".json").then((function(e){return e.json()})).catch((function(){return n}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},"45dd":function(e,t,n){},7249:function(e,t,n){"use strict";n("45dd")},9041:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"d",(function(){return s})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var r,c=n("1da1"),a=(n("99af"),n("96cf"),n("3a0b")),o=n("7a23"),u=n("3f4f"),i=new Worker("db.worker.js",{type:"module"});i.onmessage=function(e){return f(e.data)};var s=Object(o["v"])({dbState:{state:"loading",lects:"",text:""},searching:!1}),l=Object(o["A"])(),d=Object(o["A"])([]);function f(e){return p.apply(this,arguments)}function p(){return p=Object(c["a"])(regeneratorRuntime.mark((function e(t){var n,c,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=JSON.parse(t),c=n.state,a=n.lects,s.dbState.state=c,"fetched"!==c){e.next=6;break}d.value=a,e.next=26;break;case 6:if("fetching"!==c){e.next=10;break}s.dbState.text="Fetching data from server...",e.next=26;break;case 10:if("preparing"!==c){e.next=14;break}s.dbState.text="Preparing database...",e.next=26;break;case 14:if("loading"!==c){e.next=19;break}s.dbState.lects=a,s.dbState.text="Loading ".concat(a," (").concat(d.value.indexOf(a)+1,"/").concat(d.value.length,")..."),e.next=26;break;case 19:if("ready"!==c){e.next=26;break}return s.dbState.state="opening",s.dbState.text="Opening database...",e.next=24,Object(u["a"])("avzag",1);case 24:r=e.sent,s.dbState.state="ready";case 26:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}Object(o["F"])(a["a"],Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(a["b"])("dictionary");case 2:l.value=e.sent,i.postMessage(JSON.stringify([a["c"],a["a"].value]));case 4:case"end":return e.stop()}}),e)}))))},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("9483");Object(r["a"])("".concat("/Avzag/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var c=n("7a23"),a=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),o=function(){return Promise.all([n.e("chunk-edcfe3ae"),n.e("chunk-2d9553c2")]).then(n.bind(null,"36e7"))},u=function(){return n.e("chunk-69ad5f42").then(n.bind(null,"900c"))},i=function(){return n.e("chunk-68518a58").then(n.bind(null,"acdc"))},s=function(){return Promise.all([n.e("chunk-edcfe3ae"),n.e("chunk-596cc62c")]).then(n.bind(null,"f5be"))},l=function(){return n.e("chunk-2d217db3").then(n.bind(null,"c907"))},d=[{path:"/home",name:"Home",component:o},{path:"/",component:u,children:[{path:"dictionary",name:"Dictionary",component:s}]},{path:"/editor/",component:i,children:[{path:"dictionary",name:"DictionaryEditor",component:l}]},{path:"/:pathMatch(.*)",redirect:{name:"Home"}}],f=Object(a["a"])({history:Object(a["b"])("/Avzag/"),routes:d});function p(e,t,n,r,a,o){var u=Object(c["z"])("router-view");return Object(c["r"])(),Object(c["d"])(u)}n("b0c0"),n("caad");var h=n("3a0b"),b=(n("9041"),Object(c["h"])({setup:function(){var e,t=Object(a["c"])(),n=Object(a["d"])();t.name&&"Home"!==t.name||n.push(localStorage.url&&localStorage.url!==t.path?{path:localStorage.url}:{name:"Home"}),"Home"!==t.name&&(h["a"].value=JSON.parse(null!==(e=localStorage.lects)&&void 0!==e?e:'["Kaitag"]')),Object(c["G"])((function(){var e=t.name;e&&(localStorage.url=t.path,["Dictionary"].includes(e)&&(localStorage.urlUser=t.path))}))}}));n("7249");b.render=p;var g=b,m={key:0,class:"icon"},v={key:1};function O(e,t,n,r,a,o){return Object(c["r"])(),Object(c["d"])("button",{class:{highlight:e.isOn}},[e.icon?(Object(c["r"])(),Object(c["d"])("p",m,Object(c["B"])(e.icon),1)):Object(c["e"])("",!0),e.text?(Object(c["r"])(),Object(c["d"])("p",v,Object(c["B"])(e.text),1)):Object(c["e"])("",!0)],2)}var k=Object(c["h"])({props:{icon:{type:String,default:""},text:{type:String,default:""},isOn:Boolean}});k.render=O;var y=k;function j(e,t,n,r,a,o){var u=Object(c["z"])("btn");return Object(c["r"])(),Object(c["d"])("div",{onClick:t[1]||(t[1]=function(){return e.toggle&&e.toggle.apply(e,arguments)})},[Object(c["y"])(e.$slots,"default",{on:e.modelValue},(function(){return[Object(c["g"])(u,Object(c["l"])({style:{width:"100%"}},e.attrs,{icon:e.icon,text:e.text,"is-on":e.modelValue}),null,16,["icon","text","is-on"])]}))])}var w=Object(c["h"])({props:{modelValue:Boolean,icon:{type:String,default:""},text:{type:String,default:""}},emits:["update:modelValue"],setup:function(e,t){var n=t.emit,r=t.attrs;function c(){n("update:modelValue",!e.modelValue)}return{toggle:c,attrs:r}}});w.render=j;var x=w,S=Object(c["c"])(g);S.component("Btn",y),S.component("Toggle",x),S.use(f),f.isReady().then((function(){return S.mount("#app")}))}});