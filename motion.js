/* ==================================================================
   VISHNU MK — motion
   One small vanilla system: reveals, word splits, scroll progress,
   step lighting, magnetic buttons, spotlights, stage parallax.
   Only runs when <html class="motion"> (set in <head> unless the
   visitor prefers reduced motion). Content is visible without it.
   ================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  window.__motionReady = true;

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Word split for [data-split] headings ---------- */
  function split(el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          if (!child.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'word';
            w.setAttribute('aria-hidden', 'true');
            var inner = document.createElement('span');
            inner.className = 'word__i';
            inner.style.setProperty('--w', n++);
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    })(el);
  }
  document.querySelectorAll('[data-split]').forEach(function (el) {
    split(el);
    el.classList.add('is-split');
  });

  /* ---------- Explicit delays: data-d="ms" ---------- */
  document.querySelectorAll('[data-d]').forEach(function (el) {
    el.style.setProperty('--d', el.getAttribute('data-d'));
  });

  /* ---------- Stagger groups: children inherit a delay index ---------- */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var step = parseInt(group.getAttribute('data-stagger'), 10) || 80;
    group.querySelectorAll(':scope > [data-reveal]').forEach(function (el, i) {
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', i * step);
    });
  });

  /* ---------- Reveal on enter (once) ---------- */
  var targets = document.querySelectorAll('[data-reveal], [data-split]');
  if ('IntersectionObserver' in window) {
    var loadedAt = performance.now();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Choreography delays (data-d) are for the first screen only; anything
        // revealed later by scrolling should respond immediately.
        if (entry.target.hasAttribute('data-d') && performance.now() - loadedAt > 1200) {
          entry.target.style.setProperty('--d', 0);
        }
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    var startReveals = function () {
      loadedAt = performance.now();
      targets.forEach(function (el) {
        // First-screen hero content plays its entrance on load, even if it sits
        // in the bottom margin the scroll observer ignores.
        if (el.closest('.hero')) { el.classList.add('is-in'); return; }
        // anything already on screen reveals straight away
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { el.classList.add('is-in'); return; }
        io.observe(el);
      });
    };
    // With the intro loader showing, the first screen animates as it lifts
    if (root.classList.contains('is-loading')) window.addEventListener('loader:done', startReveals, { once: true });
    else startReveals();
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Scroll-linked progress (one rAF loop) ---------- */
  var progressBar = document.querySelector('.progress');
  var tracks = Array.prototype.slice.call(document.querySelectorAll('[data-track]'));
  var journeys = Array.prototype.slice.call(document.querySelectorAll('.journey'));

  function sectionProgress(el, startRatio, endRatio) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * startRatio;
    var total = r.height + (vh * startRatio - vh * endRatio);
    return Math.min(1, Math.max(0, (start - r.top) / total));
  }

  /* Process viewer: pin on wide screens, advance one step per slice of scroll */
  var stepSets = Array.prototype.slice.call(document.querySelectorAll('[data-steps]'));
  var wideSteps = window.matchMedia('(min-width: 1025px) and (min-height: 620px)');
  function stepRange(set) {
    var pin = set.querySelector('.steps__pin');
    return { top: parseFloat(getComputedStyle(pin).top) || 0, range: Math.max(1, set.offsetHeight - pin.offsetHeight) };
  }
  function updateSteps() {
    stepSets.forEach(function (set) {
      var live = wideSteps.matches;
      set.classList.toggle('steps--live', live);
      var panels = set.querySelectorAll('[data-step-panel]');
      var tabs = set.querySelectorAll('[data-step-go]');
      var p = 0, idx = -1;
      if (live) {
        var g = stepRange(set);
        p = Math.min(1, Math.max(0, (g.top - set.getBoundingClientRect().top) / g.range));
        idx = Math.min(panels.length - 1, Math.floor(p * panels.length));
      }
      set.style.setProperty('--sp', p.toFixed(4));
      for (var i = 0; i < panels.length; i++) {
        var on = i === idx;
        panels[i].classList.toggle('is-active', on);
        panels[i].toggleAttribute('inert', live && !on);
        if (tabs[i]) {
          tabs[i].classList.toggle('is-active', on);
          if (on) tabs[i].setAttribute('aria-current', 'step'); else tabs[i].removeAttribute('aria-current');
        }
      }
    });
  }
  stepSets.forEach(function (set) {
    set.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-step-go]');
      if (!btn || !set.classList.contains('steps--live')) return;
      var n = set.querySelectorAll('[data-step-panel]').length;
      var g = stepRange(set);
      var y = set.getBoundingClientRect().top + window.scrollY - g.top + ((+btn.getAttribute('data-step-go') + 0.5) / n) * g.range;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  var queued = false;
  function update() {
    queued = false;
    updateSteps();
    var vh = window.innerHeight;

    if (progressBar) {
      var max = document.documentElement.scrollHeight - vh;
      progressBar.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    }

    // Timelines / process rails: fill the line, light the passed steps
    tracks.forEach(function (track) {
      var p = sectionProgress(track, 0.6, 0.6);
      var fill = track.querySelector('[data-track-fill]');
      if (fill) fill.style.setProperty('--p', p.toFixed(4));
      var steps = track.querySelectorAll('[data-step]');
      var activeSet = false;
      for (var i = steps.length - 1; i >= 0; i--) {
        var top = steps[i].getBoundingClientRect().top;
        var lit = top < vh * 0.62;
        steps[i].classList.toggle('is-lit', lit);
        var active = lit && !activeSet;
        if (active) activeSet = true;
        steps[i].classList.toggle('is-active', active);
      }
    });

    // Journey chips light up in sequence as the row crosses the viewport
    journeys.forEach(function (j) {
      var p = sectionProgress(j, 0.85, 0.45);
      j.style.setProperty('--jp', (p * 100).toFixed(1) + '%');
      var items = j.querySelectorAll(':scope > li');
      items.forEach(function (li, i) {
        li.classList.toggle('is-lit', p >= (i / Math.max(1, items.length - 1)) - 0.001 && p > 0);
      });
    });
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  if (progressBar || tracks.length || journeys.length || stepSets.length) {
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    update();
  }

  /* ---------- Hero depth ----------
     Scroll: the name (furthest) drifts down fastest relative to the page,
     the silhouette less, and the text fades — layers separate in depth.
     Pointer (desktop): name and silhouette shift in opposite directions. */
  var hero = document.querySelector('.hero');
  if (hero) {
    var hs = hero.style;
    var wideHero = window.matchMedia('(min-width: 1101px)');
    var ptx = 0, pty = 0, pcx = 0, pcy = 0, heroRaf = null, heroVisible = true;
    var renderHero = function () {
      heroRaf = null;
      pcx += (ptx - pcx) * 0.08;
      pcy += (pty - pcy) * 0.08;
      var h = hero.offsetHeight || 1;
      var y = Math.min(window.scrollY, h);
      var p = y / h;
      hs.setProperty('--g-x', (pcx * -22).toFixed(2) + 'px');
      hs.setProperty('--g-y', (y * 0.42 + pcy * -10).toFixed(2) + 'px');
      hs.setProperty('--g-s', (1 + p * 0.06).toFixed(4));
      hs.setProperty('--p-x', (pcx * 12).toFixed(2) + 'px');
      hs.setProperty('--p-y', (y * 0.14 + pcy * 6).toFixed(2) + 'px');
      // Fade the text only where it overlays the image (wide layout);
      // on narrow screens it sits below the image and must stay readable.
      hs.setProperty('--c-o', wideHero.matches ? Math.max(0, 1 - p * 1.6).toFixed(3) : '1');
      if (Math.abs(ptx - pcx) > 0.002 || Math.abs(pty - pcy) > 0.002) heroRaf = requestAnimationFrame(renderHero);
    };
    var kickHero = function () { if (heroVisible && !heroRaf) heroRaf = requestAnimationFrame(renderHero); };
    window.addEventListener('scroll', kickHero, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; kickHero(); }).observe(hero);
    }
    if (finePointer) {
      hero.addEventListener('pointermove', function (e) {
        ptx = e.clientX / window.innerWidth - 0.5;
        pty = e.clientY / window.innerHeight - 0.5;
        kickHero();
      });
      hero.addEventListener('pointerleave', function () { ptx = 0; pty = 0; kickHero(); });
    }
    renderHero();
  }

  if (!finePointer) return;

  /* ---------- Buttons: the hover fill grows from the pointer's entry point ---------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    function aim(e) {
      var r = btn.getBoundingClientRect();
      btn.style.setProperty('--bx', (e.clientX - r.left) + 'px');
      btn.style.setProperty('--by', (e.clientY - r.top) + 'px');
    }
    btn.addEventListener('pointerenter', aim);
    btn.addEventListener('pointerleave', aim);
  });

  /* ---------- Magnetic primary buttons ---------- */
  document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
    var raf, tx = 0, ty = 0, cx = 0, cy = 0;
    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      btn.style.setProperty('--mag-x', cx.toFixed(2) + 'px');
      btn.style.setProperty('--mag-y', cy.toFixed(2) + 'px');
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    btn.addEventListener('pointermove', function (e) {
      var r = btn.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      ty = (e.clientY - (r.top + r.height / 2)) * 0.28;
      kick();
    });
    btn.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
  });

  /* ---------- Design philosophy: art resolves and scatters on a loop ---------- */
  var playCards = Array.prototype.slice.call(document.querySelectorAll('.principles:not(.principles--3) .principle'));
  if (playCards.length && 'IntersectionObserver' in window) {
    var playOn = false, playTimer = null, playTick = 0;
    var loop = function () {
      // each card resolves in turn, holds, then scatters again
      playCards.forEach(function (card, i) {
        var phase = (playTick - i + playCards.length * 4) % 4;
        card.classList.toggle('is-play', phase === 0 || phase === 1);
      });
      playTick++;
      playTimer = setTimeout(loop, 1400);
    };
    new IntersectionObserver(function (entries) {
      var visible = entries.some(function (e) { return e.isIntersecting; });
      if (visible && !playOn) { playOn = true; playTimer = setTimeout(loop, 900); }
      if (!visible && playOn) { playOn = false; clearTimeout(playTimer); playCards.forEach(function (c) { c.classList.remove('is-play'); }); }
    }, { threshold: 0.25 }).observe(playCards[0].parentNode);
  }

  /* ---------- Cursor spotlight on tiles ---------- */
  document.querySelectorAll('[data-spot]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

})();
