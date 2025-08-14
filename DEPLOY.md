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
- **PWA icons:** Configurados con rutas absolutas correctas
- **Manifest:** Configurado para GitHub Pages
- **Service Worker:** Incluido y funcional
- **Assets:** CSS, imágenes y fuentes procesadas correctamente

## Notas importantes:

- El archivo `.nojekyll` es necesario para GitHub Pages
- Todas las rutas están configuradas con el base path correcto
- Los CSS están bundleados y optimizados
- Las fuentes e imágenes se procesan correctamente
