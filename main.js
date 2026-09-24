       /* ============================================================
           CLOUD 9 HILLS RESORT — main.js
           Vanilla JS only. No dependencies.
           ============================================================ */
        (function() {
            'use strict';

            var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Replace legacy content artwork with the organized compressed image archive.
            function refreshContentImages() {
                var archive = 'Cloud 9 Compress Images/All Images/';
                var legacy = /(?:assets\/image\/|^)(view\.jpg|khandala\.png|cottage\.jpg|Deluxe cottage\.jpg|Duplex Bedroom\.jpg|Duplex Master bedroom\.jpg|Conference\.jpg|Resturant\.jpg|scope\.jpg|Candle light\.jpg|couple\.jpeg|background\.png)$/i;
                var images = document.querySelectorAll('img');

                images.forEach(function(img) {
                    var source = img.getAttribute('src') || '';
                    var match = source.match(legacy);
                    if (!match || img.closest('.site-header, .site-footer') && /logos?\.png|background\.png/i.test(source)) return;

                    var alt = (img.getAttribute('alt') || '').toLowerCase();
                    var replacement = 'View from cloud9.webp';

                    if (alt.indexOf('restaurant') >= 0 || alt.indexOf('dining') >= 0 || alt.indexOf('breakfast') >= 0 || alt.indexOf('high tea') >= 0) {
                        replacement = 'Restaurant/Resturant 4.webp';
                    } else if (alt.indexOf('conference') >= 0 || alt.indexOf('corporate') >= 0 || alt.indexOf('event') >= 0 || alt.indexOf('retreat setup') >= 0) {
                        replacement = 'Conference.webp';
                    } else if (alt.indexOf('candle') >= 0 || alt.indexOf('bonfire') >= 0 || alt.indexOf('romantic') >= 0 || alt.indexOf('wedding') >= 0) {
                        replacement = 'Restaurant/Candle light 1.webp';
                    } else if (alt.indexOf('suite') >= 0 || alt.indexOf('honeymoon') >= 0) {
                        replacement = 'Luxury Suite 2.webp';
                    } else if (alt.indexOf('4 bedroom') >= 0 || alt.indexOf('four bedroom') >= 0) {
                        replacement = '4 BHK/04 Bhk Living room 3.webp';
                    } else if (alt.indexOf('3 bedroom') >= 0 || alt.indexOf('duplex') >= 0) {
                        replacement = 'DUPLEX/Duplex Master bedroom.webp';
                    } else if (alt.indexOf('deluxe cottage') >= 0 && alt.indexOf('family') < 0) {
                        replacement = 'Deluxe Cottage/Deluxe Cottage.webp';
                    } else if (alt.indexOf('family') >= 0) {
                        replacement = 'Family deluxe cott - 129.webp';
                    } else if (alt.indexOf('hill top') >= 0 || alt.indexOf('cottage') >= 0) {
                        replacement = 'Hill Top Deluxe Cott.webp';
                    } else if (match[1].toLowerCase() === 'resturant.jpg') {
                        replacement = 'Restaurant/Resturant 4.webp';
                    } else if (match[1].toLowerCase() === 'conference.jpg') {
                        replacement = 'Conference.webp';
                    } else if (match[1].toLowerCase() === 'candle light.jpg') {
                        replacement = 'Restaurant/Candle light 1.webp';
                    } else if (match[1].toLowerCase() === 'couple.jpeg') {
                        replacement = '1 bhk- Bedroom.webp';
                    } else if (match[1].toLowerCase() === 'scope.jpg') {
                        replacement = 'Coffee Sunset Point.webp';
                    } else if (match[1].toLowerCase() === 'khandala.png') {
                        replacement = 'View from cloud9 - 7.webp';
                    }

                    img.setAttribute('src', archive + replacement);
                    img.setAttribute('data-archive-image', 'true');
                });
            }

            refreshContentImages();

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

                var touchStartX = 0;
                var touchStartY = 0;

                sliderWrap.addEventListener('touchstart', function(event) {
                    var touch = event.touches[0] || event.changedTouches[0];
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                    stopAutoplay();
                }, { passive: true });

                sliderWrap.addEventListener('touchend', function(event) {
                    var touch = event.changedTouches[0] || event.touches[0];
                    var endX = touch.clientX;
                    var endY = touch.clientY;
                    var diffX = endX - touchStartX;
                    var diffY = endY - touchStartY;

                    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX < 0) nextSlide();
                        else prevSlide();
                    }

                    startAutoplay();
                }, { passive: true });

                sliderWrap.addEventListener('pointerdown', function(event) {
                    touchStartX = event.clientX;
                    touchStartY = event.clientY;
                    stopAutoplay();
                });

                sliderWrap.addEventListener('pointerup', function(event) {
                    var diffX = event.clientX - touchStartX;
                    var diffY = event.clientY - touchStartY;

                    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX < 0) nextSlide();
                        else prevSlide();
                    }

                    startAutoplay();
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
/* ============================================================
   REVIEW DATA ARCHITECTURE — single source of truth
   ------------------------------------------------------------
   • Replace `google.url` and `tripadvisor.url` with your official
     listing URLs.
   • PREFERRED: populate this object server-side from an approved
     Google Business Profile / Tripadvisor integration and print it
     into the page, so the UI always renders the real, current
     rating + review count. Never fake "live" data.
   • If no API is available, update `rating`, `count` and `updated`
     manually here — nothing is hardcoded in the markup.
   ============================================================ */
window.CLOUD9_REVIEWS = {

  google: {
    label: "Google",
    rating: 4.1,
    count: 2900,
    suffix: "+",
    updated: "2025-06-01",
    url: "https://www.google.com/travel/search?q=cloud%209%20hills%20resort%20lonavala%20reviews&g2lb=4899568%2C4899569%2C4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121762713&hl=en-IN&gl=in&ssta=1&ts=CAEaRwopEicyJTB4M2JlODAzNmQ5MmNhMzljMzoweGIxZjU2M2MzYWE2NDgxODcSGhIUCgcI6g8QCBgUEgcI6g8QCBgVGAEyAhAA&qs=CAEyFENnc0loNE9TMDdyNDJQcXhBUkFCOAJCCQmHgWSqw2P1sUIJCYeBZKrDY_Wx&ap=ugEHcmV2aWV3cw&ictx=111&ved=0CAAQ5JsGahcKEwjoiqbYquiWAxUAAAAAHQAAAAAQAw"
  },

  tripadvisor: {
    label: "Tripadvisor",
    rating: 4.4,
    count: 575,
    suffix: "+",
    updated: "2025-06-01",
    url: "https://www.tripadvisor.in/Hotel_Review-g608474-d1157903-Reviews-Cloud_9_Hills_Resort-Lonavala_Pune_District_Maharashtra.html"
  },

  /* Labels for third-party review platforms. Only used to render the
     small source badge on each slide — these are not tracked as
     rated/summarized platforms like Google and Tripadvisor above. */
  expedia: { label: "Expedia" },
  hotels:  { label: "Hotels.com" },

  /* ----------------------------------------------------------
     REVIEWS
     ----------------------------------------------------------
     Populated only with verifiable third-party reviews:

     • The two entries below were found via aggregator listings
       (Expedia and Hotels.com) for this same property — the
       address on those listings matches the resort's own
       contact address, confirming it's the same place. Each is
       tagged with its real source and the actual stay date where
       the listing provided one; the Hotels.com review did not
       include a date, so none is shown rather than invented.

     • No Google or Tripadvisor review text is included here —
       none could be independently verified as this property's
       own Google/Tripadvisor listing content. Add real excerpts
       from those two platforms (with month + year) as soon as
       you can supply or confirm them; the carousel scales
       automatically.

     Each entry:
     {
       source:   "google" | "tripadvisor" | "expedia" | "hotels",
       rating:   1–5,
       author:   "Real reviewer name",
       tripType: "Travelled with Family",
       date:     "March 2025"   (omit if the real date isn't known — never guess),
       dateISO:  "2025-03-12"   (omit alongside date),
       image:    "https://…/resort-photo.jpg"  (atmospheric resort imagery, not a guest photo),
       text:     "Original review text…"
     }
     ---------------------------------------------------------- */
  reviews: [
    {
    source: "google",
    rating: 5,
    author: "Kunal M",
    tripType: "Guest Review",
    date: "October 2025",
    dateISO: "2025-10-16",
    image: "Cloud 9 Compress Images/Exterior/5.webp",
    text: "Wonderful stay with delicious food, clean and comfortable rooms, excellent service and very welcoming staff."
  },

  {
    source: "tripadvisor",
    rating: 5,
    author: "Sachin G",
    tripType: "Travelled with Family",
    date: "August 2026",
    dateISO: "2026-08-01",
    image: "Cloud 9 Compress Images/All Images/Born Fire 1.webp",
    text: "Amazing location surrounded by clouds, excellent hospitality and a memorable family stay."
  },

  {
    source: "google",
    rating: 5,
    author: "Vikram A",
    tripType: "Guest Review",
    date: "October 2025",
    dateISO: "2025-10-13",
    image: "Cloud 9 Compress Images/All Images/Restaurant/Roof Top - 2.webp",
    text: "Fantastic getaway with authentic vegetarian food, warm hospitality and breathtaking mountain and valley views."
  },

  {
    source: "tripadvisor",
    rating: 5,
    author: "Global56299492576",
    tripType: "Guest Review",
    date: "August 2026",
    dateISO: "2026-08-01",
    image: "Cloud 9 Compress Images/All Images/Restaurant/Candle light dinne r2.webp",
    text: "Beautiful misty location, excellent food and service, making it a perfect place for relaxation."
  },

  {
    source: "google",
    rating: 5,
    author: "Riten S",
    tripType: "Guest Review",
    date: "August 2025",
    dateISO: "2025-08-21",
    image: "Cloud 9 Compress Images/All Images/Restaurant/Mocktail 7.webp",
    text: "The monsoon experience was magical with lush green hills, waterfalls, cool breeze and delicious food."
  },

  {
    source: "tripadvisor",
    rating: 5,
    author: "DayTrip02532419827",
    tripType: "Travelled with Family",
    date: "May 2026",
    dateISO: "2026-05-01",
    image: "Cloud 9 Compress Images/All Images/Restaurant/Mocktails.webp",
    text: "Clean spacious rooms, beautiful mountain views, warm hospitality and excellent vegetarian food made this a wonderful stay."
  },

  {
    source: "google",
    rating: 5,
    author: "Ankit P",
    tripType: "Guest Review",
    date: "October 2025",
    dateISO: "2025-10-14",
    image: "Cloud 9 Compress Images/All Images/Restaurant/Resturant 3.webp",
    text: "Loved the peaceful hillside atmosphere, cozy cottage, forest views and delicious food at the in-house restaurant."
  },

  {
    source: "tripadvisor",
    rating: 5,
    author: "Purva Rakhyani",
    tripType: "Guest Review",
    date: "May 2026",
    dateISO: "2026-05-01",
    image: "Cloud 9 Compress Images/Room 108/DSC06015-HDR.webp",
    text: "The atmosphere and overall vibe are amazing for families, friends and couples looking for a relaxing stay."
  },

  {
    source: "google",
    rating: 5,
    author: "Aditi Warang",
    tripType: "Guest Review",
    date: "Recent Review",
    dateISO: "",
    image: "Cloud 9 Compress Images/Room 109/DSC06036-HDR.webp",
    text: "Awesome weather, superb food quality and good service. A must-visit place for a relaxing getaway."
  },

  {
    source: "tripadvisor",
    rating: 5,
    author: "Connector28535902524",
    tripType: "Guest Review",
    date: "July 2026",
    dateISO: "2026-07-01",
    image: "Cloud 9 Compress Images/Room 109/DSC06054-HDR.webp",
    text: "A beautiful resort with great location, friendly staff, good food and excellent value for money."
  }

  ]
};


/* ============================================================
   GUEST STORIES — RENDER + INTERACTION
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.CLOUD9_REVIEWS;
  var section = document.getElementById('guest-stories');
  if (!section || !CFG) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function relativeUpdated(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d)) return '';
    var days = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (days <= 0) return 'Updated today';
    if (days === 1) return 'Updated yesterday';
    if (days < 30) return 'Updated ' + days + ' days ago';
    return 'Updated ' + d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  }

  var LOGOS = {
    google:
      '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true" focusable="false">' +
        '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
        '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
        '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
        '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
      '</svg>',
    tripadvisor:
      '<svg viewBox="0 0 32 20" width="21" height="13" aria-hidden="true" focusable="false" fill="none">' +
        '<circle cx="8" cy="10" r="7" stroke="currentColor" stroke-width="1.9"/>' +
        '<circle cx="8" cy="10" r="2.7" fill="currentColor"/>' +
        '<circle cx="24" cy="10" r="7" stroke="currentColor" stroke-width="1.9"/>' +
        '<circle cx="24" cy="10" r="2.7" fill="currentColor"/>' +
        '<path d="M16 13.6 13.6 17.8h4.8z" fill="currentColor"/>' +
      '</svg>'
  };

  function starsMarkup(rating) {
    var pct = Math.max(0, Math.min(100, (Number(rating) / 5) * 100));
    var row = '';
    for (var i = 0; i < 5; i++) {
      row += '<span class="gs-star" style="--i:' + i + '">&#9733;</span>';
    }
    return '' +
      '<span class="gs-stars" role="img" aria-label="' + esc(rating) + ' out of 5 stars">' +
        '<span class="gs-stars-row gs-stars-dim" aria-hidden="true">' + row + '</span>' +
        '<span class="gs-stars-row gs-stars-lit" aria-hidden="true" style="width:' + pct.toFixed(2) + '%">' + row + '</span>' +
      '</span>';
  }

  /* ---------- build carousel ---------- */
  var track = section.querySelector('#gsTrack');
  var viewport = section.querySelector('#gsViewport');
  var currentEl = section.querySelector('[data-current]');
  var totalEl = section.querySelector('[data-total]');
  var progressEl = section.querySelector('[data-progress]');
  var prevBtn = section.querySelector('[data-prev]');
  var nextBtn = section.querySelector('[data-next]');
  var controlsEl = section.querySelector('.gs-controls');

  var reviews = Array.isArray(CFG.reviews) ? CFG.reviews.filter(Boolean) : [];
  var total = reviews.length;
  var index = 0;
  var hasCarousel = total > 0;

  if (hasCarousel) {
    track.innerHTML = reviews.map(function (r, i) {
      var p = CFG[r.source] || {};
      var label = p.label || r.source;
      return '' +
        '<blockquote class="gs-slide' + (i === 0 ? ' is-active' : '') + '"' +
          ' role="group" aria-roledescription="slide"' +
          ' aria-label="' + (i + 1) + ' of ' + total + '"' +
          (i === 0 ? '' : ' aria-hidden="true"') + '>' +
          '<span class="gs-qmark" aria-hidden="true">&ldquo;</span>' +
          '<div class="gs-slide-left">' +
            starsMarkup(r.rating) +
            '<p class="gs-text">' + esc(r.text) + '</p>' +
          '</div>' +
          '<footer class="gs-slide-right">' +
            '<img class="gs-thumb" src="' + esc(r.image) + '" alt="" loading="lazy" decoding="async" width="300" height="225">' +
            '<div class="gs-guest-block">' +
              '<cite class="gs-name">' + esc(r.author) + '</cite>' +
              '<span class="gs-trip">' + esc(r.tripType || '') + '</span>' +
            '</div>' +
            '<div class="gs-src-block">' +
              '<span class="gs-src">' + (LOGOS[r.source] || '') + '<span>' + esc(label) + ' Review</span></span>' +
              '<time class="gs-date" datetime="' + esc(r.dateISO || '') + '">' + esc(r.date || '') + '</time>' +
            '</div>' +
          '</footer>' +
        '</blockquote>';
    }).join('');

    totalEl.textContent = String(total).padStart(2, '0');
  } else {
    /* No reviews yet — clean curated state, no fabricated content */
    viewport.removeAttribute('tabindex');
    viewport.removeAttribute('aria-roledescription');
    viewport.removeAttribute('role');
    viewport.innerHTML = '' +
      '<div class="gs-empty">' +
        '<span class="gs-qmark" aria-hidden="true">&ldquo;</span>' +
        '<p class="gs-empty-title">Guest stories are being curated.</p>' +
        '<p class="gs-empty-text">' +
          'Our latest reviews live on Google and Tripadvisor. ' +
          'Read them in full using the links below.' +
        '</p>' +
        '<span class="gs-empty-rule" aria-hidden="true"></span>' +
      '</div>';
    controlsEl.style.display = 'none';
  }

  var slides = hasCarousel ? Array.prototype.slice.call(track.children) : [];

  /* ---------- platform cards ---------- */
  var platformsEl = section.querySelector('#gsPlatforms');
  ['google', 'tripadvisor'].forEach(function (key, i) {
    var p = CFG[key];
    if (!p) return;
    var note = relativeUpdated(p.updated);
    platformsEl.insertAdjacentHTML('beforeend', '' +
      '<article class="gs-plat" data-platform="' + key + '" data-reveal style="--d:' + (460 + i * 80) + 'ms">' +
        '<div class="gs-plat-top">' +
          '<span class="gs-plat-logo gs-plat-logo--' + key + '">' + LOGOS[key] + '</span>' +
          '<div>' +
            '<h3 class="gs-plat-name">' + esc(p.label) + ' Reviews</h3>' +
            (note ? '<p class="gs-plat-note">' + esc(note) + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<div class="gs-plat-score">' +
          '<span class="gs-plat-value">' + Number(p.rating).toFixed(1) + '</span>' +
          '<div class="gs-plat-stars">' +
            starsMarkup(p.rating) +
            '<span class="gs-plat-count"><b data-count="' + Number(p.count) + '">0</b>' +
              esc(p.suffix || '') + ' reviews</span>' +
          '</div>' +
        '</div>' +
        '<a class="gs-plat-link" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<span>Read ' + esc(p.label) + ' reviews</span>' +
          '<span class="gs-arrow" aria-hidden="true">&rarr;</span>' +
        '</a>' +
      '</article>');
  });

  /* ---------- centred CTA buttons ---------- */
  var actionsEl = section.querySelector('#gsActions');
  ['google', 'tripadvisor'].forEach(function (key) {
    var p = CFG[key];
    if (!p) return;
    actionsEl.insertAdjacentHTML('beforeend', '' +
      '<a class="gs-action" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="gs-action-logo">' + LOGOS[key] + '</span>' +
        '<span>Read our ' + esc(p.label) + ' reviews</span>' +
        '<span class="gs-arrow" aria-hidden="true">&rarr;</span>' +
      '</a>');
  });

  /* ---------- carousel engine ---------- */
  var autoTimer = null;
  var AUTO_MS = 6200;

  function slideStep() {
    if (!slides.length) return 0;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slides[0].getBoundingClientRect().width + gap;
  }

  function render() {
    if (!slides.length) return;
    track.style.transform = 'translate3d(' + (-index * slideStep()).toFixed(2) + 'px,0,0)';

    slides.forEach(function (s, i) {
      var on = i === index;
      s.classList.toggle('is-active', on);
      if (on) s.removeAttribute('aria-hidden');
      else s.setAttribute('aria-hidden', 'true');
    });

    currentEl.textContent = String(index + 1).padStart(2, '0');
    progressEl.style.width = (((index + 1) / total) * 100).toFixed(2) + '%';
  }

  function go(dir, absolute) {
    if (!hasCarousel || total < 2) return;
    var next = (typeof absolute === 'number')
      ? absolute
      : (index + dir + total) % total;

    if (next === index) return;

    track.dataset.dir = (dir >= 0) ? 'next' : 'prev';
    index = next;
    render();
  }

  if (hasCarousel && total > 1) {
    prevBtn.addEventListener('click', function () { go(-1); restartAuto(); });
    nextBtn.addEventListener('click', function () { go(1); restartAuto(); });

    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); restartAuto(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); restartAuto(); }
    });

    var tX = 0, tY = 0, tracking = false;
    viewport.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      tX = e.touches[0].clientX;
      tY = e.touches[0].clientY;
      tracking = true;
      stopAuto();
    }, { passive: true });

    viewport.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - tX;
      var dy = e.changedTouches[0].clientY - tY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      startAuto();
    }, { passive: true });

    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);
    viewport.addEventListener('focusin', stopAuto);
    viewport.addEventListener('focusout', startAuto);
  }

  function startAuto() {
    if (reduceMotion || !hasCarousel || total < 2) return;
    stopAuto();
    autoTimer = window.setInterval(function () { go(1); }, AUTO_MS);
  }
  function stopAuto() {
    if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; }
  }
  function restartAuto() { stopAuto(); startAuto(); }

  var resizeTimer;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(render, 120);
  });

  /* ---------- review count animation ---------- */
  function animateCount(el) {
    var target = Number(el.getAttribute('data-count')) || 0;
    var fmt = function (n) { return n.toLocaleString('en-US'); };

    if (reduceMotion) { el.textContent = fmt(target); return; }

    var duration = 1600;
    var start = null;

    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }

  function runCounters() {
    section.querySelectorAll('[data-count]').forEach(function (el) {
      if (el.dataset.done === '1') return;
      el.dataset.done = '1';
      animateCount(el);
    });
  }

  /* ---------- scroll reveal ---------- */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        section.classList.add('is-inview');
        window.setTimeout(runCounters, 500);
        obs.disconnect();
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });

    revealObserver.observe(section);
  } else {
    section.classList.add('is-inview');
    runCounters();
  }

  /* ---------- auto-rotate only while visible ---------- */
  if ('IntersectionObserver' in window && hasCarousel && total > 1) {
    var visObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) startAuto();
        else stopAuto();
      });
    }, { threshold: 0.25 });
    visObserver.observe(viewport);
  } else {
    startAuto();
  }

  /* ---------- background parallax (desktop only) ---------- */
  (function parallax() {
    var bgImg = section.querySelector('.gs-bg-img');
    if (!bgImg) return;

    var mqDesktop = window.matchMedia('(min-width: 769px)');
    if (reduceMotion || !mqDesktop.matches) return;

    var ticking = false;

    function update() {
      ticking = false;
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh - rect.top) / (vh + rect.height);
      var y = (progress - 0.5) * 70;
      bgImg.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  })();

  /* ---------- initial paint ---------- */
  if (hasCarousel) {
    render();
    window.addEventListener('load', render);
  }
})();

(function () {
  'use strict';

  var section = document.querySelector('.cloud9-dining-experiences');
  if (!section) return;

  /* ---------- section reveal ---------- */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        section.classList.add('is-inview');
        o.disconnect();
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    obs.observe(section);
  } else {
    section.classList.add('is-inview');
  }

  /* ---------- accordion ---------- */
  var panels = Array.prototype.slice.call(section.querySelectorAll('.c9-exp-panel'));

  function isMobileCarousel() {
    return window.matchMedia('(max-width: 780px)').matches;
  }

  function activate(index) {
    if (isMobileCarousel()) return;
    panels.forEach(function (p, i) {
      var on = i === index;
      p.classList.toggle('is-active', on);
      var hit = p.querySelector('.c9-exp-hit');
      if (hit) hit.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  }

  panels.forEach(function (panel, i) {
    var hit = panel.querySelector('.c9-exp-hit');
    if (hit) hit.addEventListener('click', function () { activate(i); });

    panel.addEventListener('mouseenter', function () {
      if (window.matchMedia('(hover: hover) and (min-width: 781px)').matches) {
        activate(i);
      }
    });

    panel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' && i < panels.length - 1) {
        e.preventDefault();
        activate(i + 1);
        panels[i + 1].querySelector('.c9-exp-hit').focus();
      } else if (e.key === 'ArrowLeft' && i > 0) {
        e.preventDefault();
        activate(i - 1);
        panels[i - 1].querySelector('.c9-exp-hit').focus();
      }
    });
  });

  var rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT);
    rT = setTimeout(function () {
      if (!isMobileCarousel()) {
        var active = panels.findIndex(function (p) { return p.classList.contains('active'); });
        activate(active >= 0 ? active : 0);
      }
    }, 160);
  });
})();

/* ============================================
   CELEBRATION CARDS — TAP TO FLIP (MOBILE)
   ============================================ */
(function () {
    const cards = document.querySelectorAll('[data-celebration]');
    if (!cards.length) return;

    const isTouch =
        window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window;

    if (isTouch) {
        cards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                if (e.target.closest('a')) return;

                cards.forEach(function (c) {
                    if (c !== card) c.classList.remove('is-flipped');
                });

                card.classList.toggle('is-flipped');
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('[data-celebration]')) {
                cards.forEach(function (c) {
                    c.classList.remove('is-flipped');
                });
            }
        });
    }
})();


(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Loader */
  function initLoader() {
    var el = document.getElementById("c9aLoader");
    if (!el) return;
    if (reduced) { el.style.display = "none"; return; }
    requestAnimationFrame(function () { el.classList.add("is-active"); });
    setTimeout(function () { el.classList.add("is-done"); }, 900);
    setTimeout(function () { el.style.display = "none"; }, 2200);
  }

  /* Scroll reveal */
  function initReveal() {
    var els = document.querySelectorAll(".c9a-r, .c9a-rimg, .c9a-chapter, .c9a-diff__item, .c9a-philosophy, [data-break], [data-final]");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var d = parseFloat(entry.target.getAttribute("data-reveal-delay") || "0");
        setTimeout(function () { entry.target.classList.add("is-in"); }, d * 1000);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* Count-up stats */
  function initCounters() {
    var els = document.querySelectorAll(".c9a-stat__num[data-count]");
    if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.textContent = (e.getAttribute("data-prefix") || "") + e.getAttribute("data-count") + (e.getAttribute("data-suffix") || ""); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = performance.now();
        (function tick(now) {
          var t = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        })(start);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* Chapter nav scrollspy + smooth anchors */
  function initNav() {
    var links = document.querySelectorAll(".c9a-nav__link");
    if (!links.length) return;
    var sections = Array.prototype.map.call(links, function (l) {
      var id = l.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    });
    function onScroll() {
      var y = window.scrollY + 180;
      var current = 0;
      sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
      links.forEach(function (l, i) { l.classList.toggle("is-active", i === current); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    document.querySelectorAll('a[href^="#"], [data-scroll-to]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href") || a.getAttribute("data-scroll-to");
        if (!id || id === "#") return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var nav = document.querySelector(".c9a-nav");
        var off = nav ? nav.offsetHeight + 12 : 80;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: reduced ? "auto" : "smooth" });
      });
    });
  }

  /* Day timeline */
  function initDay() {
    var wrap = document.querySelector("[data-day]");
    if (!wrap) return;
    var items = wrap.querySelectorAll(".c9a-day__item");
    var media = document.querySelectorAll("[data-day-media]");
    items.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = btn.getAttribute("data-day-index");
        items.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        media.forEach(function (m) { m.classList.toggle("is-active", m.getAttribute("data-day-media") === i); });
      });
    });
  }

  /* Stay slider */
  function initSlider() {
    var track = document.getElementById("staySlider");
    if (!track) return;
    var prev = document.getElementById("stayPrev");
    var next = document.getElementById("stayNext");
    var prog = document.getElementById("stayProgress");

    function step() {
      var first = track.querySelector(".c9a-slide");
      return first ? first.getBoundingClientRect().width + 22 : 340;
    }
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });

    function updateProg() {
      if (!prog) return;
      var max = track.scrollWidth - track.clientWidth;
      var pct = max > 0 ? (track.scrollLeft / max) : 0;
      prog.style.width = Math.max(15, Math.min(100, 15 + pct * 85)) + "%";
    }
    track.addEventListener("scroll", updateProg, { passive: true });
    updateProg();

    if (fine) {
      var down = false, sx = 0, ss = 0;
      track.addEventListener("mousedown", function (e) {
        down = true; sx = e.pageX; ss = track.scrollLeft;
        track.classList.add("is-dragging");
      });
      window.addEventListener("mouseup", function () {
        down = false; track.classList.remove("is-dragging");
      });
      window.addEventListener("mousemove", function (e) {
        if (!down) return;
        e.preventDefault();
        track.scrollLeft = ss - (e.pageX - sx) * 1.15;
      });
    }
  }

  /* Magnetic buttons */
  function initMagnetic() {
    if (!fine || reduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate3d(" + (x * 0.1) + "px," + (y * 0.14 - 2) + "px,0)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* Custom cursor */
  function initCursor() {
    if (!fine || reduced) return;
    var dot = document.getElementById("c9aCursor");
    if (!dot) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, active = false;

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      var hovered = e.target.closest("[data-cursor]");
      if (hovered) {
        if (!active) { dot.classList.add("is-visible"); active = true; }
        var kind = hovered.getAttribute("data-cursor");
        dot.classList.toggle("is-view", kind === "VIEW");
        dot.classList.toggle("is-open", kind === "OPEN");
        dot.classList.toggle("is-drag", kind === "DRAG");
      } else {
        if (active) {
          dot.classList.remove("is-visible", "is-view", "is-open", "is-drag");
          active = false;
        }
      }
    });
    document.addEventListener("mouseleave", function () {
      dot.classList.remove("is-visible", "is-view", "is-open", "is-drag");
      active = false;
    });

    (function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      dot.style.transform = "translate3d(" + cx + "px," + cy + "px,0) translate(-50%,-50%) scale(" + (active ? 1 : 0.6) + ")";
      requestAnimationFrame(loop);
    })();
  }

  /* Video controls */
  function initVideo() {
    var v = document.getElementById("c9aVideo");
    var toggle = document.getElementById("c9aVideoToggle");
    var fs = document.getElementById("c9aVideoFs");
    if (!v) return;
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (v.paused) { v.play(); toggle.setAttribute("aria-label", "Pause video"); }
        else { v.pause(); toggle.setAttribute("aria-label", "Play video"); }
      });
    }
    if (fs) {
      fs.addEventListener("click", function () {
        if (v.requestFullscreen) v.requestFullscreen();
        else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      });
    }
  }

  function boot() {
    initLoader();
    initReveal();
    initCounters();
    initNav();
    initDay();
    initSlider();
    initMagnetic();
    initCursor();
    initVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();