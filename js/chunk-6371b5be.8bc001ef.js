(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6371b5be"],{"20f9":function(e,t,n){},"72e3":function(e,t,n){"use strict";n("9c6e")},"9c6e":function(e,t,n){},a124:function(e,t,n){"use strict";n("ee8d")},bcad:function(e,t,n){},c79d:function(e,t,n){"use strict";n("bcad")},ccca:function(e,t,n){"use strict";n("20f9")},e701:function(e,t,n){"use strict";n.r(t);n("b0c0");var o=n("7a23"),c=Object(o["N"])("data-v-da97f2d4");Object(o["w"])("data-v-da97f2d4");var r={key:0,class:"section col-2 small grid"},a={class:"col-2"},u={class:"col scroll"},l={class:"col scroll"};Object(o["u"])();var i=c((function(e,t,n,i,d,s){var b=Object(o["B"])("ArrayControl"),p=Object(o["B"])("btn"),f=Object(o["B"])("EditorCard"),j=Object(o["B"])("BlocksOrderEditor"),O=Object(o["B"])("ContextEditor"),v=Object(o["B"])("BlockEditor");return e.file?(Object(o["t"])(),Object(o["d"])("div",r,[Object(o["h"])("div",a,[Object(o["h"])(f,{icon:"topic",header:"sections"},{header:c((function(){return[Object(o["h"])(b,{modelValue:e.file,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.file=t}),item:e.section,"onUpdate:item":t[2]||(t[2]=function(t){return e.section=t}),add:function(){return{id:e.uuidv4()}},shift:"",remove:""},null,8,["modelValue","item","add"])]})),default:c((function(){return[Object(o["h"])("div",u,[(Object(o["t"])(!0),Object(o["d"])(o["a"],null,Object(o["z"])(e.file,(function(t,n){return Object(o["t"])(),Object(o["d"])("div",{key:t.id,class:"row"},[Object(o["h"])(p,{icon:"edit","is-on":e.section===t,onClick:function(n){return e.section=t}},null,8,["is-on","onClick"]),Object(o["M"])(Object(o["h"])("input",{"onUpdate:modelValue":function(e){return t.name=e},class:"flex",type:"text",placeholder:"section #"+n},null,8,["onUpdate:modelValue","placeholder"]),[[o["H"],t.name]])])})),128))])]})),_:1}),e.section?(Object(o["t"])(),Object(o["d"])(f,{key:0,icon:"short_text",header:"phrases"},{header:c((function(){return[Object(o["h"])(b,{modelValue:e.section.phrases,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.section.phrases=t}),item:e.phrase,"onUpdate:item":t[4]||(t[4]=function(t){return e.phrase=t}),add:function(){return{id:e.uuidv4()}},shift:"",remove:""},null,8,["modelValue","item","add"])]})),default:c((function(){return[Object(o["h"])("div",l,[(Object(o["t"])(!0),Object(o["d"])(o["a"],null,Object(o["z"])(e.section.phrases,(function(t,n){return Object(o["t"])(),Object(o["d"])("div",{key:t.id,class:"row"},[Object(o["h"])(p,{icon:"edit","is-on":e.phrase===t,onClick:function(n){return e.phrase=t}},null,8,["is-on","onClick"]),Object(o["M"])(Object(o["h"])("input",{"onUpdate:modelValue":function(e){return t.name=e},class:"flex",type:"text",placeholder:"phrase #"+n},null,8,["onUpdate:modelValue","placeholder"]),[[o["H"],t.name]])])})),128))])]})),_:1})):Object(o["e"])("",!0),e.phrase?(Object(o["t"])(),Object(o["d"])(o["a"],{key:1},[Object(o["h"])(j,{key:e.phrase.id,modelValue:e.block,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.block=t}),phrase:e.phrase,"onUpdate:phrase":t[6]||(t[6]=function(t){return e.phrase=t})},null,8,["modelValue","phrase"]),Object(o["h"])(O,{modelValue:e.phrase.context,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.phrase.context=t})},null,8,["modelValue"])],64)):Object(o["e"])("",!0)]),e.block?(Object(o["t"])(),Object(o["d"])(v,{key:0,modelValue:e.block,"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.block=t})},null,8,["modelValue"])):Object(o["e"])("",!0)])):Object(o["e"])("",!0)})),d=n("b5cc"),s=n("7694"),b=n("428a"),p=(n("a434"),Object(o["N"])("data-v-0c9a5b4a"));Object(o["w"])("data-v-0c9a5b4a");var f={class:"col scroll"};Object(o["u"])();var j=p((function(e,t,n,c,r,a){var u=Object(o["B"])("ArrayControl"),l=Object(o["B"])("btn"),i=Object(o["B"])("EditorCard");return Object(o["t"])(),Object(o["d"])(i,{icon:"list_alt",header:"context"},{header:p((function(){return[Object(o["h"])(u,{modelValue:e.context,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.context=t}),add:{entity:"entity",tags:[]}},null,8,["modelValue"])]})),default:p((function(){return[Object(o["h"])("div",f,[(Object(o["t"])(!0),Object(o["d"])(o["a"],null,Object(o["z"])(e.context,(function(t,n){return Object(o["t"])(),Object(o["d"])("div",{key:n,class:"row"},[Object(o["M"])(Object(o["h"])("input",{"onUpdate:modelValue":function(e){return t.entity=e},class:["entity","colored-"+n],type:"text",placeholder:"entity #"+n},null,10,["onUpdate:modelValue","placeholder"]),[[o["H"],t.entity]]),Object(o["M"])(Object(o["h"])("input",{"onUpdate:modelValue":function(t){return e.tags[n]=t},class:"flex",type:"text",placeholder:"tags",onChange:function(t){return e.update(n)}},null,40,["onUpdate:modelValue","onChange"]),[[o["H"],e.tags[n]]]),Object(o["h"])(l,{icon:"clear",onClick:function(t){return e.context.splice(n,1)}},null,8,["onClick"])])})),128))])]})),_:1})})),O=(n("4de4"),n("a15b"),n("d81d"),n("ac1f"),n("1276"),Object(o["i"])({name:"ContextEditor",components:{EditorCard:s["a"],ArrayControl:d["a"]},props:{modelValue:{type:Array,default:void 0}},emits:["update:modelValue"],setup:function(e,t){var n=t.emit,c=Object(o["b"])({get:function(){return e.modelValue},set:function(e){return n("update:modelValue",e)}}),r=Object(o["y"])([]);function a(e){var t,n;c.value[e].tags=null!==(t=null===(n=r.value[e])||void 0===n?void 0:n.split(" ").filter((function(e){return e})))&&void 0!==t?t:[]}return Object(o["J"])(c,(function(e){var t;return r.value=null!==(t=null===e||void 0===e?void 0:e.map((function(e){var t,n=e.tags;return null!==(t=null===n||void 0===n?void 0:n.join(" "))&&void 0!==t?t:""})))&&void 0!==t?t:[]}),{immediate:!0,deep:!0}),{context:c,tags:r,update:a}}}));n("a124");O.render=j,O.__scopeId="data-v-0c9a5b4a";var v,m=O,h=n("9362"),y=new Uint8Array(16);function V(){if(!v&&(v="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),!v))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(y)}var k=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function g(e){return"string"===typeof e&&k.test(e)}for(var C=g,x=[],U=0;U<256;++U)x.push((U+256).toString(16).substr(1));function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(x[e[t+0]]+x[e[t+1]]+x[e[t+2]]+x[e[t+3]]+"-"+x[e[t+4]]+x[e[t+5]]+"-"+x[e[t+6]]+x[e[t+7]]+"-"+x[e[t+8]]+x[e[t+9]]+"-"+x[e[t+10]]+x[e[t+11]]+x[e[t+12]]+x[e[t+13]]+x[e[t+14]]+x[e[t+15]]).toLowerCase();if(!C(n))throw TypeError("Stringified UUID is invalid");return n}var B=w;function E(e,t,n){e=e||{};var o=e.random||(e.rng||V)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){n=n||0;for(var c=0;c<16;++c)t[n+c]=o[c];return t}return B(o)}var _=E,A=n("9392"),J=n("7ec3"),R=Object(o["i"])({components:{ArrayControl:d["a"],EditorCard:s["a"],BlocksOrderEditor:b["a"],ContextEditor:m,BlockEditor:h["a"]},setup:function(){var e=Object(A["d"])({defaultFile:[],filename:function(){return window.confirm("You're resetting phrasebook corpus.")?"phrasebook":""},storage:"editor.phrasebookCorpus"}),t=Object(o["y"])(),n=Object(o["y"])(),c=Object(o["y"])();Object(o["J"])(e,(function(e){null!==e&&void 0!==e&&e.length||(t.value=void 0,n.value=void 0,c.value=void 0)}));var r=Object(o["b"])((function(){var e;return null===(e=n.value)||void 0===e?void 0:e.context})),a=Object(o["y"])({});return Object(o["v"])("contextSource",r),Object(o["v"])("context",a),Object(o["J"])(r,(function(e){return Object(J["c"])(a,e)}),{immediate:!0,deep:!0}),{file:e,section:t,phrase:n,block:c,uuidv4:_}}});n("ccca"),n("72e3"),n("c79d");R.render=i,R.__scopeId="data-v-da97f2d4";t["default"]=R},ee8d:function(e,t,n){}}]);
//# sourceMappingURL=chunk-6371b5be.8bc001ef.js.map