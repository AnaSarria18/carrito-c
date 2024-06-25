// Lista de productos
const products = [
    { id: 1, name: 'Producto 1', price: 12, image: './ajax.jpg' },
    { id: 2, name: 'Producto 2', price: 10, image: './fabuloso.jpg' },
    { id: 3, name: 'Producto 3', price: 15, image: './bonaropa.jpg' },
    { id: 4, name: 'Producto 4', price: 45, image: './binner.jpeg' },
    { id: 5, name: 'Producto 5', price: 10, image: './fab.jpg' },
    { id: 6, name: 'Producto 6', price: 15, image: './protex.jpg' },
    { id: 7, name: 'Producto 7', price: 11, image: './desodorante.jpeg' },
    { id: 8, name: 'Producto 8', price: 100, image: './locion.jpg' },
];

// Array para almacenar los productos agregados al carrito
let cart = [];

// Función para mostrar los productos en la galería
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('article');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    updateCart();
}

// Función para actualizar el carrito de compras
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    // Calcular el subtotal antes de aplicar el descuento
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
        const cartItemElement = document.createElement('article');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <span>${item.product.name}  $${item.product.price} x ${item.quantity}</span>
            <button onclick="decrementQuantity(${item.product.id})">-</button>
            <button onclick="removeFromCart(${item.product.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Calcular el descuento del 10%
    const descuento = subtotal * 0.10;
    const total = subtotal - descuento;

    // Mostrar el total con descuento en la interfaz
    document.getElementById('total-price').textContent = total.toFixed(2);
}


// Función para eliminar productos del carrito
function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.product.id === productId);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }
    updateCart();
}


// Función para disminuir la cantidad de un producto en el carrito
function decrementQuantity(productId) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

// Inicializar la galería de productos al cargar la página
displayProducts();
