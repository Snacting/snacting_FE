// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { getLikedProducts, getLikedOwnerRequests, toggleProductLike } from '../api/snactingApi';
import BottomNavBar from '../components/BottomNavBar';
import '../styles/home.css';
import '../styles/favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      
      // 좋아요한 상품과 사장 제안 모두 불러오기
      const [likedProducts, likedOwnerRequests] = await Promise.all([
        getLikedProducts(),
        getLikedOwnerRequests()
      ]);
      
      // 두 목록 합치기
      const allFavorites = [
        ...likedProducts.map(item => ({ ...item, type: 'product' })),
        ...likedOwnerRequests.map(item => ({ ...item, type: 'owner-request' }))
      ];
      
      setFavorites(allFavorites);
    } catch (error) {
      console.error('찜 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (itemId, e) => {
    e.stopPropagation();
    
    try {
      await toggleProductLike(itemId);
      // 로컬 상태에서 제거
      setFavorites(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('찜 해제 실패:', error);
      alert('찜 해제에 실패했습니다.');
    }
  };

  const handleStoreClick = (itemId) => {
    console.log('찜 항목 클릭:', itemId);
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="cookie-left">
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
        </div>
        <h1 className="logo">Snacting</h1>
        <div className="cookie-right">
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
        </div>
      </header>

      <div className="divider"></div>

      <main className="main-content">
        {favorites.length === 0 ? (
          <section className="favorites-empty">
            <div className="empty-content">
              <div className="empty-heart">
                <MdFavoriteBorder className="empty-heart-icon" />
              </div>
              <p className="empty-message">
                아직 찜한 제안이 없어요<br />
                마음에 드는 제안을 찜해보세요!
              </p>
            </div>
          </section>
        ) : (
          <section className="favorites-section">
            <h2 className="favorites-title">찜한 제안 ({favorites.length})</h2>
            
            <div className="favorites-grid">
              {favorites.map(item => (
                <div 
                  key={item.id} 
                  className="favorite-item"
                  onClick={() => handleStoreClick(item.id)}
                >
                  <p className="favorite-store-name">{item.storeName || item.name}</p>

                  <div className="favorite-img">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="img-placeholder">
                        <span className="placeholder-text">Road</span>
                        <span className="placeholder-text">Sandwich</span>
                      </div>
                    )}
                  </div>

                  <div className="favorite-details">
                    <p className="favorite-menu">{item.description || item.menu}</p>
                    <p className="favorite-price">
                      1인당 {(item.pricePerPerson || item.price)?.toLocaleString()}원
                    </p>
                  </div>

                  <button 
                    className="unfavorite-btn"
                    onClick={(e) => removeFavorite(item.id, e)}
                  >
                    <MdFavorite className="heart-icon-favorite filled" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}

export default Favorites;