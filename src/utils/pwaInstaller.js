// PWA Installation utilities
export class PWAInstaller {
  constructor() {
    this.deferredPrompt = null
    this.isInstalled = false
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       window.navigator.standalone || 
                       document.referrer.includes('android-app://')
    
    // Check if PWA meets installability criteria
    this.isPWAInstallable = this.checkPWAInstallability()
    
    this.init()
  }

  checkPWAInstallability() {
    // Basic PWA installability checks
    const hasServiceWorker = 'serviceWorker' in navigator
    const hasManifest = document.querySelector('link[rel="manifest"]') !== null
    const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost'
    
    console.log('PWA Installability checks:')
    console.log('- Service Worker support:', hasServiceWorker)
    console.log('- Manifest present:', hasManifest)
    console.log('- HTTPS/localhost:', isHTTPS)
    
    return hasServiceWorker && hasManifest && isHTTPS
  }

  init() {
    // Listen for the beforeinstallprompt event immediately
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event fired')
      e.preventDefault()
      this.deferredPrompt = e
      this.dispatchEvent('canInstall', { canInstall: true })
    })

    // Also listen on document ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupInstallPromptListener()
      })
    } else {
      this.setupInstallPromptListener()
    }

    // Listen for the appinstalled event
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA was installed')
      this.isInstalled = true
      this.deferredPrompt = null
      this.dispatchEvent('installed', { installed: true })
    })

    // Check if already installed
    if (this.isStandalone) {
      this.isInstalled = true
      console.log('PWA is already installed')
    }
  }

  setupInstallPromptListener() {
    // Additional setup for catching install prompts that might be delayed
    setTimeout(() => {
      if (!this.deferredPrompt && !this.isIOS && !this.isInstalled) {
        console.log('Checking for delayed install prompt availability...')
        this.checkInstallAvailability()
      }
    }, 1000)
  }

  checkInstallAvailability() {
    // Force check for PWA installability
    if ('BeforeInstallPromptEvent' in window) {
      console.log('BeforeInstallPromptEvent is supported')
    }
    
    // Check if the app meets PWA criteria
    if (this.isPWAInstallable && !this.isInstalled) {
      console.log('PWA meets installability criteria')
    }
  }

  async install() {
    console.log('Install method called')
    console.log('Can install:', this.canInstall())
    console.log('Is iOS:', this.isIOS)
    console.log('Deferred prompt:', this.deferredPrompt)
    
    // Try direct installation first
    if (this.deferredPrompt && !this.isInstalled) {
      try {
        console.log('Showing install prompt...')
        const result = await this.deferredPrompt.prompt()
        const outcome = result.outcome
        
        console.log('Install prompt result:', outcome)
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt')
          return { success: true, outcome }
        } else {
          console.log('User dismissed the install prompt')
          return { success: false, outcome }
        }
      } catch (error) {
        console.error('Error during installation:', error)
        return { success: false, error }
      } finally {
        this.deferredPrompt = null
      }
    }
    
    // If no deferred prompt, wait a bit and try to trigger installability
    if (!this.deferredPrompt && !this.isIOS) {
      console.log('No deferred prompt available, attempting to trigger installability...')
      
      // Wait for potential delayed beforeinstallprompt event
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.log('Timeout waiting for install prompt')
          // Only show instructions as absolute last resort
          resolve(this.showGenericInstructions())
        }, 2000)
        
        const handleBeforeInstallPrompt = async (e) => {
          clearTimeout(timeout)
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
          
          e.preventDefault()
          this.deferredPrompt = e
          
          try {
            const result = await this.deferredPrompt.prompt()
            resolve({ success: true, outcome: result.outcome })
          } catch (error) {
            resolve({ success: false, error })
          } finally {
            this.deferredPrompt = null
          }
        }
        
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      })
    }
    
    // For iOS devices, show instructions only as last resort
    if (this.isIOS) {
      console.log('iOS device detected, showing installation instructions')
      return this.showIOSInstructions()
    }
    
    // Absolute fallback
    console.log('No installation method available, showing generic instructions')
    return this.showGenericInstructions()
  }

  canInstall() {
    return this.deferredPrompt !== null && !this.isInstalled
  }

  showIOSInstructions() {
    const instructions = {
      title: 'Instalar en iOS',
      steps: [
        'Toca el botón de "Compartir" (⬆️) en Safari',
        'Desplázate y selecciona "Agregar a pantalla de inicio"',
        'Toca "Agregar" para confirmar la instalación'
      ]
    }
    
    this.dispatchEvent('showInstructions', { platform: 'iOS', instructions })
    return { success: true, instructions }
  }

  showGenericInstructions() {
    const isChrome = /Chrome/.test(navigator.userAgent)
    const isFirefox = /Firefox/.test(navigator.userAgent)
    const isEdge = /Edg/.test(navigator.userAgent)
    
    let instructions
    
    if (isChrome || isEdge) {
      instructions = {
        title: 'Instalar aplicación',
        steps: [
          'Busca el icono de "Instalar" en la barra de direcciones',
          'O abre el menú del navegador (⋮) → "Instalar Graiman PWA"',
          'Sigue las instrucciones para completar la instalación',
          'La aplicación aparecerá en tu pantalla de inicio'
        ]
      }
    } else if (isFirefox) {
      instructions = {
        title: 'Instalar aplicación',
        steps: [
          'Abre el menú del navegador (☰)',
          'Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"',
          'Confirma la instalación',
          'La aplicación estará disponible desde tu pantalla de inicio'
        ]
      }
    } else {
      instructions = {
        title: 'Instalar aplicación',
        steps: [
          'Abre el menú de tu navegador',
          'Busca "Instalar aplicación" o "Agregar a pantalla de inicio"',
          'Sigue las instrucciones para completar la instalación',
          'Reinicia el navegador si es necesario'
        ]
      }
    }
    
    this.dispatchEvent('showInstructions', { platform: 'generic', instructions })
    return { success: true, instructions }
  }

  dispatchEvent(eventName, detail) {
    const event = new CustomEvent(`pwa-${eventName}`, { detail })
    window.dispatchEvent(event)
  }

  // Storage helpers for popup management
  static getLastShown() {
    return localStorage.getItem('pwa-popup-last-shown')
  }

  static setLastShown() {
    localStorage.setItem('pwa-popup-last-shown', Date.now().toString())
  }

  static getRemindLater() {
    return localStorage.getItem('pwa-popup-remind-later')
  }

  static setRemindLater() {
    localStorage.setItem('pwa-popup-remind-later', Date.now().toString())
  }

  static isDismissed() {
    return localStorage.getItem('pwa-popup-dismissed') === 'true'
  }

  static setDismissed() {
    localStorage.setItem('pwa-popup-dismissed', 'true')
  }

  static clearStorage() {
    localStorage.removeItem('pwa-popup-last-shown')
    localStorage.removeItem('pwa-popup-remind-later')
    localStorage.removeItem('pwa-popup-dismissed')
  }

  // Timing helpers
  static shouldShowPopup() {
    const dismissed = PWAInstaller.isDismissed()
    if (dismissed) return false

    const lastShown = PWAInstaller.getLastShown()
    const remindLater = PWAInstaller.getRemindLater()
    
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const threeDays = 3 * oneDay

    // Don't show if shown in last 3 days
    if (lastShown && (now - parseInt(lastShown)) < threeDays) {
      return false
    }

    // Don't show if remind later was set less than 1 day ago
    if (remindLater && (now - parseInt(remindLater)) < oneDay) {
      return false
    }

    return true
  }
}

// Create global instance
export const pwaInstaller = new PWAInstaller()
