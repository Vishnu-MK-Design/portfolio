// ============================================================
//  Vishnu MK — Portfolio base behaviour
//  Nav state + mobile menu. All animation lives in motion.js
//  (GSAP + ScrollTrigger + Three.js). Content is visible by
//  default, so nothing here can ever strand a hidden section.
// ============================================================
(function () {
  document.documentElement.classList.add('js');

  // ---------- Nav scroll state (glass blur) ----------
  var nav = document.querySelector('.nav');
  var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  var scrim = document.querySelector('.nav__scrim');
  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove('open');
      nav.classList.remove('menu-open');
      document.body.classList.remove('nav-locked');
    };
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nav.classList.toggle('menu-open', open);
      document.body.classList.toggle('nav-locked', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    if (scrim) scrim.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ---------- Home · intro UI-fragment theme toggle ----------
  var fragToggle = document.querySelector('.mock-frag__toggle');
  var frag = document.querySelector('.mock-frag--front');
  if (fragToggle && frag) {
    fragToggle.addEventListener('click', function () {
      var isLight = frag.classList.toggle('is-light');
      fragToggle.setAttribute('aria-pressed', String(isLight));
      fragToggle.setAttribute('aria-label', isLight ? 'Preview in dark mode' : 'Preview in light mode');
    });
  }
})();
