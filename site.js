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
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nav.classList.toggle('menu-open', open);
      document.body.classList.toggle('nav-locked', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        nav.classList.remove('menu-open');
        document.body.classList.remove('nav-locked');
      });
    });
  }
})();
