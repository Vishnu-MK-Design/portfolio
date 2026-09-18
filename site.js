/* ==================================================================
   VISHNU MK — site behaviour
   Theme · navigation · mobile menu · lazy video · copy email
   Everything here works without motion.js.
   ================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var lightQuery = window.matchMedia('(prefers-color-scheme: light)');
  var navHoldUntil = 0;
  function keepNavVisible() {
    navHoldUntil = Date.now() + 1000;
    if (nav) nav.classList.remove('is-hidden');
    lastY = window.scrollY;
  }

  /* ---------- Theme ---------- */
  function storedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function syncToggles(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      var next = theme === 'dark' ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#f6f4f0');
  }
  function applyTheme(theme) {
    keepNavVisible();
    root.dataset.theme = theme;
    syncToggles(theme);
    // Theme layout changes can move the scroll anchor without user scrolling.
    requestAnimationFrame(function () { lastY = window.scrollY; });
  }
  syncToggles(root.dataset.theme || 'dark');

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      keepNavVisible();
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (e) {}

      if (!document.startViewTransition || reduceMotion.matches || document.visibilityState !== 'visible' || root.dataset.vt === '1') {
        applyTheme(next);
        return;
      }
      // Circular reveal expanding from the toggle
      var r = btn.getBoundingClientRect();
      var x = r.left + r.width / 2;
      var y = r.top + r.height / 2;
      var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.style.setProperty('--vt-x', x + 'px');
      root.style.setProperty('--vt-y', y + 'px');
      root.style.setProperty('--vt-r', radius + 'px');
      root.dataset.vt = '1';
      var t = document.startViewTransition(function () { applyTheme(next); });
      t.finished.finally(function () { delete root.dataset.vt; keepNavVisible(); });
      // If the browser can't render the transition (occluded window), switch anyway
      setTimeout(function () {
        if (root.dataset.theme !== next) { applyTheme(next); delete root.dataset.vt; }
      }, 400);
    });
  });

  // Follow the OS until the visitor makes an explicit choice
  lightQuery.addEventListener('change', function (e) {
    if (!storedTheme()) applyTheme(e.matches ? 'light' : 'dark');
  });

  /* ---------- Nav: scrolled state + hide on scroll down ---------- */
  var nav = document.querySelector('.nav');
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 8);
      var menuOpen = document.body.classList.contains('is-locked');
      var keepVisible = menuOpen || Date.now() < navHoldUntil || root.dataset.vt === '1' || nav.matches(':focus-within');
      var hide = !keepVisible && y > 420 && y > lastY + 4;
      var show = keepVisible || y < lastY - 4 || y < 420;
      if (hide) nav.classList.add('is-hidden');
      else if (show) nav.classList.remove('is-hidden');
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  // Keyboard users tabbing into the bar should always see it
  if (nav) nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var links = document.getElementById('site-menu');
  var scrim = document.querySelector('.nav__scrim');
  var mobile = window.matchMedia('(max-width: 860px)');

  function setMenuInert() {
    if (!links) return;
    var closed = !links.classList.contains('is-open');
    if (mobile.matches && closed) links.setAttribute('inert', '');
    else links.removeAttribute('inert');
  }
  function openMenu() {
    links.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('is-locked');
    setMenuInert();
    var first = links.querySelector('a');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }
  function closeMenu(returnFocus) {
    links.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('is-locked');
    setMenuInert();
    if (returnFocus) menuBtn.focus();
  }
  if (menuBtn && links) {
    setMenuInert();
    var onViewportChange = function () {
      if (!mobile.matches && links.classList.contains('is-open')) closeMenu(false);
      setMenuInert();
    };
    mobile.addEventListener('change', onViewportChange);
    window.addEventListener('resize', onViewportChange);
    menuBtn.addEventListener('click', function () {
      links.classList.contains('is-open') ? closeMenu(true) : openMenu();
    });
    if (scrim) scrim.addEventListener('click', function () { closeMenu(true); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (!links.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key !== 'Tab') return;
      // Trap focus between the menu button and the drawer's links
      var items = [menuBtn].concat(Array.prototype.slice.call(links.querySelectorAll('a')));
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    });
  }

  /* ---------- Lazy background video ----------
     Videos load only when near the viewport, play only while visible,
     and never load for reduced-motion or data-saver visitors. */
  var saveData = navigator.connection && navigator.connection.saveData;
  var videos = document.querySelectorAll('video[data-lazy]');
  if (videos.length && !reduceMotion.matches && !saveData && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          if (!v.dataset.loaded) {
            v.querySelectorAll('source[data-src]').forEach(function (s) { s.src = s.dataset.src; });
            v.load();
            v.dataset.loaded = '1';
            v.addEventListener('playing', function () { v.classList.add('is-ready'); }, { once: true });
          }
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else if (v.dataset.loaded) {
          v.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach(function (v) { io.observe(v); });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.querySelector('[data-copy-label]');
    var status = document.getElementById('copy-status');
    var original = label ? label.textContent : '';
    var timer;
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        btn.dataset.state = 'copied';
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to clipboard';
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.dataset.state = '';
          if (label) label.textContent = original;
          if (status) status.textContent = '';
        }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
      } else {
        window.location.href = 'mailto:' + text;
      }
    });
  });

  /* ---------- Case-study filters ---------- */
  var workFilters = document.querySelectorAll('[data-work-filter]');
  var workProjects = document.querySelectorAll('.project[data-category]');
  var workCount = document.getElementById('work-count');
  if (workFilters.length && workProjects.length) {
    var categoryNames = { product: 'Product & UX', web: 'Web experiences', visual: 'Visual design' };
    document.querySelector('.work-browser').hidden = false;
    function updateWorkFilter(category) {
      var visible = 0;
      workProjects.forEach(function (project) {
        var matches = category === 'all' || project.dataset.category === category;
        project.hidden = !matches;
        if (matches) visible += 1;
      });
      workFilters.forEach(function (filter) {
        filter.setAttribute('aria-pressed', String(filter.dataset.workFilter === category));
      });
      if (workCount) {
        workCount.textContent = category === 'all'
          ? 'Showing all ' + visible + ' projects'
          : categoryNames[category] + ' · ' + visible + ' projects';
      }
    }
    workFilters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        var category = filter.dataset.workFilter;
        updateWorkFilter(category);
        try { history.replaceState(null, '', category === 'all' ? location.pathname + location.search : '#' + category); } catch (e) {}
      });
    });
    function filterFromHash() {
      var category = location.hash.slice(1);
      updateWorkFilter(Object.prototype.hasOwnProperty.call(categoryNames, category) ? category : 'all');
    }
    filterFromHash();
    window.addEventListener('hashchange', filterFromHash);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
