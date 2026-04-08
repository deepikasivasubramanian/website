/* ══════════════════════════════════════════════════════
   Sweet Scribbles — Shared JavaScript
   Scroll reveal + header scroll + mobile menu + form
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // ── Header Scroll ──
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileNav.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translateY(6.5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translateY(-6.5px)' : '';
    });
  }

  // ── Highlight Active Nav ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Contact Form ──
  const form = document.getElementById('contactForm');
  const formContent = document.getElementById('formContent');
  const successMsg = document.getElementById('successMessage');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fname = form.querySelector('[name="fname"]').value;
      const phone = form.querySelector('[name="phone"]').value;
      const occasion = form.querySelector('[name="occasion"]').value;
      if (!fname) { alert('Please enter your first name.'); return; }
      if (!phone) { alert('Please enter your phone number.'); return; }
      if (!occasion) { alert('Please select an occasion type.'); return; }
      if (formContent) formContent.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    });
  }

  // ── Collection Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Simple visual toggle — all cards shown (filtering logic can be extended)
    });
  });
});
