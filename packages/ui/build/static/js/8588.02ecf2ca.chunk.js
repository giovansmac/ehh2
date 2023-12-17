"use strict";(self.webpackChunkflowise_ui=self.webpackChunkflowise_ui||[]).push([[8588],{50612:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(23917);const n={getAllAssistants:()=>a.Z.get("/assistants"),getSpecificAssistant:e=>a.Z.get("/assistants/".concat(e)),getAssistantObj:(e,t)=>a.Z.get("/openai-assistants/".concat(e,"?credential=").concat(t)),getAllAvailableAssistants:e=>a.Z.get("/openai-assistants?credential=".concat(e)),createNewAssistant:e=>a.Z.post("/assistants",e),updateAssistant:(e,t)=>a.Z.put("/assistants/".concat(e),t),deleteAssistant:(e,t)=>t?a.Z.delete("/assistants/".concat(e,"?isDeleteBoth=true")):a.Z.delete("/assistants/".concat(e))}},7276:(e,t,s)=>{s.d(t,{O:()=>j});var a=s(30969),n=s(69405),i=s(95803),o=s.n(i),l=s(57203),r=s(22083),c=s(2847),d=s(98483),p=s(94267),u=s(38361),h=s(47915),x=s(45971),m=s(42586),g=s(11021),v=s(37574);const f=(0,x.ZP)(c.Z)({boxShadow:"0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",borderRadius:"10px",["& .".concat(l.Z.listbox)]:{boxSizing:"border-box","& ul":{padding:10,margin:10}}}),j=e=>{let{name:t,nodeData:s,value:i,onSelect:l,isCreateNewOption:c,onCreateNew:x,credentialNames:j=[],disabled:y=!1,disableClearable:b=!1}=e;const Z=(0,n.v9)((e=>e.customization)),[w,S]=(0,a.useState)(!1),[C,A]=(0,a.useState)([]),[D,k]=(0,a.useState)(!1),N=[{label:"- Create New -",name:"-create-"}];let[I,T]=(0,a.useState)(null!==i&&void 0!==i?i:"choose an option");return(0,a.useEffect)((()=>{k(!0),(async()=>{(async()=>{let e=j.length?await(async()=>{try{let e="";e=j.length>1?j.join("&credentialName="):j[0];const t=await m.Z.getCredentialsByName(e);if(t.data){const e=[];for(let s=0;s<t.data.length;s+=1){const a={label:t.data[s].name,name:t.data[s].id};e.push(a)}return e}}catch(e){console.error(e)}})():await(async e=>{var t;let{name:s,nodeData:a}=e;const n=null===(t=a.inputParams.find((e=>e.name===s)))||void 0===t?void 0:t.loadMethod,i=localStorage.getItem("username"),l=localStorage.getItem("password");return await o().post("".concat(g.v2,"/api/v1/node-load-method/").concat(a.name),{...a,loadMethod:n},{auth:i&&l?{username:i,password:l}:void 0}).then((async function(e){return e.data})).catch((function(e){console.error(e)}))})({name:t,nodeData:s});A(c?[...e,...N]:[...e]),k(!1)})()})()}),[]),(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(r.Z,{id:t,disabled:y,disableClearable:b,size:"small",sx:{width:"100%"},open:w,onOpen:()=>{S(!0)},onClose:()=>{S(!1)},options:C,value:function(){let e=arguments.length>1?arguments[1]:void 0;return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).find((t=>t.name===e))}(C,I)||"",onChange:(e,t)=>{const s=t?t.name:"";c&&"-create-"===s?x():(T(s),l(s))},PopperComponent:f,loading:D,renderInput:e=>(0,v.jsx)(d.Z,{...e,value:I,InputProps:{...e.InputProps,endAdornment:(0,v.jsxs)(a.Fragment,{children:[D?(0,v.jsx)(p.Z,{color:"inherit",size:20}):null,e.InputProps.endAdornment]})}}),renderOption:(e,t)=>(0,v.jsx)(u.Z,{component:"li",...e,children:(0,v.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,v.jsx)(h.Z,{variant:"h5",children:t.label}),t.description&&(0,v.jsx)(h.Z,{sx:{color:Z.isDarkMode?"#9e9e9e":""},children:t.description})]})})})})}},95550:(e,t,s)=>{s.d(t,{j:()=>m});var a=s(30969),n=s(69405),i=s(2847),o=s(39494),l=s(98483),r=s(38361),c=s(47915),d=s(57203),p=s(22083),u=s(45971),h=s(37574);const x=(0,u.ZP)(i.Z)({boxShadow:"0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)",borderRadius:"10px",["& .".concat(d.Z.listbox)]:{boxSizing:"border-box","& ul":{padding:10,margin:10}}}),m=e=>{let{name:t,value:s,options:i,onSelect:d,formControlSx:u={},disabled:m=!1,disableClearable:g=!1}=e;const v=(0,n.v9)((e=>e.customization));let[f,j]=(0,a.useState)(null!==s&&void 0!==s?s:[]);return(0,h.jsx)(o.Z,{sx:{mt:1,width:"100%",...u},size:"small",children:(0,h.jsx)(p.Z,{id:t,disabled:m,disableClearable:g,size:"small",multiple:!0,filterSelectedOptions:!0,options:i||[],value:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,s=[];return s=t&&"string"===typeof t?JSON.parse(t):t,e.filter((e=>s.includes(e.name)))}(i,f)||[],onChange:(e,t)=>{let s="";if(t.length){const e=[];for(let s=0;s<t.length;s+=1)e.push(t[s].name);s=JSON.stringify(e)}j(s),d(s)},PopperComponent:x,renderInput:e=>(0,h.jsx)(l.Z,{...e,value:f}),renderOption:(e,t)=>(0,h.jsx)(r.Z,{component:"li",...e,children:(0,h.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,h.jsx)(c.Z,{variant:"h5",children:t.label}),t.description&&(0,h.jsx)(c.Z,{sx:{color:v.isDarkMode?"#9e9e9e":""},children:t.description})]})})})})}},10571:(e,t,s)=>{s.d(t,{$:()=>d});var a=s(30969),n=s(94702),i=s(39494),o=s(46138),l=s(49009),r=s(86115),c=s(37574);const d=e=>{let{value:t,fileType:s,onChange:d,disabled:p=!1}=e;const u=(0,n.Z)(),[h,x]=(0,a.useState)(null!==t&&void 0!==t?t:"");return(0,c.jsxs)(i.Z,{sx:{mt:1,width:"100%"},size:"small",children:[(0,c.jsx)("span",{style:{fontStyle:"italic",color:u.palette.grey[800],marginBottom:"1rem"},children:h?(0,r.UO)(h):"Choose a file to upload"}),(0,c.jsxs)(o.Z,{disabled:p,variant:"outlined",component:"label",fullWidth:!0,startIcon:(0,c.jsx)(l.bCE,{}),sx:{marginRight:"1rem"},children:["Upload File",(0,c.jsx)("input",{type:"file",multiple:!0,accept:s,hidden:!0,onChange:e=>(async e=>{if(e.target.files)if(1===e.target.files.length){const t=e.target.files[0],{name:s}=t,a=new FileReader;a.onload=e=>{var t;if(null===e||void 0===e||null===(t=e.target)||void 0===t||!t.result)return;const{result:a}=e.target,n=a+",filename:".concat(s);x(n),d(n)},a.readAsDataURL(t)}else if(e.target.files.length>0){let t=Array.from(e.target.files).map((e=>{const t=new FileReader,{name:s}=e;return new Promise((a=>{t.onload=e=>{var t;if(null===e||void 0===e||null===(t=e.target)||void 0===t||!t.result)return;const{result:n}=e.target,i=n+",filename:".concat(s);a(i)},t.readAsDataURL(e)}))}));const s=await Promise.all(t);x(JSON.stringify(s)),d(JSON.stringify(s))}})(e)})]})]})}},48588:(e,t,s)=>{s.d(t,{Z:()=>O});var a=s(15749),n=s(30969),i=s(69405),o=s(2383),l=s(38859),r=s(46138),c=s(48886),d=s(38357),p=s(87130),u=s(38361),h=s(25139),x=s(47915),m=s(33656),g=s(91243),v=s(91862),f=s(52312),j=s(97251),y=s(34061),b=s(95550),Z=s(76387),w=s(10571),S=s(72795),C=s(37574);const A=e=>{let{show:t,dialogProps:s,onCancel:n,onDelete:i,onDeleteBoth:o}=e;const l=document.getElementById("portal"),u=t?(0,C.jsxs)(c.Z,{fullWidth:!0,maxWidth:"xs",open:t,onClose:n,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,C.jsx)(d.Z,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:s.title}),(0,C.jsxs)(p.Z,{children:[(0,C.jsx)("span",{children:s.description}),(0,C.jsxs)("div",{style:{display:"flex",flexDirection:"column",marginTop:20},children:[(0,C.jsx)(f.S,{sx:{mb:1},color:"orange",variant:"contained",onClick:i,children:"Delete only from Flowise"}),(0,C.jsx)(f.S,{sx:{mb:1},color:"error",variant:"contained",onClick:o,children:"Delete from both OpenAI and Flowise"}),(0,C.jsx)(r.Z,{onClick:n,children:s.cancelButtonName})]})]})]}):null;return(0,a.createPortal)(u,l)};var D=s(49009),k=s(50612),N=s(60990),I=s(33926);const T=[{label:"gpt-4-1106-preview",name:"gpt-4-1106-preview"},{label:"gpt-4-0613",name:"gpt-4-0613"},{label:"gpt-4-0314",name:"gpt-4-0314"},{label:"gpt-4",name:"gpt-4"},{label:"gpt-3.5-turbo",name:"gpt-3.5-turbo"},{label:"gpt-3.5-turbo-1106",name:"gpt-3.5-turbo-1106"},{label:"gpt-3.5-turbo-0613",name:"gpt-3.5-turbo-0613"},{label:"gpt-3.5-turbo-16k",name:"gpt-3.5-turbo-16k"},{label:"gpt-3.5-turbo-16k-0613",name:"gpt-3.5-turbo-16k-0613"}],O=e=>{let{show:t,dialogProps:s,onCancel:O,onConfirm:P}=e;const L=document.getElementById("portal");(0,I.Z)();const B=(0,i.I0)(),F=function(){return B((0,o.yv)(...arguments))},E=function(){return B((0,o.sy)(...arguments))},M=(0,N.Z)(k.Z.getSpecificAssistant),R=(0,N.Z)(k.Z.getAssistantObj),[z,J]=(0,n.useState)(""),[W,_]=(0,n.useState)(""),[H,q]=(0,n.useState)(""),[U,G]=(0,n.useState)(""),[$,K]=(0,n.useState)("https://api.dicebear.com/7.x/bottts/svg?seed=".concat((0,l.Z)())),[X,Y]=(0,n.useState)(""),[Q,V]=(0,n.useState)(""),[ee,te]=(0,n.useState)(""),[se,ae]=(0,n.useState)(["code_interpreter","retrieval"]),[ne,ie]=(0,n.useState)([]),[oe,le]=(0,n.useState)(""),[re,ce]=(0,n.useState)(!1),[de,pe]=(0,n.useState)(!1),[ue,he]=(0,n.useState)({});(0,n.useEffect)((()=>(B(t?{type:o.tS}:{type:o.Go}),()=>B({type:o.Go}))),[t,B]),(0,n.useEffect)((()=>{if(M.data){var e,t;J(M.data.id),K(M.data.iconSrc),V(M.data.credential);const s=JSON.parse(M.data.details);_(s.id),q(s.name),G(s.description),Y(s.model),te(s.instructions),ae(null!==(e=s.tools)&&void 0!==e?e:[]),ie(null!==(t=s.files)&&void 0!==t?t:[])}}),[M.data]),(0,n.useEffect)((()=>{R.data&&xe(R.data)}),[R.data]),(0,n.useEffect)((()=>{if("EDIT"===s.type&&s.data){var e,t;J(s.data.id),K(s.data.iconSrc),V(s.data.credential);const a=JSON.parse(s.data.details);_(a.id),q(a.name),G(a.description),Y(a.model),te(a.instructions),ae(null!==(e=a.tools)&&void 0!==e?e:[]),ie(null!==(t=a.files)&&void 0!==t?t:[])}else"EDIT"===s.type&&s.assistantId?M.request(s.assistantId):"ADD"===s.type&&s.selectedOpenAIAssistantId&&s.credential?(J(""),K("https://api.dicebear.com/7.x/bottts/svg?seed=".concat((0,l.Z)())),V(s.credential),R.request(s.selectedOpenAIAssistantId,s.credential)):"ADD"!==s.type||s.selectedOpenAIAssistantId||(J(""),K("https://api.dicebear.com/7.x/bottts/svg?seed=".concat((0,l.Z)())),V(""),_(""),q(""),G(""),Y(""),te(""),ae(["code_interpreter","retrieval"]),le(""),ie([]));return()=>{J(""),K("https://api.dicebear.com/7.x/bottts/svg?seed=".concat((0,l.Z)())),V(""),_(""),q(""),G(""),Y(""),te(""),ae(["code_interpreter","retrieval"]),le(""),ie([]),ce(!1)}}),[s]);const xe=e=>{var t;_(e.id),q(e.name),G(e.description),Y(e.model),te(e.instructions),ie(null!==(t=e.files)&&void 0!==t?t:[]);let s=[];if(e.tools&&e.tools.length)for(const a of e.tools)s.push(a.type);ae(s)},me=async e=>{pe(!1);try{(await k.Z.deleteAssistant(z,e)).data&&(F({message:"Assistant deleted",options:{key:(new Date).getTime()+Math.random(),variant:"success",action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),P())}catch(t){const e=t.response.data||"".concat(t.response.status,": ").concat(t.response.statusText);F({message:"Failed to delete Assistant: ".concat(e),options:{key:(new Date).getTime()+Math.random(),variant:"error",persist:!0,action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),O()}},ge=t?(0,C.jsxs)(c.Z,{fullWidth:!0,maxWidth:"md",open:t,onClose:O,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,C.jsx)(d.Z,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:s.title}),(0,C.jsxs)(p.Z,{children:[(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Assistant Name",(0,C.jsx)(j.H,{style:{marginLeft:10},title:"The name of the assistant. The maximum length is 256 characters."})]})}),(0,C.jsx)(m.Z,{id:"assistantName",type:"string",fullWidth:!0,placeholder:"My New Assistant",value:H,name:"assistantName",onChange:e=>q(e.target.value)})]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Assistant Description",(0,C.jsx)(j.H,{style:{marginLeft:10},title:"The description of the assistant. The maximum length is 512 characters."})]})}),(0,C.jsx)(m.Z,{id:"assistantDesc",type:"string",fullWidth:!0,placeholder:"Description of what the Assistant does",multiline:!0,rows:3,value:U,name:"assistantDesc",onChange:e=>G(e.target.value)})]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsx)(x.Z,{variant:"overline",children:"Assistant Icon Src"})}),(0,C.jsx)("div",{style:{width:100,height:100,borderRadius:"50%",backgroundColor:"white"},children:(0,C.jsx)("img",{style:{width:"100%",height:"100%",padding:5,borderRadius:"50%",objectFit:"contain"},alt:H,src:$})}),(0,C.jsx)(m.Z,{id:"assistantIcon",type:"string",fullWidth:!0,placeholder:"https://api.dicebear.com/7.x/bottts/svg?seed=".concat((0,l.Z)()),value:$,name:"assistantIcon",onChange:e=>K(e.target.value)})]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Assistant Model",(0,C.jsx)("span",{style:{color:"red"},children:"\xa0*"})]})}),(0,C.jsx)(y.L,{name:X,options:T,onSelect:e=>Y(e),value:null!==X&&void 0!==X?X:"choose an option"},X)]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["OpenAI Credential",(0,C.jsx)("span",{style:{color:"red"},children:"\xa0*"})]})}),(0,C.jsx)(Z.Z,{data:Q?{credential:Q}:{},inputParam:{label:"Connect Credential",name:"credential",type:"credential",credentialNames:["openAIApi"]},onSelect:e=>V(e)},Q)]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Assistant Instruction",(0,C.jsx)(j.H,{style:{marginLeft:10},title:"The system instructions that the assistant uses. The maximum length is 32768 characters."})]})}),(0,C.jsx)(m.Z,{id:"assistantInstructions",type:"string",fullWidth:!0,placeholder:"You are a personal math tutor. When asked a question, write and run Python code to answer the question.",multiline:!0,rows:3,value:ee,name:"assistantInstructions",onChange:e=>te(e.target.value)})]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Assistant Tools",(0,C.jsx)(j.H,{style:{marginLeft:10},title:"A list of tool enabled on the assistant. There can be a maximum of 128 tools per assistant."})]})}),(0,C.jsx)(b.j,{name:JSON.stringify(se),options:[{label:"Code Interpreter",name:"code_interpreter"},{label:"Retrieval",name:"retrieval"}],onSelect:e=>ae(e?JSON.parse(e):[]),value:null!==se&&void 0!==se?se:"choose an option"},JSON.stringify(se))]}),(0,C.jsxs)(u.Z,{sx:{p:2},children:[(0,C.jsx)(h.Z,{sx:{position:"relative"},direction:"row",children:(0,C.jsxs)(x.Z,{variant:"overline",children:["Knowledge Files",(0,C.jsx)(j.H,{style:{marginLeft:10},title:"Allow assistant to use the content from uploaded files for retrieval and code interpreter. MAX: 20 files"})]})}),(0,C.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:ne.map(((e,t)=>(0,C.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",width:"max-content",height:"max-content",borderRadius:15,background:"rgb(254,252,191)",paddingLeft:15,paddingRight:15,paddingTop:5,paddingBottom:5,marginRight:10},children:[(0,C.jsx)("span",{style:{color:"rgb(116,66,16)",marginRight:10},children:e.filename}),(0,C.jsx)(g.Z,{sx:{height:15,width:15,p:0},onClick:()=>(async e=>{ie(ne.filter((t=>t.id!==e)))})(e.id),children:(0,C.jsx)(D.kLi,{})})]},t)))}),(0,C.jsx)(w.$,{fileType:"*",onChange:e=>le(e),value:null!==oe&&void 0!==oe?oe:"Choose a file to upload"},oe)]})]}),(0,C.jsxs)(v.Z,{children:["EDIT"===s.type&&(0,C.jsx)(f.S,{color:"secondary",variant:"contained",onClick:()=>(async()=>{ce(!0);try{const e=await k.Z.getAssistantObj(W,Q);e.data&&(xe(e.data),F({message:"Assistant successfully synced!",options:{key:(new Date).getTime()+Math.random(),variant:"success",action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}})),ce(!1)}catch(e){const t=e.response.data||"".concat(e.response.status,": ").concat(e.response.statusText);F({message:"Failed to sync Assistant: ".concat(t),options:{key:(new Date).getTime()+Math.random(),variant:"error",persist:!0,action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),ce(!1)}})(),children:"Sync"}),"EDIT"===s.type&&(0,C.jsx)(f.S,{color:"error",variant:"contained",onClick:()=>(he({title:"Delete Assistant",description:"Delete Assistant ".concat(H,"?"),cancelButtonName:"Cancel"}),void pe(!0)),children:"Delete"}),(0,C.jsx)(f.S,{disabled:!(X&&Q),variant:"contained",onClick:()=>"ADD"===s.type?(async()=>{ce(!0);try{const e={id:W,name:H,description:U,model:X,instructions:ee,tools:se,files:ne,uploadFiles:oe},t={details:JSON.stringify(e),iconSrc:$,credential:Q},s=await k.Z.createNewAssistant(t);s.data&&(F({message:"New Assistant added",options:{key:(new Date).getTime()+Math.random(),variant:"success",action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),P(s.data.id)),ce(!1)}catch(e){const t=e.response.data||"".concat(e.response.status,": ").concat(e.response.statusText);F({message:"Failed to add new Assistant: ".concat(t),options:{key:(new Date).getTime()+Math.random(),variant:"error",persist:!0,action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),ce(!1),O()}})():(async()=>{ce(!0);try{const e={name:H,description:U,model:X,instructions:ee,tools:se,files:ne,uploadFiles:oe},t={details:JSON.stringify(e),iconSrc:$,credential:Q},s=await k.Z.updateAssistant(z,t);s.data&&(F({message:"Assistant saved",options:{key:(new Date).getTime()+Math.random(),variant:"success",action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),P(s.data.id)),ce(!1)}catch(e){const t=e.response.data||"".concat(e.response.status,": ").concat(e.response.statusText);F({message:"Failed to save Assistant: ".concat(t),options:{key:(new Date).getTime()+Math.random(),variant:"error",persist:!0,action:e=>(0,C.jsx)(r.Z,{style:{color:"white"},onClick:()=>E(e),children:(0,C.jsx)(D.kLi,{})})}}),ce(!1),O()}})(),children:s.confirmButtonName})]}),(0,C.jsx)(A,{show:de,dialogProps:ue,onCancel:()=>pe(!1),onDelete:()=>me(),onDeleteBoth:()=>me(!0)}),re&&(0,C.jsx)(S.E,{open:re})]}):null;return(0,a.createPortal)(ge,L)}},76387:(e,t,s)=>{s.d(t,{Z:()=>p});var a=s(30969),n=s(91243),i=s(49009),o=s(7276),l=s(55878),r=s(76003),c=s(42586),d=s(37574);const p=e=>{var t;let{inputParam:s,data:p,onSelect:u,disabled:h=!1}=e;const x=(0,a.useRef)(null),[m,g]=(0,a.useState)(null!==(t=null===p||void 0===p?void 0:p.credential)&&void 0!==t?t:""),[v,f]=(0,a.useState)(!1),[j,y]=(0,a.useState)({}),[b,Z]=(0,a.useState)(!1),[w,S]=(0,a.useState)({}),[C,A]=(0,a.useState)(Date.now().toString());return(0,d.jsxs)("div",{ref:x,children:[s&&(0,d.jsx)(d.Fragment,{children:"credential"===s.type&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{marginTop:10}}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,d.jsx)(o.O,{disabled:h,name:s.name,nodeData:p,value:null!==m&&void 0!==m?m:"choose an option",isCreateNewOption:!0,credentialNames:s.credentialNames,onSelect:e=>{g(e),u(e)},onCreateNew:()=>(async()=>{try{let e="";e=s.credentialNames.length>1?s.credentialNames.join("&"):s.credentialNames[0];const t=await c.Z.getSpecificComponentCredential(e);if(t.data)if(Array.isArray(t.data)){const e={title:"Add New Credential",componentsCredentials:t.data};y(e),f(!0)}else{const e={type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add",credentialComponent:t.data};S(e),Z(!0)}}catch(e){console.error(e)}})(s.name)}),m&&(0,d.jsx)(n.Z,{title:"Edit",color:"primary",size:"small",onClick:()=>(e=>{S({type:"EDIT",cancelButtonName:"Cancel",confirmButtonName:"Save",credentialId:e}),Z(!0)})(m),children:(0,d.jsx)(i.yl5,{})})]},C)]})}),b&&(0,d.jsx)(l.Z,{show:b,dialogProps:w,onCancel:()=>Z(!1),onConfirm:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";g(e),A(Date.now().toString()),S({}),Z(!1),u(e)}}),v&&(0,d.jsx)(r.Z,{show:v,dialogProps:j,onCancel:()=>f(!1),onCredentialSelected:e=>{f(!1);S({type:"ADD",cancelButtonName:"Cancel",confirmButtonName:"Add",credentialComponent:e}),Z(!0)}})]})}}}]);
//# sourceMappingURL=8588.02ecf2ca.chunk.js.map