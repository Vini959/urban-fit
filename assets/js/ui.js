import { products } from './products.js';
import { getCart, calculateTotal } from './cart.js';

export const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

export const renderProductsGrid = (onAddToCart) => {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    if (!products.length) {
        productsGrid.innerHTML = '<p class="no-products">Nenhum produto disponível no momento.</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-info-bottom">
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <button class="btn add-to-cart-btn" data-id="${product.id}">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            onAddToCart(id);
        });
    });
};

export const updateCartCounter = () => {
    const cart = getCart();
    const counters = document.querySelectorAll('.cart-counter');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    counters.forEach(counter => {
        counter.textContent = totalItems;
        counter.classList.toggle('active', totalItems > 0);
    });
};

export const showNotification = (message, type = 'info') => {
    if (!message) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.querySelectorAll('.notification').forEach(n => n.remove());
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

export const renderCartUI = (onUpdateQuantity, onRemoveFromCart) => {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    const cart = getCart();
    const total = calculateTotal();

    if (!cart.length) {
        cartContainer.innerHTML = '';
        updateEmptyCartMessage();
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

    cartContainer.querySelectorAll('.decrease-qty, .increase-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            const qty = Number(btn.getAttribute('data-qty'));
            onUpdateQuantity(id, qty);
        });
    });

    cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = Number(btn.getAttribute('data-id'));
            onRemoveFromCart(id);
        });
    });

    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = `Total: ${formatPrice(total)}`;
    }
};

export const updateEmptyCartMessage = () => {
    const cart = getCart();
    const emptyMessage = document.querySelector('.empty-cart-message');
    const cartContainer = document.querySelector('.cart-container');
    
    if (!emptyMessage || !cartContainer) return;
    
    const isEmpty = !cart.length;
    emptyMessage.style.display = isEmpty ? 'block' : 'none';
    cartContainer.style.display = isEmpty ? 'none' : 'block';
};

export const initUI = (handleAddToCart, handleUpdateQuantity, handleRemoveFromCart) => {
    renderProductsGrid(handleAddToCart);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
}; 