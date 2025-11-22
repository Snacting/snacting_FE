// src/pages/ProposalDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCart, IoCall } from 'react-icons/io5';
import BottomNavBar from '../components/BottomNavBar';

function ProposalDetail({ proposals }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const numericId = Number(id);
  const proposal = proposals.find((p) => p.id === numericId);

  if (!proposal) {
    return <div>제안을 찾을 수 없습니다.</div>;
  }

  // ✅ 백엔드/프론트 양쪽 네이밍 모두 대응
  const storeName = proposal.storeLocation || proposal.storeName || '';
  const productName = proposal.productName || proposal.menuName || '';
  const price =
    proposal.pricePerPerson ??
    proposal.price ??
    0;

  const firstWordOfStore = storeName.split(' ')[0] || storeName;

  const handleOrder = () => {
    alert('주문 기능은 준비 중입니다!');
  };

  const handleContact = () => {
    alert('문의 기능은 준비 중입니다!');
  };

  return (
    <div className="page-container proposal-detail-page">
      <div className="proposal-hero">
        <div className="cookie-decorations">
          <div className="cookie-deco left"></div>
          <div className="cookie-deco right"></div>
        </div>

        <h1 className="greeting">공알공알님,</h1>
        <p className="proposal-intro">
          {firstWordOfStore} 사장님이 간식을 제안했어요
        </p>

        <div className="proposal-info-card">
          <div className="decorative-lines">
            <span className="line left-line"></span>
            <span className="line right-line"></span>
          </div>
          <h2 className="menu-name">{productName}</h2>
          <p className="menu-price">{price.toLocaleString()} 원</p>
        </div>

        <div className="action-buttons-large">
          <button className="action-btn-large primary" onClick={handleOrder}>
            <IoCart className="icon" />
            주문하기
          </button>
          <button className="action-btn-large primary" onClick={handleContact}>
            <IoCall className="icon" />
            문의하기
          </button>
        </div>
      </div>

      <div className="logo-center">
        <div className="logo-container-detail">
          <div className="eye left-eye">
            <div className="pupil"></div>
          </div>
          <h1 className="logo-text">Snacting</h1>
          <div className="eye right-eye">
            <div className="pupil"></div>
          </div>
        </div>
        <div className="pixel-squares">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <BottomNavBar activeTab="home" />
    </div>
  );
}

export default ProposalDetail;
