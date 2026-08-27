       /* ============================================================
           CLOUD 9 HILLS RESORT — main.js
           Vanilla JS only. No dependencies.
           ============================================================ */
        (function() {
            'use strict';

            var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // ===== CONFIG =====
            var CONFIG = {
                GA_MEASUREMENT_ID: 'GA_MEASUREMENT_ID',
                GTM_CONTAINER_ID: 'GTM_CONTAINER_ID',
                WHATSAPP_NUMBER: '919819739444',
                BOOKING_ENGINE_URL: 'https://booking.example.com/cloud9-hills'
            };

            // ===== TRACKING =====
            function trackEvent(eventName, eventData) {
                eventData = eventData || {};
                if (window.gtag) {
                    window.gtag('event', eventName, eventData);
                } else if (window.dataLayer) {
                    window.dataLayer.push(Object.assign({ event: eventName }, eventData));
                } else {
                    console.debug('[trackEvent]', eventName, eventData);
                }
            }
            window.trackEvent = trackEvent;

            document.addEventListener('click', function(e) {
                var el = e.target.closest('[data-track]');
                if (!el) return;
                trackEvent(el.getAttribute('data-track'), {
                    location: el.getAttribute('data-track-loc') || 'unknown',
                    href: el.getAttribute('href') || null
                });
            });

            // ===== STICKY HEADER =====
            var header = document.getElementById('siteHeader');
            var lastScrollCall = 0;

            function onScrollHeader() {
                var now = Date.now();
                if (now - lastScrollCall < 60) return;
                lastScrollCall = now;
                if (window.scrollY > 60) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }
            window.addEventListener('scroll', onScrollHeader, { passive: true });
            onScrollHeader();

            // ===== DESKTOP DROPDOWN =====
            var navItems = document.querySelectorAll('.main-nav .nav-item');
            navItems.forEach(function(item) {
                var btn = item.querySelector('button.nav-link');
                if (!btn) return;

                function open() {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }

                function close() {
                    item.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
                item.addEventListener('mouseenter', open);
                item.addEventListener('mouseleave', close);
                btn.addEventListener('click', function() {
                    var isOpen = item.classList.contains('open');
                    navItems.forEach(close);
                    if (!isOpen) open();
                });
                item.addEventListener('focusout', function(e) {
                    if (!item.contains(e.relatedTarget)) close();
                });
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') navItems.forEach(function(i) { i.classList.remove('open'); });
            });

            // ===== MOBILE NAV =====
            var hamburger = document.getElementById('hamburgerBtn');
            var mobileNav = document.getElementById('mobileNav');
            // Guard: a duplicate hamburger toggle handler is registered later in this
            // file. To avoid a double-toggle (open -> closed) on a single click, we
            // delegate the actual toggling to that single handler and skip it here.
            if (!window.__c9HamburgerBound) {
                window.__c9HamburgerBound = true;
                hamburger.addEventListener('click', function() {
                    var isOpen = mobileNav.classList.toggle('open');
                    hamburger.classList.toggle('active', isOpen);
                    hamburger.setAttribute('aria-expanded', String(isOpen));
                    document.body.style.overflow = isOpen ? 'hidden' : '';
                });
            }
            mobileNav.querySelectorAll('a').forEach(function(a) {
                a.addEventListener('click', function() {
                    mobileNav.classList.remove('open');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            mobileNav.querySelectorAll('[data-accordion]').forEach(function(trigger) {
                trigger.addEventListener('click', function() {
                    var li = trigger.closest('li');
                    var wasOpen = li.classList.contains('open');
                    mobileNav.querySelectorAll('li.open').forEach(function(l) { l.classList.remove('open'); });
                    if (!wasOpen) li.classList.add('open');
                });
            });
            window.__c9AccordionBound = true;

            // ===== SCROLL REVEAL =====
            var revealEls = document.querySelectorAll('.reveal');
            if ('IntersectionObserver' in window) {
                var revealObserver = new IntersectionObserver(function(entries, obs) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
                revealEls.forEach(function(el) { revealObserver.observe(el); });
            } else {
                revealEls.forEach(function(el) { el.classList.add('in-view'); });
            }

            // ===== COUNTERS =====
            var counters = document.querySelectorAll('[data-counter]');

            function animateCounter(el) {
                var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
                if (prefersReducedMotion) { el.textContent = target + '+'; return; }
                var duration = 1400;
                var start = null;

                function step(ts) {
                    if (!start) start = ts;
                    var progress = Math.min((ts - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + (progress >= 1 ? '+' : '');
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            }
            if ('IntersectionObserver' in window && counters.length) {
                var counterObserver = new IntersectionObserver(function(entries, obs) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.6 });
                counters.forEach(function(c) { counterObserver.observe(c); });
            }

            // ===== TESTIMONIAL SLIDER =====
            (function testimonialSlider() {
                var slides = document.querySelectorAll('.testi-slide');
                var dots = document.querySelectorAll('.testi-dot');
                var prevBtn = document.getElementById('testiPrev');
                var nextBtn = document.getElementById('testiNext');
                if (!slides.length) return;
                var index = 0,
                    timer;

                function show(i) {
                    index = (i + slides.length) % slides.length;
                    slides.forEach(function(s, idx) { s.classList.toggle('active', idx === index); });
                    dots.forEach(function(d, idx) { d.classList.toggle('active', idx === index); });
                }

                function next() { show(index + 1); }

                function prev() { show(index - 1); }

                function startAutoplay() {
                    if (prefersReducedMotion) return;
                    stopAutoplay();
                    timer = setInterval(next, 6000);
                }

                function stopAutoplay() { clearInterval(timer); }

                nextBtn.addEventListener('click', function() { next();
                    startAutoplay(); });
                prevBtn.addEventListener('click', function() { prev();
                    startAutoplay(); });
                dots.forEach(function(d, i) { d.addEventListener('click', function() { show(i);
                        startAutoplay(); }); });

                var wrap = document.querySelector('.testi-track-wrap');
                wrap.addEventListener('mouseenter', stopAutoplay);
                wrap.addEventListener('mouseleave', startAutoplay);

                var touchStartX = 0;
                wrap.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
                wrap.addEventListener('touchend', function(e) {
                    var dx = e.changedTouches[0].clientX - touchStartX;
                    if (Math.abs(dx) > 40) { dx > 0 ? prev() : next();
                        startAutoplay(); }
                }, { passive: true });

                startAutoplay();
            })();

            // ===== REEL VIDEO =====
            var reelPlays = document.querySelectorAll('[data-video]');
            reelPlays.forEach(function(el) {
                el.addEventListener('click', function() {
                    trackEvent('video_play', { location: 'reels' });
                    el.closest('.reel-card').classList.add('playing');
                });
            });
            var reelCards = document.querySelectorAll('.reel-card video');
            if ('IntersectionObserver' in window && reelCards.length) {
                var videoObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        var video = entry.target;
                        if (entry.isIntersecting) video.play().catch(function() {});
                        else video.pause();
                    });
                }, { threshold: 0.6 });
                reelCards.forEach(function(v) { videoObserver.observe(v); });
            }

            // ===== HERO VIDEO =====
            (function heroVideo() {
                var video = document.getElementById('heroVideo');
                if (!video) return;
                if (prefersReducedMotion) {
                    video.removeAttribute('autoplay');
                    video.pause();
                }
            })();

            // ===== RAIN LAYER =====
            (function buildRain() {
                var layer = document.getElementById('rainLayer');
                if (!layer || prefersReducedMotion) return;
                var count = window.innerWidth < 720 ? 24 : 46;
                var frag = document.createDocumentFragment();
                for (var i = 0; i < count; i++) {
                    var drop = document.createElement('span');
                    drop.className = 'rain-drop';
                    drop.style.left = Math.random() * 100 + '%';
                    drop.style.animationDuration = (0.7 + Math.random() * 0.6) + 's';
                    drop.style.animationDelay = (Math.random() * 2) + 's';
                    drop.style.opacity = String(0.3 + Math.random() * 0.5);
                    frag.appendChild(drop);
                }
                layer.appendChild(frag);
            })();

            // ===== BACK TO TOP =====
            var backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', function() {
                backToTop.classList.toggle('visible', window.scrollY > 700);
            }, { passive: true });
            backToTop.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            });

            // ===== SCROLL DEPTH =====
            var depthFired = { 50: false, 90: false };
            window.addEventListener('scroll', function() {
                var scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight *
                    100;
                if (scrolled >= 50 && !depthFired[50]) { depthFired[50] = true;
                    trackEvent('scroll_50'); }
                if (scrolled >= 90 && !depthFired[90]) { depthFired[90] = true;
                    trackEvent('scroll_90'); }
            }, { passive: true });

            // ===== BOOKING FORM =====
            var bookingForm = document.querySelector('.booking-bar');
            if (bookingForm) {
                var startedTracking = false;
                bookingForm.addEventListener('focusin', function() {
                    if (!startedTracking) { startedTracking = true;
                        trackEvent('booking_form_start'); }
                });
                bookingForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var checkin = bookingForm.querySelector('#checkin').value;
                    var checkout = bookingForm.querySelector('#checkout').value;
                    if (!checkin || !checkout) {
                        bookingForm.querySelector('#checkin').reportValidity();
                        return;
                    }
                    if (new Date(checkout) <= new Date(checkin)) {
                        alert('Check-out date must be after check-in date.');
                        return;
                    }
                    trackEvent('booking_form_submit', { checkin: checkin, checkout: checkout });
                    trackEvent('book_now_click', { location: 'booking_bar' });
                    window.location.href = CONFIG.BOOKING_ENGINE_URL + '?checkin=' + encodeURIComponent(
                    checkin) + '&checkout=' + encodeURIComponent(checkout);
                });
            }

            // ===== NEWSLETTER =====
            var newsletter = document.querySelector('.newsletter');
            if (newsletter) {
                newsletter.addEventListener('submit', function(e) {
                    e.preventDefault();
                    trackEvent('contact_submit', { form: 'newsletter' });
                    var input = newsletter.querySelector('input');
                    input.value = '';
                    var btn = newsletter.querySelector('button');
                    var original = btn.textContent;
                    btn.textContent = 'Subscribed';
                    setTimeout(function() { btn.textContent = original; }, 2200);
                });
            }

            // ===== GALLERY TRACKING =====
            document.querySelectorAll('.social-tile').forEach(function(tile) {
                tile.addEventListener('click', function(e) {
                    e.preventDefault();
                    trackEvent('gallery_open', { location: 'social_grid' });
                });
            });

            // ===== ROOM / OFFER VIEW TRACKING =====
            if ('IntersectionObserver' in window) {
                var viewObserver = new IntersectionObserver(function(entries, obs) {
                    entries.forEach(function(entry) {
                        if (!entry.isIntersecting) return;
                        if (entry.target.classList.contains('room-card') || entry.target.classList.contains(
                                'room-large')) {
                            trackEvent('room_view');
                        } else {
                            trackEvent('offer_view');
                        }
                        obs.unobserve(entry.target);
                    });
                }, { threshold: 0.5 });
                document.querySelectorAll('.room-card, .room-large, .offer-card').forEach(function(el) { viewObserver
                        .observe(el); });
            }

            // ===== SET DEFAULT DATES =====
            (function setDefaultDates() {
                var checkin = document.getElementById('checkin');
                var checkout = document.getElementById('checkout');
                if (!checkin || !checkout) return;
                var today = new Date();
                var tomorrow = new Date(today.getTime() + 86400000);

                function fmt(d) { return d.toISOString().split('T')[0]; }
                checkin.min = fmt(today);
                checkout.min = fmt(tomorrow);
                checkin.addEventListener('change', function() {
                    var next = new Date(checkin.value);
                    next.setDate(next.getDate() + 1);
                    checkout.min = fmt(next);
                    if (checkout.value && checkout.value <= checkin.value) checkout.value = fmt(next);
                });
            })();

            // ===== REDUCED MOTION =====
            if (prefersReducedMotion) {
                document.querySelectorAll('.cloud-layer, .mist-layer, .scroll-indicator .line').forEach(function(el) {
                    el.style.animation = 'none';
                });
            }

        })();

        // 1. Auto Fading Slider for Intro & Dining
const sliders = document.querySelectorAll('.slider-container[data-autoplay]');
sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    let current = 0;
    const interval = parseInt(slider.dataset.autoplay);

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, interval);
});

// 2. Auto Scrolling Slider for Experiences (Instagram Reels)
const expScroll = document.querySelector('.exp-scroll');
if (expScroll) {
    let scrollPos = 0;
    const scrollSpeed = 1; // Adjust for speed (pixels per frame)
    
    function autoScrollReels() {
        // Check if not hovered
        if (!expScroll.matches(':hover')) {
            scrollPos += scrollSpeed;
            const maxScroll = expScroll.scrollWidth - expScroll.clientWidth;
            if (scrollPos >= maxScroll) {
                scrollPos = 0;
            }
            expScroll.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
        requestAnimationFrame(autoScrollReels);
    }
    autoScrollReels();
}
/* ============================================================
   DETAIL GALLERY LIGHTBOX (only runs on pages with .detail-gallery)
   ============================================================ */
(function () {
    var galleryImgs = document.querySelectorAll('.detail-gallery img');
    var overlay = document.getElementById('lightboxOverlay');
    if (!galleryImgs.length || !overlay) return;
    var overlayImg = overlay.querySelector('img');
    var closeBtn = overlay.querySelector('.lightbox-close');

    galleryImgs.forEach(function (img) {
        img.addEventListener('click', function () {
            overlayImg.src = img.getAttribute('src');
            overlayImg.alt = img.getAttribute('alt') || '';
            overlay.classList.add('active');
        });
    });
    function closeLightbox() { overlay.classList.remove('active'); }
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();

/* ============================================================
   CUSTOM CURSOR — desktop only, opt-in via <body class="has-custom-cursor">
   ============================================================ */
(function () {
    if (!document.body.classList.contains('has-custom-cursor')) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
    }
    loop();

    var hoverables = document.querySelectorAll('a, button, .filter-pill, .gallery-item, .blog-card, .acc-card');
    hoverables.forEach(function (el) {
        el.addEventListener('mouseenter', function () { ring.classList.add('is-active'); });
        el.addEventListener('mouseleave', function () { ring.classList.remove('is-active'); });
    });
})();

/* ============================================================
   SPLIT-TEXT WORD-STAGGER REVEAL — elements with [data-split]
   ============================================================ */
(function () {
    var targets = document.querySelectorAll('[data-split]');
    if (!targets.length) return;

    targets.forEach(function (el) {
        var text = el.textContent.trim();
        var words = text.split(/\s+/);
        el.innerHTML = words.map(function (w, i) {
            return '<span class="word-wrap"><span class="word" style="--wd:' + (i * 0.05) + 's">' + w + '</span></span> ';
        }).join('');
    });

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    targets.forEach(function (el) { io.observe(el); });
})();

/* ============================================================
   CLIP-PATH CURTAIN REVEAL — elements with .clip-reveal
   ============================================================ */
(function () {
    var items = document.querySelectorAll('.clip-reveal');
    if (!items.length) return;
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
})();

/* ============================================================
   FILTER PILLS — .filter-row with [data-filter], items with [data-cat]
   ============================================================ */
(function () {
    var rows = document.querySelectorAll('.filter-row');
    rows.forEach(function (row) {
        var pills = row.querySelectorAll('.filter-pill');
        var groupSelector = row.getAttribute('data-target');
        if (!groupSelector) return;
        var items = document.querySelectorAll(groupSelector);
        pills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                pills.forEach(function (p) { p.classList.remove('active'); });
                pill.classList.add('active');
                var cat = pill.getAttribute('data-filter');
                items.forEach(function (item) {
                    var itemCat = item.getAttribute('data-cat');
                    var show = (cat === 'all' || itemCat === cat);
                    item.classList.toggle('hidden', !show);
                });
            });
        });
    });
})();

/* ============================================================
   READING PROGRESS BAR — element with #readingProgress
   ============================================================ */
(function () {
    var bar = document.getElementById('readingProgress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
        var h = document.documentElement;
        var scrollTop = h.scrollTop || document.body.scrollTop;
        var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
        var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
})();

/* ============================================================
   NEWSLETTER FORM — decorative, no backend
   ============================================================ */
(function () {
    var form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('button');
        var original = btn.textContent;
        btn.textContent = 'Thank You!';
        form.querySelector('input').value = '';
        setTimeout(function () { btn.textContent = original; }, 2600);
    });
})();


// ============================================================
        // IMPROVED DROPDOWN – stays open while moving to submenu
        // ============================================================
        document.addEventListener('DOMContentLoaded', function() {
            'use strict';

            var navItems = document.querySelectorAll('.main-nav .nav-item');

            navItems.forEach(function(item) {
                var btn = item.querySelector('button.nav-link');
                var dropdown = item.querySelector('.dropdown');
                if (!btn) return;

                var closeTimer = null;

                function openDropdown() {
                    clearTimeout(closeTimer);
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }

                function closeDropdown() {
                    clearTimeout(closeTimer);
                    // Small delay, then check if mouse is still over the item OR the dropdown
                    closeTimer = setTimeout(function() {
                        // If the mouse is over the nav-item OR the dropdown itself, keep it open
                        var isOverItem = item.matches(':hover');
                        var isOverDropdown = dropdown && dropdown.matches(':hover');
                        if (!isOverItem && !isOverDropdown) {
                            item.classList.remove('open');
                            btn.setAttribute('aria-expanded', 'false');
                        }
                    }, 120);
                }

                // Hover events on the nav-item
                item.addEventListener('mouseenter', openDropdown);
                item.addEventListener('mouseleave', closeDropdown);

                // If dropdown exists, also listen on it directly
                if (dropdown) {
                    dropdown.addEventListener('mouseenter', openDropdown);
                    dropdown.addEventListener('mouseleave', closeDropdown);
                }

                // Click toggling for touch devices / accessibility
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var isOpen = item.classList.contains('open');
                    // Close all others
                    navItems.forEach(function(other) {
                        if (other !== item) {
                            other.classList.remove('open');
                            var otherBtn = other.querySelector('button.nav-link');
                            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                        }
                    });
                    if (isOpen) {
                        item.classList.remove('open');
                        btn.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                });

                // Close on Escape key
                item.addEventListener('focusout', function(e) {
                    if (!item.contains(e.relatedTarget)) {
                        item.classList.remove('open');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });
            });

            // Global Escape handler
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    navItems.forEach(function(i) {
                        i.classList.remove('open');
                        var b = i.querySelector('button.nav-link');
                        if (b) b.setAttribute('aria-expanded', 'false');
                    });
                }
            });

            // ===== MOBILE NAV accordion =====
            var mobileNav = document.getElementById('mobileNav');
            if (mobileNav && !window.__c9AccordionBound) {
                window.__c9AccordionBound = true;
                mobileNav.querySelectorAll('[data-accordion]').forEach(function(trigger) {
                    trigger.addEventListener('click', function() {
                        var li = trigger.closest('li');
                        if (!li) return;
                        var wasOpen = li.classList.contains('open');
                        // Close siblings
                        var parent = li.closest('ul');
                        if (parent) {
                            parent.querySelectorAll('li.open').forEach(function(l) {
                                if (l !== li) l.classList.remove('open');
                            });
                        }
                        li.classList.toggle('open', !wasOpen);
                    });
                });
            }

            // ===== HAMBURGER toggling =====
            var hamburger = document.getElementById('hamburgerBtn');
            if (hamburger && mobileNav && !window.__c9HamburgerBound) {
                window.__c9HamburgerBound = true;
                hamburger.addEventListener('click', function() {
                    var isOpen = mobileNav.classList.toggle('open');
                    hamburger.classList.toggle('active', isOpen);
                    hamburger.setAttribute('aria-expanded', String(isOpen));
                    document.body.style.overflow = isOpen ? 'hidden' : '';
                });

                // Close mobile nav on link click
                mobileNav.querySelectorAll('a').forEach(function(a) {
                    a.addEventListener('click', function() {
                        mobileNav.classList.remove('open');
                        hamburger.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            }

            // ===== STICKY HEADER =====
            var header = document.getElementById('siteHeader');
            var lastScrollCall = 0;

            function onScrollHeader() {
                var now = Date.now();
                if (now - lastScrollCall < 60) return;
                lastScrollCall = now;
                if (window.scrollY > 60) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }
            window.addEventListener('scroll', onScrollHeader, { passive: true });
            onScrollHeader();

        });

                document.addEventListener('DOMContentLoaded', function() {
            'use strict';

            // ===== STAY SLIDER =====
            var track = document.getElementById('staySliderTrack');
            var slides = track ? track.querySelectorAll('.stay-slide') : [];
            var dots = document.querySelectorAll('.stay-slider-dot');
            var prevBtn = document.getElementById('staySliderPrev');
            var nextBtn = document.getElementById('staySliderNext');
            var progressBar = document.getElementById('stayProgressBar');

            if (!track || !slides.length) return;

            var currentIndex = 0;
            var totalSlides = slides.length;
            var slidesPerView = 1;
            var autoplayInterval = null;
            var autoplayDelay = 5000;
            var isPaused = false;
            var progressWidth = 0;

            // Determine slides per view
            function getSlidesPerView() {
                if (window.innerWidth <= 760) return 1;
                if (window.innerWidth <= 1100) return 2;
                return 3;
            }

            // Clone slides for infinite loop illusion
            function setupClones() {
                // We'll use a simpler approach: just slide with a large enough set
                // and reset position when needed
            }

            function getSlideWidth() {
                var gap = 28;
                var containerWidth = track.parentElement.offsetWidth || 1200;
                var spv = getSlidesPerView();
                return (containerWidth - (spv - 1) * gap) / spv;
            }

            function goTo(index, animate) {
                animate = animate !== false;
                var spv = getSlidesPerView();
                var maxIndex = totalSlides - spv;

                if (index < 0) index = 0;
                if (index > maxIndex) index = maxIndex;

                currentIndex = index;

                var offset = 0;
                var gap = 28;
                var slideWidth = getSlideWidth();

                // Calculate offset
                for (var i = 0; i < index; i++) {
                    offset += slideWidth + gap;
                }

                // Apply transform
                if (animate) {
                    track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                } else {
                    track.style.transition = 'none';
                }
                track.style.transform = 'translateX(-' + offset + 'px)';

                // Update active states
                slides.forEach(function(slide, idx) {
                    var distance = Math.abs(idx - index);
                    slide.classList.remove('active', 'next', 'prev', 'far');
                    if (idx === index) {
                        slide.classList.add('active');
                    } else if (idx === index + 1) {
                        slide.classList.add('next');
                    } else if (idx === index - 1) {
                        slide.classList.add('prev');
                    } else {
                        slide.classList.add('far');
                    }
                });

                // Update dots
                dots.forEach(function(dot, idx) {
                    dot.classList.toggle('active', idx === index);
                });

                // Reset progress
                progressWidth = 0;
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }

            function nextSlide() {
                var spv = getSlidesPerView();
                var maxIndex = totalSlides - spv;
                if (currentIndex >= maxIndex) {
                    goTo(0);
                } else {
                    goTo(currentIndex + 1);
                }
            }

            function prevSlide() {
                if (currentIndex <= 0) {
                    var spv = getSlidesPerView();
                    goTo(totalSlides - spv);
                } else {
                    goTo(currentIndex - 1);
                }
            }

            function startAutoplay() {
                if (autoplayInterval) clearInterval(autoplayInterval);
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

                var startTime = Date.now();
                var elapsed = progressWidth / 100 * autoplayDelay;

                function tick() {
                    var now = Date.now();
                    var delta = now - startTime;
                    var pct = Math.min((delta + elapsed) / autoplayDelay * 100, 100);
                    if (progressBar) {
                        progressBar.style.width = pct + '%';
                    }
                    if (pct >= 100) {
                        nextSlide();
                        startAutoplay();
                        return;
                    }
                    if (!isPaused) {
                        requestAnimationFrame(tick);
                    } else {
                        // Store progress and resume later
                        progressWidth = pct;
                    }
                }

                // Cancel any existing animation frame
                if (window._autoplayFrame) {
                    cancelAnimationFrame(window._autoplayFrame);
                }

                function frame() {
                    var pct = progressWidth || 0;
                    if (pct >= 100) {
                        nextSlide();
                        startAutoplay();
                        return;
                    }
                    if (!isPaused) {
                        var now = Date.now();
                        var delta = now - (window._autoplayStart || now);
                        var newPct = Math.min((delta / autoplayDelay) * 100 + (progressWidth || 0), 100);
                        if (progressBar) {
                            progressBar.style.width = newPct + '%';
                        }
                        if (newPct >= 100) {
                            nextSlide();
                            startAutoplay();
                            return;
                        }
                        window._autoplayFrame = requestAnimationFrame(frame);
                    } else {
                        window._autoplayFrame = requestAnimationFrame(frame);
                    }
                }

                window._autoplayStart = Date.now();
                window._autoplayFrame = requestAnimationFrame(frame);
            }

            function stopAutoplay() {
                if (window._autoplayFrame) {
                    cancelAnimationFrame(window._autoplayFrame);
                    window._autoplayFrame = null;
                }
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            }

            function pauseAutoplay() {
                isPaused = true;
                if (progressBar) {
                    progressBar.classList.add('paused');
                }
            }

            function resumeAutoplay() {
                isPaused = false;
                if (progressBar) {
                    progressBar.classList.remove('paused');
                }
                // Resume the frame loop
                if (window._autoplayFrame) {
                    cancelAnimationFrame(window._autoplayFrame);
                }
                window._autoplayStart = Date.now();
                window._autoplayFrame = requestAnimationFrame(function frame() {
                    if (isPaused) {
                        window._autoplayFrame = requestAnimationFrame(frame);
                        return;
                    }
                    var now = Date.now();
                    var delta = now - (window._autoplayStart || now);
                    var pct = Math.min((delta / autoplayDelay) * 100 + (progressWidth || 0), 100);
                    if (progressBar) {
                        progressBar.style.width = pct + '%';
                    }
                    if (pct >= 100) {
                        nextSlide();
                        startAutoplay();
                        return;
                    }
                    window._autoplayFrame = requestAnimationFrame(frame);
                });
            }

            // Event listeners
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    stopAutoplay();
                    prevSlide();
                    startAutoplay();
                });
            }

            dots.forEach(function(dot, idx) {
                dot.addEventListener('click', function() {
                    stopAutoplay();
                    goTo(idx);
                    startAutoplay();
                });
            });

            // Pause on hover
            var sliderWrap = document.querySelector('.stay-slider-wrap');
            if (sliderWrap) {
                sliderWrap.addEventListener('mouseenter', function() {
                    pauseAutoplay();
                });
                sliderWrap.addEventListener('mouseleave', function() {
                    resumeAutoplay();
                });
            }

            // Handle resize
            var resizeTimeout;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    var spv = getSlidesPerView();
                    var maxIndex = totalSlides - spv;
                    if (currentIndex > maxIndex) {
                        goTo(maxIndex, false);
                    } else {
                        goTo(currentIndex, false);
                    }
                }, 200);
            });

            // Initialize
            var initialSpv = getSlidesPerView();
            if (currentIndex > totalSlides - initialSpv) {
                currentIndex = totalSlides - initialSpv;
            }
            goTo(currentIndex, false);

            // Start autoplay after a short delay
            setTimeout(function() {
                startAutoplay();
            }, 800);

            // Keyboard support
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    stopAutoplay();
                    prevSlide();
                    startAutoplay();
                } else if (e.key === 'ArrowRight') {
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                }
            });

            // Expose for debugging
            window._staySlider = {
                goTo: goTo,
                next: nextSlide,
                prev: prevSlide,
                currentIndex: function() { return currentIndex; }
            };
        });

// ============================================================
// SITE-WIDE FIXES BUNDLE
//  1. Correct active-page state on desktop + mobile nav
//  2. Open internal website links in a new tab
//  3. Make enquiry / event forms actually send (WhatsApp + mailto compose)
//  4. Mobile nav polish & responsiveness
// (No HTML structure or design changes — enhancement only)
// ============================================================
(function () {
    'use strict';

    /* ---------- CONFIG ---------- */
    var CONFIG = {
        WHATSAPP_NUMBER: '919819739444',
        EMAIL: 'cloud9hillsresort@gmail.com',
        PHONE: '919819118832',
        // Map of page filename -> which nav label should be active.
        // Keys are lowercase filenames. "stay-*" means Stay. "event-ish" handled below.
    };

    /* ---------- HELPERS ---------- */
    function currentFileName() {
        var p = window.location.pathname.split('/').pop() || 'index.html';
        // strip query/hash
        return p.split('?')[0].split('#')[0].toLowerCase();
    }

    function removeInlineActiveStyles(el) {
        if (!el) return;
        // Remove the inline "Home" highlight color so JS-controlled class wins
        if (el.style && el.style.color) el.style.color = '';
    }

    /* ============================================================
       1. ACTIVE PAGE STATE (desktop + mobile)
       ============================================================ */
    function setActiveNav() {
        var file = currentFileName();

        // Determine which top-level section the current page belongs to.
        var activeSection = null;
        if (file === '' || file === 'index.html') activeSection = 'home';
        else if (file === 'about.html') activeSection = 'about';
        else if (file === 'dining.html') activeSection = 'dining';
        else if (file === 'explore.html') activeSection = 'explore';
        else if (file === 'contact.html') activeSection = 'contact';
        else if (file === 'blog.html') activeSection = 'blog';
        else if (file === 'gallery.html') activeSection = 'gallery';
        else if (file === 'offers.html') activeSection = 'offers';
        else if (file === 'events.html') activeSection = 'events';
        else if (file === 'stay.html') activeSection = 'stay';
        else if (
            file.indexOf('villa') > -1 ||
            file.indexOf('cottage') > -1 ||
            file.indexOf('suite') > -1 ||
            file.indexOf('honeymoon') > -1
        ) activeSection = 'stay';

        // --- DESKTOP NAV ---
        // First, clear every active-page / active class on desktop nav links
        var desktopLinks = document.querySelectorAll('.main-nav .nav-link');
        desktopLinks.forEach(function (link) {
            link.classList.remove('active-page', 'active');
        });

        // Map section -> text label used in the desktop nav
        var labelMap = {
            home: 'home',
            about: 'about',
            stay: 'stay',
            dining: 'dining',
            events: 'events',
            explore: 'explore',
            contact: 'contact'
        };

        // Offers belongs under the Events dropdown parent; Gallery & Blog are not in the
        // main top-nav, so we highlight the closest related item (Events for offers,
        // nothing extra for gallery/blog since they live only in footer).
        var desktopTarget = labelMap[activeSection];
        if (activeSection === 'offers') desktopTarget = 'events';

        if (desktopTarget) {
            desktopLinks.forEach(function (link) {
                var txt = (link.textContent || '').trim().toLowerCase();
                if (txt === desktopTarget) {
                    link.classList.add('active-page');
                }
            });
        }

        // --- MOBILE NAV ---
        // The mobile nav uses <a class="mobile-nav-link"> for plain items and
        // <div class="mobile-nav-link" data-accordion> for dropdowns.
        // First, strip the inline color highlight that was hardcoded on "Home".
        var mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');
        mobileLinks.forEach(function (ml) {
            removeInlineActiveStyles(ml);
            if (ml.tagName === 'A') ml.classList.remove('active-page');
        });

        var mobileLabelMap = {
            home: 'home',
            about: 'about',
            stay: 'stay',
            dining: 'dining',
            events: 'events',
            explore: 'explore',
            contact: 'contact'
        };
        var mobileTarget = mobileLabelMap[activeSection];
        if (activeSection === 'offers') mobileTarget = 'events';

        if (mobileTarget) {
            mobileLinks.forEach(function (ml) {
                var txt = (ml.textContent || '').trim().toLowerCase();
                if (txt.indexOf(mobileTarget) === 0) {
                    if (ml.tagName === 'A') {
                        ml.classList.add('active-page');
                    } else {
                        // For accordion (div) items, add active-page too so it highlights
                        ml.classList.add('active-page');
                    }
                }
            });
        }
    }

    /* ============================================================
       2. OPEN INTERNAL LINKS IN A NEW TAB
       Strategy: any <a href="*.html"> or same-site link that is NOT in the
       header nav / mobile nav controls should open in a new tab.
       (Header nav remains in-tab so the active-state logic can read the new
        page — but since each page is a full reload, opening nav links in a new
        tab is also fine. We keep header nav in-tab for natural flow, and make
        all OTHER internal links (footer, content cards, CTAs, "similar stays",
        blog cards, etc.) open in a new tab.)
       ============================================================ */
    function makeInternalLinksOpenNewTab() {
        var aTags = document.querySelectorAll('a[href]');
        aTags.forEach(function (a) {
            var href = a.getAttribute('href') || '';

            // skip anchors on same page (#...)
            if (href.charAt(0) === '#') return;
            // skip empty / javascript
            if (!href || href.toLowerCase().indexOf('javascript') === 0) return;
            // skip external (http/https/tel/mailto/wa.me) — keep their existing behavior
            if (/^(https?:|tel:|mailto:|wa\.me)/i.test(href)) return;

            // It's a relative/absolute internal .html link.
            // Don't touch the primary desktop header nav links (they reload same tab),
            // but DO make footer links + mobile nav links + content links open new tab.
            var inDesktopHeader = a.closest('.main-nav') || a.closest('.header-actions');
            if (inDesktopHeader) return;

            // Avoid duplicate target attr
            if (a.getAttribute('target')) return;

            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
        });
    }

    /* ============================================================
       3. WORKING ENQUIRY / EVENT FORMS
       The original forms use action="mailto:..." with enctype="text/plain",
       which is unreliable. We intercept submit, gather field values, and:
         - Build a nicely formatted WhatsApp message and open wa.me in a new tab
         - Also provide a mailto: compose fallback link
         - Show an inline success message on the form
       This works on contact.html (#enquiryForm) and events.html form, plus
       any other form with class "contact-form" or any form whose action
       starts with "mailto:".
       ============================================================ */
    function serializeForm(form) {
        var data = {};
        var labels = {};
        Array.prototype.forEach.call(form.elements, function (el) {
            if (!el.name) return;
            var key = el.name;
            var val = (el.type === 'checkbox' || el.type === 'radio') ? (el.checked ? el.value : '') : (el.value || '');
            data[key] = val;
            // Try to find a human label
            if (el.id) {
                var lab = form.querySelector('label[for="' + CSS.escape(el.id) + '"]');
                if (lab) labels[key] = (lab.textContent || '').trim();
            }
        });
        return { data: data, labels: labels };
    }

    function buildMessageLines(form) {
        var info = serializeForm(form);
        var lines = [];
        Object.keys(info.data).forEach(function (key) {
            var val = info.data[key];
            if (val !== '' && val != null) {
                var label = info.labels[key] || key;
                // Make label readable
                label = label.charAt(0).toUpperCase() + label.slice(1);
                lines.push(label + ': ' + val);
            }
        });
        return lines;
    }

    function showFormSuccess(form, msgHtml) {
        // Remove any existing notice
        var existing = form.querySelector('.form-success-notice');
        if (existing) existing.remove();

        var notice = document.createElement('div');
        notice.className = 'form-success-notice';
        notice.style.cssText = [
            'margin-top:18px',
            'padding:16px 20px',
            'border-radius:12px',
            'background:rgba(47,101,48,.10)',
            'border:1px solid rgba(47,101,48,.35)',
            'color:#2f6530',
            'font-family:var(--font-body,Montserrat,sans-serif)',
            'font-size:14px',
            'line-height:1.6'
        ].join(';');
        notice.innerHTML = msgHtml;
        form.appendChild(notice);
        notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function enhanceForms() {
        // Select contact form, event form, and any mailto action form
        var forms = [];
        var byId = document.getElementById('enquiryForm');
        if (byId) forms.push(byId);
        // any other form with action starting mailto:
        Array.prototype.forEach.call(document.querySelectorAll('form'), function (f) {
            if (f === byId) return;
            var act = f.getAttribute('action') || '';
            if (act.toLowerCase().indexOf('mailto:') === 0) forms.push(f);
        });

        forms.forEach(function (form) {
            // Prevent the native mailto behaviour
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                var lines = buildMessageLines(form);
                var heading = 'New Enquiry — Cloud 9 Hills Resort';
                var body = heading + '\n\n' + lines.join('\n');

                // WhatsApp deep link
                var waText = encodeURIComponent(body);
                var waUrl = 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER + '?text=' + waText;

                // mailto compose fallback (URL-encoded, line breaks as %0D%0A)
                var mailtoBody = encodeURIComponent(body).replace(/%0A/g, '%0D%0A');
                var mailtoUrl = 'mailto:' + CONFIG.EMAIL + '?subject=' + encodeURIComponent(heading) + '&body=' + mailtoBody;

                // Build the inline success message with BOTH send options as links
                var successHtml =
                    '<strong>Thank you! Your enquiry is ready to send.</strong><br>' +
                    'Choose how you\'d like to send it: ' +
                    '<a href="' + waUrl + '" target="_blank" rel="noopener" style="color:#2f6530;font-weight:600;text-decoration:underline;margin:0 4px;">Send via WhatsApp</a> &nbsp;or&nbsp; ' +
                    '<a href="' + mailtoUrl + '" style="color:#2f6530;font-weight:600;text-decoration:underline;margin:0 4px;">Send via Email</a>.<br>' +
                    '<span style="display:block;margin-top:6px;font-size:13px;opacity:.85;">Prefer to talk? Call us at <a href="tel:+' + CONFIG.PHONE + '" style="color:#2f6530;font-weight:600;">+' + CONFIG.PHONE + '</a>.</span>';

                // Show the success notice FIRST (so it stays even if popup behaviour varies)
                showFormSuccess(form, successHtml);

                // Now try to auto-open WhatsApp in a new tab. We never navigate the
                // current page away — if the popup is blocked, the user can use the
                // links in the success notice above.
                try {
                    window.open(waUrl, '_blank', 'noopener');
                } catch (err) {
                    /* ignore — links in notice cover this case */
                }
            });
        });
    }

    /* ============================================================
       4. MOBILE NAV POLISH
       - Close mobile nav when clicking a plain link (already done in existing JS,
         but we add a safety net).
       - Close on Escape.
       - Close on resize to desktop.
       ============================================================ */
    function mobileNavPolish() {
        var mobileNav = document.getElementById('mobileNav');
        var hamburger = document.getElementById('hamburgerBtn');
        if (!mobileNav || !hamburger) return;

        function closeNav() {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                closeNav();
            }
        });

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 980 && mobileNav.classList.contains('open')) {
                    closeNav();
                }
            }, 150);
        });

        // Safety net: any <a> inside mobile nav closes the menu
        mobileNav.querySelectorAll('a').forEach(function (a) {
            if (!a.getAttribute('data-polished')) {
                a.setAttribute('data-polished', '1');
                a.addEventListener('click', function () {
                    // allow target=_blank to work; just close the overlay
                    setTimeout(closeNav, 120);
                });
            }
        });
    }

    /* ---------- INIT ---------- */
    function init() {
        setActiveNav();
        makeInternalLinksOpenNewTab();
        enhanceForms();
        mobileNavPolish();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


        /* ============================================================
   SEASON SLIDER — monsoon / winter / summer, auto-rotating
   ============================================================ */
(function () {
    var section = document.getElementById('seasonSlider');
    if (!section) return;
 
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var slides = Array.prototype.slice.call(section.querySelectorAll('.season-slide'));
    var dots = Array.prototype.slice.call(section.querySelectorAll('.season-dot'));
    var labels = Array.prototype.slice.call(section.querySelectorAll('.season-label span'));
    if (!slides.length) return;
 
    function buildParticles(layerSelector, className, count, build) {
        var layer = section.querySelector(layerSelector);
        if (!layer || reducedMotion) return;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < count; i++) {
            var el = document.createElement('span');
            el.className = className;
            build(el, i);
            frag.appendChild(el);
        }
        layer.appendChild(frag);
    }
 
    var isSmall = window.innerWidth < 720;
 
    // Rain (monsoon slide)
    buildParticles('.rain-layer', 'rain-drop', isSmall ? 26 : 48, function (el) {
        el.style.left = (Math.random() * 100) + '%';
        el.style.animationDuration = (0.7 + Math.random() * 0.6) + 's';
        el.style.animationDelay = (Math.random() * 2) + 's';
        el.style.opacity = String(0.3 + Math.random() * 0.5);
    });
 
    // Sparkles (summer slide)
    buildParticles('.sparkle-layer', 'sparkle', isSmall ? 14 : 28, function (el) {
        el.style.left = (Math.random() * 100) + '%';
        el.style.top = (Math.random() * 55) + '%';
        el.style.animationDuration = (2 + Math.random() * 3) + 's';
        el.style.animationDelay = (Math.random() * 4) + 's';
    });
 
    var index = 0;
    var DURATION = 6000; // keep in sync with the .season-dot::after fill animation (6s)
    var timerId = null;
 
    function goTo(i) {
        index = ((i % slides.length) + slides.length) % slides.length;
 
        slides.forEach(function (el, idx) { el.classList.toggle('active', idx === index); });
        labels.forEach(function (el, idx) { el.classList.toggle('active', idx === index); });
 
        // Restart the current dot's fill animation cleanly:
        dots.forEach(function (el) { el.classList.remove('active'); });
        if (dots[index]) { void dots[index].offsetWidth; } // force reflow
        if (dots[index]) { dots[index].classList.add('active'); }
    }
 
    function next() { goTo(index + 1); }
 
    function start() {
        if (reducedMotion) return;
        stop();
        timerId = window.setInterval(next, DURATION);
    }
    function stop() {
        if (timerId !== null) { window.clearInterval(timerId); timerId = null; }
    }
 
    dots.forEach(function (dot, idx) {
        dot.addEventListener('click', function () {
            goTo(idx);
            start();
        });
    });
 
    section.addEventListener('mouseenter', stop);
    section.addEventListener('mouseleave', start);
 
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
    });
 
    goTo(0);
    start();
})();

/* ============================================================
   SIGNATURE BELT — pause on touch, respect reduced motion
   ============================================================ */
(function () {
    var wrap = document.querySelector('.belt-wrap');
    var track = document.getElementById('beltTrack');
    if (!wrap || !track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.classList.add('no-anim');
        return;
    }

    var resumeTimer;
    wrap.addEventListener('touchstart', function () {
        track.style.animationPlayState = 'paused';
    }, { passive: true });
    wrap.addEventListener('touchend', function () {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
            track.style.animationPlayState = 'running';
        }, 1500);
    }, { passive: true });
})();

/* ============================================================
   AWARDS BELT — pause on touch, respect reduced motion
   ============================================================ */
(function () {
    var wrap = document.querySelector('.awards-belt-wrap');
    var track = document.getElementById('awardsTrack');
    if (!wrap || !track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.style.animation = 'none';
        return;
    }

    var resumeTimer;
    wrap.addEventListener('touchstart', function () {
        track.style.animationPlayState = 'paused';
    }, { passive: true });
    wrap.addEventListener('touchend', function () {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
            track.style.animationPlayState = 'running';
        }, 1500);
    }, { passive: true });
})();
