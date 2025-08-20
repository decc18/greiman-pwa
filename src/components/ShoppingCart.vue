<template>
  <div>
    <!-- Cart Toggle Button -->
    <button 
      @click="toggleCart"
      class="cart-toggle-btn"
      :class="{ 'has-items': cartStore.totalItems > 0 }"
    >
      <i class="fa fa-shopping-cart"></i>
      <span v-if="cartStore.totalItems > 0" class="cart-badge">
        {{ cartStore.totalItems }}
      </span>
    </button>

    <!-- Cart Overlay -->
    <div 
      v-if="cartStore.isVisible" 
      class="cart-overlay"
      @click="hideCart"
    ></div>

    <!-- Cart Panel -->
    <div 
      class="cart-panel"
      :class="{ 'cart-panel-open': cartStore.isVisible }"
    >
      <!-- Cart Header -->
      <div class="cart-header">
        <h3 class="cart-title">
          <i class="fa fa-shopping-cart me-2"></i>
          Carrito de Compras
        </h3>
        <button @click="hideCart" class="cart-close-btn">
          <i class="fa fa-times"></i>
        </button>
      </div>

      <!-- Cart Content -->
      <div class="cart-content">
        <!-- Empty Cart -->
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <i class="fa fa-shopping-cart empty-cart-icon"></i>
          <h4>Tu carrito está vacío</h4>
          <p>Agrega productos para comenzar tu compra</p>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="cart-item"
          >
            <!-- Product Image -->
            <div class="item-image">
              <img :src="item.image || '/images/porcelanato-ambiente.jpg'" :alt="item.name">
            </div>

            <!-- Product Info -->
            <div class="item-info">
              <h5 class="item-name">{{ item.name }}</h5>
              <p class="item-category">{{ item.category }}</p>
              <div class="item-price">
                <span class="current-price">${{ formatPrice(item.currentPrice) }}</span>
                <span v-if="item.originalPrice && item.originalPrice > item.currentPrice" 
                      class="original-price">
                  ${{ formatPrice(item.originalPrice) }}
                </span>
              </div>
            </div>

            <!-- Quantity Controls -->
            <div class="item-controls">
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="quantity-btn"
                  :disabled="item.quantity <= 1"
                >
                  <i class="fa fa-minus"></i>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="quantity-btn"
                >
                  <i class="fa fa-plus"></i>
                </button>
              </div>
              
              <button 
                @click="removeItem(item.id)"
                class="remove-btn"
                title="Eliminar producto"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>

            <!-- Item Total -->
            <div class="item-total">
              ${{ formatPrice(item.currentPrice * item.quantity) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="cartStore.items.length > 0" class="cart-footer">
        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal ({{ cartStore.totalItems }} productos):</span>
            <span class="summary-amount">${{ formatPrice(cartStore.total) }}</span>
          </div>
          <div class="summary-row">
            <span>Envío:</span>
            <span class="summary-amount">Gratis</span>
          </div>
          <div class="summary-row total-row">
            <strong>Total: ${{ formatPrice(cartStore.total) }}</strong>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="cart-actions">
          <button 
            @click="proceedToCheckout"
            class="btn btn-primary btn-block checkout-btn"
          >
            <i class="fa fa-credit-card me-2"></i>
            Proceder al Pago
          </button>
          
          <button 
            @click="contactWhatsApp"
            class="btn btn-success btn-block whatsapp-btn"
          >
            <i class="fa fa-whatsapp me-2"></i>
            Cotizar por WhatsApp
          </button>
          
          <button 
            @click="clearCart"
            class="btn btn-outline-danger btn-sm clear-btn"
          >
            <i class="fa fa-trash me-2"></i>
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>

    <!-- Checkout Modal -->
    <CheckoutModal
      :is-visible="showCheckoutModal"
      :cart-items="cartStore.items"
      :total-amount="cartStore.total"
      :total-items="cartStore.totalItems"
      @close="closeCheckoutModal"
      @payment-success="onPaymentSuccess"
    />
  </div>
</template>

<script>
import { cartStore } from '../stores/cartStore.js'
import CheckoutModal from './CheckoutModal.vue'

export default {
  name: 'ShoppingCart',
  components: {
    CheckoutModal
  },
  data() {
    return {
      cartStore,
      showCheckoutModal: false
    }
  },
  methods: {
    toggleCart() {
      cartStore.toggleCart()
    },
    
    hideCart() {
      cartStore.hideCart()
    },
    
    updateQuantity(productId, quantity) {
      cartStore.updateQuantity(productId, quantity)
    },
    
    removeItem(productId) {
      cartStore.removeItem(productId)
    },
    
    clearCart() {
      if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        cartStore.clearCart()
      }
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('es-EC', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    },
    
    proceedToCheckout() {
      // Mostrar el modal de checkout directamente
      this.showCheckoutModal = true
      // Ocultar el panel del carrito después de un pequeño delay
      setTimeout(() => {
        cartStore.hideCart()
      }, 100)
    },
    
    closeCheckoutModal() {
      console.log('closeCheckoutModal ejecutado')
      this.showCheckoutModal = false
      // No reabrir automáticamente el carrito cuando se cierra el checkout
      // El usuario puede reoprir manualmente si lo desea
    },
    
    onPaymentSuccess() {
      // Limpiar carrito después del pago exitoso
      cartStore.clearCart()
      cartStore.hideCart()
      this.closeCheckoutModal()
    },
    
    showCheckoutModal() {
      // Método obsoleto - removido la implementación anterior
      this.proceedToCheckout()
    },
    
    contactWhatsApp() {
      // Generar mensaje con productos del carrito
      const items = cartStore.items.map(item => 
        `• ${item.name} (x${item.quantity}) - $${this.formatPrice(item.currentPrice * item.quantity)}`
      ).join('\n')
      
      const total = this.formatPrice(cartStore.total)
      const message = encodeURIComponent(
        `¡Hola! Estoy interesado en cotizar estos productos:\n\n${items}\n\nTotal estimado: $${total}\n\n¿Podrían ayudarme con más información y precios?`
      )
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=593997585127&text=${message}`
      window.open(whatsappUrl, '_blank')
    }
  }
}
</script>

<style scoped>
/* Cart Toggle Button */
.cart-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  background: var(--primary-color, #007bff);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: var(--font-size-md);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-toggle-btn:hover {
  transform: scale(1.1);
  background: var(--primary-dark, #0056b3);
}

.cart-toggle-btn.has-items {
  animation: pulse 2s infinite;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

/* Cart Overlay */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  backdrop-filter: blur(2px);
}

/* Cart Panel */
.cart-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 1060;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease;
  overflow: hidden;
}

.cart-panel-open {
  right: 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cart-toggle-btn {
    top: 15px;
    right: 15px;
    width: 55px;
    height: 55px;
    font-size: var(--font-size-base);
    z-index: 1002;
  }
  
  .cart-panel {
    width: 100vw;
    right: -100vw;
    max-width: 100%;
  }
  
  .cart-panel-open {
    right: 0;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .cart-toggle-btn {
    top: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    font-size: var(--font-size-sm);
  }
  
  .cart-badge {
    width: 20px;
    height: 20px;
    font-size: var(--font-size-xs);
    top: -3px;
    right: -3px;
  }
}

/* Cart Header */
.cart-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.cart-title {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: #333;
}

.cart-close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-md);
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.cart-close-btn:hover {
  background: #e9ecef;
  color: #333;
}

/* Cart Content */
.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.empty-cart-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-cart h4 {
  margin-bottom: 10px;
  color: #495057;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.empty-cart p {
  font-size: var(--font-size-base);
  color: #6c757d;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: #fff;
  transition: box-shadow 0.2s ease;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Mobile cart items */
@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 50px 1fr;
    grid-template-rows: auto auto auto;
    gap: 8px;
    padding: 12px;
  }
  
  .item-image {
    grid-row: 1 / 3;
    width: 50px;
    height: 50px;
  }
  
  .item-info {
    grid-column: 2;
    grid-row: 1;
  }
  
  .item-controls {
    grid-column: 2;
    grid-row: 2;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-total {
    grid-column: 2;
    grid-row: 3;
    text-align: left;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--primary-color, #007bff);
  }
}

/* Item Image */
.item-image {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Item Info */
.item-info {
  min-width: 0;
}

.item-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 4px 0;
  color: #333;
  line-height: var(--line-height-tight);
}

.item-category {
  font-size: var(--font-size-sm);
  color: #6c757d;
  margin: 0 0 6px 0;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-price {
  font-weight: var(--font-weight-semibold);
  color: var(--primary-color, #007bff);
  font-size: var(--font-size-base);
}

.original-price {
  font-size: var(--font-size-sm);
  color: #6c757d;
  text-decoration: line-through;
}

/* Item Controls */
.item-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  background: #f8f9fa;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: var(--font-size-sm);
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  padding: 6px 12px;
  font-weight: var(--font-weight-semibold);
  min-width: 30px;
  text-align: center;
  font-size: var(--font-size-base);
  background: white;
  border: none;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: var(--font-size-sm);
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #dc3545;
  color: white;
}

/* Mobile controls adjustments */
@media (max-width: 768px) {
  .quantity-controls {
    border-radius: 6px;
  }
  
  .quantity-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
    min-width: 40px;
    height: 40px;
  }
  
  .quantity {
    padding: 8px 16px;
    min-width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .remove-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
    min-width: 40px;
    height: 40px;
    border-radius: 6px;
  }
}

/* Item Total */
.item-total {
  font-weight: var(--font-weight-bold);
  color: #333;
  font-size: var(--font-size-lg);
  text-align: right;
}

/* Cart Footer */
.cart-footer {
  padding: 20px;
  border-top: 1px solid #dee2e6;
  background: #f8f9fa;
}

/* Cart Summary */
.cart-summary {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: var(--font-size-base);
}

.summary-row:last-child {
  margin-bottom: 0;
}

.total-row {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  padding-top: 8px;
  border-top: 1px solid #dee2e6;
  color: #333;
}

.summary-amount {
  font-weight: var(--font-weight-semibold);
}

/* Action Buttons */
.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-block {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all 0.3s ease;
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.checkout-btn {
  background: var(--primary-color, #007bff);
  color: white;
}

.checkout-btn:hover {
  background: var(--primary-dark, #0056b3);
  transform: translateY(-1px);
}

.whatsapp-btn {
  background: #25d366;
  color: white;
}

.whatsapp-btn:hover {
  background: #22c55e;
  transform: translateY(-1px);
}

.clear-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 8px 16px;
  font-size: var(--font-size-sm);
}

.clear-btn:hover {
  background: #dc3545;
  color: white;
}

/* Mobile action buttons */
@media (max-width: 768px) {
  .btn-block {
    padding: 14px;
    font-size: 1.1rem;
    border-radius: 8px;
  }
  
  .checkout-btn, .whatsapp-btn {
    min-height: 50px;
  }
  
  .clear-btn {
    padding: 12px 16px;
    font-size: 0.9rem;
    min-height: 44px;
  }
}

/* Animations */
@keyframes pulse {
  0% {
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  50% {
    box-shadow: 0 4px 20px rgba(0, 123, 255, 0.5);
  }
  100% {
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
}

/* Scrollbar personalizado para el contenido del carrito */
.cart-content::-webkit-scrollbar {
  width: 6px;
}

.cart-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.cart-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.cart-content::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
