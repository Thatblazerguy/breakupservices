/* ============================================
   BREAKUP SERVICE — main.js
   By Rahul R | USN: 1MS24CS139
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  document.querySelectorAll('a, button, .service-card, .price-card, .testi-card, .step').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursorRing.style.width = '54px';
      cursorRing.style.height = '54px';
      cursorRing.style.borderColor = 'var(--hot-pink)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'var(--sky-blue)';
    });
  });

  /* ── COLOR SPLASH PARTICLES ON CLICK ── */
  const colors = ['#FF3E8E','#FF5A5F','#FFA552','#FFD84D','#5ED3E6','#C8A2E8','#FFC1A6','#B8F2E6'];

  document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 14 + 6;
      const angle = Math.random() * 360;
      const dist = Math.random() * 60 + 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dx = Math.cos(angle * Math.PI / 180) * dist;
      const dy = Math.sin(angle * Math.PI / 180) * dist;
      p.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        transform: translate(-50%, -50%);
        animation: particleFade 0.7s ease forwards;
      `;
      document.body.appendChild(p);
      // Move particle outward
      requestAnimationFrame(() => {
        p.style.left = (e.clientX + dx) + 'px';
        p.style.top = (e.clientY + dy) + 'px';
        p.style.transition = 'left 0.7s ease, top 0.7s ease';
      });
      setTimeout(() => p.remove(), 800);
    }
  });

  /* ── NAVBAR SCROLL EFFECT ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger children if they exist
        const children = entry.target.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 120);
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => observer.observe(el));

  /* ── SCROLL TO TOP BUTTON ── */
  const scrollBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = '💌 Sending...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.opacity = '1';
      showToast('💖 We received your heartbreak. Help is on the way!');
      form.reset();
      setTimeout(() => {
        btn.textContent = '💌 Send Your Story';
      }, 3000);
    }, 1600);
  });

  /* ── TOAST NOTIFICATION ── */
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /* ── CONFETTI STRIP COLORS ── */
  const strip = document.querySelector('.confetti-strip');
  if (strip) {
    const stripColors = [
      '#FF3E8E','#FF5A5F','#FFA552','#FFD84D','#5ED3E6',
      '#C8A2E8','#FFC1A6','#B8F2E6','#FF3E8E','#5ED3E6',
      '#FFD84D','#FF5A5F','#C8A2E8','#FFA552','#B8F2E6'
    ];
    strip.innerHTML = stripColors.map((c, i) =>
      `<span style="background:${c};animation-delay:${i * 0.1}s"></span>`
    ).join('');
  }

  /* ── PRICING BUTTON CLICKS ── */
  document.querySelectorAll('.btn-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.closest('.price-card').querySelector('.price-plan').textContent;
      showToast(`🎉 You selected the ${plan} plan! Let's heal together.`);
    });
  });

  /* ── SMOOTH NAV LINK SCROLLING ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── ANIMATED NUMBER COUNTER IN HERO STATS ── */
  function animateCount(el, target, suffix = '') {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString() + suffix;
      }
    }, 25);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll('[data-count]');
        stats.forEach(stat => {
          const target = parseInt(stat.dataset.count);
          const suffix = stat.dataset.suffix || '';
          animateCount(stat, target, suffix);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) statObserver.observe(statsSection);

  /* ── CARD TILT ON MOUSE MOVE ── */
  document.querySelectorAll('.service-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (-y / rect.height) * 8;
      const rotY = (x / rect.width) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
