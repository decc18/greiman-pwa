<template>
  <section id="works" class="works section no-padding">
    <div class="container-fluid">
      <div class="section-header text-center">
        <h2>Our Works</h2>
        <p>Algunos ejemplos de proyectos desarrollados con nuestra tecnología PWA</p>
      </div>
      <div class="row no-gutter">
        <div class="col-lg-3 col-md-6 col-sm-6 work" 
             v-for="work in works" 
             :key="work.id">
          <a :href="work.image" class="work-box" @click.prevent="openWork(work)">
            <img :src="work.image" :alt="work.title">
            <div class="overlay">
              <div class="overlay-caption">
                <h5>{{ work.title }}</h5>
                <p>{{ work.category }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Modal para mostrar trabajo -->
    <div v-if="selectedWork" class="work-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <img :src="selectedWork.image" :alt="selectedWork.title">
        <div class="modal-info">
          <h3>{{ selectedWork.title }}</h3>
          <p class="category">{{ selectedWork.category }}</p>
          <p class="description">{{ selectedWork.description }}</p>
          <div class="technologies">
            <span v-for="tech in selectedWork.technologies" 
                  :key="tech" 
                  class="tech-badge">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedWork = ref(null)

// Datos de trabajos/proyectos
const works = ref([
  {
    id: 1,
    title: 'E-commerce PWA',
    category: 'PWA Development',
    image: `${import.meta.env.BASE_URL}images/work-1.jpg`,
    description: 'Progressive Web App de e-commerce con carrito de compras offline, notificaciones push y sincronización automática.',
    technologies: ['Vue.js', 'PWA', 'IndexedDB', 'Service Worker']
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    category: 'Web Application',
    image: `${import.meta.env.BASE_URL}images/work-2.jpg`,
    description: 'Dashboard interactivo con gráficos en tiempo real, exportación de datos y modo offline.',
    technologies: ['Vue.js', 'Chart.js', 'Vite', 'PWA']
  },
  {
    id: 3,
    title: 'Social Media App',
    category: 'Mobile PWA',
    image: `${import.meta.env.BASE_URL}images/work-3.jpg`,
    description: 'Aplicación social instalable con feed infinito, compartir contenido y notificaciones push.',
    technologies: ['Vue.js', 'PWA', 'Push API', 'Web Share API']
  },
  {
    id: 4,
    title: 'Task Manager',
    category: 'Productivity App',
    image: `${import.meta.env.BASE_URL}images/work-4.jpg`,
    description: 'Gestor de tareas con sincronización offline, recordatorios y colaboración en tiempo real.',
    technologies: ['Vue.js', 'IndexedDB', 'Background Sync', 'PWA']
  },
  {
    id: 5,
    title: 'Restaurant Menu',
    category: 'Business PWA',
    image: `${import.meta.env.BASE_URL}images/work-5.jpg`,
    description: 'Menú digital interactivo con pedidos online, modo oscuro y funcionamiento sin conexión.',
    technologies: ['Vue.js', 'PWA', 'QR Codes', 'Payment API']
  },
  {
    id: 6,
    title: 'Weather App',
    category: 'Utility PWA',
    image: `${import.meta.env.BASE_URL}images/work-6.jpg`,
    description: 'Aplicación del clima con geolocalización, pronóstico offline y notificaciones de alertas.',
    technologies: ['Vue.js', 'Geolocation API', 'PWA', 'Background Sync']
  }
])

function openWork(work) {
  selectedWork.value = work
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedWork.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.works {
  background: #f8f9fa;
}

.section-header {
  padding: 60px 0 40px 0;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.section-header p {
  color: #666;
  font-size: 1.1rem;
}

.work-box {
  position: relative;
  display: block;
  overflow: hidden;
  height: 300px;
}

.work-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-box:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-box:hover .overlay {
  opacity: 1;
}

.overlay-caption {
  text-align: center;
  color: white;
}

.overlay-caption h5 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.overlay-caption p {
  font-size: 1rem;
  opacity: 0.9;
}

/* Modal styles */
.work-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 0;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-content img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.modal-info {
  padding: 30px;
}

.modal-info h3 {
  color: #333;
  margin-bottom: 10px;
}

.category {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 15px;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-badge {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close:hover {
  background: rgba(0, 0, 0, 0.8);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95%;
  }
  
  .modal-info {
    padding: 20px;
  }
  
  .technologies {
    justify-content: center;
  }
}
</style>
