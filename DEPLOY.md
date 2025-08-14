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

- **Base path:** `/greiman-pwa/`
- **PWA icons:** Configurados con rutas relativas (✅ Corregido el error de descarga)
- **Manifest:** Configurado para GitHub Pages con rutas correctas
- **Service Worker:** Incluido y funcional
- **Assets:** CSS, imágenes y fuentes procesadas correctamente desde src/assets/

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
