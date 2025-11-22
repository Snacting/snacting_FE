// src/components/StoreCard.jsx
import React from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

function StoreCard({ store, liked, onLikeToggle }) {
  if (!store) return null;

  // ✅ 백엔드(Product) 응답 필드 기준으로 매핑
  const name =
    store.storeLocation ||   // BE: 가게 위치/이름
    store.name ||            // 혹시 프론트에서 따로 넣은 경우
    '가게 이름 없음';

  const menu =
    store.productName ||     // BE: 상품 이름
    store.menuName ||        // 예전 프론트 필드
    '메뉴 정보 없음';

  // ✅ 가격 필드를 여러 케이스에 대비해서 안전하게 처리
  const rawPrice =
    typeof store.pricePerPerson === 'number'
      ? store.pricePerPerson
      : typeof store.perPersonPrice === 'number'
      ? store.perPersonPrice
      : typeof store.price === 'number'
      ? store.price
      : null;

  const priceText = rawPrice !== null ? rawPrice.toLocaleString() : '-';

  return (
    <div className="store-card">
      {/* 가게 이름 */}
      <h3 className="store-name">{name}</h3>

      {/* 이미지 자리 */}
      <div className="store-image-wrapper">
        <div className="store-image-placeholder">🥪</div>
      </div>

      {/* 메뉴/가격 정보 */}
      <div className="store-menu-info">
        <p className="menu-name">{menu}</p>
        <p className="per-person-price">1인당 {priceText}원</p>
      </div>

      {/* 좋아요 버튼 */}
      <button
        className={`like-btn-store ${liked ? 'liked' : ''}`}
        onClick={onLikeToggle}
      >
        {liked ? <IoHeart /> : <IoHeartOutline />}
      </button>
    </div>
  );
}

export default StoreCard;
