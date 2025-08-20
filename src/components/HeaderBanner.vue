<template>
  <section class="banner" role="banner">
    <header id="header">
      <div class="header-content clearfix">
        <router-link class="logo" to="/">
          <img :src="logoUrl" alt="graiman PWA Logo">
        </router-link>
        <nav class="navigation" role="navigation">
          <ul class="primary-nav">
            <li><router-link to="/porcelanato">Porcelanato</router-link></li>
            <li><router-link to="/regadera">Regadera</router-link></li>
            <li><a href="#features" @click="scrollTo('features')">Features</a></li>
            <li><a href="#works" @click="scrollTo('works')">Works</a></li>
          </ul>
        </nav>
        <a href="#" class="nav-toggle" @click.prevent="toggleNav">Menu<span></span></a>
      </div>
    </header>
    
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="banner-text text-center">
          <h1>{{ title }}</h1>
          <p>{{ subtitle }}</p>
          <button v-if="canInstall" @click="installApp" class="btn btn-large install-pwa-btn">
            📱 Instalar PWA
          </button>
          <div class="hero-actions">
            <router-link to="/porcelanato" class="btn btn-large btn-primary">
              Ver Porcelanato
            </router-link>
            <router-link to="/regadera" class="btn btn-large btn-outline">
              Ver Regadera
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Props
defineProps({
  title: {
    type: String,
    default: 'Your Favorite PWA Multi Purpose Template'
  },
  subtitle: {
    type: String,
    default: 'Una Progressive Web App moderna desarrollada con Vue.js 3, perfecta para cualquier proyecto empresarial.'
  }
})

// Estado reactivo
const canInstall = ref(false)
const installPrompt = ref(null)

// Funciones de navegación
function scrollTo(elementId) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleNav() {
  // Lógica para toggle del menú móvil
  const nav = document.querySelector('.navigation')
  const navToggle = document.querySelector('.nav-toggle')
  
  if (nav && navToggle) {
    nav.classList.toggle('active')
    navToggle.classList.toggle('active')
  }
}

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  installPrompt.value = e
  canInstall.value = true
})

async function installApp() {
  if (installPrompt.value) {
    installPrompt.value.prompt()
    const { outcome } = await installPrompt.value.userChoice
    if (outcome === 'accepted') {
      canInstall.value = false
    }
    installPrompt.value = null
  }
}

// Computed properties
const logoUrl = computed(() => `${import.meta.env.BASE_URL}images/logo.png`)

onMounted(() => {
  // Detectar si ya está instalada como PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    canInstall.value = false
  }
})
</script>

<style scoped>
.install-pwa-btn {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border: none;
  margin-right: 10px;
  color: white !important;
  transition: all 0.3s ease;
}

.install-pwa-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 130, 150, 0.4);
  filter: brightness(110%);
}

/* Responsive navigation */
@media (max-width: 768px) {
  .navigation {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    transition: right 0.3s ease;
    z-index: 1000;
  }
  
  .navigation.active {
    right: 0;
  }
  
  .primary-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .primary-nav li {
    margin: 20px 0;
  }
  
  .primary-nav a {
    font-size: 24px;
    color: white;
  }
}

/* Hero Actions */
.hero-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-2px);
}

@media (max-width: 576px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .btn {
    width: 250px;
    margin: 0.5rem 0;
  }
}
</style>
