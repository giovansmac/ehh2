"use strict";(self.webpackChunkflowise_ui=self.webpackChunkflowise_ui||[]).push([[7774],{55303:(e,t,r)=>{r.d(t,{Z:()=>n});r(30969);const n=r.p+"static/media/workflow_empty.55ef149bd518376e1fe142b66c80ccd1.svg"},60990:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(30969);const a=e=>{const[t,r]=(0,n.useState)(null),[a,i]=(0,n.useState)(null),[o,l]=(0,n.useState)(!1);return{data:t,error:a,loading:o,request:async function(){l(!0);try{const t=await e(...arguments);r(t.data)}catch(t){i(t||"Unexpected Error!")}finally{l(!1)}}}}},60806:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(30969),a=r(30864),i=r(2383);let o;const l=()=>{const[e,t]=(0,n.useContext)(a.Z),r=()=>{t({type:i.bA})};return{confirm:e=>(t({type:i.gN,payload:e}),new Promise((e=>{o=e}))),onConfirm:()=>{r(),o(!0)},onCancel:()=>{r(),o(!1)},confirmState:e}}},52312:(e,t,r)=>{r.d(t,{S:()=>o});var n=r(45971),a=r(46138),i=r(17897);const o=(0,n.ZP)(a.Z)((e=>{let{theme:t,color:r="primary"}=e;return{color:"white",backgroundColor:t.palette[r].main,"&:hover":{backgroundColor:t.palette[r].main,backgroundImage:"linear-gradient(rgb(0 0 0/10%) 0 0)"}}}));(0,n.ZP)(i.Z)((e=>{let{theme:t,color:r="primary"}=e;return{"&.Mui-selected, &.Mui-selected:hover":{color:"white",backgroundColor:t.palette[r].main}}}))},24326:(e,t,r)=>{r.d(t,{Z:()=>p});var n=r(45971),a=r(38361),i=r(26754),o=r(47915),l=r(55705),s=r(22994),c=r(42846),d=r(15237),h=r(37574);const u=()=>(0,h.jsx)(s.Z,{children:(0,h.jsx)(c.Z,{children:(0,h.jsxs)(i.ZP,{container:!0,direction:"column",children:[(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsxs)(i.ZP,{container:!0,justifyContent:"space-between",children:[(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(d.Z,{variant:"rectangular",width:44,height:44})}),(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(d.Z,{variant:"rectangular",width:34,height:34})})]})}),(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(d.Z,{variant:"rectangular",sx:{my:2},height:40})}),(0,h.jsx)(i.ZP,{item:!0,children:(0,h.jsx)(d.Z,{variant:"rectangular",height:30})})]})})}),g=(0,n.ZP)(l.Z)((e=>{let{theme:t}=e;return{background:t.palette.card.main,color:t.darkTextPrimary,overflow:"auto",position:"relative",boxShadow:"0 2px 14px 0 rgb(32 40 45 / 8%)",cursor:"pointer","&:hover":{background:t.palette.card.hover,boxShadow:"0 2px 14px 0 rgb(32 40 45 / 20%)"},maxHeight:"300px",maxWidth:"300px",overflowWrap:"break-word",whiteSpace:"pre-line"}})),p=e=>{let{isLoading:t,data:r,images:n,onClick:l}=e;return(0,h.jsx)(h.Fragment,{children:t?(0,h.jsx)(u,{}):(0,h.jsx)(g,{border:!1,content:!1,onClick:l,children:(0,h.jsx)(a.Z,{sx:{p:2.25},children:(0,h.jsxs)(i.ZP,{container:!0,direction:"column",children:[(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[r.iconSrc&&(0,h.jsx)("div",{style:{width:35,height:35,marginRight:10,borderRadius:"50%",background:"url(".concat(r.iconSrc,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center center"}}),!r.iconSrc&&r.color&&(0,h.jsx)("div",{style:{width:35,height:35,marginRight:10,borderRadius:"50%",background:r.color}}),(0,h.jsx)(o.Z,{sx:{fontSize:"1.5rem",fontWeight:500,overflowWrap:"break-word",whiteSpace:"pre-line"},children:r.templateName||r.name})]}),r.description&&(0,h.jsx)("span",{style:{marginTop:10,overflowWrap:"break-word",whiteSpace:"pre-line"},children:r.description}),n&&(0,h.jsx)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:5},children:n.map((e=>(0,h.jsx)("div",{style:{width:35,height:35,marginRight:5,borderRadius:"50%",backgroundColor:"white",marginTop:5},children:(0,h.jsx)("img",{style:{width:"100%",height:"100%",padding:5,objectFit:"contain"},alt:"",src:e})},e)))})]})})})})}},48349:(e,t,r)=>{r.d(t,{Z:()=>u});var n=r(15749),a=r(48886),i=r(38357),o=r(87130),l=r(91862),s=r(46138),c=r(60806),d=r(52312),h=r(37574);const u=()=>{const{onConfirm:e,onCancel:t,confirmState:r}=(0,c.Z)(),u=document.getElementById("portal"),g=r.show?(0,h.jsxs)(a.Z,{fullWidth:!0,maxWidth:"xs",open:r.show,onClose:t,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,h.jsx)(i.Z,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:r.title}),(0,h.jsx)(o.Z,{children:(0,h.jsx)("span",{children:r.description})}),(0,h.jsxs)(l.Z,{children:[(0,h.jsx)(s.Z,{onClick:t,children:r.cancelButtonName}),(0,h.jsx)(d.S,{variant:"contained",onClick:e,children:r.confirmButtonName})]})]}):null;return(0,n.createPortal)(g,u)}},84956:(e,t,r)=>{r.d(t,{x:()=>s});var n=r(45304),a=r.n(n),i=r(73835),o=(r(49015),r(61889),r(58457),r(44057),r(94702)),l=r(37574);const s=e=>{let{value:t,placeholder:r,disabled:n=!1,type:s,style:c,onValueChange:d,onMouseUp:h,onBlur:u}=e;const g=(0,o.Z)();return(0,l.jsx)(a(),{disabled:n,value:t,placeholder:r,highlight:e=>(0,i.highlight)(e,"json"===s?i.languages.json:i.languages.js),padding:10,onValueChange:d,onMouseUp:h,onBlur:u,tabSize:4,style:{...c,background:g.palette.codeEditor.main},textareaClassName:"editor__textarea"})}},94677:(e,t,r)=>{r.d(t,{d:()=>s});var n=r(45304),a=r.n(n),i=r(73835),o=(r(49015),r(61889),r(58457),r(44057),r(94702)),l=r(37574);const s=e=>{let{value:t,placeholder:r,disabled:n=!1,type:s,style:c,onValueChange:d,onMouseUp:h,onBlur:u}=e;const g=(0,o.Z)();return(0,l.jsx)(a(),{disabled:n,value:t,placeholder:r,highlight:e=>(0,i.highlight)(e,"json"===s?i.languages.json:i.languages.js),padding:10,onValueChange:d,onMouseUp:h,onBlur:u,tabSize:4,style:{...c,background:g.palette.card.main},textareaClassName:"editor__textarea"})}},33926:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(30969),a=r(69405),i=r(47379),o=r(2383);let l=[];const s=()=>{const e=(0,a.I0)(),t=(0,a.v9)((e=>e.notifier)),{notifications:r}=t,{enqueueSnackbar:s,closeSnackbar:c}=(0,i.Ds)();n.useEffect((()=>{r.forEach((t=>{let{key:r,message:n,options:a={},dismissed:i=!1}=t;var d;i?c(r):l.includes(r)||(s(n,{key:r,...a,onClose:(e,t,r)=>{a.onClose&&a.onClose(e,t,r)},onExited:(t,r)=>{var n;e((0,o.PN)(r)),n=r,l=[...l.filter((e=>n!==e))]}}),d=r,l=[...l,d])}))}),[r,c,s,e])}}}]);
//# sourceMappingURL=7774.b740fe3f.chunk.js.map