(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e687a3c"],{"428a":function(t,e,n){"use strict";n("d3b7"),n("ddb0");var i=n("7a23"),o=Object(i["h"])("p",{class:"text-dot"},null,-1),c={class:"row-1 wrap block-editor"};function a(t,e,n,a,l,s){var r=Object(i["A"])("ArrayShift"),u=Object(i["A"])("ButtonAlert"),d=Object(i["A"])("Context"),b=Object(i["A"])("btn"),O=Object(i["A"])("VBlock"),j=Object(i["A"])("EditorCard");return t.mphrase?(Object(i["s"])(),Object(i["d"])(j,{key:0,icon:"account_tree",header:"Blocks",onAction:t.add},Object(i["f"])({default:Object(i["K"])((function(){return[Object(i["h"])(d),Object(i["h"])("div",c,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(t.blocks,(function(e,n){return Object(i["s"])(),Object(i["d"])("div",{key:t.keys[n],class:"row"},[Object(i["h"])(b,{icon:"edit","is-on":t.block===e,onClick:function(n){return t.block=e}},null,8,["is-on","onClick"]),Object(i["h"])(O,{block:e},null,8,["block"])])})),128))])]})),_:2},[t.block?{name:"header",fn:Object(i["K"])((function(){return[Object(i["h"])(r,{modelValue:t.blocks,"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.blocks=e}),item:t.block},null,8,["modelValue","item"]),o,Object(i["h"])(u,{onConfirm:t.remove},null,8,["onConfirm"])]}))}:void 0]),1032,["onAction"])):Object(i["e"])("",!0)}n("c975"),n("d81d"),n("a434");var l=n("7694"),s=n("4c33"),r=n("898d"),u=n("5794"),d=n("72e9"),b=Object(i["i"])({components:{EditorCard:l["a"],ArrayShift:s["a"],ButtonAlert:r["a"],Context:u["a"],VBlock:d["a"]},props:{modelValue:{type:Object,default:void 0},phrase:{type:Object,default:function(){return{}}}},emits:["update:modelValue","update:phrase"],setup:function(t,e){var n=e.emit,o=Object(i["b"])({get:function(){return t.phrase},set:function(t){return n("update:modelValue",t)}}),c=Object(i["b"])({get:function(){return o.value.blocks},set:function(t){return o.value.blocks=t}}),a=Object(i["b"])({get:function(){return t.modelValue},set:function(t){return n("update:modelValue",t)}}),l=Object(i["b"])((function(){return c.value.map((function(t,e){return o.value.id+"--"+e+"--"+Math.random()}))}));function s(){c.value&&(a.value=c.value[c.value.length-1])}function r(){c.value.push({states:[{display:[{text:"new state"}],transition:"next"}]}),s()}function u(){var t=Object(i["D"])(c.value).indexOf(Object(i["D"])(a.value));c.value.splice(t,1),s()}return Object(i["I"])(c,s,{immediate:!0}),{mphrase:o,blocks:c,block:a,add:r,remove:u,keys:l}}});b.render=a;e["a"]=b},"4c33":function(t,e,n){"use strict";var i=n("7a23"),o={class:"row-0"};function c(t,e,n,c,a,l){var s=Object(i["A"])("btn");return Object(i["s"])(),Object(i["d"])("div",o,[Object(i["h"])(s,{icon:"keyboard_arrow_up",onClick:e[1]||(e[1]=function(e){return t.shift(-1)})}),Object(i["h"])(s,{icon:"keyboard_arrow_down",onClick:e[2]||(e[2]=function(e){return t.shift(1)})})])}n("c975"),n("a434");var a=Object(i["i"])({props:{modelValue:{type:Array,default:function(){return[]}},item:{type:Object,default:void 0}},emits:["update:modelValue"],setup:function(t,e){var n=e.emit,o=Object(i["b"])({get:function(){return t.modelValue},set:function(t){return n("update:modelValue",t)}});function c(e){var n=o.value.length,c=Object(i["D"])(o.value).indexOf(Object(i["D"])(t.item)),a=(c+e+n)%n;o.value.splice(a,0,o.value.splice(c,1)[0])}return{shift:c}}});a.render=c;e["a"]=a},"64d1":function(t,e,n){},"67a4":function(t,e,n){"use strict";n("64d1")},7694:function(t,e,n){"use strict";var i=n("7a23"),o={class:"col"},c={class:"row"},a={class:"icon"},l={class:"flex"},s={key:0,class:"text-caption text-faded"};function r(t,e,n,r,u,d){var b=Object(i["A"])("btn");return Object(i["s"])(),Object(i["d"])("div",o,[Object(i["h"])("div",c,[t.button?(Object(i["s"])(),Object(i["d"])(b,{key:0,icon:t.button,onClick:e[1]||(e[1]=function(e){return t.emit("action")})},null,8,["icon"])):Object(i["e"])("",!0),Object(i["h"])("p",a,Object(i["C"])(t.icon),1),Object(i["h"])("h2",l,Object(i["C"])(t.header),1),Object(i["z"])(t.$slots,"header")]),t.caption?(Object(i["s"])(),Object(i["d"])("p",s,[Object(i["z"])(t.$slots,"caption")])):Object(i["e"])("",!0),Object(i["z"])(t.$slots,"default")])}var u=Object(i["i"])({name:"EditorCard",props:{button:{type:String,default:"add"},icon:{type:String,default:""},header:{type:String,default:""}},emits:["action"],setup:function(t,e){var n=e.emit,i=e.slots;return{emit:n,caption:i.caption}}});u.render=r;e["a"]=u},"898d":function(t,e,n){"use strict";var i=n("7a23"),o={class:"row-0"};function c(t,e,n,c,a,l){var s=Object(i["A"])("btn");return Object(i["s"])(),Object(i["d"])("div",o,[t.prompt?(Object(i["s"])(),Object(i["d"])(i["a"],{key:0},[Object(i["h"])(s,{class:"highlight-font-alert",icon:"delete_forever",onClick:t.confirm},null,8,["onClick"]),Object(i["h"])(s,{icon:"check",onClick:e[1]||(e[1]=function(e){return t.prompt=!1})})],64)):(Object(i["s"])(),Object(i["d"])(s,{key:1,class:"highlight-font-alert",icon:"delete",text:t.text,onClick:e[2]||(e[2]=function(e){return t.prompt=!0})},null,8,["text"]))])}var a=Object(i["i"])({props:{text:{type:String,default:""}},emits:["confirm"],setup:function(t,e){var n=e.emit,o=Object(i["x"])(!1);function c(){o.value=!1,n("confirm")}return{prompt:o,confirm:c}}});a.render=c;e["a"]=a},9362:function(t,e,n){"use strict";var i=n("7a23"),o={class:"block col-2"},c=Object(i["g"])(" If at least one of these conditions fails, the block will be completely hidden. "),a=Object(i["h"])("p",{class:"text-dot"},null,-1),l={class:"row-1 wrap block-editor"};function s(t,e,n,s,r,u){var d=Object(i["A"])("ConditionsEditor"),b=Object(i["A"])("toggle"),O=Object(i["A"])("ButtonAlert"),j=Object(i["A"])("btn"),f=Object(i["A"])("Display"),p=Object(i["A"])("EditorCard"),h=Object(i["A"])("DisplayEditor"),m=Object(i["A"])("TransitionEditor");return Object(i["s"])(),Object(i["d"])("div",o,[Object(i["h"])(d,{modelValue:u.block.requirements,"onUpdate:modelValue":e[1]||(e[1]=function(t){return u.block.requirements=t}),icon:"lock",header:"Requirements"},{default:Object(i["K"])((function(){return[c]})),_:1},8,["modelValue"]),Object(i["h"])(p,{icon:"tune",header:"States",onAction:u.add},Object(i["f"])({default:Object(i["K"])((function(){return[Object(i["h"])("div",l,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(u.states,(function(t,e){return Object(i["s"])(),Object(i["d"])("div",{key:e,class:"row"},[Object(i["h"])(j,{icon:"edit","is-on":r.state===t,onClick:function(e){return r.state=t}},null,8,["is-on","onClick"]),Object(i["h"])(f,{state:t,glossed:r.glossed},null,8,["state","glossed"])])})),128))])]})),_:2},[r.state?{name:"header",fn:Object(i["K"])((function(){return[Object(i["h"])(b,{modelValue:r.glossed,"onUpdate:modelValue":e[2]||(e[2]=function(t){return r.glossed=t}),icon:"layers"},null,8,["modelValue"]),a,Object(i["h"])(O,{onConfirm:u.remove},null,8,["onConfirm"])]}))}:void 0]),1032,["onAction"]),r.state?(Object(i["s"])(),Object(i["d"])(i["a"],{key:0},[Object(i["h"])(h,{modelValue:r.state.display,"onUpdate:modelValue":e[3]||(e[3]=function(t){return r.state.display=t}),implicit:r.state.implicit,"onUpdate:implicit":e[4]||(e[4]=function(t){return r.state.implicit=t})},null,8,["modelValue","implicit"]),Object(i["h"])(d,{modelValue:r.state.conditions,"onUpdate:modelValue":e[5]||(e[5]=function(t){return r.state.conditions=t}),"allow-passive":!0,icon:"widgets",header:"conditions"},null,8,["modelValue"]),Object(i["h"])(m,{modelValue:r.state.transition,"onUpdate:modelValue":e[6]||(e[6]=function(t){return r.state.transition=t}),states:u.states},null,8,["modelValue","states"])],64)):Object(i["e"])("",!0)])}n("c975"),n("a434");var r=n("898d"),u=n("7694"),d=Object(i["M"])("data-v-6e2fd21f");Object(i["v"])("data-v-6e2fd21f");var b={class:"scroll col"},O=Object(i["h"])("p",{class:"icon"},"west",-1);Object(i["t"])();var j=d((function(t,e,n,o,c,a){var l=Object(i["A"])("toggle"),s=Object(i["A"])("btn"),r=Object(i["A"])("EditorCard");return Object(i["s"])(),Object(i["d"])(r,{icon:n.icon,header:n.header,onAction:a.add},{caption:d((function(){return[Object(i["z"])(t.$slots,"default")]})),default:d((function(){return[Object(i["h"])("div",b,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(a.conditions,(function(t,e){return Object(i["s"])(),Object(i["d"])("div",{key:e,class:"row"},[n.allowPassive?(Object(i["s"])(),Object(i["d"])(l,{key:0,modelValue:t.passive,"onUpdate:modelValue":function(e){return t.passive=e},icon:"call_missed"},null,8,["modelValue","onUpdate:modelValue"])):Object(i["e"])("",!0),Object(i["L"])(Object(i["h"])("select",{"onUpdate:modelValue":function(e){return t.entity=e},onChange:function(e){return a.setEntity(t)}},[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(a.entities,(function(t){return Object(i["s"])(),Object(i["d"])("option",{key:t,value:t},Object(i["C"])(t),9,["value"])})),128))],40,["onUpdate:modelValue","onChange"]),[[i["F"],t.entity]]),O,t.entity?Object(i["L"])((Object(i["s"])(),Object(i["d"])("select",{key:1,"onUpdate:modelValue":function(e){return t.tag=e}},[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(a.tags[t.entity],(function(t){return Object(i["s"])(),Object(i["d"])("option",{key:t,value:t},Object(i["C"])(t),9,["value"])})),128))],8,["onUpdate:modelValue"])),[[i["F"],t.tag]]):Object(i["e"])("",!0),Object(i["h"])(s,{icon:"clear",onClick:function(t){return a.remove(e)}},null,8,["onClick"])])})),128))])]})),_:1},8,["icon","header","onAction"])})),f=(n("13d5"),n("4fad"),n("b64b"),n("2909")),p=n("3835"),h={name:"PhraseConditionsEditor",components:{EditorCard:u["a"]},inject:["contextSource"],props:["modelValue","allowPassive","header","icon"],emits:["update:modelValue"],computed:{conditions:{get:function(){return this.modelValue},set:function(t){this.$emit("update:modelValue",t)}},entities:function(){return Object.keys(this.contextSource.value)},tags:function(){return Object.entries(this.contextSource.value).reduce((function(t,e){var n=Object(p["a"])(e,2),i=n[0],o=n[1];return t[i]=Object(f["a"])(o),t}),{})}},methods:{setEntity:function(t){t.tag=this.tags[t.entity][0]},add:function(){var t,e={entity:this.entities[0]};this.setEntity(e);var n=null!==(t=this.conditions)&&void 0!==t?t:[];n.push(e),this.conditions=n},remove:function(t){this.conditions.splice(t,1)}}};n("67a4");h.render=j,h.__scopeId="data-v-6e2fd21f";var m=h,v={class:"row"},y={key:0,class:"row-1 wrap block-editor"};function k(t,e,n,o,c,a){var l=Object(i["A"])("btn"),s=Object(i["A"])("Display"),r=Object(i["A"])("EditorCard");return Object(i["s"])(),Object(i["d"])(r,{button:"",icon:"alt_route",header:"transition"},{header:Object(i["K"])((function(){return[Object(i["h"])("div",v,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(c.icons,(function(t,e){return Object(i["s"])(),Object(i["d"])(l,{key:t,icon:t,"is-on":c.mode===e,onClick:function(t){return c.mode=e}},null,8,["icon","is-on","onClick"])})),128))])]})),default:Object(i["K"])((function(){return[2===c.mode?(Object(i["s"])(),Object(i["d"])("div",y,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(n.states,(function(t,e){return Object(i["s"])(),Object(i["d"])("div",{key:e,class:"row"},[Object(i["h"])(l,{icon:"check","is-on":a.present[e],onClick:function(t){return a.toggle(e)}},null,8,["is-on","onClick"]),Object(i["h"])(s,{state:t},null,8,["state"])])})),128))])):Object(i["e"])("",!0)]})),_:1})}n("4de4"),n("caad"),n("a15b"),n("d81d"),n("a9e3"),n("ac1f"),n("2532"),n("1276");var g=n("83b8"),V={name:"PhraseStateTransitionEditor",components:{EditorCard:u["a"],Display:g["a"]},props:["modelValue","states"],emits:["update:modelValue"],data:function(){return{mode:0,icons:["block","arrow_forward","star_outline"]}},computed:{transition:{get:function(){return this.modelValue},set:function(t){this.$emit("update:modelValue",t)}},ints:function(){var t,e;return null!==(t=null===(e=this.transition)||void 0===e?void 0:e.split(" ").map((function(t){return Number(t)})).filter((function(t){return!isNaN(t)})))&&void 0!==t?t:[]},present:function(){var t=this;return this.states.map((function(e,n){return t.ints.includes(n)}))}},watch:{state:{handler:function(){"next"===this.transition?this.mode=1:this.transition?this.mode=2:this.mode=0},immediate:!0},mode:function(){1===this.mode?this.transition="next":this.mode||(this.transition=void 0)}},methods:{toggle:function(t){var e=this.ints;e.includes(t)?e.splice(e.indexOf(t),1):e.push(t),2===this.mode&&(this.transition=e.join(" "))}}};V.render=k;var C=V,A={key:0,class:"col"};function w(t,e,n,o,c,a){var l=Object(i["A"])("toggle"),s=Object(i["A"])("btn"),r=Object(i["A"])("EditorCard");return Object(i["s"])(),Object(i["d"])(r,{icon:"visibility",header:"display",onAction:a.add},{header:Object(i["K"])((function(){return[Object(i["h"])(l,{icon:"opacity","model-value":n.implicit,"onUpdate:modelValue":e[1]||(e[1]=function(e){return t.$emit("update:implicit",e)})},null,8,["model-value"])]})),default:Object(i["K"])((function(){return[a.display?(Object(i["s"])(),Object(i["d"])("div",A,[(Object(i["s"])(!0),Object(i["d"])(i["a"],null,Object(i["y"])(a.display,(function(t,e){return Object(i["s"])(),Object(i["d"])("div",{key:e,class:"row"},[Object(i["h"])(s,{icon:"palette",onClick:function(t){return a.toggle(e)}},null,8,["onClick"]),Object(i["L"])(Object(i["h"])("input",{"onUpdate:modelValue":function(e){return t.text=e},class:a.colors[e],type:"text",placeholder:"text"},null,10,["onUpdate:modelValue"]),[[i["G"],t.text]]),Object(i["L"])(Object(i["h"])("input",{"onUpdate:modelValue":function(e){return t.ipa=e},class:["text-ipa",a.colors[e]],type:"text",placeholder:"ipa"},null,10,["onUpdate:modelValue"]),[[i["G"],t.ipa]]),Object(i["L"])(Object(i["h"])("input",{"onUpdate:modelValue":function(e){return t.glossing=e},class:["glossing",a.colors[e]],type:"text",placeholder:"glossing"},null,10,["onUpdate:modelValue"]),[[i["G"],t.glossing]]),Object(i["h"])(s,{icon:"clear",onClick:function(t){return a.remove(e)}},null,8,["onClick"])])})),128))])):Object(i["e"])("",!0)]})),_:1},8,["onAction"])}n("99af");var x={name:"PhraseStateDisplayEditor",components:{EditorCard:u["a"]},inject:["contextSource"],props:["modelValue","implicit","allowEmpty"],emits:["update:modelValue","update:implicit"],computed:{display:{get:function(){return this.modelValue},set:function(t){this.$emit("update:modelValue",t)}},entities:function(){return[void 0].concat(Object.keys(this.contextSource.value))},colors:function(){var t=this;return this.display.map((function(e){return"colored-"+(t.entities.indexOf(e.entity)-1)}))}},methods:{add:function(){this.display||(this.display=[]),this.display.push({})},toggle:function(t){var e=this.entities.indexOf(this.display[t].entity);e=(e+1)%this.entities.length,this.display[t].entity=this.entities[e]},remove:function(t){(this.allowEmpty||this.display.length>1)&&this.display.splice(t,1)}}};x.render=w;var E=x,S={name:"PhraseBlockEditor",components:{ButtonAlert:r["a"],EditorCard:u["a"],ConditionsEditor:m,TransitionEditor:C,Display:g["a"],DisplayEditor:E},props:["modelValue"],emits:["update:modelValue"],data:function(){return{state:void 0,glossed:!1}},computed:{block:{get:function(){return this.modelValue},set:function(t){this.$emit("update:modelValue",t)}},states:function(){var t;return null===(t=this.block)||void 0===t?void 0:t.states}},watch:{block:{handler:function(){var t;null!==(t=this.states)&&void 0!==t&&t.length?this.state=this.states[this.states.length-1]:(this.block.states=[],this.add())},immediate:!0}},methods:{add:function(){var t={display:[{text:"new state"}],transition:"next"};this.states.push(t),this.state=t},remove:function(){this.states.length>1&&(this.states.splice(this.states.indexOf(this.state),1),this.state=this.states[this.states.length-1])}}};S.render=s;e["a"]=S},9392:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return s}));var i=n("7a23"),o={defaultFile:{},storage:"",filename:""},c=Object(i["x"])();function a(){c.value=JSON.parse(JSON.stringify(o.defaultFile))}function l(){localStorage[o.storage]=JSON.stringify(c.value)}function s(t){Object.assign(o,t);try{c.value=JSON.parse(localStorage[o.storage])}catch(e){a()}return Object(i["I"])(c,l,{deep:!0}),c}},a434:function(t,e,n){"use strict";var i=n("23e7"),o=n("23cb"),c=n("a691"),a=n("50c4"),l=n("7b0b"),s=n("65f0"),r=n("8418"),u=n("1dde"),d=n("ae40"),b=u("splice"),O=d("splice",{ACCESSORS:!0,0:0,1:2}),j=Math.max,f=Math.min,p=9007199254740991,h="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!b||!O},{splice:function(t,e){var n,i,u,d,b,O,m=l(this),v=a(m.length),y=o(t,v),k=arguments.length;if(0===k?n=i=0:1===k?(n=0,i=v-y):(n=k-2,i=f(j(c(e),0),v-y)),v+n-i>p)throw TypeError(h);for(u=s(m,i),d=0;d<i;d++)b=y+d,b in m&&r(u,d,m[b]);if(u.length=i,n<i){for(d=y;d<v-i;d++)b=d+i,O=d+n,b in m?m[O]=m[b]:delete m[O];for(d=v;d>v-i+n;d--)delete m[d-1]}else if(n>i)for(d=v-i;d>y;d--)b=d+i-1,O=d+n-1,b in m?m[O]=m[b]:delete m[O];for(d=0;d<n;d++)m[d+y]=arguments[d+2];return m.length=v-i+n,u}})}}]);
//# sourceMappingURL=chunk-6e687a3c.e77b1e68.js.map