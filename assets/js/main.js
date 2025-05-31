// Main JavaScript functionality

import { products, getProductById } from './products.js';
import {
    addToCart,
    removeFromCart,
    updateQuantity
} from './cart.js';
import {
    renderProductsGrid,
    updateCartCounter,
    showNotification,
    renderCartUI,
    updateEmptyCartMessage,
    initUI
} from './ui.js';

// Add product to cart and update UI
export const handleAddToCart = (productId) => {
    if (typeof productId !== 'number' || isNaN(productId)) {
        console.error('Invalid product ID');
        return;
    }

    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found');
        showNotification('Produto não encontrado!', 'error');
        return;
    }

    addToCart(product);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
    showNotification('Produto adicionado ao carrinho!', 'success');
};

// Remove product from cart and update UI
export const handleRemoveFromCart = (productId) => {
    if (typeof productId !== 'number' || isNaN(productId)) {
        console.error('Invalid product ID');
        return;
    }

    removeFromCart(productId);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
    showNotification('Produto removido do carrinho!', 'info');
};

// Update product quantity and update UI
export const handleUpdateQuantity = (productId, quantity) => {
    if (typeof productId !== 'number' || isNaN(productId) || 
        typeof quantity !== 'number' || isNaN(quantity)) {
        console.error('Invalid product ID or quantity');
        return;
    }

    updateQuantity(productId, quantity);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
};

// Initialize page
function initPage() {
    try {
        initUI(handleAddToCart, handleUpdateQuantity, handleRemoveFromCart);
    } catch (error) {
        console.error('Error initializing page:', error);
        showNotification('Erro ao carregar a página. Por favor, recarregue.', 'error');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
