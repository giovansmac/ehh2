"use strict";(self.webpackChunkflowise_ui=self.webpackChunkflowise_ui||[]).push([[3047],{6754:e=>{function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var i=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"===typeof r&&!r(e))return e;for(var o,u=i.length;-1!==t.code.indexOf(o=n(a,u));)++u;return i[u]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function i(u){for(var s=0;s<u.length&&!(o>=r.length);s++){var c=u[s];if("string"===typeof c||c.content&&"string"===typeof c.content){var l=r[o],p=t.tokenStack[l],f="string"===typeof c?c:c.content,g=n(a,l),k=f.indexOf(g);if(k>-1){++o;var h=f.substring(0,k),m=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),d=f.substring(k+g.length),y=[];h&&y.push.apply(y,i([h])),y.push(m),d&&y.push.apply(y,i([d])),"string"===typeof c?u.splice.apply(u,[s,1].concat(y)):c.content=y}}else c.content&&i(c.content)}return u}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.8a5de8f9.chunk.js.map