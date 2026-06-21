const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-links a, .hero-btns a, .nav-logo');

function navigateToSection(targetId) {
  if (!targetId || targetId === '#') {
    targetId = '#hero';
  }

  const matchedSection = document.querySelector(targetId);
  if (!matchedSection) return;
  
  // প্রতিটি সেকশনকে হাইড বা শো করা
  sections.forEach(section => {
    if ('#' + section.id === targetId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  // মেনুবারের একটিভ ক্লাস আপডেট করা
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // সেকশন বদলানোর পর পেজের একদম উপরে স্ক্রল করা
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashChange() {
  navigateToSection(window.location.hash || '#hero');
}

// ক্লিক ইভেন্ট লিসেনার সেটআপ করা
document.body.addEventListener('click', (e) => {
  const target = e.target.closest('a');
  if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    history.pushState(null, '', href);
    navigateToSection(href);
  }
});

window.addEventListener('popstate', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);