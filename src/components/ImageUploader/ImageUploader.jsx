import React, { useState, useCallback } from 'react';
import Message from '../ui/Message/Message';
import ImagePreview from '../ui/ImagePreview';
import './ImageUploader.css';

const ImageUploader = () => {
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Tipos de imagen permitidos
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
    'image/webp'
  ];

  // Función para mostrar mensajes
  const showMessage = useCallback((message, type) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      type: type
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Auto-ocultar mensajes de éxito después de 3 segundos
    if (type === 'success') {
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      }, 3000);
    }
  }, []);

  // Validar archivo de imagen
  const validateImageFile = useCallback((file) => {
    return allowedImageTypes.includes(file.type.toLowerCase());
  }, [allowedImageTypes]);

  // Formatear tamaño de archivo
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Procesar archivo
  const processFile = useCallback((file) => {
    // Limpiar estado anterior
    setMessages([]);
    setImageData(null);

    // Validación 1: Verificar que es un archivo válido
    if (!(file instanceof File)) {
      showMessage('Error: No se ha seleccionado un archivo válido.', 'error');
      return;
    }

    // Validación 2: Validar que es una imagen
    if (!validateImageFile(file)) {
      showMessage('Error: El archivo seleccionado no es una imagen válida. Por favor, selecciona un archivo de imagen (JPG, PNG, GIF, BMP, SVG, WEBP).', 'error');
      return;
    }

    // Validación 3: Validar tamaño (10MB máximo)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showMessage('Error: La imagen es demasiado grande. El tamaño máximo permitido es 10MB.', 'error');
      return;
    }

    // Si todo está bien, procesar la imagen
    showMessage('✅ Imagen válida cargada correctamente!', 'success');
    displayImage(file);
  }, [validateImageFile, showMessage]);

  // Mostrar imagen
  const displayImage = useCallback((file) => {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      
      setImageData({
        url: imageUrl,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      });
    };
    
    reader.onerror = function() {
      showMessage('Error: No se pudo leer el archivo de imagen.', 'error');
    };
    
    reader.readAsDataURL(file);
  }, [showMessage]);

  // Manejar selección de archivo
  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  // Manejar drag over
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  // Manejar drag leave
  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  // Manejar drop
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <div className="image-uploader">
      <div className="image-uploader__container">
        <h1 className="image-uploader__title">
          📷 ¡Subí tu imagen!
        </h1>
        
        {/* Sección de carga */}
        <div 
          className={`image-uploader__upload-section ${isDragOver ? 'image-uploader__upload-section--dragover' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="image-uploader__upload-icon">📁</div>
          <div className="image-uploader__upload-text">
            Arrastra tu imagen aquí o haz clic para seleccionar
          </div>
          <label htmlFor="imageInput" className="image-uploader__file-label">
            Seleccionar Imagen
          </label>
          <input 
            type="file" 
            id="imageInput" 
            accept="image/*"
            className="image-uploader__file-input"
            onChange={handleFileSelect}
          />
          <div className="image-uploader__supported-formats">
            Formatos soportados: JPG, PNG, GIF, BMP, SVG, WEBP
          </div>
        </div>

        {/* Mensajes */}
        <div className="image-uploader__messages">
          {messages.map((message) => (
            <Message 
              key={message.id}
              text={message.text}
              type={message.type}
            />
          ))}
        </div>
        
        {/* Vista previa de imagen */}
        {imageData && (
          <ImagePreview 
            imageData={imageData}
            formatFileSize={formatFileSize}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;