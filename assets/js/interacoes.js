import { validateForm } from './validation.js';

export const initMenuToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const iconBars = menuToggle?.querySelector('.fa-bars');
    const iconX = menuToggle?.querySelector('.fa-xmark');
    
    if (!menuToggle || !navList) return;

    const updateIcons = () => {
        if (menuToggle.classList.contains('active')) {
            iconBars?.style.setProperty('display', 'none');
            iconX?.style.setProperty('display', 'inline');
        } else {
            iconBars?.style.setProperty('display', 'inline');
            iconX?.style.setProperty('display', 'none');
        }
    };

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
};

export const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
};

export const initSmoothScroll = () => {
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
};

export const initButtonHover = () => {
    const buttons = document.querySelectorAll('.btn:not(.add-to-cart-btn)');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
};
