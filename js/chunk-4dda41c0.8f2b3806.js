(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dda41c0"],{"21ae":function(e,t,c){"use strict";c("6fc0")},"340d":function(e,t,c){"use strict";c("a3c3")},"5e03":function(e,t,c){},"6fc0":function(e,t,c){},a3c3:function(e,t,c){},a8d4:function(e,t,c){},c178:function(e,t,c){"use strict";c("a8d4")},e55b:function(e,t,c){"use strict";c("5e03")},f5be:function(e,t,c){"use strict";c.r(t);var n=c("7a23"),a=Object(n["N"])("data-v-27d41d5a");Object(n["u"])("data-v-27d41d5a");var r={class:"section col small"},l={class:"row-1 lects fill"},b={class:"col lect"},u=Object(n["g"])("option",{value:"translation"},"Translation",-1),o=Object(n["g"])("option",{value:"tag"},"Tag",-1),j={class:"flex"},O={class:"col lect"},i=Object(n["g"])("hr",null,null,-1),s={class:"text-faded translation"},d=Object(n["g"])("hr",null,null,-1);Object(n["s"])();var f=a((function(e,t,c,a,f,p){var y=Object(n["A"])("btn"),v=Object(n["A"])("Flag"),x=Object(n["A"])("EntryCard");return Object(n["r"])(),Object(n["d"])("div",r,[Object(n["g"])("div",l,[Object(n["g"])("div",b,[Object(n["M"])(Object(n["g"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.queryMode=t})},[u,o],512),[[n["G"],e.queryMode]]),e.lect?(Object(n["r"])(),Object(n["d"])(y,{key:1,icon:"search",text:"Search in English...",onClick:t[3]||(t[3]=function(t){return e.lect=""})})):Object(n["M"])((Object(n["r"])(),Object(n["d"])("input",{key:0,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.query=t}),type:"text"},null,512)),[[n["H"],e.query]])]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.lects,(function(c){return Object(n["r"])(),Object(n["d"])("div",{key:c,class:"col card lect flag"},[Object(n["g"])(v,{lect:c,class:"blur"},null,8,["lect"]),Object(n["g"])("h2",j,Object(n["C"])(c),1),e.lect===c?Object(n["M"])((Object(n["r"])(),Object(n["d"])("input",{key:0,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.query=t}),type:"text"},null,512)),[[n["H"],e.query]]):(Object(n["r"])(),Object(n["d"])(y,{key:1,icon:"search",text:"Search by ".concat(c," form..."),onClick:function(t){return e.lect=c}},null,8,["text","onClick"]))])})),128))]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.searchResult,(function(t,c){return Object(n["r"])(),Object(n["d"])("div",{key:c,class:"row-1 lects"},[Object(n["g"])("div",O,[i,Object(n["g"])("i",s,Object(n["C"])(c),1)]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.lects,(function(e){return Object(n["r"])(),Object(n["d"])("div",{key:e,class:"col lect"},[d,(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(t[e],(function(e,t){return Object(n["r"])(),Object(n["d"])(x,{key:t,entry:e},null,8,["entry"])})),128))])})),128))])})),128))])})),p=(c("b64b"),c("9041")),y=Object(n["N"])("data-v-0426b1a4");Object(n["u"])("data-v-0426b1a4");var v={key:0,class:"col"},x={class:"row"},g={key:0,class:"col card"},k={key:0},C={class:"text-faded text-caption"},h={class:"text-faded text-caption"};Object(n["s"])();var m=y((function(e,t,c,a,r,l){var b=Object(n["A"])("btn");return e.entry?(Object(n["r"])(),Object(n["d"])("div",v,[Object(n["g"])("div",x,[Object(n["g"])(b,{class:"flex","is-on":e.expand>0,text:e.plain,onClick:t[1]||(t[1]=function(t){return e.expand=e.expand?0:1})},null,8,["is-on","text"]),e.expand?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])(b,{icon:"info","is-on":1===e.expand,onClick:t[2]||(t[2]=function(t){return e.expand=1})},null,8,["is-on"]),Object(n["g"])(b,{icon:"format_list_bulleted","is-on":2===e.expand,onClick:t[3]||(t[3]=function(t){return e.expand=2})},null,8,["is-on"]),Object(n["g"])(b,{icon:"speaker_notes","is-on":3===e.expand,onClick:t[4]||(t[4]=function(t){return e.expand=3})},null,8,["is-on"])],64)):Object(n["e"])("",!0)]),e.expand?(Object(n["r"])(),Object(n["d"])("div",g,[1===e.expand&&e.entry.explanation?(Object(n["r"])(),Object(n["d"])("p",k,Object(n["C"])(e.entry.explanation),1)):2===e.expand?(Object(n["r"])(!0),Object(n["d"])(n["a"],{key:1},Object(n["y"])(e.entry.forms,(function(e,t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col-0"},[Object(n["f"])(Object(n["C"])(e.text.plain)+Object(n["C"])(e.text.glossed)+" ",1),Object(n["g"])("span",C,Object(n["C"])(e.grammar),1)])})),128)):3===e.expand?(Object(n["r"])(!0),Object(n["d"])(n["a"],{key:2},Object(n["y"])(e.entry.samples,(function(e,t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col-0"},[Object(n["g"])("p",null,Object(n["C"])(e.text.plain),1),Object(n["g"])("p",h,Object(n["C"])(e.translation),1)])})),128)):Object(n["e"])("",!0)])):Object(n["e"])("",!0)])):Object(n["e"])("",!0)})),w=Object(n["h"])({name:"EntryCard",props:{entry:{type:Object,default:void 0}},setup:function(e){var t=Object(n["x"])(0),c=Object(n["b"])((function(){var t;return null===(t=e.entry)||void 0===t?void 0:t.forms[0].text.plain}));return{expand:t,plain:c}}});c("340d");w.render=m,w.__scopeId="data-v-0426b1a4";var _=w,q=c("f929"),M=Object(n["h"])({components:{EntryCard:_,Flag:q["a"]},setup:function(){var e=Object(n["v"])({}),t=Object(n["x"])("translation"),c=Object(n["x"])(""),a=Object(n["b"])((function(){return Object.keys(p["a"].value)})),r=Object(n["b"])({get:function(){return e[c.value]},set:function(t){return e[c.value]=t}}),l=Object(n["b"])((function(){return Object(p["b"])(c.value,r.value,t.value)}));return{dictionaries:p["a"],lects:a,query:r,queryMode:t,lect:c,searchResult:l}}});c("e55b");M.render=f,M.__scopeId="data-v-27d41d5a";t["default"]=M},f929:function(e,t,c){"use strict";var n=c("7a23"),a=Object(n["N"])("data-v-54304c3e"),r=a((function(e,t,c,a,r,l){return e.lect?(Object(n["r"])(),Object(n["d"])("img",{key:0,src:e.src,class:"no-select"},null,8,["src"])):Object(n["e"])("",!0)})),l=c("3a0b"),b=Object(n["h"])({props:{lect:{type:String,default:""}},setup:function(e){var t=Object(n["b"])((function(){return l["d"]+e.lect+"/flag.png"}));return{src:t}}});c("21ae"),c("c178");b.render=r,b.__scopeId="data-v-54304c3e";t["a"]=b}}]);