// ===========================
// SCRIPT SITE COLEGIUL SPIRU HARET
// ===========================

// 1️⃣ MEGA MENU la click (desktop + mobile)
document.querySelectorAll('.projects-parent > a, .submenu-parent > a, nav ul li > a[href="#"]').forEach(menu => {
  menu.addEventListener('click', e => {
    e.preventDefault(); // prevenim scroll-ul la #
    const parentLi = menu.parentElement;
    const submenu = parentLi.querySelector('ul, .submenu-right');

    if (submenu) {
      submenu.classList.toggle('open'); // toggle vizibilitate
    }
  });
});

// 2️⃣ Inchidere meniuri cand dai click in afara
document.addEventListener('click', e => {
  const isClickInside = e.target.closest('nav');
  if (!isClickInside) {
    document.querySelectorAll('.projects-menu, .submenu-right, nav ul li ul').forEach(sub => {
      sub.classList.remove('open');
    });
  }
});

// 3️⃣ Scroll smooth pentru linkuri interne (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4️⃣ BACK TO TOP BUTTON
// Crează elementul în JS
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.textContent = '↑';
document.body.appendChild(backToTop);

// Stilizare via JS (poți muta în CSS)
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.background = '#0d47a1';
backToTop.style.color = '#fff';
backToTop.style.fontSize = '24px';
backToTop.style.padding = '10px 15px';
backToTop.style.borderRadius = '50%';
backToTop.style.cursor = 'pointer';
backToTop.style.display = 'none';
backToTop.style.zIndex = '9999';
backToTop.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

// Show/Hide back-to-top
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

// Click back-to-top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cookie Banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

// Verificăm dacă utilizatorul a acceptat deja
if(localStorage.getItem('cookiesAccepted')) {
  cookieBanner.style.display = 'none';
} else {
  cookieBanner.style.display = 'flex';
}

// Când utilizatorul apasă Accept
acceptBtn.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});
