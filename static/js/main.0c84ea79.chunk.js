(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,a){},107:function(e,t,a){},225:function(e,t,a){},246:function(e,t,a){},248:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(82),o=a.n(i),s=(a(97),a(6)),l=a(7),c=a(10),m=a(8),u=a(9),p=a(250),d=a(249),h=(a(99),a(20)),b=a(251),f=a(18),g=(a(105),a(85)),v=a.n(g),y=a(86),w=a.n(y),E=(a(107),function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={sortType:""},a.handleChange=function(e){a.props.updateQuery(e.target.value)},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"config-container "+this.props.isActive},n.a.createElement("div",{className:"opt-cell"},n.a.createElement("div",{className:"item-cell"},n.a.createElement("span",null,"Sort by:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("input",{onChange:this.handleChange,className:"check-with-sortby",value:"hot",name:"sortby",type:"radio",id:"hot",defaultChecked:!0}),n.a.createElement("label",{className:"sortby-for-check",htmlFor:"hot"},"Hot")),n.a.createElement("li",null,n.a.createElement("input",{onChange:this.handleChange,className:"check-with-sortby",value:"new",name:"sortby",type:"radio",id:"new"}),n.a.createElement("label",{className:"sortby-for-check",htmlFor:"new"},"New")),n.a.createElement("li",null,n.a.createElement("input",{onChange:this.handleChange,className:"check-with-sortby",value:"rising",name:"sortby",type:"radio",id:"rising"}),n.a.createElement("label",{className:"sortby-for-check",htmlFor:"rising"},"Rising")),n.a.createElement("li",null,n.a.createElement("input",{onChange:this.handleChange,className:"check-with-sortby",value:"controversial",name:"sortby",type:"radio",id:"controversial"}),n.a.createElement("label",{className:"sortby-for-check",htmlFor:"controversial"},"Controversial")),n.a.createElement("li",null,n.a.createElement("input",{onChange:this.handleChange,className:"check-with-sortby",value:"top",name:"sortby",type:"radio",id:"top"}),n.a.createElement("label",{className:"sortby-for-check",htmlFor:"top"},"Top")))),n.a.createElement("div",{style:{display:"none"},className:"item-cell"},n.a.createElement("span",null,"Limit Image Draw n\xba:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("input",{type:"text"})),n.a.createElement("span",null,'Max 100 items (onKeyDown="sendSearch()") ')))))}}]),t}(r.Component)),N=Object(f.b)(null,function(e){return{updateQuery:function(t){e({type:"UPDATE_SORT",sortBy:t})}}})(E),k=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={isActive:"inactive",subreddit:""},a.hideConfig=function(){"inactive"===a.state.isActive?a.setState({isActive:"active"}):a.setState({isActive:"inactive"})},a.storeSubreddit=function(e){var t=document.getElementById("subreddit-input").value;a.props.updateQuery(t)},a.redirectTo=function(e){e.preventDefault(),window.location.href="/"+a.props.query.subreddit+"/"+a.props.query.sortBy,console.log(Object(h.a)(Object(h.a)(a)))},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{id:"SearchBar"},n.a.createElement("form",{onSubmit:this.redirectTo,id:"search-cell"},n.a.createElement("input",{id:"subreddit-input",autoComplete:"off",onChange:this.storeSubreddit,type:"text",className:"search-input",placeholder:"Search subreddit..."}),n.a.createElement("img",{onClick:this.redirectTo,src:v.a,alt:"none"}),n.a.createElement("img",{onClick:this.hideConfig,src:w.a,alt:"none"})),n.a.createElement(N,{isActive:this.state.isActive}))}}]),t}(r.Component),O=Object(f.b)(function(e){return{query:e}},function(e){return{updateQuery:function(t){e({type:"UPDATE_SEARCH",subreddit:t})}}})(Object(b.a)(k)),j=a(89),C=a.n(j),x=a(49),S=a.n(x),A=a(50),D=a.n(A),B=a(90),P=a.n(B),_=(a(225),function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={handlers:["v.redd.it","gfycat.com","clips.twitch.tv","youtube.com","youtu.be","streamable.com","i.imgur.com","pornhub.com","youporn.com"]},a.embedData=function(e,t){if(!t.includes(e.domain)&&void 0!==e.preview)return n.a.createElement("img",{src:e.preview.images[0].source.url,style:{width:"1500px"},alt:""});if("i.imgur.com"===e.domain&&"png"===e.url.split(".").slice(-1)[0])return n.a.createElement("img",{src:e.preview.images[0].source.url,style:{maxWidth:"auto",width:"1500px",height:"auto"},alt:""});if("i.imgur.com"===e.domain&&"jpg"===e.url.split(".").slice(-1)[0])return n.a.createElement("img",{src:e.preview.images[0].source.url,style:{maxWidth:"auto",width:"1500px",height:"auto"},alt:""});if("i.imgur.com"===e.domain&&"gifv"===e.url.split(".").slice(-1)[0])return n.a.createElement("video",{preload:"auto",autoplay:"autoPlay",muted:"muted",loop:"loop",style:{width:"1500px",maxHeight:"500px"},"webkit-playsinline":""},n.a.createElement("source",{src:"//i.imgur.com/"+e.url.split("/").slice(-1)[0].split(".")[0]+".mp4",type:"video/mp4"}));if("youtube.com"===e.domain||"youtu.be"===e.domain)return n.a.createElement("iframe",{className:"youtube-embed",src:"https://www.youtube.com/embed/"+e.media.oembed.thumbnail_url.split("/")[4],frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",title:"youtube",allowFullScreen:!0,style:{width:"1500px",maxHeight:"auto",height:"1500px"}});switch(e.domain){case"v.redd.it":return n.a.createElement("video",{controls:!0,autoPlay:!0,loop:!0,src:e.secure_media.reddit_video.fallback_url,style:{width:"100%",height:"100%",maxHeight:"500px"}});case"clips.twitch.tv":return n.a.createElement("iframe",{className:"twitch-embed",title:"twitch",src:"https://clips.twitch.tv/embed?clip="+e.url.split("/").slice(-1)[0],frameBorder:"0",allowFullScreen:"true",width:"1500px",height:"300px"});case"streamable.com":return n.a.createElement("iframe",{className:"stream-embed",title:"stream",src:"https://streamable.com/s/"+e.url.split("/").slice(-1)[0],frameBorder:"0",width:"1500px",height:"300",allowFullScreen:!0});case"gfycat.com":return n.a.createElement("iframe",{className:"gfycat-embed",title:"gfycat",src:"https://gfycat.com/ifr/"+e.url.split("/").slice(-1)[0],frameBorder:"0",allowFullScreen:!0,width:"1500px",height:"300px"});case"pornhub.com":return n.a.createElement("iframe",{className:"pornhub-embed",title:"pornhub",src:"https://pt.pornhub.com/embed/"+e.url.split("?")[1].split("=")[1].split("&")[0],frameBorder:"0",width:"1500px",allowFullScreen:!0});case"youporn.com":return n.a.createElement("iframe",{className:"youporn-embed",title:"youporn",src:"https://www.youporn.com/embed/"+e.url.split("/")[4],frameBorder:"0",width:"1500px",allowFullScreen:!0});default:return null}},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"details-container "+this.props.postData.isActive},n.a.createElement("img",{onClick:this.props.hideOverlay,className:"closeBtn",src:P.a,alt:"Close Button"}),n.a.createElement("div",{id:"details"},n.a.createElement("div",{className:"ref-links"},n.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.reddit.com"+this.props.postData.post.permalink},"Visit Post"),n.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:this.props.postData.post.url},"Visit Link")),n.a.createElement("a",{className:"sub-name",target:"_blank",rel:"noopener noreferrer",href:"https://www.reddit.com/r/"+this.props.postData.post.subreddit},n.a.createElement("h1",null,"r/",this.props.postData.post.subreddit)),n.a.createElement("p",{className:"author-name"},"by: ",n.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.reddit.com/u/"+this.props.postData.post.author},"u/",this.props.postData.post.author)," - from ",this.props.postData.post.domain),n.a.createElement("p",{className:"title"},this.props.postData.post.title),n.a.createElement("div",{className:"embedded-cell"},this.embedData(this.props.postData.post,this.state.handlers)),n.a.createElement("span",{className:"stats"},"Upvotes (",this.props.postData.post.ups,") - Comments (",this.props.postData.post.num_comments,")")))}}]),t}(r.Component)),F=a(51),T=a.n(F),W=(a(246),function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).state={posts:[],url:"https://www.reddit.com/r/all.json?raw_json=1&limit=65"+a.props.location.search.replace("?","&"),masonryOptions:{transitionDuration:400},selectedData:{isActive:"inactive",post:{}},visibleArrow:"invisible",errorMsg:""},a.componentDidMount=function(){var e=a.props.location,t="Could not retrieve posts. Please, try again.";"/"===e.pathname?T.a.get(a.state.url).then().then(function(e){a.setState({posts:e.data.data.children,visibleArrow:"visible"})}).catch(function(){return a.setState({errorMsg:t})}):T.a.get("https://www.reddit.com/r"+e.pathname+".json?raw_json=1&limit=65"+a.props.location.search.replace("?","&")).then(function(e){a.setState({posts:e.data.data.children,visibleArrow:"visible"})}).catch(function(){return a.setState({errorMsg:t})})},a.goPreviousPage=function(){var e=a.props.location.pathname,t=a.state.posts[0].data.name;window.location.href=e+"?before="+t},a.goNextPage=function(){var e=a.props.location.pathname,t=a.state.posts.slice(-1)[0].data.name;window.location.href=e+"?after="+t},a.showOverlay=function(e){a.setState({selectedData:{isActive:"active",post:e}})},a.hideOverlay=function(){a.setState({selectedData:{isActive:"inactive",post:""}})},a.isNSFW=function(e){return!0===e.over_18?"blur":""},a.NSFWFlag=function(e){return!0===e.over_18?n.a.createElement("span",{className:"flag nsfw",style:{backgroundColor:"#9e2f2fcc"}},"nsfw"):""},a.dataType=function(e){var t=e.url.split(".").slice(-1)[0],a={image:["i.redd.it","imgur.com"],video:["v.redd.it","youtu.be","youtube.com","clips.twitch.tv","streamable.com","pornhub.com","youporn.com"],gif:["gfycat.com"]};if(a.gif.includes(e.domain))return"gif";if(a.video.includes(e.domain))return"video";if(a.image.includes(e.domain))return"image";switch(t){case"gifv":case"gif":return"gif";case"jpg":case"png":return"image";default:return"ex-img"}},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.posts.map(function(t){return"self"!==t.data.domain.split(".")[0]&&void 0!==t.data.preview?n.a.createElement("div",{key:t.data.name,className:"post-cell"},n.a.createElement("div",{className:"image"},n.a.createElement("span",{className:"flag data-type",style:{backgroundColor:S()({luminosity:"dark",format:"rgba",alpha:.8})}},e.dataType(t.data)),e.NSFWFlag(t.data),n.a.createElement("img",{src:t.data.preview.images[0].source.url,className:"image-cell ",alt:"Post:"+t.data.title.substr(0,20)})),n.a.createElement("div",{className:"post-overlay",onClick:function(){return e.showOverlay(t.data)},style:{backgroundColor:S()({luminosity:"dark",format:"rgba",alpha:.8})}},n.a.createElement("div",{className:"post-details"},n.a.createElement("h1",null,"r/",t.data.subreddit),n.a.createElement("span",null,t.data.title.substr(0,80),"..."),n.a.createElement("h2",null,t.data.domain)))):null});return n.a.createElement("div",{id:"main-container"},n.a.createElement("p",{className:"error-message"},this.state.errorMsg),n.a.createElement(_,{postData:this.state.selectedData,hideOverlay:this.hideOverlay}),n.a.createElement("img",{onClick:this.goPreviousPage,src:D.a,alt:"Previous Page",className:"previous-btn arrow "+this.state.visibleArrow}),n.a.createElement("img",{onClick:this.goNextPage,src:D.a,alt:"Next Page",className:"next-btn arrow "+this.state.visibleArrow}),n.a.createElement(C.a,{id:"posts-container",elementType:"div",options:this.state.masonryOptions,disableImagesLoaded:!1,updateOnEachImageLoad:!0},t))}}]),t}(r.Component)),H=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement(p.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("a",{id:"logo-anchor",target:"_blank",rel:"noopener noreferrer",href:"https://www.github.com/tsuna2221"},n.a.createElement("div",{id:"page-logo"})),n.a.createElement(O,null),n.a.createElement(d.a,{path:"/",component:W})))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=a(30),I={subreddit:"",sortBy:""},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;return"UPDATE_SEARCH"===t.type&&(I.subreddit=t.subreddit,console.log(I.subreddit)),"UPDATE_SORT"===t.type&&(I.sortBy=t.sortBy,console.log(I.sortBy)),e},U=Object(M.b)(R);o.a.render(n.a.createElement(f.a,{store:U},n.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},50:function(e,t,a){e.exports=a.p+"static/media/Arrow.9e006c7a.svg"},85:function(e,t,a){e.exports=a.p+"static/media/SubmitSearch.fe56f6da.svg"},86:function(e,t,a){e.exports=a.p+"static/media/SettingsButton.15c7ebf3.svg"},90:function(e,t,a){e.exports=a.p+"static/media/CloseButton.80979d47.svg"},92:function(e,t,a){e.exports=a(248)},97:function(e,t,a){},99:function(e,t,a){}},[[92,2,1]]]);
//# sourceMappingURL=main.0c84ea79.chunk.js.map