document.addEventListener('DOMContentLoaded', function () {
  // =====================
  // Navbar Hamburger Toggle
  // =====================
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (menuBtn && navLinks && navbar) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
      navbar.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('active');
          menuBtn.classList.remove('active');
          navbar.classList.remove('active');
        }
      });
    });
    // Close menu on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
      }
    });
  } else {
    console.warn('Missing menu-btn, nav-links, or navbar element in DOM.');
  }

  // =====================
  // Wishlist & Cart Logic
  // =====================

  const cartCountEl = document.querySelector('.cart-count');

  // Format a number as currency
  function formatCurrency(val) {
    return '$' + Number(val).toFixed(2);
  }

  // Update cart count in navbar
  function updateCartCount(increment = 0) {
    let count = 0;
    if (cartCountEl) {
      const match = cartCountEl.textContent.match(/\[(\d+)\]/);
      count = match ? parseInt(match[1], 10) : 0;
      count += increment;
      cartCountEl.textContent = `[${count}]`;
    }
  }

  // Get all wishlist item rows
  function getWishlistItems() {
    return Array.from(document.querySelectorAll('.wishlist-item'));
  }

  // Update totals for each wishlist item
  function updateTotals() {
    getWishlistItems().forEach(row => {
      const priceEl = row.querySelector('.wishlist-price');
      const qtyInput = row.querySelector('.wishlist-qty');
      const totalEl = row.querySelector('.wishlist-total');

      if (priceEl && qtyInput && totalEl) {
        const price = parseFloat(priceEl.textContent.replace('$', '')) || 0;
        const qty = Number(qtyInput.value) || 1;
        const total = price * qty;
        totalEl.textContent = formatCurrency(total);
      }
    });
  }

  // Remove wishlist item
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const row = btn.closest('.wishlist-item');
      if (row) {
        row.classList.add('fade-out');
        setTimeout(() => {
          row.remove();
          updateTotals();
        }, 350);
      }
    });
  });

  // Quantity input listener
  document.querySelectorAll('.wishlist-qty').forEach(input => {
    input.addEventListener('input', function () {
      if (input.value < 1) input.value = 1;
      updateTotals();
    });
  });

  // Add to cart animation + update count
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      btn.classList.add('added');
      updateCartCount(1);
      setTimeout(() => btn.classList.remove('added'), 600);
    });
  });

  // Initial wishlist total update
  updateTotals();

  // =====================
  // Animation Styles
  // =====================
  const style = document.createElement('style');
  style.textContent = `
    .fade-out {
      opacity: 0 !important;
      transform: translateX(-40px) scale(0.95) !important;
      transition: opacity 0.35s, transform 0.35s;
    }

    .add-to-cart-btn.added {
      background: #388e3c !important;
      color: #fff !important;
      transform: scale(1.12);
      box-shadow: 0 0 0 4px #c8e6c9;
      transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s;
    }
  `;
  document.head.appendChild(style);
});
 