import React from 'react';
import './ImagePreview.css';

const ImagePreview = ({ imageData, formatFileSize }) => {
  return (
    <div className="image-preview">
      <h3 className="image-preview__title">
        Vista Previa de la Imagen
      </h3>
      
      <div className="image-preview__container">
        <img 
          src={imageData.url} 
          alt="Imagen cargada"
          className="image-preview__image"
        />
      </div>
      
      <div className="image-preview__info">
        <div className="image-preview__info-item">
          <span className="image-preview__info-label">Nombre:</span>
          <span className="image-preview__info-value">{imageData.name}</span>
        </div>
        <div className="image-preview__info-item">
          <span className="image-preview__info-label">Tipo:</span>
          <span className="image-preview__info-value">{imageData.type}</span>
        </div>
        <div className="image-preview__info-item">
          <span className="image-preview__info-label">Tamaño:</span>
          <span className="image-preview__info-value">{formatFileSize(imageData.size)}</span>
        </div>
        <div className="image-preview__info-item">
          <span className="image-preview__info-label">Última modificación:</span>
          <span className="image-preview__info-value">
            {new Date(imageData.lastModified).toLocaleString('es-ES')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;