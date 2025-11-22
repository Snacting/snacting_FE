// src/components/FavoriteCard.jsx
import React from 'react';
import { IoHeart } from 'react-icons/io5';

function FavoriteCard({ item, onClick, onLikeToggle }) {
  return (
    <div className="favorite-card" onClick={onClick}>
      <div className="favorite-card-header">
        <h3 className="favorite-store-name">{item.storeName || item.name}</h3>
        <button
          className="favorite-like-btn"
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle();
          }}
        >
          <IoHeart />
        </button>
      </div>

      <div className="favorite-image-wrapper">
        <div className="favorite-image-placeholder">
          🥪
        </div>
      </div>

      <div className="favorite-info">
        <p className="favorite-menu-name">
          {item.menuName || item.productName}
        </p>
        <p className="favorite-price">
          {item.perPersonPrice 
            ? `1인당 ${item.perPersonPrice.toLocaleString()}원`
            : `${item.price?.toLocaleString()}원`
          }
        </p>
      </div>
    </div>
  );
}

export default FavoriteCard;