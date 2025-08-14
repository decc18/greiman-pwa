<template>
  <div 
    v-if="showInstallPrompt" 
    class="pwa-install-footer"
    :class="{ 'show': showInstallPrompt }"
  >
    <div class="install-content">
      <div class="install-info">
        <i class="fa fa-mobile-alt install-icon"></i>
        <div class="install-text">
          <strong>¡Instala Greiman App!</strong>
          <span>Accede rápidamente desde tu pantalla de inicio</span>
        </div>
      </div>
      <div class="install-actions">
        <button @click="installPWA" class="btn-install">
          <i class="fa fa-download"></i>
          Instalar
        </button>
        <button @click="dismissInstall" class="btn-dismiss">
          <i class="fa fa-times"></i>
        </button>
        <!-- Botón de debug - solo en desarrollo -->
        <button v-if="isDevelopment" @click="resetInstallPrompt" class="btn-debug" title="Reset para pruebas">
          <i class="fa fa-redo"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstallPWAFooter',
  data() {
    return {
      deferredPrompt: null,
      showInstallPrompt: false,
      isDevelopment: import.meta.env.DEV
    }
  },
  methods: {
    async installPWA() {
      if (this.deferredPrompt) {
        try {
          // Mostrar el prompt de instalación
          this.deferredPrompt.prompt()
          
          // Esperar por la respuesta del usuario
          const { outcome } = await this.deferredPrompt.userChoice
          
          console.log(`User response to the install prompt: ${outcome}`)
          
          // Limpiar el prompt diferido
          this.deferredPrompt = null
          this.showInstallPrompt = false
          
          // Guardar que el usuario ya interactuó con el prompt
          localStorage.setItem('pwa-install-dismissed', 'true')
        } catch (error) {
          console.error('Error during PWA installation:', error)
          this.showManualInstructions()
        }
      } else {
        // Intentar detectar el navegador y mostrar instrucciones específicas
        this.showManualInstructions()
      }
    },
    
    showManualInstructions() {
      const isChrome = /Chrome/.test(navigator.userAgent)
      const isFirefox = /Firefox/.test(navigator.userAgent)
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
      const isEdge = /Edg/.test(navigator.userAgent)
      
      let instructions = 'Para instalar esta aplicación:\n\n'
      
      if (isChrome || isEdge) {
        instructions += '1. Busca el icono de instalación (⊕) en la barra de direcciones\n'
        instructions += '2. O ve a Menú (⋮) → "Instalar Greiman App"\n'
        instructions += '3. También puedes usar Ctrl+Shift+A'
      } else if (isFirefox) {
        instructions += '1. Ve al Menú (≡) → "Instalar esta aplicación"\n'
        instructions += '2. O busca el icono de instalación en la barra de direcciones'
      } else if (isSafari) {
        instructions += '1. Toca el botón Compartir (⎋)\n'
        instructions += '2. Selecciona "Agregar a pantalla de inicio"\n'
        instructions += '3. Confirma la instalación'
      } else {
        instructions += '1. Busca la opción "Instalar aplicación" en el menú del navegador\n'
        instructions += '2. O busca el icono de instalación en la barra de direcciones'
      }
      
      alert(instructions)
      this.showInstallPrompt = false
      localStorage.setItem('pwa-install-dismissed', 'true')
    },
    
    dismissInstall() {
      this.showInstallPrompt = false
      // Guardar que el usuario descartó el prompt
      localStorage.setItem('pwa-install-dismissed', 'true')
    },
    
    handleBeforeInstallPrompt(e) {
      console.log('beforeinstallprompt event fired')
      // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
      e.preventDefault()
      
      // Guardar el evento para poder triggerearlo después
      this.deferredPrompt = e
      
      // Verificar si el usuario ya descartó el prompt anteriormente
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      
      // Mostrar el banner de instalación solo si no fue descartado previamente
      if (!dismissed) {
        setTimeout(() => {
          this.showInstallPrompt = true
        }, 1000) // Mostrar después de 1 segundo
      }
    },
    
    handleAppInstalled() {
      console.log('PWA was installed')
      this.showInstallPrompt = false
      // Limpiar el storage ya que la app está instalada
      localStorage.removeItem('pwa-install-dismissed')
    },
    
    // Método para testing - eliminar en producción
    resetInstallPrompt() {
      localStorage.removeItem('pwa-install-dismissed')
      this.showInstallPrompt = true
      console.log('Install prompt reset for testing')
      console.log('DeferredPrompt available:', !!this.deferredPrompt)
      console.log('Is HTTPS:', location.protocol === 'https:')
      console.log('Is localhost:', location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      console.log('Display mode:', window.matchMedia('(display-mode: standalone)').matches)
    }
  },
  
  mounted() {
    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt)
    
    // Escuchar cuando la app es instalada
    window.addEventListener('appinstalled', this.handleAppInstalled)
    
    // Verificar si la app ya está instalada o ejecutándose como PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      console.log('App is running as PWA, hiding install prompt')
      this.showInstallPrompt = false
      return
    }
    
    // Verificar que estemos en HTTPS o localhost para PWA
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    
    if (!isSecure) {
      console.log('PWA requires HTTPS or localhost')
      return
    }
    
    // Verificar si el usuario ya descartó el prompt anteriormente
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    
    if (!dismissed) {
      // Mostrar después de 3 segundos para dar tiempo a que se cargue el evento beforeinstallprompt
      setTimeout(() => {
        // Si después de 3 segundos no tenemos deferredPrompt, mostrar de todas formas
        if (!this.deferredPrompt) {
          console.log('No beforeinstallprompt event detected, showing manual install option')
        }
        this.showInstallPrompt = true
        console.log('PWA Install footer displayed')
      }, 3000)
    } else {
      console.log('Install prompt was previously dismissed')
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', this.handleAppInstalled)
  }
}
</script>

<style scoped>
.pwa-install-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, var(--primary-color), #00a3bb);
  color: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 1050;
  font-family: 'Montserrat', sans-serif;
}

.pwa-install-footer.show {
  transform: translateY(0);
}

.install-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  max-width: 100%;
}

.install-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.install-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  color: white;
}

.install-text {
  display: flex;
  flex-direction: column;
}

.install-text strong {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.install-text span {
  font-size: 0.85rem;
  opacity: 0.9;
}

.install-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-install {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-install:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-dismiss {
  background: transparent;
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-dismiss:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-debug {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.btn-debug:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .install-content {
    padding: 0.75rem 1rem;
  }
  
  .install-icon {
    font-size: 1.3rem;
    margin-right: 0.75rem;
  }
  
  .install-text strong {
    font-size: 0.9rem;
  }
  
  .install-text span {
    font-size: 0.8rem;
  }
  
  .btn-install {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .btn-dismiss {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 576px) {
  .install-text span {
    display: none;
  }
  
  .install-content {
    padding: 0.6rem 0.8rem;
  }
  
  .btn-install {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
