const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a, .hero-btns a, .nav-logo');

function navigateToSection(targetId) {
  if (!targetId || targetId === '#') {
    targetId = '#hero';
  }

  const matchedSection = document.querySelector(targetId);
  if (!matchedSection) return;

  sections.forEach(section => {
    if ('#' + section.id === targetId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashChange() {
  navigateToSection(window.location.hash || '#hero');
}

function getCleanHomeUrl() {
  return window.location.pathname + window.location.search;
}

document.body.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (!target) return;

  const href = target.getAttribute('href');

  if (target.classList.contains('nav-logo')) {
    e.preventDefault();
    history.pushState(null, '', getCleanHomeUrl());
    navigateToSection('#hero');
    return;
  }

  if (href && href.startsWith('#')) {
    e.preventDefault();
    history.pushState(null, '', href);
    navigateToSection(href);
  }
});

window.addEventListener('popstate', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);