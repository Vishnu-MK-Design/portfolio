/* Homepage choreography, released by the loader's completion event. */
(() => {
  const hero = document.querySelector('.home-page .hero');
  if (!hero) return;
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const pointerMotion = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 781px) and (prefers-reduced-motion: no-preference)');
  let started = false;
  let entranceFrame;
  let finishTimer;
  const finish = () => {
    started = true;
    cancelAnimationFrame(entranceFrame);
    clearTimeout(finishTimer);
    document.body.classList.remove('hero-enter');
    hero.dataset.motion = 'ready';
    document.removeEventListener('visibilitychange', visible);
  };
  const start = () => {
    if (started || document.documentElement.classList.contains('portfolio-is-loading')) return;
    if (!motion.matches || scrollY > hero.offsetHeight * .65) { finish(); return; }
    if (document.hidden) return;
    started = true;
    entranceFrame = requestAnimationFrame(() => {
      hero.dataset.motion = 'playing';
      document.body.classList.add('hero-enter');
      finishTimer = setTimeout(finish, 1800);
    });
  };
  const visible = () => { if (!document.hidden) start(); };
  hero.dataset.motion = motion.matches ? 'waiting' : 'ready';
  window.addEventListener('portfolio:loader-complete', start, {once:true});
  document.addEventListener('visibilitychange', visible);
  motion.addEventListener('change', () => { if (!motion.matches) finish(); });
  start();

  const followPointer = (element, draw, reset) => {
    let frame;
    let position;
    element.addEventListener('pointermove', event => {
      if (!pointerMotion.matches || event.pointerType !== 'mouse' || hero.dataset.motion !== 'ready') return;
      position = {x:event.clientX, y:event.clientY};
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = element.getBoundingClientRect();
        draw(Math.max(0,Math.min(1,(position.x-rect.left)/rect.width)), Math.max(0,Math.min(1,(position.y-rect.top)/rect.height)));
      });
    }, {passive:true});
    const clear = () => { cancelAnimationFrame(frame); frame = 0; reset(); };
    element.addEventListener('pointerleave', clear);
    pointerMotion.addEventListener('change', clear);
    window.addEventListener('blur', clear);
  };
  const resetPortrait = () => {
    hero.style.setProperty('--portrait-pointer-x', '0px');
    hero.style.setProperty('--portrait-pointer-y', '0px');
  };
  followPointer(hero, (x,y) => {
    hero.style.setProperty('--portrait-pointer-x', ((x-.5)*14).toFixed(2)+'px');
    hero.style.setProperty('--portrait-pointer-y', ((y-.5)*10).toFixed(2)+'px');
  }, resetPortrait);
  document.querySelectorAll('.home-work-card').forEach(card => {
    followPointer(card, (x,y) => {
      card.style.setProperty('--card-rotate-x', ((.5-y)*5).toFixed(2)+'deg');
      card.style.setProperty('--card-rotate-y', ((x-.5)*5).toFixed(2)+'deg');
    }, () => {
      card.style.setProperty('--card-rotate-x', '0deg');
      card.style.setProperty('--card-rotate-y', '0deg');
    });
  });
})();
