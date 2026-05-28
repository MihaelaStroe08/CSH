// ==========================
// SCRIPT SITE COLEGIUL SPIRU HARET
// ==========================

// 1. MEGA MENU la click (desktop + mobile)
document.querySelectorAll('.projects-parent > a, .submenu-parent > a, nav ul li > a[href="#"]').forEach(menu => {
    menu.addEventListener('click', e => {
        e.preventDefault(); // prevenim scroll-ul la #

        const parentLi = menu.parentElement;
        const submenu = parentLi.querySelector('ul.submenu-right');

        if (submenu) {
            submenu.classList.toggle('open'); // toggle vizibilitate
        }
    });
});

// 2. Închidere meniuri când dai click în afara
document.addEventListener('click', e => {
    const isClickInside = e.target.closest('nav');
    if (!isClickInside) {
        document.querySelectorAll('.projects-menu, .submenu-right, nav ul li ul').forEach(sub => {
            sub.classList.remove('open');
        });
    }
});

// 3. Scroll smooth pentru linkuri interne
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 4. BACK TO TOP BUTTON
const backToTop = document.createElement('div');
backToTop.id = 'back-to-top';
backToTop.textContent = '↑';
document.body.appendChild(backToTop);
Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: '#0d47a1',
    color: '#fff',
    fontSize: '24px',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'none',
    zIndex: '9999',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
});

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cookie Banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');
if (cookieBanner && acceptBtn) {
    cookieBanner.style.display = 'flex';
    acceptBtn.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
    });
}

// SCRIPT PAGINATION
const totalPages = 100;
let currentPage = 1;

// HASH: pagină + anunț
if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('-anunt-');
    const hashPage = parseInt(parts[0]);
    if (!isNaN(hashPage) && hashPage >= 1 && hashPage <= totalPages) {
        currentPage = hashPage;
    }
    if (parts[1]) {
        window.addEventListener('load', () => {
            const anuntElem = document.getElementById(`anunt-${parts[0]}-${parts[1]}`);
            if (anuntElem) anuntElem.scrollIntoView({ behavior: "smooth" });
        });
    }
}

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
        btn.addEventListener('click', () => {
            currentPage = i;
            history.replaceState(null, '', `#${currentPage}`);
            renderPagination();
            renderAnunturi();
        });
        pageNumbersContainer.appendChild(btn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    currentPage--;
    history.replaceState(null, '', `#${currentPage}`);
    renderPagination();
    renderAnunturi();
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    history.replaceState(null, '', `#${currentPage}`);
    renderPagination();
    renderAnunturi();
});

function renderAnunturi() {
    const list = document.querySelector('.anunturi-list');
    const anunturi = list.querySelectorAll('.anunt');
    anunturi.forEach(a => {
        a.style.display = parseInt(a.dataset.page) === currentPage ? 'block' : 'none';
    });
}

// inițial
renderPagination();
renderAnunturi();
window.addEventListener('resize', renderPagination);

 


 

