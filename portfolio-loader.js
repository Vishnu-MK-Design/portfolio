/* One entrance per tab session; never wait for below-the-fold media. */
(() => {
  'use strict';

  const root = document.documentElement;
  const sessionKey = 'vishnu-portfolio-intro-v1';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = performance.getEntriesByType('navigation')[0];
  let seen = false;
  try { seen = sessionStorage.getItem(sessionKey) === 'seen'; } catch { /* Optional session memory. */ }
  if (seen || reducedMotion.matches || navigation?.type === 'back_forward') return;
  if (getComputedStyle(root).getPropertyValue('--portfolio-loader-ready').trim() !== '1') return;

  const started = performance.now();
  let overlay;
  let frame;
  let exitTimer;
  let completed = false;
  let cleaned = false;
  let restoreFocus;
  const inertElements = [];
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    cancelAnimationFrame(frame);
    clearTimeout(deadline);
    clearTimeout(watchdog);
    clearTimeout(exitTimer);
    root.classList.remove('portfolio-is-loading');
    root.removeAttribute('data-loader-pending');
    inertElements.forEach(([element, wasInert]) => { element.inert = wasInert; });
    overlay?.remove();
    if (restoreFocus?.isConnected) restoreFocus.focus({ preventScroll: true });
    document.removeEventListener('keydown', skip);
    reducedMotion.removeEventListener('change', reduce);
    window.removeEventListener('pageshow', restored);
    try { sessionStorage.setItem(sessionKey, 'seen'); } catch { /* The page still opens without storage. */ }
    window.dispatchEvent(new Event('portfolio:loader-complete'));
  };
  const complete = () => {
    if (completed || cleaned) return;
    completed = true;
    cancelAnimationFrame(frame);
    if (!overlay || reducedMotion.matches) { cleanup(); return; }
    overlay.querySelector('[data-loader-count]').textContent = '100%';
    overlay.querySelector('[data-loader-fill]').style.transform = 'scaleX(1)';
    exitTimer = setTimeout(() => {
      overlay.classList.add('is-leaving');
      exitTimer = setTimeout(cleanup, 680);
    }, 160);
  };
  const skip = event => { if (event.key === 'Escape') cleanup(); };
  const reduce = () => { if (reducedMotion.matches) cleanup(); };
  const restored = event => { if (event.persisted) cleanup(); };
  const deadline = setTimeout(complete, 4200);
  const watchdog = setTimeout(cleanup, 5500);
  root.classList.add('portfolio-is-loading');
  root.setAttribute('data-loader-pending', '');
  document.addEventListener('keydown', skip);
  reducedMotion.addEventListener('change', reduce);
  window.addEventListener('pageshow', restored);

  document.addEventListener('DOMContentLoaded', () => {
    if (cleaned) return;
    try {
      overlay = document.createElement('div');
      overlay.className = 'portfolio-loader';
      overlay.setAttribute('role', 'status');
      overlay.tabIndex = -1;
      overlay.innerHTML = '<span class="portfolio-loader__status">Loading portfolio. Press Escape to skip.</span>' +
        '<span class="portfolio-loader__logo" aria-hidden="true"><span class="portfolio-loader__wordmark" data-wordmark="VishnuMK">VishnuMK</span><span class="portfolio-loader__dot">.</span></span>' +
        '<span class="portfolio-loader__count" data-loader-count aria-hidden="true">0%</span>' +
        '<span class="portfolio-loader__track" aria-hidden="true"><span class="portfolio-loader__fill" data-loader-fill></span></span>';
      restoreFocus = document.activeElement !== document.body ? document.activeElement : null;
      Array.from(document.body.children).forEach(element => {
        if (element.tagName === 'SCRIPT') return;
        inertElements.push([element, element.inert]);
        element.inert = true;
      });
      document.body.append(overlay);
      root.removeAttribute('data-loader-pending');
      overlay.focus({ preventScroll: true });

      const assets = [];
      if (document.fonts) assets.push(document.fonts.load('800 64px Geist'));
      const imageReady = src => new Promise(resolve => {
        const image = new Image();
        image.onload = image.onerror = resolve;
        image.src = src;
      });
      if (document.querySelector('.hero-artwork')) {
        const property = root.dataset.theme === 'dark' ? '--hero-dark-image' : '--hero-light-image';
        const url = getComputedStyle(root).getPropertyValue(property).match(/url\(["']?([^"')]+)["']?\)/);
        if (url) assets.push(imageReady(url[1]));
      } else {
        const poster = document.querySelector('video[poster]')?.poster;
        if (poster) assets.push(imageReady(poster));
      }
      let loaded = 0;
      let ready = assets.length === 0;
      assets.forEach(asset => Promise.resolve(asset).catch(() => {}).then(() => { loaded++; }));
      Promise.allSettled(assets).then(() => { ready = true; });
      let progress = 0;
      const count = overlay.querySelector('[data-loader-count]');
      const fill = overlay.querySelector('[data-loader-fill]');
      let previousTime = performance.now();
      const draw = now => {
        if (completed || cleaned) return;
        const elapsed = now - started;
        const assetProgress = assets.length ? loaded / assets.length : 1;
        const target = ready && elapsed >= 1800 ? 100 : Math.min(96, 8 + Math.min(elapsed / 1800, 1) * 68 + assetProgress * 20);
        const ease = 1 - Math.exp(-Math.min(now - previousTime, 64) / 75);
        previousTime = now;
        progress += (target - progress) * ease;
        count.textContent = Math.floor(progress) + '%';
        fill.style.transform = `scaleX(${progress / 100})`;
        if (ready && elapsed >= 1800 && progress > 99.5) complete();
        else frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    } catch {
      cleanup();
    }
  }, { once: true });
})();
