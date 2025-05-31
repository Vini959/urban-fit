// cart.js
// Cart logic and utility functions

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Validate cart data structure
function validateCartItem(item) {
    return item && 
           typeof item.id === 'number' && 
           typeof item.name === 'string' && 
           typeof item.price === 'number' && 
           typeof item.quantity === 'number' &&
           item.quantity > 0;
}

export function getCart() {
    return [...cart]; // Return a copy to prevent direct modifications
}

export function addToCart(product) {
    if (!product || !product.id || !product.name || typeof product.price !== 'number') {
        console.error('Invalid product data');
        return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    saveCart();
}

export function removeFromCart(productId) {
    if (typeof productId !== 'number') {
        console.error('Invalid product ID');
        return;
    }
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

export function updateQuantity(productId, quantity) {
    if (typeof productId !== 'number' || typeof quantity !== 'number') {
        console.error('Invalid product ID or quantity');
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, Math.floor(quantity)); // Ensure positive integer
        saveCart();
    }
}

export function saveCart(newCart) {
    if (newCart !== undefined) {
        if (!Array.isArray(newCart)) {
            console.error('Invalid cart data');
            return;
        }
        // Validate all items in the new cart
        if (!newCart.every(validateCartItem)) {
            console.error('Invalid cart items');
            return;
        }
        cart = newCart;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateTotal() {
    return cart.reduce((total, item) => {
        if (!validateCartItem(item)) {
            console.error('Invalid cart item found:', item);
            return total;
        }
        return total + (item.price * item.quantity);
    }, 0);
}

export function setCart(newCart) {
    if (!Array.isArray(newCart)) {
        console.error('Invalid cart data');
        return;
    }
    // Validate all items in the new cart
    if (!newCart.every(validateCartItem)) {
        console.error('Invalid cart items');
        return;
    }
    cart = newCart;
    saveCart();
} 