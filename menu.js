// Active tab tracking on menu page
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.menu-tabs a');
  const sections = Array.from(tabs).map(tab => {
    const id = tab.getAttribute('href').substring(1);
    return document.getElementById(id);
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(t => {
          t.classList.toggle('active', t.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => s && observer.observe(s));

  // Smooth scroll avec offset adapté pour la nav sticky
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(tab.getAttribute('href'));
      if (target) {
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
});
