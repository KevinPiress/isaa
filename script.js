// ENTRAR NO SITE
function enterSite() {
    const intro = document.getElementById('page-intro');
    const main = document.getElementById('page-main');
    
    intro.classList.add('hidden');
    setTimeout(() => {
        intro.style.display = 'none';
        main.classList.add('visible');
        observeFade();
        updateCounter(); // Inicia o contador automaticamente
    }, 1000);
}

// CONTADOR DE DIAS
function updateCounter() {
    const val = document.getElementById('dateInput').value;
    if (!val) return;

    const start = new Date(val + 'T00:00:00');
    const now = new Date();
    
    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const targetDays = diffDays < 0 ? 0 : diffDays;
    
    animateCount(targetDays);
}

function animateCount(target) {
    const el = document.getElementById('daysCount');
    let current = 0;
    const duration = 2000; 
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    
    if (target === 0) {
        el.textContent = "0";
        return;
    }

    let frame = 0;
    const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        
        el.textContent = current.toLocaleString('pt-BR');
        
        if (frame === totalFrames) {
            el.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        }
    }, frameRate);
}

// EFEITO DE NAVBAR AO ROLAR
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// OBSERVAR ELEMENTOS PARA FADE-IN
function observeFade() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// SMOOTH SCROLL PARA LINKS
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});