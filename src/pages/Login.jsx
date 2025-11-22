// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { authUtils } from '../utils/auth';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    school: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nickname.trim()) {
      setError('닉네임을 입력해주세요');
      return;
    }
    if (!formData.school.trim()) {
      setError('학교를 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('🔐 로그인 시도:', formData);

      const response = await userService.createUser({
        nickname: formData.nickname,
        school: formData.school
      });

      console.log('✅ 로그인 응답:', response);

      if (!response.accessToken) {
        throw new Error('액세스 토큰을 받지 못했습니다.');
      }

      // 토큰 및 유저 정보 저장
      authUtils.setToken(response.accessToken);
      authUtils.setUser(response.userId, formData.nickname, formData.school);

      console.log('✅ 토큰 저장 완료:', {
        token: response.accessToken.substring(0, 20) + '...',
        userId: response.userId
      });

      navigate('/home');
    } catch (err) {
      console.error('❌ 로그인 에러:', err);
      setError(err.message || '로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <p className="login-greeting">안녕하세요, 저희는</p>
          <div className="login-logo-wrapper">
            <img 
              src="/images/logo.png" 
              alt="Snacting" 
              className="login-logo-image"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <div className="input-row">
              <label className="input-label">닉네임</label>
              <input
                type="text"
                className="login-input"
                value={formData.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                placeholder="닉네임 입력"
                disabled={loading}
              />
            </div>
            
            <div className="input-row">
              <label className="input-label">학교</label>
              <input
                type="text"
                className="login-input"
                value={formData.school}
                onChange={(e) => handleChange('school', e.target.value)}
                placeholder="학교 입력"
                disabled={loading}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '시작하기'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;