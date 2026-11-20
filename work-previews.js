/* Load mockup previews only when visible, following the page theme. */
(() => {
  const videos = [...document.querySelectorAll('[data-project-preview]')];
  if (!videos.length) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('[data-preview-toggle]');
  let paused = motion.matches || Boolean(navigator.connection?.saveData);
  const visible = new Set();

  function sync(video) {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const base = video.dataset.previewBase;
    video.poster = `${base}-${theme}.jpg`;
    if (paused || document.hidden || !visible.has(video)) {
      video.pause();
      return;
    }
    const src = `${base}-${theme}.mp4`;
    if (video.getAttribute('src') !== src) {
      video.src = src;
      video.load();
    }
    video.play().catch(() => {});
  }
  function syncAll() {
    videos.forEach(sync);
    if (button) button.textContent = paused ? 'Play previews' : 'Pause previews';
  }
  if (button) {
    button.hidden = false;
    button.addEventListener('click', () => { paused = !paused; syncAll(); });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting, intersectionRatio}) => {
        if (isIntersecting && intersectionRatio >= .2) visible.add(target);
        else visible.delete(target);
        sync(target);
      });
    }, {threshold: [0, .2]});
    videos.forEach(video => observer.observe(video));
  }
  new MutationObserver(syncAll).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme']
  });
  document.addEventListener('visibilitychange', syncAll);
  motion.addEventListener('change', () => { paused = motion.matches; syncAll(); });
  syncAll();
})();
