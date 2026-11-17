/* Keep case-study reels in step with the portfolio theme. */
(() => {
  const video = document.querySelector('[data-project-showreel][data-showreel-light][data-showreel-dark]');
  if (!video) return;

  const source = video.querySelector('source');
  const download = video.querySelector('a');
  let activeTheme;
  let pending;
  let metadataListener;

  const syncTheme = () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    if (theme === activeTheme) return;
    activeTheme = theme;

    const src = video.dataset[theme === 'dark' ? 'showreelDark' : 'showreelLight'];
    video.poster = video.dataset[theme === 'dark' ? 'posterDark' : 'posterLight'];
    if (download) download.href = src;
    if (source.getAttribute('src') === src) return;

    const position = pending?.position ?? video.currentTime;
    const playing = pending?.playing ?? (!video.paused && !video.ended);
    metadataListener?.abort();
    metadataListener = new AbortController();
    pending = { position, playing };
    video.pause();
    source.src = src;
    video.addEventListener('loadedmetadata', () => {
      const resume = pending;
      pending = null;
      if (resume.position > 0) video.currentTime = Math.min(resume.position, video.duration);
      if (resume.playing) video.play().catch(() => {});
    }, { once: true, signal: metadataListener.signal });
    video.load();
  };

  video.addEventListener('play', () => { if (pending) pending.playing = true; });
  syncTheme();
  new MutationObserver(syncTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
})();
