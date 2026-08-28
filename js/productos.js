// Configura aquí el número de WhatsApp de Shine (código de país + número sin espacios ni +)
const PHONE_NUMBER = "51956070081"; 

// Base de datos de productos de Shine
const productos = [
    {
        id: 1,
        nombre: "Mist Corporal Bare Vanilla",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Bare Vanilla de 250ml. Importado de EE.UU.",
        imagen: "img/mist-bare-vanilla.jpeg"
    },
    {
        id: 2,
        nombre: "Mist Corporal Coconut Passion",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Coconut Passion de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 3,
        nombre: "Mist Corporal Pure Seduction",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Pure Seduction de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 4,
        nombre: "Mist Corporal Aqua Kiss",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Aqua Kiss de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 5,
        nombre: "Mist Corporal Rush",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Rush de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 6,
        nombre: "Mist Corporal Midnight Bloom",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Midnight Bloom de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 7,
        nombre: "Mist Corporal Velvet Petals",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Velvet Petals de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 8,
        nombre: "Mist Corporal Love Spell",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Love Spell de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 9,
        nombre: "Mist Corporal Sheer Love",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Sheer Love de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 10,
        nombre: "Mist Corporal Pure Seduction Vacation",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Pure Seduction Vacation de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1630916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 11,
        nombre: "Mist Corporal Bare Vanilla Vacation",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Bare Vanilla Vacation de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1720916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 12,
        nombre: "Mist Corporal Love Spell Vacation",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Love Spell Vacation de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1120916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 13,
        nombre: "Mist Corporal Midnight Magic",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Midnight Magic de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1720916566398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 14,
        nombre: "Mist Corporal Pitaya Paradise",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Pitaya Paradise de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1720916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 15,
        nombre: "Mist Corporal Gelato Oasis",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Gelato Oasis de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1720916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 16,
        nombre: "Mist Corporal Piña Tropicale",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Piña Tropicale de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1721916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 17,
        nombre: "Mist Corporal Isla Hibiscus",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Isla Hibiscus de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1721916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 18,
        nombre: "Mist Corporal Sundrenched Blooms",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Top Ventas",
        descripcion: "Mist Corporal Sundrenched Blooms de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1791916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 19,
        nombre: "Mist Corporal Serene Blooms",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Colección Limitada",
        descripcion: "Mist Corporal Serene Blooms de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1791916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 20,
        nombre: "Mist Corporal Glazed Petals & Berries",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Colección Limitada",
        descripcion: "Mist Corporal Glazed Petals & Berries de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1791916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 21,
        nombre: "Loción Corporal Pure Seduction",
        categoria: "Victoria's Secret",
        precio: 80.00,
        badge: "Top Ventas",
        descripcion: "Loción Corporal Pure Seduction de 250ml. Importado de EE.UU.",
        imagen: "https://images.unsplash.com/photo-1791916556398-39f1143ab7be?w=500&q=80"
    },
    {
        id: 22,
        nombre: "Lentes de Sol Moda Oversized",
        categoria: "Accesorios",
        precio: 35.00,
        badge: "Nuevo",
        descripcion: "Diseño elegante con protección UV400. Incluye funda protectora y paño microfibra de regalo.",
        imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"
    },
    {
        id: 23,
        nombre: "Lip Gloss Volumizador Neutrogena",
        categoria: "Accesorios",
        precio: 38.00,
        badge: null,
        descripcion: "Brillo labial hidratante con toque de color natural y sensación refrescante de larga duración.",
        imagen: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80"
    },
    {
        id: 24,
        nombre: "Mist Corporal Perfumado Victoria's Secret",
        categoria: "Victoria's Secret",
        precio: 75.00,
        badge: "Destacado",
        descripcion: "Aroma frutal suave y duradero, perfecto para el uso diario. 100% original importado.",
        imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80"
    },
    {
        id: 25,
        nombre: "Totebag Tommy Hilfiger",
        categoria: "Bolsos",
        precio: 319.00,
        badge: null,
        descripcion: "Bolso original de la marca Tommy Hilfiger. Amplio y perfecto para tus viajes.",
        imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80"
    },
];