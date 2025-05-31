// ui.js
// UI rendering and notification functions

import { products } from './products.js';
import { getCart, calculateTotal } from './cart.js';

// Format price to BRL
export function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) {
        console.error('Invalid price value:', price);
        return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Render products grid
export function renderProductsGrid(onAddToCart) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    if (!Array.isArray(products) || products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">Nenhum produto disponível no momento.</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <div class="product-info-bottom">
                    <button class="btn add-to-cart-btn" data-id="${product.id}">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to buttons
    productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            if (!isNaN(id)) {
                onAddToCart(id);
            }
        });
    });
}

// Update cart counter
export function updateCartCounter() {
    const cart = getCart();
    const counters = document.querySelectorAll('.cart-counter');
    if (!counters.length) return;

    const totalItems = cart.reduce((total, item) => {
        if (item && typeof item.quantity === 'number') {
            return total + item.quantity;
        }
        return total;
    }, 0);
    
    counters.forEach(counter => {
        counter.textContent = totalItems;
        counter.classList.toggle('active', totalItems > 0);
    });
}

// Show notification
export function showNotification(message, type = 'info') {
    if (!message) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Remove any existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    document.body.appendChild(notification);
    
    // Add animation class
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Render cart UI
export function renderCartUI(onUpdateQuantity, onRemoveFromCart) {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    const cart = getCart();
    const total = calculateTotal();

    if (!Array.isArray(cart) || cart.length === 0) {
        cartContainer.innerHTML = ''; // Clear the container instead of adding a message
        updateEmptyCartMessage(); // This will show the proper empty cart message
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="price">${formatPrice(item.price)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="decrease-qty" data-id="${item.id}" data-qty="${item.quantity - 1}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-qty" data-id="${item.id}" data-qty="${item.quantity + 1}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remover</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to buttons
    cartContainer.querySelectorAll('.decrease-qty, .increase-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            const qty = Number(btn.getAttribute('data-qty'));
            if (!isNaN(id) && !isNaN(qty)) {
                onUpdateQuantity(id, qty);
            }
        });
    });

    cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            if (!isNaN(id)) {
                onRemoveFromCart(id);
            }
        });
    });

    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: ${formatPrice(total)}`;
    }
}

// Show or hide empty cart message
export function updateEmptyCartMessage() {
    const cart = getCart();
    const emptyMessage = document.querySelector('.empty-cart-message');
    const cartContainer = document.querySelector('.cart-container');
    
    if (!emptyMessage || !cartContainer) return;
    
    const isEmpty = !Array.isArray(cart) || cart.length === 0;
    emptyMessage.style.display = isEmpty ? 'block' : 'none';
    cartContainer.style.display = isEmpty ? 'none' : 'block';
}

// Initialize all UI components
export function initUI(handleAddToCart, handleUpdateQuantity, handleRemoveFromCart) {
    if (typeof handleAddToCart !== 'function' || 
        typeof handleUpdateQuantity !== 'function' || 
        typeof handleRemoveFromCart !== 'function') {
        console.error('Invalid handler functions provided to initUI');
        return;
    }

    renderProductsGrid(handleAddToCart);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
} 