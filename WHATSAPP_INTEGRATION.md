# Integración WhatsApp - Botón Contactar

## Funcionalidad implementada

Se ha agregado funcionalidad de contacto por WhatsApp en ambas páginas de productos:

### 🔗 **URL de WhatsApp configurada:**
```
https://api.whatsapp.com/send?phone=593997585127&text=%C2%A1Hola%20Graiman!%20Vi%20sus%20productos%20en%20la%20web%20y%20estoy%20interesado/a.%20Quiero%20recibir%20asesor%C3%ADa.
```

### 📱 **Detalles del enlace:**
- **Número de teléfono:** 593997585127 (Ecuador)
- **Mensaje pre-rellenado:** "¡Hola Graiman! Vi sus productos en la web y estoy interesado/a. Quiero recibir asesoría."
- **Comportamiento:** Abre en una nueva pestaña/ventana

### 🛠 **Archivos modificados:**

1. **src/views/Porcelanato.vue**
   - Agregado evento `@click="contactWhatsApp"` al botón CONTACTAR
   - Implementado método `contactWhatsApp()` en los métodos del componente

2. **src/views/Regadera.vue**  
   - Agregado evento `@click="contactWhatsApp"` al botón Contactar
   - Implementado método `contactWhatsApp()` en los métodos del componente

### 💻 **Código implementado:**

```javascript
methods: {
  contactWhatsApp() {
    // Abrir WhatsApp con mensaje personalizado
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=593997585127&text=%C2%A1Hola%20Graiman!%20Vi%20sus%20productos%20en%20la%20web%20y%20estoy%20interesado/a.%20Quiero%20recibir%20asesor%C3%ADa.'
    window.open(whatsappUrl, '_blank')
  }
}
```

### ✅ **Beneficios:**

- **Contacto directo:** Los usuarios pueden contactar inmediatamente desde la página del producto
- **Mensaje contextualizado:** El mensaje ya indica que vieron los productos en la web
- **Experiencia fluida:** Se abre en nueva pestaña sin interrumpir la navegación
- **Universal:** Funciona en desktop y móvil, abriendo WhatsApp Web o la app según corresponda

### 🎯 **Experiencia del usuario:**

1. Usuario ve un producto que le interesa (Porcelanato o Regadera)
2. Hace clic en el botón "CONTACTAR" / "Contactar"
3. Se abre WhatsApp con el mensaje pre-escrito
4. Solo necesita enviar el mensaje para iniciar la conversación

### 📲 **Compatibilidad:**

- **Desktop:** Abre WhatsApp Web
- **Móvil Android:** Abre la app de WhatsApp
- **Móvil iOS:** Abre la app de WhatsApp  
- **Fallback:** Si no tiene WhatsApp instalado, muestra opción de instalarlo

Esta implementación mejora significativamente la conversión de visitantes a clientes potenciales al facilitar el contacto directo.
