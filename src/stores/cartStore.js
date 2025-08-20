import { reactive } from 'vue'

// Store reactivo para el carrito de compras
export const cartStore = reactive({
  items: [],
  isVisible: false,
  
  // Agregar producto al carrito
  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += (product.quantity || 1)
    } else {
      this.items.push({
        ...product,
        quantity: product.quantity || 1,
        addedAt: new Date()
      })
    }
    
    // Guardar en localStorage
    this.saveToStorage()
  },
  
  // Remover producto del carrito
  removeItem(productId) {
    const index = this.items.findIndex(item => item.id === productId)
    if (index > -1) {
      this.items.splice(index, 1)
      this.saveToStorage()
    }
  },
  
  // Actualizar cantidad de un producto
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId)
      } else {
        item.quantity = quantity
        this.saveToStorage()
      }
    }
  },
  
  // Vaciar carrito
  clearCart() {
    this.items = []
    this.saveToStorage()
  },
  
  // Calcular total del carrito
  get total() {
    return this.items.reduce((sum, item) => {
      return sum + (item.currentPrice * item.quantity)
    }, 0)
  },
  
  // Obtener cantidad total de items
  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  },
  
  // Mostrar/ocultar carrito
  toggleCart() {
    this.isVisible = !this.isVisible
  },
  
  showCart() {
    this.isVisible = true
  },
  
  hideCart() {
    this.isVisible = false
  },
  
  // Guardar en localStorage
  saveToStorage() {
    try {
      localStorage.setItem('greiman-cart', JSON.stringify(this.items))
    } catch (error) {
      console.warn('No se pudo guardar el carrito en localStorage:', error)
    }
  },
  
  // Cargar desde localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('greiman-cart')
      if (stored) {
        this.items = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('No se pudo cargar el carrito desde localStorage:', error)
      this.items = []
    }
  }
})

// Cargar datos al inicializar
cartStore.loadFromStorage()
