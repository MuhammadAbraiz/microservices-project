// Demo data fallback with Unsplash images
const DEMO_PRODUCTS = [
    { id: 1, name: 'Smartphone', price: 29999, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Bluetooth Headphones', price: 3999, img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: "Men's T-Shirt", price: 799, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Kitchen Blender', price: 4999, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Face Wash', price: 499, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Rice 5kg', price: 1999, img: 'https://images.unsplash.com/photo-1504674900247-ec6b0b1b1b1b?auto=format&fit=crop&w=400&q=80' }
];

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    setCart(cart);
    updateCartCount();
    alert('Added to cart!');
}

function renderProducts(products) {
    const productsList = document.getElementById('products');
    productsList.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
            <button>Add to Cart</button>
        `;
        card.querySelector('button').onclick = () => addToCart(product);
        productsList.appendChild(card);
    });
}

function fetchProducts() {
    fetch('http://localhost:8002/products')
        .then(response => {
            if (!response.ok) throw new Error('No backend');
            return response.json();
        })
        .then(products => {
            // Add Unsplash images to products if missing
            products.forEach((p, i) => {
                if (!p.img) p.img = DEMO_PRODUCTS[i % DEMO_PRODUCTS.length].img;
            });
            renderProducts(products);
        })
        .catch(() => {
            renderProducts(DEMO_PRODUCTS);
        });
}

document.addEventListener('DOMContentLoaded', fetchProducts);

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = cart.length;
}
document.addEventListener('DOMContentLoaded', updateCartCount); 