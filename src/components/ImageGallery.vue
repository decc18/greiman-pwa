<template>
  <div class="image-carousel">
    <div class="carousel-container">
      <div class="carousel-header">
        <h3 class="carousel-title">{{ title }}</h3>
        <p class="carousel-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="carousel-wrapper">
        <button 
          class="carousel-nav prev" 
          @click="previousSlide"
          :disabled="currentSlide === 0"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
        
        <div class="carousel-track-container">
          <div 
            class="carousel-track"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(image, index) in images" 
              :key="index"
              class="carousel-slide"
            >
              <div class="slide-content">
                <div class="image-container" @click="openModal(index)">
                  <img 
                    :src="image.src" 
                    :alt="image.alt"
                    class="carousel-image"
                    loading="lazy"
                  />
                  <div class="image-overlay">
                    <div class="overlay-content">
                      <i class="fa fa-search-plus"></i>
                      <span class="overlay-text">Ver en grande</span>
                    </div>
                  </div>
                </div>
                <div class="slide-info">
                  <h4 class="slide-title">{{ image.title }}</h4>
                  <p class="slide-description">{{ image.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="carousel-nav next" 
          @click="nextSlide"
          :disabled="currentSlide === images.length - 1"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
      
      <!-- Indicadores -->
      <!-- <div class="carousel-indicators">
        <button 
          v-for="(image, index) in images"
          :key="index"
          class="indicator"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
        ></button>
      </div> -->
      
      <!-- Controles adicionales -->
      <div class="carousel-controls">
        <div class="slide-counter">
          {{ currentSlide + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
    
    <!-- Modal para vista ampliada -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="fa fa-times"></i>
        </button>
        
        <div class="modal-image-container">
          <img 
            :src="images[currentImageIndex].src" 
            :alt="images[currentImageIndex].alt"
            class="modal-image"
          />
        </div>
        
        <div class="modal-info">
          <h4>{{ images[currentImageIndex].title }}</h4>
          <p>{{ images[currentImageIndex].description }}</p>
        </div>
        
        <div class="modal-navigation" v-if="images.length > 1">
          <button 
            class="nav-btn prev" 
            @click="previousModalImage"
            :disabled="currentImageIndex === 0"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
          
          <div class="image-counter">
            {{ currentImageIndex + 1 }} / {{ images.length }}
          </div>
          
          <button 
            class="nav-btn next" 
            @click="nextModalImage"
            :disabled="currentImageIndex === images.length - 1"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    title: {
      type: String,
      default: 'Galería de Imágenes'
    },
    subtitle: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modalVisible: false,
      currentImageIndex: 0,
      currentSlide: 0,
      autoplay: true,
      autoplayInterval: null
    }
  },
  methods: {
    openModal(index) {
      this.currentImageIndex = index
      this.modalVisible = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.modalVisible = false
      document.body.style.overflow = 'auto'
    },
    nextModalImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.currentImageIndex++
      }
    },
    previousModalImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      }
    },
    nextSlide() {
      if (this.currentSlide < this.images.length - 1) {
        this.currentSlide++
      }
      // Reiniciar autoplay cuando el usuario navega manualmente
      this.restartAutoplay()
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
      // Reiniciar autoplay cuando el usuario navega manualmente
      this.restartAutoplay()
    },
    goToSlide(index) {
      this.currentSlide = index
      // Reiniciar autoplay cuando el usuario navega manualmente
      this.restartAutoplay()
    },
    restartAutoplay() {
      this.stopAutoplay()
      this.startAutoplay()
    },
    toggleAutoplay() {
      this.autoplay = !this.autoplay
      if (this.autoplay) {
        this.startAutoplay()
      } else {
        this.stopAutoplay()
      }
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        if (this.currentSlide >= this.images.length - 1) {
          this.currentSlide = 0
        } else {
          this.currentSlide++
        }
      }, 4000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    }
  },
  mounted() {
    // Iniciar autoplay automáticamente al montar el componente
    this.startAutoplay()
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
    this.stopAutoplay()
  }
}
</script>

<style scoped>
.image-carousel {
  padding: 3rem 0;
  background: #ffffff;
}

.carousel-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.carousel-header {
  text-align: center;
  margin-bottom: 3rem;
}

.carousel-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-family: 'Montserrat', serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.carousel-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-family: 'Montserrat', serif;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.carousel-nav {
  background: var(--primary-color);
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 130, 150, 0.3);
}

.carousel-nav:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 130, 150, 0.4);
}

.carousel-nav:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.carousel-nav.prev {
  margin-right: 1rem;
}

.carousel-nav.next {
  margin-left: 1rem;
}

.carousel-track-container {
  flex: 1;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.slide-content {
  display: flex;
  align-items: stretch;
  height: 400px;
  background: white;
}

.image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .carousel-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content i {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
}

.overlay-text {
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Montserrat', serif;
}

.slide-info {
  flex: 0 0 300px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f8f9fa;
  border-left: 4px solid var(--primary-color);
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.slide-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-family: 'Montserrat', serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.slide-description {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.5;
  font-family: 'Montserrat', serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--primary-color);
  transform: scale(1.2);
}

.indicator:hover {
  background: var(--secondary-color);
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

.slide-counter {
  font-weight: 600;
  color: var(--secondary-color);
  font-family: 'Montserrat', serif;
  font-size: 1.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-image-container {
  max-width: 800px;
  max-height: 600px;
}

.modal-image {
  width: 100%;
  height: auto;
  display: block;
}

.modal-info {
  padding: 2rem;
  text-align: center;
}

.modal-info h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-family: 'Montserrat', serif;
}

.modal-info p {
  font-size: 1rem;
  color: #666;
  font-family: 'Montserrat', serif;
}

.modal-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.nav-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: scale(1.1);
}

.nav-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.image-counter {
  font-weight: 600;
  color: var(--secondary-color);
  font-family: 'Montserrat', serif;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-container {
    padding: 0 1rem;
  }
  
  .carousel-wrapper {
    flex-direction: column;
    gap: 1rem;
  }
  
  .carousel-nav {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    z-index: 3;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .carousel-nav.prev {
    left: 1rem;
    margin-right: 0;
  }
  
  .carousel-nav.next {
    right: 1rem;
    margin-left: 0;
  }
  
  .carousel-track-container {
    margin: 0;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .slide-content {
    flex-direction: column;
    height: auto;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    height: 250px;
    border-radius: 15px 15px 0 0;
  }
  
  .slide-info {
    flex: none;
    padding: 2rem;
    border-left: none;
    border-top: 4px solid var(--primary-color);
    background: white;
    border-radius: 0 0 15px 15px;
  }
  
  .slide-title {
    font-size: 1.2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  .slide-description {
    font-size: 1.1rem;
    line-height: 1.5;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  .carousel-title {
    font-size: 1.8rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .carousel-subtitle {
    font-size: 1.1rem;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  .carousel-controls {
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-info {
    padding: 1.5rem;
  }
  
  .modal-navigation {
    padding: 1rem;
  }
}
</style>
