  /* ═══════════════════════════════════════════
     VIRAT CAFE — LANDING PAGE JS
  ═══════════════════════════════════════════ */
 
  // ── PRELOADER ──
  (function () {
    const fill = document.getElementById('preloaderFill');
    const loader = document.getElementById('preloader');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('hidden');
          // Trigger hero reveals after preloader
          document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
            el.classList.add('revealed');
          });
        }, 300);
      }
      fill.style.width = progress + '%';
    }, 80);
  })();
 
  // ── CUSTOM CURSOR ──
  (function () {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let fx = 0, fy = 0, mx = 0, my = 0;
 
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
 
    function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
 
    // Scale on interactive elements
    document.querySelectorAll('a, button, .menu-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        follower.style.width = '60px';
        follower.style.height = '60px';
        follower.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.opacity = '1';
      });
    });
  })();
 
  // ── NAVBAR SCROLL ──
  (function () {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  })();
 
  // ── MOBILE MENU ──
  (function () {
    const burger = document.getElementById('burger');
    const menu   = document.getElementById('mobileMenu');
 
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
 
    menu.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  })();
 
  // ── SCROLL REVEAL ──
  (function () {
    const targets = document.querySelectorAll('.reveal-up, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
 
    targets.forEach(el => observer.observe(el));
  })();
 
  // ── PARTICLES CANVAS ──
  (function () {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
 
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
 
    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor(W * H / 14000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.4,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          a: Math.random() * 0.5 + 0.1
        });
      }
    }
 
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,162,87,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
 
    resize(); createParticles(); draw();
    window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
  })();
 
  // ── PARALLAX HERO ORBS on mousemove ──
  (function () {
    const orbs = document.querySelectorAll('.orb');
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orbs.forEach((orb, i) => {
        const strength = (i + 1) * 12;
        orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    }, { passive: true });
  })();