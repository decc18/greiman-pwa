<template>
  <!-- Install Popup -->
  <div 
    class="install-popup-overlay" 
    v-if="showPopup && (pwaInstaller.canInstall() || pwaInstaller.isIOS)" 
    @click="closePopup"
    role="dialog"
    aria-labelledby="install-title"
    aria-modal="true"
  >
    <div class="install-popup" @click.stop>
      <button class="popup-close" @click="closePopup" aria-label="Cerrar ventana">
        <i class="fa fa-times"></i>
      </button>
      
      <div class="popup-content">
        <div class="popup-icon">
          <img src="/pwa-192x192.png" alt="Icono Graiman PWA" />
        </div>
        
        <h3 id="install-title" class="popup-title">¡Instala Graiman PWA!</h3>
        
        <p class="popup-description">
          Accede rápidamente a nuestros productos desde tu dispositivo. 
          La aplicación funciona sin conexión y ocupa poco espacio.
        </p>
        
        <div class="popup-features">
          <div class="feature-item">
            <i class="fa fa-bolt"></i>
            <span>Acceso rápido</span>
          </div>
          <div class="feature-item">
            <i class="fa fa-wifi"></i>
            <span>Funciona sin internet</span>
          </div>
          <div class="feature-item">
            <i class="fa fa-mobile"></i>
            <span>Experiencia nativa</span>
          </div>
        </div>
        
        <div class="popup-actions">
          <button 
            class="btn-install" 
            @click="installPWA" 
            :disabled="isInstalling || (!pwaInstaller.canInstall() && !pwaInstaller.isIOS)"
          >
            <i class="fa fa-download" v-if="!isInstalling"></i>
            <i class="fa fa-spinner fa-spin" v-if="isInstalling"></i>
            {{ getInstallButtonText() }}
          </button>
          <button class="btn-later" @click="remindLater" :disabled="isInstalling">
            Recordar más tarde
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Instructions Modal -->
  <div 
    class="install-popup-overlay" 
    v-if="showInstructions" 
    @click="closeInstructions"
    role="dialog"
    aria-labelledby="instructions-title"
    aria-modal="true"
  >
    <div class="install-popup instructions-modal" @click.stop>
      <button class="popup-close" @click="closeInstructions" aria-label="Cerrar instrucciones">
        <i class="fa fa-times"></i>
      </button>
      
      <div class="popup-content">
        <div class="instructions-icon">
          <i class="fa fa-mobile fa-3x"></i>
        </div>
        
        <h3 id="instructions-title" class="popup-title">{{ instructions?.title }}</h3>
        
        <div class="instructions-list" v-if="instructions">
          <div 
            class="instruction-step" 
            v-for="(step, index) in instructions.steps" 
            :key="index"
          >
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>
        
        <div class="popup-actions">
          <button class="btn-install" @click="closeInstructions">
            <i class="fa fa-check"></i>
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pwaInstaller, PWAInstaller } from '../utils/pwaInstaller.js'

export default {
  name: 'PWAInstallPopup',
  data() {
    return {
      showPopup: false,
      showInstructions: false,
      instructions: null,
      isInstalling: false,
      pwaInstaller, // Make pwaInstaller available in template
      PWAInstaller // Make PWAInstaller class available in template
    }
  },
  mounted() {
    this.checkInstallability()
    this.setupEventListeners()
  },
  beforeUnmount() {
    this.removeEventListeners()
  },
  methods: {
    checkInstallability() {
      // Don't show if already installed or should not show
      if (pwaInstaller.isStandalone || !PWAInstaller.shouldShowPopup()) {
        return
      }
      
      // For better user experience, wait for the page to be fully loaded
      if (document.readyState !== 'complete') {
        window.addEventListener('load', () => {
          setTimeout(() => this.showPopupIfReady(), 3000)
        })
      } else {
        setTimeout(() => this.showPopupIfReady(), 3000)
      }
    },

    showPopupIfReady() {
      if (!pwaInstaller.isInstalled && !pwaInstaller.isStandalone) {
        this.showPopup = true
        PWAInstaller.setLastShown()
      }
    },
    
    setupEventListeners() {
      window.addEventListener('pwa-canInstall', this.onCanInstall)
      window.addEventListener('pwa-installed', this.onInstalled)
      window.addEventListener('pwa-showInstructions', this.onShowInstructions)
    },

    removeEventListeners() {
      window.removeEventListener('pwa-canInstall', this.onCanInstall)
      window.removeEventListener('pwa-installed', this.onInstalled)
      window.removeEventListener('pwa-showInstructions', this.onShowInstructions)
    },
    
    onCanInstall(event) {
      console.log('PWA can be installed', event.detail)
    },

    onInstalled(event) {
      console.log('PWA was installed', event.detail)
      this.closePopup()
      PWAInstaller.setDismissed()
    },

    onShowInstructions(event) {
      const { platform, instructions } = event.detail
      this.instructions = instructions
      this.showInstructions = true
      console.log(`Showing ${platform} instructions`, instructions)
    },
    
    async installPWA() {
      if (this.isInstalling) return
      
      this.isInstalling = true
      
      try {
        console.log('Attempting PWA installation...')
        console.log('Deferred prompt available:', !!pwaInstaller.deferredPrompt)
        console.log('Can install:', pwaInstaller.canInstall())
        console.log('Is iOS:', pwaInstaller.isIOS)
        console.log('Is standalone:', pwaInstaller.isStandalone)
        
        // Force try installation - the utility will handle fallbacks
        const result = await pwaInstaller.install()
        console.log('Installation result:', result)
        
        if (result.success) {
          if (result.outcome === 'accepted') {
            // Installation was successful
            PWAInstaller.setDismissed()
            this.closePopup()
            this.showSuccessMessage()
            return
          } else if (result.outcome === 'dismissed') {
            // User dismissed the native install prompt
            console.log('User dismissed native install prompt')
            this.closePopup()
            return
          }
        }
        
        // Only show instructions if absolutely necessary (iOS or complete failure)
        if (result.instructions) {
          console.log('Showing installation instructions as fallback')
          // Instructions will be shown via event listener
        } else {
          // If no instructions and no success, just close
          this.closePopup()
        }
        
      } catch (error) {
        console.error('Installation error:', error)
        // Try to close popup instead of showing error
        this.closePopup()
      } finally {
        this.isInstalling = false
      }
    },
    
    showSuccessMessage() {
      // Optional: show success message
      console.log('PWA installation successful!')
    },
    
    showErrorMessage() {
      console.error('PWA installation failed. Please try again.')
      // Optional: show error message to user
    },
    
    remindLater() {
      PWAInstaller.setRemindLater()
      this.closePopup()
    },
    
    getInstallButtonText() {
      if (this.isInstalling) {
        return 'Instalando...'
      }
      
      // Check if we can do direct installation
      if (pwaInstaller.deferredPrompt && !pwaInstaller.isIOS) {
        return 'Instalar Aplicación'
      }
      
      // Default text for all cases
      return 'Instalar Aplicación'
    },

    closePopup() {
      this.showPopup = false
      this.showInstructions = false
      this.instructions = null
    },

    closeInstructions() {
      this.showInstructions = false
      this.instructions = null
    }
  }
}
</script>

<style scoped>
.install-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.install-popup {
  background: white !important;
  color: #333 !important;
  border-radius: 20px;
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

.popup-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  transition: all 0.2s ease;
}

.popup-close:hover {
  background: rgba(0, 0, 0, 0.2);
  color: #333;
}

.popup-content {
  padding: 2rem;
  text-align: center;
}

.popup-icon {
  margin-bottom: 1.5rem;
}

.popup-icon img {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Responsive icon for mobile */
@media (max-width: 480px) {
  .popup-icon img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
  }
}

.popup-title {
  font-family: 'Montserrat', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color, #008296) !important;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.popup-description {
  font-family: 'Montserrat', serif;
  font-size: 1.2rem;
  color: #666 !important;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.popup-features {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #555 !important;
  font-family: 'Montserrat', serif;
  min-width: 80px;
}

.feature-item i {
  color: var(--primary-color, #008296);
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.popup-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-install {
  background: linear-gradient(135deg, var(--primary-color, #008296) 0%, var(--secondary-color, #0f1e2c) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Montserrat', serif;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-install:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 130, 150, 0.3);
}

.btn-install i {
  font-size: 1.1rem;
}

.btn-later {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: 'Montserrat', serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-later:hover {
  background: #f5f5f5;
  color: #333;
  border-color: #ccc;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .install-popup {
    width: 95%;
    border-radius: 16px;
  }
  
  .popup-content {
    padding: 2rem 1.5rem;
  }
  
  .popup-title {
    font-size: 2rem !important;
    margin-bottom: 1.5rem;
  }
  
  .popup-description {
    font-size: 1.3rem !important;
    margin-bottom: 2rem;
  }
  
  .popup-features {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .feature-item {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    min-width: auto;
    font-size: 1.1rem !important;
    padding: 0.5rem 0;
  }
  
  .feature-item i {
    font-size: 1.5rem !important;
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .btn-install {
    font-size: 1.3rem !important;
    padding: 1.2rem 2rem;
    font-weight: 700;
  }

  .btn-later {
    font-size: 1.2rem !important;
    padding: 1rem 2rem;
  }
  
  .popup-actions {
    gap: 1rem;
  }
}

/* Dark mode support - Force light mode for consistency */
@media (prefers-color-scheme: dark) {
  .install-popup {
    background: white !important;
    color: #333 !important;
  }
  
  .popup-title {
    color: var(--primary-color, #008296) !important;
  }
  
  .popup-description {
    color: #666 !important;
  }
  
  .feature-item {
    color: #555 !important;
  }
  
  .step-text {
    color: #333 !important;
  }
  
  .btn-later {
    color: #666 !important;
    border-color: #ddd !important;
    background: transparent !important;
  }
  
  .btn-later:hover {
    background: #f5f5f5 !important;
    color: #333 !important;
    border-color: #ccc !important;
  }
}
/* Instructions Modal Styles */
.instructions-modal {
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.instructions-icon {
  text-align: center;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.instructions-list {
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
}

.instruction-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(82, 164, 73, 0.05);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.step-number {
  background: var(--primary-color);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-text {
  line-height: 1.5;
  color: #333 !important;
  font-size: 16px;
  font-family: 'Montserrat', serif;
}

/* Responsive adjustments for instructions */
@media (max-width: 768px) {
  .instructions-modal {
    max-height: 75vh;
    margin: 10px;
    max-width: calc(100vw - 20px);
  }
  
  .instructions-icon i {
    font-size: 2.5rem !important;
  }
  
  .popup-title {
    font-size: 1.8rem !important;
  }
  
  .instruction-step {
    padding: 12px;
    margin-bottom: 15px;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: 16px;
    margin-right: 18px;
  }
  
  .step-text {
    font-size: 17px !important;
    line-height: 1.6;
  }
  
  .btn-install {
    font-size: 1.2rem !important;
    padding: 1rem 2rem;
  }
}

@media (max-width: 480px) {
  .instructions-modal .popup-title {
    font-size: 2rem !important;
  }
  
  .instructions-icon i {
    font-size: 3rem !important;
  }
  
  .instruction-step {
    padding: 15px;
    margin-bottom: 18px;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 18px;
    margin-right: 20px;
  }
  
  .step-text {
    font-size: 18px !important;
    line-height: 1.6;
  }
  
  .instructions-modal .btn-install {
    font-size: 1.3rem !important;
    padding: 1.2rem 2rem;
  }
}
</style>
