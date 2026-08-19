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
            hamburger.addEventListener('click', function() {
                var isOpen = mobileNav.classList.toggle('open');
                hamburger.classList.toggle('active', isOpen);
                hamburger.setAttribute('aria-expanded', String(isOpen));
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });
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