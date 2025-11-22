// src/services/orderService.js
import apiClient from './api';

export const orderService = {
  // 주문서 조회
  getOrders: async () => {
    try {
      console.log('🔍 주문서 조회 API 호출');
      const response = await apiClient.get('/api/orders');
      console.log('✅ getOrders 응답:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ getOrders 에러:', error.response?.data || error.message);
      // 404나 500 에러면 빈 배열 반환
      if (error.response?.status === 404 || error.response?.status === 500) {
        console.warn('⚠️ 주문서가 없습니다.');
        return [];
      }
      throw error;
    }
  },

  // 주문서 생성
  createOrder: async (orderData) => {
    try {
      console.log('📝 주문서 생성 API 호출:', orderData);
      
      const response = await apiClient.post('/api/orders', orderData);
      console.log('✅ createOrder 응답:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ createOrder 에러:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data
      });
      
      throw error;
    }
  },

  // 주문서 수정
  updateOrder: async (orderData) => {
    try {
      console.log('✏️ 주문서 수정 API 호출:', orderData);
      const response = await apiClient.put('/api/orders', orderData);
      console.log('✅ updateOrder 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ updateOrder 에러:', error.response?.data || error.message);
      throw error;
    }
  }
};