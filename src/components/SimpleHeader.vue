<template>
  <header class="simple-header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo-link">
          <div class="logo-container">
            <img :src="logoUrl" alt="Logo" class="logo-img">
            <div v-if="pageTitle" class="page-title-container">
              <span class="page-title">{{ pageTitle }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SimpleHeader',
  props: {
    pageTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    logoUrl() {
      return `${import.meta.env.BASE_URL}images/logo.png`
    }
  }
}
</script>

<style scoped>
.simple-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--secondary-color);
  transition: all 0.3s ease;
}

.logo-link:hover {
  color: var(--primary-color);
  transform: scale(1.05);
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
  margin-bottom: 0.5rem;
}

.page-title-container {
  text-align: center;
}

.page-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;
  text-align: center;
  display: block;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .simple-header {
    padding: 0.8rem 0;
  }
  
  .logo-img {
    height: 35px;
    margin-bottom: 0.4rem;
  }
  
  .page-title {
    font-size: 1.3rem;
  }
}
</style>
