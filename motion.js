/* ============================================================
   VISHNU MK — Interactive Motion Engine
   GSAP + ScrollTrigger + Three.js ember field.
   The home hero keeps its original CSS entrance — this file
   only layers interaction onto every OTHER section.
   Respects prefers-reduced-motion. Safe without WebGL.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (!hasGSAP || reduce) {
    // No engine / reduced motion: everything is already visible by default.
    document.documentElement.classList.add('motion-off');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion-on');

  var isHome = !!document.querySelector('.hero');

  /* ------------------------------------------------------------
     1 · THREE.JS EMBER FIELD — drifting sparks behind every page
     ------------------------------------------------------------ */
  (function emberField() {
    if (typeof THREE === 'undefined') return;
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch (e) { return; }

    var canvas = renderer.domElement;
    canvas.className = 'fx-embers';
    document.body.prepend(canvas);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    camera.position.z = 220;

    var COUNT = finePointer ? 520 : 180;
    var SPREAD_X = 480, SPREAD_Y = 320, SPREAD_Z = 240;

    // soft round sprite
    var tex = (function () {
      var c = document.createElement('canvas');
      c.width = c.height = 64;
      var g = c.getContext('2d');
      var grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      var t = new THREE.CanvasTexture(c);
      return t;
    })();

    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(COUNT * 3);
    var col = new Float32Array(COUNT * 3);
    var speed = new Float32Array(COUNT);
    var sway = new Float32Array(COUNT);
    var ember = new THREE.Color('#ff5a1f');
    var warm = new THREE.Color('#ffb37a');
    var ash = new THREE.Color('#8a8a92');

    for (var i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD_X;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
      var r = Math.random();
      var c0 = r < 0.45 ? ember : (r < 0.75 ? warm : ash);
      col[i * 3] = c0.r; col[i * 3 + 1] = c0.g; col[i * 3 + 2] = c0.b;
      speed[i] = 0.08 + Math.random() * 0.22;
      sway[i] = Math.random() * Math.PI * 2;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    var mat = new THREE.PointsMaterial({
      size: 2.6, map: tex, vertexColors: true, transparent: true,
      opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    var points = new THREE.Points(geo, mat);
    scene.add(points);

    var mouseX = 0, mouseY = 0, targX = 0, targY = 0;
    if (finePointer) {
      window.addEventListener('pointermove', function (e) {
        targX = (e.clientX / window.innerWidth - 0.5) * 2;
        targY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    var clock = new THREE.Clock();
    var running = true;
    document.addEventListener('visibilitychange', function () {
      running = document.visibilityState === 'visible';
      if (running) tick();
    });

    function tick() {
      if (!running) return;
      requestAnimationFrame(tick);
      var t = clock.getElapsedTime();
      var p = geo.attributes.position.array;
      for (var i = 0; i < COUNT; i++) {
        p[i * 3 + 1] += speed[i];                                 // drift up like embers
        p[i * 3] += Math.sin(t * 0.6 + sway[i]) * 0.04;           // gentle sway
        if (p[i * 3 + 1] > SPREAD_Y / 2) p[i * 3 + 1] = -SPREAD_Y / 2;
      }
      geo.attributes.position.needsUpdate = true;
      mouseX += (targX - mouseX) * 0.04;
      mouseY += (targY - mouseY) * 0.04;
      points.rotation.y = mouseX * 0.18;
      points.rotation.x = mouseY * 0.12;
      points.position.y = -(window.scrollY || 0) * 0.02 % 40;
      renderer.render(scene, camera);
    }
    tick();
  })();

  /* ------------------------------------------------------------
     2 · TEXT SPLITTING (keeps nested spans like .chrome-text)
     ------------------------------------------------------------ */
  function splitWords(root, masked) {
    var out = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          if (!n.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'w' + (masked ? ' w--m' : '');
            var wi = document.createElement('span');
            wi.className = 'wi';
            wi.textContent = part;
            w.appendChild(wi);
            frag.appendChild(w);
            out.push(wi);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.tagName !== 'SVG') {
          walk(n);
        }
      });
    })(root);
    return out;
  }

  /* ------------------------------------------------------------
     3 · MASKED WORD REVEALS  [data-split]
     ------------------------------------------------------------ */
  gsap.utils.toArray('[data-split]').forEach(function (el) {
    var words = splitWords(el, true);
    if (!words.length) return;
    gsap.fromTo(words,
      { yPercent: 120, rotate: 4 },
      {
        yPercent: 0, rotate: 0, duration: 1, stagger: 0.045, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
  });

  /* ------------------------------------------------------------
     4 · SCRUBBED WORD FADE  [data-scrub-words]  (contact quote …)
     ------------------------------------------------------------ */
  gsap.utils.toArray('[data-scrub-words]').forEach(function (el) {
    var words = splitWords(el, false);
    if (!words.length) return;
    gsap.fromTo(words,
      { opacity: 0.13 },
      {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 30%', scrub: 0.6 }
      });
  });

  /* ------------------------------------------------------------
     5 · GENERIC SCROLL REVEALS  (.reveal) with group staggers
     ------------------------------------------------------------ */
  var GROUPS = ['.features', '.contacts', '.stats', '.skillset', '.ai-apps', '.tools',
    '.timeline', '.philo', '.steps', '.flow', '.plist', '.cd-gallery', '.cd-stats',
    '.chips', '.approach', '.case__cols'];
  GROUPS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (group) {
      Array.prototype.slice.call(group.children).forEach(function (el, i) {
        if (el.classList.contains('reveal')) el.dataset.gd = i * 0.085;
      });
    });
  });

  gsap.utils.toArray('.reveal').forEach(function (el) {
    if (el.hasAttribute('data-split') || el.hasAttribute('data-scrub-words')) return;
    var dly = parseFloat(el.dataset.gd || 0);
    if (!dly) {
      for (var i = 5; i >= 1; i--) if (el.classList.contains('d' + i)) { dly = i * 0.09; break; }
    }
    gsap.fromTo(el,
      { autoAlpha: 0, y: 44 },
      {
        autoAlpha: 1, y: 0, duration: 1.05, delay: dly, ease: 'power3.out',
        clearProps: 'y',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
  });

  /* Safety net — paused render loops (hidden tab, occluded window,
     battery saver) never tick rAF, so GSAP would strand everything at
     its hidden "from" state. If no frame has rendered by ~1.2s, settle
     the whole page into its finished static design instead. */
  function settleStatic() {
    if (settleStatic.done) return;
    settleStatic.done = true;
    var els = document.querySelectorAll(
      '.reveal, .w, .wi, .stat__rule, .flow__rail, .flow__marker, .tl-rail__bar,' +
      ' .footer__word, [data-plx], .case__ghost, .plist__idx,' +
      ' .case__visual .ring, .case__visual .grid-deco'
    );
    ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    gsap.killTweensOf(els);
    gsap.set(els, { clearProps: 'all' });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var v = parseFloat(el.dataset.count);
      if (!isNaN(v)) el.textContent = el.dataset.count;
    });
    document.querySelectorAll('.step, .tl-item').forEach(function (el) { el.classList.add('lit'); });
  }
  setTimeout(function () { if (gsap.ticker.time === 0) settleStatic(); }, 1200);

  // Secondary net: a live renderer should still never leave on-screen content hidden.
  setTimeout(function () {
    if (settleStatic.done) return;
    document.querySelectorAll('.reveal').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && +gsap.getProperty(el, 'opacity') < 0.05) {
        gsap.set(el, { autoAlpha: 1, y: 0, clearProps: 'y' });
      }
    });
  }, 3000);

  /* ------------------------------------------------------------
     6 · COUNT-UP NUMBERS  [data-count]
     ------------------------------------------------------------ */
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count);
    if (isNaN(end)) return;
    var dec = (String(el.dataset.count).split('.')[1] || '').length;
    var obj = { v: 0 };
    el.textContent = (0).toFixed(dec);
    gsap.to(obj, {
      v: end, duration: 1.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: function () { el.textContent = obj.v.toFixed(dec); }
    });
  });

  /* ------------------------------------------------------------
     7 · STAT STRIP RULES — thin lines grow in
     ------------------------------------------------------------ */
  gsap.utils.toArray('.stat__rule').forEach(function (el, i) {
    gsap.fromTo(el, { scaleX: 0 }, {
      scaleX: 1, duration: 1.2, delay: i * 0.1, ease: 'power3.inOut', transformOrigin: 'left center',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });

  /* ------------------------------------------------------------
     8 · PARALLAX  [data-plx="±N"]  (yPercent scrubbed)
     ------------------------------------------------------------ */
  gsap.utils.toArray('[data-plx]').forEach(function (el) {
    var v = parseFloat(el.dataset.plx) || 10;
    gsap.fromTo(el, { yPercent: -v * 0.4 }, {
      yPercent: v, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
    });
  });

  /* ------------------------------------------------------------
     9 · MARQUEE  [data-marquee] — infinite belt
     ------------------------------------------------------------ */
  gsap.utils.toArray('[data-marquee]').forEach(function (m) {
    var text = m.getAttribute('data-marquee') || m.textContent.trim();
    m.textContent = '';
    var track = document.createElement('div');
    track.className = 'mq__track';
    for (var i = 0; i < 2; i++) {
      var half = document.createElement('div');
      half.className = 'mq__half';
      var s = '';
      for (var j = 0; j < 6; j++) s += '<span>' + text + '</span>';
      half.innerHTML = s;
      track.appendChild(half);
    }
    m.appendChild(track);
    gsap.to(track, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
  });

  /* ------------------------------------------------------------
     10 · TILT CARDS  [data-tilt]  (desktop only)
     ------------------------------------------------------------ */
  if (finePointer) {
    gsap.utils.toArray('[data-tilt]').forEach(function (card) {
      gsap.set(card, { transformPerspective: 800 });
      var rx = gsap.quickTo(card, 'rotationX', { duration: 0.55, ease: 'power3' });
      var ry = gsap.quickTo(card, 'rotationY', { duration: 0.55, ease: 'power3' });
      var ty = gsap.quickTo(card, 'y', { duration: 0.55, ease: 'power3' });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * 7); ry(px * 9); ty(-6);
      });
      card.addEventListener('pointerleave', function () { rx(0); ry(0); ty(0); });
    });
  }

  /* ------------------------------------------------------------
     11 · MAGNETIC BUTTONS  (desktop only)
     ------------------------------------------------------------ */
  if (finePointer) {
    gsap.utils.toArray('.btn-accent, .btn-ghost, .case__link, .chip').forEach(function (el) {
      var qx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
      var qy = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * 0.22);
        qy((e.clientY - (r.top + r.height / 2)) * 0.3);
      });
      el.addEventListener('pointerleave', function () { qx(0); qy(0); });
    });
  }

  /* ------------------------------------------------------------
     12 · SPOTLIGHT — cursor-following highlight on cards
     ------------------------------------------------------------ */
  if (finePointer) {
    gsap.utils.toArray('.card, .tool, .ai-app, .plist__item, .step, .tl-item').forEach(function (el) {
      el.classList.add('spot');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ------------------------------------------------------------
     13 · PROJECT LIST (home) — cursor chip + row choreography
     ------------------------------------------------------------ */
  (function plist() {
    var list = document.querySelector('.plist');
    if (!list) return;
    if (finePointer) {
      var chip = document.createElement('div');
      chip.className = 'plist__chip';
      chip.textContent = 'View Case ↗';
      list.appendChild(chip);
      gsap.set(chip, { xPercent: -50, yPercent: -130, scale: 0 });
      var cx = gsap.quickTo(chip, 'x', { duration: 0.35, ease: 'power3' });
      var cy = gsap.quickTo(chip, 'y', { duration: 0.35, ease: 'power3' });
      var cs = gsap.quickTo(chip, 'scale', { duration: 0.3, ease: 'power2' });
      list.addEventListener('pointermove', function (e) {
        var r = list.getBoundingClientRect();
        cx(e.clientX - r.left);
        cy(e.clientY - r.top);
        cs(e.target.closest('.plist__item') ? 1 : 0);
      });
      list.addEventListener('pointerleave', function () { cs(0); });
    }
    // big ghost index drifts as you scroll through the list
    gsap.utils.toArray('.plist__idx').forEach(function (idx) {
      gsap.fromTo(idx, { yPercent: 30 }, {
        yPercent: -30, ease: 'none',
        scrollTrigger: { trigger: idx.closest('.plist__item'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  })();

  /* ------------------------------------------------------------
     14 · WORK PAGE — rings rotate & visuals breathe on scrub
     ------------------------------------------------------------ */
  gsap.utils.toArray('.case__visual .ring').forEach(function (ring) {
    gsap.to(ring, {
      rotation: 150, scale: 1.18, ease: 'none', transformOrigin: 'center',
      scrollTrigger: { trigger: ring.closest('.case'), start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
  gsap.utils.toArray('.case__visual .grid-deco').forEach(function (gd) {
    gsap.fromTo(gd, { backgroundPosition: '0px 0px' }, {
      backgroundPosition: '0px -120px', ease: 'none',
      scrollTrigger: { trigger: gd.closest('.case'), start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
  gsap.utils.toArray('.case__ghost').forEach(function (g) {
    gsap.fromTo(g, { xPercent: 8 }, {
      xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: g.closest('.case'), start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });

  /* ------------------------------------------------------------
     15 · PROCESS — outlined numbers ignite + flow rail draws
     ------------------------------------------------------------ */
  gsap.utils.toArray('.step').forEach(function (s) {
    ScrollTrigger.create({
      trigger: s, start: 'top 76%', once: true,
      onEnter: function () { s.classList.add('lit'); }
    });
  });

  var mm = gsap.matchMedia();
  var flowRail = document.querySelector('.flow__rail');
  if (flowRail) {
    mm.add('(min-width: 901px)', function () {
      gsap.fromTo(flowRail, { scaleX: 0 }, {
        scaleX: 1, ease: 'none', transformOrigin: 'left center',
        scrollTrigger: { trigger: '.flow', start: 'top 85%', end: 'bottom 55%', scrub: 0.7 }
      });
    });
    mm.add('(max-width: 900px)', function () {
      gsap.fromTo(flowRail, { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top center',
        scrollTrigger: { trigger: '.flow', start: 'top 80%', end: 'bottom 60%', scrub: 0.7 }
      });
    });
    gsap.fromTo('.flow__marker', { scale: 0.3, autoAlpha: 0 }, {
      scale: 1, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2.2)',
      scrollTrigger: { trigger: '.flow', start: 'top 82%', once: true }
    });
  }

  /* ------------------------------------------------------------
     16 · ABOUT — timeline rail draw + item dots
     ------------------------------------------------------------ */
  var tlBar = document.querySelector('.tl-rail__bar');
  if (tlBar) {
    gsap.fromTo(tlBar, { scaleY: 0 }, {
      scaleY: 1, ease: 'none', transformOrigin: 'top center',
      scrollTrigger: { trigger: '.timeline', start: 'top 78%', end: 'bottom 62%', scrub: 0.7 }
    });
  }
  gsap.utils.toArray('.tl-item').forEach(function (item) {
    ScrollTrigger.create({
      trigger: item, start: 'top 78%', once: true,
      onEnter: function () { item.classList.add('lit'); }
    });
  });

  /* ------------------------------------------------------------
     17 · FOOTER — giant wordmark rises with scrub
     ------------------------------------------------------------ */
  var fword = document.querySelector('.footer__word');
  if (fword) {
    gsap.fromTo(fword, { yPercent: 42, opacity: 0.25 }, {
      yPercent: 0, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: fword, start: 'top bottom', end: 'top 72%', scrub: 0.6 }
    });
  }

  /* ------------------------------------------------------------
     18 · CASE DETAIL — next-project arrow pulse
     ------------------------------------------------------------ */
  var nextArrow = document.querySelector('.cd-next__arrow svg');
  if (nextArrow) {
    gsap.to(nextArrow, { x: 8, y: -8, duration: 0.9, ease: 'power2.inOut', yoyo: true, repeat: -1 });
  }

  /* ------------------------------------------------------------
     19 · Refresh once everything (fonts/images) settles
     ------------------------------------------------------------ */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
