/**
 * Harsh Shroff — AI/ML Engineer Portfolio
 * Midnight Engineering — Vanilla JS
 */

'use strict';

/* ═══════════════════════════════════════════
   1. NAVBAR — scroll state + mobile toggle
   ═══════════════════════════════════════════ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const toggle   = navbar?.querySelector('.nav-toggle');
  const navLinks = navbar?.querySelectorAll('.nav-link');

  if (!navbar) return;

  // Scroll state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu — toggles nav-open on #navbar, no duplicate HTML
  if (toggle) {
    const open = () => {
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      navbar.classList.add('nav-open');
    };
    const close = () => {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      navbar.classList.remove('nav-open');
    };

    toggle.addEventListener('click', () => {
      toggle.classList.contains('open') ? close() : open();
    });

    navLinks?.forEach(link => link.addEventListener('click', close));

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) close();
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });

    navLinks?.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
})();

/* ═══════════════════════════════════════════
   2. SCROLL REVEAL
   ═══════════════════════════════════════════ */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════
   3. TYPED TEXT EFFECT
   ═══════════════════════════════════════════ */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'LLM Agents & RAG Systems',
    'Neuro-Symbolic AI',
    'Edge Computer Vision',
    'Production MLOps',
    'Multi-Modal AI Pipelines',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  const TYPING_SPEED  = 60;
  const ERASE_SPEED   = 35;
  const PAUSE_AFTER   = 1800;
  const PAUSE_BEFORE  = 500;

  function tick() {
    if (paused) return;

    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; tick(); }, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        paused = true;
        setTimeout(() => { paused = false; tick(); }, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, ERASE_SPEED);
    }
  }

  // Small delay before starting
  setTimeout(tick, 1200);
})();

/* ═══════════════════════════════════════════
   4. COUNT-UP ANIMATION
   ═══════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.count');
  if (!counters.length) return;

  const DURATION = 1800; // ms

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = Math.round(easeOutQuart(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════════════════
   5. PROJECT CATEGORY FILTERING
   ═══════════════════════════════════════════ */
(function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards with smooth opacity
      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.classList.remove('hidden');
          // Stagger reveal
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ═══════════════════════════════════════════
   6. SMOOTH SCROLL for anchor links
   ═══════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id  = link.getAttribute('href').slice(1);
      const el  = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ═══════════════════════════════════════════
   7. FOOTER YEAR
   ═══════════════════════════════════════════ */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ═══════════════════════════════════════════
   8. BENTO CARD — subtle tilt on hover (desktop)
   ═══════════════════════════════════════════ */
(function initTilt() {
  // Skip on touch devices / reduced motion
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const tiltX  = ((y - cy) / cy) * 3;   // max ±3deg
      const tiltY  = ((x - cx) / cx) * -3;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ═══════════════════════════════════════════
   9. MOBILE NAV — ensure display reset on resize
   ═══════════════════════════════════════════ */
(function initResizeReset() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const navbar = document.getElementById('navbar');
      const toggle = document.querySelector('.nav-toggle');
      if (window.innerWidth > 768) {
        if (navbar) navbar.classList.remove('nav-open');
        if (toggle) {
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    }, 150);
  });
})();

/* ═══════════════════════════════════════════
   10. SCROLL PROGRESS BAR
   ═══════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ═══════════════════════════════════════════
   11. COPY EMAIL
   ═══════════════════════════════════════════ */
(function initCopyEmail() {
  const btn   = document.getElementById('copy-email');
  const toast = document.getElementById('email-toast');
  if (!btn || !toast) return;

  let timer;
  btn.addEventListener('click', () => {
    const email = btn.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('show'), 2200);
    }).catch(() => {
      // Fallback for browsers without clipboard API
      window.location.href = 'mailto:' + email;
    });
  });
})();

/* ═══════════════════════════════════════════
   12. CURSOR SPOTLIGHT
   ═══════════════════════════════════════════ */
(function initSpotlight() {
  // Skip on touch/mobile devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--cx', e.clientX + 'px');
    document.body.style.setProperty('--cy', e.clientY + 'px');
  }, { passive: true });
})();
