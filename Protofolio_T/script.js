/**
 * Toqa Mohammed — Portfolio Scripts
 */

(function () {
  'use strict';

  /* ============================================
     DOM REFERENCES
     ============================================ */

  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const backToTop = document.getElementById('back-to-top');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const mouseGlow = document.querySelector('.mouse-glow');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const skillItems = document.querySelectorAll('.skill-item');
  const parallaxElements = document.querySelectorAll('.parallax');
  const contactCards = document.querySelectorAll('.contact-card[data-copy]');
  const toast = document.getElementById('toast');
  const typingEl = document.getElementById('typing');

  const sections = document.querySelectorAll('section[id]');

  /* ============================================
     LOADING SCREEN
     ============================================ */

  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 2000);
    });

    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 3500);
  }

  /* ============================================
     THEME TOGGLE
     ============================================ */

  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      if (next === 'light') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      localStorage.setItem('portfolio-theme', next);
    });
  }

  /* ============================================
     NAVBAR
     ============================================ */

  function initNavbar() {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('active')
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  /* ============================================
     SMOOTH SCROLL & ACTIVE SECTION
     ============================================ */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }

  /* ============================================
     SCROLL PROGRESS
     ============================================ */

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = progress + '%';
  }

  /* ============================================
     BACK TO TOP
     ============================================ */

  function initBackToTop() {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
  }

  /* ============================================
     CUSTOM CURSOR & MOUSE GLOW
     ============================================ */

  function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (mouseGlow) {
        mouseGlow.style.left = mouseX + 'px';
        mouseGlow.style.top = mouseY + 'px';
      }
    });

    function animateCursor() {
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
      }

      if (cursorOutline) {
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
      }

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverTargets = document.querySelectorAll(
      'a, button, .btn, .contact-card, .project-card, .project-btn, .cert-card, .service-card, .testimonial-card, img, .hero-stat, .social-link'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline?.classList.add('hover');
        cursorDot?.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline?.classList.remove('hover');
        cursorDot?.classList.remove('hover');
      });
    });
  }

  /* ============================================
     PARALLAX
     ============================================ */

  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        el.style.transform = `translateY(${scrollY * speed * 0.15}px)`;
      });
    });
  }

  /* ============================================
     REVEAL ON SCROLL
     ============================================ */

  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ============================================
     SKILL BARS — COUNT UP
     ============================================ */

  function animateCounter(element, target, duration, suffix) {
    suffix = suffix || '';
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function initHeroStats() {
    const stats = document.querySelectorAll('.hero-stat');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.dataset.target, 10);
            const countEl = stat.querySelector('.count');

            if (countEl && !stat.classList.contains('counted')) {
              stat.classList.add('counted');
            animateCounter(countEl, target, 1800, '');
            }

            observer.unobserve(stat);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
  }

  function initSkills() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target;
            const percent = parseInt(item.dataset.percent, 10);
            const fill = item.querySelector('.skill-fill');
            const percentEl = item.querySelector('.skill-percent');

            fill.style.setProperty('--target-width', percent + '%');
            item.classList.add('animated');
            animateCounter(percentEl, percent, 1500, '%');

            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillItems.forEach((item) => observer.observe(item));
  }

  /* ============================================
     TYPING EFFECT
     ============================================ */

  function initTyping() {
    if (!typingEl) return;

    const phrases = [
      'UI/UX Designer',
      'Creative Thinker',
      'Problem Solver',
      'AI Enthusiast',
      'Digital Craftsman'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    setTimeout(type, 2500);
  }

  /* ============================================
     COPY TO CLIPBOARD
     ============================================ */

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function initCopyToClipboard() {
    contactCards.forEach((card) => {
      const btn = card.querySelector('.contact-btn');
      const value = card.dataset.copy;

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();

        try {
          await navigator.clipboard.writeText(value);
          showToast('Copied to clipboard!');
        } catch {
          const textarea = document.createElement('textarea');
          textarea.value = value;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Copied to clipboard!');
        }
      });
    });
  }

  /* ============================================
     SCROLL HANDLER (combined)
     ============================================ */

  function onScroll() {
    updateScrollProgress();
    updateActiveNav();
  }

  /* ============================================
     INIT
     ============================================ */

  function init() {
    initLoader();
    initTheme();
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initCursor();
    initParallax();
    initReveal();
    initSkills();
    initHeroStats();
    initTyping();
    initCopyToClipboard();

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
