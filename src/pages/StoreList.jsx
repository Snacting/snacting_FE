// src/pages/StoreList.jsx
import React, { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { getAllProducts, getProducts, toggleProductLike, getLikedProducts } from '../api/snactingApi';
import BottomNavBar from '../components/BottomNavBar';
import '../styles/home.css';
import '../styles/storeList.css';

function StoreList() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const mealCategories = ['분식', '피자', '치킨/닭강정', '패스트푸드', '돈까스/회', '아시안/중식', '도시락/간편식', '샌드위치'];
  const dessertCategories = ['빵/디저트', '음료'];

  // 컴포넌트 마운트 시 상품 목록 및 좋아요 목록 불러오기
  useEffect(() => {
    loadProducts();
    loadLikedProducts();
  }, [selectedCategories]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      let productData;
      if (selectedCategories.length > 0) {
        // 카테고리 필터링된 상품 조회 (예산 내)
        productData = await getProducts({
          categories: selectedCategories.join(',')
        });
      } else {
        // 전체 상품 조회
        productData = await getAllProducts();
      }
      
      setProducts(productData);
    } catch (error) {
      console.error('상품 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLikedProducts = async () => {
    try {
      const liked = await getLikedProducts();
      // 좋아요한 상품 ID만 추출
      setLikedProducts(liked.map(item => item.id));
    } catch (error) {
      console.error('좋아요 목록 불러오기 실패:', error);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLikeToggle = async (productId, e) => {
    e.stopPropagation();
    
    try {
      await toggleProductLike(productId);
      
      // 로컬 상태 업데이트
      setLikedProducts(prev => {
        if (prev.includes(productId)) {
          return prev.filter(id => id !== productId);
        } else {
          return [...prev, productId];
        }
      });
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  const handleStoreClick = (productId) => {
    console.log('상품 클릭:', productId);
    // TODO: 상세 페이지로 이동
  };

  return (
    <div className="app">
      <header className="header">
        <div className="cookie-left">
          <div className="cookie-pixel" />
          <div className="cookie-pixel" />
          <div className="cookie-pixel" />
        </div>
        <h1 className="logo">Snacting</h1>
        <div className="cookie-right">
          <div className="cookie-pixel" />
          <div className="cookie-pixel" />
          <div className="cookie-pixel" />
        </div>
      </header>

      <div className="divider" />

      <main className="main-content">
        <section className="filter-container">
          <h2 className="filter-heading">원하는 메뉴 카테고리를 골라주세요</h2>

          <div className="filter-group">
            <h3 className="filter-label">식사류</h3>
            <div className="filter-tags">
              {mealCategories.map((category) => (
                <button
                  key={category}
                  className={`filter-tag ${selectedCategories.includes(category) ? 'active' : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-label">디저트류</h3>
            <div className="filter-tags">
              {dessertCategories.map((category) => (
                <button
                  key={category}
                  className={`filter-tag ${selectedCategories.includes(category) ? 'active' : ''}`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="store-grid-section">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>로딩 중...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>상품이 없습니다</p>
            </div>
          ) : (
            <div className="store-grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="store-item"
                  onClick={() => handleStoreClick(product.id)}
                >
                  <p className="store-title">{product.storeName || product.name}</p>

                  <div className="store-img">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="img-placeholder">
                        <span className="placeholder-text">Road</span>
                        <span className="placeholder-text">Sandwich</span>
                      </div>
                    )}
                  </div>

                  <div className="store-details">
                    <p className="menu-text">{product.description || product.menu}</p>
                    <p className="price-text">
                      1인당 {(product.pricePerPerson || product.price)?.toLocaleString()}원
                    </p>
                  </div>

                  <button
                    className="like-btn"
                    onClick={(e) => handleLikeToggle(product.id, e)}
                  >
                    {likedProducts.includes(product.id) ? (
                      <MdFavorite className="like-icon filled" />
                    ) : (
                      <MdFavoriteBorder className="like-icon" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}

export default StoreList;