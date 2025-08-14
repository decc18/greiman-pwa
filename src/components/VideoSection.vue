<template>
  <section id="video" class="video-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>🎬 {{ title }}</h2>
          <p>{{ subtitle }}</p>
          <div class="video-wrapper">
            <div class="video-container" :class="{ 'playing': isPlaying }">
              <video 
                ref="videoElement"
                :controls="showControls"
                :autoplay="false"
                :muted="isMuted"
                :loop="shouldLoop"
                playsinline
                class="responsive-video"
                @play="handlePlay"
                @pause="handlePause"
                @ended="handleEnded"
                @loadeddata="handleLoaded"
                @error="handleError"
              >
                <source :src="videoSrc" type="video/mp4">
                Tu navegador no soporta el elemento de video.
              </video>
              
              <!-- Overlay de play personalizado -->
              <div v-if="!isPlaying && !showControls" class="video-overlay" @click="playVideo">
                <div class="play-button">
                  <i class="fa fa-play"></i>
                </div>
                <div class="video-title">
                  <h3>{{ title }}</h3>
                  <p>Haz clic para reproducir</p>
                </div>
              </div>
              
              <!-- Loading indicator -->
              <div v-if="isLoading" class="video-loading">
                <div class="spinner"></div>
                <p>Cargando video...</p>
              </div>
            </div>
            
            <!-- Controles adicionales -->
            <div class="video-controls">
              <button @click="togglePlay" class="control-btn play-pause">
                <i :class="isPlaying ? 'fa fa-pause' : 'fa fa-play'"></i>
                {{ isPlaying ? 'Pausar' : 'Reproducir' }}
              </button>
              <button @click="toggleMute" class="control-btn mute">
                <i :class="isMuted ? 'fa fa-volume-off' : 'fa fa-volume-up'"></i>
                {{ isMuted ? 'Activar audio' : 'Silenciar' }}
              </button>
              <button @click="toggleFullscreen" class="control-btn fullscreen">
                <i class="fa fa-expand"></i>
                Pantalla completa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Nueva Colección Graiman'
  },
  subtitle: {
    type: String,
    default: 'Descubre nuestra última colección SENSA en este video exclusivo'
  },
  videoSrc: {
    type: String,
    default: '/video/Nueva Colección Graiman - SENSA..mp4'
  },
  showControls: {
    type: Boolean,
    default: false
  },
  shouldLoop: {
    type: Boolean,
    default: false
  }
})

// Estado reactivo
const videoElement = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)
const isLoading = ref(true)

// Funciones del video
function playVideo() {
  if (videoElement.value) {
    videoElement.value.play()
  }
}

function togglePlay() {
  if (videoElement.value) {
    if (isPlaying.value) {
      videoElement.value.pause()
    } else {
      videoElement.value.play()
    }
  }
}

function toggleMute() {
  if (videoElement.value) {
    videoElement.value.muted = !videoElement.value.muted
    isMuted.value = videoElement.value.muted
  }
}

function toggleFullscreen() {
  if (videoElement.value) {
    if (videoElement.value.requestFullscreen) {
      videoElement.value.requestFullscreen()
    } else if (videoElement.value.webkitRequestFullscreen) {
      videoElement.value.webkitRequestFullscreen()
    } else if (videoElement.value.mozRequestFullScreen) {
      videoElement.value.mozRequestFullScreen()
    }
  }
}

// Event handlers
function handlePlay() {
  isPlaying.value = true
}

function handlePause() {
  isPlaying.value = false
}

function handleEnded() {
  isPlaying.value = false
}

function handleLoaded() {
  isLoading.value = false
}

function handleError(event) {
  console.error('Error al cargar el video:', event)
  isLoading.value = false
}

onMounted(() => {
  // Configurar el video cuando se monta el componente
  if (videoElement.value) {
    videoElement.value.muted = isMuted.value
  }
})
</script>

<style scoped>
.video-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 80px 0;
  color: var(--secondary-color);
}

.video-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  color: var(--secondary-color);
}

.video-section p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: var(--text-secondary);
}

.video-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.video-container {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 15px 50px rgba(0, 130, 150, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.video-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 60px rgba(0, 130, 150, 0.2);
}

.video-container.playing {
  box-shadow: 0 20px 60px rgba(0, 130, 150, 0.3);
}

.responsive-video {
  width: 100%;
  height: auto;
  border-radius: 15px;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

.video-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: linear-gradient(135deg, rgba(0, 130, 150, 0.8) 0%, rgba(15, 30, 44, 0.8) 100%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-overlay:hover {
  background: linear-gradient(135deg, rgba(0, 130, 150, 0.9) 0%, rgba(15, 30, 44, 0.9) 100%);
}

.play-button {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.play-button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.play-button i {
  font-size: 30px;
  color: white;
  margin-left: 5px;
}

.video-title {
  text-align: center;
  color: white;
}

.video-title h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.video-title p {
  margin: 0;
  opacity: 0.9;
}

.video-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--primary-color);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 130, 150, 0.3);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.video-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.control-btn {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 130, 150, 0.3);
  filter: brightness(110%);
}

.control-btn i {
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .video-section h2 {
    font-size: 2rem;
  }
  
  .video-section p {
    font-size: 1.1rem;
    padding: 0 20px;
  }
  
  .video-container {
    margin: 0 20px;
    padding: 15px;
  }
  
  .responsive-video {
    max-height: 300px;
  }
  
  .play-button {
    width: 60px;
    height: 60px;
  }
  
  .play-button i {
    font-size: 24px;
  }
  
  .video-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 200px;
    justify-content: center;
  }
}
</style>
