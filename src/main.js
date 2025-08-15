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

// Check if app is launched from URL after installation
function checkLaunchFromURL() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                      window.navigator.standalone ||
                      document.referrer.includes('android-app://')
  
  const hasInstallParam = new URLSearchParams(window.location.search).has('utm_source')
  const isFromURL = document.referrer && !isStandalone
  
  console.log('Launch detection:', {
    isStandalone,
    hasInstallParam,
    isFromURL,
    referrer: document.referrer,
    search: window.location.search
  })
  
  if (isStandalone) {
    console.log('App launched in standalone mode')
    localStorage.setItem('pwa-installed', 'true')
  }
}

// Run launch detection
checkLaunchFromURL()

createApp(App).use(router).mount('#app')
