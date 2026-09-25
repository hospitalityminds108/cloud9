/* =========================================================================
   CLOUD 9 — INNER PAGES behaviour (loaded only by the new inner pages)
   - Hero entrance, scroll reveals, clip image reveals, SVG line drawing
   - Slow parallax + timeline progress via GSAP ScrollTrigger (desktop)
   - Panorama gallery controls
   - Active state for the shared header nav (runs after main.js)
   Uses GSAP/ScrollTrigger when available; falls back to IntersectionObserver.
   Everything is scoped to main.c9x — nothing outside it is touched except
   adding the active class to the matching header nav item.
   ========================================================================= */
(function () {
  'use strict';

  var root = document.querySelector('main.c9x');
  if (!root) return;
  window.__c9xReady = true;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) window.gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- helpers ---------- */
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }

  function onEnter(el, cb, start) {
    if (reduced) { cb(); return; }
    if (hasGsap) {
      window.ScrollTrigger.create({ trigger: el, start: start || 'top 88%', once: true, onEnter: cb });
      return;
    }
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { cb(); io.disconnect(); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    io.observe(el);
  }

  /* ---------- 1. Header nav active state ---------- */
  function setNavActive() {
    var target = (document.body.getAttribute('data-c9x-nav') || '').toLowerCase();
    if (!target) return;
    document.querySelectorAll('.main-nav .nav-link').forEach(function (l) {
      if ((l.textContent || '').trim().toLowerCase() === target) l.classList.add('active-page');
    });
    document.querySelectorAll('.mobile-nav .mobile-nav-link').forEach(function (l) {
      if ((l.textContent || '').trim().toLowerCase().indexOf(target) === 0) l.classList.add('active-page');
    });
    // Highlight the current page inside the dropdown / mobile sub-menu
    var file = (location.pathname.split('/').pop() || '').toLowerCase();
    document.querySelectorAll('.main-nav .dropdown a, .mobile-nav .mobile-sub a').forEach(function (a) {
      if ((a.getAttribute('href') || '').toLowerCase() === file) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- 2. Hero entrance ---------- */
  function initHero() {
    var hero = root.querySelector('.c9x-hero');
    if (!hero) return;
    var img = hero.querySelector('.c9x-hero__media img');
    var go = function () { requestAnimationFrame(function () { hero.classList.add('is-ready'); }); };
    if (!img || img.complete) { setTimeout(go, 60); }
    else {
      img.addEventListener('load', go, { once: true });
      img.addEventListener('error', go, { once: true });
      setTimeout(go, 1400); // never wait long for a slow image
    }
  }

  /* ---------- 3. Reveals ---------- */
  function initReveals() {
    // stagger groups: children get incremental delays
    $all('[data-x-stagger]').forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-x-stagger')) || 0.12;
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.hasAttribute('data-x-reveal') || child.hasAttribute('data-x-clip')) {
          child.style.setProperty('--x-delay', (i * step).toFixed(2) + 's');
        }
      });
    });
    $all('[data-x-reveal], [data-x-clip]').forEach(function (el) {
      onEnter(el, function () { el.classList.add('is-in'); });
    });
    // SVG line drawing: measure paths, draw when their card enters
    $all('.c9x-art').forEach(function (svg) {
      if (reduced && svg.pauseAnimations) svg.pauseAnimations(); // freeze SMIL markers
      $all('.draw', svg).forEach(function (p) {
        try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1); } catch (e) { /* non-geometry */ }
      });
      onEnter(svg, function () { svg.classList.add('is-in'); }, 'top 80%');
    });
  }

  /* ---------- 4. Parallax + timeline (GSAP, desktop/tablet only) ---------- */
  function initScrollFx() {
    var tls = $all('.c9x-tl');
    if (reduced) return;

    if (!hasGsap) {
      // Fallback: fill timeline rails once visible
      tls.forEach(function (tl) {
        var rail = tl.querySelector('.c9x-tl__rail span');
        onEnter(tl, function () { if (rail) { rail.style.transition = 'transform 2.4s cubic-bezier(.16,.84,.24,1)'; rail.style.setProperty('--p', 1); } });
      });
      return;
    }

    var gsap = window.gsap;
    var mm = gsap.matchMedia();

    // Slow parallax only on larger screens
    mm.add('(min-width: 901px)', function () {
      $all('[data-x-parallax]').forEach(function (frame) {
        var img = frame.querySelector('.c9x-par');
        if (!img) return;
        var amt = parseFloat(frame.getAttribute('data-x-parallax')) || 6;
        gsap.fromTo(img, { yPercent: -amt }, {
          yPercent: amt, ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        });
      });
    });

    // Timeline: rail grows with scroll, stages enter one by one
    tls.forEach(function (tl) {
      var rail = tl.querySelector('.c9x-tl__rail span');
      if (rail) {
        window.ScrollTrigger.create({
          trigger: tl, start: 'top 75%', end: 'bottom 55%', scrub: 0.4,
          onUpdate: function (self) { rail.style.setProperty('--p', self.progress.toFixed(3)); }
        });
      }
    });

    // Recalculate once all images are in (layout shifts)
    window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
  }

  /* ---------- 5. Panorama gallery controls ---------- */
  function initPanos() {
    $all('[data-x-pano]').forEach(function (pano) {
      var track = pano.querySelector('.c9x-pano__track');
      var prev = pano.querySelector('[data-x-prev]');
      var next = pano.querySelector('[data-x-next]');
      var bar = pano.querySelector('.c9x-progress span');
      if (!track) return;
      function step() {
        var item = track.children[0];
        return item ? item.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth;
        var p = max > 0 ? track.scrollLeft / max : 0;
        if (bar) {
          var w = Math.max(0.12, Math.min(1, track.clientWidth / track.scrollWidth));
          bar.style.width = (w * 100) + '%';
          bar.style.transform = 'translateX(' + (p * (1 / w - 1) * 100) + '%)';
        }
        if (prev) prev.disabled = track.scrollLeft < 4;
        if (next) next.disabled = track.scrollLeft > max - 4;
      }
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }

  function init() {
    setNavActive();
    initHero();
    initReveals();
    initScrollFx();
    initPanos();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
