<template>
  <section id="features" class="features section">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-6 feature text-center" 
             v-for="feature in features" 
             :key="feature.id">
          <span :class="['icon', feature.icon]"></span>
          <div class="feature-content">
            <h5>{{ feature.title }}</h5>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Datos de características con enfoque PWA
const features = ref([
  {
    id: 1,
    icon: 'icon-tools',
    title: 'Fácil de Personalizar',
    description: 'Desarrollado con Vue.js 3 y componentes modulares. Modifica colores, contenido y funcionalidades de manera sencilla para adaptarlo a tu proyecto.'
  },
  {
    id: 2,
    icon: 'icon-desktop',
    title: 'Responsive Ready',
    description: 'Diseño completamente responsivo que se adapta perfectamente a móviles, tablets y escritorio. Mobile-first approach para mejor rendimiento.'
  },
  {
    id: 3,
    icon: 'icon-lightbulb',
    title: 'PWA Moderno',
    description: 'Progressive Web App con service worker, instalación automática, notificaciones push y funcionalidad offline completa.'
  },
  {
    id: 4,
    icon: 'icon-genius',
    title: 'Código Limpio',
    description: 'Desarrollado con las mejores prácticas de Vue.js 3, Composition API y TypeScript. Código mantenible y escalable.'
  },
  {
    id: 5,
    icon: 'icon-briefcase',
    title: 'Listo para Producción',
    description: 'Optimizado para producción con Vite, tree-shaking automático y bundle size mínimo. Deploy inmediato con CI/CD.'
  },
  {
    id: 6,
    icon: 'icon-download',
    title: 'Instalación PWA',
    description: 'Se puede instalar como una app nativa en cualquier dispositivo. Funciona offline y envía notificaciones push.'
  }
])
</script>

<style scoped>
.features {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
}

.feature {
  margin-bottom: 30px;
  padding: 20px;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
}

.icon {
  font-size: 3em;
  margin-bottom: 20px;
  display: inline-block;
  color: var(--primary-color);
}

.feature-content h5 {
  margin: 20px 0 15px 0;
  font-weight: 600;
  color: var(--secondary-color);
}

.feature-content p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .feature {
    margin-bottom: 40px;
  }
}
</style>
