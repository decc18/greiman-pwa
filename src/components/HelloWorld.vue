<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const currentTime = ref(new Date().toLocaleTimeString())
const notifications = ref([])

// Actualizar hora cada segundo
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
}, 1000)

// Función para mostrar notificación
async function showNotification() {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification('¡graiman PWA!', {
        body: `Has hecho clic ${count.value} veces`,
        icon: '/pwa-192x192.png'
      })
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification('¡graiman PWA!', {
          body: `Has hecho clic ${count.value} veces`,
          icon: '/pwa-192x192.png'
        })
      }
    }
  }
}

// Manejar clicks
function handleClick() {
  count.value++
  if (count.value % 5 === 0) {
    showNotification()
  }
}

// Obtener ubicación
async function getLocation() {
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      
      const { latitude, longitude } = position.coords
      notifications.value.unshift({
        id: Date.now(),
        text: `📍 Ubicación: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        time: new Date().toLocaleTimeString()
      })
    } catch (error) {
      notifications.value.unshift({
        id: Date.now(),
        text: '❌ No se pudo obtener la ubicación',
        time: new Date().toLocaleTimeString()
      })
    }
  }
}

// Guardar en localStorage
function saveData() {
  localStorage.setItem('graimanPWACount', count.value.toString())
  notifications.value.unshift({
    id: Date.now(),
    text: '💾 Datos guardados localmente',
    time: new Date().toLocaleTimeString()
  })
}

// Cargar datos al montar
onMounted(() => {
  const savedCount = localStorage.getItem('graimanPWACount')
  if (savedCount) {
    count.value = parseInt(savedCount)
  }
})
</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    
    <div class="time-display">
      <h2>🕒 {{ currentTime }}</h2>
    </div>

    <div class="card">
      <button type="button" @click="handleClick" class="count-btn">
        🎯 Clicks: {{ count }}
      </button>
      <p class="hint">Cada 5 clicks recibirás una notificación</p>
    </div>

    <div class="actions">
      <button @click="getLocation" class="action-btn location-btn">
        📍 Mi Ubicación
      </button>
      <button @click="saveData" class="action-btn save-btn">
        💾 Guardar Datos
      </button>
    </div>

    <div v-if="notifications.length > 0" class="notifications">
      <h3>📢 Actividad reciente:</h3>
      <div class="notification-list">
        <div 
          v-for="notification in notifications.slice(0, 5)" 
          :key="notification.id"
          class="notification-item"
        >
          <span class="notification-text">{{ notification.text }}</span>
          <span class="notification-time">{{ notification.time }}</span>
        </div>
      </div>
    </div>

    <div class="info">
      <p>
        🔥 Esta PWA funciona <strong>offline</strong> y se puede instalar en tu dispositivo
      </p>
      <p class="tech-stack">
        Desarrollada con ⚡ <strong>Vite</strong> + 🟢 <strong>Vue.js</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.hello-world h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.time-display {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.time-display h2 {
  margin: 0;
  font-family: 'Courier New', monospace;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.count-btn {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.count-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 130, 150, 0.3);
  filter: brightness(110%);
}

.count-btn:active {
  transform: translateY(0px);
}

.hint {
  margin-top: 1rem;
  opacity: 0.8;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-btn {
  background: var(--primary-color);
  color: white;
}

.save-btn {
  background: var(--secondary-color);
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(110%);
}

.notifications {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.notifications h3 {
  margin: 0 0 1rem 0;
  text-align: center;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.notification-text {
  flex: 1;
}

.notification-time {
  font-size: 0.8rem;
  opacity: 0.7;
  font-family: monospace;
}

.info {
  opacity: 0.9;
}

.tech-stack {
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 200px;
  }
  
  .notification-item {
    flex-direction: column;
    text-align: center;
    gap: 0.25rem;
  }
}</style>
