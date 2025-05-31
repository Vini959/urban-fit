// Main JavaScript functionality

// Sample products data
const products = [
    {
        id: 1,
        name: 'Camiseta Fitness Pro',
        description: 'Camiseta de alta performance para treinos intensos',
        price: 89.90,
        image: 'https://cdn.pixabay.com/photo/2025/05/20/10/57/t-shirt-9611374_1280.jpg'
    },
    {
        id: 2,
        name: 'Shorts Fitness Elite',
        description: 'Shorts confortável com tecnologia anti-odor',
        price: 69.90,
        image: 'https://media.istockphoto.com/id/698897772/pt/foto/unrecognizable-afro-american-man-in-park-stretching-legs.jpg?s=1024x1024&w=is&k=20&c=xsqTlRuUKVbFxfITBMej239jfmZQ5vcydPkvoVUVxrA='
    },
    {
        id: 3,
        name: 'Tênis Running Max',
        description: 'Tênis para corrida com amortecimento premium',
        price: 299.90,
        image: 'https://cdn.pixabay.com/photo/2018/04/22/10/16/sport-3340598_1280.jpg'
    },
    {
        id: 4,
        name: 'Legging Fitness Power',
        description: 'Legging de compressão para melhor performance',
        price: 119.90,
        image: 'https://www.fiturban.com.br/app/assets/images/dinamica/produto/2061/cor_0/lg405-01-calca-legging-glow-preta-140125-2341ab.jpg'
    },
    {
        id: 5,
        name: 'Garrafa Térmica Fitness',
        description: 'Garrafa térmica para manter sua bebida gelada durante o treino',
        price: 49.90,
        image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/bottle-1869592_1280.jpg'
    },
    {
        id: 6,
        name: 'Faixa Elástica de Exercício',
        description: 'Faixa elástica ideal para treinos de resistência e alongamento',
        price: 29.90,
        image: 'https://cdn.pixabay.com/photo/2017/01/20/15/06/people-1993646_1280.jpg'
    },
    {
        id: 7,
        name: 'Luvas de Academia',
        description: 'Luvas para proteger as mãos durante o treino de musculação',
        price: 39.90,
        image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/gloves-1869593_1280.jpg'
    },
    {
        id: 8,
        name: 'Corda de Pular Profissional',
        description: 'Corda de pular ajustável para treinos de cardio',
        price: 34.90,
        image: 'https://cdn.pixabay.com/photo/2017/08/07/00/53/jump-rope-2597663_1280.jpg'
    },
    {
        id: 9,
        name: 'Mochila Esportiva',
        description: 'Mochila resistente e espaçosa para levar seus itens de treino',
        price: 99.90,
        image: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/backpack-1869567_1280.jpg'
    },
    {
        id: 10,
        name: 'Suplemento Whey Protein',
        description: 'Whey protein para auxiliar na recuperação muscular',
        price: 159.90,
        image: 'https://cdn.pixabay.com/photo/2017/06/02/18/24/whey-2366713_1280.jpg'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price to BRL
const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

// Update cart counter
const updateCartCounter = () => {
    const counters = document.querySelectorAll('.cart-counter');
    if (!counters.length) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    counters.forEach(counter => {
        counter.textContent = totalItems;
        if (totalItems > 0) {
            counter.classList.add('active');
        } else {
            counter.classList.remove('active');
        }
    });
};

// Add product to cart
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
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
    updateCartUI();
    updateCartCounter();
    showNotification('Produto adicionado ao carrinho!');
};

// Remove product from cart
const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    updateCartCounter();
    showNotification('Produto removido do carrinho!');
};

// Update product quantity
const updateQuantity = (productId, quantity) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
        updateCartUI();
        updateCartCounter();
    }
};

// Save cart to localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Calculate cart total
const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Update cart UI
const updateCartUI = () => {
    const cartContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${formatPrice(item.price)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('');

    cartTotal.textContent = `Total: ${formatPrice(calculateTotal())}`;
};

// Show notification
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Initialize products grid
const initProductsGrid = () => {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initProductsGrid();
    updateCartUI();
    updateCartCounter();
});
