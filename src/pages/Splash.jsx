// src/pages/Splash.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import '../styles/splash.css';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 자동 이동
    const timer = setTimeout(() => {
      if (authUtils.isAuthenticated()) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-decoration top-left"></div>
      <div className="splash-decoration bottom-right"></div>
      
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <img 
            src="/images/logo.png" 
            alt="Snacting" 
            className="splash-logo-image"
          />
        </div>
        <p className="splash-subtitle">간식연결부</p>
      </div>
    </div>
  );
}

export default Splash;