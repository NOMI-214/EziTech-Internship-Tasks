const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}
const links = document.querySelectorAll('.nav-links a');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        try {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight; 
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 600; 
          let start = null;
          
          function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          }
          
          function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
          }
          
          requestAnimationFrame(animation);
        } catch (error) {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        setTimeout(() => {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            window.scrollTo(0, targetPosition);
          }
        }, 100);
      }
      navLinks.classList.remove('open');
    }
  });
}
function animateOnScroll() {
  const animatedEls = document.querySelectorAll('.animate__animated');
  const windowHeight = window.innerHeight;
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('animate__fadeInUp');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialsDots = document.querySelector('.testimonials-dots');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let testimonialsPerView = 3;
let testimonialsIndex = 0;

function updateTestimonialsPerView() {
  testimonialsPerView = window.innerWidth < 800 ? 1 : 3;
}

function renderTestimonialsDots() {
  testimonialsDots.innerHTML = '';
  const total = Math.ceil(testimonialCards.length / testimonialsPerView);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'testimonials-dot' + (i === testimonialsIndex ? ' active' : '');
    dot.addEventListener('click', () => {
      testimonialsIndex = i;
      updateTestimonialsSlider();
    });
    testimonialsDots.appendChild(dot);
  }
}

function updateTestimonialsSlider() {
  const cardWidth = testimonialCards[0].offsetWidth + 16; // 16px gap
  testimonialsTrack.style.transform = `translateX(-${testimonialsIndex * cardWidth * testimonialsPerView}px)`;
  Array.from(testimonialsDots.children).forEach((dot, i) => {
    dot.classList.toggle('active', i === testimonialsIndex);
  });
}

function handleResizeTestimonials() {
  updateTestimonialsPerView();
  testimonialsIndex = 0;
  renderTestimonialsDots();
  updateTestimonialsSlider();
}

window.addEventListener('resize', handleResizeTestimonials);
window.addEventListener('load', () => {
  updateTestimonialsPerView();
  renderTestimonialsDots();
  updateTestimonialsSlider();
});

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;
let counterAnimated = [false, false];

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'fade-out');
    if (i === idx) {
      slide.classList.add('active');
    } else if (i === currentSlide) {
      slide.classList.add('fade-out');
    }
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  animateCounter(idx);
  currentSlide = idx;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 4000); // Reduced from 5000ms to 4000ms for faster transitions
}
function stopSlider() {
  clearInterval(slideInterval);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopSlider();
    showSlide(i);
    startSlider();
  });
});

function animateCounter(idx) {
  if (counterAnimated[idx]) return;
  const counter = slides[idx].querySelector('.counter');
  const from = parseInt(counter.getAttribute('data-from'));
  const to = parseInt(counter.getAttribute('data-to'));
  const suffix = counter.getAttribute('data-suffix') || '';
  let start = null;
  const duration = 800;
    function step(ts) {
    if (!start) start = ts;
    let progress = Math.min((ts - start) / duration, 1);
    let value = Math.floor(from + (to - from) * progress);
    counter.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = to + suffix;
    }
  }
  requestAnimationFrame(step);
  counterAnimated[idx] = true;
}

const modal = document.getElementById('videoModal');
const openBtns = [
  document.getElementById('openVideoModal'),
  document.getElementById('openVideoModal2')
];
const closeModal = modal.querySelector('.close-modal');
const video = document.getElementById('heroVideo');

openBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      modal.classList.add('open');
      video.currentTime = 0;
      video.play();
    });
  }
});
closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
  video.pause();
  video.currentTime = 0;
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
    video.pause();
    video.currentTime = 0;
  }
});
showSlide(0);
startSlider();
animateCounter(0);
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  const scrollPosition = window.scrollY + 150; 
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });
  if (!current && scrollPosition < 200) {
    current = 'hero';
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

document.addEventListener('DOMContentLoaded', function () {
  const selectors = [
    '.fade-in-up', '.slide-up', '.animate-fade-in-down', '.feature-animate', '.service-animate', '.blog-card', '.project-row', '.team-card', '.about-main-img', '.testimonial-card', '.footer-section', '.section-title', '.about-feature-card', '.about-service-card', '.about-main-title', '.about-main-desc', '.about-main-btn', '.about-main-img', '.about-team-grid', '.about-team-section', '.about-cta-section', '.about-cta-content', '.breadcrumb', '.about-hero-title', '.work-hero-title', '.blog-title', '.contact-title', '.contact-form', '.footer-grid', '.footer-logo-col', '.footer-col', '.footer-social', '.footer-bottom'
  ];
  const animatedEls = document.querySelectorAll(selectors.join(','));
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));
});
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-headline, .hero-desc, .hero-btn').forEach(el => {
      el.style.opacity = '1';
      el.style.animation = 'none';
    });
  }, 900);
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth < 992) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
function testContactScroll() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    console.log('Testing contact scroll...');
    console.log('Contact section position:', contactSection.offsetTop);
    console.log('Contact section height:', contactSection.offsetHeight);
    console.log('Current scroll position:', window.pageYOffset);
    window.scrollTo(0, 0);
    setTimeout(() => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = contactSection.offsetTop - navbarHeight;
      window.scrollTo(0, targetPosition);
      console.log('Scrolled to contact section at position:', targetPosition);
    }, 500);
  } else {
    console.error('Contact section not found!');
  }
} 