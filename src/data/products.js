// Datos de productos con precios y stock
export const productsData = {
  regadera: {
    id: 'regadera-spaviva',
    name: 'SpaViva HandShower',
    category: 'REGADERA DE BAÑO',
    image: `${import.meta.env.BASE_URL}images/team-1.jpg`, // Imagen placeholder
    pricing: {
      currentPrice: 89.99,
      originalPrice: 119.99,
      currency: '$',
      unit: null
    },
    inventory: {
      quantity: 15,
      unit: 'regaderas',
      lastUpdated: new Date('2025-01-14')
    },
    features: ['Envío gratis', 'Garantía 2 años', 'Instalación incluida'],
    specifications: {
      dimensions: {
        length: '28 cm',
        diameter: '4.5 cm',
        weight: '320g'
      },
      characteristics: [
        '5 patrones de agua',
        'Manguera 150 cm',
        'Soporte ajustable'
      ],
      materials: [
        'ABS de alta calidad',
        'Acabado cromado',
        'Silicona anti-calcificación'
      ]
    }
  },
  
  porcelanato: {
    id: 'porcelanato-calacatta',
    name: 'Calacatta Ossido',
    category: 'PORCELANATO',
    image: `${import.meta.env.BASE_URL}images/porcelanato-losa.jpg`,
    pricing: {
      currentPrice: 89.99,
      originalPrice: 119.99,
      currency: '$',
      unit: null
    },
    inventory: {
      quantity: 15,
      unit: 'regaderas',
      lastUpdated: new Date('2025-01-14')
    },
    features: ['Envío gratis', 'Garantía 2 años', 'Instalación incluida'],
    specifications: {
      dimensions: {
        length: '28 cm',
        diameter: '4.5 cm',
        weight: '320g'
      },
      characteristics: [
        '5 patrones de agua',
        'Manguera 150 cm',
        'Soporte ajustable'
      ],
      materials: [
        'ABS de alta calidad',
        'Acabado cromado',
        'Silicona anti-calcificación'
      ]
    }
  },
  
  porcelanato: {
    name: 'Calacatta Ossido',
    category: 'PORCELANATO',
    pricing: {
      currentPrice: 24.95,
      originalPrice: 29.95,
      currency: '$',
      unit: 'm²'
    },
    inventory: {
      quantity: 75,
      unit: 'm²',
      lastUpdated: new Date('2025-01-14')
    },
    features: ['Instalación', 'Garantía 10 años', 'Muestras gratis'],
    specifications: {
      sizes: ['60x120 cm', '80x80 cm', '60x60 cm'],
      finishes: ['Natural', 'Pulido', 'Antideslizante'],
      applications: ['Pisos interiores', 'Paredes', 'Exteriores']
    }
  }
};

// Función para obtener datos del producto
export function getProductData(productId) {
  return productsData[productId] || null;
}

// Función para actualizar stock
export function updateStock(productId, newQuantity) {
  if (productsData[productId]) {
    productsData[productId].inventory.quantity = newQuantity;
    productsData[productId].inventory.lastUpdated = new Date();
    return true;
  }
  return false;
}

// Función para verificar disponibilidad
export function isAvailable(productId) {
  const product = productsData[productId];
  return product && product.inventory.quantity > 0;
}

// Función para obtener estado del stock
export function getStockStatus(productId) {
  const product = productsData[productId];
  if (!product) return 'unavailable';
  
  const quantity = product.inventory.quantity;
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= 5) return 'low-stock';
  return 'in-stock';
}
