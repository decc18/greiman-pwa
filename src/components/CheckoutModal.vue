<template>
  <!-- Modal Overlay -->
  <div 
    v-if="shouldShowModal" 
    class="checkout-overlay"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div 
      class="checkout-modal"
      :class="{ 
        'modal-enter': isVisible && !isClosing,
        'modal-success': showSuccess,
        'modal-processing': isProcessing
      }"
      @click.stop
    >
      <!-- Processing State -->
      <div v-if="isProcessing" class="processing-content">
        <div class="spinner-container">
          <div class="payment-spinner"></div>
          <div class="payment-icons">
            <i class="fa fa-credit-card"></i>
            <i class="fa fa-shield-alt"></i>
            <i class="fa fa-check-circle success-icon"></i>
          </div>
        </div>
        <h3 class="processing-title">Procesando tu pago...</h3>
        <p class="processing-subtitle">Por favor espera un momento</p>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="showSuccess" class="success-content">
        <div class="success-animation">
          <div class="checkmark-container">
            <svg class="checkmark" viewBox="0 0 52 52">
              <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path class="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <div class="confetti">
            <div class="confetti-piece" v-for="i in 20" :key="i" :style="getConfettiStyle(i)"></div>
          </div>
        </div>
        
        <h2 class="success-title">¡Pago Exitoso! 🎉</h2>
        <p class="success-message">
          Tu pedido ha sido procesado correctamente
        </p>
        
        <div class="order-summary">
          <div class="summary-item">
            <i class="fa fa-shopping-cart"></i>
            <span>{{ totalItems }} productos</span>
          </div>
          <div class="summary-item">
            <i class="fa fa-dollar-sign"></i>
            <span>${{ formatPrice(totalAmount) }}</span>
          </div>
          <div class="summary-item">
            <i class="fa fa-calendar-alt"></i>
            <span>{{ getCurrentDate() }}</span>
          </div>
        </div>
        
        <div class="success-actions">
          <button @click="closeModal" class="btn btn-primary continue-btn">
            <i class="fa fa-home me-2"></i>
            Continuar Comprando
          </button>
          <button @click="downloadReceipt" class="btn btn-outline-primary receipt-btn">
            <i class="fa fa-download me-2"></i>
            Descargar Recibo
          </button>
        </div>
      </div>

      <!-- Initial Checkout Form -->
      <div v-else class="checkout-content">
        <div class="modal-header">
          <h2 class="modal-title">
            <i class="fa fa-credit-card me-2"></i>
            Finalizar Compra
          </h2>
          <button @click.stop="closeModal" class="close-btn" type="button">
            <i class="fa fa-times" @click.stop="closeModal"></i>
          </button>
        </div>
        
        <div class="checkout-body">
          <!-- Order Summary -->
          <div class="order-preview">
            <h4>Resumen del pedido</h4>
            <div class="items-preview">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="item-preview"
              >
                <img :src="getProductImage(item)" :alt="item.name" class="item-thumb">
                <div class="item-details">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-quantity">x{{ item.quantity }}</span>
                </div>
                <span class="item-price">${{ formatPrice(item.currentPrice * item.quantity) }}</span>
              </div>
            </div>
            <div class="total-row">
              <strong>Total: ${{ formatPrice(totalAmount) }}</strong>
            </div>
          </div>
          
          <!-- Payment Method Selection -->
          <div class="payment-methods">
            <h4>Método de pago</h4>
            <div class="payment-options">
              <label class="payment-option" :class="{ active: selectedPayment === 'card' }">
                <input type="radio" v-model="selectedPayment" value="card">
                <div class="option-content">
                  <i class="fa fa-credit-card"></i>
                  <span>Tarjeta de Crédito/Débito</span>
                </div>
              </label>
              <label class="payment-option" :class="{ active: selectedPayment === 'whatsapp' }">
                <input type="radio" v-model="selectedPayment" value="whatsapp">
                <div class="option-content">
                  <i class="fa fa-whatsapp"></i>
                  <span>WhatsApp (Cotización)</span>
                </div>
              </label>
              <label class="payment-option" :class="{ active: selectedPayment === 'bank' }">
                <input type="radio" v-model="selectedPayment" value="bank">
                <div class="option-content">
                  <i class="fa fa-university"></i>
                  <span>Transferencia Bancaria</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="processPayment" class="btn btn-primary pay-btn" :disabled="!selectedPayment">
            <i class="fa fa-lock me-2"></i>
            Procesar Pago - ${{ formatPrice(totalAmount) }}
          </button>
          <p class="security-note">
            <i class="fa fa-shield-alt me-1"></i>
            Transacción segura y encriptada
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    cartItems: {
      type: Array,
      default: () => []
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    totalItems: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isProcessing: false,
      showSuccess: false,
      isClosing: false,
      selectedPayment: 'card',
      progressPercentage: 0,
      progressInterval: null
    }
  },
  computed: {
    shouldShowModal() {
      const hasItems = this.cartItems && this.cartItems.length > 0
      const isVisibleProp = this.isVisible
      const shouldShow = isVisibleProp && hasItems
      
      console.log('CheckoutModal shouldShowModal:', {
        isVisible: isVisibleProp,
        hasItems: hasItems,
        itemCount: this.cartItems ? this.cartItems.length : 0,
        shouldShow: shouldShow
      })
      
      return shouldShow
    },
    hasValidItems() {
      return this.cartItems && this.cartItems.length > 0 && this.totalAmount > 0
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.resetModal()
        // Agregar listener para tecla Escape
        document.addEventListener('keydown', this.handleEscKey)
      } else {
        // Remover listener cuando se cierre el modal
        document.removeEventListener('keydown', this.handleEscKey)
      }
    },
    cartItems: {
      handler(newItems) {
        // Si el carrito se vacía mientras el modal está abierto, cerrarlo
        if (this.isVisible && (!newItems || newItems.length === 0)) {
          console.log('Carrito vacío detectado, cerrando modal')
          this.closeModal()
        }
      },
      immediate: true
    }
  },
  methods: {
    resetModal() {
      this.isProcessing = false
      this.showSuccess = false
      this.isClosing = false
      this.progressPercentage = 0
      this.selectedPayment = 'card'
    },
    
    closeModal() {
      console.log('closeModal ejecutado')
      // Remover listener de Escape si existe
      document.removeEventListener('keydown', this.handleEscKey)
      this.$emit('close')
      this.resetModal()
    },
    
    handleEscKey(event) {
      if (event.key === 'Escape' && this.isVisible) {
        this.closeModal()
      }
    },
    
    processPayment() {
      // Validar que hay productos antes de procesar
      if (!this.hasValidItems) {
        console.warn('No se puede procesar el pago: carrito vacío o inválido')
        this.closeModal()
        return
      }
      
      if (this.selectedPayment === 'whatsapp') {
        this.contactWhatsApp()
        return
      }
      
      this.isProcessing = true
      this.startProgress()
      
      // Simular proceso de pago
      setTimeout(() => {
        this.isProcessing = false
        this.showSuccess = true
        this.$emit('payment-success')
      }, 4000)
    },
    
    startProgress() {
      this.progressPercentage = 0
      this.progressInterval = setInterval(() => {
        if (this.progressPercentage < 100) {
          this.progressPercentage += Math.random() * 15
          if (this.progressPercentage > 100) {
            this.progressPercentage = 100
          }
        } else {
          clearInterval(this.progressInterval)
        }
      }, 200)
    },
    
    contactWhatsApp() {
      const items = this.cartItems.map(item => 
        `• ${item.name} (x${item.quantity}) - $${this.formatPrice(item.currentPrice * item.quantity)}`
      ).join('\n')
      
      const total = this.formatPrice(this.totalAmount)
      const message = encodeURIComponent(
        `¡Hola! Quiero cotizar estos productos:\n\n${items}\n\nTotal estimado: $${total}\n\n¿Podrían ayudarme con más información y el proceso de compra?`
      )
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=593997585127&text=${message}`
      window.open(whatsappUrl, '_blank')
      this.closeModal()
    },
    
    downloadReceipt() {
      // Generar recibo simulado
      const receiptData = {
        date: this.getCurrentDate(),
        items: this.cartItems,
        total: this.totalAmount,
        orderNumber: this.generateOrderNumber()
      }
      
      const receiptText = this.generateReceiptText(receiptData)
      const blob = new Blob([receiptText], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `recibo-greiman-${receiptData.orderNumber}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    
    generateReceiptText(data) {
      let receipt = `RECIBO DE COMPRA - GREIMAN\n`
      receipt += `==============================\n\n`
      receipt += `Fecha: ${data.date}\n`
      receipt += `N° Pedido: ${data.orderNumber}\n\n`
      receipt += `PRODUCTOS:\n`
      receipt += `----------\n`
      
      data.items.forEach(item => {
        receipt += `${item.name}\n`
        receipt += `Cantidad: ${item.quantity}\n`
        receipt += `Precio: $${this.formatPrice(item.currentPrice * item.quantity)}\n\n`
      })
      
      receipt += `----------\n`
      receipt += `TOTAL: $${this.formatPrice(data.total)}\n\n`
      receipt += `¡Gracias por tu compra!\n`
      receipt += `www.greiman.com`
      
      return receipt
    },
    
    generateOrderNumber() {
      return 'GR' + Date.now().toString().slice(-8)
    },
    
    getCurrentDate() {
      return new Date().toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('es-EC', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    },
    
    getProductImage(item) {
      return item.image || `${import.meta.env.BASE_URL}images/product-placeholder.jpg`
    },
    
    getConfettiStyle(index) {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
      const color = colors[index % colors.length]
      const delay = Math.random() * 2
      const duration = 3 + Math.random() * 2
      const x = Math.random() * 100
      
      return {
        backgroundColor: color,
        left: x + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's'
      }
    }
  },
  
  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
    // Limpiar listener de Escape
    document.removeEventListener('keydown', this.handleEscKey)
  }
}
</script>

<style scoped>
/* Modal Overlay */
.checkout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000; /* Más alto que el panel del carrito (z-index: 1050) */
  animation: fadeIn 0.3s ease;
}

.checkout-modal {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: scale(0.8) translateY(20px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* Processing State */
.processing-content {
  padding: 40px;
  text-align: center;
}

.spinner-container {
  position: relative;
  margin-bottom: 30px;
}

.payment-spinner {
  width: 80px;
  height: 80px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.payment-icons i {
  font-size: 24px;
  color: #ddd;
  animation: iconPulse 2s ease-in-out infinite;
}

.payment-icons i:nth-child(1) {
  animation-delay: 0s;
}

.payment-icons i:nth-child(2) {
  animation-delay: 0.5s;
}

.success-icon {
  color: #27ae60 !important;
  animation: iconSuccess 0.5s ease-in-out 3s forwards !important;
}

.processing-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.processing-subtitle {
  color: #666;
  margin-bottom: 20px;
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #27ae60);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Success State */
.success-content {
  padding: 40px;
  text-align: center;
  position: relative;
}

.success-animation {
  position: relative;
  margin-bottom: 30px;
}

.checkmark-container {
  position: relative;
  z-index: 2;
}

.checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #27ae60;
  fill: none;
  animation: checkmarkCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #27ae60;
  stroke-width: 3;
  animation: checkmarkCheck 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: confettiFall linear infinite;
}

.success-title {
  font-size: 1.8rem;
  color: #27ae60;
  margin-bottom: 15px;
}

.success-message {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.order-summary {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-weight: 600;
}

.summary-item i {
  color: var(--primary-color);
  width: 20px;
}

.success-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Checkout Form */
.checkout-content {
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  padding: 25px 25px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 25px;
}

.modal-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.checkout-body {
  padding: 0 25px;
}

.order-preview {
  margin-bottom: 25px;
}

.order-preview h4 {
  margin-bottom: 15px;
  color: #333;
}

.items-preview {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.item-preview {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-thumb {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.item-quantity {
  font-size: 0.8rem;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: var(--primary-color);
}

.total-row {
  text-align: right;
  font-size: 1.2rem;
  color: #333;
  padding-top: 10px;
  border-top: 2px solid var(--primary-color);
}

/* Payment Methods */
.payment-methods h4 {
  margin-bottom: 15px;
  color: #333;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
}

.payment-option:hover {
  border-color: var(--primary-color);
  background: rgba(0, 123, 255, 0.05);
}

.payment-option.active {
  border-color: var(--primary-color);
  background: rgba(0, 123, 255, 0.1);
}

.payment-option input {
  display: none;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-content i {
  font-size: 20px;
  color: var(--primary-color);
  width: 30px;
}

/* Modal Footer */
.modal-footer {
  padding: 25px;
  border-top: 1px solid #eee;
  text-align: center;
}

.pay-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color), #28a745);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
}

.pay-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.security-note {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.continue-btn, .receipt-btn {
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn {
  background: var(--primary-color);
  color: white;
}

.receipt-btn {
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes iconPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes iconSuccess {
  0% { transform: scale(1.1); }
  100% { transform: scale(1.3); opacity: 1; }
}

@keyframes checkmarkCircle {
  0% { stroke-dashoffset: 166; }
  100% { stroke-dashoffset: 0; }
}

@keyframes checkmarkCheck {
  0% { stroke-dashoffset: 48; }
  100% { stroke-dashoffset: 0; }
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .checkout-modal {
    width: 95vw;
    margin: 20px;
    border-radius: 15px;
  }
  
  .modal-header, .checkout-body, .modal-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .processing-content, .success-content {
    padding: 30px 20px;
  }
  
  .success-actions {
    gap: 15px;
  }
  
  .payment-option {
    padding: 12px;
  }
  
  .option-content i {
    font-size: 18px;
  }
}

/* ScrollBar para items preview */
.items-preview::-webkit-scrollbar {
  width: 4px;
}

.items-preview::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.items-preview::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}
</style>
