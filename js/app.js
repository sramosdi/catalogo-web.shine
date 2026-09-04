// Configuración de número de WhatsApp de Shine y Google Sheets API
const PHONE_NUMBER = "51956070081";
const API_URL = "https://script.google.com/macros/s/AKfycbzMtEGB5juurr2BcMZ_Opp25v8X1tlhI0PWjJwPL2mKBb2gzz9zjDW1S_ICUW22tJnTlA/exec";

// Variables globales del catálogo
let productos = [];
let cart = [];
let selectedCategory = "Todos";
let selectedSubcategory = "Todos";

// Cargar catálogo desde Google Sheets al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchProductos();
});

// Función para obtener productos desde Google Sheets
async function fetchProductos() {
    const grid = document.getElementById('products-grid');

    try {
        const res = await fetch(API_URL);
        productos = await res.json();
        
        // Inicializar interfaz una vez cargados los datos
        renderCategories();
        renderSubcategories();
        filterProducts();
    } catch (error) {
        console.error("Error al cargar la base de datos:", error);
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-red-500 font-semibold">
                    <i class="fas fa-exclamation-triangle text-3xl mb-2"></i>
                    <p>No se pudieron cargar los productos. Intenta recargar la página.</p>
                </div>
            `;
        }
    }
}

// Renderizar botones de categorías principales
function renderCategories() {
    const categories = [
        "Todos",
        "Victoria's Secret",
        "Damas",
        "Hogar",
        "Caballeros",
        "Herramientas",
        "Niños"
    ];

    const container = document.getElementById('categories-wrapper');
    if (!container) return;

    container.innerHTML = "";
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `category-btn px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition duration-200 shrink-0 ${
            cat === selectedCategory ? 'bg-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`;
        btn.textContent = cat;
        btn.onclick = () => selectCategory(cat);
        container.appendChild(btn);
    });
}

// Seleccionar categoría principal
function selectCategory(cat) {
    selectedCategory = cat;
    selectedSubcategory = "Todos";
    
    renderCategories();
    renderSubcategories();
    filterProducts();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar subcategorías dinámicamente
function renderSubcategories() {
    const subContainer = document.getElementById('subcategories-wrapper');
    if (!subContainer) return;

    const subcategoriesMap = {
        "Victoria's Secret": ["Todos", "Mists", "Lociones", "Mini Fragancias", "Fragancias para Cabello"],
        "Damas": ["Todos", "Calzado", "Carteras", "Mochilas", "Billeteras", "Morrales", "Relojes", "Lentes", "Cuidado Personal", "Joyería", "Gorros"],
        "Hogar": ["Todos", "Cocina", "Decoración", "Organización"],
        "Caballeros": ["Todos", "Gorros", "Morrales", "Relojes", "Billeteras", "Fragancias", "Lentes"],
        "Niños": ["Todos", "Juguetes", "Accesorios"]
    };

    const currentSubcategories = subcategoriesMap[selectedCategory];

    if (currentSubcategories) {
        subContainer.classList.remove('hidden');
        subContainer.innerHTML = "";
        
        currentSubcategories.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = `shrink-0 px-4 py-1 rounded-full text-xs font-semibold transition duration-200 whitespace-nowrap ${
                sub === selectedSubcategory 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`;
            btn.textContent = sub;
            btn.onclick = () => selectSubcategory(sub);
            subContainer.appendChild(btn);
        });
    } else {
        subContainer.classList.add('hidden');
    }
}

// Seleccionar subcategoría
function selectSubcategory(sub) {
    selectedSubcategory = sub;
    renderSubcategories();
    filterProducts();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filtrar Productos con coincidencia flexible de texto
function filterProducts(isMobile = false) {
    const inputElement = document.getElementById(isMobile ? 'search-input-mobile' : 'search-input');
    const query = inputElement ? inputElement.value.toLowerCase().trim() : '';

    const filtered = (typeof productos !== 'undefined' ? productos : []).filter(p => {
        // Limpieza y normalización de textos para evitar fallos por "para" / "para el" o Mayúsculas
        const catProducto = (p.categoria || '').toString().toLowerCase().trim();
        const catSeleccionada = selectedCategory.toLowerCase().trim();

        const subcatProducto = (p.subcategoria || '').toString().toLowerCase().trim();
        const subcatSeleccionada = selectedSubcategory.toLowerCase().trim();

        // Validación flexible para Categoría
        const matchesCategory = selectedCategory === "Todos" || catProducto === catSeleccionada;

        // Validación flexible para Subcategoría (ignora pequeñas variaciones de sintaxis)
        const matchesSubcategory = selectedSubcategory === "Todos" || 
                                   subcatProducto === subcatSeleccionada ||
                                   subcatProducto.replace(" para el ", " para ") === subcatSeleccionada.replace(" para el ", " para ");

        // Búsqueda por texto en nombre o descripción
        const matchesQuery = (p.nombre || '').toLowerCase().includes(query) || 
                             (p.descripcion || '').toLowerCase().includes(query);

        return matchesCategory && matchesSubcategory && matchesQuery;
    });

    renderProducts(filtered);
}

// Función para asignar colores dinámicos a cada tipo de etiqueta (Badge)
function getBadgeStyle(badgeText) {
    if (!badgeText) return '';
    
    // Normalizar texto (quita tildes y convierte a minúsculas)
    const text = badgeText.toString().toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    switch (text) {
        case 'clasico':
            return 'bg-amber-400 text-indigo-950';        // Ámbar / Dorado
        case 'coleccion':
            return 'bg-purple-600 text-white';           // Púrpura elegante
        case 'nuevo':
            return 'bg-emerald-500 text-white';          // Verde brillante
        case 'top ventas':
        case 'top':
        case 'oferta':
            return 'bg-rose-600 text-white';             // Rojo vibrante
        default:
            return 'bg-indigo-600 text-white';           // Azul por defecto
    }
}

// Renderizar la grilla de productos
function renderProducts(items) {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');

    if (!grid) return;

    if (!items || items.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    grid.innerHTML = items.map(prod => {
        const availableStock = prod.stock ?? 0;
        const isOutOfStock = availableStock <= 0;

        return `
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group ${isOutOfStock ? 'opacity-90' : ''}">
                <div class="relative overflow-hidden cursor-pointer h-52 bg-gray-50 flex items-center justify-center p-2" onclick="openDetailModal(${prod.id})">
                    <img src="${prod.imagen || ''}" alt="${prod.nombre || ''}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500">
                    ${prod.badge ? `<span class="absolute top-3 left-3 ${getBadgeStyle(prod.badge)} font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow z-10">${prod.badge}</span>` : ''}
                </div>
                
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">${prod.categoria || ''}</span>
                        <h3 onclick="openDetailModal(${prod.id})" class="font-bold text-gray-800 text-lg mt-1 cursor-pointer hover:text-indigo-600 transition line-clamp-1">${prod.nombre || ''}</h3>
                        <p class="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">${prod.descripcion || ''}</p>
                        
                        <div class="mt-3">
                            ${!isOutOfStock 
                                ? `<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                                     <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Stock: ${String(availableStock).padStart(2, '0')} und.
                                   </span>`
                                : `<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200/60">
                                     <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Agotado
                                   </span>`
                            }
                        </div>
                    </div>

                    <div class="mt-4 flex items-center justify-between border-t pt-3 gap-2">
                        <div class="shrink-0">
                            <span class="text-xs text-gray-400 block">Precio</span>
                            <span class="text-lg font-black text-gray-900 whitespace-nowrap">S/ ${(Number(prod.precio) || 0).toFixed(2)}</span>
                        </div>
                        
                        ${!isOutOfStock 
                            ? `<button onclick="addToCart(${prod.id})" 
                                       class="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-md px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                                   <i class="fas fa-cart-plus"></i> Añadir
                               </button>`
                            : `<button onclick="requestOnOrder(${prod.id})" 
                                       class="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-md px-3 py-2.5 rounded-xl transition flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                                   <i class="fab fa-whatsapp"></i> A pedido
                               </button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Redirección directa a WhatsApp para productos agotados
function requestOnOrder(productId) {
    const prod = productos.find(p => p.id === productId);
    if (!prod) return;

    const message = `¡Hola Shine Be Yourself! ✨ Me interesa solicitar *A PEDIDO* el siguiente producto que figura como agotado en el catálogo:\n\n` +
                    `📌 *Producto:* ${prod.nombre}\n` +
                    `💰 *Precio:* S/ ${(Number(prod.precio) || 0).toFixed(2)}\n\n` +
                    `¿Me podrían brindar información sobre el tiempo de llegada y cómo realizar la reserva?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encoded}`, '_blank');
}

// Funciones del Carrito
function addToCart(id) {
    const product = productos.find(p => p.id === id);
    if (!product || (product.stock ?? 0) <= 0) return;

    const itemInCart = cart.find(p => p.id === id);
    if (itemInCart) {
        if (itemInCart.cantidad < product.stock) {
            itemInCart.cantidad++;
            showToast(`Se aumentó la cantidad de "${product.nombre}"`, 'success', 'fa-cart-plus');
        } else {
            showToast(`Solo hay ${product.stock} unidades disponibles de este producto.`, 'warning', 'fa-exclamation-triangle');
        }
    } else {
        cart.push({ ...product, cantidad: 1 });
        showToast(`"${product.nombre}" agregado al carrito`, 'success', 'fa-check-circle');
    }
    updateCartUI();
}

function updateQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    const product = productos.find(p => p.id === id);

    if (delta > 0 && product && item.cantidad >= product.stock) {
        showToast(`Límite alcanzado: solo ${product.stock} disponibles.`, 'warning', 'fa-exclamation-triangle');
        return;
    }

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        cart = cart.filter(p => p.id !== id);
        showToast(`Producto eliminado del carrito`, 'info', 'fa-trash-alt');
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (Number(item.precio) * item.cantidad), 0);

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
                <img src="${item.imagen}" class="w-14 h-14 object-contain rounded-lg border bg-gray-50">
                <div class="flex-grow">
                    <h4 class="font-bold text-sm text-gray-800 line-clamp-1">${item.nombre}</h4>
                    <span class="text-xs text-gray-500">S/ ${Number(item.precio).toFixed(2)} c/u</span>
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

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.toggle('hidden');
}

// Modal de detalle del producto
function openDetailModal(id) {
    const p = productos.find(item => item.id === id);
    if (!p) return;

    const availableStock = p.stock ?? 0;
    const isOutOfStock = availableStock <= 0;

    document.getElementById('modal-img').src = p.imagen || '';
    document.getElementById('modal-category').innerText = p.categoria || '';
    document.getElementById('modal-title').innerText = p.nombre || '';
    document.getElementById('modal-description').innerText = p.descripcion || '';
    document.getElementById('modal-price').innerText = `S/ ${(Number(p.precio) || 0).toFixed(2)}`;
    
    const addBtn = document.getElementById('modal-add-btn');
    if (addBtn) {
        if (isOutOfStock) {
            addBtn.disabled = false;
            addBtn.className = 'flex-grow bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95';
            addBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Solicitar a Pedido';
            addBtn.onclick = () => {
                requestOnOrder(p.id);
                closeDetailModal();
            };
        } else {
            addBtn.disabled = false;
            addBtn.className = 'flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95';
            addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir al Carrito';
            addBtn.onclick = () => {
                addToCart(p.id);
                closeDetailModal();
            };
        }
    }

    document.getElementById('product-detail-modal').classList.remove('hidden');
}

function closeDetailModal() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.add('hidden');
}

// Envío de pedido por WhatsApp
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showToast("Tu carrito está vacío. Agrega productos para realizar un pedido.", "warning", "fa-shopping-cart");
        return;
    }

    let message = "¡Hola Shine Be Yourself! ✨ Quisiera realizar el siguiente pedido desde el catálogo virtual:\n\n";
    cart.forEach(item => {
        message += `• *${item.nombre}* (x${item.cantidad}) - S/ ${(Number(item.precio) * item.cantidad).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (Number(item.precio) * item.cantidad), 0);
    message += `\n*Total a Pagar:* S/ ${total.toFixed(2)}\n\n¿Tienen disponibilidad para coordinar el pago y envío?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encoded}`, '_blank');
}

// SISTEMA DE NOTIFICACIONES FLOTANTES (TOAST)
function showToast(message, type = 'success', icon = 'fa-check-circle') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    let bgColors = 'bg-gray-900 border-gray-700 text-white';
    let iconColor = 'text-emerald-400';

    if (type === 'warning') {
        bgColors = 'bg-amber-900/90 border-amber-600 text-amber-100';
        iconColor = 'text-amber-300';
    } else if (type === 'info') {
        bgColors = 'bg-indigo-900/90 border-indigo-600 text-indigo-100';
        iconColor = 'text-indigo-300';
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md transform transition-all duration-300 translate-y-5 opacity-0 ${bgColors}`;
    
    toast.innerHTML = `
        <i class="fas ${icon} text-lg ${iconColor} shrink-0"></i>
        <p class="text-xs sm:text-sm font-semibold flex-grow">${message}</p>
        <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-white transition text-sm ml-2">&times;</button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-5', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}