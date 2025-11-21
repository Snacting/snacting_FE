// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/snactingApi';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 테스트 유저로 로그인
  const handleLogin = async (userType) => {
    try {
      setLoading(true);

      // 테스트 유저 데이터
      const testUsers = {
        'user': { name: '지희', role: 'USER', id: 1 },
        'school': { name: '학교', role: 'SCHOOL', id: 2 }
      };

      const userData = testUsers[userType];

      // 로컬 스토리지에 유저 정보 저장
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userName', userData.name);

      // 홈으로 이동
      setTimeout(() => {
        navigate('/home');
      }, 500);

    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-content">
        {/* 인사말 */}
        <div className="greeting-section">
          <p className="greeting-text">안녕하세요, 지희는</p>
          <h1 className="login-logo">Snacting</h1>
        </div>

        {/* 로그인 버튼 */}
        <div className="login-buttons">
          <button 
            className="login-btn user-btn"
            onClick={() => handleLogin('user')}
            disabled={loading}
          >
            내 내외
          </button>
          <button 
            className="login-btn school-btn"
            onClick={() => handleLogin('school')}
            disabled={loading}
          >
            학교
          </button>
        </div>

        {loading && (
          <p className="loading-text">로그인 중...</p>
        )}
      </div>
    </div>
  );
}

export default Login;