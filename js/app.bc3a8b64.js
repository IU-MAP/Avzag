(function(e){function t(t){for(var r,a,u=t[0],i=t[1],s=t[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&d.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==c[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0f1b6359":"d70b3b66","chunk-7c6d1b08":"14c49c46","chunk-a55ab080":"9544cb36","chunk-bb3a8c78":"1c78b680","chunk-3558f4bc":"c363fafe","chunk-f2e659ee":"6c4cc533"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-0f1b6359":1,"chunk-7c6d1b08":1,"chunk-a55ab080":1,"chunk-bb3a8c78":1,"chunk-3558f4bc":1,"chunk-f2e659ee":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-0f1b6359":"ecdb9761","chunk-7c6d1b08":"2e167660","chunk-a55ab080":"3b195c9e","chunk-bb3a8c78":"a1faf897","chunk-3558f4bc":"e0142137","chunk-f2e659ee":"9c7e6a63"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){s=d[u],l=s.getAttribute("data-href");if(l===r||l===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}c[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/avzag/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var f=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0c87":function(e,t,n){},"2cd9":function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return p}));var r=n("5530"),a=n("1da1"),c=(n("ac1f"),n("1276"),n("a15b"),n("fb6a"),n("7db0"),n("96cf"),n("1af2")),o=new c["a"]({auth:Object({VUE_APP_STORE:"https://raw.githubusercontent.com/IU-MAP/avzag/store/",NODE_ENV:"production",BASE_URL:"/avzag/"}).VUE_APP_GH_TOKEN}),u={owner:"alkaitagi",repo:"avzag"};function i(e){return s.apply(this,arguments)}function s(){return s=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.repos.getBranch(Object(r["a"])(Object(r["a"])({},u),{},{branch:"store"}));case 2:return n=e.sent,e.next=5,o.git.createRef(Object(r["a"])(Object(r["a"])({},u),{},{ref:"refs/heads/"+t,sha:n.data.commit.sha}));case 5:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}function l(e){return d.apply(this,arguments)}function d(){return d=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,a,c,i,s,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.split("/"),s=i.slice(0,-1).join("/"),l=i[i.length-1],e.next=5,o.git.getTree(Object(r["a"])(Object(r["a"])({},u),{},{tree_sha:"store:"+s})).catch((function(){}));case 5:return d=e.sent,e.abrupt("return",null===d||void 0===d||null===(n=d.data)||void 0===n||null===(a=n.tree)||void 0===a||null===(c=a.find((function(e){return(null===e||void 0===e?void 0:e.path)===l})))||void 0===c?void 0:c.sha);case 7:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function f(e,t,n,r){return h.apply(this,arguments)}function h(){return h=Object(a["a"])(regeneratorRuntime.mark((function e(t,n,a,c){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=btoa(unescape(encodeURIComponent(t+"\n"))),c=encodeURI(c+"/"+Date.now()),e.next=4,i(c);case 4:return e.next=6,l(n);case 6:return s=e.sent,e.next=9,o.repos.createOrUpdateFileContents(Object(r["a"])(Object(r["a"])({},u),{},{path:n,content:t,message:a,branch:c,sha:s}));case 9:return e.next=11,o.pulls.create(Object(r["a"])(Object(r["a"])({},u),{},{title:a,head:c,base:"store"}));case 11:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}function p(e){return b.apply(this,arguments)}function b(){return b=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.repos.listCommits(Object(r["a"])(Object(r["a"])({},u),{},{sha:"store",path:t,per_page:1}));case 2:return c=e.sent,i=null===(n=c.data[0])||void 0===n||null===(a=n.commit.committer)||void 0===a?void 0:a.date,e.abrupt("return",new Date(null!==i&&void 0!==i?i:0).getTime());case 5:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}},"3a0b":function(e,t,n){"use strict";n.d(t,"c",(function(){return h})),n.d(t,"f",(function(){return p})),n.d(t,"g",(function(){return b})),n.d(t,"a",(function(){return v})),n.d(t,"b",(function(){return g})),n.d(t,"d",(function(){return O})),n.d(t,"e",(function(){return y}));var r,a=n("b85c"),c=n("3835"),o=n("1da1"),u=(n("96cf"),n("4de4"),n("4fad"),n("caad"),n("2532"),n("2ca0"),n("b64b"),n("159b"),n("8a79"),n("d3b7"),n("a002")),i=n.n(u),s=n("7a23"),l=n("2cd9"),d=n("3f8f"),f=!1,h=Object(s["w"])([]),p=null!==(r="https://raw.githubusercontent.com/IU-MAP/avzag/store/")&&void 0!==r?r:"https://raw.githubusercontent.com/alkaitagi/avzag/store/",b=i.a.createInstance({name:"user"}),v=new d["a"](b,"cache",(function(){return b.getItem("lects").then((function(e){return h.value=null!==e&&void 0!==e?e:["Kaitag"]})).then((function(){return g(!0)}))}));function g(){return m.apply(this,arguments)}function m(){return m=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o,u,i,s,d,f,p=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=p.length>0&&void 0!==p[0]&&p[0],n=Object.entries(v.records.value).filter((function(e){var t=Object(c["a"])(e,1),n=t[0];return!n.includes("/")||h.value.some((function(e){return n.startsWith(e)}))})),r=[],o=Object(a["a"])(n),e.prev=4,o.s();case 6:if((u=o.n()).done){e.next=14;break}return i=Object(c["a"])(u.value,2),s=i[0],d=i[1],e.next=10,Object(l["a"])(s);case 10:f=e.sent,Date.now()-3e5>f&&f>d&&r.push(s);case 12:e.next=6;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](4),o.e(e.t0);case 19:return e.prev=19,o.f(),e.finish(19);case 22:r.length&&(console.log("cleaning outdated cache",r),t&&Object.keys(v.records.value).length&&window.alert("New data is available, reloading..."),null===r||void 0===r||r.forEach((function(e){return v.delete(e)})),location.reload());case 23:case"end":return e.stop()}}),e,null,[[4,16,19,22]])}))),m.apply(this,arguments)}function O(e,t){return j.apply(this,arguments)}function j(){return j=Object(o["a"])(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.endsWith(".json")||(t+=".json"),f||v.add(t)){e.next=5;break}return e.next=4,b.getItem(t);case 4:return e.abrupt("return",e.sent);case 5:return console.log("cached",t),e.next=8,fetch(p+t,{cache:"no-store"}).then((function(e){return e.json()})).then((function(e){return e})).catch((function(){return n}));case 8:return r=e.sent,e.next=11,b.setItem(t,r);case 11:return e.abrupt("return",r);case 12:case"end":return e.stop()}}),e)}))),j.apply(this,arguments)}function y(e){return k.apply(this,arguments)}function k(){return k=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n,r,c,o,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n={},r=Object(a["a"])(h.value),e.prev=2,r.s();case 4:if((c=r.n()).done){e.next=12;break}return o=c.value,e.next=8,O(o+"/"+t);case 8:u=e.sent,u&&(n[o]=u);case 10:e.next=4;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](2),r.e(e.t0);case 17:return e.prev=17,r.f(),e.finish(17);case 20:return e.abrupt("return",n);case 21:case"end":return e.stop()}}),e,null,[[2,14,17,20]])}))),k.apply(this,arguments)}},"3f8f":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("d4ec"),a=n("bee2"),c=n("7a23"),o=function(){function e(t){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cache",o=arguments.length>2?arguments[2]:void 0;Object(r["a"])(this,e),this.storage=t,this.records=Object(c["w"])({}),t.getItem(a).then((function(e){e&&(n.records.value=e),Object(c["G"])(n.records,(function(){return t.setItem(a,Object(c["C"])(n.records.value))}),{deep:!0}),null===o||void 0===o||o()}))}return Object(a["a"])(e,[{key:"clean",value:function(){this.records.value={}}},{key:"add",value:function(e){return!this.records.value[e]&&!!this.update(e)}},{key:"delete",value:function(e){delete this.records.value[e]}},{key:"update",value:function(e){return this.records.value[e]=Date.now()}},{key:"updateOf",value:function(e){var t;return null!==(t=this.records.value[e])&&void 0!==t?t:0}}]),e}()},"5f86":function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return l}));n("d3b7"),n("3ca3"),n("ddb0");var r=n("6c02"),a=function(){return n.e("chunk-a55ab080").then(n.bind(null,"36e7"))},c=function(){return n.e("chunk-7c6d1b08").then(n.bind(null,"900c"))},o=function(){return n.e("chunk-0f1b6359").then(n.bind(null,"acdc"))},u=function(){return Promise.all([n.e("chunk-bb3a8c78"),n.e("chunk-3558f4bc")]).then(n.bind(null,"f5be"))},i=function(){return Promise.all([n.e("chunk-bb3a8c78"),n.e("chunk-f2e659ee")]).then(n.bind(null,"c907"))},s=[{path:"dictionary",name:"dictionary",icon:"book",component:u}],l=[{path:"dictionary",name:"dictionaryEditor",title:"Dictionary",component:i}],d=[{path:"/home",name:"home",component:a},{path:"/",component:c,children:s},{path:"/editor/",component:o,children:l},{path:"/:pathMatch(.*)",redirect:{name:"home"}}];t["a"]=Object(r["a"])({history:Object(r["b"])(),routes:d})},9041:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return u}));var r=n("1da1"),a=(n("96cf"),n("3a0b")),c=n("7a23"),o=Object(c["A"])({lists:[]}),u=Object(c["A"])({});Object(c["G"])(a["c"],Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return u.value={},e.next=3,Object(a["e"])("dictionary");case 3:return u.value=e.sent,e.next=6,Object(a["d"])("dictionaryMeta");case 6:o.value=e.sent;case 7:case"end":return e.stop()}}),e)}))))},b78b:function(e,t,n){"use strict";n("0c87")},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("9483");Object(r["a"])("".concat("/avzag/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var a=n("7a23"),c=n("5f86");function o(e,t,n,r,c,o){var u=Object(a["z"])("router-view");return Object(a["r"])(),Object(a["d"])(u)}n("b0c0"),n("caad");var u=n("6c02"),i=(n("3a0b"),n("9041"),Object(a["h"])({setup:function(){var e=Object(u["c"])(),t=Object(u["d"])();e.name&&"home"!==e.name||t.push(localStorage.url&&localStorage.url!==e.path?{path:localStorage.url}:{name:"home"}),Object(a["H"])((function(){var t=e.name;t&&(localStorage.url=e.path,["phonology","converter","phrasebook","dictionary"].includes(t)&&(localStorage.urlUser=e.path))}))}}));n("b78b");i.render=o;var s=i,l={key:0,class:"icon"},d={key:1};function f(e,t,n,r,c,o){return Object(a["r"])(),Object(a["d"])("button",{class:{highlight:e.isOn}},[e.icon?(Object(a["r"])(),Object(a["d"])("p",l,Object(a["B"])(e.icon),1)):Object(a["e"])("",!0),e.text?(Object(a["r"])(),Object(a["d"])("p",d,Object(a["B"])(e.text),1)):Object(a["e"])("",!0),Object(a["y"])(e.$slots,"default")],2)}var h=Object(a["h"])({props:{icon:{type:String,default:""},text:{type:String,default:""},isOn:Boolean}});h.render=f;var p=h;function b(e,t,n,r,c,o){var u=Object(a["z"])("btn");return Object(a["r"])(),Object(a["d"])("div",{onClick:t[1]||(t[1]=function(){return e.toggle&&e.toggle.apply(e,arguments)})},[Object(a["y"])(e.$slots,"default",{on:e.modelValue},(function(){return[Object(a["g"])(u,Object(a["l"])({style:{width:"100%"}},e.attrs,{icon:e.icon,text:e.text,"is-on":e.modelValue}),null,16,["icon","text","is-on"])]}))])}var v=Object(a["h"])({props:{modelValue:Boolean,icon:{type:String,default:""},text:{type:String,default:""}},emits:["update:modelValue"],setup:function(e,t){var n=t.emit,r=t.attrs;function a(){n("update:modelValue",!e.modelValue)}return{toggle:a,attrs:r}}});v.render=b;var g=v,m=Object(a["c"])(s);m.component("Btn",p),m.component("Toggle",g),m.use(c["a"]),c["a"].isReady().then((function(){return m.mount("#app")}))}});