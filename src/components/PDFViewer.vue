<template>
  <div v-if="isVisible" class="pdf-modal-overlay" @click="closeModal">
    <div class="pdf-modal-container" @click.stop>
      <div class="pdf-modal-header">
        <h3 class="modal-title">
          <i class="fa fa-file-pdf-o me-2"></i>
          {{ title }}
        </h3>
        <div class="modal-controls">
          <button @click="zoomOut" class="control-btn" title="Alejar">
            <i class="fa fa-search-minus"></i>
          </button>
          <span class="zoom-indicator">{{ Math.round(zoomLevel * 100) }}%</span>
          <button @click="zoomIn" class="control-btn" title="Acercar">
            <i class="fa fa-search-plus"></i>
          </button>
          <button @click="downloadPDF" class="control-btn" title="Descargar">
            <i class="fa fa-download"></i>
          </button>
          <button @click="closeModal" class="control-btn close-btn" title="Cerrar">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="pdf-modal-content">
        <div class="pdf-loading" v-if="isLoading">
          <i class="fa fa-spinner fa-spin"></i>
          <p>Cargando catálogo...</p>
          <small v-if="retryCount > 0">Intento {{ retryCount + 1 }} de {{ maxRetries + 1 }}</small>
        </div>
        
        <!-- Alternativa: Mostrar siempre opciones para ver el PDF -->
        <div v-if="!isLoading" class="pdf-content-container">
          <iframe 
            v-if="!hasError"
            :src="pdfUrl"
            class="pdf-iframe"
            :style="{ transform: `scale(${zoomLevel})` }"
            @load="onPdfLoad"
            @error="onPdfError"
            ref="pdfIframe"
            frameborder="0"
            scrolling="auto"
            allow="fullscreen"
          ></iframe>
          
          <!-- Fallback: Opciones alternativas si el iframe falla -->
          <div v-if="hasError" class="pdf-fallback">
            <div class="fallback-options">
              <h4>Ver Catálogo PDF</h4>
              <p>El visor integrado no está disponible. Haz clic para abrir el catálogo:</p>
              
              <div class="option-buttons">
                <button @click="openInNewTab" class="option-btn">
                  <i class="fa fa-external-link"></i>
                  <span>Abrir Catálogo PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pdf-modal-footer">
        <div class="pdf-info">
          <span class="pdf-name">{{ fileName }}</span>
        </div>
        <div class="mobile-controls">
          <button @click="zoomOut" class="mobile-btn">
            <i class="fa fa-search-minus"></i>
          </button>
          <button @click="resetZoom" class="mobile-btn">
            <i class="fa fa-expand"></i>
          </button>
          <button @click="zoomIn" class="mobile-btn">
            <i class="fa fa-search-plus"></i>
          </button>
          <button @click="downloadPDF" class="mobile-btn">
            <i class="fa fa-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PDFViewer',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    pdfPath: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Catálogo PDF'
    }
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      zoomLevel: 1,
      minZoom: 0.5,
      maxZoom: 2.5,
      loadTimeout: null,
      retryCount: 0,
      maxRetries: 2
    }
  },
  computed: {
    pdfUrl() {
      // Intentar diferentes formas de mostrar el PDF
      const baseUrl = this.pdfPath
      // Usar el visor de PDF del navegador directamente
      return baseUrl
    },
    fileName() {
      return this.pdfPath.split('/').pop()
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.resetZoom()
    },
    zoomIn() {
      if (this.zoomLevel < this.maxZoom) {
        this.zoomLevel += 0.25
      }
    },
    zoomOut() {
      if (this.zoomLevel > this.minZoom) {
        this.zoomLevel -= 0.25
      }
    },
    resetZoom() {
      this.zoomLevel = 1
    },
    downloadPDF() {
      const link = document.createElement('a')
      link.href = this.pdfPath
      link.download = this.fileName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    retryLoad() {
      this.retryCount++
      this.isLoading = true
      this.hasError = false
      this.clearLoadTimeout()
      
      // Reinicializar el iframe
      this.$nextTick(() => {
        if (this.$refs.pdfIframe) {
          this.$refs.pdfIframe.src = this.pdfUrl
        }
        this.startLoadTimeout()
      })
    },
    startLoadTimeout() {
      this.loadTimeout = setTimeout(() => {
        if (this.isLoading) {
          console.log('PDF taking too long to load, showing alternative options')
          this.isLoading = false
          this.hasError = true
        }
      }, 6000) // 6 segundos timeout más generoso
    },
    clearLoadTimeout() {
      if (this.loadTimeout) {
        clearTimeout(this.loadTimeout)
        this.loadTimeout = null
      }
    },
    openInNewTab() {
      window.open(this.pdfPath, '_blank')
    },
    onPdfLoad() {
      this.clearLoadTimeout()
      this.isLoading = false
      this.hasError = false
      this.retryCount = 0
      console.log('PDF loaded successfully')
    },
    onPdfError() {
      this.clearLoadTimeout()
      this.isLoading = false
      this.hasError = true
      console.error('Error loading PDF')
    },
    handleKeyPress(event) {
      if (this.isVisible) {
        switch(event.key) {
          case 'Escape':
            this.closeModal()
            break
          case '+':
          case '=':
            this.zoomIn()
            break
          case '-':
            this.zoomOut()
            break
          case '0':
            this.resetZoom()
            break
        }
      }
    },
    async checkPDFAccess() {
      try {
        const response = await fetch(this.pdfPath)
        if (response.ok) {
          console.log('PDF is accessible, forcing iframe load')
          // PDF es accesible, forzar la carga del iframe
          this.isLoading = false
          this.hasError = false
          
          // Recargar el iframe si existe
          if (this.$refs.pdfIframe) {
            this.$refs.pdfIframe.src = this.pdfUrl
          }
        } else {
          console.error('PDF not found or not accessible')
          this.hasError = true
        }
      } catch (error) {
        console.error('Error checking PDF access:', error)
        this.hasError = true
      }
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.isLoading = true
        this.hasError = false
        this.retryCount = 0
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', this.handleKeyPress)
        
        // Dar tiempo para que el iframe se monte y luego iniciar el timeout
        this.$nextTick(() => {
          this.startLoadTimeout()
        })
      } else {
        this.clearLoadTimeout()
        document.body.style.overflow = ''
        window.removeEventListener('keydown', this.handleKeyPress)
      }
    }
  },
  beforeUnmount() {
    this.clearLoadTimeout()
    document.body.style.overflow = ''
    window.removeEventListener('keydown', this.handleKeyPress)
  }
}
</script>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(5px);
}

.pdf-modal-container {
  background: white;
  border-radius: 15px;
  width: 90vw;
  height: 85vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.pdf-modal-header {
  background: linear-gradient(135deg, var(--primary-color), #00a3bb);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.close-btn:hover {
  background: rgba(220, 53, 69, 0.8);
}

.zoom-indicator {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
}

.pdf-modal-content {
  flex: 1;
  position: relative;
  background: #f8f9fa;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pdf-content-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pdf-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.fallback-options {
  text-align: center;
  color: var(--secondary-color);
}

.fallback-options h4 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.fallback-options p {
  margin-bottom: 2rem;
  color: #666;
}

.option-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.option-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  min-width: 200px;
  justify-content: flex-start;
}

.option-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 130, 150, 0.3);
}

.option-btn i {
  font-size: 1.2rem;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.pdf-loading,
.pdf-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color);
  font-size: 1.1rem;
}

.pdf-loading i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.pdf-error i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #dc3545;
}

.error-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--secondary-color);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.me-2 {
  margin-right: 0.5rem;
}

.pdf-modal-footer {
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pdf-info {
  color: var(--secondary-color);
  font-size: 0.9rem;
}

.pdf-name {
  font-weight: 600;
}

.mobile-controls {
  display: none;
  gap: 0.5rem;
}

.mobile-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .pdf-modal-container {
    width: 95vw;
    height: 90vh;
    margin: 0;
  }
  
  .pdf-modal-header {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1rem;
  }
  
  .modal-controls {
    gap: 0.25rem;
  }
  
  .control-btn {
    width: 32px;
    height: 32px;
    padding: 0.4rem;
  }
  
  .zoom-indicator {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
    min-width: 45px;
  }
  
  .mobile-controls {
    display: flex;
  }
  
  .pdf-modal-footer {
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 576px) {
  .pdf-modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-controls .control-btn:not(.close-btn) {
    display: none;
  }
  
  .zoom-indicator {
    display: none;
  }
  
  .pdf-info {
    font-size: 0.8rem;
  }
  
  .mobile-btn {
    width: 32px;
    height: 32px;
  }
}
</style>
