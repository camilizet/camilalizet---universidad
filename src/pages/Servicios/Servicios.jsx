import React from 'react';
import './Servicios.css';

// Array de objetos con datos de habitaciones de hotel
const habitaciones = [
  {
    id: 1,
    nombre: 'Suite Presidencial',
    imagen: '/suite.jpg',
    descripcion: 'Lujosa suite con vista panorámica y jacuzzi privado',
    precio: 350,
    capacidad: 2,
    servicios: ['WiFi', 'TV Smart', 'Jacuzzi', 'Minibar']
  },
  {
    id: 2,
    nombre: 'Habitación Deluxe',
    imagen: '/deluxe.jpg',
    descripcion: 'Habitación elegante con balcón y vista al jardín',
    precio: 180,
    capacidad: 2,
    servicios: ['WiFi', 'TV Cable', 'Aire Acondicionado', 'Minibar']
  },
  {
    id: 3,
    nombre: 'Habitación Familiar',
    imagen: '/familiar.jpg',
    descripcion: 'Espaciosa habitación ideal para familias con dos camas',
    precio: 220,
    capacidad: 4,
    servicios: ['WiFi', 'TV Cable', 'Aire Acondicionado', 'Cocina']
  },
  {
    id: 4,
    nombre: 'Habitación Ejecutiva',
    imagen: '/ejecutiva.jpeg',
    descripcion: 'Diseñada para ejecutivos con área de trabajo. Excelente área de iluminación.',
    precio: 200,
    capacidad: 1,
    servicios: ['WiFi', 'Escritorio', 'TV Smart']
  },
  {
    id: 5,
    nombre: 'Habitación Standard',
    imagen: '/standard.jpg',
    descripcion: 'Confortable habitación con todas las comodidades básicas',
    precio: 120,
    capacidad: 2,
    servicios: ['WiFi', 'TV Cable', 'Aire Acondicionado']
  },
  {
    id: 6,
    nombre: 'Suite Romántica',
    imagen: '/parejas.jpg',
    descripcion: 'Ambiente íntimo con decoración especial para parejas',
    precio: 280,
    capacidad: 2,
    servicios: ['Jacuzzi', 'Champagne', 'Decoración especial']
  }
];

const Servicios = () => {
  return (
    <div className="servicios">
      <div className="servicios__container">
        <div className="servicios__header">
          <h1 className="servicios__title">Nuestras Habitaciones</h1>
          <p className="servicios__subtitle">
            Descubre nuestras exclusivas habitaciones diseñadas para tu máximo confort
          </p>
        </div>

        <div className="servicios__grid">
          {habitaciones.map((habitacion) => (
            <div key={habitacion.id} className="servicios__card">
              <div className="servicios__card-image">
                <img 
                  src={habitacion.imagen} 
                  alt={habitacion.nombre}
                />
                <div className="servicios__card-badge">
                  ${habitacion.precio}/noche
                </div>
              </div>

              <div className="servicios__card-content">
                <h3 className="servicios__card-title">{habitacion.nombre}</h3>
                <p className="servicios__card-description">
                  {habitacion.descripcion}
                </p>

                <div className="servicios__card-info">
                  <div className="servicios__card-capacity">
                    <span className="servicios__icon">👥</span>
                    <span>Capacidad: {habitacion.capacidad} personas</span>
                  </div>
                </div>

                <div className="servicios__card-services">
                  <h4>Servicios incluidos:</h4>
                  <ul>
                    {habitacion.servicios.map((servicio, index) => (
                      <li key={index}>
                        <span>✓</span> {servicio}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="servicios__card-button">
                  Reservar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;