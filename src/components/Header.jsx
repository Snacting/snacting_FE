// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="snacting-header">
      <div className="pixel-decoration top-left"></div>
      <div className="pixel-decoration top-right"></div>
      
      <div className="logo-container">
        <img 
          src="/images/logo.png" 
          alt="Snacting" 
          className="logo-image"
        />
      </div>

      <div className="pixel-squares">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Header;