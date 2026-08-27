let cart = [];
let selectedCategory = "Todos";

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts(productos);
});

// Renderizar botones de categorías dinámicas
// Renderizar botones de categorías en orden personalizado
function renderCategories() {
    // Definimos la lista en el orden exacto que deseas
    const categories = [
        "Todos",
        "Bolsos",
        "Carteras",
        "Mochilas",
        "Victoria's Secret",
        "Pink Beauty",
        "Accesorios",
        "Productos Nacionales"
    ];

    const container = document.getElementById('categories-wrapper');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <button onclick="selectCategory('${cat}')" 
                class="category-btn px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition duration-200 
                       ${cat === selectedCategory ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
            ${cat}
        </button>
    `).join('');
}

// Seleccionar filtro por categoría
function selectCategory(cat) {
    selectedCategory = cat;
    renderCategories();
    filterProducts();
}

// Filtrar Productos (por búsqueda y categoría)
function filterProducts(isMobile = false) {
    const inputElement = document.getElementById(isMobile ? 'search-input-mobile' : 'search-input');
    const query = inputElement ? inputElement.value.toLowerCase() : '';

    const filtered = productos.filter(p => {
        const matchesCategory = selectedCategory === "Todos" || p.categoria === selectedCategory;
        const matchesQuery = p.nombre.toLowerCase().includes(query) || p.descripcion.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });

    renderProducts(filtered);
}

// Renderizar la grilla de productos
function renderProducts(items) {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');

    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    grid.innerHTML = items.map(prod => `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
            <div class="relative overflow-hidden cursor-pointer" onclick="openDetailModal(${prod.id})">
                <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-52 object-cover group-hover:scale-105 transition duration-500">
                ${prod.badge ? `<span class="absolute top-3 left-3 bg-amber-400 text-indigo-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow">${prod.badge}</span>` : ''}
            </div>
            
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">${prod.categoria}</span>
                    <h3 onclick="openDetailModal(${prod.id})" class="font-bold text-gray-800 text-lg mt-1 cursor-pointer hover:text-indigo-600 transition line-clamp-1">${prod.nombre}</h3>
                    <p class="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">${prod.descripcion}</p>
                </div>

                <div class="mt-5 flex items-center justify-between border-t pt-3">
                    <div>
                        <span class="text-xs text-gray-400 block">Precio</span>
                        <span class="text-xl font-black text-gray-900">S/ ${prod.precio.toFixed(2)}</span>
                    </div>
                    <button onclick="addToCart(${prod.id})" class="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white p-3 rounded-xl transition shadow-md flex items-center gap-1.5 font-bold text-sm">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Agregar al carrito
function addToCart(id) {
    const product = productos.find(p => p.id === id);
    const itemInCart = cart.find(p => p.id === id);

    if (itemInCart) {
        itemInCart.cantidad++;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }
    updateCartUI();
}

// Cambiar cantidades (+ / -)
function updateQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        cart = cart.filter(p => p.id !== id);
    }
    updateCartUI();
}

// Actualizar la interfaz del carrito modal
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const badge = document.getElementById('cart-badge');
    const total = document.getElementById('cart-total');

    if (badge) badge.innerText = totalCount;
    if (total) total.innerText = `S/ ${totalPrice.toFixed(2)}`;

    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fas fa-shopping-basket text-4xl mb-2"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="py-3 flex items-center justify-between gap-3">
                <img src="${item.imagen}" class="w-14 h-14 object-cover rounded-lg border">
                <div class="flex-grow">
                    <h4 class="font-bold text-sm text-gray-800 line-clamp-1">${item.nombre}</h4>
                    <span class="text-xs text-gray-500">S/ ${item.precio.toFixed(2)} c/u</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-6 h-6 bg-white rounded shadow text-xs font-bold text-gray-700 flex items-center justify-center">-</button>
                    <span class="text-xs font-bold w-4 text-center">${item.cantidad}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-6 h-6 bg-white rounded shadow text-xs font-bold text-gray-700 flex items-center justify-center">+</button>
                </div>
            </div>
        `).join('');
    }
}

// Abrir / Cerrar Carrito
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.toggle('hidden');
}

// Abrir Modal Detalle de Producto
function openDetailModal(id) {
    const p = productos.find(item => item.id === id);
    if (!p) return;

    document.getElementById('modal-img').src = p.imagen;
    document.getElementById('modal-category').innerText = p.categoria;
    document.getElementById('modal-title').innerText = p.nombre;
    document.getElementById('modal-description').innerText = p.descripcion;
    document.getElementById('modal-price').innerText = `S/ ${p.precio.toFixed(2)}`;
    
    const addBtn = document.getElementById('modal-add-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            addToCart(p.id);
            closeDetailModal();
        };
    }

    document.getElementById('product-detail-modal').classList.remove('hidden');
}

function closeDetailModal() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.add('hidden');
}

// Enviar pedido estructurado por WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) return alert("Tu carrito está vacío.");

    let message = "¡Hola Shine! ✨ Quisiera realizar el siguiente pedido desde el catálogo virtual:\n\n";
    cart.forEach(item => {
        message += `• *${item.nombre}* (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    message += `\n*Total a Pagar:* S/ ${total.toFixed(2)}\n\n¿Tienen disponibilidad para coordinar el envío?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encoded}`, '_blank');
}