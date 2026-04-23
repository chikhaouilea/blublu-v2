// =============================================================
// BLU BLU SIDI BOU PARIS — INTERACTIONS
// =============================================================

document.addEventListener('DOMContentLoaded', () => {

  const intro = document.getElementById('intro');
  const enterBtn = document.getElementById('enterBtn');
  const skipIntro = document.getElementById('skipIntro');
  const site = document.getElementById('site');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  // === INTRO : Animation d'ouverture des portes ===

  function enterSite() {
    if (!intro || intro.classList.contains('opening')) return;

    // Phase 1 : ouverture des portes + déploiement du tapis
    intro.classList.add('opening');

    // Phase 2 : fondu de l'intro vers le site
    setTimeout(() => {
      intro.classList.add('fade-out');
      if (site) site.classList.add('revealed');
      document.body.style.overflow = '';
    }, 3200);

    // Suppression complète
    setTimeout(() => {
      intro.style.display = 'none';
    }, 5000);
  }

  function skipIntroAnimation() {
    if (!intro) return;
    intro.classList.add('fade-out');
    if (site) site.classList.add('revealed');
    document.body.style.overflow = '';
    setTimeout(() => intro.style.display = 'none', 1400);
  }

  // Bloquer le scroll UNIQUEMENT si on est sur une page avec intro
  if (intro) {
    document.body.style.overflow = 'hidden';
  }

  if (enterBtn) enterBtn.addEventListener('click', enterSite);
  if (skipIntro) skipIntro.addEventListener('click', skipIntroAnimation);

  // Auto-skip si l'utilisateur préfère réduire les animations (et qu'il y a une intro)
  if (intro && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipIntroAnimation();
  }

  // === NAVIGATION : Scroll effects ===
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // === MOBILE MENU ===
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // === REVEAL ANIMATIONS ON SCROLL ===
  const revealElements = document.querySelectorAll(
    '.story-grid, .signature-grid, .menu-categories, .gallery-grid, .reviews-grid, .contact-grid, .section-head'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // === FORM HANDLING ===
  // Le formulaire utilise FormSubmit.co pour envoyer les données par email.
  // On n'intercepte pas la soumission : on laisse le formulaire partir vers l'action définie.
  // On ajoute juste un feedback visuel pendant l'envoi.
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Envoi en cours...';
      btn.style.background = 'var(--gold)';
      btn.style.borderColor = 'var(--gold)';
      // On laisse le formulaire partir naturellement
    });
  }

  // === SMOOTH SCROLL avec offset pour la nav fixe ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

});
