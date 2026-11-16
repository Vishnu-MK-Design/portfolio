/* PC-only catalogue visibility. This does not add any playback source. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CinemaContentPolicy=api;})(globalThis,()=>{
 'use strict';
 const names=new Set(['ecchi','nudity','fanservice','sexual themes','suggestive themes','sexual humor','sexual humour']);
 const normalized=value=>String(value||'').trim().toLowerCase();
 function matureLabel(value){return names.has(normalized(typeof value==='string'?value:value?.name));}
 function mature(item){return !!item&&(item.matureContent===true||(item.genres||[]).some(matureLabel)||(item.tags||[]).some(t=>matureLabel(t)&&(!Number.isFinite(t.rank)||t.rank>=50)));}
 function visible(item,prefs={}){return !!item&&!item.isAdult&&!item.adult&&!(item.genres||[]).some(g=>normalized(g)==='hentai')&&(prefs?.matureContent===true||!mature(item));}
 function definitionVisible(d,prefs={}){const label=d?.filters?.genreName||d?.filters?.tag;return !!d&&!d.isAdult&&normalized(label)!=='hentai'&&(prefs?.matureContent===true||!matureLabel(label));}
 function response(data,prefs={}){
  if(!data||typeof data!=='object')return data;
  const next={...data};
  for(const key of ['items','movie','tv'])if(Array.isArray(next[key]))next[key]=next[key].filter(t=>visible(t,prefs));
  if(Array.isArray(next.collections))next.collections=next.collections.filter(d=>definitionVisible(d,prefs));
  if(Array.isArray(next.entries))next.entries=next.entries.filter(e=>visible(e.media||e.item||e,prefs));
  // Keep saved/history records intact: this is visibility, never library deletion.
  return next;
 }
 function assertVisible(item,prefs={}){if(!visible(item,prefs))throw Error('This title is hidden by your content settings. Enable Mature Content in Settings → Content to show non-explicit suggestive titles.');}
 return {matureLabel,mature,visible,definitionVisible,response,assertVisible};
});
