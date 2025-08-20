<template>
  <div class="product-pricing">
    <div class="pricing-header">
      <div class="price-main">
        <span class="price-current">${{ currentPrice }}</span>
        <span class="price-unit" v-if="priceUnit">/{{ priceUnit }}</span>
      </div>
      <div class="stock-info">
        <span class="stock-status" :class="stockStatusClass">
          <i :class="stockIcon"></i>
          {{ stockText }}
        </span>
        <span class="stock-quantity" v-if="showQuantity">
          {{ stockQuantity }} {{ stockUnit }} disponibles
        </span>
      </div>
    </div>
    
    <div class="pricing-secondary" v-if="originalPrice && originalPrice !== currentPrice">
      <span class="price-original">${{ originalPrice }}</span>
      <span class="discount-badge">-{{ discountPercentage }}%</span>
    </div>
    
    <div class="features-list" v-if="features && features.length">
      <span class="feature-item" v-for="feature in features" :key="feature">
        {{ feature }}
      </span>
    </div>
    
    <!-- Add to Cart Section -->
    <div class="cart-section" v-if="productData">
      <div class="quantity-selector">
        <label for="quantity">Cantidad:</label>
        <div class="quantity-controls">
          <button @click="decreaseQuantity" :disabled="quantity <= 1" class="qty-btn">
            <i class="fa fa-minus"></i>
          </button>
          <input 
            v-model.number="quantity" 
            type="number" 
            min="1" 
            :max="stockQuantity"
            class="quantity-input"
            id="quantity"
          >
          <button @click="increaseQuantity" :disabled="quantity >= stockQuantity" class="qty-btn">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
      
      <button 
        @click="addToCart"
        :disabled="stockQuantity <= 0"
        class="add-to-cart-btn"
        :class="{ 'out-of-stock': stockQuantity <= 0 }"
      >
        <i class="fa fa-shopping-cart me-2"></i>
        <span v-if="stockQuantity > 0">Agregar al Carrito</span>
        <span v-else>Producto Agotado</span>
      </button>
      
      <div class="subtotal" v-if="quantity > 1">
        <span>Subtotal: ${{ formatPrice(currentPrice * quantity) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '../stores/cartStore.js'

export default {
  name: 'ProductPricing',
  props: {
    currentPrice: {
      type: [Number, String],
      required: true
    },
    originalPrice: {
      type: [Number, String],
      default: null
    },
    priceUnit: {
      type: String,
      default: null
    },
    stockQuantity: {
      type: Number,
      required: true
    },
    stockUnit: {
      type: String,
      default: 'unidades'
    },
    showQuantity: {
      type: Boolean,
      default: true
    },
    features: {
      type: Array,
      default: () => []
    },
    productData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      quantity: 1,
      cartStore
    }
  },
  computed: {
    discountPercentage() {
      if (!this.originalPrice || this.originalPrice === this.currentPrice) return 0
      return Math.round(((this.originalPrice - this.currentPrice) / this.originalPrice) * 100)
    },
    stockStatusClass() {
      if (this.stockQuantity > 10) return 'in-stock'
      if (this.stockQuantity > 0) return 'low-stock'
      return 'out-of-stock'
    },
    stockIcon() {
      if (this.stockQuantity > 10) return 'fa fa-check-circle'
      if (this.stockQuantity > 0) return 'fa fa-exclamation-triangle'
      return 'fa fa-times-circle'
    },
    stockText() {
      if (this.stockQuantity > 10) return 'En stock'
      if (this.stockQuantity > 0) return 'Pocas unidades'
      return 'Agotado'
    }
  },
  methods: {
    increaseQuantity() {
      if (this.quantity < this.stockQuantity) {
        this.quantity += 1
      }
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    
    addToCart() {
      if (!this.productData || this.stockQuantity <= 0) return
      
      // Crear objeto del producto para el carrito
      const cartItem = {
        id: this.productData.id,
        name: this.productData.name,
        category: this.productData.category,
        currentPrice: parseFloat(this.currentPrice),
        originalPrice: this.originalPrice ? parseFloat(this.originalPrice) : null,
        image: this.productData.image,
        quantity: this.quantity
      }
      
      // Agregar al carrito
      cartStore.addItem(cartItem)
      
      // Mostrar el carrito
      cartStore.showCart()
      
      // Resetear cantidad
      this.quantity = 1
      
      // Emitir evento
      this.$emit('added-to-cart', cartItem)
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('es-EC', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    }
  }
}
</script>

<style scoped>
.product-pricing {
  font-family: 'Montserrat', serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pricing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-current {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  line-height: var(--line-height-tight);
}

.price-unit {
  font-size: var(--font-size-lg);
  color: var(--text-secondary, #666);
  font-weight: var(--font-weight-normal);
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.stock-status {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-status.in-stock {
  color: #27ae60;
}

.stock-status.low-stock {
  color: #f39c12;
}

.stock-status.out-of-stock {
  color: #e74c3c;
}

.stock-quantity {
  font-size: var(--font-size-base);
  color: var(--text-secondary, #666);
  margin-top: 0.25rem;
}

.pricing-secondary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.price-original {
  color: #999;
  text-decoration: line-through;
  font-size: var(--font-size-md);
}

.discount-badge {
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.feature-item {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.75rem;
  border-radius: 15px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Cart Section Styles */
.cart-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.quantity-selector {
  margin-bottom: 1rem;
}

.quantity-selector label {
  font-weight: var(--font-weight-semibold);
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
  font-size: var(--font-size-base);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0;
  width: fit-content;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: var(--font-size-base);
}

.qty-btn:hover:not(:disabled) {
  background: var(--primary-dark, #0056b3);
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  border: none;
  background: white;
  padding: 10px 15px;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  width: 60px;
  font-size: var(--font-size-base);
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.quantity-input:focus {
  outline: none;
  background: #f8f9fa;
}

.add-to-cart-btn {
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 10px;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 130, 150, 0.3);
}

.add-to-cart-btn:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 130, 150, 0.4);
}

.add-to-cart-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-to-cart-btn.out-of-stock {
  background: #6c757d;
  cursor: not-allowed;
  box-shadow: none;
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.subtotal {
  text-align: center;
  font-weight: var(--font-weight-semibold);
  color: var(--primary-color);
  font-size: var(--font-size-md);
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pricing-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .stock-info {
    align-items: flex-end;
    text-align: right;
  }
  
  .price-current {
    font-size: var(--font-size-3xl);
  }
  
  .price-unit {
    font-size: var(--font-size-base);
  }
  
  .stock-status {
    font-size: var(--font-size-base);
  }
  
  .stock-quantity {
    font-size: var(--font-size-sm);
  }
  
  .feature-item {
    font-size: var(--font-size-base);
    padding: 0.25rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .product-pricing {
    padding: 1rem;
  }
  
  .pricing-header {
    gap: 0.25rem;
  }
  
  .price-current {
    font-size: var(--font-size-2xl);
  }
  
  .price-unit {
    font-size: var(--font-size-sm);
  }
  
  .stock-status {
    font-size: var(--font-size-sm);
  }
  
  .stock-quantity {
    font-size: var(--font-size-xs);
  }
  
  .quantity-controls {
    justify-content: center;
  }
  
  .quantity-input {
    width: 50px;
    padding: 8px 12px;
  }
  
  .qty-btn {
    padding: 8px 12px;
    min-width: 40px;
  }
}
</style>
