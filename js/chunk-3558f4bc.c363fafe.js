(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3558f4bc"],{"0d77":function(e,t,c){},"0ee1":function(e,t,c){"use strict";c("ab35")},"13d5":function(e,t,c){"use strict";var n=c("23e7"),r=c("d58f").left,a=c("a640"),l=c("2d00"),s=c("605d"),u=a("reduce"),i=!s&&l>79&&l<83;n({target:"Array",proto:!0,forced:!u||i},{reduce:function(e){return r(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"21ae":function(e,t,c){"use strict";c("d0db")},"4ec9":function(e,t,c){"use strict";var n=c("6d61"),r=c("6566");e.exports=n("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),r)},"57f2":function(e,t,c){"use strict";c("6fca")},"6fca":function(e,t,c){},"7c8c":function(e,t,c){"use strict";c("84cb")},"84cb":function(e,t,c){},9242:function(e,t,c){},ab35:function(e,t,c){},c178:function(e,t,c){"use strict";c("0d77")},d0db:function(e,t,c){},d58f:function(e,t,c){var n=c("1c0b"),r=c("7b0b"),a=c("44ad"),l=c("50c4"),s=function(e){return function(t,c,s,u){n(c);var i=r(t),o=a(i),b=l(i.length),j=e?b-1:0,O=e?-1:1;if(s<2)while(1){if(j in o){u=o[j],j+=O;break}if(j+=O,e?j<0:b<=j)throw TypeError("Reduce of empty array with no initial value")}for(;e?j>=0:b>j;j+=O)j in o&&(u=c(u,o[j],j,i));return u}};e.exports={left:s(!1),right:s(!0)}},ec5e:function(e,t,c){"use strict";c("9242")},f5be:function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),r=Object(n["K"])("data-v-15e3cbdb");Object(n["u"])("data-v-15e3cbdb");var a={class:"section row"},l={class:"scroll-area col"},s={class:"row-1 lects"},u={key:1,class:"lect"};Object(n["s"])();var i=r((function(e,t,c,i,o,b){var j=Object(n["z"])("toggle"),O=Object(n["z"])("btn"),d=Object(n["z"])("Seeker"),f=Object(n["z"])("Flag"),p=Object(n["z"])("MeaningRow");return e.dictionaries?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])("div",a,[Object(n["g"])(j,{modelValue:e.scholar,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.scholar=t}),icon:"school"},null,8,["modelValue"]),Object(n["g"])(j,{modelValue:e.list,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.list=t}),icon:"format_list_bulleted"},null,8,["modelValue"]),e.list&&!e.lect?Object(n["J"])((Object(n["r"])(),Object(n["d"])("select",{key:0,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.queries[""]=t})},[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.lists,(function(e){return Object(n["r"])(),Object(n["d"])("option",{key:e.name,value:e.query,textContent:Object(n["B"])(e.name)},null,8,["value","textContent"])})),128))],512)),[[n["E"],e.queries[""]]]):(Object(n["r"])(),Object(n["d"])(n["a"],{key:1},[Object(n["J"])(Object(n["g"])("input",{"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.query=t}),type:"text",placeholder:e.lect?"Enter ".concat(e.lect," form..."):"Enter meaning..."},null,8,["placeholder"]),[[n["F"],e.query]]),Object(n["g"])(O,{icon:"clear",onClick:t[5]||(t[5]=function(t){return e.query=""})})],64))]),Object(n["g"])("div",l,[Object(n["g"])("div",s,[e.lects.length>1?(Object(n["r"])(),Object(n["d"])(O,{key:0,class:"lect card-0 seeker","is-on":!e.lect,icon:e.lect?"":"search",text:e.lists?"Lists":"Meanings",onClick:t[6]||(t[6]=function(t){return e.lect=""})},{default:r((function(){return[Object(n["g"])(d,{seek:e.progress[""]},null,8,["seek"])]})),_:1},8,["is-on","icon","text"])):(Object(n["r"])(),Object(n["d"])("p",u,"Meanings")),1===e.lects.length?(Object(n["r"])(),Object(n["d"])(O,{key:2,class:"row lect flag card-0",icon:"search","is-on":""},{default:r((function(){return[Object(n["g"])(d,{seek:e.progress[""]},null,8,["seek"]),Object(n["g"])(f,{lect:e.lects[0],class:"blur"},null,8,["lect"]),Object(n["g"])("h2",{class:"flex",textContent:Object(n["B"])(e.lects[0])},null,8,["textContent"])]})),_:1})):(Object(n["r"])(!0),Object(n["d"])(n["a"],{key:3},Object(n["x"])(e.lects,(function(t){return Object(n["r"])(),Object(n["d"])(O,{key:t,icon:e.lect===t?"search":"",class:"row lect flag card-0","is-on":e.lect===t,onClick:function(c){return e.lect=t}},{default:r((function(){return[Object(n["g"])(d,{seek:e.progress[t]},null,8,["seek"]),Object(n["g"])(f,{lect:t,class:"blur"},null,8,["lect"]),Object(n["g"])("h2",{class:"flex",textContent:Object(n["B"])(t)},null,8,["textContent"])]})),_:2},1032,["icon","is-on","onClick"])})),128))]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.results,(function(t,c){return Object(n["r"])(),Object(n["d"])(p,{key:c,lects:e.lects,scholar:e.scholar,meaning:c,entries:t},null,8,["lects","scholar","meaning","entries"])})),128))])],64)):Object(n["e"])("",!0)})),o=(c("b64b"),c("4ec9"),c("d3b7"),c("3ca3"),c("ddb0"),c("ac1f"),c("841c"),c("9041")),b=Object(n["K"])("data-v-1f2abc98");Object(n["u"])("data-v-1f2abc98");var j={class:"row-1 lects small"},O={class:"meaning lect col"},d={class:"text-faded"},f={key:1};Object(n["s"])();var p=b((function(e,t,c,r,a,l){var s=Object(n["z"])("EntryCard");return Object(n["r"])(),Object(n["d"])("div",j,[Object(n["g"])("div",O,[Object(n["g"])("i",d,Object(n["B"])(e.meaning),1)]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.lects,(function(t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col lect"},[e.sortedEntries[t]?(Object(n["r"])(!0),Object(n["d"])(n["a"],{key:0},Object(n["x"])(e.sortedEntries[t],(function(c){return Object(n["r"])(),Object(n["d"])(s,{key:c.forms[0].plain,lect:t,entry:c,meaning:e.meaning,scholar:e.scholar},null,8,["lect","entry","meaning","scholar"])})),128)):(Object(n["r"])(),Object(n["d"])("span",f))])})),128))])})),g=c("3835"),v=(c("7db0"),c("13d5"),c("4fad"),c("a15b"),Object(n["K"])("data-v-4862aed7"));Object(n["u"])("data-v-4862aed7");var y={key:0,class:"col"},h={key:1},k={class:"row"},x={key:0,class:"text-tags"},m={class:"col-0 card-1"},w={key:0,class:"text-faded"},B={class:"text-ipa"},_=Object(n["g"])("hr",null,null,-1);Object(n["s"])();var E=v((function(e,t,c,r,a,l){var s,u=Object(n["z"])("Flag"),i=Object(n["z"])("btn"),o=Object(n["z"])("EntryUse"),b=Object(n["z"])("Notes");return e.entry?(Object(n["r"])(),Object(n["d"])("div",y,[Object(n["g"])(i,{class:{"card-0 flag":e.expanded,faded:e.faded&&!e.expanded},onClick:t[1]||(t[1]=function(t){return e.expanded=e.expanded?0:1})},{default:v((function(){return[e.expanded?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])("h2",null,Object(n["B"])(e.plain),1),Object(n["g"])(u,{lect:e.lect,class:"blur"},null,8,["lect"])],64)):(Object(n["r"])(),Object(n["d"])("span",h,Object(n["B"])(e.plain),1))]})),_:1},8,["class"]),e.expanded?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])("div",k,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.views,(function(t,c){var r=Object(g["a"])(t,2),a=r[0],l=r[1];return Object(n["r"])(),Object(n["d"])(i,{key:l,class:["flex",{highlight:e.expanded===c+1}],icon:l,text:a,onClick:function(t){return e.expanded=c+1}},null,8,["icon","text","class","onClick"])})),128))]),1===e.expanded?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])(o,{scholar:e.scholar,use:e.targetUse},null,8,["scholar","use"]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.otherUses,(function(t){return Object(n["r"])(),Object(n["d"])(o,{key:t.meaning,scholar:e.scholar,use:t},null,8,["scholar","use"])})),128))],64)):2===e.expanded?(Object(n["r"])(),Object(n["d"])(n["a"],{key:1},[e.scholar&&e.entry.tags?(Object(n["r"])(),Object(n["d"])("p",x,Object(n["B"])(null===(s=e.entry.tags)||void 0===s?void 0:s.join(" ")),1)):Object(n["e"])("",!0),Object(n["g"])(b,{notes:e.entry.notes},null,8,["notes"]),Object(n["g"])("div",m,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.entry.forms,(function(t,c){return Object(n["r"])(),Object(n["d"])("p",{key:c},[Object(n["f"])(Object(n["B"])(t.plain)+" ",1),e.scholar?(Object(n["r"])(),Object(n["d"])("span",w,[Object(n["g"])("span",B,Object(n["B"])(t.ipa),1),Object(n["f"])(" "+Object(n["B"])(t.glossed),1)])):Object(n["e"])("",!0)])})),128))])],64)):Object(n["e"])("",!0),_],64)):Object(n["e"])("",!0)])):Object(n["e"])("",!0)})),C=(c("4de4"),c("f929")),U={key:0,class:"col"},z={key:0},q={key:1,class:"highlight-font"},V={key:2},M={key:3},S={key:4,class:"text-ipa"};function F(e,t,c,r,a,l){return e.notes.length?(Object(n["r"])(),Object(n["d"])("div",U,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.pieces,(function(e,t){return Object(n["r"])(),Object(n["d"])("p",{key:t},[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e,(function(e,t){var c=e.text,r=e.display;return Object(n["r"])(),Object(n["d"])(n["a"],{key:t},["plain"===r?(Object(n["r"])(),Object(n["d"])("span",z,Object(n["B"])(c),1)):"highlight"===r?(Object(n["r"])(),Object(n["d"])("span",q,Object(n["B"])(c),1)):"bold"===r?(Object(n["r"])(),Object(n["d"])("b",V,Object(n["B"])(c),1)):"italic"===r?(Object(n["r"])(),Object(n["d"])("i",M,Object(n["B"])(c),1)):(Object(n["r"])(),Object(n["d"])("span",S,Object(n["B"])(c),1))],64)})),128))])})),128))])):Object(n["e"])("",!0)}c("2ca0"),c("8a79"),c("fb6a"),c("d81d"),c("1276");var I=Object(n["h"])({name:"Notes",props:{notes:{type:Array,default:function(){return[]}}},emits:["texts"],setup:function(e,t){var c=t.emit;function r(e){for(var t=[["^","highlight"],["/","phoneme"],["*","bold"],["_","italic"]],c=0,n=t;c<n.length;c++){var r=Object(g["a"])(n[c],2),a=r[0],l=r[1];if(e.startsWith(a)&&e.endsWith(a))return{text:e.slice(1,-1),display:l}}return{text:e,display:"plain"}}var a=Object(n["b"])((function(){var t=/(\/[^/]+\/|\^[^^]+\^|\*[^*]+\*|_[^_]+_)/g;return e.notes.map((function(e){return e.split(t).filter((function(e){return e})).map((function(e){return r(e)}))})).filter((function(e){return e.length}))}));return Object(n["H"])((function(){return c("texts",a.value.map((function(e){return e.map((function(e){var t=e.text;return t})).join("")})))})),{pieces:a}}});I.render=F;var N=I,J={class:"col"},K={style:{"user-select":"auto",display:"inline"}},R=Object(n["g"])("span",null," ",-1),A={key:0,class:"text-tags"},G={class:"col-0 text-faded"},W={key:0,class:"col-0"},H={class:"text-ipa"};function L(e,t,c,r,a,l){var s,u=Object(n["z"])("Notes");return Object(n["r"])(),Object(n["d"])("div",J,[Object(n["g"])("div",null,[Object(n["g"])("h2",K,Object(n["B"])(e.use.meaning),1),R,e.scholar?(Object(n["r"])(),Object(n["d"])("span",A,Object(n["B"])(null===(s=e.use.tags)||void 0===s?void 0:s.join(" ")),1)):Object(n["e"])("",!0)]),Object(n["g"])(u,{notes:e.use.notes},null,8,["notes"]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(e.use.samples,(function(t,c){return Object(n["r"])(),Object(n["d"])("div",{key:c,class:"col-0 card-1"},[Object(n["f"])(Object(n["B"])(t.plain)+" ",1),Object(n["g"])("span",G,[Object(n["f"])(Object(n["B"])(t.translation)+" ",1),e.scholar?(Object(n["r"])(),Object(n["d"])("span",W,[Object(n["g"])("span",H,Object(n["B"])(t.ipa),1),Object(n["f"])(" "+Object(n["B"])(t.glossed),1)])):Object(n["e"])("",!0)])])})),128))])}var T=Object(n["h"])({name:"EntryUse",components:{Notes:N},props:{scholar:Boolean,use:{type:Object,default:void 0}}});T.render=L;var D=T,P=Object(n["h"])({name:"EntryCard",components:{Notes:N,Flag:C["a"],EntryUse:D},props:{lect:{type:String,default:""},meaning:{type:String,default:""},entry:{type:Object,default:void 0},scholar:Boolean},setup:function(e){var t=Object(n["w"])(0),c=[["Uses","textsms"],["Info","info"]],r=Object(n["k"])("expandedEntries"),a=Object(n["k"])("setExpansion"),l=Object(n["b"])((function(){return null===r||void 0===r?void 0:r.has(e.entry)}));Object(n["G"])((function(){return!!t.value}),(function(t){return null===a||void 0===a?void 0:a(e.entry,t)}));var s=Object(n["b"])((function(){var t;return null===(t=e.entry)||void 0===t?void 0:t.forms[0].plain})),u=Object(n["b"])((function(){return e.entry.uses.find((function(t){return t.meaning===e.meaning}))})),i=Object(n["b"])((function(){return e.entry.uses.filter((function(t){return t.meaning!==e.meaning}))}));return{views:c,expanded:t,faded:l,plain:s,otherUses:i,targetUse:u}}});c("0ee1");P.render=E,P.__scopeId="data-v-4862aed7";var Q=P,X=Object(n["h"])({name:"MeaningRow",components:{EntryCard:Q},props:{meaning:{type:String,default:""},lects:{type:Array,default:function(){return[]}},scholar:Boolean,entries:{type:Object,default:function(){return{}}}},setup:function(e){function t(t){var c,n,r;return null!==(c=null===(n=t.uses.find((function(t){return t.meaning===e.meaning})))||void 0===n||null===(r=n.notes)||void 0===r?void 0:r.length)&&void 0!==c?c:0}var c=Object(n["b"])((function(){return Object.entries(e.entries).reduce((function(e,c){var n=Object(g["a"])(c,2),r=n[0],a=n[1];return e[r]=a.sort((function(e,c){return t(e)-t(c)})),e}),{})}));return{sortedEntries:c}}});c("ec5e");X.render=p,X.__scopeId="data-v-1f2abc98";var Y=X,Z=c("9458"),$=c("3337"),ee=Object(n["h"])({components:{MeaningRow:Y,Flag:C["a"],Seeker:Z["a"]},setup:function(){var e=new $["a"](o["a"]),t=Object(n["v"])({}),c=Object(n["b"])({get:function(){var e;return null!==(e=t[r.value])&&void 0!==e?e:""},set:function(e){return t[r.value]=e}}),r=Object(n["w"])(""),a=Object(n["b"])((function(){return Object.keys(o["a"].value)})),l=Object(n["w"])(!1),s=Object(n["w"])(!1),u=Object(n["b"])((function(){return o["b"].value.lists}));Object(n["G"])(s,(function(){return t[""]=s.value?u.value[0].query:""}));var i=Object(n["v"])(new Map),b=function(e,t){var c,n;i.set(e,(null!==(c=i.get(e))&&void 0!==c?c:0)+(t?1:-1)),(null!==(n=i.get(e))&&void 0!==n?n:0)<=0&&i.delete(e)};return Object(n["t"])("expandedEntries",i),Object(n["t"])("setExpansion",b),Object(n["q"])((function(){return i.clear()})),Object(n["G"])([c,r],(function(){return e.search(r.value,c.value)})),{scholar:l,queries:t,query:c,lect:r,lects:a,list:s,lists:u,results:e.results,executing:e.executing,progress:e.progress,dictionaries:o["a"]}}});c("7c8c"),c("57f2");ee.render=i,ee.__scopeId="data-v-15e3cbdb";t["default"]=ee},f929:function(e,t,c){"use strict";var n=c("7a23"),r=Object(n["K"])("data-v-54304c3e"),a=r((function(e,t,c,r,a,l){return e.lect?(Object(n["r"])(),Object(n["d"])("img",{key:0,src:e.src,class:"no-select"},null,8,["src"])):Object(n["e"])("",!0)})),l=c("3a0b"),s=Object(n["h"])({props:{lect:{type:String,default:""}},setup:function(e){var t=Object(n["b"])((function(){return l["f"]+e.lect+"/flag.png"}));return{src:t}}});c("21ae"),c("c178");s.render=a,s.__scopeId="data-v-54304c3e";t["a"]=s}}]);