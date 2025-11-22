// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV 
  ? '' 
  : 'http://43.201.67.97';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Bearer 토큰 형식으로 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('📤 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });

    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401) {
      console.warn('⚠️ 인증 실패 - 로그인 페이지로 이동');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default apiClient;