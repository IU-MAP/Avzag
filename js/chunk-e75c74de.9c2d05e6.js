(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e75c74de"],{1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),a=n("825a"),s=n("1d80"),o=n("4840"),u=n("8aa5"),c=n("50c4"),l=n("14c3"),f=n("9263"),d=n("d039"),h=[].push,v=Math.min,p=4294967295,g=!d((function(){return!RegExp(p,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(s(this)),a=void 0===n?p:n>>>0;if(0===a)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,a);var o,u,c,l=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,g=new RegExp(t.source,d+"g");while(o=f.call(g,r)){if(u=g.lastIndex,u>v&&(l.push(r.slice(v,o.index)),o.length>1&&o.index<r.length&&h.apply(l,o.slice(1)),c=o[0].length,v=u,l.length>=a))break;g.lastIndex===o.index&&g.lastIndex++}return v===r.length?!c&&g.test("")||l.push(""):l.push(r.slice(v)),l.length>a?l.slice(0,a):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=s(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,i,n):r.call(String(i),e,n)},function(t,i){var s=n(r,t,this,i,r!==e);if(s.done)return s.value;var f=a(t),d=String(this),h=o(f,RegExp),b=f.unicode,x=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(g?"y":"g"),y=new h(g?f:"^(?:"+f.source+")",x),O=void 0===i?p:i>>>0;if(0===O)return[];if(0===d.length)return null===l(y,d)?[d]:[];var j=0,I=0,E=[];while(I<d.length){y.lastIndex=g?I:0;var k,w=l(y,g?d:d.slice(I));if(null===w||(k=v(c(y.lastIndex+(g?0:I)),d.length))===j)I=u(d,I,b);else{if(E.push(d.slice(j,I)),E.length===O)return E;for(var m=1;m<=w.length-1;m++)if(E.push(w[m]),E.length===O)return E;I=j=k}}return E.push(d.slice(j)),E}]}),!g)},"2ca0":function(t,e,n){"use strict";var r=n("23e7"),i=n("06cf").f,a=n("50c4"),s=n("5a34"),o=n("1d80"),u=n("ab13"),c=n("c430"),l="".startsWith,f=Math.min,d=u("startsWith"),h=!c&&!d&&!!function(){var t=i(String.prototype,"startsWith");return t&&!t.writable}();r({target:"String",proto:!0,forced:!h&&!d},{startsWith:function(t){var e=String(o(this));s(t);var n=a(f(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return l?l.call(e,r,n):e.slice(n,n+r.length)===r}})},6062:function(t,e,n){"use strict";var r=n("6d61"),i=n("6566");t.exports=r("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(t,e,n){"use strict";var r=n("9bf2").f,i=n("7c73"),a=n("e2cc"),s=n("0366"),o=n("19aa"),u=n("2266"),c=n("7dd0"),l=n("2626"),f=n("83ab"),d=n("f183").fastKey,h=n("69f3"),v=h.set,p=h.getterFor;t.exports={getConstructor:function(t,e,n,c){var l=t((function(t,r){o(t,l,e),v(t,{type:e,index:i(null),first:void 0,last:void 0,size:0}),f||(t.size=0),void 0!=r&&u(r,t[c],{that:t,AS_ENTRIES:n})})),h=p(e),g=function(t,e,n){var r,i,a=h(t),s=b(t,e);return s?s.value=n:(a.last=s={index:i=d(e,!0),key:e,value:n,previous:r=a.last,next:void 0,removed:!1},a.first||(a.first=s),r&&(r.next=s),f?a.size++:t.size++,"F"!==i&&(a.index[i]=s)),t},b=function(t,e){var n,r=h(t),i=d(e);if("F"!==i)return r.index[i];for(n=r.first;n;n=n.next)if(n.key==e)return n};return a(l.prototype,{clear:function(){var t=this,e=h(t),n=e.index,r=e.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;e.first=e.last=void 0,f?e.size=0:t.size=0},delete:function(t){var e=this,n=h(e),r=b(e,t);if(r){var i=r.next,a=r.previous;delete n.index[r.index],r.removed=!0,a&&(a.next=i),i&&(i.previous=a),n.first==r&&(n.first=i),n.last==r&&(n.last=a),f?n.size--:e.size--}return!!r},forEach:function(t){var e,n=h(this),r=s(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:n.first){r(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!b(this,t)}}),a(l.prototype,n?{get:function(t){var e=b(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),f&&r(l.prototype,"size",{get:function(){return h(this).size}}),l},setStrong:function(t,e,n){var r=e+" Iterator",i=p(e),a=p(r);c(t,e,(function(t,e){v(this,{type:r,target:t,state:i(t),kind:e,last:void 0})}),(function(){var t=a(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),l(e)}}},"6d61":function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),a=n("94ca"),s=n("6eeb"),o=n("f183"),u=n("2266"),c=n("19aa"),l=n("861d"),f=n("d039"),d=n("1c7e"),h=n("d44e"),v=n("7156");t.exports=function(t,e,n){var p=-1!==t.indexOf("Map"),g=-1!==t.indexOf("Weak"),b=p?"set":"add",x=i[t],y=x&&x.prototype,O=x,j={},I=function(t){var e=y[t];s(y,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!l(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!l(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})};if(a(t,"function"!=typeof x||!(g||y.forEach&&!f((function(){(new x).entries().next()})))))O=n.getConstructor(e,t,p,b),o.REQUIRED=!0;else if(a(t,!0)){var E=new O,k=E[b](g?{}:-0,1)!=E,w=f((function(){E.has(1)})),m=d((function(t){new x(t)})),S=!g&&f((function(){var t=new x,e=5;while(e--)t[b](e,e);return!t.has(-0)}));m||(O=e((function(e,n){c(e,O,t);var r=v(new x,e,O);return void 0!=n&&u(n,r[b],{that:r,AS_ENTRIES:p}),r})),O.prototype=y,y.constructor=O),(w||S)&&(I("delete"),I("has"),p&&I("get")),(S||k)&&I(b),g&&y.clear&&delete y.clear}return j[t]=O,r({global:!0,forced:O!=x},j),h(O,t),g||n.setStrong(O,t,p),O}},7156:function(t,e,n){var r=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var a,s;return i&&"function"==typeof(a=e.constructor)&&a!==n&&r(s=a.prototype)&&s!==n.prototype&&i(t,s),t}},"8a79":function(t,e,n){"use strict";var r=n("23e7"),i=n("06cf").f,a=n("50c4"),s=n("5a34"),o=n("1d80"),u=n("ab13"),c=n("c430"),l="".endsWith,f=Math.min,d=u("endsWith"),h=!c&&!d&&!!function(){var t=i(String.prototype,"endsWith");return t&&!t.writable}();r({target:"String",proto:!0,forced:!h&&!d},{endsWith:function(t){var e=String(o(this));s(t);var n=arguments.length>1?arguments[1]:void 0,r=a(e.length),i=void 0===n?r:f(a(n),r),u=String(t);return l?l.call(e,u,i):e.slice(i-u.length,i)===u}})},a9e3:function(t,e,n){"use strict";var r=n("83ab"),i=n("da84"),a=n("94ca"),s=n("6eeb"),o=n("5135"),u=n("c6b6"),c=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),h=n("241c").f,v=n("06cf").f,p=n("9bf2").f,g=n("58a8").trim,b="Number",x=i[b],y=x.prototype,O=u(d(y))==b,j=function(t){var e,n,r,i,a,s,o,u,c=l(t,!1);if("string"==typeof c&&c.length>2)if(c=g(c),e=c.charCodeAt(0),43===e||45===e){if(n=c.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+c}for(a=c.slice(2),s=a.length,o=0;o<s;o++)if(u=a.charCodeAt(o),u<48||u>i)return NaN;return parseInt(a,r)}return+c};if(a(b,!x(" 0o1")||!x("0b1")||x("+0x1"))){for(var I,E=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof E&&(O?f((function(){y.valueOf.call(n)})):u(n)!=b)?c(new x(j(e)),n,E):j(e)},k=r?h(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),w=0;k.length>w;w++)o(x,I=k[w])&&!o(E,I)&&p(E,I,v(x,I));E.prototype=y,y.constructor=E,s(i,b,E)}},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},d9c7:function(t,e,n){"use strict";var r=n("7a23"),i={key:0,class:"col"},a={key:0},s={key:1,class:"highlight-font"},o={key:2},u={key:3,class:"text-ipa"};function c(t,e,n,c,l,f){return t.notes.length?(Object(r["r"])(),Object(r["d"])("div",i,[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t.pieces,(function(t,e){return Object(r["r"])(),Object(r["d"])("p",{key:e},[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t,(function(t,e){var n=t.text,i=t.display;return Object(r["r"])(),Object(r["d"])(r["a"],{key:e},["plain"===i?(Object(r["r"])(),Object(r["d"])("span",a,Object(r["C"])(n),1)):"highlight"===i?(Object(r["r"])(),Object(r["d"])("span",s,Object(r["C"])(n),1)):"bold"===i?(Object(r["r"])(),Object(r["d"])("b",o,Object(r["C"])(n),1)):(Object(r["r"])(),Object(r["d"])("span",u,Object(r["C"])(n),1))],64)})),128))])})),128))])):Object(r["e"])("",!0)}n("4de4"),n("a15b"),n("d81d"),n("fb6a"),n("ac1f"),n("8a79"),n("1276"),n("2ca0");var l=n("3835"),f=Object(r["h"])({name:"Notes",props:{notes:{type:Array,default:function(){return[]}}},emits:["texts"],setup:function(t,e){var n=e.emit;function i(t){for(var e=[["^","highlight"],["/","phoneme"],["*","bold"]],n=0,r=e;n<r.length;n++){var i=Object(l["a"])(r[n],2),a=i[0],s=i[1];if(t.startsWith(a)&&t.endsWith(a))return{text:t.slice(1,-1),display:s}}return{text:t,display:"plain"}}var a=Object(r["b"])((function(){var e=/(\/[^/]+\/|\^[^^]+\^|\*[^*]+\*)/g;return t.notes.map((function(t){return t.split(e).filter((function(t){return t})).map((function(t){return i(t)}))})).filter((function(t){return t.length}))}));return Object(r["K"])((function(){return n("texts",a.value.map((function(t){return t.map((function(t){var e=t.text;return e})).join("")})))})),{pieces:a}}});f.render=c;e["a"]=f},f183:function(t,e,n){var r=n("d012"),i=n("861d"),a=n("5135"),s=n("9bf2").f,o=n("90e3"),u=n("bb2f"),c=o("meta"),l=0,f=Object.isExtensible||function(){return!0},d=function(t){s(t,c,{value:{objectID:"O"+ ++l,weakData:{}}})},h=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,c)){if(!f(t))return"F";if(!e)return"E";d(t)}return t[c].objectID},v=function(t,e){if(!a(t,c)){if(!f(t))return!0;if(!e)return!1;d(t)}return t[c].weakData},p=function(t){return u&&g.REQUIRED&&f(t)&&!a(t,c)&&d(t),t},g=t.exports={REQUIRED:!1,fastKey:h,getWeakData:v,onFreeze:p};r[c]=!0}}]);