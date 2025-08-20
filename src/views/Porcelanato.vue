<template>
  <div id="porcelanato-page" class="div-container">
    <!-- Simple Header con solo logo -->
    <SimpleHeader page-title="Porcelanato Calacatta Ossido" />

    <!-- Product Hero Section -->
    <section class="product-hero">
      <div class="container-fluid px-0">
        <div class="row no-gutters align-items-center min-vh-100">
          <div class="col-lg-7 order-lg-2">
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
          
          <div class="col-lg-5 order-lg-1">
            <div class="product-info">
              <div class="product-category">PORCELANATO</div>
              <h1 class="product-title">CALACATTA OSSIDO</h1>
              <p class="product-description">
                Experimenta la elegancia atemporal del mármol Calacatta con nuestro porcelanato 
                de última generación. La colección SENSA combina la belleza natural de la piedra 
                con la durabilidad y versatilidad de la tecnología cerámica moderna.
              </p>
              
              <div class="product-features">
                <div class="feature-item">
                  <i class="fa fa-cube"></i>
                  <span>Alta resistencia y durabilidad</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-tint"></i>
                  <span>Resistente al agua y manchas</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-asterisk"></i>
                  <span>Resistente a heladas</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-fire"></i>
                  <span>Resistente al calor</span>
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
                :product-data="productData"
                @added-to-cart="onAddedToCart"
              />
              
              <div class="product-actions">
                <button 
                  @click="contactWhatsApp" 
                  class="btn btn-primary"
                >
                  <i class="fa fa-phone me-2"></i>
                  CONTACTAR
                </button>
                <button @click="showCatalog" class="btn btn-outline-primary btn-lg">
                  <i class="fa fa-download me-2"></i>
                  CATÁLOGO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="">
        <div class="container-fluid px-0">
            <!-- Image Gallery -->
            <ImageGallery 
            :images="galleryImagesWithBasePath"
            title="Colección SENSA"
            subtitle="Descubre la belleza y versatilidad del Porcelanato Calacatta Ossido en diferentes aplicaciones"
            />
        </div>
        
    </section>
  
    
    <!-- Product Information Section -->
    <section class="">
      <div class="product-info py-5">
        <div class="">
          <div class="col-12 text-center mb-5">
            <h2 class="product-title">CALACATTA OSSIDO</h2>
            <p class="product-description">
              Un mármol con carácter. Calacatta Ossido reinventa el clásico Calacatta con 
              algunas vetas azuladas y reflejos de óxido en tonos marrones para un diseño 
              más auténtico. Ideal para destacar elementos en espacios residenciales y 
              comerciales, su relieve fusiona texturas lisas y porosas, replicando la belleza 
              natural del mármol.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-cube"></i>
              </div>
              <h4>Mármol · Porcelanato</h4>
              <p>Tecnología de última generación que combina la elegancia del mármol con la resistencia del porcelanato de alta calidad.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-th"></i>
              </div>
              <h4>Múltiples Formatos</h4>
              <p>Disponible en diversos tamaños y espesores para adaptarse perfectamente a cualquier proyecto arquitectónico.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="fa fa-home"></i>
              </div>
              <h4>Espacios Premium</h4>
              <p>Ideal para destacar elementos en espacios residenciales y comerciales con un diseño auténtico y sofisticado.</p>
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
            <h2 class="product-title">Información Técnica</h2>
            <p class="text-muted">Especificaciones detalladas de empaque y formatos disponibles</p>
          </div>
        </div>
        
        <!-- Especificaciones Empaque Cerámico -->
        <div class="row mb-5">
          <div class="col-12">
            <h3 class="spec-section-title">
              <i class="fa fa-cube me-2"></i>
              Especificaciones Empaque Cerámico
            </h3>
            <div class="table-responsive">
              <table class="table table-striped spec-table">
                <thead>
                  <tr>
                    <th>Formato</th>
                    <th>Dimensión de Fabricación</th>
                    <th>Espesor MM</th>
                    <th>Piezas x Caja</th>
                    <th>m² x Caja</th>
                    <th>m² x Pallet</th>
                    <th>Cajas x Pallet</th>
                    <th>Kg x Pallet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>23.5x59</strong></td>
                    <td>233x590</td>
                    <td>7.5</td>
                    <td>11</td>
                    <td>1.53</td>
                    <td>111.80</td>
                    <td>50</td>
                    <td>1800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Especificaciones Empaque Porcelanato -->
        <div class="row mb-5">
          <div class="col-12">
            <h3 class="spec-section-title">
              <i class="fa fa-th-large me-2"></i>
              Especificaciones Empaque Porcelanato
            </h3>
            <div class="table-responsive">
              <table class="table table-striped spec-table">
                <thead>
                  <tr>
                    <th>Formato</th>
                    <th>Dimensión de Fabricación</th>
                    <th>Espesor MM</th>
                    <th>Piezas x Caja</th>
                    <th>m² x Caja</th>
                    <th>m² x Pallet</th>
                    <th>Cajas x Pallet</th>
                    <th>Kg x Pallet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>120x120</strong></td>
                    <td>1200x1200</td>
                    <td>9</td>
                    <td>1</td>
                    <td>1.44</td>
                    <td>57.60</td>
                    <td>40</td>
                    <td>1965</td>
                  </tr>
                  <tr>
                    <td><strong>60x120</strong></td>
                    <td>600x1200</td>
                    <td>7.4</td>
                    <td>4</td>
                    <td>2.88</td>
                    <td>69.12</td>
                    <td>24</td>
                    <td>1107</td>
                  </tr>
                  <tr>
                    <td><strong>30x60</strong></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td><strong>15.5x19.5</strong></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td><strong>7x29</strong></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Formatos y Espesores de Colección -->
        <div class="row">
          <div class="col-12">
            <h3 class="spec-section-title">
              <i class="fa fa-ruler-combined me-2"></i>
              Formatos y Espesores de Colección
            </h3>
            <div class="formats-visual">
              <div class="row align-items-end justify-content-center">
                <div class="col-md-2 col-sm-4 col-6 mb-3">
                  <div class="format-card format-large">
                    <div class="format-size">120x120</div>
                    <div class="format-specs">
                      <small>9mm espesor</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-4 col-6 mb-3">
                  <div class="format-card format-medium">
                    <div class="format-size">60x120</div>
                    <div class="format-specs">
                      <small>7.4mm espesor</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-4 col-6 mb-3">
                  <div class="format-card format-small">
                    <div class="format-size">29.5x59</div>
                    <div class="format-specs">
                      <small>Disponible</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-4 col-6 mb-3">
                  <div class="format-card format-mini">
                    <div class="format-size">19.5x19.5</div>
                    <div class="format-specs">
                      <small>Mosaico</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-4 col-6 mb-3">
                  <div class="format-card format-strip">
                    <div class="format-size">7x29</div>
                    <div class="format-specs">
                      <small>Listello</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Thickness indicator -->
              <div class="thickness-indicator mt-4">
                <h5>Espesores Disponibles:</h5>
                <div class="thickness-bars">
                  <div class="thickness-bar">
                    <span class="thickness-label">7.4mm</span>
                    <div class="bar bar-thin"></div>
                  </div>
                  <div class="thickness-bar">
                    <span class="thickness-label">7.5mm</span>
                    <div class="bar bar-thin"></div>
                  </div>
                  <div class="thickness-bar">
                    <span class="thickness-label">9mm</span>
                    <div class="bar bar-thick"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Technical Info -->
        <div class="row mt-5">
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>
                <i class="fa fa-shipping-fast me-2"></i>
                Logística
              </h4>
              <ul>
                <li>Embalaje optimizado por pallet</li>
                <li>Peso máximo: 1965 kg/pallet</li>
                <li>Área máxima: 111.80 m²/pallet</li>
                <li>Protección anti-humedad</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>
                <i class="fa fa-tools me-2"></i>
                Instalación
              </h4>
              <ul>
                <li>Adhesivo cerámico clase C2</li>
                <li>Juntas mínimas 2-3mm</li>
                <li>Superficie nivelada ±3mm</li>
                <li>Corte con disco diamantado</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>
                <i class="fa fa-certificate me-2"></i>
                Calidad
              </h4>
              <ul>
                <li>Norma ISO 13006</li>
                <li>Absorción agua ≤0.5%</li>
                <li>Resistencia flexión >35 N/mm²</li>
                <li>Antideslizante R10-R11</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <!-- PDF Viewer Modal -->
    <PDFViewer 
      :isVisible="showPDFViewer"
      :pdfPath="`${$router.options.history.base}pdf/porcelanato.pdf`"
      title="Catálogo Porcelanato Calacatta Ossido"
      @close="showPDFViewer = false"
    />
  </div>
</template>

<script>
import SimpleHeader from '../components/SimpleHeader.vue'
import InstallPWAFooter from '../components/InstallPWAFooter.vue'
import PDFViewer from '../components/PDFViewer.vue'
import ImageGallery from '../components/ImageGallery.vue'
import ProductPricing from '../components/ProductPricing.vue'
import { getProductData } from '../data/products.js'

export default {
  name: 'Porcelanato',
  components: {
    SimpleHeader,
    InstallPWAFooter,
    PDFViewer,
    ImageGallery,
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
      productData: getProductData('porcelanato'), // Datos del producto
      galleryImages: [
        {
          src: 'porcelanato-ambiente.jpg',
          alt: 'Porcelanato Calacatta Ossido en ambiente',
          title: 'Aplicación en Interiores',
          description: 'El porcelanato Calacatta Ossido crea ambientes sofisticados y elegantes, perfectos para espacios de diseño contemporáneo.'
        },
        {
          src: 'porcelanato-textura.jpg',
          alt: 'Textura detallada del porcelanato Calacatta Ossido',
          title: 'Detalle de Textura',
          description: 'Observa de cerca las venas naturales y la textura única que caracterizan al Calacatta Ossido de la colección SENSA.'
        },
        {
          src: 'porcelanato-losa.jpg',
          alt: 'Losa individual del porcelanato Calacatta Ossido',
          title: 'Formato Individual',
          description: 'Cada pieza muestra la belleza natural del mármol Calacatta con la durabilidad del porcelanato de alta tecnología.'
        }
      ]
    }
  },
  computed: {
    progressPercentage() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    },
    videoSrc() {
      return `${import.meta.env.BASE_URL}video/Nueva Colección Graiman - SENSA..mp4`
    },
    galleryImagesWithBasePath() {
      return this.galleryImages.map(image => ({
        ...image,
        src: `${import.meta.env.BASE_URL}images/${image.src}`
      }))
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
    },
    contactWhatsApp() {
      // Abrir WhatsApp con mensaje personalizado para porcelanato
      const whatsappUrl = 'https://api.whatsapp.com/send?phone=593997585127&text=%C2%A1Hola%20Graiman!%20Vi%20sus%20productos%20en%20la%20web%20y%20estoy%20interesado/a.%20Quiero%20recibir%20asesor%C3%ADa.'
      window.open(whatsappUrl, '_blank')
    },
    
    onAddedToCart(cartItem) {
      // Mostrar notificación o feedback cuando se agrega al carrito
      console.log('Producto agregado al carrito:', cartItem)
      // Aquí podrías mostrar una notificación toast o similar
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
  font-size: var(--font-size-sm);
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
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.mute-btn:hover {
  background: rgba(255,255,255,1);
}

.time-display {
  color: white;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
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
    font-size: var(--font-size-xs);
  }
  
  .mute-btn {
    padding: 6px 10px;
    font-size: var(--font-size-xs);
  }
  
  .time-display {
    font-size: var(--font-size-xs);
    min-width: 70px;
  }
  
  .progress-bar {
    height: 8px;
  }
  
  .progress-bar:hover {
    height: 10px;
  }
}

/* Estilos para sección de información técnica */
.spec-section-title {
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);
}

.spec-table {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.spec-table thead {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color, #00b4d8) 100%);
}

.spec-table thead th {
  color: white;
  font-weight: var(--font-weight-semibold);
  padding: 1rem 0.75rem;
  border: none;
  font-size: var(--font-size-sm);
  text-align: center;
}

.spec-table tbody td {
  padding: 0.75rem;
  vertical-align: middle;
  text-align: center;
  font-size: var(--font-size-sm);
  border-color: #dee2e6;
}

.spec-table tbody tr:hover {
  background-color: #f8f9fa;
}

.spec-table tbody td:first-child {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

/* Formatos visuales */
.formats-visual {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 1rem;
}

.format-card {
  background: white;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.format-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 130, 150, 0.2);
}

.format-large {
  height: 120px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.format-medium {
  height: 100px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.format-small {
  height: 80px;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.format-mini {
  height: 60px;
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc02 30%);
}

.format-strip {
  height: 40px;
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
}

.format-size {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  font-size: var(--font-size-lg);
  margin-bottom: 0.25rem;
}

.format-specs {
  color: #666;
  font-size: var(--font-size-xs);
}

/* Indicador de espesores */
.thickness-indicator {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.thickness-bars {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
  margin-top: 1rem;
}

.thickness-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.thickness-label {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--primary-color);
}

.bar {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color, #00b4d8));
  border-radius: 4px;
  width: 40px;
}

.bar-thin {
  height: 15px;
}

.bar-thick {
  height: 25px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .spec-table {
    font-size: var(--font-size-xs);
  }
  
  .spec-table thead th,
  .spec-table tbody td {
    padding: 0.5rem 0.25rem;
  }
  
  .formats-visual {
    padding: 1rem;
  }
  
  .format-card {
    margin-bottom: 1rem;
  }
  
  .thickness-bars {
    flex-direction: column;
    gap: 1rem;
  }
  
  .thickness-bar {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }
  
  .bar {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .spec-section-title {
    font-size: var(--font-size-lg);
  }
  
  .table-responsive {
    font-size: var(--font-size-xs);
  }
  
  .format-size {
    font-size: var(--font-size-base);
  }
}
</style>

