import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/" className="navbar__logo">
            📷 Mi App
          </Link>
        </div>

        <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--active' : ''}`}>
          <Link 
            to="/subir-imagen" 
            className={`navbar__link ${isActive('/subir-imagen') || isActive('/') ? 'navbar__link--active' : ''}`}
            onClick={closeMenu}
          >
            📁 Subir Imagen
          </Link>
          <Link 
            to="/servicios" 
            className={`navbar__link ${isActive('/servicios') ? 'navbar__link--active' : ''}`}
            onClick={closeMenu}
          >
            🏨 Servicios
          </Link>
          <Link 
            to="/contacto" 
            className={`navbar__link ${isActive('/contacto') ? 'navbar__link--active' : ''}`}
            onClick={closeMenu}
          >
            📧 Contacto
          </Link>
        </div>

        <div className="navbar__toggle" onClick={toggleMenu}>
          <span className={`navbar__toggle-bar ${isMenuOpen ? 'navbar__toggle-bar--active' : ''}`}></span>
          <span className={`navbar__toggle-bar ${isMenuOpen ? 'navbar__toggle-bar--active' : ''}`}></span>
          <span className={`navbar__toggle-bar ${isMenuOpen ? 'navbar__toggle-bar--active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;