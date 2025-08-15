<template>
  <div id="home" class="div-container">
    <!-- Simple Header con solo logo -->
    <SimpleHeader page-title="Productos" />

    <!-- Hero Section con navegación a productos -->
    <section id="hero-section" class="hero-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            
            <p class="hero-subtitle mb-4">Descubre nuestros productos de alta calidad</p>
            
            <!-- Cards de productos -->
            <div class="products-container mt-3">
              <div class="product-card">
                <div class="card-image">
                  <video 
                    :src="porcelanatoVideoUrl"
                    muted
                    autoplay
                    class="card-video clickable-video"
                    @click="goToPorcelanato"
                    @ended="onVideoEnded"
                    ref="porcelanatoVideo"
                  ></video>
                </div>
                <div class="card-content">
                  <h3 class="card-title">Porcelanato Calacatta Ossido</h3>
                  <p class="card-description">Elegancia y sofisticación para tus espacios</p>
                  <router-link to="/porcelanato" class="btn btn-primary">
                    Ver Producto
                  </router-link>
                </div>
              </div>
              
              <div class="product-card">
                <div class="card-image">
                  <video 
                    :src="regaderaVideoUrl"
                    muted
                    autoplay
                    class="card-video clickable-video"
                    @click="goToRegadera"
                    @ended="onVideoEnded"
                    ref="regaderaVideo"
                  ></video>
                </div>
                <div class="card-content">
                  <h3 class="card-title">Regadera SpaViva</h3>
                  <p class="card-description">Revitaliza y rejuvenece con la experiencia SpaViva</p>
                  <router-link to="/regadera" class="btn btn-primary">
                    Ver Producto
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <!-- <FeaturesSection /> -->

    <!-- Works Section -->
    <!-- <WorksSection /> -->
  </div>
</template>

<script>
import SimpleHeader from '../components/SimpleHeader.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import WorksSection from '../components/WorksSection.vue'

export default {
  name: 'Home',
  components: {
    SimpleHeader,
    FeaturesSection,
    WorksSection
  },
  computed: {
    porcelanatoVideoUrl() {
      return `${import.meta.env.BASE_URL}video/Nueva Colección Graiman - SENSA..mp4`
    },
    regaderaVideoUrl() {
      return `${import.meta.env.BASE_URL}video/Rejuvenate and revitalize with the SpaViva handshower..mp4`
    }
  },
  methods: {
    goToPorcelanato() {
      this.$router.push('/porcelanato')
    },
    goToRegadera() {
      this.$router.push('/regadera')
    },
    onVideoEnded(event) {
      // Mantener el video en el último frame después de reproducirse
      event.target.currentTime = event.target.duration;
    }
  }
}
</script>

<style scoped>
.home-container {
  overflow-x: hidden;
  min-height: 100vh;
  max-height: 100vh;
}

.hero-section {
  position: relative;
  background: #ffffff;
  padding: 15px 0 20px 0;
  margin-top: 50px;
  font-family: 'Montserrat', serif;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--secondary-color);
  font-family: 'Montserrat', serif;
}

.hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #666;
  font-family: 'Montserrat', serif;
  font-weight: 400;
}

.products-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 400px;
  flex-shrink: 0;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.card-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.clickable-video {
  cursor: pointer;
}

.clickable-video:hover {
  transform: scale(1.02);
}

.product-card:hover .card-video {
  transform: scale(1.05);
}

.product-card:hover .clickable-video:hover {
  transform: scale(1.08);
}

.card-content {
  padding: 2rem;
  text-align: center;
}

.card-title {
  color: var(--secondary-color);
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Montserrat', serif;
}

.card-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-size: 1.3rem;
  font-family: 'Montserrat', serif;
  font-weight: 400;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-family: 'Montserrat', serif;
  font-size: 1.1rem;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 10px 0 15px 0;
    margin-top: 40px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .card-image {
    height: 200px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.8rem;
  }
  
  .card-description {
    font-size: 1.3rem;
  }
  
  .products-container {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  
  .product-card {
    width: 100%;
    max-width: 350px;
  }
}
</style>
