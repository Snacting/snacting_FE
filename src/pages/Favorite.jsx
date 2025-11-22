// src/pages/Favorite.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import FavoriteCard from '../components/FavoriteCard';
import { ownerRequestService } from '../services/ownerRequestService';
import { productService } from '../services/productService';
import '../styles/favorite.css';

function Favorite() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('proposals'); // 'proposals' or 'products'
  const [likedProposals, setLikedProposals] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 좋아요한 사장님 제안 조회
  useEffect(() => {
    const fetchLikedProposals = async () => {
      try {
        setLoading(true);
        const data = await ownerRequestService.getLikedOwnerRequests();
        setLikedProposals(data);
      } catch (error) {
        console.error('좋아요한 제안 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProposals();
  }, []);

  // 좋아요한 상품 조회
  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getLikedProducts();
        setLikedProducts(data);
      } catch (error) {
        console.error('좋아요한 상품 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, []);

  // 좋아요 토글 (사장님 제안)
  const toggleProposalLike = async (proposalId) => {
    try {
      await ownerRequestService.toggleLike(proposalId);
      
      // 로컬 상태에서 제거
      setLikedProposals(prev => prev.filter(p => p.id !== proposalId));
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  // 좋아요 토글 (상품)
  const toggleProductLike = async (productId) => {
    try {
      await productService.toggleLike(productId);
      
      // 로컬 상태에서 제거
      setLikedProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  const handleCardClick = (id) => {
    if (activeTab === 'proposals') {
      navigate(`/proposal/${id}`);
    } else {
      // 상품 상세 페이지로 이동 (추후 구현)
      navigate(`/product/${id}`);
    }
  };

  const currentList = activeTab === 'proposals' ? likedProposals : likedProducts;
  const isEmpty = currentList.length === 0;

  return (
    <div className="page-container favorite-page">
      {/* 헤더 */}
      <div className="favorite-header">
        <p className="favorite-want">want...</p>
        <div className="favorite-logo-container">
          <div className="eye left-eye">
            <div className="pupil"></div>
          </div>
          <h1 className="favorite-logo">Snacting</h1>
          <div className="eye right-eye">
            <div className="pupil"></div>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="favorite-tabs">
        <button
          className={`tab-btn ${activeTab === 'proposals' ? 'active' : ''}`}
          onClick={() => setActiveTab('proposals')}
        >
          사장님 제안
          {likedProposals.length > 0 && (
            <span className="tab-count">{likedProposals.length}</span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          상품
          {likedProducts.length > 0 && (
            <span className="tab-count">{likedProducts.length}</span>
          )}
        </button>
      </div>

      {/* 컨텐츠 */}
      <main className="favorite-content">
        {loading ? (
          <div className="loading-container">로딩 중...</div>
        ) : isEmpty ? (
          <div className="empty-favorite">
            <div className="empty-heart">💔</div>
            <p className="empty-message">
              {activeTab === 'proposals' 
                ? '좋아요한 사장님 제안이 없어요' 
                : '좋아요한 상품이 없어요'}
            </p>
            <button 
              className="go-browse-btn"
              onClick={() => navigate(activeTab === 'proposals' ? '/home' : '/stores')}
            >
              {activeTab === 'proposals' ? '제안 보러가기' : '가게 둘러보기'}
            </button>
          </div>
        ) : (
          <div className="favorite-grid">
            {currentList.map((item) => (
              <FavoriteCard
                key={item.id}
                item={item}
                onClick={() => handleCardClick(item.id)}
                onLikeToggle={() => 
                  activeTab === 'proposals' 
                    ? toggleProposalLike(item.id)
                    : toggleProductLike(item.id)
                }
              />
            ))}
          </div>
        )}
      </main>

      <BottomNavBar activeTab="favorite" />
    </div>
  );
}

export default Favorite;