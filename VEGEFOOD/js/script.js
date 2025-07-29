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
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
let currentSlide = 0;
let heroInterval = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function goToSlide(idx) {
  currentSlide = idx;
  showSlide(currentSlide);
  restartHeroInterval();
}
function restartHeroInterval() {
  if (heroInterval) clearInterval(heroInterval);
  heroInterval = setInterval(nextSlide, 2000);
}
function initHeroSlider() {
  if (slides.length > 0) {
    showSlide(currentSlide);
    restartHeroInterval();
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        goToSlide(idx);
      });
    });
  }
}
initHeroSlider();
function startDealCountdown() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  endDate.setHours(23, 59, 59, 999);
  function updateTimer() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
      document.querySelector(".deal-timer").innerHTML =
        "<span>Deal ended!</span>";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.querySelector(".timer-days").textContent = String(days).padStart(
      2,
      "0"
    );
    document.querySelector(".timer-hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.querySelector(".timer-minutes").textContent = String(
      minutes
    ).padStart(2, "0");
    document.querySelector(".timer-seconds").textContent = String(
      seconds
    ).padStart(2, "0");
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}
if (document.querySelector(".deal-timer")) {
  startDealCountdown();
}
const testimonialSwiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: false,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
var form = document.querySelector(".newsletter-form");
var input = document.querySelector(".newsletter-input");
var message = document.querySelector(".newsletter-message");
if (form && input) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value.trim() !== "") {
      if (message) {
        message.textContent = "Thank you for subscribing!";
      } else {
        var msg = document.createElement("div");
        msg.className = "newsletter-message";
        msg.textContent = "Thank you for subscribing!";
        form.parentNode.appendChild(msg);
      }
      input.value = "";
    }
  });
}
