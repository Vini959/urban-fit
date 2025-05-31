// products.js
// Product data and utility functions

// Validate product data structure
function validateProduct(product) {
    return product &&
           typeof product.id === 'number' &&
           typeof product.name === 'string' &&
           typeof product.description === 'string' &&
           typeof product.price === 'number' &&
           typeof product.image === 'string' &&
           product.price > 0;
}

// Product data
export const products = [
    {
        id: 1,
        name: 'Camiseta Fitness Pro',
        description: 'Camiseta de alta performance para treinos intensos',
        price: 89.90,
        image: 'assets/images/products/camiseta-fitness.jpg'
    },
    {
        id: 2,
        name: 'Shorts Fitness Elite',
        description: 'Shorts confortável com tecnologia anti-odor',
        price: 69.90,
        image: 'assets/images/products/shorts-fitness.jpg'
    },
    {
        id: 3,
        name: 'Tênis Running Max',
        description: 'Tênis para corrida com amortecimento premium',
        price: 299.90,
        image: 'assets/images/products/tenis-running.jpg'
    },
    {
        id: 4,
        name: 'Legging Fitness Power',
        description: 'Legging de compressão para melhor performance',
        price: 119.90,
        image: 'assets/images/products/legging-fitness.jpg'
    },
    {
        id: 5,
        name: 'Garrafa Térmica Fitness',
        description: 'Garrafa térmica para manter sua bebida gelada durante o treino',
        price: 49.90,
        image: 'assets/images/products/garrafa-termica.jpg'
    },
    {
        id: 6,
        name: 'Faixa Elástica de Exercício',
        description: 'Faixa elástica ideal para treinos de resistência e alongamento',
        price: 29.90,
        image: 'assets/images/products/faixa-elastica.jpg'
    },
    {
        id: 7,
        name: 'Luvas de Academia',
        description: 'Luvas para proteger as mãos durante o treino de musculação',
        price: 39.90,
        image: 'assets/images/products/luvas-academia.jpg'
    },
    {
        id: 8,
        name: 'Corda de Pular Profissional',
        description: 'Corda de pular ajustável para treinos de cardio',
        price: 34.90,
        image: 'assets/images/products/corda-pular.jpg'
    },
    {
        id: 9,
        name: 'Mochila Esportiva',
        description: 'Mochila resistente e espaçosa para levar seus itens de treino',
        price: 99.90,
        image: 'assets/images/products/mochila-esportiva.jpg'
    },
    {
        id: 10,
        name: 'Suplemento Whey Protein',
        description: 'Whey protein para auxiliar na recuperação muscular',
        price: 159.90,
        image: 'assets/images/products/whey-protein.jpg'
    }
].filter(validateProduct); // Filter out any invalid products

// Get product by ID
export function getProductById(id) {
    if (typeof id !== 'number' || isNaN(id)) {
        console.error('Invalid product ID');
        return null;
    }
    return products.find(p => p.id === id) || null;
}

// Get featured products (first 4 products)
export function getFeaturedProducts() {
    return products.slice(0, 4);
} 