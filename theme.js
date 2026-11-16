(() => {
  const root = document.documentElement;
  const storageKey = 'vishnu-portfolio-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;

  try {
    const saved = localStorage.getItem(storageKey) ?? localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') choice = saved;
  } catch {
    // The toggle also works in browsing contexts where storage is blocked.
  }

  const setTheme = (theme) => { root.dataset.theme = theme; };
  const systemTheme = () => system.matches ? 'dark' : 'light';
  setTheme(choice ?? systemTheme());

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme');
    if (!button) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let transitionTimer;
    let viewTransition;

    const update = (theme) => {
      setTheme(theme);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#f3f2f0');
    };

    update(choice ?? systemTheme());
    button.hidden = false;
    button.addEventListener('click', () => {
      choice = (choice ?? root.dataset.theme) === 'dark' ? 'light' : 'dark';
      if (!reducedMotion.matches && typeof document.startViewTransition === 'function') {
        const { left, top, width, height } = button.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        root.style.setProperty('--vt-x', `${x}px`);
        root.style.setProperty('--vt-y', `${y}px`);
        root.style.setProperty('--vt-r', `${radius}px`);
        viewTransition?.skipTransition();
        const nextTheme = choice;
        viewTransition = document.startViewTransition(() => update(nextTheme));
        viewTransition.ready.catch(() => {});
      } else if (!reducedMotion.matches) {
        root.classList.add('theme-changing');
        clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => root.classList.remove('theme-changing'), 500);
        update(choice);
      } else {
        update(choice);
      }
      try { localStorage.setItem(storageKey, choice); } catch { /* Session-only preference. */ }
    });

    system.addEventListener('change', () => {
      if (!choice) update(systemTheme());
    });
  });

})();
