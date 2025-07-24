fetch('http://localhost:8001/products')
    .then(response => response.json())
    .then(products => {
        const productsList = document.getElementById('products');
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price}`;
            productsList.appendChild(listItem);
        });
    });
