const video = document.querySelector('#vplus-showreel');
const choices = [...document.querySelectorAll('[data-reel-theme]')];

let activeTheme = 'dark';

function showTheme(theme) {
  if (theme !== activeTheme) {
    const wasPlaying = !video.paused;
    const position = video.currentTime;
    activeTheme = theme;
    video.poster = `showreel/vplus-${theme}.webp`;
    video.src = `showreel/vplus-${theme}.mp4?v=2`;
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
  portfolioTheme = document.documentElement.dataset.theme || localStorage.getItem('theme');
} catch {
  // The controls also work when browser storage is unavailable.
}
showTheme(portfolioTheme === 'light' || (!portfolioTheme && matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark');

for (const button of choices) {
  button.addEventListener('click', () => showTheme(button.dataset.reelTheme));
}
document.querySelector('.reel-switch').hidden = false;

new MutationObserver(() => showTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });
