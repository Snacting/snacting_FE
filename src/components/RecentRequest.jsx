// src/components/RecentRequest.jsx
import React from 'react';
import { MdLocationOn, MdPeople } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import { FaCoins, FaUtensils } from 'react-icons/fa';

function RecentRequest({ data, onEdit, onNew }) {
  return (
    <section className="recent-request">
      <h2 className="section-title">최근 요청한 간식</h2>

      <div className="request-info-compact">
        {/* 장소 & 일시 */}
        <div className="info-row-grid">
          <div className="info-row">
            <MdLocationOn className="icon" />
            <span className="info-key">장소</span>
            <span className="info-val">{data?.location || '국민대학교'}</span>
          </div>

          <div className="info-row">
            <BsCalendar3 className="icon" />
            <span className="info-key">일시</span>
            <span className="info-val">{data?.datetime || '11/19 15:00'}</span>
          </div>
        </div>

        {/* 인원 */}
        <div className="info-row">
          <MdPeople className="icon" />
          <span className="info-key">인원</span>
          <span className="info-val">{data?.people || '150'} 명</span>
        </div>

        {/* 총예산 */}
        <div className="info-row">
          <FaCoins className="icon" />
          <span className="info-key">총예산</span>
          <span className="info-val">{data?.totalBudget || '900,000'} 원</span>
        </div>

        {/* 1인 예산 */}
        <div className="info-row">
          <FaCoins className="icon" />
          <span className="info-key">1인 예산</span>
          <span className="info-val">{data?.perPersonBudget || '6,000'} 원</span>
        </div>

        {/* 선호 메뉴 카테고리 */}
        <div className="info-row full-row">
          <FaUtensils className="icon" />
          <span className="info-key">선호 메뉴 카테고리</span>
        </div>
        <div className="category-tags">
          <span className="category-tag">분식</span>
          <span className="category-tag">패스트푸드</span>
          <span className="category-tag">샌드위치</span>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="request-actions">
        <button className="action-btn" onClick={onEdit}>
          주문서 수정하기
        </button>
        <button className="action-btn" onClick={onNew}>
          새로 작성하기
        </button>
      </div>
    </section>
  );
}

export default RecentRequest;