import { validateForm } from './validation.js';

export function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const iconBars = menuToggle ? menuToggle.querySelector('.fa-bars') : null;
    const iconX = menuToggle ? menuToggle.querySelector('.fa-xmark') : null;
    
    if (!menuToggle || !navList) return;

    function updateIcons() {
        if (menuToggle.classList.contains('active')) {
            if (iconBars) iconBars.style.display = 'none';
            if (iconX) iconX.style.display = 'inline';
        } else {
            if (iconBars) iconBars.style.display = 'inline';
            if (iconX) iconX.style.display = 'none';
        }
    }

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        updateIcons();
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            updateIcons();
        }
    });
    updateIcons();
}

export function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
}

export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

export function initButtonHover() {
    const buttons = document.querySelectorAll('.btn:not(.add-to-cart-btn)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}
