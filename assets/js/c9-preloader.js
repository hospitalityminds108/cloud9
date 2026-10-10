/* =========================================================================
   CLOUD 9 — once-per-session preloader
   Loaded synchronously in <head> so it can cover the page before first paint.
   - Shows once per browser session (sessionStorage), on whichever page the
     visitor lands on first. Later pages in the same session load normally.
   - Pure SVG + CSS scene (see assets/css/c9-preloader.css) — no video file.
   - Never blocks the site: it ends on its own timer, can be skipped with a
     click / Esc / the Skip button, and has a hard safety timeout.
   ========================================================================= */
(function () {
  'use strict';
  var KEY = 'c9pl:seen';
  var root = document.documentElement;

  try { if (window.sessionStorage.getItem(KEY)) return; } catch (e) { return; } // storage blocked → never show
  // Do not show for print or crawler-style prerenders
  if (window.matchMedia && window.matchMedia('print').matches) return;

  try { window.sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
  root.classList.add('c9pl-on');

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SHOW_MS = reduced ? 1300 : 3900;   // time on screen before the reveal starts
  var EXIT_MS = reduced ? 350 : 1050;    // reveal duration
  var done = false, el = null, timer = null;

  var SCENE =
    '<svg class="c9pl__scene" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<linearGradient id="c9plSky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#0b1c11"/><stop offset=".42" stop-color="#1b3d25"/>' +
          '<stop offset=".74" stop-color="#56755a"/><stop offset="1" stop-color="#d9b983"/>' +
        '</linearGradient>' +
        '<radialGradient id="c9plGlow" cx=".5" cy=".5" r=".5">' +
          '<stop offset="0" stop-color="#ffe9b8" stop-opacity=".95"/><stop offset=".28" stop-color="#f6d08a" stop-opacity=".55"/>' +
          '<stop offset="1" stop-color="#f6d08a" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<linearGradient id="c9plMist" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#f3ead8" stop-opacity="0"/><stop offset=".5" stop-color="#f3ead8" stop-opacity=".34"/>' +
          '<stop offset="1" stop-color="#f3ead8" stop-opacity="0"/>' +
        '</linearGradient>' +
        '<linearGradient id="c9plH1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9db596"/><stop offset=".5" stop-color="#7d9a7a"/></linearGradient>' +
        '<linearGradient id="c9plH2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9070"/><stop offset=".5" stop-color="#4f7453"/></linearGradient>' +
        '<linearGradient id="c9plH3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#456f4b"/><stop offset=".5" stop-color="#2f5836"/></linearGradient>' +
        '<linearGradient id="c9plH4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#285235"/><stop offset=".6" stop-color="#183a24"/></linearGradient>' +
        '<linearGradient id="c9plH5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#163420"/><stop offset="1" stop-color="#0b1c11"/></linearGradient>' +
        '<filter id="c9plBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>' +
      '</defs>' +

      '<rect class="c9pl__sky" width="1440" height="900" fill="url(#c9plSky)"/>' +
      '<g class="c9pl__stars" fill="#f3ead8">' +
        '<circle cx="180" cy="96" r="1.4"/><circle cx="352" cy="58" r="1"/><circle cx="508" cy="132" r="1.2"/>' +
        '<circle cx="716" cy="72" r="1"/><circle cx="902" cy="118" r="1.3"/><circle cx="1088" cy="64" r="1"/>' +
        '<circle cx="1264" cy="140" r="1.2"/><circle cx="1352" cy="84" r="1"/><circle cx="96" cy="200" r="1"/>' +
      '</g>' +

      /* sun rising behind the far ridge */
      '<g class="c9pl__sun"><circle cx="880" cy="470" r="250" fill="url(#c9plGlow)"/><circle cx="880" cy="470" r="46" fill="#ffe7b0"/></g>' +

      /* clouds (echo the cloud in the logo) */
      '<g fill="#f3ead8">' +
        '<path class="c9pl__cloud" d="M210 250c0-20 16-34 36-34 8-22 28-36 52-36 30 0 54 22 58 50 20 2 34 16 34 34H210z"/>' +
        '<path class="c9pl__cloud c9pl__cloud--b" d="M1010 190c0-16 13-27 29-27 6-18 22-29 42-29 24 0 43 18 46 40 16 2 27 13 27 27H1010z"/>' +
        '<path class="c9pl__cloud c9pl__cloud--c" d="M560 320c0-12 10-21 22-21 5-14 17-22 32-22 18 0 33 13 35 30 12 1 21 10 21 21H560z"/>' +
      '</g>' +

      '<g class="c9pl__birds" fill="none" stroke="#0f2415" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M420 300q9-9 18 0q9-9 18 0"/><path d="M468 322q7-7 14 0q7-7 14 0"/><path d="M392 334q6-6 12 0q6-6 12 0"/>' +
      '</g>' +

      /* five ridges, far to near */
      '<path class="c9pl__hill c9pl__hill--1" fill="url(#c9plH1)" d="M0 560 C120 500 220 520 330 470 S520 380 640 430 S860 500 980 430 S1200 340 1320 400 S1410 450 1440 440 V900 H0Z"/>' +
      '<rect class="c9pl__mist" x="-120" y="470" width="1680" height="110" fill="url(#c9plMist)" filter="url(#c9plBlur)"/>' +
      '<path class="c9pl__hill c9pl__hill--2" fill="url(#c9plH2)" d="M0 620 C100 590 190 540 300 560 S500 640 620 590 S800 480 920 520 S1120 620 1240 570 S1390 520 1440 540 V900 H0Z"/>' +
      '<path class="c9pl__hill c9pl__hill--3" fill="url(#c9plH3)" d="M0 690 C140 640 260 650 380 610 S600 560 720 620 S930 720 1060 660 S1300 600 1440 650 V900 H0Z"/>' +

      /* the resort on the middle ridge: cottages, a gazebo and trees */
      '<g class="c9pl__hill c9pl__hill--3">' +
        '<g fill="#0f2415">' +
          '<path d="M818 606l34-22 34 22v26h-68z"/><path d="M896 612l30-19 30 19v22h-60z"/><path d="M966 622l28-18 28 18v20h-56z"/>' +
          '<path d="M748 610l26-17 26 17v20h-52z"/>' +
          '<path d="M1042 640l20-22 20 22v4h-40z"/><rect x="1048" y="644" width="3" height="16"/><rect x="1073" y="644" width="3" height="16"/>' +
          '<path d="M716 628c0-16 8-28 14-28s14 12 14 28z"/><rect x="728" y="626" width="4" height="12"/>' +
          '<path d="M1096 654c0-14 7-25 12-25s12 11 12 25z"/><rect x="1106" y="652" width="4" height="12"/>' +
          '<path d="M878 598c0-12 6-21 10-21s10 9 10 21z"/>' +
        '</g>' +
        '<g fill="#ffd98a">' +
          '<rect class="c9pl__win" x="832" y="612" width="8" height="9" rx="1"/><rect class="c9pl__win" x="862" y="612" width="8" height="9" rx="1"/>' +
          '<rect class="c9pl__win" x="908" y="617" width="7" height="8" rx="1"/><rect class="c9pl__win" x="936" y="617" width="7" height="8" rx="1"/>' +
          '<rect class="c9pl__win" x="978" y="626" width="7" height="8" rx="1"/><rect class="c9pl__win" x="1002" y="626" width="7" height="8" rx="1"/>' +
          '<rect class="c9pl__win" x="760" y="614" width="7" height="8" rx="1"/><rect class="c9pl__win" x="782" y="614" width="7" height="8" rx="1"/>' +
        '</g>' +
      '</g>' +

      '<rect class="c9pl__mist c9pl__mist--b" x="-120" y="640" width="1680" height="120" fill="url(#c9plMist)" filter="url(#c9plBlur)"/>' +
      '<path class="c9pl__hill c9pl__hill--4" fill="url(#c9plH4)" d="M0 770 C160 720 300 760 440 720 S700 660 840 720 S1100 800 1240 740 S1400 720 1440 730 V900 H0Z"/>' +
      '<path class="c9pl__hill c9pl__hill--5" fill="url(#c9plH5)" d="M0 850 C180 800 340 840 520 810 S860 780 1020 830 S1320 860 1440 820 V900 H0Z"/>' +
    '</svg>';

  function build() {
    if (el || done) return;
    el = document.createElement('div');
    el.className = 'c9pl';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'Cloud 9 Hills Resort is loading');
    // Portrait screens: frame the camera on the sun + resort instead of the scene's centre
    var portrait = window.innerHeight > window.innerWidth * 1.1;
    var scene = portrait ? SCENE.replace('viewBox="0 0 1440 900"', 'viewBox="600 0 620 900"') : SCENE;
    el.innerHTML = scene +
      '<div class="c9pl__veil"></div>' +
      '<div class="c9pl__brand">' +
        '<img class="c9pl__logo" src="assets/logos.webp" alt="Cloud 9 Hills Resort" width="1280" height="720" decoding="sync" fetchpriority="high">' +
        '<span class="c9pl__rule"></span>' +
        '<p class="c9pl__tag">Lonavala &middot; Western Ghats</p>' +
      '</div>' +
      '<div class="c9pl__bar" aria-hidden="true"><i></i></div>' +
      '<button type="button" class="c9pl__skip">Skip</button>';
    document.body.insertBefore(el, document.body.firstChild);
    el.addEventListener('click', finish);
    document.addEventListener('keydown', onKey);
    timer = setTimeout(finish, SHOW_MS);
  }

  function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish(); }

  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    document.removeEventListener('keydown', onKey);
    if (el) el.classList.add('is-out');
    root.classList.remove('c9pl-on');           // page becomes scrollable as the scene lifts
    setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); el = null; }, EXIT_MS);
  }

  // Insert as soon as <body> exists (the head script runs before it is parsed)
  if (document.body) build();
  else {
    var mo = new MutationObserver(function () { if (document.body) { mo.disconnect(); build(); } });
    mo.observe(root, { childList: true });
    document.addEventListener('DOMContentLoaded', function () { mo.disconnect(); build(); });
  }

  // Safety net: never leave the page covered, whatever happens
  setTimeout(function () { if (!done) { build(); finish(); } root.classList.remove('c9pl-on'); }, 8000);
})();
