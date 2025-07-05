export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateForm = (form) => {
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
        const value = input.value.trim();
        
        if (!value) {
            showError(input, 'Este campo é obrigatório');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            showError(input, 'Email inválido');
            isValid = false;
        } else {
            clearError(input);
        }
    });

    return isValid;
};

export const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
};

export const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}; 