// src/components/BottomNavBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoStorefront, IoHome, IoHeart } from 'react-icons/io5';

function BottomNavBar({ activeTab }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${activeTab === 'store' ? 'active' : ''}`}
        onClick={() => navigate('/stores')}
      >
        <IoStorefront className="nav-icon" />
        <span className="nav-label">가게</span>
      </button>

      <button
        className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <IoHome className="nav-icon" />
        <span className="nav-label">홈</span>
      </button>

      <button
        className={`nav-btn ${activeTab === 'favorite' ? 'active' : ''}`}
        onClick={() => navigate('/favorite')}
      >
        <IoHeart className="nav-icon" />
        <span className="nav-label">찜</span>
      </button>
    </nav>
  );
}

export default BottomNavBar;