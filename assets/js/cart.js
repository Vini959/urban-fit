let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const getCart = () => {
    return [...cart];
};

export const addToCart = (product) => {
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
};

export const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
};

export const updateQuantity = (productId, quantity) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, Math.floor(quantity));
        saveCart();
    }
};

export const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const setCart = (newCart) => {
    cart = newCart;
    saveCart();
};

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}; 