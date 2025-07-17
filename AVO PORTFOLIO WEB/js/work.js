window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

function revealOnScroll(selector, visibleClass = 'visible') {
  const elements = document.querySelectorAll(selector);
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

revealOnScroll('.project-row');
revealOnScroll('.footer');
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
});
// Close nav on link click (mobile UX, event delegation)
document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-links a')) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  }
}); 