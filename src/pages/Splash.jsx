// src/pages/Splash.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/splash.css';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 로그인 화면으로 이동
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      {/* 상단 픽셀 쿠키 */}
      <div className="splash-cookie top">
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
      </div>

      {/* 중앙 로고 */}
      <div className="splash-content">
        <h1 className="splash-logo">Snacting</h1>
        <p className="splash-subtitle">간식의컬쳐부</p>
      </div>

      {/* 하단 픽셀 쿠키 */}
      <div className="splash-cookie bottom">
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
        <div className="pixel-block"></div>
      </div>
    </div>
  );
}

export default Splash;