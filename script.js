// Datos de Productos
const products = [
    {
        id: 1,
        name: 'American Gothic Silver Tag Necklace',
        price: 15.00,
        description: 'Official Mica merchandise. Silver tag necklace with "American Gothic" engraving.',
        image: 'images/necklace.png',
        sizes: ['One Size']
    },
    {
        id: 2,
        name: 'Horned Deer Unisex T-Shirt',
        price: 40.00,
        description: 'High-quality unisex T-shirt featuring a horned deer design.',
        image: 'images/tshirt.png',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Burnt American Flag Scarf',
        price: 40.00,
        description: 'Stylish scarf with burnt American flag design.',
        image: 'images/scarf.png',
        sizes: ['One Size']
    }
];

// Carrito
let cart = [];

// Obtener Elementos del DOM
const productElements = document.querySelectorAll('.product');
const productModal = document.getElementById('product-modal');
const cartModal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');

// Elementos del Modal de Producto
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalSize = document.getElementById('modal-size');
const modalPrice = document.getElementById('modal-price');
const sizeSelector = document.getElementById('size-selector');
const sizesDropdown = document.getElementById('sizes');
const addToCartButton = document.getElementById('add-to-cart');

// Botones de Cerrar
const productClose = document.getElementById('product-close');
const cartClose = document.getElementById('cart-close');

// Elementos del Modal del Carrito
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Producto Actual
let currentProduct = null;

// Eventos para Abrir el Modal de Producto
productElements.forEach(item => {
    item.addEventListener('click', () => {
        const productId = parseInt(item.getAttribute('data-id'));
        openProductModal(productId);
    });
});

// Función para Abrir el Modal de Producto
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (currentProduct) {
        modalImage.src = currentProduct.image;
        modalTitle.textContent = currentProduct.name;
        modalDescription.textContent = currentProduct.description;
        modalPrice.textContent = `$${currentProduct.price.toFixed(2)} USD`;

        // Manejo de tallas
        if (currentProduct.sizes.length > 1) {
            sizeSelector.style.display = 'block';
            sizesDropdown.innerHTML = '';
            currentProduct.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                sizesDropdown.appendChild(option);
            });
        } else {
            sizeSelector.style.display = 'none';
        }

        productModal.style.display = 'block';
    }
}

// Cerrar el Modal de Producto
productClose.onclick = function() {
    productModal.style.display = 'none';
}

// Agregar al Carrito
addToCartButton.addEventListener('click', () => {
    let selectedSize = null;
    if (currentProduct.sizes.length > 1) {
        selectedSize = sizesDropdown.value;
    } else {
        selectedSize = currentProduct.sizes[0];
    }
    addToCart(currentProduct, selectedSize);
    productModal.style.display = 'none';
});

// Función para Agregar Producto al Carrito
function addToCart(product, size) {
    const existingProduct = cart.find(p => p.id === product.id && p.size === size);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, size: size, quantity: 1 });
    }
    updateCartCount();
}

// Actualizar Contador del Carrito
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);
}

// Abrir el Modal del Carrito
cartButton.addEventListener('click', () => {
    openCartModal();
});

// Función para Abrir el Modal del Carrito
function openCartModal() {
    renderCartItems();
    cartModal.style.display = 'block';
}

// Cerrar el Modal del Carrito
cartClose.onclick = function() {
    cartModal.style.display = 'none';
}

// Renderizar los Artículos del Carrito
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} (${item.size}) x${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)} USD</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)} USD`;
}

// Proceder al Pago (Funcionalidad Simulada)
checkoutButton.addEventListener('click', () => {
    alert('Checkout functionality is not implemented in this design-focused version.');
    cartModal.style.display = 'none';
});

// Cerrar Modales al Hacer Clic Fuera de Ellos
window.onclick = function(event) {
    if (event.target == productModal) {
        productModal.style.display = 'none';
    }
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
}

// Elementos del Modal de Checkout
const checkoutModal = document.getElementById('checkout-modal');
const checkoutClose = document.getElementById('checkout-close');
const checkoutForm = document.getElementById('checkout-form');

// Elementos del Modal de Confirmación
const orderConfirmationModal = document.getElementById('order-confirmation-modal');
const orderConfirmationClose = document.getElementById('order-confirmation-close');
const closeConfirmationButton = document.getElementById('close-confirmation-button');

// Abrir el Modal de Checkout
checkoutButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

// Cerrar el Modal de Checkout
checkoutClose.onclick = function() {
    checkoutModal.style.display = 'none';
}

// Procesar el Formulario de Checkout
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Aquí podrías procesar los datos del formulario
    // Por ahora, simulamos que el pedido se ha realizado

    checkoutModal.style.display = 'none';
    cart = [];
    updateCartCount();
    orderConfirmationModal.style.display = 'block';
});

// Cerrar el Modal de Confirmación
orderConfirmationClose.onclick = function() {
    orderConfirmationModal.style.display = 'none';
}

closeConfirmationButton.onclick = function() {
    orderConfirmationModal.style.display = 'none';
}

// Cerrar Modales al Hacer Clic Fuera de Ellos
window.onclick = function(event) {
    if (event.target == productModal) {
        productModal.style.display = 'none';
    }
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target == checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (event.target == orderConfirmationModal) {
        orderConfirmationModal.style.display = 'none';
    }
}