// User interactions and UI functionality

// Menu toggle functionality
const initMenuToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
};

// Form validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'Este campo é obrigatório');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Email inválido');
            isValid = false;
        } else {
            clearError(input);
        }
    });

    return isValid;
};

// Email validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Show error message
const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    
    error.className = 'error-message';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
};

// Clear error message
const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.classList.remove('error');
};

// Contact form submission
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
        }
    });
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
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

// Add hover effect to buttons
const initButtonHover = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
};

// Initialize all interactions
document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initContactForm();
    initSmoothScroll();
    initButtonHover();
});
