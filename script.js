// ENTRAR - Transição da intro para o site principal
function enterSite() {
    const intro = document.getElementById('page-intro');
    const main = document.getElementById('page-main');
    intro.classList.add('hidden');
    setTimeout(() => {
        intro.style.display = 'none';
        main.classList.add('visible');
        observeFade();
    }, 1000);
}

// FOTOS - Criação dinâmica dos slots
const photoLabels = ['Nosso primeiro encontro','Momentos felizes','Nosso lugar especial','Sorrindo juntos','Uma lembrança linda','Você e eu'];
const grid = document.getElementById('photosGrid');

photoLabels.forEach((label, i) => {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    slot.innerHTML = `
        <div class="photo-placeholder">
            <div class="icon2">✦</div>
            <span>Adicionar foto</span>
        </div>
        <img id="img${i}" alt="${label}">
        <div class="photo-caption" id="cap${i}">
            <input type="text" placeholder="${label}" value="${label}">
        </div>
        <input type="file" id="file${i}" accept="image/*" onchange="loadPhoto(event,${i})" style="display:none">
    `;
    slot.onclick = () => document.getElementById(`file${i}`).click();
    grid.appendChild(slot);
});

function loadPhoto(e, i) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = document.getElementById(`img${i}`);
    img.src = url;
    img.classList.add('loaded');
    document.getElementById(`cap${i}`).classList.add('visible');
    img.closest('.photo-slot').querySelector('.photo-placeholder').style.display = 'none';
}

// CONTADOR DE DIAS
function updateCounter() {
    const val = document.getElementById('dateInput').value;
    if (!val) return;
    const start = new Date(val);
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    animateCount(diff);
}

function animateCount(target) {
    let current = 0;
    const el = document.getElementById('daysCount');
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('pt-BR');
        if (current >= target) clearInterval(timer);
    }, 20);
}

// NAV SCROLL
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// FADE IN ON SCROLL
function observeFade() {
    const els = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});