// Blog page interactivity
document.addEventListener('DOMContentLoaded', function() {
  // =====================
  // Navbar Hamburger Toggle
  // =====================
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.nav-links');
  menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
  let cartCount = 0;

  // Simulated 'Add to Cart' click function
  function addToCart() {
    cartCount++;
    document.querySelector('.cart-count').textContent = `[${cartCount}]`;
  }

  // Example use: attach to buttons
  const allAddButtons = document.querySelectorAll('.add-to-cart-btn');
  allAddButtons.forEach(btn => {
    btn.addEventListener('click', addToCart);
  });

  // Optional: handle cart button click (e.g. open cart modal)
  document.getElementById('cart-btn').addEventListener('click', () => {
    alert('Opening cart... (you can replace this with your cart modal logic)');
  });

  // Dropdown (for mobile: open on click)
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
      dropdown.addEventListener('click', function(e) {
          if (window.innerWidth <= 896) {
              e.preventDefault();
              const menu = this.querySelector('.dropdown-menu');
              menu.classList.toggle('active');
          }
      });
  }
   // Navbar hamburger functionality
const navbar = document.getElementById('navbar');
if (menuBtn && navLinks && navbar) {
  menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
  });
  // Close menu on link click (mobile only)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  });
}
});
document.addEventListener('DOMContentLoaded', function() {
  // Sidebar Search Form
  const searchForm = document.querySelector('.search-widget form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const val = this.querySelector('input[type="text"]').value.trim();
      if (val) {
        alert('Searching for: ' + val);
      } else {
        alert('Please enter a search term.');
      }
    });
  }

  // Sidebar Categories/Tags Click Effect
  document.querySelectorAll('.categories-widget li, .tag-cloud a').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      el.classList.add('clicked');
      setTimeout(() => el.classList.remove('clicked'), 300);
    });
  });

  // Smooth scroll to top on 'Read more' click (demo)
  document.querySelectorAll('.blog-read-more').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Fade-in on scroll for blog posts and widgets
  const fadeEls = document.querySelectorAll('.blog-post, .sidebar-widget');
  const fadeInOnScroll = () => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('fade-in');
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();
});

// Extra CSS for click effect and fade-in
const style = document.createElement('style');
style.textContent = `
  .clicked {
    background: #e8f5e9 !important;
    color: #8bc34a !important;
    transition: background 0.3s, color 0.3s;
  }
  .fade-in {
    opacity: 1 !important;
    transform: none !important;
    transition: opacity 0.7s, transform 0.7s;
  }
  .blog-post, .sidebar-widget {
    opacity: 0;
    transform: translateY(30px);
  }
`;
document.head.appendChild(style); 