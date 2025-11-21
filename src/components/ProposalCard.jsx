// src/components/ProposalCard.jsx
import React, { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';

function ProposalCard({ proposal, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="proposal-card" onClick={onClick}>
      {/* 가게 이미지 */}
      <div className="card-image">
        <div className="store-logo">
          <div className="logo-text">Road</div>
          <div className="logo-text">Sandwich</div>
        </div>
      </div>

      {/* 카드 정보 */}
      <div className="card-content">
        <div className="store-info">
          <FaMapMarkerAlt className="location-icon-small" />
          <span className="store-name">{proposal.storeName}</span>
        </div>

        <div className="menu-box">
          <div className="menu-name">{proposal.menuName}</div>
        </div>

        <div className="price-text">{proposal.price.toLocaleString()} 원</div>
      </div>

      {/* 하트 버튼 */}
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? (
          <MdFavorite className="heart-icon filled" />
        ) : (
          <MdFavoriteBorder className="heart-icon" />
        )}
      </button>
    </div>
  );
}

export default ProposalCard;
