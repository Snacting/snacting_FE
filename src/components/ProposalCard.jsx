// src/components/ProposalCard.jsx
import React from 'react';
import { IoLocationSharp, IoHeart, IoHeartOutline } from 'react-icons/io5';

function ProposalCard({ proposal, onClick, onLikeToggle }) {
  if (!proposal) return null;

  // 백엔드(OwnerRequest) 필드명 기준으로 매핑
  const storeName =
    proposal.storeLocation || // 백엔드 필드
    proposal.storeName ||     // 예전 프론트 필드
    '가게 이름 없음';

  const menuName =
    proposal.productName ||   // 백엔드 필드
    proposal.menuName ||      // 예전 프론트 필드
    '메뉴 이름 없음';

  const rawPrice =
    typeof proposal.pricePerPerson === 'number'
      ? proposal.pricePerPerson
      : typeof proposal.price === 'number'
      ? proposal.price
      : null;

  const priceText = rawPrice !== null ? rawPrice.toLocaleString() : '-';

  return (
    <div className="proposal-card" onClick={onClick}>
      <div className="proposal-card-inner">
        <div className="proposal-image-wrapper">
          <div className="proposal-image-placeholder">
            🥪
          </div>
        </div>

        <div className="proposal-content">
          <div className="store-name">
            <IoLocationSharp className="icon" />
            {storeName}
          </div>

          <div className="menu-info">
            <p className="menu-name">{menuName}</p>
            <p className="menu-price">
              {priceText} 원
            </p>
          </div>
        </div>

        <button
          className={`like-btn ${proposal.liked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle();
          }}
        >
          {proposal.liked ? <IoHeart /> : <IoHeartOutline />}
        </button>
      </div>
    </div>
  );
}

export default ProposalCard;
