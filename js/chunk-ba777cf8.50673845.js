(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba777cf8"],{"0e32":function(t,e,n){"use strict";n("a434");var r=n("7a23");function o(t,e,n,o,c,a){var i=Object(r["A"])("ArrayControl"),u=Object(r["A"])("btn"),l=Object(r["A"])("EditorCard");return Object(r["r"])(),Object(r["d"])(l,{icon:"sticky_note_2",header:"Notes"},{header:Object(r["L"])((function(){return[Object(r["g"])(i,{modelValue:t.notes,"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.notes=e}),add:""},null,8,["modelValue"])]})),caption:Object(r["L"])((function(){return[Object(r["z"])(t.$slots,"default")]})),default:Object(r["L"])((function(){return[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t.notes,(function(e,n){return Object(r["r"])(),Object(r["d"])("div",{key:n,class:"row"},[Object(r["M"])(Object(r["g"])("input",{"onUpdate:modelValue":function(e){return t.notes[n]=e},type:"text",placeholder:"note #"+n},null,8,["onUpdate:modelValue","placeholder"]),[[r["H"],t.notes[n]]]),Object(r["g"])(u,{icon:"clear",onClick:function(e){return t.notes.splice(n,1)}},null,8,["onClick"])])})),128))]})),_:1})}var c=n("7694"),a=n("b5cc"),i=Object(r["h"])({name:"NotesEditor",components:{ArrayControl:a["a"],EditorCard:c["a"]},props:{modelValue:{type:Array,default:void 0}},emits:["update:modelValue"],setup:function(t,e){var n=e.emit,o=Object(r["b"])({get:function(){return t.modelValue},set:function(t){return n("update:modelValue",t)}});return{notes:o}}});i.render=o;e["a"]=i},"13d5":function(t,e,n){"use strict";var r=n("23e7"),o=n("d58f").left,c=n("a640"),a=n("ae40"),i=n("2d00"),u=n("605d"),l=c("reduce"),d=a("reduce",{1:0}),s=!u&&i>79&&i<83;r({target:"Array",proto:!0,forced:!l||!d||s},{reduce:function(t){return o(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"159b":function(t,e,n){var r=n("da84"),o=n("fdbc"),c=n("17c2"),a=n("9112");for(var i in o){var u=r[i],l=u&&u.prototype;if(l&&l.forEach!==c)try{a(l,"forEach",c)}catch(d){l.forEach=c}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,o=n("a640"),c=n("ae40"),a=o("forEach"),i=c("forEach");t.exports=a&&i?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},2532:function(t,e,n){"use strict";var r=n("23e7"),o=n("5a34"),c=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(c(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})},3835:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return i}));n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0");function o(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,c=void 0;try{for(var a,i=t[Symbol.iterator]();!(r=(a=i.next()).done);r=!0)if(n.push(a.value),e&&n.length===e)break}catch(u){o=!0,c=u}finally{try{r||null==i["return"]||i["return"]()}finally{if(o)throw c}}return n}}var c=n("06c5");function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){return r(t)||o(t,e)||Object(c["a"])(t,e)||a()}},4160:function(t,e,n){"use strict";var r=n("23e7"),o=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},"44e7":function(t,e,n){var r=n("861d"),o=n("c6b6"),c=n("b622"),a=c("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==o(t))}},"4de4":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").filter,c=n("1dde"),a=n("ae40"),i=c("filter"),u=a("filter");r({target:"Array",proto:!0,forced:!i||!u},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"4fad":function(t,e,n){var r=n("23e7"),o=n("6f53").entries;r({target:"Object",stat:!0},{entries:function(t){return o(t)}})},"5a34":function(t,e,n){var r=n("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},6062:function(t,e,n){"use strict";var r=n("6d61"),o=n("6566");t.exports=r("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),o)},6566:function(t,e,n){"use strict";var r=n("9bf2").f,o=n("7c73"),c=n("e2cc"),a=n("0366"),i=n("19aa"),u=n("2266"),l=n("7dd0"),d=n("2626"),s=n("83ab"),f=n("f183").fastKey,b=n("69f3"),v=b.set,p=b.getterFor;t.exports={getConstructor:function(t,e,n,l){var d=t((function(t,r){i(t,d,e),v(t,{type:e,index:o(null),first:void 0,last:void 0,size:0}),s||(t.size=0),void 0!=r&&u(r,t[l],{that:t,AS_ENTRIES:n})})),b=p(e),O=function(t,e,n){var r,o,c=b(t),a=j(t,e);return a?a.value=n:(c.last=a={index:o=f(e,!0),key:e,value:n,previous:r=c.last,next:void 0,removed:!1},c.first||(c.first=a),r&&(r.next=a),s?c.size++:t.size++,"F"!==o&&(c.index[o]=a)),t},j=function(t,e){var n,r=b(t),o=f(e);if("F"!==o)return r.index[o];for(n=r.first;n;n=n.next)if(n.key==e)return n};return c(d.prototype,{clear:function(){var t=this,e=b(t),n=e.index,r=e.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;e.first=e.last=void 0,s?e.size=0:t.size=0},delete:function(t){var e=this,n=b(e),r=j(e,t);if(r){var o=r.next,c=r.previous;delete n.index[r.index],r.removed=!0,c&&(c.next=o),o&&(o.previous=c),n.first==r&&(n.first=o),n.last==r&&(n.last=c),s?n.size--:e.size--}return!!r},forEach:function(t){var e,n=b(this),r=a(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:n.first){r(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!j(this,t)}}),c(d.prototype,n?{get:function(t){var e=j(this,t);return e&&e.value},set:function(t,e){return O(this,0===t?0:t,e)}}:{add:function(t){return O(this,t=0===t?0:t,t)}}),s&&r(d.prototype,"size",{get:function(){return b(this).size}}),d},setStrong:function(t,e,n){var r=e+" Iterator",o=p(e),c=p(r);l(t,e,(function(t,e){v(this,{type:r,target:t,state:o(t),kind:e,last:void 0})}),(function(){var t=c(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),d(e)}}},"6d61":function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),c=n("94ca"),a=n("6eeb"),i=n("f183"),u=n("2266"),l=n("19aa"),d=n("861d"),s=n("d039"),f=n("1c7e"),b=n("d44e"),v=n("7156");t.exports=function(t,e,n){var p=-1!==t.indexOf("Map"),O=-1!==t.indexOf("Weak"),j=p?"set":"add",h=o[t],y=h&&h.prototype,m=h,g={},x=function(t){var e=y[t];a(y,t,"add"==t?function(t){return e.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(O&&!d(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return O&&!d(t)?void 0:e.call(this,0===t?0:t)}:"has"==t?function(t){return!(O&&!d(t))&&e.call(this,0===t?0:t)}:function(t,n){return e.call(this,0===t?0:t,n),this})};if(c(t,"function"!=typeof h||!(O||y.forEach&&!s((function(){(new h).entries().next()})))))m=n.getConstructor(e,t,p,j),i.REQUIRED=!0;else if(c(t,!0)){var k=new m,E=k[j](O?{}:-0,1)!=k,w=s((function(){k.has(1)})),V=f((function(t){new h(t)})),C=!O&&s((function(){var t=new h,e=5;while(e--)t[j](e,e);return!t.has(-0)}));V||(m=e((function(e,n){l(e,m,t);var r=v(new h,e,m);return void 0!=n&&u(n,r[j],{that:r,AS_ENTRIES:p}),r})),m.prototype=y,y.constructor=m),(w||C)&&(x("delete"),x("has"),p&&x("get")),(C||E)&&x(j),O&&y.clear&&delete y.clear}return g[t]=m,r({global:!0,forced:m!=h},g),b(m,t),O||n.setStrong(m,t,p),m}},"6f53":function(t,e,n){var r=n("83ab"),o=n("df75"),c=n("fc6a"),a=n("d1e7").f,i=function(t){return function(e){var n,i=c(e),u=o(i),l=u.length,d=0,s=[];while(l>d)n=u[d++],r&&!a.call(i,n)||s.push(t?[n,i[n]]:i[n]);return s}};t.exports={entries:i(!0),values:i(!1)}},7156:function(t,e,n){var r=n("861d"),o=n("d2bb");t.exports=function(t,e,n){var c,a;return o&&"function"==typeof(c=e.constructor)&&c!==n&&r(a=c.prototype)&&a!==n.prototype&&o(t,a),t}},7883:function(t,e,n){"use strict";n("edf2")},"99f3":function(t,e,n){"use strict";n("bf8c")},a15b:function(t,e,n){"use strict";var r=n("23e7"),o=n("44ad"),c=n("fc6a"),a=n("a640"),i=[].join,u=o!=Object,l=a("join",",");r({target:"Array",proto:!0,forced:u||!l},{join:function(t){return i.call(c(this),void 0===t?",":t)}})},a1df:function(t,e,n){"use strict";n.r(e);n("b0c0");var r=n("7a23"),o=Object(r["O"])("data-v-b282a200");Object(r["u"])("data-v-b282a200");var c={key:0,class:"section col-2 small grid"},a={class:"col-2"},i={class:"col"},u={class:"col"},l={class:"row"},d=Object(r["g"])("p",{class:"icon"},"topic",-1),s={class:"col flex"},f={key:0,class:"row"},b=Object(r["g"])("p",{class:"icon"},"short_text",-1),v=Object(r["g"])("hr",null,null,-1),p=Object(r["g"])("p",{class:"text-faded text-caption"}," The source corpus is loading from what is saved on Phrasebook Corpus editor page. ",-1),O=Object(r["f"])(" You can add notes, for example, to explain certain grammatical rules. ");Object(r["s"])();var j=o((function(t,e,n,j,h,y){var m,g=Object(r["A"])("btn"),x=Object(r["A"])("VContext"),k=Object(r["A"])("Block"),E=Object(r["A"])("BlocksOrderEditor"),w=Object(r["A"])("NotesEditor"),V=Object(r["A"])("ContextTranslationEditor"),C=Object(r["A"])("BlockEditor");return t.file&&t.corpus?(Object(r["r"])(),Object(r["d"])("div",c,[Object(r["g"])("div",a,[Object(r["g"])("div",i,[Object(r["g"])("div",u,[Object(r["g"])("div",l,[d,Object(r["g"])("h2",s,[Object(r["M"])(Object(r["g"])("select",{"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.section=e})},[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t.corpus,(function(t){return Object(r["r"])(),Object(r["d"])("option",{key:t.name,value:t},Object(r["C"])(t.name),9,["value"])})),128))],512),[[r["G"],t.section]])])]),t.section?(Object(r["r"])(),Object(r["d"])("div",f,[b,Object(r["M"])(Object(r["g"])("select",{"onUpdate:modelValue":e[2]||(e[2]=function(e){return t.phrase=e})},[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t.section.phrases,(function(t){return Object(r["r"])(),Object(r["d"])("option",{key:t.id,value:t},Object(r["C"])(t.name),9,["value"])})),128))],512),[[r["G"],t.phrase]]),Object(r["g"])(g,{icon:"fingerprint",onClick:t.copyId},null,8,["onClick"])])):Object(r["e"])("",!0)]),v,p,Object(r["g"])(x),t.phrase?(Object(r["r"])(),Object(r["d"])("div",{key:t.phrase.id,class:"row wrap flex"},[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(t.phrase.blocks,(function(t,e){return Object(r["r"])(),Object(r["d"])(k,{key:e,block:t},null,8,["block"])})),128))])):Object(r["e"])("",!0)]),t.translation?(Object(r["r"])(),Object(r["d"])(r["a"],{key:0},[Object(r["g"])(E,{key:null===(m=t.phrase)||void 0===m?void 0:m.id,modelValue:t.block,"onUpdate:modelValue":e[3]||(e[3]=function(e){return t.block=e}),phrase:t.translation,"onUpdate:phrase":e[4]||(e[4]=function(e){return t.translation=e})},null,8,["modelValue","phrase"]),Object(r["g"])(w,{modelValue:t.translation.notes,"onUpdate:modelValue":e[5]||(e[5]=function(e){return t.translation.notes=e})},{default:o((function(){return[O]})),_:1},8,["modelValue"]),Object(r["g"])(V,{modelValue:t.translation.context,"onUpdate:modelValue":e[6]||(e[6]=function(e){return t.translation.context=e})},null,8,["modelValue"])],64)):Object(r["e"])("",!0)]),t.block?(Object(r["r"])(),Object(r["d"])(C,{key:0,modelValue:t.block,"onUpdate:modelValue":e[7]||(e[7]=function(e){return t.block=e})},null,8,["modelValue"])):Object(r["e"])("",!0)])):Object(r["e"])("",!0)})),h=n("3835"),y=n("0e32"),m=n("5794"),g=n("72e9"),x=n("428a"),k=n("9362"),E=Object(r["O"])("data-v-02de8f76");Object(r["u"])("data-v-02de8f76");var w=Object(r["f"])(" Translate the context tags to show localized hints when needed. "),V={class:"text-caption"},C={class:"row wrap"};Object(r["s"])();var A=E((function(t,e,n,o,c,a){var i=Object(r["A"])("ConfirmButton"),u=Object(r["A"])("btn"),l=Object(r["A"])("EditorCard");return Object(r["r"])(),Object(r["d"])(l,{icon:"list_alt",header:"context translation"},{header:E((function(){return[t.translation?(Object(r["r"])(),Object(r["d"])(i,{key:0,onConfirm:e[1]||(e[1]=function(e){return t.translation=void 0})})):(Object(r["r"])(),Object(r["d"])(u,{key:1,icon:"add",onClick:t.create},null,8,["onClick"]))]})),caption:E((function(){return[w]})),default:E((function(){return[t.translation?(Object(r["r"])(!0),Object(r["d"])(r["a"],{key:0},Object(r["y"])(t.context,(function(e,n){var o=e.entity,c=e.tags;return Object(r["r"])(),Object(r["d"])("div",{key:o,class:["col","colored-dot-"+n]},[Object(r["g"])("h2",V,Object(r["C"])(o),1),Object(r["g"])("div",C,[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(c,(function(e){return Object(r["M"])((Object(r["r"])(),Object(r["d"])("input",{key:e,"onUpdate:modelValue":function(n){return t.translation[o][e]=n},size:t.getSize(o,e),placeholder:e,type:"text"},null,8,["onUpdate:modelValue","size","placeholder"])),[[r["H"],t.translation[o][e]]])})),128))])],2)})),128)):Object(r["e"])("",!0)]})),_:1})})),S=(n("13d5"),n("04d4")),z=n("7694"),U=Object(r["h"])({name:"TranslationEditor",components:{ConfirmButton:S["a"],EditorCard:z["a"]},props:{modelValue:{type:Object,default:void 0}},emits:["update:modelValue"],setup:function(t,e){var n=e.emit,o=Object(r["b"])({get:function(){return t.modelValue},set:function(t){return n("update:modelValue",t)}}),c=Object(r["k"])("contextSource",{});function a(){null!==c&&void 0!==c&&c.value&&(o.value=c.value.reduce((function(t,e){var n=e.entity;return t[n]={},t}),{}))}function i(t,e){var n,r;if(o.value){var c=null!==(n=null===(r=o.value[t][e])||void 0===r?void 0:r.length)&&void 0!==n?n:0;return c>0?c:e.length}}return{translation:o,context:c,create:a,getSize:i}}});n("7883");U.render=A,U.__scopeId="data-v-02de8f76";var I=U,_=n("3a0b"),T=n("9392"),R=n("7ec3"),B=Object(r["h"])({components:{VContext:m["a"],Block:g["a"],NotesEditor:y["a"],BlocksOrderEditor:x["a"],BlockEditor:k["a"],ContextTranslationEditor:I},setup:function(){var t=Object(r["x"])([]);try{t.value=JSON.parse(localStorage["editor.phrasebookCorpus"])}catch(d){Object(_["b"])("phrasebook").then((function(e){return t.value=e}))}var e=Object(r["x"])(void 0),n=Object(r["x"])(void 0),o=Object(r["x"])({}),c=Object(r["x"])(void 0),a=Object(T["d"])({defaultFile:{},filename:"phrasebook",storage:"editor.phrasebook"}),i=Object(r["b"])((function(){var t;return null===(t=n.value)||void 0===t?void 0:t.context})),u=Object(r["x"])({});function l(){n.value&&navigator.clipboard.writeText(n.value.id)}return Object(r["t"])("contextSource",i),Object(r["t"])("context",u),Object(r["J"])(i,(function(t){return Object(R["c"])(u,t)}),{immediate:!0}),Object(r["J"])(t,(function(t){return e.value=t[t.length-1]}),{immediate:!0}),Object(r["J"])(e,(function(t){null!==t&&void 0!==t&&t.phrases&&(n.value=t.phrases[t.phrases.length-1])}),{immediate:!0}),Object(r["J"])([n,a],(function(t){var e=Object(h["a"])(t,1),n=e[0];n&&(a.value[n.id]||(a.value[n.id]={blocks:[]}),o.value=a.value[n.id])}),{immediate:!0}),Object(r["J"])(o,(function(t){var e;return c.value=null===t||void 0===t||null===(e=t.blocks)||void 0===e?void 0:e[t.blocks.length-1]}),{immediate:!0}),{file:a,corpus:t,section:e,phrase:n,translation:o,block:c,copyId:l}}});n("99f3");B.render=j,B.__scopeId="data-v-b282a200";e["default"]=B},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},ab13:function(t,e,n){var r=n("b622"),o=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[o]=!1,"/./"[t](e)}catch(r){}}return!1}},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},bf8c:function(t,e,n){},caad:function(t,e,n){"use strict";var r=n("23e7"),o=n("4d64").includes,c=n("44d2"),a=n("ae40"),i=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!i},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),c("includes")},d58f:function(t,e,n){var r=n("1c0b"),o=n("7b0b"),c=n("44ad"),a=n("50c4"),i=function(t){return function(e,n,i,u){r(n);var l=o(e),d=c(l),s=a(l.length),f=t?s-1:0,b=t?-1:1;if(i<2)while(1){if(f in d){u=d[f],f+=b;break}if(f+=b,t?f<0:s<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:s>f;f+=b)f in d&&(u=n(u,d[f],f,l));return u}};t.exports={left:i(!1),right:i(!0)}},d81d:function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").map,c=n("1dde"),a=n("ae40"),i=c("map"),u=a("map");r({target:"Array",proto:!0,forced:!i||!u},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},edf2:function(t,e,n){},f183:function(t,e,n){var r=n("d012"),o=n("861d"),c=n("5135"),a=n("9bf2").f,i=n("90e3"),u=n("bb2f"),l=i("meta"),d=0,s=Object.isExtensible||function(){return!0},f=function(t){a(t,l,{value:{objectID:"O"+ ++d,weakData:{}}})},b=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!c(t,l)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[l].objectID},v=function(t,e){if(!c(t,l)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[l].weakData},p=function(t){return u&&O.REQUIRED&&s(t)&&!c(t,l)&&f(t),t},O=t.exports={REQUIRED:!1,fastKey:b,getWeakData:v,onFreeze:p};r[l]=!0}}]);
//# sourceMappingURL=chunk-ba777cf8.50673845.js.map