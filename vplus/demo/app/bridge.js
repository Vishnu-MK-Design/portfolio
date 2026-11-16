/* Public demo transport: local films only, no credentials or provider endpoints. */
(()=>{'use strict';
 const PREFIX='vplus.portfolio.',get=(k,f)=>{try{return JSON.parse(localStorage.getItem(PREFIX+k))??f;}catch{return f;}},put=(k,v)=>{try{localStorage.setItem(PREFIX+k,JSON.stringify(v));}catch{}};
 // Keep this origin's public-demo records distinct from any other installed demo.
 for(const key of ['vidly.saved','vidly.history','vidly.preferences','vidly.catalogueFilters','vidly.searchHistory']){const stored=get(key,null);if(stored!==null)localStorage.setItem(key,JSON.stringify(stored));}
 let receiver=()=>{},player=null;
 const data=fetch('catalogue.json').then(r=>r.json()).then(r=>r.items);
 const defs=[
  {id:'open-movies',title:'The open movie collection',kind:'movie',pages:['home','movies'],filters:{mode:'popular'},description:'Three openly licensed films. Playback uses 45-second excerpts bundled with this demo.'},
  {id:'animation',title:'Animated worlds',kind:'movie',pages:['home','movies'],filters:{mode:'genre',genreName:'Animation'}},
  {id:'science-fiction',title:'Science fiction',kind:'movie',pages:['movies'],filters:{mode:'genre',genreName:'Sci-Fi'}},
  {id:'comedy',title:'A lighter moment',kind:'movie',pages:['movies'],filters:{mode:'genre',genreName:'Comedy'}},
  {id:'fantasy',title:'Fantasy',kind:'movie',pages:['movies'],filters:{mode:'genre',genreName:'Fantasy'}}
 ];
 function state(){receiver({type:'state',saved:get('vidly.saved',[]),history:get('vidly.history',[]),connected:true,extensionEngine:false,audioIndex:[],playbackProviders:[]});}
 function filter(items,m){let rows=items.filter(t=>(!m.query||t.title.toLowerCase().includes(m.query.toLowerCase()))&&(!m.kind||m.kind==='all'||t.kind===m.kind)&&(!m.language||t.originalLanguage===m.language)&&(!m.country||t.countries.includes(m.country))&&(!m.year||t.year===m.year)&&(!m.audioLanguage||m.audioLanguage==='en'&&t.id!=='2'));const name=window.CinemaModel?.genres[m.genre]||m.genre;if(name)rows=rows.filter(t=>t.genres.includes(name));if(m.sort==='newest')rows.sort((a,b)=>b.releaseDate.localeCompare(a.releaseDate));return rows;}
 async function handle(m){const items=await data,reply=r=>receiver({type:m.type+'-result',requestId:m.requestId,...r});
  switch(m.type){
   case 'hello':state();break;
   case 'home':reply({movie:items,tv:[]});break;
   case 'collections':reply({collections:defs});break;
   case 'collection':{const d=defs.find(d=>d.id===m.id);if(!d){reply({items:[],page:1,hasMore:false,unavailable:'This collection is not included in the public demo.'});break;}reply({items:filter(items,{...m,genre:d.filters.genreName}),page:1,hasMore:false});break;}
   case 'catalogue':case 'anime-catalogue':reply({items:filter(items,m),page:1,hasMore:false});break;
   case 'search-all':reply({groups:{demo:{items:filter(items,m),hasMore:false}}});break;
   case 'imdb':reply({items:[],hasMore:false,notice:'This curated demo supports title search. IMDb lookup is part of the desktop app.'});break;
   case 'details':reply({data:items.find(t=>t.key===m.item.key)||m.item});break;
   case 'saved':put('vidly.saved',m.entries);break;
   case 'preferences':put('vidly.preferences',m.preferences);break;
   case 'play':{if(player)return;const t=items.find(t=>t.key===m.item?.key);if(!t)return;window.CinemaTrailer?.stop();const prior=get('vidly.history',[]).find(h=>h.item.key===t.key);player=document.createElement('iframe');player.className='demo-player-frame';player.title='V+ player · '+t.title+' · 45-second licensed excerpt';player.allow='autoplay; fullscreen';player.src='player.html?id='+encodeURIComponent(t.id)+'&start='+(m.resume?Math.max(0,Math.min(44,prior?.time||0)):0);document.body.append(player);player.focus();break;}
   case 'open-url':if(typeof m.url==='string'&&['https://mango.blender.org/sharing/','https://peach.blender.org/about/','https://orange.blender.org/background/'].includes(m.url))window.open(m.url,'_blank','noopener');break;
   default:if(m.requestId)receiver({type:'error',requestId:m.requestId,message:'This desktop feature is not included in the portfolio demo.'});
  }
 }
 window.VidlyDesktop={send:m=>{handle(m).catch(()=>{if(m.requestId)receiver({type:'error',requestId:m.requestId,message:'Demo data could not load. Refresh to retry.'});});},onMessage:fn=>receiver=fn};
 window.addEventListener('message',e=>{if(!player||e.origin!==location.origin||e.source!==player.contentWindow||e.data?.channel!=='vplus-portfolio')return;const m=e.data;if(m.type==='progress'&&Number.isFinite(m.time)&&m.time>=0&&m.time<=46){data.then(items=>{const item=items.find(t=>t.id===m.id);if(!item)return;const rows=get('vidly.history',[]).filter(h=>h.item.key!==item.key);rows.unshift({item,time:m.time,duration:45,season:1,episode:1,updatedAt:Date.now()});put('vidly.history',rows);});}if(m.type==='close'){player.remove();player=null;state();window.CinemaApp?.navigate('home');}});
 document.addEventListener('DOMContentLoaded',()=>{const label=document.createElement('div');label.className='demo-label';label.innerHTML='<a href="../../index.html">V+ case study ↗</a> · Interactive desktop demo<br>3 open films · 45-second excerpts · Saved on this browser';document.querySelector('.header-tools').prepend(label);const foot=document.createElement('div');foot.className='demo-footnote';foot.innerHTML='Portfolio demonstration using V+ 0.6.6 interface and player code. The catalogue is curated; external providers, TV/anime and native window actions are excluded here. <a href="../../credits.html">Film credits &amp; demo scope ↗</a>';document.querySelector('#main').append(foot);});
})();
