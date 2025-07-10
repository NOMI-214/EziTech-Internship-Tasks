// Navbar toggle for mobile
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scroll for nav links - SPEED UP
const links = document.querySelectorAll('.nav-links a');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Try custom smooth scroll first, fallback to native smooth scroll
        try {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight; // Dynamic navbar height
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 600; // Reduced from default ~1000ms to 600ms
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
          // Fallback to native smooth scroll
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        
        // Additional fallback: ensure scroll happens even if smooth scroll fails
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

// Scroll-triggered Animate.css activation
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

// Testimonial Carousel
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

// Hero Slider Logic
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
  const duration = 800; // Reduced from 1200ms to 800ms for faster animation
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

// Video Modal Logic
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

// Init
showSlide(0);
startSlider();
// Animate counter for first slide on load
animateCounter(0);

// Navbar sticky background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll Spy - Highlight active navigation based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  const scrollPosition = window.scrollY + 150; // Increased offset for better detection
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    // Check if current scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });
  
  // If no section is detected, check if we're at the top (hero section)
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

// Throttle scroll events for better performance
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

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Initialize active nav on page load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  
  // Test smooth scrolling functionality
  console.log('Smooth scrolling initialized');
  console.log('Contact section found:', document.getElementById('contact'));
  console.log('Navbar height:', document.querySelector('.navbar').offsetHeight);
  
  // Test contact link functionality
  const contactLink = document.querySelector('a[href="#contact"]');
  if (contactLink) {
    console.log('Contact link found:', contactLink);
  }
  
  // Test smooth scrolling to contact section
  function testContactScroll() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      console.log('Contact section position:', contactSection.offsetTop);
      console.log('Contact section height:', contactSection.offsetHeight);
      console.log('Page height:', document.documentElement.scrollHeight);
    }
  }
  
  testContactScroll();
});

// Test function for contact scrolling
function testContactScroll() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    console.log('Testing contact scroll...');
    console.log('Contact section position:', contactSection.offsetTop);
    console.log('Contact section height:', contactSection.offsetHeight);
    console.log('Current scroll position:', window.pageYOffset);
    
    // Scroll to top first, then to contact
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