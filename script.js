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

  // === GESTION INTRO : uniquement à la première visite ===
  // On utilise sessionStorage : l'intro ne s'affiche qu'une fois par session
  // (jusqu'à ce que l'utilisateur ferme son onglet/navigateur).
  // Au retour depuis le menu ou les pages légales, l'intro sera skippée.

  if (intro) {
    const introAlreadySeen = sessionStorage.getItem('blublu_intro_seen');

    if (introAlreadySeen) {
      // L'utilisateur a déjà vu l'intro dans cette session : on la cache immédiatement
      intro.style.display = 'none';
      if (site) site.classList.add('revealed');
      // Pas de blocage du scroll puisque l'intro ne s'affiche pas
    } else {
      // Première visite : on affiche l'intro normalement
      document.body.style.overflow = 'hidden';

      // On marque l'intro comme vue dès qu'on clique sur "Franchir le seuil" ou "Passer l'intro"
      const markIntroSeen = () => sessionStorage.setItem('blublu_intro_seen', '1');

      if (enterBtn) enterBtn.addEventListener('click', () => {
        markIntroSeen();
        enterSite();
      });
      if (skipIntro) skipIntro.addEventListener('click', () => {
        markIntroSeen();
        skipIntroAnimation();
      });

      // Auto-skip si l'utilisateur préfère réduire les animations
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        markIntroSeen();
        skipIntroAnimation();
      }
    }
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
