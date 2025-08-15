<template>
  <div v-if="isVisible" class="pdf-modal-overlay" @click="closeModal">
    <div class="pdf-modal-container" @click.stop>
      <div class="pdf-modal-header">
        <h3 class="modal-title">
          <i class="fa fa-file-pdf-o me-2"></i>
          {{ title }}
        </h3>
        <button @click="closeModal" class="control-btn close-btn" title="Cerrar">
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <div class="pdf-modal-content">
        <!-- Información del PDF -->
        <div class="pdf-info-section">
          <div class="pdf-icon">
            <i class="fa fa-file-pdf-o"></i>
          </div>
          <div class="pdf-details">
            <h4>{{ fileName }}</h4>
            <p>Catálogo completo con especificaciones técnicas, medidas y aplicaciones del producto.</p>
          </div>
        </div>
        
        <!-- Opciones de visualización -->
        <div class="pdf-options">
          <button @click="openInNewTab" class="option-btn primary">
            <i class="fa fa-external-link"></i>
            <div class="btn-content">
              <span>Ver Catálogo PDF</span>
              <small>Abrir en nueva pestaña</small>
            </div>
          </button>
          
          <button @click="downloadPDF" class="option-btn secondary">
            <i class="fa fa-download"></i>
            <div class="btn-content">
              <span>Descargar PDF</span>
              <small>Guardar en dispositivo</small>
            </div>
          </button>
        </div>
        
        <!-- Información adicional -->
        <div class="pdf-features">
          <div class="feature-item">
            <i class="fa fa-info-circle"></i>
            <span>Especificaciones técnicas completas</span>
          </div>
          <div class="feature-item">
            <i class="fa fa-image"></i>
            <span>Imágenes de alta calidad</span>
          </div>
          <div class="feature-item">
            <i class="fa fa-ruler"></i>
            <span>Medidas y dimensiones</span>
          </div>
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
  computed: {
    fileName() {
      const path = this.pdfPath.split('/')
      return path[path.length - 1]
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    openInNewTab() {
      // Abrir PDF en nueva pestaña - método más confiable
      window.open(this.pdfPath, '_blank', 'noopener,noreferrer')
    },
    
    downloadPDF() {
      // Crear enlace de descarga
      const link = document.createElement('a')
      link.href = this.pdfPath
      link.download = this.fileName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },
  
  // Auto-abrir PDF cuando se muestra el modal (opcional)
  
}
</script>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.pdf-modal-container {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.pdf-modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Montserrat', serif;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.pdf-modal-content {
  padding: 2rem;
}

.pdf-info-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
}

.pdf-icon {
  font-size: 3rem;
  color: var(--primary-color);
}

.pdf-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--secondary-color);
  font-weight: 600;
  font-family: 'Montserrat', serif;
}

.pdf-details p {
  margin: 0;
  color: #666;
  line-height: 1.4;
  font-family: 'Montserrat', serif;
}

.pdf-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-family: 'Montserrat', serif;
  position: relative;
  overflow: hidden;
}

.option-btn.primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.option-btn.secondary {
  background: #f8f9fa;
  color: var(--secondary-color);
  border: 2px solid var(--primary-color);
}

.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.option-btn.primary:hover {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
}

.option-btn.secondary:hover {
  background: var(--primary-color);
  color: white;
}

.option-btn i {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.btn-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.btn-content span {
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-content small {
  opacity: 0.8;
  font-size: 0.9rem;
}

.pdf-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(0, 130, 150, 0.05);
  border-radius: 8px;
  font-family: 'Montserrat', serif;
}

.feature-item i {
  color: var(--primary-color);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.feature-item span {
  color: #666;
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pdf-modal-container {
    width: 95%;
    margin: 1rem;
  }
  
  .pdf-modal-header {
    padding: 1.5rem 1.5rem 0.75rem;
  }
  
  .modal-title {
    font-size: 1.3rem;
  }
  
  .pdf-modal-content {
    padding: 1.5rem;
  }
  
  .pdf-info-section {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem;
  }
  
  .pdf-icon {
    font-size: 2.5rem;
  }
  
  .option-btn {
    padding: 1.25rem;
    justify-content: center;
  }
  
  .option-btn i {
    font-size: 1.8rem;
  }
  
  .btn-content span {
    font-size: 1.05rem;
  }
}

@media (max-width: 480px) {
  .pdf-modal-header {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
  
  .pdf-modal-content {
    padding: 1rem;
  }
  
  .close-btn {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
