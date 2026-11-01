(() => {
  'use strict';

  // Publisher embeds stay intact. Only explicitly permitted direct assets may
  // serve as covered background artwork behind application content.
  let current = null;
  let retiring = null;
  let generation = 0;
  let pendingApi = null;
  const START_TIMEOUT = 25000;
  const API_TIMEOUT = 18000;
  const icons = {
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    muted: '<path d="M11 5 6 9H3v6h3l5 4zM16 9l5 6m0-6-5 6"/>',
    sound: '<path d="M11 5 6 9H3v6h3l5 4zM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>',
    retry: '<path d="M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 13-3l2 3M4 16l2 3a8 8 0 0 0 13-3"/>',
    play: '<path d="m8 4 12 8-12 8z"/>'
  };
  const svg = name => '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>';
  const active = entry => current === entry && entry.generation === generation && entry.hero.isConnected;

  function cancelApi() {
    if (!pendingApi) return;
    pendingApi.cancel();
  }

  function loadApi() {
    if (typeof window.YT?.Player === 'function') return Promise.resolve();
    if (pendingApi) return pendingApi.promise;
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.dataset.vplusTrailerApi = 'true';
    let settle, fail;
    const promise = new Promise((resolve, reject) => { settle = resolve; fail = reject; });
    let timer;
    let finished = false;
    const cleanup = remove => {
      clearTimeout(timer);
      script.onerror = null;
      if (window.onYouTubeIframeAPIReady === ready) window.onYouTubeIframeAPIReady = previous;
      if (remove) script.remove();
      pendingApi = null;
    };
    const reject = message => {
      if (finished) return;
      finished = true;
      cleanup(true);
      fail(new Error(message));
    };
    function ready() {
      if (finished) return;
      finished = true;
      cleanup(false);
      try { if (typeof previous === 'function') previous(); } catch {}
      settle();
    }
    window.onYouTubeIframeAPIReady = ready;
    script.onerror = () => reject('The official trailer service could not be reached.');
    timer = setTimeout(() => reject('The official trailer service did not respond. Try again later.'), API_TIMEOUT);
    pendingApi = { promise, cancel: () => reject('Trailer closed.') };
    document.head.append(script);
    return promise;
  }

  function iconButton(label, name, handler) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-button';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.innerHTML = svg(name);
    button.addEventListener('click', event => { event.stopPropagation(); handler(); });
    return button;
  }


  function setMessage(entry,text,status=entry.status){if(!active(entry))return;entry.status=status;entry.utility.dataset.status=status;entry.message.textContent=text;entry.message.hidden=!text;}
  function isMuted(entry){try{return entry.video?entry.video.muted:entry.player?.isMuted?.()??entry.muted;}catch{return entry.muted;}}
  function updateMute(entry){if(!active(entry))return;entry.muted=isMuted(entry);const label=entry.muted?'Unmute trailer':'Mute trailer';entry.muteButton.setAttribute('aria-label',label);entry.muteButton.title=label;entry.muteButton.setAttribute('aria-pressed',String(!entry.muted));entry.muteButton.innerHTML=svg(entry.muted?'muted':'sound');}
  function toggleMute(entry){if(!active(entry))return;try{const next=!isMuted(entry);if(entry.video)entry.video.muted=next;else if(entry.player)next?entry.player.mute():entry.player.unMute();entry.muted=next;updateMute(entry);}catch{}}
  function destroyMedia(entry){entry.observer?.disconnect();try{entry.player?.destroy();}catch{}entry.player=null;if(entry.video){try{entry.video.pause();entry.video.removeAttribute('src');entry.video.load();}catch{}entry.video=null;}entry.frame?.remove();entry.frame=null;entry.panel?.remove();entry.panel=null;}
  function stop(focus=false,fade=true){if(retiring){clearTimeout(retiring.retireTimer);destroyMedia(retiring);retiring=null;}window.VidlyDesktop?.send({type:'trailer-state',active:false});generation++;const old=current;current=null;if(old){clearTimeout(old.timer);old.observer?.disconnect();old.trigger?.setAttribute('aria-pressed','false');try{old.video?.pause();old.player?.pauseVideo?.();}catch{}old.utility.remove();old.hero.classList.remove('has-trailer');old.hero.removeAttribute('data-trailer-state');if(fade&&old.type==='video'&&old.frame?.isConnected){old.frame.style.opacity='0';retiring=old;old.retireTimer=setTimeout(()=>{destroyMedia(old);if(retiring===old)retiring=null;},220);}else destroyMedia(old);if(focus&&old.trigger?.isConnected)old.trigger.focus({preventScroll:true});}document.body.classList.remove('trailer-active');cancelApi();if(old)document.dispatchEvent(new CustomEvent('vplus:trailer-stopped'));}
  function failed(entry,text){if(!active(entry))return;clearTimeout(entry.timer);destroyMedia(entry);entry.hero.classList.remove('has-trailer');entry.hero.append(entry.utility);entry.muteButton.hidden=true;entry.pauseButton.hidden=true;entry.retryButton.hidden=false;entry.playButton.hidden=true;entry.trigger?.setAttribute('aria-pressed','false');entry.hero.dataset.trailerState='failed';setMessage(entry,text,'failed');}
  function paused(entry){if(!active(entry))return;entry.pauseButton.setAttribute('aria-label','Resume trailer');entry.pauseButton.title='Resume trailer';entry.pauseButton.innerHTML=svg('play');setMessage(entry,'','paused');}
  function pause(entry){if(!active(entry))return;try{entry.video?.pause();entry.player?.pauseVideo?.();}catch{}paused(entry);}
  function playing(entry){if(!active(entry)||!entry.frame||entry.status==='failed')return;if(document.hidden||entry.inViewport===false){pause(entry);return;}clearTimeout(entry.timer);if(entry.type==='video')entry.hero.classList.add('has-trailer');entry.hero.dataset.trailerState='playing';entry.retryButton.hidden=true;entry.playButton.hidden=true;entry.pauseButton.hidden=false;entry.pauseButton.setAttribute('aria-label','Pause trailer');entry.pauseButton.title='Pause trailer';entry.pauseButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';entry.muteButton.disabled=false;setMessage(entry,'','playing');updateMute(entry);}
  function directUrl(raw){try{const u=new URL(raw),h=u.hostname.toLowerCase();return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&h!=='localhost'&&!h.endsWith('.localhost')&&!h.endsWith('.local')&&!/^[\d.]+$/.test(h)&&!h.includes(':')&&!h.startsWith('[')?u.href:null;}catch{return null;}}
  async function playManually(entry){if(!active(entry)||document.hidden)return;try{if(entry.video)await entry.video.play();else entry.player?.playVideo();}catch{setMessage(entry,'Playback was blocked. Retry or return to the artwork.','blocked');}}
  function buildUtility(entry){const utility=document.createElement('div');utility.className='trailer-utility';utility.setAttribute('role','group');utility.setAttribute('aria-label','Trailer options');const message=document.createElement('span');message.className='trailer-status';message.setAttribute('role','status');const play=iconButton('Play trailer','play',()=>playManually(entry)),pauseButton=iconButton('Pause trailer','play',()=>entry.status==='paused'?playManually(entry):pause(entry)),mute=iconButton('Unmute trailer','muted',()=>toggleMute(entry)),retry=iconButton('Retry trailer','retry',()=>open(entry.item,entry.hero)),close=iconButton('Return to artwork','close',()=>stop(true));play.hidden=true;pauseButton.hidden=true;mute.disabled=true;retry.hidden=true;utility.append(message,play,pauseButton,mute,retry,close);Object.assign(entry,{utility,message,playButton:play,pauseButton,muteButton:mute,retryButton:retry,closeButton:close});}
  function observe(entry){if(typeof IntersectionObserver!=='function')return;entry.observer=new IntersectionObserver(rows=>{entry.inViewport=rows[0]?.isIntersecting!==false;if(!entry.inViewport&&entry.status==='playing')pause(entry);},{threshold:.05});entry.observer.observe(entry.panel||entry.hero);}
  async function open(item,hero){if(current?.item.key===item?.key&&current.hero===hero&&current.status!=='failed'){stop(true);return true;}stop(false,false);const trailer=item?.trailer;if(!hero?.isConnected||!trailer)return false;const type=trailer.type||(trailer.youtubeId?'youtube':'');if(!['video','youtube'].includes(type)||type==='youtube'&&!/^[A-Za-z0-9_-]{11}$/.test(trailer.youtubeId||''))return false;const url=type==='video'&&trailer.backgroundAllowed===true?directUrl(trailer.url):null;if(type==='video'&&!url)return false;const copy=hero.querySelector('.hero-copy');if(!copy)return false;
    const trigger=hero.querySelector('[data-trailer]')||document.activeElement,entry={item,hero,copy,trigger,type,status:'loading',generation,muted:true,loop:trailer.loop===true,video:null,player:null,frame:null,panel:null,timer:null};current=entry;window.VidlyDesktop?.send({type:'trailer-state',active:true});document.body.classList.add('trailer-active');trigger?.setAttribute('aria-pressed','true');hero.dataset.trailerState='loading';buildUtility(entry);
    const frame=document.createElement('div');entry.frame=frame;frame.setAttribute('aria-label',item.title+' trailer');
    if(type==='video'){frame.className='trailer-background video-trailer';hero.prepend(frame);hero.append(entry.utility);}else{frame.className='official-video-stage';const panel=document.createElement('section');panel.className='official-trailer-inline';entry.panel=panel;panel.append(frame);const controls=hero.parentElement.querySelector('.detail-controls'),body=hero.parentElement.querySelector('.detail-page-body');if(controls)controls.after(panel);else if(body)body.prepend(panel);else hero.after(panel);panel.scrollIntoView?.({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    observe(entry);setMessage(entry,'Starting trailer…');entry.timer=setTimeout(()=>failed(entry,'The trailer did not start. Retry or return to the artwork.'),START_TIMEOUT);
    if(type==='video'){const video=document.createElement('video');entry.video=video;video.autoplay=true;video.loop=entry.loop;video.muted=true;video.playsInline=true;video.controls=false;video.preload=navigator.connection?.saveData?'none':'metadata';video.disablePictureInPicture=true;video.setAttribute('aria-hidden','true');const disableCaptions=()=>{for(const track of video.textTracks||[])track.mode='disabled';};video.textTracks?.addEventListener?.('addtrack',disableCaptions);video.addEventListener('loadedmetadata',disableCaptions);video.addEventListener('playing',()=>playing(entry));video.addEventListener('pause',()=>{if(active(entry)&&entry.status==='playing')paused(entry);});video.addEventListener('volumechange',()=>updateMute(entry));video.addEventListener('ended',()=>{if(active(entry)&&!entry.loop)stop(false);});video.addEventListener('error',()=>failed(entry,'This trailer could not be played. Retry or return to the artwork.'));frame.append(video);video.src=url;try{await video.play();}catch(e){if(!active(entry))return false;if(e.name==='NotAllowedError'){clearTimeout(entry.timer);entry.playButton.hidden=false;setMessage(entry,'Press Play trailer to start.','blocked');}else failed(entry,'This trailer could not be started.');}return active(entry);}
    try{await loadApi();if(!active(entry))return false;const mount=document.createElement('div');mount.id='vplus-official-trailer-'+generation;frame.append(mount);entry.player=new window.YT.Player(mount.id,{videoId:trailer.youtubeId,width:'100%',height:'100%',playerVars:{origin:location.origin,autoplay:1,mute:1,controls:1,fs:1,playsinline:1,cc_load_policy:0,rel:0,...(entry.loop?{loop:1,playlist:trailer.youtubeId}:{})},events:{onReady:e=>{if(!active(entry)||entry.status==='failed')return;entry.muteButton.disabled=false;try{e.target.mute();if(!document.hidden&&entry.inViewport!==false)e.target.playVideo();else paused(entry);}catch{}},onStateChange:e=>{if(!active(entry)||entry.status==='failed')return;if(e.data===1)playing(entry);else if(e.data===2)paused(entry);else if(e.data===0){if(entry.loop){entry.player.seekTo(0,true);entry.player.playVideo();}else stop(false);}},onError:e=>failed(entry,'The official trailer is unavailable here (service error '+e.data+').'),onAutoplayBlocked:()=>{if(!active(entry))return;clearTimeout(entry.timer);entry.playButton.hidden=false;setMessage(entry,'Press Play trailer to start.','blocked');}}});return true;}catch(e){if(active(entry))failed(entry,e.message||'The official trailer could not be reached.');return false;}
  }
  function state(){const e=current;let time=0;try{time=Number(e?.video?.currentTime??e?.player?.getCurrentTime?.()??0);}catch{}return {active:!!e,status:e?.status||'idle',time:Number.isFinite(time)?time:0,type:e?.type||null,loop:!!e?.loop,muted:e?isMuted(e):true};}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&current){e.preventDefault();e.stopImmediatePropagation();stop(true);}},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&current)pause(current);});window.addEventListener('pagehide',()=>stop(false,false));
  window.CinemaTrailer={open,stop,state};
})();
