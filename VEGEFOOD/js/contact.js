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
// === CONTACT FORM VALIDATION ===
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector(
      'input[placeholder="Your Name"]'
    ).value.trim();
    const email = this.querySelector(
      'input[placeholder="Your Email"]'
    ).value.trim();
    const subject = this.querySelector(
      'input[placeholder="Subject"]'
    ).value.trim();
    const message = this.querySelector(
      'textarea[placeholder="Message"]'
    ).value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields!");
      return;
    }

    // Here you can send the form via AJAX or EmailJS if needed
    alert("Message sent successfully!");
    this.reset();
  });
}

// === GOOGLE MAP (MARDAN, PAKISTAN) ===
function initMap() {
  const mardan = { lat: 34.1989, lng: 72.0408 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: mardan,
  });

  const marker = new google.maps.Marker({
    position: mardan,
    map: map,
    title: "Mardan, Pakistan",
  });
}

// === SCROLL TO TOP ===
const scrollToTopBtn = document.getElementById("scrollToTop");
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// === FOOTER YEAR UPDATE ===
const footerYear = document.querySelector(".footer-bottom p");
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = `© ${currentYear} Vegefoods. All rights reserved.`;
}
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Google Maps
  initMap();
});
