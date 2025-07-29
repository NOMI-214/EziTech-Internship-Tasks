// Checkout page interactivity
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
  // Billing form validation (HTML5 handles most, but add custom feedback)
  const billingForm = document.querySelector('.billing-form');
  if (billingForm) {
    billingForm.addEventListener('submit', function(e) {
      if (!billingForm.checkValidity()) {
        e.preventDefault();
        billingForm.classList.add('invalid');
      }
    });
    billingForm.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', function() {
        billingForm.classList.remove('invalid');
      });
    });
  }

  // Payment method selection (highlight selected)
  const paymentBox = document.querySelector('.payment-method-box');
  if (paymentBox) {
    paymentBox.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', function() {
        paymentBox.querySelectorAll('label').forEach(label => label.classList.remove('selected'));
        radio.parentElement.classList.add('selected');
      });
    });
  }

  // Place order button feedback
  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn && paymentBox) {
    paymentBox.addEventListener('submit', function(e) {
      e.preventDefault();
      // Check terms
      const terms = paymentBox.querySelector('input[name="terms"]');
      if (!terms.checked) {
        alert('You must accept the terms and conditions.');
        return;
      }
      // Check payment method
      const payment = paymentBox.querySelector('input[name="payment"]:checked');
      if (!payment) {
        alert('Please select a payment method.');
        return;
      }
      placeOrderBtn.classList.add('placed');
      placeOrderBtn.textContent = 'Order Placed!';
      setTimeout(() => {
        placeOrderBtn.classList.remove('placed');
        placeOrderBtn.textContent = 'Place an order';
      }, 1800);
    });
  }

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
    .payment-method-box label.selected {
      color: #8bc34a !important;
      font-weight: 600;
    }
    .place-order-btn.placed {
      background: #388e3c !important;
      color: #fff !important;
      transform: scale(1.12);
      box-shadow: 0 0 0 4px #c8e6c9;
      transition: background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s;
    }
    .billing-form.invalid input:invalid, .billing-form.invalid select:invalid {
      border-color: #e74c3c !important;
    }
  `;
  document.head.appendChild(style);
}); 