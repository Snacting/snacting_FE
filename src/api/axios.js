// src/api/axios.js - 수정
import axios from 'axios';

const API_BASE_URL = 'http://43.201.67.97';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (userId 자동 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 userId 가져오기
    const userId = localStorage.getItem('userId');
    if (userId) {
      // 헤더에 userId 추가
      config.headers['X-User-Id'] = userId;
      
      // 또는 쿼리 파라미터로 추가
      // config.params = {
      //   ...config.params,
      //   userId: userId
      // };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      
      if (error.response.status === 401) {
        // 인증 에러 - 로그인 페이지로
        localStorage.clear();
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;