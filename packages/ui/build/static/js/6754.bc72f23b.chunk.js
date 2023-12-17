"use strict";(self.webpackChunkflowise_ui=self.webpackChunkflowise_ui||[]).push([[6754],{26754:(n,t,e)=>{e.d(t,{ZP:()=>y});var o=e(31461),r=e(7896),i=e(30969),c=e(87023),a=e(29878),s=e(49505),p=e(26540),u=e(45971),l=e(17363),m=e(94702);const d=i.createContext();var f=e(62746),g=e(2975);function w(n){return(0,g.Z)("MuiGrid",n)}const h=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],x=(0,f.Z)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map((n=>"spacing-xs-".concat(n))),...["column-reverse","column","row-reverse","row"].map((n=>"direction-xs-".concat(n))),...["nowrap","wrap-reverse","wrap"].map((n=>"wrap-xs-".concat(n))),...h.map((n=>"grid-xs-".concat(n))),...h.map((n=>"grid-sm-".concat(n))),...h.map((n=>"grid-md-".concat(n))),...h.map((n=>"grid-lg-".concat(n))),...h.map((n=>"grid-xl-".concat(n)))]);var b=e(37574);const k=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function S(n){const t=parseFloat(n);return"".concat(t).concat(String(n).replace(String(t),"")||"px")}function v(n){let{breakpoints:t,values:e}=n,o="";Object.keys(e).forEach((n=>{""===o&&0!==e[n]&&(o=n)}));const r=Object.keys(t).sort(((n,e)=>t[n]-t[e]));return r.slice(0,r.indexOf(o))}const W=(0,u.ZP)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(n,t)=>{const{ownerState:e}=n,{container:o,direction:r,item:i,spacing:c,wrap:a,zeroMinWidth:s,breakpoints:p}=e;let u=[];o&&(u=function(n,t){let e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!n||n<=0)return[];if("string"===typeof n&&!Number.isNaN(Number(n))||"number"===typeof n)return[e["spacing-xs-".concat(String(n))]];const o=[];return t.forEach((t=>{const r=n[t];Number(r)>0&&o.push(e["spacing-".concat(t,"-").concat(String(r))])})),o}(c,p,t));const l=[];return p.forEach((n=>{const o=e[n];o&&l.push(t["grid-".concat(n,"-").concat(String(o))])})),[t.root,o&&t.container,i&&t.item,s&&t.zeroMinWidth,...u,"row"!==r&&t["direction-xs-".concat(String(r))],"wrap"!==a&&t["wrap-xs-".concat(String(a))],...l]}})((n=>{let{ownerState:t}=n;return(0,r.Z)({boxSizing:"border-box"},t.container&&{display:"flex",flexWrap:"wrap",width:"100%"},t.item&&{margin:0},t.zeroMinWidth&&{minWidth:0},"wrap"!==t.wrap&&{flexWrap:t.wrap})}),(function(n){let{theme:t,ownerState:e}=n;const o=(0,a.P$)({values:e.direction,breakpoints:t.breakpoints.values});return(0,a.k9)({theme:t},o,(n=>{const t={flexDirection:n};return 0===n.indexOf("column")&&(t["& > .".concat(x.item)]={maxWidth:"none"}),t}))}),(function(n){let{theme:t,ownerState:e}=n;const{container:o,rowSpacing:r}=e;let i={};if(o&&0!==r){const n=(0,a.P$)({values:r,breakpoints:t.breakpoints.values});let e;"object"===typeof n&&(e=v({breakpoints:t.breakpoints.values,values:n})),i=(0,a.k9)({theme:t},n,((n,o)=>{var r;const i=t.spacing(n);return"0px"!==i?{marginTop:"-".concat(S(i)),["& > .".concat(x.item)]:{paddingTop:S(i)}}:null!=(r=e)&&r.includes(o)?{}:{marginTop:0,["& > .".concat(x.item)]:{paddingTop:0}}}))}return i}),(function(n){let{theme:t,ownerState:e}=n;const{container:o,columnSpacing:r}=e;let i={};if(o&&0!==r){const n=(0,a.P$)({values:r,breakpoints:t.breakpoints.values});let e;"object"===typeof n&&(e=v({breakpoints:t.breakpoints.values,values:n})),i=(0,a.k9)({theme:t},n,((n,o)=>{var r;const i=t.spacing(n);return"0px"!==i?{width:"calc(100% + ".concat(S(i),")"),marginLeft:"-".concat(S(i)),["& > .".concat(x.item)]:{paddingLeft:S(i)}}:null!=(r=e)&&r.includes(o)?{}:{width:"100%",marginLeft:0,["& > .".concat(x.item)]:{paddingLeft:0}}}))}return i}),(function(n){let t,{theme:e,ownerState:o}=n;return e.breakpoints.keys.reduce(((n,i)=>{let c={};if(o[i]&&(t=o[i]),!t)return n;if(!0===t)c={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===t)c={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const s=(0,a.P$)({values:o.columns,breakpoints:e.breakpoints.values}),p="object"===typeof s?s[i]:s;if(void 0===p||null===p)return n;const u="".concat(Math.round(t/p*1e8)/1e6,"%");let l={};if(o.container&&o.item&&0!==o.columnSpacing){const n=e.spacing(o.columnSpacing);if("0px"!==n){const t="calc(".concat(u," + ").concat(S(n),")");l={flexBasis:t,maxWidth:t}}}c=(0,r.Z)({flexBasis:u,flexGrow:0,maxWidth:u},l)}return 0===e.breakpoints.values[i]?Object.assign(n,c):n[e.breakpoints.up(i)]=c,n}),{})}));const Z=n=>{const{classes:t,container:e,direction:o,item:r,spacing:i,wrap:c,zeroMinWidth:a,breakpoints:s}=n;let u=[];e&&(u=function(n,t){if(!n||n<=0)return[];if("string"===typeof n&&!Number.isNaN(Number(n))||"number"===typeof n)return["spacing-xs-".concat(String(n))];const e=[];return t.forEach((t=>{const o=n[t];if(Number(o)>0){const n="spacing-".concat(t,"-").concat(String(o));e.push(n)}})),e}(i,s));const l=[];s.forEach((t=>{const e=n[t];e&&l.push("grid-".concat(t,"-").concat(String(e)))}));const m={root:["root",e&&"container",r&&"item",a&&"zeroMinWidth",...u,"row"!==o&&"direction-xs-".concat(String(o)),"wrap"!==c&&"wrap-xs-".concat(String(c)),...l]};return(0,p.Z)(m,w,t)},M=i.forwardRef((function(n,t){const e=(0,l.Z)({props:n,name:"MuiGrid"}),{breakpoints:a}=(0,m.Z)(),p=(0,s.Z)(e),{className:u,columns:f,columnSpacing:g,component:w="div",container:h=!1,direction:x="row",item:S=!1,rowSpacing:v,spacing:M=0,wrap:y="wrap",zeroMinWidth:N=!1}=p,z=(0,o.Z)(p,k),j=v||M,G=g||M,P=i.useContext(d),E=h?f||12:P,O={},B=(0,r.Z)({},z);a.keys.forEach((n=>{null!=z[n]&&(O[n]=z[n],delete B[n])}));const C=(0,r.Z)({},p,{columns:E,container:h,direction:x,item:S,rowSpacing:j,columnSpacing:G,wrap:y,zeroMinWidth:N,spacing:M},O,{breakpoints:a.keys}),L=Z(C);return(0,b.jsx)(d.Provider,{value:E,children:(0,b.jsx)(W,(0,r.Z)({ownerState:C,className:(0,c.Z)(L.root,u),as:w,ref:t},B))})}));const y=M}}]);
//# sourceMappingURL=6754.bc72f23b.chunk.js.map