// src/components/SnackRequestForm.jsx
import React from 'react';
import { IoLocationSharp, IoCalendar, IoPeople, IoWallet, IoCash, IoRestaurant } from 'react-icons/io5';

function SnackRequestForm({ formData, setFormData, onSubmit, onCategoryClick }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="request-form-section">
      <h2 className="section-title">간식 요청하기</h2>

      <form onSubmit={onSubmit} className="request-form">
        <div className="form-row">
          <div className="form-field">
            <label>
              <IoLocationSharp className="icon" />
              <span>장소</span>
            </label>
            <input
              type="text"
              value={formData.place}
              onChange={(e) => handleChange('place', e.target.value)}
              placeholder="국민대학교"
            />
          </div>

          <div className="form-field">
            <label>
              <IoCalendar className="icon" />
              <span>일시</span>
            </label>
            <input
              type="text"
              value={formData.datetime}
              onChange={(e) => handleChange('datetime', e.target.value)}
              placeholder="11/19 15:00"
            />
          </div>
        </div>

        <div className="form-field full-width">
          <label>
            <IoPeople className="icon" />
            <span>인원</span>
          </label>
          <input
            type="number"
            value={formData.people}
            onChange={(e) => handleChange('people', e.target.value)}
            placeholder="150"
          />
        </div>

        <div className="form-field full-width">
          <label>
            <IoWallet className="icon" />
            <span>총예산</span>
          </label>
          <input
            type="number"
            value={formData.totalBudget}
            onChange={(e) => handleChange('totalBudget', e.target.value)}
            placeholder="900000"
          />
        </div>

        <div className="form-field full-width">
          <label>
            <IoCash className="icon" />
            <span>1인 예산</span>
          </label>
          <input
            type="number"
            value={formData.perPersonBudget}
            onChange={(e) => handleChange('perPersonBudget', e.target.value)}
            placeholder="6000"
          />
        </div>

        <div className="form-field category-field">
          <label>
            <IoRestaurant className="icon" />
            <span>선호 메뉴 카테고리</span>
          </label>
          <button type="button" className="category-select-btn" onClick={onCategoryClick}>
            선택하기
          </button>
        </div>

        {formData.categories.length > 0 && (
          <div className="selected-categories">
            {formData.categories.map(cat => (
              <span key={cat} className="category-tag">{cat}</span>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn">
          요청하기
        </button>
      </form>
    </section>
  );
}

export default SnackRequestForm;