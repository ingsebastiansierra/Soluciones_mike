// Configuración de EmailJS
// Para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Crea un servicio de email (Gmail, Outlook, etc.)
// 4. Crea un template de email
// 5. Obtén tu Public Key
// 6. Reemplaza los valores aquí

export const EMAILJS_CONFIG = {
  // Service ID de EmailJS
  serviceId: 'service_rrcsegl',
  
  // Template ID de EmailJS
  templateId: 'template_c3zxmdo',
  
  // Public Key de EmailJS
  publicKey: 'r78y4y5X_Gq9iq1Gg'
};

// Template sugerido para EmailJS:
/*
Asunto: Nuevo mensaje de contacto - {{subject}}

Hola Soluciones Mike,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Fecha: {{date}}
Hora: {{time}}

Responder a: {{reply_to}}
*/

// Alternativa con Formspree (más simple)
export const FORMSPREE_CONFIG = {
  // Reemplaza con tu Form ID de Formspree
  // Ve a https://formspree.io/ y crea una cuenta gratuita
  formId: 'tu_form_id_aqui' // Ejemplo: 'xvgpkjqw'
};

// Alternativa con Netlify Forms (si usas Netlify)
export const NETLIFY_CONFIG = {
  // Solo necesitas agregar data-netlify="true" al form
  // Netlify detectará automáticamente el formulario
  enabled: false
};