console.log(`                                    
Волейбольний клуб SpikePoint вітає вас!
`);
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-btn');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav a');

    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', function() {
            burgerBtn.classList.toggle('active');
            nav.classList.toggle('open');
        });
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('active');
                nav.classList.remove('open');
            });
        });
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
});
document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    function updateLogo(isLight) {
        const logos = document.querySelectorAll('img[src*="logo.svg"], img[src*="logo-dark.svg"]');
        logos.forEach(logo => {
            if (logo.closest('footer')) return;
            
            if (isLight) {
                logo.src = logo.src.replace('logo.svg', 'logo-dark.svg');
            } else {
                logo.src = logo.src.replace('logo-dark.svg', 'logo.svg');
            }
        });
    }

    const savedTheme = localStorage.getItem('spikepoint_theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (themeBtn) themeBtn.textContent = '🌙';
        updateLogo(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            updateLogo(isLight);
            
            if (isLight) {
                localStorage.setItem('spikepoint_theme', 'light');
                themeBtn.textContent = '🌙';
                if(window.showToast) window.showToast('Світла тема увімкнена ', 'info');
            } else {
                localStorage.setItem('spikepoint_theme', 'dark');
                themeBtn.textContent = '☀️';
                if(window.showToast) window.showToast('Темна тема увімкнена ', 'info');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        

        toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    };

    if (!sessionStorage.getItem('spikepoint_welcomed')) {
        setTimeout(() => {
            window.showToast('Ласкаво просимо до клубу SpikePoint!', 'success');
            sessionStorage.setItem('spikepoint_welcomed', 'true');
        }, 1000);
    }
});