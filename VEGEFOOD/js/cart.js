document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
  let cartCount = 0;
  function addToCart() {
    cartCount++;
    document.querySelector(".cart-count").textContent = `[${cartCount}]`;
  }
  const allAddButtons = document.querySelectorAll(".add-to-cart-btn");
  allAddButtons.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
  document.getElementById("cart-btn").addEventListener("click", () => {
    alert("Opening cart... (you can replace this with your cart modal logic)");
  });
  const dropdown = document.querySelector(".dropdown");
  if (dropdown) {
    dropdown.addEventListener("click", function (e) {
      if (window.innerWidth <= 896) {
        e.preventDefault();
        const menu = this.querySelector(".dropdown-menu");
        menu.classList.toggle("active");
      }
    });
  }
  const navbar = document.getElementById("navbar");
  if (menuBtn && navLinks && navbar) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
      navbar.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove("active");
          menuBtn.classList.remove("active");
          navbar.classList.remove("active");
        }
      });
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  function formatCurrency(val) {
    return "$" + Number(val).toFixed(2);
  }
  const cartCountEl = document.querySelector(".cart-count");
  function getCartItems() {
    return Array.from(document.querySelectorAll(".cart-item"));
  }

  function updateCartCount() {
    const count = getCartItems().reduce(
      (sum, row) => sum + Number(row.querySelector(".cart-qty").value),
      0
    );
    if (cartCountEl) cartCountEl.textContent = `[${count}]`;
  }

  function updateTotals() {
    let subtotal = 0;
    getCartItems().forEach((row) => {
      const price = parseFloat(
        row.querySelector(".cart-price").textContent.replace("$", "")
      );
      const qty = Number(row.querySelector(".cart-qty").value);
      const total = price * qty;
      row.querySelector(".cart-total").textContent = formatCurrency(total);
      subtotal += total;
    });
    document.querySelector(".subtotal-val").textContent =
      formatCurrency(subtotal);
    const discount = 3.0;
    document.querySelector(".discount-val").textContent =
      formatCurrency(discount);
    document.querySelector(".total-val").textContent = formatCurrency(
      subtotal - discount
    );
  }
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = btn.closest(".cart-item");
      row.classList.add("fade-out");
      setTimeout(() => {
        row.remove();
        updateCartCount();
        updateTotals();
      }, 350);
    });
  });

  document.querySelectorAll(".cart-qty").forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value < 1) input.value = 1;
      updateCartCount();
      updateTotals();
    });
  });

  const couponForm = document.querySelector(".cart-coupon-box");
  if (couponForm) {
    couponForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Coupon applied! (Demo)");
    });
  }

  const shippingForm = document.querySelector(".cart-shipping-box");
  if (shippingForm) {
    shippingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Shipping estimate calculated! (Demo)");
    });
  }

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing!");
      newsletterForm.reset();
    });
  }

  updateCartCount();
  updateTotals();
  const style = document.createElement("style");
  style.textContent = `
    .fade-out {
      opacity: 0 !important;
      transform: translateX(-40px) scale(0.95) !important;
      transition: opacity 0.35s, transform 0.35s;
    }
  `;
  document.head.appendChild(style);
});
