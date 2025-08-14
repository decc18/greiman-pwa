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
                  <i class="fa fa-diamond"></i>
                  <span>Alta resistencia y durabilidad</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-tint"></i>
                  <span>Resistente al agua y manchas</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-snowflake-o"></i>
                  <span>Resistente a heladas</span>
                </div>
                <div class="feature-item">
                  <i class="fa fa-fire"></i>
                  <span>Resistente al calor</span>
                </div>
              </div>
              
              <div class="product-actions">
                <button class="btn btn-primary">
                  <i class="fa fa-phone me-2"></i>
                  CONTACTAR
                </button>
                <button @click="showCatalog" class="btn btn-primary btn-outline">
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
    <section class="product-hero">
      <div class="product-info py-5">
        <div class="row">
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
                <i class="fa fa-diamond"></i>
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
            <h2 class="section-title">Especificaciones Técnicas</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Medidas</h4>
              <ul>
                <li>60x120 cm</li>
                <li>80x80 cm</li>
                <li>60x60 cm</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Acabados</h4>
              <ul>
                <li>Natural</li>
                <li>Pulido</li>
                <li>Antideslizante</li>
              </ul>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="spec-card">
              <h4>Aplicaciones</h4>
              <ul>
                <li>Pisos interiores</li>
                <li>Paredes</li>
                <li>Exteriores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <!-- PWA Install Footer -->
    <InstallPWAFooter />
    
    <!-- PDF Viewer Modal -->
    <PDFViewer 
      :isVisible="showPDFViewer"
      :pdfPath="'/pdf/porcelanato.pdf'"
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

export default {
  name: 'Porcelanato',
  components: {
    SimpleHeader,
    InstallPWAFooter,
    PDFViewer,
    ImageGallery
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
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background: #000;
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
}</style>

