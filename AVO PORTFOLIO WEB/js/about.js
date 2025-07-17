document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.about-hero-section');
  if (hero) {
    hero.classList.add('page-enter');
    setTimeout(() => {
      hero.classList.remove('page-enter');
    }, 1200);
  }
  function revealServices() {
    const cards = document.querySelectorAll('.service-animate');
    const trigger = window.innerHeight * 0.92;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  }
  window.addEventListener('scroll', revealServices);
  revealServices(); 
  function revealAboutImg() {
    const aboutImgWrap = document.querySelector('.about-img-animate');
    if (!aboutImgWrap) return;
    const img = aboutImgWrap.querySelector('.about-main-img');
    if (!img) return;
    const trigger = window.innerHeight * 0.92;
    const rect = aboutImgWrap.getBoundingClientRect();
    if (rect.top < trigger) {
      img.classList.add('visible');
    }
  }
  window.addEventListener('scroll', revealAboutImg);
  revealAboutImg();
  function revealFeatures() {
    const features = document.querySelectorAll('.feature-animate');
    const trigger = window.innerHeight * 0.92;
    features.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  }
  window.addEventListener('scroll', revealFeatures);
  revealFeatures();
  function revealTeam() {
    const teamCards = document.querySelectorAll('.team-animate');
    const trigger = window.innerHeight * 0.92;
    teamCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger) {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }
    });
  }
  window.addEventListener('scroll', revealTeam);
  revealTeam();

  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-links a')) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  }
}); 
(function() {
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  const cardsPerSlide = 3;
  let currentIndex = 0;

  function getVisibleCardCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) return 1;
    if (screenWidth < 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCardCount();
    const slideWidth = document.querySelector('.testimonial-card').offsetWidth;
    let shift = 0;
    if (visibleCount === 3) {
      shift = currentIndex * cardsPerSlide * slideWidth;
    } else if (visibleCount === 2) {
      shift = currentIndex * 2 * slideWidth;
    } else {
      shift = currentIndex * 1 * slideWidth;
    }
    track.style.transform = `translateX(-${shift}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  window.addEventListener('resize', updateCarousel);
  window.addEventListener('load', updateCarousel);
  updateCarousel();
})(); 

function animateTestimonials() {
  const section = document.querySelector('.testimonial-section');
  const title = document.querySelector('.testimonial-title');
  const cards = document.querySelectorAll('.testimonial-card');
  if (!section) return;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
      if (title) title.classList.add('animated');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('animated'), 120 + i * 120);
      });
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}

document.addEventListener('DOMContentLoaded', animateTestimonials); 