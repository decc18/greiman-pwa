<template>
  <div id="app">
    <!-- Router view para diferentes páginas -->
    <router-view></router-view>
    
    <!-- PWA Installation Popup -->
    <PWAInstallPopup />
    
    <!-- Shopping Cart -->
    <ShoppingCart />
  </div>
</template>

<script>
import PWAInstallPopup from './components/PWAInstallPopup.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { cartStore } from './stores/cartStore.js'

export default {
  name: 'App',
  components: {
    PWAInstallPopup,
    ShoppingCart
  },
  data() {
    return {
      cartStore
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  background: white;
  position: relative;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Estilos globales para la integración con Bootstrap */
:deep(.container) {
  max-width: 1200px;
}

:deep(.section) {
  padding: 80px 0;
}

:deep(.text-center) {
  text-align: center;
}
</style>
