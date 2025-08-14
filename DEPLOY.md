# Deploy Instructions

## Para hacer deploy a GitHub Pages:

1. **Build para GitHub Pages:**
   ```bash
   npm run build:github
   ```

2. **Deploy automático:**
   ```bash
   npm run deploy
   ```

3. **O manualmente:**
   - Hacer push del código a GitHub
   - En GitHub, ir a Settings > Pages
   - Configurar source como "Deploy from a branch"
   - Seleccionar la rama `gh-pages`
   - La aplicación estará disponible en: `https://decc18.github.io/greiman-pwa/`

## Configuración actual:

- **Base path:** Dinámico - `/` para desarrollo, `/greiman-pwa/` para producción
- **PWA icons:** Configurados con rutas relativas (✅ Corregido el error de descarga)
- **Manifest:** Configurado para GitHub Pages con rutas correctas
- **Service Worker:** Incluido y funcional
- **Assets:** CSS, imágenes y fuentes procesadas correctamente desde src/assets/
- **Router:** Configurado para usar import.meta.env.BASE_URL automáticamente

## Notas importantes:

- El archivo `.nojekyll` es necesario para GitHub Pages
- Todas las rutas están configuradas con el base path correcto
- Los CSS están bundleados y optimizados
- Las fuentes e imágenes se procesan correctamente desde `src/assets/`
- **Iconos PWA:** Configurados con rutas relativas para funcionar tanto en desarrollo como en producción

## Problemas resueltos:

- ✅ Error 404 en CSS e imágenes faltantes
- ✅ Error de descarga en iconos PWA (`pwa-192x192.png`)
- ✅ Rutas incorrectas para GitHub Pages
- ✅ Fuentes e imágenes no procesadas por Vite
- ✅ Error de Vue Router "[Vue Router warn]: No match found for location with path '/greiman-pwa/'" en desarrollo
- ✅ Error de carga de main.js "GET https://decc18.github.io/src/main.js net::ERR_ABORTED 404" en GitHub Pages
- ✅ Error 404 en videos "GET http://localhost:4176/video/...mp4 404 (Not Found)" - rutas con base path correcto
