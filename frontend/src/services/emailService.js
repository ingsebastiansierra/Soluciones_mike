import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, FORMSPREE_CONFIG } from '../config/email';

/**
 * Envía un email usando la opción más simple disponible
 * @param {Object} formData - Datos del formulario
 * @returns {Promise} - Promesa con el resultado del envío
 */
export const sendContactEmail = async (formData) => {
  // Opción 1: Usar Formspree (más simple)
  if (FORMSPREE_CONFIG.formId && FORMSPREE_CONFIG.formId !== 'tu_form_id_aqui') {
    return await sendContactEmailFormspree(formData);
  }
  
  // Opción 2: Usar EmailJS
  if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'tu_public_key_aqui') {
    return await sendContactEmailEmailJS(formData);
  }
  
  // Opción 3: Simulación para desarrollo
  return await simulateEmailSend(formData);
};

/**
 * Envía email usando EmailJS
 */
const sendContactEmailEmailJS = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'No proporcionado',
      subject: formData.subject || 'Consulta desde el sitio web',
      message: formData.message,
      to_name: 'Soluciones Mike',
      reply_to: formData.email,
      date: new Date().toLocaleDateString('es-CO'),
      time: new Date().toLocaleTimeString('es-CO')
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    return {
      success: true,
      message: '¡Mensaje enviado exitosamente! Te responderemos pronto.',
      data: response
    };

  } catch (error) {
    console.error('Error al enviar email con EmailJS:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
      error: error.message
    };
  }
};

/**
 * Simulación de envío para desarrollo
 */
const simulateEmailSend = async (formData) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simular éxito/error aleatorio para testing
  const isSuccess = Math.random() > 0.1; // 90% de éxito
  
  if (isSuccess) {
    // Guardar en localStorage para desarrollo
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    
    return {
      success: true,
      message: '¡Mensaje enviado exitosamente! (Modo desarrollo - guardado en localStorage)'
    };
  } else {
    return {
      success: false,
      message: 'Error simulado para testing. Intenta de nuevo.'
    };
  }
};

/**
 * Alternativa usando Formspree (más simple)
 * @param {Object} formData - Datos del formulario
 * @returns {Promise} - Promesa con el resultado del envío
 */
export const sendContactEmailFormspree = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/tu_form_id_aqui', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `Nuevo mensaje de ${formData.name} - ${formData.subject}`
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: '¡Mensaje enviado exitosamente! Te responderemos pronto.'
      };
    } else {
      throw new Error('Error en el servidor');
    }

  } catch (error) {
    console.error('Error al enviar email:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.'
    };
  }
};

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar teléfono colombiano
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si es válido
 */
export const validatePhone = (phone) => {
  if (!phone) return true; // Teléfono es opcional
  const phoneRegex = /^(\+57|57)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validar formulario completo
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Resultado de la validación
 */
export const validateForm = (formData) => {
  const errors = {};

  // Validar nombre
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validar email
  if (!formData.email) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'El email no es válido';
  }

  // Validar teléfono
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'El teléfono no es válido (formato: +57 300 123 4567)';
  }

  // Validar asunto
  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres';
  }

  // Validar mensaje
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};