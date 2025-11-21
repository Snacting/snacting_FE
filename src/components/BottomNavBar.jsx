// src/components/BottomNavBar.jsx
import React from 'react';
import { IoHome } from 'react-icons/io5';
import { MdStorefront, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = () => {
    if (location.pathname === '/home') return 'home';
    if (location.pathname === '/stores') return 'store';
    if (location.pathname === '/favorites') return 'favorite';
    return 'home';
  };

  const active = getActive();

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-btn ${active === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <IoHome className="nav-icon" />
        <span className="nav-label">홈</span>
      </button>

      <button 
        className={`nav-btn ${active === 'store' ? 'active' : ''}`}
        onClick={() => navigate('/stores')}
      >
        <MdStorefront className="nav-icon" />
        <span className="nav-label">둘러보기</span>
      </button>

      <button 
        className={`nav-btn ${active === 'favorite' ? 'active' : ''}`}
        onClick={() => navigate('/favorites')}
      >
        {active === 'favorite' ? (
          <MdFavorite className="nav-icon" />
        ) : (
          <MdFavoriteBorder className="nav-icon" />
        )}
        <span className="nav-label">찜</span>
      </button>
    </nav>
  );
}

export default BottomNavBar;