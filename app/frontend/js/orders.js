const DEMO_ORDERS = [
    { id: 101, status: 'Delivered' },
    { id: 102, status: 'Processing' }
];

function getUser() {
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('user_id');
    if (username && id) return { username, id: parseInt(id) };
    return null;
}

function renderOrders(orders) {
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';
    if (!orders.length) {
        ordersList.innerHTML = '<li>No orders found.</li>';
        return;
    }
    orders.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Order #${order.id} - Status: ${order.status}`;
        ordersList.appendChild(li);
    });
}

function fetchOrders() {
    const user = getUser();
    if (user) {
        fetch(`http://localhost:8003/orders?user_id=${user.id}`)
        .then(response => {
            if (!response.ok) throw new Error('No backend');
            return response.json();
        })
        .then(orders => renderOrders(orders))
        .catch(() => {
            renderOrders(DEMO_ORDERS);
        });
    } else {
        const ordersList = document.getElementById('orders');
        ordersList.innerHTML = '<li>Please log in to view your orders.</li>';
    }
}

document.addEventListener('DOMContentLoaded', fetchOrders); 