(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-599fa3b2"],{"13d5":function(e,t,c){"use strict";var n=c("23e7"),r=c("d58f").left,a=c("a640"),l=c("ae40"),d=c("2d00"),u=c("605d"),b=a("reduce"),o=l("reduce",{1:0}),i=!u&&d>79&&d<83;n({target:"Array",proto:!0,forced:!b||!o||i},{reduce:function(e){return r(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},3928:function(e,t,c){"use strict";c("f941")},"4de4":function(e,t,c){"use strict";var n=c("23e7"),r=c("b727").filter,a=c("1dde"),l=c("ae40"),d=a("filter"),u=l("filter");n({target:"Array",proto:!0,forced:!d||!u},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"4fad":function(e,t,c){var n=c("23e7"),r=c("6f53").entries;n({target:"Object",stat:!0},{entries:function(e){return r(e)}})},"7db0":function(e,t,c){"use strict";var n=c("23e7"),r=c("b727").find,a=c("44d2"),l=c("ae40"),d="find",u=!0,b=l(d);d in[]&&Array(1)[d]((function(){u=!1})),n({target:"Array",proto:!0,forced:u||!b},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),a(d)},d58f:function(e,t,c){var n=c("1c0b"),r=c("7b0b"),a=c("44ad"),l=c("50c4"),d=function(e){return function(t,c,d,u){n(c);var b=r(t),o=a(b),i=l(b.length),s=e?i-1:0,j=e?-1:1;if(d<2)while(1){if(s in o){u=o[s],s+=j;break}if(s+=j,e?s<0:i<=s)throw TypeError("Reduce of empty array with no initial value")}for(;e?s>=0:i>s;s+=j)s in o&&(u=c(u,o[s],s,b));return u}};e.exports={left:d(!1),right:d(!0)}},f5be:function(e,t,c){"use strict";c.r(t);c("d3b7"),c("ddb0");var n=c("7a23"),r=Object(n["N"])("data-v-e8185e1e");Object(n["u"])("data-v-e8185e1e");var a={class:"section col-2"},l={class:"row"},d=Object(n["g"])("option",{value:""},"English",-1),u={class:"row-2 lects"};Object(n["s"])();var b=r((function(e,t,c,r,b,o){var i=Object(n["A"])("EntryCard");return Object(n["r"])(),Object(n["d"])("div",a,[Object(n["g"])("div",l,[Object(n["g"])("h2",null,[Object(n["M"])(Object(n["g"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.lect=t})},[d,(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.lects,(function(e){return Object(n["r"])(),Object(n["d"])("option",{key:e,value:e},Object(n["C"])(e),9,["value"])})),128))],512),[[n["G"],e.lect]])]),Object(n["M"])(Object(n["g"])("input",{"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.query=t}),type:"text"},null,512),[[n["H"],e.query]])]),Object(n["g"])("div",u,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.entries,(function(e,t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col-2 lect"},[Object(n["g"])("h2",null,Object(n["C"])(t),1),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e,(function(e,t){return Object(n["r"])(),Object(n["d"])(i,{key:t,entry:e},null,8,["entry"])})),128))])})),128))])])})),o=(c("4de4"),c("caad"),c("13d5"),c("4fad"),c("2532"),c("3835")),i=(c("7db0"),c("a15b"),c("d81d"),c("96cf"),c("1da1")),s=c("3a0b"),j=Object(n["B"])({});Object(n["J"])(s["a"],Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return j.value={},e.next=3,Object(s["c"])("dictionary");case 3:j.value=e.sent;case 4:case"end":return e.stop()}}),e)}))));var O={class:"col small"},f={class:"header"},p={class:"col-0 card"},v={class:"row"},g={class:"text-ipa"},y={class:"text-faded text-caption"},m={class:"header"},x={key:0,class:"col-0 card"},h={class:"text-faded text-caption"};function w(e,t,c,r,a,l){var d=Object(n["A"])("toggle"),u=Object(n["A"])("temaplate");return Object(n["r"])(),Object(n["d"])("div",O,[Object(n["g"])(d,{modelValue:e.expanded.card,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.expanded.card=t}),class:"card"},{default:Object(n["L"])((function(){return[Object(n["f"])(Object(n["C"])(e.entry.forms[0].text.plain),1)]})),_:1},8,["modelValue"]),e.expanded.card?(Object(n["r"])(),Object(n["d"])(n["a"],{key:0},[Object(n["g"])("h2",f,[Object(n["g"])(d,{modelValue:e.expanded.forms,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.expanded.forms=t}),text:"Forms",class:"flex"},null,8,["modelValue"])]),Object(n["g"])("div",p,[e.expanded.forms?(Object(n["r"])(),Object(n["d"])(u,{key:0},{default:Object(n["L"])((function(){return[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.entry.forms,(function(e,t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col-0"},[Object(n["g"])("p",v,[Object(n["g"])("span",null,Object(n["C"])(e.text.plain),1),Object(n["g"])("span",g,Object(n["C"])(e.text.ipa),1),Object(n["g"])("span",null,Object(n["C"])(e.text.glossed),1)]),Object(n["g"])("p",y,Object(n["C"])(e.grammar),1)])})),128))]})),_:1})):Object(n["e"])("",!0)]),Object(n["g"])("h2",m,[Object(n["g"])(d,{modelValue:e.expanded.samples,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.expanded.samples=t}),text:"Samples",class:"flex"},null,8,["modelValue"])]),e.entry.samples?(Object(n["r"])(),Object(n["d"])("div",x,[e.expanded.samples?(Object(n["r"])(),Object(n["d"])(u,{key:0},{default:Object(n["L"])((function(){return[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.entry.samples,(function(e,t){return Object(n["r"])(),Object(n["d"])("div",{key:t,class:"col-0"},[Object(n["g"])("p",null,Object(n["C"])(e.text.plain),1),Object(n["g"])("p",h,Object(n["C"])(e.translation),1)])})),128))]})),_:1})):Object(n["e"])("",!0)])):Object(n["e"])("",!0)],64)):Object(n["e"])("",!0)])}var k=Object(n["h"])({name:"EntryCard",props:{entry:{type:Object,default:void 0}},setup:function(){var e=Object(n["v"])({card:!1,forms:!1,samples:!1});return{expanded:e}}});k.render=w;var C=k,V=Object(n["h"])({components:{EntryCard:C},setup:function(){var e=Object(n["x"])(""),t=Object(n["x"])(""),c=Object(n["b"])((function(){return Object.entries(e.value?j.value:{}).filter((function(e){var t=Object(o["a"])(e,2),c=t[1];return c})).reduce((function(t,c){var n=Object(o["a"])(c,2),r=n[0],a=n[1];return t[r]=a.filter((function(t){var c=t.meaning;return c.primary.includes(e.value)})),t}),{})}));return{query:e,entries:c,lects:s["a"],lect:t}}});c("3928");V.render=b,V.__scopeId="data-v-e8185e1e";t["default"]=V},f941:function(e,t,c){}}]);