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

const handleAddToCart = (productId) => {
    const product = getProductById(productId);
    if (!product) {
        showNotification('Produto não encontrado!', 'error');
        return;
    }

    addToCart(product);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
    showNotification('Produto adicionado ao carrinho!', 'success');
};

const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
    showNotification('Produto removido do carrinho!', 'info');
};

const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
    renderCartUI(handleUpdateQuantity, handleRemoveFromCart);
    updateCartCounter();
    updateEmptyCartMessage();
};

const initPage = () => {
    try {
        initUI(handleAddToCart, handleUpdateQuantity, handleRemoveFromCart);
    } catch (error) {
        console.error('Error initializing page:', error);
        showNotification('Erro ao carregar a página. Por favor, recarregue.', 'error');
    }
};

document.addEventListener('DOMContentLoaded', initPage);

export { handleAddToCart, handleUpdateQuantity, handleRemoveFromCart };
