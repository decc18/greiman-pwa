<template>
  <div id="regadera-page" class="div-container">
    <!-- Simple Header con solo logo -->
    <SimpleHeader page-title="Regadera SpaViva" />

    <!-- Product Hero Section -->
    <section class="product-hero">
      <div class="container-fluid px-0">
        <div class="row no-gutters align-items-center min-vh-100">
          <div class="col-lg-7">
            <div class="video-container">
              <video 
                ref="productVideo"
                :src="videoSrc"
                @loadedmetadata="onVideoLoaded"
                @timeupdate="onTimeUpdate"
                @ended="onVideoEnded"
                @error="onVideoError"
                loop
                autoplay
                class="product-video"
              ></video>
              
              <!-- Video Controls Overlay -->
              <div class="video-controls-overlay" :class="{ 'show-controls': showControls }">
                <div class="video-controls">
                  <button @click="togglePlayPause" class="control-btn play-pause-btn">
                    <i :class="isPlaying ? 'fa fa-pause' : 'fa fa-play'"></i>
                  </button>
                  
                  <div class="progress-container">
                    <div class="time-display">
                      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                    </div>
                    <div 
                      class="progress-bar" 
                      @click="seekTo"
                      ref="progressBar"
                    >
                      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
                    </div>
                  </div>
                  
                  <button @click="toggleMute" class="control-btn volume-btn">
                    <i :class="isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up'"></i>
                  </button>
                  
                  <button @click="toggleFullscreen" class="control-btn fullscreen-btn">
                    <i class="fa fa-expand"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-5">
            <div class="product-info">
              <div class="product-category">REGADERA DE BAÑO</div>
              <h1 class="product-title">SpaViva HandShower</h1>
              <p class="product-description">
                Revitaliza y rejuvenece tu experiencia de baño con la regadera SpaViva. 
                Diseñada con tecnología avanzada que combina funcionalidad superior 
                con elegancia contemporánea, transformando tu ducha diaria en una 
                experiencia de spa personal.
              </p>
              
              <div class="product-features">
                <div class="feature-item">
                  <i class="fa fa-tint"></i>
                  <span>Múltiples patrones de agua</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-leaf"></i>
                  <span>Ahorro de agua eficiente</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-cog"></i>
                  <span>Fácil instalación</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-star"></i>
                  <span>Acabado premium anti-calcificación</span>
                </div>
              </div>
              
              <!-- Información de Precio y Stock -->
              <ProductPricing
                :current-price="productData?.pricing.currentPrice"
                :original-price="productData?.pricing.originalPrice"
                :price-unit="productData?.pricing.unit"
                :stock-quantity="productData?.inventory.quantity"
                :stock-unit="productData?.inventory.unit"
                :features="productData?.features || []"
              />
              
              <div class="product-actions">
                <button class="btn btn-primary btn-lg">
                  <i class="fa fa-phone me-2"></i>
                  Contactar
                </button>
                <button @click="showCatalog" class="btn btn-outline-primary btn-lg">
                  <i class="fa fa-download me-2"></i>
                  Catálogo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="product-title">Beneficios SpaViva</h2>
            <p class="product-description">Transforma tu baño en una experiencia de bienestar</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-shower"></i>
              </div>
              <h4>Experiencia Revitalizante</h4>
              <p>Múltiples configuraciones de agua para una experiencia personalizada que revitaliza tu cuerpo y mente.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-recycle"></i>
              </div>
              <h4>Tecnología Eco-Friendly</h4>
              <p>Sistema de ahorro de agua que mantiene la presión perfecta mientras cuida el medio ambiente.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-diamond"></i>
              </div>
              <h4>Diseño Premium</h4>
              <p>Acabados de alta calidad con tratamiento anti-calcificación para mantener el brillo duradero.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Specifications -->
    <section class="specifications-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="product-title">Especificaciones Técnicas</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Dimensiones</h4>
              <ul>
                <li>Largo: 28 cm</li>
                <li>Diámetro: 4.5 cm</li>
                <li>Peso: 320g</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Características</h4>
              <ul>
                <li>5 patrones de agua</li>
                <li>Manguera 150 cm</li>
                <li>Soporte ajustable</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Materiales</h4>
              <ul>
                <li>ABS de alta calidad</li>
                <li>Acabado cromado</li>
                <li>Silicona anti-calcificación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- PWA Install Footer -->
    <!-- <InstallPWAFooter /> -->
    
    <!-- PDF Viewer Modal -->
    <PDFViewer 
      :isVisible="showPDFViewer"
      :pdfPath="'/pdf/porcelanato.pdf'"
      title="Catálogo SpaViva HandShower"
      @close="showPDFViewer = false"
    />
  </div>
</template>

<script>
import SimpleHeader from '../components/SimpleHeader.vue'
import InstallPWAFooter from '../components/InstallPWAFooter.vue'
import PDFViewer from '../components/PDFViewer.vue'
import ProductPricing from '../components/ProductPricing.vue'
import { getProductData } from '../data/products.js'

export default {
  name: 'Regadera',
  components: {
    SimpleHeader,
    InstallPWAFooter,
    PDFViewer,
    ProductPricing
  },
  data() {
    return {
      isPlaying: false,
      isMuted: false,
      currentTime: 0,
      duration: 0,
      showControls: false,
      controlsTimeout: null,
      showPDFViewer: false,
      hasPlayedOnce: false, // Nuevo: controlar si ya se reprodujo una vez
      productData: getProductData('regadera') // Datos del producto
    }
  },
  computed: {
    progressPercentage() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    }
  },
  computed: {
    videoSrc() {
      return `${import.meta.env.BASE_URL}video/Rejuvenate and revitalize with the SpaViva handshower..mp4`
    }
  },
  methods: {
    togglePlayPause() {
      const video = this.$refs.productVideo
      if (video) {
        if (this.isPlaying) {
          video.pause()
        } else {
          video.play()
        }
      }
    },
    toggleMute() {
      const video = this.$refs.productVideo
      if (video) {
        video.muted = !video.muted
        this.isMuted = video.muted
      }
    },
    toggleFullscreen() {
      const video = this.$refs.productVideo
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen()
        }
      }
    },
    seekTo(event) {
      const progressBar = this.$refs.progressBar
      const video = this.$refs.productVideo
      if (progressBar && video) {
        const rect = progressBar.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const percentage = clickX / rect.width
        video.currentTime = percentage * this.duration
      }
    },
    onVideoLoaded() {
      const video = this.$refs.productVideo
      if (video) {
        this.duration = video.duration
      }
    },
    onTimeUpdate() {
      const video = this.$refs.productVideo
      if (video) {
        this.currentTime = video.currentTime
        this.isPlaying = !video.paused
      }
    },
    onVideoEnded() {
      this.isPlaying = false
      // Después de la primera reproducción completa, silenciar el video
      if (!this.hasPlayedOnce) {
        this.hasPlayedOnce = true
        const video = this.$refs.productVideo
        if (video) {
          video.muted = true
          this.isMuted = true
        }
      }
    },
    onVideoError(error) {
      console.error('Error loading video:', error)
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    showVideoControls() {
      this.showControls = true
      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout)
      }
      // En móviles, mantener los controles visibles por más tiempo
      const isMobile = window.innerWidth <= 768
      const timeout = isMobile ? 5000 : 3000
      this.controlsTimeout = setTimeout(() => {
        this.showControls = false
      }, timeout)
    },
    showCatalog() {
      this.showPDFViewer = true
    }
  },
  mounted() {
    const video = this.$refs.productVideo
    if (video) {
      video.addEventListener('loadedmetadata', this.onVideoLoaded)
      video.addEventListener('timeupdate', this.onTimeUpdate)
      video.addEventListener('ended', this.onVideoEnded)
      video.addEventListener('error', this.onVideoError)
      
      // Show controls on mouse move and touch
      video.addEventListener('mousemove', this.showVideoControls)
      video.addEventListener('touchstart', this.showVideoControls)
      video.addEventListener('touchmove', this.showVideoControls)
      video.addEventListener('click', this.showVideoControls)
      
      // Show controls on container click/touch for mobile
      const container = video.parentElement
      if (container) {
        container.addEventListener('click', this.showVideoControls)
        container.addEventListener('touchstart', this.showVideoControls)
      }
      
      // Ensure video starts automatically - sin loop infinito
      video.loop = false
      video.autoplay = true
      this.isMuted = false
      video.muted = false // Empezar con sonido la primera vez
      
      // Try to play the video
      video.play().catch(error => {
        console.warn('Autoplay failed:', error)
        // Si falla el autoplay, probablemente necesite estar silenciado
        video.muted = true
        this.isMuted = true
        video.play().catch(err => console.warn('Muted autoplay also failed:', err))
      })
    }
  },
  beforeUnmount() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout)
    }
  }
}
</script>

<style scoped>
/* Estilos para el reproductor de video */
.video-container {
  position: relative;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: #000;
}

.product-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Ajustes específicos para desktop */
@media (min-width: 992px) {
  .video-container {
    height: 400px;
  }
  
  .product-video {
    object-fit: contain;
  }
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 20px 15px 15px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.video-controls.hidden {
  opacity: 0;
  pointer-events: none;
}

.video-controls-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.play-pause-btn {
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  font-size: 16px;
}

.play-pause-btn:hover {
  background: rgba(255,255,255,1);
  transform: scale(1.1);
}

.mute-btn {
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.mute-btn:hover {
  background: rgba(255,255,255,1);
}

.time-display {
  color: white;
  font-size: 14px;
  font-weight: 500;
  min-width: 80px;
  text-align: right;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

/* Progress Bar Styles - Asegurar que se vean correctamente */
.progress-container {
  flex: 1;
  margin: 0 10px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.3) !important;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-bar:hover {
  height: 8px;
  transition: height 0.2s ease;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)) !important;
  border-radius: 3px;
  transition: width 0.1s ease;
  position: relative;
}

.progress::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.progress-bar:hover .progress::after {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .video-container {
    height: 250px;
  }
  
  .video-controls {
    padding: 15px 10px 10px;
  }
  
  .video-controls-row {
    gap: 10px;
    margin-bottom: 8px;
  }
  
  .play-pause-btn {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .mute-btn {
    padding: 6px 10px;
    font-size: 12px;
  }
  
  .time-display {
    font-size: 12px;
    min-width: 70px;
  }
  
  .progress-bar {
    height: 8px;
  }
  
  .progress-bar:hover {
    height: 10px;
  }
}

/* Estilos específicos solo para Regadera */
.benefits-section {
  background: var(--bg-color);
}

.section-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}
</style>
