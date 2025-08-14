import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Porcelanato from '../views/Porcelanato.vue'
import Regadera from '../views/Regadera.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/porcelanato',
    name: 'Porcelanato',
    component: Porcelanato,
    meta: { title: 'PORCELANATO CALACATTA OSSIDO - graiman' }
  },
  {
    path: '/regadera',
    name: 'Regadera',
    component: Regadera,
    meta: { title: 'Regadera SpaViva - graiman' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll suave al cambiar de página
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Cambiar título de la página según la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'graiman PWA - ActiveBox Template'
  next()
})

export default router
