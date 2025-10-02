import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Configurar EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Administrador",
        reply_to: formData.email,
      };
      await emailjs.send(
        "service_tqkrdr4",
        "template_nz4fyhg",
        templateParams,
        "bhtv4xPIJsf_t3OLd" 
      );

      // Mostrar mensaje de éxito
      setShowSuccess(true);

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h1 className="contact__title">📧 Contacto</h1>
          <p className="contact__subtitle">
            ¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría saber de ti!
          </p>
        </div>

        {showSuccess && (
          <div className="contact__success">
            <div className="contact__success-icon">✅</div>
            <h3>¡Mensaje Enviado Correctamente!</h3>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
          </div>
        )}

        <div className="contact__content">
          {/* Formulario */}
          <div className="contact__form-section">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__label">
                  👤 Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact__input ${
                    errors.name ? "contact__input--error" : ""
                  }`}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.name && (
                  <span className="contact__error">{errors.name}</span>
                )}
              </div>

              <div className="contact__form-group">
                <label htmlFor="email" className="contact__label">
                  📧 Dirección de Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact__input ${
                    errors.email ? "contact__input--error" : ""
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <span className="contact__error">{errors.email}</span>
                )}
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__label">
                  💬 Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`contact__textarea ${
                    errors.message ? "contact__input--error" : ""
                  }`}
                  placeholder="Escribe tu mensaje aquí..."
                  rows="6"
                />
                {errors.message && (
                  <span className="contact__error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="contact__submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="contact__spinner"></span>
                    Enviando...
                  </>
                ) : (
                  <>🚀 Enviar Mensaje</>
                )}
              </button>
            </form>
          </div>

          {/* Mapa */}
          <div className="contact__map-section">
            <div className="contact__map-container">
              <h3>📍 Nuestra Ubicación</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.2511818619855!2d-65.41453289029732!3d-24.786851107661555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc3bba3c3fefd%3A0xe77d2372b09385c9!2sHotel%20Alejandro%20I%2C%20Affiliated%20by%20Meli%C3%A1!5e0!3m2!1ses!2sar!4v1759424295746!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación"
              ></iframe>
            </div>
            <div className="contact__info">
              <h3>📞 Información de Contacto</h3>
              <div className="contact__info-item">
                <span className="contact__info-icon">📧</span>
                <span>info@mihotel.com</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">📱</span>
                <span>+54 387 123-4567</span>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">📍</span>
                <span>Salta, Argentina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
