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
// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

cookieBanner.style.display = 'flex';

acceptBtn.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
});

// SCRIPT PAGINATION

const totalPages = 100;
let currentPage = 1;

// ==== HASH: pagină + anunț ====
// ex: #11-anunt-2
if (window.location.hash) {
  const hash = window.location.hash.replace('#', '');
  const parts = hash.split('-anunt-'); // separăm pagina de anunț

  const hashPage = parseInt(parts[0]);
  if (!isNaN(hashPage) && hashPage >= 1 && hashPage <= totalPages) {
    currentPage = hashPage; // setează pagina din hash
  }

  // dacă există și anunț specific
  if (parts[1]) {
    window.addEventListener('load', () => {
      const anuntElem = document.getElementById(`anunt-${parts[0]}-${parts[1]}`);
      if (anuntElem) anuntElem.scrollIntoView({ behavior: "smooth" });
    });
  }
}
// =================================

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumbersContainer = document.querySelector('.page-numbers');

function getMaxVisible() {
  return window.innerWidth <= 600 ? 3 : 10; // mobil: 3 pagini, desktop: 10
}

function renderPagination() {
  const maxVisible = getMaxVisible();
  pageNumbersContainer.innerHTML = '';

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement('button');
    btn.classList.add('page-btn');
    if (i === currentPage) btn.classList.add('active');
    btn.innerText = i;
    btn.onclick = () => {
      currentPage = i;

      // actualizează hash-ul cu pagina curentă
      window.location.hash = currentPage;

      renderPagination();
      renderAnunturi();
    };
    pageNumbersContainer.appendChild(btn);
  }

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Prev / Next
prevBtn.onclick = () => { 
  currentPage--; 
  window.location.hash = currentPage;
  renderPagination(); 
  renderAnunturi(); 
};
nextBtn.onclick = () => { 
  currentPage++; 
  window.location.hash = currentPage;
  renderPagination(); 
  renderAnunturi(); 
};

// ==========================================
// FUNCȚIA DE AFIȘARE ANUNȚURI
// Adaugă id-uri unice pentru fiecare anunț, ex: "anunt-11-2" pentru pagina 11, anunțul 2
function renderAnunturi() {
  const list = document.querySelector('.anunturi-list');
  // ascunde tot ce este acolo
  const anunturi = list.querySelectorAll('.anunt');
  anunturi.forEach(a => {
    if (parseInt(a.dataset.page) === currentPage) {
      a.style.display = 'block';
    } else {
      a.style.display = 'none';
    }
  });
}

// inițial
renderPagination();
renderAnunturi();

// actualizează la resize


window.addEventListener('resize', renderPagination);

window.addEventListener('resize', renderPagination);




window.addEventListener('resize', renderPagination);

window.addEventListener('resize', renderPagination);
 

