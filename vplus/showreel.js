const video = document.querySelector('#vplus-showreel');
const choices = [...document.querySelectorAll('[data-reel-theme]')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let activeTheme = 'dark';

function showTheme(theme) {
  if (theme !== activeTheme) {
    const wasPlaying = !video.paused;
    const position = video.currentTime;
    activeTheme = theme;
    video.poster = `showreel/vplus-${theme}.webp`;
    video.src = `showreel/vplus-${theme}.mp4`;
    video.load();
    if (position > 0) video.currentTime = position;
    if (wasPlaying) video.play().catch(() => {});
  }

  for (const button of choices) {
    button.setAttribute('aria-pressed', String(button.dataset.reelTheme === activeTheme));
  }
}

let portfolioTheme;
try {
  portfolioTheme = localStorage.getItem('theme');
} catch {
  // The controls also work when browser storage is unavailable.
}
showTheme(portfolioTheme === 'light' || (!portfolioTheme && matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark');

for (const button of choices) {
  button.addEventListener('click', () => showTheme(button.dataset.reelTheme));
}
document.querySelector('.reel-switch').hidden = false;

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio < 0.35) return;
    if (!reducedMotion.matches && video.currentTime === 0) video.play().catch(() => {});
    observer.disconnect();
  }, { threshold: 0.35 });
  observer.observe(video);
}
