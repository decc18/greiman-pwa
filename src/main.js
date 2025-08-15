import { createApp } from 'vue'
import './style.css'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a prompt to user to refresh the app
    if (confirm('Nueva versión disponible. ¿Quieres actualizar?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
    // Show a message that the app is ready to work offline
  },
  onRegistered(r) {
    console.log('SW Registered: ' + r)
  },
  onRegisterError(error) {
    console.log('SW registration error', error)
  }
})

createApp(App).use(router).mount('#app')
