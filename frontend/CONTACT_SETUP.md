# 📧 Configuración del Formulario de Contacto

El formulario de contacto está listo para funcionar. Solo necesitas configurar uno de estos servicios:

## 🚀 Opción 1: Formspree (MÁS FÁCIL - RECOMENDADA)

### Pasos:
1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia tu Form ID (ejemplo: `xvgpkjqw`)
5. Pega el ID en `frontend/src/config/email.js`:

```javascript
export const FORMSPREE_CONFIG = {
  formId: 'xvgpkjqw' // Tu Form ID aquí
};
```

### Ventajas:
- ✅ Configuración en 2 minutos
- ✅ 50 envíos gratis por mes
- ✅ No necesita configuración de servidor
- ✅ Protección anti-spam incluida

---

## 📨 Opción 2: EmailJS

### Pasos:
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Conecta tu servicio de email (Gmail, Outlook, etc.)
4. Crea un template de email con estas variables:
   - `{{from_name}}` - Nombre del remitente
   - `{{from_email}}` - Email del remitente
   - `{{phone}}` - Teléfono
   - `{{subject}}` - Asunto
   - `{{message}}` - Mensaje
   - `{{date}}` - Fecha
   - `{{time}}` - Hora

5. Obtén tu Service ID, Template ID y Public Key
6. Actualiza `frontend/src/config/email.js`:

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  publicKey: 'user_def456'
};
```

### Ventajas:
- ✅ 200 envíos gratis por mes
- ✅ Templates personalizables
- ✅ Múltiples servicios de email

---

## 🔧 Opción 3: Backend Propio

Si prefieres un backend propio, puedes:

1. Crear un endpoint en tu servidor
2. Actualizar `sendContactEmail` en `emailService.js`
3. Usar nodemailer, SendGrid, etc.

---

## 🧪 Modo Desarrollo

Actualmente el formulario funciona en **modo desarrollo**:
- Los mensajes se guardan en `localStorage`
- Puedes ver los mensajes en DevTools > Application > Local Storage
- Simula éxito/error para testing

---

## 📱 Configuración Adicional

### Para WhatsApp (Opcional):
Puedes agregar un botón de WhatsApp que pre-llene un mensaje:

```javascript
const sendWhatsApp = (formData) => {
  const message = `Hola! Mi nombre es ${formData.name}. ${formData.message}`;
  const whatsappUrl = `https://wa.me/573121310650?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
```

### Para Telegram (Opcional):
```javascript
const sendTelegram = (formData) => {
  const message = `Nuevo contacto:\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`;
  // Usar Telegram Bot API
};
```

---

## ✅ Estado Actual

- ✅ Formulario funcional con validación
- ✅ Estados de loading y éxito/error
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Accesibilidad
- ⏳ Pendiente: Configurar servicio de email

**¡Solo falta configurar el servicio de email que prefieras!**