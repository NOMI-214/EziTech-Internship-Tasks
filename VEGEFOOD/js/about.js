// About page video modal logic

document.addEventListener('DOMContentLoaded', function() {
  // Modern video modal logic for new intro section
  const playBtn = document.getElementById('about-play-btn');
  const videoModal = document.getElementById('about-video-modal');
  const videoBackdrop = videoModal ? videoModal.querySelector('.about-video-backdrop') : null;
  const videoClose = videoModal ? videoModal.querySelector('.about-video-close') : null;
  const videoEl = videoModal ? videoModal.querySelector('video') : null;

  function openVideoModal() {
    if (videoModal) {
      videoModal.style.display = 'flex';
      videoModal.classList.add('fade-in');
      if (videoEl) videoEl.play();
      document.body.style.overflow = 'hidden';
    }
  }
  function closeVideoModal() {
    if (videoModal) {
      videoModal.style.display = 'none';
      videoModal.classList.remove('fade-in');
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
      document.body.style.overflow = '';
    }
  }
  if (playBtn && videoModal) {
    playBtn.addEventListener('click', openVideoModal);
  }
  if (videoBackdrop) {
    videoBackdrop.addEventListener('click', closeVideoModal);
  }
  if (videoClose) {
    videoClose.addEventListener('click', closeVideoModal);
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
      closeVideoModal();
    }
  });
  // Add fade-in animation for modal
  const style = document.createElement('style');
  style.textContent = `
    .about-video-modal.fade-in {
      animation: fadeInModal 0.4s cubic-bezier(.68,-0.55,.27,1.55);
    }
    @keyframes fadeInModal {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
});

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

// === Animated Stats Counter ===
function animateStats() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 40; // Lower is faster

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target').replace(/,/g, '');
      const count = +counter.innerText.replace(/[^\d]/g, '');
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = Math.min(count + increment, target).toLocaleString();
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
}

function statsInView() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return false;
  const rect = statsSection.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

let statsAnimated = false;
window.addEventListener('scroll', () => {
  if (!statsAnimated && statsInView()) {
    animateStats();
    statsAnimated = true;
  }
});
window.addEventListener('DOMContentLoaded', () => {
  if (statsInView()) {
    animateStats();
    statsAnimated = true;
  }
});