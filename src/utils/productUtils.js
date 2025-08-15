// Utilidades para manejo de precios y formateo
export function formatPrice(price, currency = '$') {
  if (typeof price !== 'number') return `${currency}0.00`;
  return `${currency}${price.toFixed(2)}`;
}

export function formatStock(quantity, unit = 'unidades') {
  if (quantity === 0) return 'Agotado';
  if (quantity === 1) return `1 ${unit.slice(0, -1)}`; // Singular
  return `${quantity} ${unit}`;
}

export function calculateDiscount(originalPrice, currentPrice) {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

export function getStockStatusInfo(quantity) {
  if (quantity === 0) {
    return {
      status: 'out-of-stock',
      color: '#e74c3c',
      icon: 'fa fa-times-circle',
      text: 'Agotado',
      urgent: true
    };
  }
  
  if (quantity <= 5) {
    return {
      status: 'low-stock',
      color: '#f39c12',
      icon: 'fa fa-exclamation-triangle',
      text: 'Pocas unidades',
      urgent: true
    };
  }
  
  if (quantity <= 10) {
    return {
      status: 'medium-stock',
      color: '#f39c12',
      icon: 'fa fa-exclamation-triangle',
      text: 'Stock limitado',
      urgent: false
    };
  }
  
  return {
    status: 'in-stock',
    color: '#27ae60',
    icon: 'fa fa-check-circle',
    text: 'En stock',
    urgent: false
  };
}

// Función para simular actualizaciones de stock en tiempo real
export function simulateStockUpdates(productId, callback) {
  // Esta función podría conectarse a una API real o WebSocket
  // Por ahora simula cambios de stock aleatorios
  setInterval(() => {
    const change = Math.floor(Math.random() * 5) - 2; // -2 a +2
    callback(productId, change);
  }, 30000); // Actualizar cada 30 segundos
}

// Validaciones de datos de producto
export function validateProductData(productData) {
  const errors = [];
  
  if (!productData) {
    errors.push('Datos del producto requeridos');
    return errors;
  }
  
  if (!productData.pricing?.currentPrice || productData.pricing.currentPrice <= 0) {
    errors.push('Precio actual inválido');
  }
  
  if (!productData.inventory || productData.inventory.quantity < 0) {
    errors.push('Cantidad de inventario inválida');
  }
  
  if (!productData.name || productData.name.trim().length === 0) {
    errors.push('Nombre del producto requerido');
  }
  
  return errors;
}

// Función para generar notificaciones basadas en el stock
export function getStockNotifications(products) {
  const notifications = [];
  
  Object.entries(products).forEach(([id, product]) => {
    const quantity = product.inventory.quantity;
    
    if (quantity === 0) {
      notifications.push({
        type: 'critical',
        message: `${product.name} está agotado`,
        productId: id,
        action: 'Reabastecer stock'
      });
    } else if (quantity <= 5) {
      notifications.push({
        type: 'warning',
        message: `Stock bajo para ${product.name} (${quantity} restantes)`,
        productId: id,
        action: 'Considerar reabastecimiento'
      });
    }
  });
  
  return notifications;
}
