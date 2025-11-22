// src/pages/StoreList.jsx
import React, { useState, useEffect } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import StoreCard from '../components/StoreCard';
import { productService } from '../services/productService';

function StoreList() {
  const [selectedCategories, setSelectedCategories] = useState(['bunsik', 'chicken', 'sandwich']);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const mealCategories = [
    { id: 'bunsik', label: '분식' },
    { id: 'pizza', label: '피자' },
    { id: 'chicken', label: '치킨/닭강정' },
    { id: 'fastfood', label: '패스트푸드' },
    { id: 'donkatsu', label: '돈까스/회' },
    { id: 'asian', label: '아시안/중식' },
    { id: 'dosirak', label: '도시락/간편식' },
    { id: 'sandwich', label: '샌드위치' }
  ];

  const dessertCategories = [
    { id: 'bread', label: '빵/디저트' },
    { id: 'drink', label: '음료' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        console.log('getAllProducts 응답 데이터:', data);
        setStores(data);
      } catch (error) {
        console.error('상품 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  // ✅ 좋아요 토글 시 “store 객체 전체”를 넘김
  const toggleLike = async (store) => {
    try {
      await productService.toggleLike(store);

      // productId / id 모두 대응
      const targetId = store.productId ?? store.id;

      setStores(prev =>
        prev.map(s => {
          const sId = s.productId ?? s.id;
          return sId === targetId ? { ...s, liked: !s.liked } : s;
        })
      );
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  // TODO: 카테고리 매핑은 나중에, 일단 전체 노출
  const filteredStores = stores;

  return (
    <div className="page-container browse-page">
      {/* 쿠키 장식 배경 - 4개 배치 */}
      <div className="pixel-decoration-browse top-left"></div>
      <div className="pixel-decoration-browse top-right"></div>
      <div className="pixel-decoration-browse bottom-left"></div>
      <div className="pixel-decoration-browse bottom-right"></div>

      <div className="filter-section">
        <h2 className="filter-title">원하는 메뉴 카테고리를 골라주세요</h2>

        <div className="category-group">
          <h3 className="category-group-title">식사류</h3>
          <div className="category-grid">
            {mealCategories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="category-group">
          <h3 className="category-group-title">디저트류</h3>
          <div className="category-grid">
            {dessertCategories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategories.includes(cat.id) ? 'selected' : ''}`}
                onClick={() => toggleCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">로딩 중...</div>
      ) : (
        <main className="stores-grid">
          {filteredStores.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              불러온 상품이 없습니다.
            </div>
          ) : (
            filteredStores.map(store => (
              <StoreCard
                key={store.productId ?? store.id}
                store={store}
                liked={store.liked || false}
                onLikeToggle={() => toggleLike(store)}
              />
            ))
          )}
        </main>
      )}

      <BottomNavBar activeTab="store" />
    </div>
  );
}

export default StoreList;
