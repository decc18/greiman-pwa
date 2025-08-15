<template>
  <div id="app">
    <!-- Router view para diferentes páginas -->
    <router-view></router-view>
    
    <!-- PWA Install Popup -->
    <PWAInstallPopup />
  </div>
</template>

<script>
import PWAInstallPopup from './components/PWAInstallPopup.vue'

export default {
  name: 'App',
  components: {
    PWAInstallPopup
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
