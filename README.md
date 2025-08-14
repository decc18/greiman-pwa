# 🚀 graiman PWA - ActiveBox Template

Una Progressive Web App (PWA) moderna desarrollada con Vue.js 3 y Vite, integrando la plantilla ActiveBox para crear una experiencia empresarial completa.

## ✨ Características

- 🎨 **Diseño Profesional**: Basado en la plantilla ActiveBox con diseño moderno y elegante
- 📱 **PWA Completa**: Instalable como aplicación nativa con funcionalidades offline
- ⚡ **Alto Rendimiento**: Desarrollado con Vue.js 3 + Vite para carga ultra rápida
- 🔄 **Funcionalidad Offline**: Service Worker con cache automático de recursos
- 📍 **Geolocalización**: Acceso a ubicación del usuario con permisos
- 🔔 **Notificaciones Push**: Sistema completo de notificaciones
- 💾 **Almacenamiento Local**: Persistencia de datos con LocalStorage
- � **Responsive Design**: Optimizado para móviles, tablets y escritorio
- � **Acceso por IP**: Servidor de desarrollo accesible desde la red local

## 🛠️ Tecnologías

### Frontend
- **Vue.js 3** - Framework JavaScript reactivo con Composition API
- **Vite** - Herramienta de desarrollo ultra rápida
- **Bootstrap 4** - Framework CSS para diseño responsive
- **Font Awesome** - Iconografía profesional

### PWA
- **Service Worker** - Cache automático con Workbox
- **Web App Manifest** - Configuración de instalación
- **Push Notifications** - Notificaciones nativas
- **Geolocation API** - Servicios de ubicación

## 🚦 Instalación y uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Desarrollo local**:
   ```bash
   npm run dev
   ```

3. **Desarrollo accesible desde la red**:
   ```bash
   npm run dev:host
   ```

4. **Build para producción**:
   ```bash
   npm run build
   ```

5. **Vista previa del build**:
   ```bash
   npm run preview
   # o accesible desde la red:
   npm run preview:host
   ```

## 🌐 Acceso desde dispositivos móviles

Con `host: true` en la configuración de Vite, puedes acceder a la aplicación desde cualquier dispositivo en la misma red:

- **Local**: http://localhost:5175
- **Red local**: http://[tu-ip]:5175 (ej: http://192.168.1.100:5175)

Esto es perfecto para probar la PWA en dispositivos móviles reales.

## 📱 Funcionalidades PWA

### 🔧 Instalación
- Detección automática de capacidad de instalación
- Botón de instalación integrado en la interfaz
- Compatible con Android, iOS y escritorio
- Funcionamiento como app nativa una vez instalada

### 🔄 Modo Offline
- Cache automático de recursos estáticos
- Sincronización en background cuando hay conexión
- Funcionalidad básica sin conexión a internet
- Indicador visual del estado de conexión

### 🔔 Notificaciones
- Solicitud automática de permisos
- Notificaciones automáticas cada 5 interacciones
- Iconos personalizados y contenido dinámico
- Compatible con todos los navegadores modernos

### 💾 Almacenamiento
- LocalStorage para datos persistentes
- Historial de actividades del usuario
- Recuperación automática al recargar
- Sincronización con servidor (preparado)

## 🎨 Componentes Incluidos

### HeaderBanner.vue
- Banner principal con navegación
- Botón de instalación PWA integrado
- Menú responsive para móviles
- Smooth scrolling entre secciones

### FeaturesSection.vue
- Sección de características con iconos
- Grid responsive adaptable
- Animaciones hover personalizadas
- Contenido enfocado en PWA

### WorksSection.vue
- Portfolio/galería de trabajos
- Modal para vista detallada
- Filtros por categoría (preparado)
- Información de tecnologías

### HelloWorld.vue
- Demo interactivo de funcionalidades PWA
- Contador con notificaciones
- Geolocalización en tiempo real
- Gestión de actividades

## 📄 Estructura del proyecto

```
src/
├── components/
│   ├── HeaderBanner.vue      # Banner principal con navegación
│   ├── FeaturesSection.vue   # Sección de características
│   ├── WorksSection.vue      # Portfolio de trabajos
│   └── HelloWorld.vue        # Demo interactivo PWA
├── assets/                   # Recursos Vue.js
├── App.vue                   # Componente raíz
├── main.js                   # Punto de entrada
└── style.css                 # Estilos globales

public/
├── css/                      # Estilos de ActiveBox
├── js/                       # JavaScript de ActiveBox
├── images/                   # Imágenes de la plantilla
├── fonts/                    # Fuentes web
├── pwa-*.png                 # Iconos PWA
└── favicon*                  # Favicons

.github/
└── copilot-instructions.md   # Instrucciones para Copilot
```

## ⚙️ Configuración

### Vite Config
- Plugin PWA configurado con Workbox
- Servidor con acceso por IP local
- Hot Module Replacement (HMR)
- Optimización de assets

### PWA Manifest
- Nombre y descripción personalizados
- Iconos en múltiples resoluciones
- Tema de colores corporativo
- Configuración de pantalla completa

## 🌐 Despliegue

### Para producción:

1. **Build optimizado**:
   ```bash
   npm run build
   ```

2. **Subir carpeta `dist` a tu servidor**

3. **Configurar HTTPS** (requerido para PWA)

4. **Verificar Service Worker** en Developer Tools

### Características del build:
- Tree-shaking automático
- Minificación de CSS/JS
- Optimización de imágenes
- Service Worker generado automáticamente
- Manifest.json incluido

## 📱 Testing PWA

### Chrome DevTools:
1. Abre Developer Tools > Application
2. Verifica Service Worker activo
3. Prueba funcionalidad offline
4. Audita con Lighthouse PWA

### Dispositivos reales:
1. Accede desde la red local: `http://[tu-ip]:5175`
2. Instala la PWA desde el menú del navegador
3. Prueba notificaciones y geolocalización
4. Verifica funcionamiento offline

## 🎯 Características técnicas

- **Vue 3 Composition API** para lógica reactiva
- **Bootstrap responsive grid** para layouts
- **CSS custom properties** para tematización
- **Intersection Observer** para animaciones
- **Web APIs modernas** (Geolocation, Notifications, etc.)
- **ES6+ JavaScript** con Vite transpilation

## 🔧 Personalización

### Cambiar colores:
Modifica las variables CSS en `src/style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Añadir nuevas secciones:
1. Crea un componente en `src/components/`
2. Impórtalo en `App.vue`
3. Añádelo a la navegación en `HeaderBanner.vue`

### Personalizar PWA:
Modifica `vite.config.js` para cambiar manifest, iconos y configuración del service worker.

---

Desarrollado con ❤️ usando Vue.js, Vite y la plantilla ActiveBox
