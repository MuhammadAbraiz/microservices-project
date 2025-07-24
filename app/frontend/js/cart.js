function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function getUser() {
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('user_id');
    if (username && id) return { username, id: parseInt(id) };
    return null;
}

function renderCart() {
    const cart = getCart();
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
        document.getElementById('checkout-btn').disabled = true;
        document.getElementById('checkout-btn').textContent = 'Checkout';
        return;
    }
    cart.forEach((item, idx) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - Rs. ${item.price.toLocaleString()}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => {
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
            updateCartCount();
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
    // Show total
    const totalLi = document.createElement('li');
    totalLi.style.fontWeight = 'bold';
    totalLi.style.justifyContent = 'flex-end';
    totalLi.textContent = `Total: Rs. ${total.toLocaleString()}`;
    cartList.appendChild(totalLi);
    document.getElementById('checkout-btn').disabled = false;
    document.getElementById('checkout-btn').textContent = 'Checkout';
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const user = getUser();
    if (!user) {
        alert('Please login to checkout.');
        window.location.href = 'login.html';
        return;
    }
    // Real order placement
    const product_ids = cart.map(item => item.id);
    fetch('http://localhost:8003/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id, product_ids })
    })
    .then(response => response.json())
    .then(order => {
        if (order && order.id) {
            alert('Order placed! Order ID: ' + order.id);
            setCart([]);
            renderCart();
            updateCartCount();
        } else {
            alert('Order failed.');
        }
    })
    .catch(() => {
        alert('Order failed.');
    });
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCount();
}); 