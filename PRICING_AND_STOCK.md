# Gestión de Precios y Stock - Graiman PWA

Este documento explica cómo funciona el sistema de precios y stock implementado en la PWA de Graiman.

## 📁 Estructura de Archivos

```
src/
├── components/
│   └── ProductPricing.vue      # Componente reutilizable de precios y stock
├── data/
│   └── products.js            # Datos centralizados de productos
├── utils/
│   └── productUtils.js        # Utilidades para manejo de precios
└── views/
    ├── Regadera.vue          # Página de producto Regadera
    └── Porcelanato.vue       # Página de producto Porcelanato
```

## 🎨 Componente ProductPricing

### Props disponibles:
- `current-price`: Precio actual del producto (número)
- `original-price`: Precio original (opcional, para mostrar descuentos)
- `price-unit`: Unidad del precio (ej: "m²", null para productos unitarios)
- `stock-quantity`: Cantidad disponible en stock
- `stock-unit`: Unidad del stock (ej: "unidades", "m²")
- `show-quantity`: Booleano para mostrar/ocultar cantidad exacta
- `features`: Array de características especiales (ej: ['Envío gratis', 'Garantía'])

### Ejemplo de uso:
```vue
<ProductPricing
  :current-price="89.99"
  :original-price="119.99"
  :stock-quantity="15"
  stock-unit="regaderas"
  :features="['Envío gratis', 'Garantía 2 años']"
/>
```

## 📊 Datos de Productos (products.js)

### Estructura de datos:
```javascript
{
  pricing: {
    currentPrice: 89.99,      // Precio actual
    originalPrice: 119.99,    // Precio original (opcional)
    currency: '$',            // Moneda
    unit: null               // Unidad de precio (null, 'm²', etc)
  },
  inventory: {
    quantity: 15,            // Cantidad en stock
    unit: 'regaderas',      // Unidad del stock
    lastUpdated: Date       // Última actualización
  },
  features: [],             // Características especiales
  specifications: {}        // Especificaciones técnicas
}
```

### Funciones disponibles:
- `getProductData(productId)`: Obtiene datos del producto
- `updateStock(productId, newQuantity)`: Actualiza stock
- `isAvailable(productId)`: Verifica disponibilidad
- `getStockStatus(productId)`: Estado del stock

## 🔧 Actualización de Precios y Stock

### Para cambiar precios:
1. Abrir `src/data/products.js`
2. Modificar los valores en `pricing.currentPrice` y `pricing.originalPrice`
3. Los cambios se reflejan automáticamente en la interfaz

### Para actualizar stock:
```javascript
// Programáticamente
import { updateStock } from './data/products.js';
updateStock('regadera', 25);

// O directamente en products.js
productsData.regadera.inventory.quantity = 25;
```

## 🎯 Estados de Stock

### Indicadores visuales:
- **Verde** (`in-stock`): Más de 10 unidades
- **Amarillo** (`low-stock`): 1-10 unidades  
- **Rojo** (`out-of-stock`): 0 unidades

### Textos automáticos:
- "En stock": Cantidad > 10
- "Pocas unidades": 1-10 unidades
- "Agotado": 0 unidades

## 🛠️ Utilidades (productUtils.js)

### Funciones de formato:
- `formatPrice(price, currency)`: Formatea precios
- `formatStock(quantity, unit)`: Formatea información de stock
- `calculateDiscount(original, current)`: Calcula % de descuento

### Funciones de validación:
- `validateProductData(productData)`: Valida datos del producto
- `getStockStatusInfo(quantity)`: Información completa del estado
- `getStockNotifications(products)`: Genera notificaciones de stock bajo

## 🎨 Personalización de Estilos

Los estilos utilizan variables CSS definidas en `src/style.css`:
- `--primary-color`: Color principal de la marca
- `--secondary-color`: Color secundario

### Clases CSS principales:
- `.product-pricing`: Contenedor principal
- `.current-price`: Precio actual
- `.original-price`: Precio tachado
- `.discount`: Badge de descuento
- `.stock-indicator`: Indicador de stock
- `.feature-tag`: Tags de características

## 📱 Responsive Design

El componente se adapta automáticamente a:
- **Desktop**: Layout horizontal con todos los elementos
- **Mobile**: Layout vertical, elementos apilados
- **Tablet**: Layout intermedio

## 🔄 Actualizaciones en Tiempo Real

Para implementar actualizaciones en tiempo real:
```javascript
import { simulateStockUpdates } from './utils/productUtils.js';

// En el componente Vue
mounted() {
  simulateStockUpdates('regadera', (productId, change) => {
    // Actualizar stock dinámicamente
    this.productData.inventory.quantity += change;
  });
}
```

## 🚀 Próximas Mejoras

- [ ] Integración con API backend
- [ ] WebSocket para actualizaciones en tiempo real
- [ ] Sistema de alertas de stock bajo
- [ ] Historial de precios
- [ ] Descuentos por volumen
- [ ] Calculadora de cantidades necesarias

## 💡 Ejemplos de Uso

### Agregar nuevo producto:
1. Agregar datos en `products.js`
2. Crear vista del producto
3. Importar y usar `ProductPricing`
4. Configurar datos dinámicos

### Modificar diseño de precios:
1. Editar estilos en `ProductPricing.vue`
2. Utilizar variables CSS existentes
3. Mantener responsive design
4. Probar en diferentes dispositivos
