// src/components/RequestSummary.jsx
import React from 'react';
import { IoLocationSharp, IoCalendar, IoPeople, IoWallet, IoCash, IoRestaurant } from 'react-icons/io5';

function RequestSummary({ data }) {
  const categoryLabels = {
    bunsik: '분식',
    fastfood: '패스트푸드',
    sandwich: '샌드위치',
    chicken: '치킨/닭강정',
    pizza: '피자'
  };

  return (
    <div className="request-summary">
      <div className="summary-row">
        <div className="summary-field">
          <label>
            <IoLocationSharp className="icon" />
            <span>장소</span>
          </label>
          <span className="value">{data.place}</span>
        </div>

        <div className="summary-field">
          <label>
            <IoCalendar className="icon" />
            <span>일시</span>
          </label>
          <span className="value">{data.datetime}</span>
        </div>
      </div>

      <div className="summary-field full">
        <label>
          <IoPeople className="icon" />
          <span>인원</span>
        </label>
        <span className="value">{data.people} 명</span>
      </div>

      <div className="summary-field full">
        <label>
          <IoWallet className="icon" />
          <span>총예산</span>
        </label>
        <span className="value">{parseInt(data.totalBudget).toLocaleString()} 원</span>
      </div>

      <div className="summary-field full">
        <label>
          <IoCash className="icon" />
          <span>1인 예산</span>
        </label>
        <span className="value">{parseInt(data.perPersonBudget).toLocaleString()} 원</span>
      </div>

      <div className="summary-field full">
        <label>
          <IoRestaurant className="icon" />
          <span>선호 메뉴 카테고리</span>
        </label>
        <div className="categories-display">
          {data.categories.map(cat => (
            <span key={cat} className="category-badge">
              {categoryLabels[cat] || cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RequestSummary;