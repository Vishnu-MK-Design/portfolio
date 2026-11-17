/* ==================================================================
   VISHNU MK — site behaviour
   Copy email, case-study filters, and process tabs
   ================================================================== */
(function () {
  'use strict';

  document.querySelectorAll('[data-ambient-showreel]').forEach(video => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const name = video.dataset.showreelName || 'Project';
    let inView = false;
    let manuallyPaused = false;
    let userStarted = false;
    const describe = () => video.setAttribute('aria-label', (video.paused ? 'Play ' : 'Pause ') + name + ' showreel');
    const resume = () => {
      if (inView && !document.hidden && !manuallyPaused &&
          (userStarted || (!motionPreference.matches && !navigator.connection?.saveData))) video.play().catch(() => {});
    };
    const toggle = () => {
      userStarted = true;
      manuallyPaused = !video.paused;
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    };
    video.addEventListener('click', toggle);
    video.addEventListener('keydown', event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); toggle(); }
    });
    video.addEventListener('play', describe);
    video.addEventListener('pause', describe);
    describe();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.intersectionRatio >= .35;
        if (entry.intersectionRatio < .15) video.pause();
        else resume();
      }, {threshold:[0, .15, .35]}).observe(video);
    }
    document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else resume(); });
    motionPreference.addEventListener('change', () => {
      if (motionPreference.matches) { manuallyPaused = true; video.pause(); }
      else resume();
    });
  });

  document.querySelectorAll('[data-portrait-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const color = button.classList.toggle('is-color');
      button.setAttribute('aria-pressed', String(color));
      button.setAttribute('aria-label', color ? 'Show portrait in black and white' : 'Show portrait in colour');
    });
  });

  const homeHero = document.querySelector('.home-page .hero, .inner-page main > section:first-child');
  const header = document.querySelector('.site-header');
  if (header) {
    const menu = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.main-nav');
    const mobile = window.matchMedia('(max-width: 780px)');
    if (menu && nav) {
      header.classList.add('has-mobile-menu');
      menu.hidden = false;
      const setMenu = open => {
        header.classList.toggle('is-menu-open', open);
        header.classList.remove('is-scroll-hidden');
        menu.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      };
      menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
      header.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          menu.focus();
        }
      });
      nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
      document.addEventListener('click', event => {
        if (header.classList.contains('is-menu-open') && !header.contains(event.target)) setMenu(false);
      });
      header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) setMenu(false); });
      mobile.addEventListener('change', () => {
        if (!mobile.matches && document.activeElement === menu) nav.querySelector('a')?.focus();
        if (mobile.matches && nav.contains(document.activeElement)) menu.focus();
        setMenu(false);
      });
    }
    let lastY = Math.max(0, window.scrollY);
    const updateHeader = function () {
      if (homeHero) {
        header.classList.toggle('is-past-hero', homeHero.getBoundingClientRect().bottom <= header.offsetHeight);
      }
    };
    updateHeader();
    window.addEventListener('scroll', () => {
      updateHeader();
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      if (y <= header.offsetHeight || header.classList.contains('is-menu-open')) {
        header.classList.remove('is-scroll-hidden');
        lastY = y;
      } else if (Math.abs(y - lastY) >= 8) {
        header.classList.toggle('is-scroll-hidden', y > lastY);
        lastY = y;
      }
    }, { passive: true });
    window.addEventListener('resize', updateHeader);
    window.addEventListener('pageshow', () => {
      lastY = Math.max(0, window.scrollY);
      header.classList.remove('is-scroll-hidden');
      updateHeader();
    });
  }

  const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const steps = Array.from(document.querySelectorAll('.process-steps li'));
  const counter = document.querySelector('.process-current');
  const progressBar = document.querySelector('.process-track span');
  let activeStep = -1;
  const updateSteps = () => {
    if (!steps.length) return;
    let active = 0;
    steps.forEach((step, index) => {
      if (step.getBoundingClientRect().top < window.innerHeight * .53) active = index;
    });
    if (active === activeStep) return;
    activeStep = active;
    steps.forEach((step, index) => step.classList.toggle('is-active', index === active));
    if (counter) counter.textContent = String(active + 1).padStart(2, '0');
    if (progressBar) progressBar.style.transform = 'scaleX(' + (active + 1) / steps.length + ')';
    if (motion.matches && counter?.animate) counter.animate([{opacity:.3,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)'});
  };
  if (motion.matches) {
    const scrubs = [];
    const hero = document.querySelector('.home-page .hero');
    const desktopHero = window.matchMedia('(min-width: 781px)');
    const masks = [];
    const headings = document.querySelectorAll('[data-reveal], main .section-title h2, .case-body h2');
    headings.forEach(heading => {
      const isScrub = heading.textContent.trim().split(/\s+/).length > 14;
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      const words = [];
      nodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(token => {
          if (!token.trim()) { fragment.append(token); return; }
          const word = document.createElement('span');
          word.className = isScrub ? 'scrub-word' : 'motion-word';
          if (isScrub) word.textContent = token;
          else {
            const inner = document.createElement('span');
            inner.textContent = token;
            word.append(inner);
          }
          words.push(word);
          fragment.append(word);
        });
        node.replaceWith(fragment);
      });
      heading.classList.add(isScrub ? 'scroll-statement' : 'line-reveal');
      if (isScrub) scrubs.push({heading, words, current:0, target:0});
      else masks.push({heading, words});
    });
    const measureLines = () => masks.forEach(({words}) => {
      let previousTop = -Infinity, line = -1;
      words.forEach(word => {
        const top = word.getBoundingClientRect().top;
        if (Math.abs(top - previousTop) > 8) { line++; previousTop = top; }
        word.style.setProperty('--line-delay', Math.min(line * 110, 440) + 'ms');
      });
    });
    measureLines();
    document.fonts.ready.then(measureLines);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) { target.classList.add('is-revealed'); observer.unobserve(target); }
      });
    }, {threshold:.08, rootMargin:'0px 0px -6% 0px'});
    masks.forEach(({heading}) => observer.observe(heading));
    document.querySelectorAll('.home-work-card, .service-row, .process-steps li, .home-about .lead, .footer-cta, .inner-page .project, .inner-page .portrait, .inner-page .principle-grid article, .inner-page .career li, .inner-page .discipline, .inner-page .ai-matrix article, .inner-page .tool-stack .tool, .inner-page .contact-email, .inner-page .contact-details > div, .inner-page .case-cover, .inner-page .case-body figure, .inner-page .next-case').forEach((element, index) => {
      element.classList.add('section-reveal');
      element.style.setProperty('--enter-delay', element.classList.contains('home-work-card') ? (index % 2) * 100 + 'ms' : '0ms');
      observer.observe(element);
    });
    let frame = 0;
    let previousTime = 0;
    const draw = time => {
      frame = 0;
      if (!motion.matches) return;
      const ease = 1 - Math.exp(-Math.min(time - previousTime || 16, 64) / 85);
      previousTime = time;
      let unfinished = false;
      scrubs.forEach(item => {
        item.current += (item.target - item.current) * ease;
        if (Math.abs(item.target - item.current) < .001) item.current = item.target;
        else unfinished = true;
        item.words.forEach((word, index) => {
          const amount = clamp(item.current * (item.words.length + 3) - index);
          word.style.opacity = String(.55 + amount * .45);
        });
      });
      if (unfinished) frame = requestAnimationFrame(draw);
    };
    const updateScroll = () => {
      updateSteps();
      scrubs.forEach(item => {
        const rect = item.heading.getBoundingClientRect();
        item.target = clamp((window.innerHeight * .85 - rect.top) / (window.innerHeight * .35 + rect.height));
      });
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const depth = motion.matches && desktopHero.matches ? clamp(-rect.top / rect.height) : 0;
        hero.style.setProperty('--portrait-drift', depth * 28 + 'px');
      }
      if (!frame) { previousTime = 0; frame = requestAnimationFrame(draw); }
    };
    let scrollFrame = 0;
    const queueScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; updateScroll(); });
    };
    window.addEventListener('scroll', queueScroll, {passive:true});
    window.addEventListener('resize', () => {measureLines(); queueScroll();});
    window.addEventListener('pageshow', updateScroll);
    updateScroll();
    document.body.classList.add('hero-enter');
    motion.addEventListener('change', () => {
      if (!motion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        observer.disconnect();
        document.querySelectorAll('.line-reveal, .section-reveal').forEach(el => el.classList.add('is-revealed'));
        scrubs.forEach(({words}) => words.forEach(word => word.style.opacity = '1'));
        if (hero) hero.style.setProperty('--portrait-drift', '0px');
      }
    });
  } else {
    window.addEventListener('scroll', updateSteps, {passive:true});
  }
  window.addEventListener('resize', updateSteps);
  updateSteps();

  const pointer = window.matchMedia('(any-pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (pointer.matches) {
    const root = document.documentElement;
    const cursor = document.createElement('div');
    const glow = document.createElement('div');
    cursor.className = 'portfolio-cursor';
    glow.className = 'portfolio-cursor-light';
    cursor.setAttribute('aria-hidden', 'true');
    glow.setAttribute('aria-hidden', 'true');
    document.body.append(glow, cursor);
    let x = 0;
    let y = 0;
    let glowX = 0;
    let glowY = 0;
    let pointerFrame = 0;
    let lastFrame = 0;
    const interactive = 'a[href], button:not(:disabled), summary, [role="button"]';
    const hideCursor = () => {
      root.classList.remove('custom-cursor');
      cursor.classList.remove('is-pressed');
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      lastFrame = 0;
    };
    const drawCursor = time => {
      pointerFrame = 0;
      const elapsed = lastFrame ? Math.min(time - lastFrame, 48) : 16;
      const follow = 1 - Math.exp(-elapsed / 100);
      lastFrame = time;
      glowX += (x - glowX) * follow;
      glowY += (y - glowY) * follow;
      if (Math.hypot(x - glowX, y - glowY) < .4) {
        glowX = x;
        glowY = y;
        lastFrame = 0;
      } else {
        pointerFrame = requestAnimationFrame(drawCursor);
      }
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    };
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || !pointer.matches ||
          event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video[controls]')) {
        hideCursor();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (!root.classList.contains('custom-cursor')) {
        glowX = x;
        glowY = y;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.classList.toggle('is-interactive', Boolean(event.target.closest(interactive)));
      root.classList.add('custom-cursor');
      if (!pointerFrame) pointerFrame = requestAnimationFrame(drawCursor);
    }, { passive: true });
    document.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && root.classList.contains('custom-cursor')) {
        cursor.classList.add('is-pressed');
      }
    }, { passive: true });
    const releaseCursor = () => cursor.classList.remove('is-pressed');
    window.addEventListener('pointerup', releaseCursor, { passive: true });
    window.addEventListener('pointercancel', releaseCursor);
    root.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);
    document.addEventListener('keydown', event => {
      if (['Tab', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) hideCursor();
    });
    pointer.addEventListener('change', hideCursor);
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    btn.hidden = false;
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
      navigator.clipboard.writeText(text).then(done, function () {
        if (status) status.textContent = 'Could not copy the email address';
        if (label) label.textContent = 'Copy unavailable';
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (label) label.textContent = original;
          if (status) status.textContent = '';
        }, 2200);
      });
    });
  });

  /* ---------- Case-study filters + load more ---------- */
  var workFilters = document.querySelectorAll('[data-work-filter]');
  var workProjects = document.querySelectorAll('.project[data-category]');
  var workCount = document.getElementById('work-count');
  var workMore = document.querySelector('[data-work-load-more]');
  var workMoreWrap = document.querySelector('[data-work-more-controls]');
  var workExpanded = false;
  var activeWorkCategory = 'all';
  if (workFilters.length && workProjects.length) {
    var categoryNames = { product: 'Product & UX', web: 'Web experiences', visual: 'Visual design' };
    document.querySelector('.work-browser').hidden = false;
    function updateWorkFilter(category) {
      var visible = 0;
      var total = 0;
      activeWorkCategory = category;
      workProjects.forEach(function (project) {
        var matches = category === 'all' || project.dataset.category === category;
        var deferred = category === 'all' && project.hasAttribute('data-work-more') && !workExpanded;
        project.hidden = !matches || deferred;
        if (matches) total += 1;
        if (!project.hidden) visible += 1;
      });
      workFilters.forEach(function (filter) {
        filter.setAttribute('aria-pressed', String(filter.dataset.workFilter === category));
      });
      if (workCount) {
        var summary = visible === total
          ? 'Showing all ' + visible + (visible === 1 ? ' project' : ' projects')
          : 'Showing ' + visible + ' of ' + total + ' projects';
        workCount.textContent = category === 'all' ? summary : categoryNames[category] + ' · ' + summary;
      }
      if (workMoreWrap) workMoreWrap.hidden = visible === total;
      if (workMore) workMore.setAttribute('aria-label', 'Load more: show ' + (total - visible) + ' additional projects');
    }
    if (workMore) workMore.addEventListener('click', function () {
      var firstNewProject = Array.prototype.find.call(workProjects, function (project) {
        return project.hidden && project.hasAttribute('data-work-more') &&
          (activeWorkCategory === 'all' || project.dataset.category === activeWorkCategory);
      });
      workExpanded = true;
      updateWorkFilter(activeWorkCategory);
      // The button disappears after expansion; continue keyboard navigation at the new work.
      if (firstNewProject) firstNewProject.focus();
    });
    workFilters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        var category = filter.dataset.workFilter;
        updateWorkFilter(category);
        try { history.replaceState(null, '', category === 'all' ? location.pathname + location.search : '#' + category); } catch (e) {}
      });
    });
    function filterFromHash() {
      var category = location.hash.slice(1);
      var filtered = Object.prototype.hasOwnProperty.call(categoryNames, category);
      updateWorkFilter(filtered ? category : 'all');
      if (filtered) {
        document.fonts.ready.then(() => requestAnimationFrame(() => {
          // These hashes describe filter state, not an element ID.
          if (location.hash === '#' + category) document.getElementById('archive')?.scrollIntoView({behavior:'instant',block:'start'});
        }));
      }
    }
    filterFromHash();
    window.addEventListener('hashchange', filterFromHash);
  }

  document.querySelectorAll('[data-process]').forEach(function (process) {
    const tablist = process.querySelector('.process-tabs');
    const tabs = Array.from(tablist.querySelectorAll('button'));
    const panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });
    const stacked = window.matchMedia('(min-width: 681px)');
    const setOrientation = function () {
      tablist.setAttribute('aria-orientation', stacked.matches ? 'vertical' : 'horizontal');
    };
    const selectTab = function (active) {
      tabs.forEach(function (tab, index) {
        const selected = active === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
      });
    };
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', 'Design process steps');
    setOrientation();
    stacked.addEventListener('change', setOrientation);
    tabs.forEach(function (tab, index) {
      tab.setAttribute('role', 'tab');
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tab.id);
      panels[index].tabIndex = 0;
      tab.addEventListener('click', function () { selectTab(index); });
      tab.addEventListener('keydown', function (event) {
        const nextKey = stacked.matches ? 'ArrowDown' : 'ArrowRight';
        const previousKey = stacked.matches ? 'ArrowUp' : 'ArrowLeft';
        let nextIndex = index;
        switch (event.key) {
          case nextKey: nextIndex = (index + 1) % tabs.length; break;
          case previousKey: nextIndex = (index + tabs.length - 1) % tabs.length; break;
          case 'Home': nextIndex = 0; break;
          case 'End': nextIndex = tabs.length - 1; break;
          default: return;
        }
        event.preventDefault();
        selectTab(nextIndex);
        tabs[nextIndex].focus();
      });
    });
    const selectLinkedStep = function () {
      const linkedStep = panels.findIndex(function (panel) {
        return location.hash === '#' + panel.id || location.hash === '#' + panel.querySelector('h3').id;
      });
      if (linkedStep >= 0) selectTab(linkedStep);
    };
    selectTab(0);
    selectLinkedStep();
    window.addEventListener('hashchange', selectLinkedStep);
    tablist.hidden = false;
  });

  const caseBody = document.querySelector('.case-body');
  const caseSections = Array.from(document.querySelectorAll('.case-nav a[href^="#"]'), link => {
    const heading = document.getElementById(link.hash.slice(1));
    return { link, section: heading?.closest('section') || heading };
  }).filter(({ section }) => section && caseBody?.contains(section));
  if (caseSections.length) {
    let currentLink;
    let sectionFrame = 0;
    const markSection = () => {
      sectionFrame = 0;
      const readingLine = Math.min(window.innerHeight * .28, 180);
      const bounds = caseBody.getBoundingClientRect();
      let nextLink;
      if (bounds.top <= readingLine && bounds.bottom > readingLine) {
        for (const { link, section } of caseSections) {
          if (section.getBoundingClientRect().top <= readingLine) nextLink = link;
        }
      }
      if (nextLink === currentLink) return;
      currentLink?.removeAttribute('aria-current');
      nextLink?.setAttribute('aria-current', 'location');
      currentLink = nextLink;
    };
    const queueSection = () => {
      if (!sectionFrame) sectionFrame = requestAnimationFrame(markSection);
    };
    queueSection();
    window.addEventListener('scroll', queueSection, { passive: true });
    window.addEventListener('resize', queueSection);
    window.addEventListener('hashchange', queueSection);
    window.addEventListener('pageshow', queueSection);
    document.fonts?.ready.then(queueSection);
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
