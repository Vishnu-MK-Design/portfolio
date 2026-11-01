(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CinemaModel=api;})(globalThis,()=>{
 'use strict';
 const genres={'16':'Animation','35':'Comedy','80':'Crime','99':'Documentary','18':'Drama','10751':'Family','9648':'Mystery','28':'Action','12':'Adventure','27':'Horror','878':'Sci-Fi','53':'Thriller','10749':'Romance','14':'Fantasy','36':'History','10752':'War'};
 const languages={auto:'Player default',en:'English',ta:'Tamil',hi:'Hindi',te:'Telugu',ml:'Malayalam',kn:'Kannada',ja:'Japanese',ko:'Korean',es:'Spanish',fr:'French',de:'German'};
 const countries={US:'United States',IN:'India',GB:'United Kingdom',CA:'Canada',AU:'Australia',JP:'Japan',KR:'South Korea',FR:'France',DE:'Germany',ES:'Spain',CN:'China',IT:'Italy',BR:'Brazil',LK:'Sri Lanka'};
 function valid(t){return !!t&&['movie','tv','anime'].includes(t.kind)&&/^[1-9][0-9]{0,11}$/.test(String(t.id))&&t.key===t.kind+'-'+t.id;}
 function merge(...lists){const m=new Map();for(const t of lists.flat().filter(valid)){const old=m.get(t.key);if(!old){m.set(t.key,{...t});continue;}const next={...old,...t};for(const k of ['poster','backdrop','logo'])next[k]=old[k]&&!old[k].startsWith('http')?old[k]:t[k]||old[k];for(const k of ['overview','imdbId','year'])if(!next[k])next[k]=old[k];if(old.isAnime)next.isAnime=true;m.set(t.key,next);}return [...m.values()];}
 function isAnime(t){return !!t&&(t.kind==='anime'||t.isAnime===true);}
 function isFilm(t){return t?.kind==='movie'||t?.kind==='anime'&&t.mediaType==='movie';}
 function categoryMatches(t,kind){return !kind||kind==='all'||kind==='anime'&&isAnime(t)||t.kind===kind||t.kind==='anime'&&t.mediaType===(kind==='movie'?'movie':kind==='tv'?'tv':'');}
 const normalizedTitle=s=>String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu,' ').trim();
 function mergeAnimeSources(...lists){
  const rows=merge(...lists),removed=new Set(),animes=rows.filter(t=>t.kind==='anime'),others=rows.filter(t=>t.kind!=='anime');
  if(!animes.length||!others.length)return rows;
  const names=t=>[t.title,t.titleEnglish,...(t.alternateTitles||[]),...(t.aliases||[])].map(normalizedTitle).filter(Boolean);
  const type=t=>t.kind==='anime'?t.mediaType:t.kind==='movie'?'movie':t.kind==='tv'?'tv':null;
  // Join only one unambiguous exact cross-index match. Never reinterpret a numeric ID.
  const titleSets=new Map(rows.map(t=>[t.key,new Set(names(t))]));
  const sameNames=(a,b)=>[...titleSets.get(a.key)].some(n=>titleSets.get(b.key).has(n));
  for(const anime of animes){
   if(!anime.year||!type(anime))continue;
   const candidates=others.filter(t=>String(t.year)===String(anime.year)&&type(t)===type(anime)&&sameNames(t,anime));
   if(candidates.length!==1)continue;const other=candidates[0];
   const peers=animes.filter(t=>String(t.year)===String(other.year)&&type(t)===type(other)&&sameNames(t,other));
   if(peers.length!==1)continue;
   if(anime.poster&&!/^https?:/i.test(anime.poster)){removed.add(other.key);anime.isAnime=true;}
   else{other.matureContent=other.matureContent===true||anime.matureContent===true||anime.genres?.includes('Ecchi')||anime.tags?.some(t=>['nudity','fanservice'].includes(String(t.name).toLowerCase())&&t.rank>=50);other.isAnime=true;other.alternateTitles=[...new Set([...(other.alternateTitles||[]),...names(anime)])];removed.add(anime.key);}
  }
  return rows.filter(t=>!removed.has(t.key));
 }
 function knownAudio(item,index){return [...new Set(index.filter(e=>e.item?.key===item.key&&Date.now()-Number(e.verifiedAt)<30*86400000).flatMap(e=>e.languages||[]))];}
 function matches(t,f={},audio=[]){const name=genres[f.genre]||(typeof f.genre==='string'&&!/^\d+$/.test(f.genre)?f.genre:''),family=t.kind==='tv'?({'28':['10759','Action & Adventure'],'12':['10759','Action & Adventure'],'878':['10765','Sci-Fi & Fantasy'],'14':['10765','Sci-Fi & Fantasy'],'10752':['10768','War & Politics']})[f.genre]:null;const genreMatch=!name||(t.genres||[]).includes(name)||(t.genreIds||[]).map(String).includes(f.genre)||!!family&&((t.genres||[]).includes(family[1])||(t.genreIds||[]).map(String).includes(family[0]));return categoryMatches(t,f.kind)&&(!f.year||String(t.year)===String(f.year))&&genreMatch&&(!f.language||(t.languages||[]).includes(f.language)||t.originalLanguage===f.language)&&(!f.country||(t.countries||[]).includes(f.country))&&(!f.audioLanguage||knownAudio(t,audio).includes(f.audioLanguage));}
 function filter(rows,f={},audio=[]){const next=rows.filter(t=>matches(t,f,audio));if(f.sort==='rating')next.sort((a,b)=>(b.rating||0)-(a.rating||0));if(f.sort==='newest')next.sort((a,b)=>String(b.releaseDate||b.year||'').localeCompare(String(a.releaseDate||a.year||'')));return next;}
 function queryMatches(title,query){const normalize=s=>String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu,' ').trim();const text=normalize(title),words=normalize(query).split(' ').filter(Boolean);return words.every(word=>text.includes(word));}
 function imdb(raw){let s=String(raw||'').trim();if(/^https?:/i.test(s)){let u;try{u=new URL(s);}catch{throw Error('Enter a valid IMDb title link.');}if(!['imdb.com','www.imdb.com','m.imdb.com'].includes(u.hostname)||u.username||u.password||u.port||!/^\/title\/tt[0-9]{7,10}\/?$/i.test(u.pathname))throw Error('Use an IMDb title link or an ID beginning with tt.');s=u.pathname.split('/')[2];}if(!/^tt[0-9]{7,10}$/i.test(s))throw Error('An IMDb title ID starts with tt, for example tt22084616.');return s.toLowerCase();}
 return {genres,languages,countries,valid,merge,mergeAnimeSources,isAnime,isFilm,categoryMatches,matches,filter,knownAudio,imdb,queryMatches};
});
