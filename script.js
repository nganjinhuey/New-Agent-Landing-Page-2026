/* ====================================================
   WEKONGSI LANDING PAGE — JAVASCRIPT
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ====== NAVBAR SCROLL BEHAVIOUR ======
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        animationObserver.unobserve(el);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up, .animate-scale-in').forEach(el => {
    animationObserver.observe(el);
  });

  // Trigger hero animations immediately
  document.querySelectorAll('.hero .animate-fade-up, .hero .animate-scale-in').forEach(el => {
    el.classList.add('visible');
  });

  // ====== STAT BAR ANIMATIONS ======
  const statBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-bar-fill').forEach(bar => {
          bar.style.width = bar.style.width; // trigger reflow
        });
        statBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-grid').forEach(grid => {
    statBarObserver.observe(grid);
  });

  // ====== COUNTER ANIMATION ======
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const formatted = decimals
        ? current.toFixed(decimals)
        : Math.floor(current).toLocaleString();
      el.textContent = prefix + formatted + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter-number').forEach(counter => {
          animateCounter(counter);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const impactSection = document.querySelector('.impact');
  if (impactSection) counterObserver.observe(impactSection);

  // ====== STAT NUMBER ANIMATION ======
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 16);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const realitySection = document.querySelector('.reality');
  if (realitySection) statObserver.observe(realitySection);

  // ====== FAQ ACCORDION ======
  window.toggleFaq = function(id) {
    const item = document.getElementById(id);
    if (!item) return;

    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(fi => {
      fi.classList.remove('open');
    });

    // Open clicked if not was open
    if (!isOpen) {
      item.classList.add('open');
    }
  };

  // ====== STAT BAR REVEAL ======
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-bar-fill').forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bar.style.transition = 'width 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s';
              bar.style.width = width;
            });
          });
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-card').forEach(card => {
    barObserver.observe(card);
  });

  // ====== PARALLAX HERO SHAPES ======
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    shapes.forEach((shape, i) => {
      const speed = 0.03 + (i * 0.02);
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  // ====== ACTIVE NAV LINK ON SCROLL ======
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ====== PLAN CARD HOVER EFFECTS ======
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '';
    });
  });

  // ====== TESTIMONIAL CARD HOVER EFFECT ======
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = '#FFFFFF';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ====== FEATURE CARD STAGGER DELAY ======
  document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
    card.dataset.delay = (i % 3) * 120;
  });

  document.querySelectorAll('.coverage-grid .coverage-card').forEach((card, i) => {
    card.dataset.delay = (i % 3) * 100;
  });

  // ====== SCROLL PROGRESS INDICATOR ======
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4a9d8e, #5fb0a0);
    z-index: 9999;
    transition: width 0.1s ease;
    width: 0%;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });

  // ====== LAZY LOAD PARTNER LOGOS ======
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.partner-logo-card img');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          imgObserver.unobserve(entry.target);
        }
      });
    });

    lazyImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      imgObserver.observe(img);
    });
  }

  // ====== TYPING EFFECT FOR HERO HEADLINE ======
  // Subtle accent glow on hover for CTA buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ====== HERO ROTATING OBJECTIONS ======
  (function () {
    const fallback = [
      "I don't think it's important right now.",
      "I'm still young and healthy.",
      "I don't understand how it works.",
      "The terms are too complicated."
    ];
    function phrases() {
      var p = (window.wkT && window.wkT('hero.rotate'));
      return (Array.isArray(p) && p.length) ? p : fallback;
    }
    const el = document.querySelector('.hero-rotate-text');
    if (!el) return;
    let i = 0;
    setInterval(() => {
      el.classList.add('out');
      setTimeout(() => {
        var p = phrases();
        i = (i + 1) % p.length;
        el.textContent = p[i];
        el.classList.remove('out');
      }, 420);
    }, 2800);
  })();

  // ====== AUTO TOP-UP SIMULATION ======
  (function () {
    const fill = document.getElementById('topupFill');
    const bal = document.getElementById('topupBal');
    const status = document.getElementById('topupStatus');
    const legs = document.querySelectorAll('.topup-leg');
    if (!fill || !bal || !status) return;

    const TRIGGER = 75;       // fixed auto top-up threshold (RM75) for both packages
    const STEP = 30;          // same monthly deduction for both — Deluxe just lasts longer
    let MAX = 150;
    let v = MAX;
    let phase = 'deduct';
    let timer = null;
    let monthIdx = 0;

    const maxEls = document.querySelectorAll('.topup-maxval');
    const pkgBtns = document.querySelectorAll('.topup-pkg-btn');
    const markEl = document.getElementById('topupMark');
    function applyPackage(max) {
      MAX = max;
      v = MAX; phase = 'deduct'; monthIdx = 0;
      maxEls.forEach(e => { e.textContent = 'RM' + max; });
      if (markEl) markEl.style.left = (TRIGGER / max * 100) + '%';
      pkgBtns.forEach(b => b.classList.toggle('active', parseInt(b.dataset.max, 10) === max));
      setLeg('deduct');
      status.innerHTML = st('at.status.deduct');
      render();
    }
    pkgBtns.forEach(b => b.addEventListener('click', () => applyPackage(parseInt(b.dataset.max, 10))));

    const FALLBACK_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function monthName() {
      const m = (window.wkT && window.wkT('at.months'));
      const arr = (Array.isArray(m) && m.length === 12) ? m : FALLBACK_MONTHS;
      return arr[monthIdx % 12];
    }
    function setLeg(p) {
      legs.forEach(l => l.classList.toggle('active', l.dataset.phase === p));
    }
    function st(key) {
      return '<span class="topup-dot"></span> ' + (window.wkT ? window.wkT(key) : '');
    }
    function stDeduct() {
      const mn = monthName();
      monthIdx = (monthIdx + 1) % 12;
      return '<span class="topup-dot"></span> ' + mn + ' · ' + (window.wkT ? window.wkT('at.status.deduct') : '');
    }
    function render() {
      fill.style.width = (v / MAX * 100) + '%';
      bal.textContent = 'RM' + v;
      fill.classList.toggle('low', v <= TRIGGER);
    }
    function tick() {
      if (phase === 'deduct') {
        v -= STEP;
        if (v <= TRIGGER) {
          v = Math.max(v, 15);
          phase = 'trigger';
          status.innerHTML = st('at.status.trigger');
          setLeg('trigger');
        } else {
          status.innerHTML = stDeduct();
          setLeg('deduct');
        }
      } else if (phase === 'trigger') {
        phase = 'restore';
        v = MAX;
        status.innerHTML = st('at.status.restore');
        setLeg('restore');
      } else {
        phase = 'deduct';
        status.innerHTML = stDeduct();
        setLeg('deduct');
      }
      render();
    }

    applyPackage(150);

    // Only run the loop while the section is in view
    const simSection = document.querySelector('.sharing-topup') || document.querySelector('.sharing-account');
    if (simSection && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!timer) timer = setInterval(tick, 1500);
          } else if (timer) {
            clearInterval(timer);
            timer = null;
          }
        });
      }, { threshold: 0.25 });
      obs.observe(simSection);
    } else {
      timer = setInterval(tick, 1500);
    }
  })();

  // ====== COB TOGGLE — transforms the example cards ======
  (function () {
    const btns = document.querySelectorAll('.cs-cap-btn');
    if (!btns.length) return;
    const numSwaps = document.querySelectorAll('.cs-swap[data-off]');
    const txtSwaps = document.querySelectorAll('[data-i18n-on]');
    function setCob(on) {
      btns.forEach(b => b.classList.toggle('active', (b.dataset.cob === 'on') === on));
      numSwaps.forEach(el => { el.textContent = on ? el.dataset.on : el.dataset.off; });
      txtSwaps.forEach(el => {
        const key = on ? el.dataset.i18nOn : el.dataset.i18nOff;
        if (!key) return;
        el.setAttribute('data-i18n', key);
        if (window.wkT) el.innerHTML = window.wkT(key);
      });
    }
    btns.forEach(b => b.addEventListener('click', () => setCob(b.dataset.cob === 'on')));
  })();

  // ====== TESTIMONIAL CAROUSEL ======
  (function () {
    const vp = document.getElementById('tcardViewport');
    const nextBtn = document.getElementById('tcardNext');
    const prevBtn = document.getElementById('tcardPrev');
    if (!vp) return;

    const PAUSE = 5000; // ms each slide rests before advancing
    const atEnd = () => vp.scrollLeft + vp.clientWidth >= vp.scrollWidth - 2;
    const step = () => Math.max(280, Math.round(vp.clientWidth * 0.85));

    function advance() {
      if (atEnd()) {
        vp.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        vp.scrollBy({ left: step(), behavior: 'smooth' });
      }
    }
    function rewind() {
      if (vp.scrollLeft <= 2) {
        vp.scrollTo({ left: vp.scrollWidth, behavior: 'smooth' });
      } else {
        vp.scrollBy({ left: -step(), behavior: 'smooth' });
      }
    }

    // Stepped auto-advance with a long pause between moves
    let auto = null;
    function startAuto() { if (!auto) auto = setInterval(advance, PAUSE); }
    function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
    // Restart the pause timer after a manual interaction
    function bump() { stopAuto(); startAuto(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { advance(); bump(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { rewind(); bump(); });

    // Pause on hover, resume on leave
    vp.addEventListener('mouseenter', stopAuto);
    vp.addEventListener('mouseleave', startAuto);
    vp.addEventListener('touchstart', stopAuto, { passive: true });

    // Only run while the section is on screen
    const section = document.querySelector('.testimonials');
    if (section && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { e.isIntersecting ? startAuto() : stopAuto(); });
      }, { threshold: 0.15 });
      obs.observe(section);
    } else {
      startAuto();
    }
  })();

  console.log('We Kongsi Landing Page initialized');
});
