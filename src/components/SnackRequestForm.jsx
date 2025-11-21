// src/components/SnackRequestForm.jsx
import React, { useState } from 'react';
import { MdLocationOn, MdPeople } from 'react-icons/md';
import { BsCalendar3 } from 'react-icons/bs';
import { FaCoins, FaUtensils } from 'react-icons/fa';

function SnackRequestForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    location: '',
    datetime: '',
    people: '',
    totalBudget: '',
    perPersonBudget: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="form-section">
      <h2 className="section-title">간식 요청하기</h2>

      <div className="form-content">
        {/* 장소 & 일시 */}
        <div className="form-grid">
          <div className="form-group">
            <label className="label">
              <MdLocationOn className="icon" />
              <span>장소</span>
            </label>
            <input
              type="text"
              name="location"
              className="input"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label">
              <BsCalendar3 className="icon" />
              <span>일시</span>
            </label>
            <input
              type="text"
              name="datetime"
              className="input"
              value={formData.datetime}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 인원 */}
        <div className="form-group">
          <label className="label">
            <MdPeople className="icon" />
            <span>인원</span>
          </label>
          <input
            type="number"
            name="people"
            className="input input-small"
            value={formData.people}
            onChange={handleChange}
          />
        </div>

        {/* 총예산 */}
        <div className="form-group">
          <label className="label">
            <FaCoins className="icon" />
            <span>총예산</span>
          </label>
          <input
            type="number"
            name="totalBudget"
            className="input input-medium"
            value={formData.totalBudget}
            onChange={handleChange}
          />
        </div>

        {/* 1인 예산 */}
        <div className="form-group">
          <label className="label">
            <FaCoins className="icon" />
            <span>1인 예산</span>
          </label>
          <input
            type="number"
            name="perPersonBudget"
            className="input input-small"
            value={formData.perPersonBudget}
            onChange={handleChange}
          />
        </div>

        {/* 선호 메뉴 카테고리 */}
        <div className="form-group">
          <label className="label">
            <FaUtensils className="icon" />
            <span>선호 메뉴 카테고리</span>
          </label>
          <button type="button" className="select-btn">
            선택하기
          </button>
        </div>
      </div>

      {/* 요청하기 버튼 */}
      <button type="button" className="submit-btn" onClick={handleSubmit}>
        요청하기
      </button>
    </div>
  );
}

export default SnackRequestForm;