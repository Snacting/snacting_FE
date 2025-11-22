// src/utils/auth.js
export const authUtils = {
    // 토큰 저장
    setToken: (token) => {
      localStorage.setItem('accessToken', token);
    },
  
    // 토큰 가져오기
    getToken: () => {
      return localStorage.getItem('accessToken');
    },
  
    // 유저 정보 저장
    setUser: (userId, nickname, school) => {
      localStorage.setItem('userId', userId);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('school', school);
    },
  
    // 유저 정보 가져오기
    getUser: () => {
      return {
        userId: localStorage.getItem('userId'),
        nickname: localStorage.getItem('nickname'),
        school: localStorage.getItem('school')
      };
    },
  
    // 로그인 여부 확인
    isAuthenticated: () => {
      return !!localStorage.getItem('accessToken');
    },
  
    // 로그아웃
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('nickname');
      localStorage.removeItem('school');
    }
  };