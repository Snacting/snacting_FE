// src/services/orderService.js
import apiClient from './api';

export const orderService = {
  // 주문서 조회 (현재 유저의 주문서 1개)
  getOrders: async () => {
    try {
        const res = await apiClient.get('/api/orders');
        console.log('📥 getOrders 응답:', res.data);
        return res.data; // 배열X, 객체 그대로
      } catch (error) {
        console.error('❌ getOrders 에러:', error.response?.data || error);
        throw error;
      }
    },

  // 주문서 생성
  createOrder: async (orderData) => {
    try {
      console.log('📝 주문서 생성 API 호출:', orderData);
      const res = await apiClient.post('/api/orders', orderData);
      console.log('✅ createOrder 응답:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ createOrder 에러:', error.response?.data || error);
      throw error;
    }
  },

  // 주문서 수정
  updateOrder: async (orderData) => {
    try {
      console.log('✏️ 주문서 수정 API 호출:', orderData);
      const res = await apiClient.put('/api/orders', orderData);
      console.log('✅ updateOrder 응답:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ updateOrder 에러:', error.response?.data || error);
      throw error;
    }
  }
};
