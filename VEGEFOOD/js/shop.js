document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navLinks && navbar) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
      navbar.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 56.25 * 16) {
          navLinks.classList.remove("active");
          menuBtn.classList.remove("active");
          navbar.classList.remove("active");
        }
      });
    });
  }
  const pageButtons = document.querySelectorAll(".shop-page");
  const productsPerPage = 12;

  function showPage(page) {
    pageButtons.forEach((btn, idx) => {
      if (idx + 1 === page) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  }

  pageButtons.forEach((btn, idx) => {
    btn.addEventListener("click", function () {
      showPage(idx + 1);
    });
  });

  showPage(1);

  document.querySelectorAll(".product-action").forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 400);
    });
  });
});
