/* =========================================================================
   CLOUD 9 — <reels-section> reusable component  (the site's "ReelsSection")

   Usage:
     <reels-section category="wedding-reels"
                    heading="Weddings at Cloud 9"
                    eyebrow="Reels"
                    lede="Short films from celebrations on the hill."></reels-section>

   Content comes from window.C9_REELS[category] (assets/js/c9-reels-data.js).
   A reel with an empty `src` renders as a clearly-marked placeholder.
   When a video `src` is supplied it becomes a working player:
     9:16 · poster · play/pause · mute/unmute · fullscreen · lazy-loaded
     (the video file is only requested on first play) · only one reel plays
     at a time · pauses when scrolled out of view.
   Renders into the light DOM so the page's scoped styles (.c9x) apply.
   ========================================================================= */
(function () {
  'use strict';
  if (!('customElements' in window) || customElements.get('reels-section')) return;

  var ICON = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
    muted: '<svg class="ico-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
    sound: '<svg class="ico-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  var active = null; // the reel currently playing, site-wide

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function stopReel(li) {
    if (!li) return;
    var v = li.querySelector('video');
    if (v && !v.paused) v.pause();
  }

  function bindReel(li, item) {
    var btn = li.querySelector('.c9x-reel__play');
    var video = null;

    function ensureVideo() {
      if (video) return video;
      video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'none');
      video.setAttribute('loop', '');
      video.muted = true;
      if (item.poster) video.poster = item.poster;
      video.src = item.src;                       // lazy: only set on first play
      li.insertBefore(video, li.firstChild.nextSibling);
      video.addEventListener('play', function () {
        if (active && active !== li) stopReel(active);
        active = li;
        li.classList.add('is-playing', 'is-started');
        li.classList.remove('is-paused');
      });
      video.addEventListener('pause', function () {
        li.classList.add('is-paused');
        if (active === li) active = null;
      });
      video.addEventListener('click', function () { video.paused ? video.play() : video.pause(); });
      return video;
    }

    btn.addEventListener('click', function () {
      var v = ensureVideo();
      if (!li.classList.contains('is-started')) { // first play is a user gesture → start with sound
        v.muted = false;
        li.classList.add('is-unmuted');
      }
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.muted = true; li.classList.remove('is-unmuted'); v.play(); });
    });

    li.querySelector('[data-mute]').addEventListener('click', function () {
      var v = ensureVideo();
      v.muted = !v.muted;
      li.classList.toggle('is-unmuted', !v.muted);
    });

    li.querySelector('[data-full]').addEventListener('click', function () {
      var v = ensureVideo();
      var req = v.requestFullscreen || v.webkitRequestFullscreen || v.webkitEnterFullscreen;
      if (req) req.call(v);
    });

    // Pause when the reel leaves the viewport
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (!e.isIntersecting) stopReel(li); });
      }, { threshold: 0.25 }).observe(li);
    }
  }

  function renderReel(item, i) {
    var soon = !item.src;
    var li = document.createElement('li');
    li.className = 'c9x-reel' + (soon ? ' c9x-reel--soon' : '');
    li.innerHTML =
      '<img class="c9x-reel__poster" src="' + esc(item.poster) + '" alt="' + esc(item.alt || item.title) + '" loading="lazy" decoding="async" style="object-position:' + esc(item.pos || '50% 50%') + '">' +
      (soon ? '<span class="c9x-reel__soon">Reel coming soon</span>' : '') +
      '<button type="button" class="c9x-reel__play" aria-label="' + (soon ? 'Reel coming soon: ' : 'Play reel: ') + esc(item.title) + '"' + (soon ? ' aria-disabled="true" tabindex="-1"' : '') + '>' + ICON.play + '</button>' +
      (soon ? '' :
        '<div class="c9x-reel__ctrls">' +
          '<button type="button" data-mute aria-label="Mute or unmute">' + ICON.muted + ICON.sound + '</button>' +
          '<button type="button" data-full aria-label="View fullscreen">' + ICON.full + '</button>' +
        '</div>') +
      '<div class="c9x-reel__meta"><span>' + esc(item.tag || ('Reel ' + (i + 1))) + '</span><h3>' + esc(item.title) + '</h3></div>';
    if (!soon) bindReel(li, item);
    return li;
  }

  customElements.define('reels-section', class extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      var cat = this.getAttribute('category') || '';
      var items = (window.C9_REELS && window.C9_REELS[cat]) || [];
      var id = 'reels-' + cat;
      var hasVideo = items.some(function (r) { return !!r.src; });

      this.innerHTML =
        '<div class="c9x-wrap">' +
          '<div class="c9x-reels__head">' +
            '<div class="c9x-head" data-x-reveal>' +
              '<p class="eyebrow">' + esc(this.getAttribute('eyebrow') || 'Reels') + '</p>' +
              '<h2 class="c9x-h2" id="' + esc(id) + '-title">' + esc(this.getAttribute('heading') || 'Life at Cloud 9') + '</h2>' +
              (this.getAttribute('lede') ? '<p class="c9x-lede">' + esc(this.getAttribute('lede')) + '</p>' : '') +
            '</div>' +
            '<div class="c9x-pano__nav">' +
              '<button type="button" class="c9x-navbtn" data-prev aria-label="Previous reels">' + ICON.prev + '</button>' +
              '<button type="button" class="c9x-navbtn" data-next aria-label="Next reels">' + ICON.next + '</button>' +
            '</div>' +
          '</div>' +
          '<ul class="c9x-reels__track" aria-labelledby="' + esc(id) + '-title" data-category="' + esc(cat) + '"></ul>' +
          '<div class="c9x-reels__foot">' +
            '<p class="c9x-reels__note">' + (hasVideo ? 'Tap a reel to play · sound on' : 'Reels from this chapter are being filmed — new videos will appear here.') + '</p>' +
            '<div class="c9x-progress" aria-hidden="true"><span></span></div>' +
          '</div>' +
        '</div>';

      var track = this.querySelector('.c9x-reels__track');
      items.forEach(function (item, i) { track.appendChild(renderReel(item, i)); });

      var prev = this.querySelector('[data-prev]');
      var next = this.querySelector('[data-next]');
      var bar = this.querySelector('.c9x-progress span');
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function step() { var f = track.firstElementChild; return f ? f.getBoundingClientRect().width + 16 : 300; }
      function update() {
        var max = track.scrollWidth - track.clientWidth;
        var w = Math.max(0.12, Math.min(1, track.clientWidth / Math.max(1, track.scrollWidth)));
        var p = max > 0 ? track.scrollLeft / max : 0;
        bar.style.width = (w * 100) + '%';
        bar.style.transform = 'translateX(' + (p * (1 / w - 1) * 100) + '%)';
        prev.disabled = track.scrollLeft < 4;
        next.disabled = max <= 4 || track.scrollLeft > max - 4;
      }
      prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
      next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      requestAnimationFrame(update);
    }
  });
})();
