(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03a31c5d"],{"0937":function(e,t,c){"use strict";c("8904")},"3c94":function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),r=Object(n["N"])("data-v-d63eed64");Object(n["u"])("data-v-d63eed64");var l={key:0,class:"section col-1"},a={class:"col-1"},o={class:"row"},s={key:1,class:"col-1 flex"},u={class:"scroll"},i={key:0,class:"col"},b={class:"col-0"},d={key:1,class:"col-0"};Object(n["s"])();var j=r((function(e,t,c,r,j,O){var p=Object(n["A"])("toggle"),v=Object(n["A"])("btn"),f=Object(n["A"])("PhraseCard");return e.corpus?(Object(n["r"])(),Object(n["d"])("div",l,[Object(n["g"])("div",a,[Object(n["g"])("div",o,[Object(n["g"])(p,{modelValue:e.searching,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.searching=t}),icon:"search"},null,8,["modelValue"]),e.searching?Object(n["M"])((Object(n["r"])(),Object(n["d"])("input",{key:0,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.query=t}),class:"flex",type:"text",placeholder:"Search all phrases..."},null,512)),[[n["H"],e.query]]):(Object(n["r"])(),Object(n["d"])("h2",s,[Object(n["M"])(Object(n["g"])("select",{"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.section=t}),style:{flex:"none"},onChange:t[4]||(t[4]=function(t){return e.select(e.section)})},[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.corpus,(function(e){return Object(n["r"])(),Object(n["d"])("option",{key:e.id,value:e},Object(n["C"])(e.name),9,["value"])})),128))],544),[[n["G"],e.section]])]))]),Object(n["g"])("div",u,[e.searching?(Object(n["r"])(),Object(n["d"])("div",i,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.phrases,(function(t,c){return Object(n["r"])(),Object(n["d"])("div",{key:c,class:"col"},[Object(n["g"])("h2",null,Object(n["C"])(e.corpus[c].name),1),Object(n["g"])("div",b,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(t,(function(t){return Object(n["r"])(),Object(n["d"])(v,{key:t,text:e.corpus[c].phrases[t].name,"is-on":e.phrase===e.corpus[c].phrases[t],onClick:function(n){return e.select(e.corpus[c],e.corpus[c].phrases[t])}},null,8,["text","is-on","onClick"])})),128))])])})),128))])):(Object(n["r"])(),Object(n["d"])("div",d,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.phrases,(function(t){return Object(n["r"])(),Object(n["d"])(v,{key:t.id,text:t.name,"is-on":e.phrase===t,onClick:function(c){return e.select(null,t)}},null,8,["text","is-on","onClick"])})),128))]))])]),e.phrase?(Object(n["r"])(),Object(n["d"])("div",{key:e.phrase.id,class:"col-1"},[Object(n["g"])(f,{phrase:e.phrase},null,8,["phrase"]),(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.phrasebooks,(function(t,c){return Object(n["r"])(),Object(n["d"])(f,{key:c,lect:c,phrase:t[e.phrase.id]},null,8,["lect","phrase"])})),128))])):Object(n["e"])("",!0)])):Object(n["e"])("",!0)})),O=(c("4de4"),c("caad"),c("d81d"),c("13d5"),c("2532"),c("3835")),p=Object(n["N"])("data-v-4877305d");Object(n["u"])("data-v-4877305d");var v={key:0,class:"col card flag"},f={key:0,class:"row small wrap",style:{width:"100%"}},h={class:"flex"},k={class:"row"},g={class:"row wrap flex"};Object(n["s"])();var y=p((function(e,t,c,r,l,a){var o=Object(n["A"])("Flag"),s=Object(n["A"])("toggle"),u=Object(n["A"])("btn"),i=Object(n["A"])("Context"),b=Object(n["A"])("Seeker"),d=Object(n["A"])("Block"),j=Object(n["A"])("Notes");return e.phrase?(Object(n["r"])(),Object(n["d"])("div",v,[Object(n["g"])(o,{lect:e.lect,class:"blur"},null,8,["lect"]),e.lect?(Object(n["r"])(),Object(n["d"])("div",f,[Object(n["g"])("h2",h,Object(n["C"])(e.lect),1),Object(n["g"])("div",k,[Object(n["g"])(s,{modelValue:e.playing,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.playing=t}),icon:"play_arrow"},null,8,["modelValue"]),Object(n["g"])(u,{icon:"content_copy",onClick:e.copy},null,8,["onClick"]),Object(n["g"])(s,{modelValue:e.glossed,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.glossed=t}),icon:"layers"},null,8,["modelValue"])])])):Object(n["e"])("",!0),Object(n["g"])(i,{translation:e.lect?e.phrase.context:null,blocks:e.vblocks},null,8,["translation","blocks"]),Object(n["g"])("div",g,[(Object(n["r"])(!0),Object(n["d"])(n["a"],null,Object(n["y"])(e.phrase.blocks,(function(t,c){var r,l;return Object(n["r"])(),Object(n["d"])("div",{key:c,class:"blocks row seeker"},[null!==(r=e.vblocks[c])&&void 0!==r&&r.state?(Object(n["r"])(),Object(n["d"])(b,{key:0,check:e.playing&&(null===(l=e.player.current)||void 0===l?void 0:l.i)===c,seek:e.player.seek},null,8,["check","seek"])):Object(n["e"])("",!0),Object(n["g"])(d,{block:t,glossed:e.glossed,onUpdate:function(t){return e.vblocks[c]=t}},null,8,["block","glossed","onUpdate"])])})),128))]),Object(n["g"])(j,{class:"text-caption",notes:e.phrase.notes},null,8,["notes"])])):Object(n["e"])("",!0)})),m=(c("99af"),c("a15b"),c("498a"),c("5794")),x=c("72e9"),w=c("d9c7"),C=c("f929"),V=c("9458"),A=c("e7de"),U=(c("96cf"),c("1da1")),B=c("3a0b"),S=Object(n["B"])([]),_=Object(n["B"])(),N=Object(n["B"])(),q=Object(n["B"])(),J=Object(B["a"])(Object(U["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(B["b"])("phrasebook");case 2:return S.value=e.sent,e.next=5,Object(B["c"])("phrasebook");case 5:_.value=e.sent,N.value=S.value[0],q.value=N.value.phrases[0];case 8:case"end":return e.stop()}}),e)})))),F=Object(n["h"])({components:{Context:m["a"],Block:x["a"],Notes:w["a"],Flag:C["a"],Seeker:V["a"]},props:{lect:{type:String,default:""},phrase:{type:Object,default:void 0}},setup:function(e){var t=Object(n["x"])(!1),c=Object(n["v"])([]),r=Object(n["b"])((function(){return c.filter((function(e){var t=e.state;return t})).map((function(e){var t=e.text,c=e.state;return(null!==c&&void 0!==c&&c.noSpace?"":" ")+t})).join("").trim()}));function l(){navigator.clipboard.writeText(r.value)}var a=Object(n["b"])({get:function(){return A["a"].key===e.lect},set:function(t){t?A["a"].play(e.lect,c.map((function(e){var t,c,n=e.state;return null===(null===n||void 0===n?void 0:n.audio)?null:null!==(t=null===n||void 0===n?void 0:n.audio)&&void 0!==t?t:null===n||void 0===n||null===(c=n.texts.map((function(e){var t=e.plain;return t})))||void 0===c?void 0:c.join("")})).map((function(e){var t;return null===e?"":"phrasebook/".concat(null===(t=q.value)||void 0===t?void 0:t.id,"/").concat(null!==e&&void 0!==e?e:"")}))):A["a"].stop()}});return{glossed:t,vblocks:c,copy:l,player:A["a"],playing:a}}});c("0937");F.render=y,F.__scopeId="data-v-4877305d";var I=F,M=c("7ec3"),P=Object(n["h"])({components:{PhraseCard:I},setup:function(){J();var e=Object(n["x"])({});Object(n["J"])(q,(function(t){return Object(M["c"])(e,null===t||void 0===t?void 0:t.context)}),{immediate:!0}),Object(n["t"])("context",e);var t=Object(n["x"])(!1),c=Object(n["x"])(""),r=Object(n["b"])((function(){var e;return t.value?S.value.reduce((function(e,t,n){return e[n]=t.phrases.map((function(e,t){return[e,t]})).filter((function(e){var t=Object(O["a"])(e,1),n=t[0];return n.name.includes(c.value)})).map((function(e){var t=Object(O["a"])(e,2),c=t[1];return c})),e[n].length||delete e[n],e}),{}):null===(e=N.value)||void 0===e?void 0:e.phrases}));function l(e,t){var c;e&&(N.value=e),q.value=null!==t&&void 0!==t?t:null===(c=N.value)||void 0===c?void 0:c.phrases[0]}return{searching:t,query:c,corpus:S,section:N,phrase:q,select:l,phrases:r,phrasebooks:_}}});c("9904");P.render=j,P.__scopeId="data-v-d63eed64";t["default"]=P},"498a":function(e,t,c){"use strict";var n=c("23e7"),r=c("58a8").trim,l=c("c8d2");n({target:"String",proto:!0,forced:l("trim")},{trim:function(){return r(this)}})},8904:function(e,t,c){},9904:function(e,t,c){"use strict";c("9efe")},"9efe":function(e,t,c){},c8d2:function(e,t,c){var n=c("d039"),r=c("5899"),l="​᠎";e.exports=function(e){return n((function(){return!!r[e]()||l[e]()!=l||r[e].name!==e}))}}}]);