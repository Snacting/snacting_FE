// src/pages/ProposalDetail.jsx
import React from 'react';
import { FaCashRegister, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import BottomNavBar from '../components/BottomNavBar';
import '../styles/home.css';            // 공통 레이아웃
import '../styles/proposalDetail.css';  // 상세 페이지 전용

function ProposalDetail({ proposal, userName = "공알공알", onClose }) {
  const handleOrder = () => {
    console.log('주문하기 클릭');
  };

  const handleInquiry = () => {
    console.log('문의하기 클릭');
  };

  return (
    <div className="app">
      {/* 헤더 */}
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

      {/* 톱니선 */}
      <div className="divider"></div>

      {/* 메인 콘텐츠 */}
      <main className="main-content proposal-detail-main">
        {/* 상단 카드 */}
        <div className="proposal-hero">
          {/* 픽셀 장식 */}
          <div className="pixel-deco">
            <div className="pixel-dot"></div>
            <div className="pixel-dot"></div>
            <div className="pixel-dot"></div>
          </div>

          {/* 인사말 */}
          <div className="greeting-box">
            <h2 className="greeting-title">{userName}님,</h2>
            <p className="greeting-text">
              <strong>로드샌드위치</strong> 사장님이<br />
              간식을 제안했어요
            </p>
          </div>

          {/* 가게 정보 */}
          <div className="shop-badge">
            <MdLocationOn className="shop-icon" />
            <span>로드샌드위치 미아사거리역점</span>
          </div>

          {/* 메뉴 카드 */}
          <div className="menu-detail-card">
            <h3 className="menu-detail-name">
              페스츄리 로드샌드위치 + 밀크티 set
            </h3>
            <p className="menu-detail-price">860,000 원</p>
          </div>

          {/* 버튼들 */}
          <div className="action-btn-group">
            <button className="proposal-action-btn primary" onClick={handleOrder}>
              <FaCashRegister className="action-icon" />
              <span>주문하기</span>
            </button>
            <button className="proposal-action-btn secondary" onClick={handleInquiry}>
              <FaPhone className="action-icon" />
              <span>문의하기</span>
            </button>
          </div>
        </div>

        {/* 로고 영역 */}
        <div className="brand-section">
          <h1 className="brand-title">Snacting</h1>
        </div>
      </main>

      {/* 네비게이션 */}
      <BottomNavBar />
    </div>
  );
}

export default ProposalDetail;