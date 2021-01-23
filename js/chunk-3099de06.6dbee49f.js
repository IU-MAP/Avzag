(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3099de06"],{"04d4":function(e,t,n){"use strict";var r=n("7a23");function a(e,t,n,a,i,c){var o=Object(r["B"])("btn");return Object(r["t"])(),Object(r["d"])(o,{class:"highlight-font-alert",icon:e.icon,text:e.text,onClick:e.confirm},null,8,["icon","text","onClick"])}var i=Object(r["i"])({props:{message:{type:String,default:"Delete?"},icon:{type:String,default:"delete"},text:{type:String,default:""}},emits:["confirm"],setup:function(e,t){var n=t.emit;function r(){window.confirm(e.message)&&n("confirm")}return{confirm:r}}});i.render=a;t["a"]=i},"0cb2":function(e,t,n){var r=n("7b0b"),a=Math.floor,i="".replace,c=/\$([$&'`]|\d\d?|<[^>]*>)/g,o=/\$([$&'`]|\d\d?)/g;e.exports=function(e,t,n,u,l,d){var f=n+e.length,s=u.length,p=o;return void 0!==l&&(l=r(l),p=c),i.call(d,p,(function(r,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(f);case"<":c=l[i.slice(1,-1)];break;default:var o=+i;if(0===o)return r;if(o>s){var d=a(o/10);return 0===d?r:d<=s?void 0===u[d-1]?i.charAt(1):u[d-1]+i.charAt(1):r}c=u[o-1]}return void 0===c?"":c}))}},"14c3":function(e,t,n){var r=n("c6b6"),a=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"2b5b":function(e,t,n){},"2e94":function(e,t,n){"use strict";n("2b5b")},3835:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return o}));n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0");function a(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done);r=!0)if(n.push(c.value),t&&n.length===t)break}catch(u){a=!0,i=u}finally{try{r||null==o["return"]||o["return"]()}finally{if(a)throw i}}return n}}var i=n("06c5");function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e,t){return r(e)||a(e,t)||Object(i["a"])(e,t)||c()}},"3cb6":function(e,t,n){"use strict";n.r(t);n("b0c0");var r=n("7a23"),a=Object(r["N"])("data-v-21976b04");Object(r["w"])("data-v-21976b04");var i={key:0,class:"section col-2 small grid"},c={class:"col-2"},o=Object(r["g"])(" Text that will be displayed to demonstrate the converter. "),u=Object(r["g"])(" The 1st mapping should be the same as the caption. Default conversion is from the 1st into the 2nd mappings in the order. "),l=Object(r["g"])(" During conversion system will consuquently go over these pairs, replacing text from the left with the text from the right or vise versa (right with left) if conversion is reversed.");Object(r["u"])();var d=a((function(e,t,n,d,f,s){var p=Object(r["B"])("EditorCard"),v=Object(r["B"])("ArrayShift"),b=Object(r["B"])("ConfirmButton"),h=Object(r["B"])("btn");return e.file?(Object(r["t"])(),Object(r["d"])("div",i,[Object(r["h"])("div",c,[Object(r["h"])(p,{button:"",icon:"text_snippet",header:"Sample Text"},{caption:a((function(){return[o]})),default:a((function(){return[Object(r["M"])(Object(r["h"])("textarea",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.file.sample=t})},null,512),[[r["H"],e.file.sample]]),Object(r["M"])(Object(r["h"])("textarea",{"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.converted=t}),readonly:""},null,512),[[r["H"],e.converted]])]})),_:1}),Object(r["h"])(p,{icon:"call_merge",header:"Mappings",onAction:e.addMapping},Object(r["f"])({caption:a((function(){return[u]})),default:a((function(){return[(Object(r["t"])(!0),Object(r["d"])(r["a"],null,Object(r["z"])(e.mappings,(function(t,n){return Object(r["t"])(),Object(r["d"])("div",{key:n,class:"row"},[Object(r["h"])(h,{icon:"edit","is-on":e.mapping===t,onClick:function(n){return e.mapping=t}},null,8,["is-on","onClick"]),Object(r["M"])(Object(r["h"])("input",{"onUpdate:modelValue":function(e){return t.name=e},type:"text"},null,8,["onUpdate:modelValue"]),[[r["H"],t.name]])])})),128))]})),_:2},[e.mapping?{name:"header",fn:a((function(){return[Object(r["h"])(v,{modelValue:e.mappings,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.mappings=t}),item:e.mapping},null,8,["modelValue","item"]),Object(r["h"])(b,{onConfirm:e.deleteMapping},null,8,["onConfirm"])]}))}:void 0]),1032,["onAction"])]),e.mapping?(Object(r["t"])(),Object(r["d"])(p,{key:0,icon:"format_list_numbered",header:"Pairs",onAction:t[4]||(t[4]=function(t){return e.addPair(e.pairs.length)})},{caption:a((function(){return[l]})),default:a((function(){return[(Object(r["t"])(!0),Object(r["d"])(r["a"],null,Object(r["z"])(e.pairs,(function(t,n){return Object(r["t"])(),Object(r["d"])("div",{key:n,class:"row"},[Object(r["h"])(h,{icon:"add",onClick:function(t){return e.addPair(n)}},null,8,["onClick"]),Object(r["M"])(Object(r["h"])("input",{"onUpdate:modelValue":function(e){return t[0]=e},type:"text",placeholder:"from"},null,8,["onUpdate:modelValue"]),[[r["H"],t[0]]]),Object(r["M"])(Object(r["h"])("input",{"onUpdate:modelValue":function(e){return t[1]=e},type:"text",placeholder:"to"},null,8,["onUpdate:modelValue"]),[[r["H"],t[1]]]),Object(r["h"])(h,{icon:"clear",onClick:function(t){return e.deletePair(n)}},null,8,["onClick"])])})),128))]})),_:1})):Object(r["e"])("",!0)])):Object(r["e"])("",!0)})),f=(n("c975"),n("d81d"),n("a434"),n("3835")),s=n("4c33"),p=n("04d4"),v=n("7694"),b=n("9392"),h=n("fa5c"),g=Object(r["i"])({components:{ArrayShift:s["a"],ConfirmButton:p["a"],EditorCard:v["a"]},setup:function(){var e=Object(r["y"])({}),t=Object(b["d"])({defaultFile:{default:[0,0],mappings:[]},filename:"converter",storage:"editor.converter"});Object(r["J"])(t,(function(t){var n=t.mappings;return e.value=n[n.length-1]}),{immediate:!0});var n=Object(r["b"])((function(){var e,n;return null!==(e=null===(n=t.value)||void 0===n?void 0:n.mappings)&&void 0!==e?e:[]})),a=Object(r["b"])((function(){var t,n;return null!==(t=null===(n=e.value)||void 0===n?void 0:n.pairs)&&void 0!==t?t:[]}));function i(){e.value={name:"newMapping",pairs:[]},n.value.push(e.value)}function c(){n.value.splice(n.value.indexOf(e.value),1),e.value=n.value[n.value.length-1]}function o(t){e.value.pairs.splice(t,0,["",""])}function u(t){e.value.pairs.splice(t,1)}var l=Object(r["b"])((function(){var r,i,c,o,u,l,d=Object(h["a"])(null!==(r=null===(i=t.value)||void 0===i?void 0:i.sample)&&void 0!==r?r:"",null!==(c=null===(o=n.value[0])||void 0===o?void 0:o.pairs)&&void 0!==c?c:[]);return e.value===n.value[0]?d:Object(h["a"])(d,null!==(u=null===(l=a.value)||void 0===l?void 0:l.map((function(e){var t=Object(f["a"])(e,2),n=t[0],r=t[1];return[r,n]})))&&void 0!==u?u:[])}));return{file:t,mappings:n,mapping:e,pairs:a,addMapping:i,deleteMapping:c,addPair:o,deletePair:u,converted:l}}});n("2e94");g.render=d,g.__scopeId="data-v-21976b04";t["default"]=g},"498a":function(e,t,n){"use strict";var r=n("23e7"),a=n("58a8").trim,i=n("c8d2");r({target:"String",proto:!0,forced:i("trim")},{trim:function(){return a(this)}})},"4c33":function(e,t,n){"use strict";var r=n("7a23"),a={class:"row-0"};function i(e,t,n,i,c,o){var u=Object(r["B"])("btn");return Object(r["t"])(),Object(r["d"])("div",a,[Object(r["h"])(u,{icon:"keyboard_arrow_up",onClick:t[1]||(t[1]=function(t){return e.shift(-1)})}),Object(r["h"])(u,{icon:"keyboard_arrow_down",onClick:t[2]||(t[2]=function(t){return e.shift(1)})})])}n("c975"),n("a434");var c=Object(r["i"])({props:{modelValue:{type:Array,default:function(){}},item:{type:Object,default:void 0}},emits:["update:modelValue"],setup:function(e,t){var n=t.emit,a=Object(r["b"])({get:function(){return e.modelValue},set:function(e){return n("update:modelValue",e)}});function i(t){var n=a.value.length,i=Object(r["E"])(a.value).indexOf(Object(r["E"])(e.item)),c=(i+t+n)%n;a.value.splice(c,0,a.value.splice(i,1)[0])}return{shift:i}}});c.render=i;t["a"]=c},5319:function(e,t,n){"use strict";var r=n("d784"),a=n("825a"),i=n("50c4"),c=n("a691"),o=n("1d80"),u=n("8aa5"),l=n("0cb2"),d=n("14c3"),f=Math.max,s=Math.min,p=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,n,r){var v=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,b=r.REPLACE_KEEPS_$0,h=v?"$":"$0";return[function(n,r){var a=o(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):t.call(String(a),n,r)},function(e,r){if(!v&&b||"string"===typeof r&&-1===r.indexOf(h)){var o=n(t,e,this,r);if(o.done)return o.value}var g=a(e),O=String(this),m="function"===typeof r;m||(r=String(r));var j=g.global;if(j){var x=g.unicode;g.lastIndex=0}var y=[];while(1){var E=d(g,O);if(null===E)break;if(y.push(E),!j)break;var S=String(E[0]);""===S&&(g.lastIndex=u(O,i(g.lastIndex),x))}for(var w="",C=0,_=0;_<y.length;_++){E=y[_];for(var A=String(E[0]),k=f(s(c(E.index),O.length),0),R=[],U=1;U<E.length;U++)R.push(p(E[U]));var I=E.groups;if(m){var P=[A].concat(R,k,O);void 0!==I&&P.push(I);var T=String(r.apply(void 0,P))}else T=l(A,O,k,R,I,r);k>=C&&(w+=O.slice(C,k)+T,C=k+A.length)}return w+O.slice(C)}]}))},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",c=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),u=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(c,"")),2&e&&(n=n.replace(o,"")),n}};e.exports={start:u(1),end:u(2),trim:u(3)}},7694:function(e,t,n){"use strict";var r=n("7a23"),a=Object(r["N"])("data-v-245b6f20");Object(r["w"])("data-v-245b6f20");var i={class:"col"},c={class:"row card-0"},o={class:"icon"},u={class:"flex"},l={key:0,class:"text-caption text-faded"},d={class:"col"};Object(r["u"])();var f=a((function(e,t,n,a,f,s){var p=Object(r["B"])("btn");return Object(r["t"])(),Object(r["d"])("div",i,[Object(r["h"])("div",c,[e.button?(Object(r["t"])(),Object(r["d"])(p,{key:0,icon:e.button,onClick:t[1]||(t[1]=function(t){return e.emit("action")})},null,8,["icon"])):Object(r["e"])("",!0),Object(r["h"])("p",o,Object(r["D"])(e.icon),1),Object(r["h"])("h2",u,Object(r["D"])(e.header),1),Object(r["A"])(e.$slots,"header")]),e.caption?(Object(r["t"])(),Object(r["d"])("p",l,[Object(r["A"])(e.$slots,"caption")])):Object(r["e"])("",!0),Object(r["h"])("div",d,[Object(r["A"])(e.$slots,"default")])])})),s=Object(r["i"])({name:"EditorCard",props:{button:{type:String,default:"add"},icon:{type:String,default:""},header:{type:String,default:""}},emits:["action"],setup:function(e,t){var n=t.emit,r=t.slots;return{emit:n,caption:r.caption}}});n("bb0f");s.render=f,s.__scopeId="data-v-245b6f20";t["a"]=s},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},9263:function(e,t,n){"use strict";var r=n("ad6d"),a=n("9f7f"),i=RegExp.prototype.exec,c=String.prototype.replace,o=i,u=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),l=a.UNSUPPORTED_Y||a.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],f=u||d||l;f&&(o=function(e){var t,n,a,o,f=this,s=l&&f.sticky,p=r.call(f),v=f.source,b=0,h=e;return s&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(e).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==e[f.lastIndex-1])&&(v="(?: "+v+")",h=" "+h,b++),n=new RegExp("^(?:"+v+")",p)),d&&(n=new RegExp("^"+v+"$(?!\\s)",p)),u&&(t=f.lastIndex),a=i.call(s?n:f,h),s?a?(a.input=a.input.slice(b),a[0]=a[0].slice(b),a.index=f.lastIndex,f.lastIndex+=a[0].length):f.lastIndex=0:u&&a&&(f.lastIndex=f.global?a.index+a[0].length:t),d&&a&&a.length>1&&c.call(a[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(a[o]=void 0)})),a}),e.exports=o},9392:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return u}));var r=n("7a23"),a={defaultFile:{},storage:"",filename:""},i=Object(r["y"])();function c(){i.value=JSON.parse(JSON.stringify(a.defaultFile))}function o(){localStorage[a.storage]=JSON.stringify(i.value)}function u(e){Object.assign(a,e);try{i.value=JSON.parse(localStorage[a.storage])}catch(t){c()}return Object(r["J"])(i,o,{deep:!0}),i}},"9f7f":function(e,t,n){"use strict";var r=n("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a434:function(e,t,n){"use strict";var r=n("23e7"),a=n("23cb"),i=n("a691"),c=n("50c4"),o=n("7b0b"),u=n("65f0"),l=n("8418"),d=n("1dde"),f=n("ae40"),s=d("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,b=Math.min,h=9007199254740991,g="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!s||!p},{splice:function(e,t){var n,r,d,f,s,p,O=o(this),m=c(O.length),j=a(e,m),x=arguments.length;if(0===x?n=r=0:1===x?(n=0,r=m-j):(n=x-2,r=b(v(i(t),0),m-j)),m+n-r>h)throw TypeError(g);for(d=u(O,r),f=0;f<r;f++)s=j+f,s in O&&l(d,f,O[s]);if(d.length=r,n<r){for(f=j;f<m-r;f++)s=f+r,p=f+n,s in O?O[p]=O[s]:delete O[p];for(f=m;f>m-r+n;f--)delete O[f-1]}else if(n>r)for(f=m-r;f>j;f--)s=f+r-1,p=f+n-1,s in O?O[p]=O[s]:delete O[p];for(f=0;f<n;f++)O[f+j]=arguments[f+2];return O.length=m-r+n,d}})},a640:function(e,t,n){"use strict";var r=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},ac1f:function(e,t,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},bb0f:function(e,t,n){"use strict";n("c26c")},c26c:function(e,t,n){},c8d2:function(e,t,n){var r=n("d039"),a=n("5899"),i="​᠎";e.exports=function(e){return r((function(){return!!a[e]()||i[e]()!=i||a[e].name!==e}))}},c975:function(e,t,n){"use strict";var r=n("23e7"),a=n("4d64").indexOf,i=n("a640"),c=n("ae40"),o=[].indexOf,u=!!o&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),d=c("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:u||!l||!d},{indexOf:function(e){return u?o.apply(this,arguments)||0:a(this,e,arguments.length>1?arguments[1]:void 0)}})},d784:function(e,t,n){"use strict";n("ac1f");var r=n("6eeb"),a=n("d039"),i=n("b622"),c=n("9263"),o=n("9112"),u=i("species"),l=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),f=i("replace"),s=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),p=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,f){var v=i(e),b=!a((function(){var t={};return t[v]=function(){return 7},7!=""[e](t)})),h=b&&!a((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[v]=/./[v]),n.exec=function(){return t=!0,null},n[v](""),!t}));if(!b||!h||"replace"===e&&(!l||!d||s)||"split"===e&&!p){var g=/./[v],O=n(v,""[e],(function(e,t,n,r,a){return t.exec===c?b&&!a?{done:!0,value:g.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:s}),m=O[0],j=O[1];r(String.prototype,e,m),r(RegExp.prototype,v,2==t?function(e,t){return j.call(e,this,t)}:function(e){return j.call(e,this)})}f&&o(RegExp.prototype[v],"sham",!0)}},d81d:function(e,t,n){"use strict";var r=n("23e7"),a=n("b727").map,i=n("1dde"),c=n("ae40"),o=i("map"),u=c("map");r({target:"Array",proto:!0,forced:!o||!u},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},fa5c:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n("fb6a"),n("ac1f"),n("5319"),n("498a");var r=n("3835"),a=n("b85c");function i(e){var t="",n=0;return" "===e.charAt(0)&&(t=" ",n=1),t+e.charAt(n).toUpperCase()+e.slice(n+1)}function c(e,t){e=" "+e.replace(/\n/g,"\n ").trim();for(var n="",c=0;c<e.length;){var o,u=!1,l=Object(a["a"])(t);try{for(l.s();!(o=l.n()).done;){var d=Object(r["a"])(o.value,2),f=d[0],s=d[1];if(f&&s){for(var p=f.length,v=e.substring(c,c+p),b=[[f,s],[i(f),i(s)],[f.toUpperCase(),s.toUpperCase()]],h=0,g=b;h<g.length;h++){var O=Object(r["a"])(g[h],2),m=O[0],j=O[1];if(v===m){u=!0,n+=j,c+=p;break}}if(u)break}}}catch(x){l.e(x)}finally{l.f()}u||(n+=e[c],c++)}return n.replace(/\n /g,"\n").trim()}}}]);
//# sourceMappingURL=chunk-3099de06.6dbee49f.js.map