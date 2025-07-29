
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
  // Quantity increment/decrement
  const qtyInput = document.querySelector('.single-product-qty');
  const minusBtn = document.querySelector('.qty-minus');
  const plusBtn = document.querySelector('.qty-plus');
  if (qtyInput && minusBtn && plusBtn) {
    minusBtn.addEventListener('click', function() {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
    plusBtn.addEventListener('click', function() {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });
    qtyInput.addEventListener('input', function() {
      if (qtyInput.value < 1) qtyInput.value = 1;
    });
  }

  // Add to cart button
  const addToCartBtn = document.querySelector('.single-add-to-cart');
  const cartCountEl = document.querySelector('.cart-count');
  if (addToCartBtn && cartCountEl && qtyInput) {
    addToCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      let count = 0;
      const match = cartCountEl.textContent.match(/\[(\d+)\]/);
      count = match ? parseInt(match[1], 10) : 0;
      count += parseInt(qtyInput.value, 10) || 1;
      cartCountEl.textContent = `[${count}]`;
      addToCartBtn.classList.add('added');
      setTimeout(() => addToCartBtn.classList.remove('added'), 600);
    });
  }

  // Related product action buttons feedback
  document.querySelectorAll('.related-action').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 400);
    });
  });

  // Newsletter form demo
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }

  // Extra CSS for feedback
  const style = document.createElement('style');
  style.textContent = `
    .single-add-to-cart.added {
      background: #388e3c !important;
      color: #fff !important;
      transform: scale(1.12);
      box-shadow: 0 0 0 4px #c8e6c9;
      transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s;
    }
    .related-action.clicked {
      background: #8bc34a !important;
      color: #fff !important;
      transform: scale(1.18);
      box-shadow: 0 0 0 4px #c8e6c9;
      transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s;
    }
  `;
  document.head.appendChild(style);
});
// Touch detection for mobile/tablet to enable product actions
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('touch');
} 