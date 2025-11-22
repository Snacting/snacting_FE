// src/services/productService.js
import apiClient from './api';

export const productService = {
  // 전체 상품 조회
  async getAllProducts() {
    try {
      const response = await apiClient.get('/api/products/all');
      console.log('📦 getAllProducts 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ getAllProducts 에러:', error);
      throw error;
    }
  },

  // 유저 예산 내 상품 조회
  async getProducts() {
    try {
      const response = await apiClient.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('❌ getProducts 에러:', error);
      throw error;
    }
  },

  // 상품 단건 조회
  async getProductById(productId) {
    try {
      const response = await apiClient.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('❌ getProductById 에러:', error);
      throw error;
    }
  },

  // 좋아요한 상품 조회
  async getLikedProducts() {
    try {
      const response = await apiClient.get('/api/products/liked');
      return response.data;
    } catch (error) {
      console.error('❌ getLikedProducts 에러:', error);
      throw error;
    }
  },

  // ✅ 상품 좋아요 토글
  async toggleLike(productOrId) {
    // product 객체든 id 숫자든 둘 다 받을 수 있게 처리
    const productId =
      typeof productOrId === 'object'
        ? productOrId.productId ?? productOrId.id
        : productOrId;

    console.log('💖 상품 좋아요 토글 productId:', productId, '원본:', productOrId);

    if (!productId) {
      console.error('❌ toggleLike: productId 없음!', productOrId);
      throw new Error('상품 ID가 없어 좋아요를 처리할 수 없습니다.');
    }

    try {
      const response = await apiClient.post(`/api/products/${productId}/like`);
      return response.data;
    } catch (error) {
      console.error('❌ toggleLike 에러:', error);
      if (error.response) {
        console.error('서버 응답:', error.response.status, error.response.data);
      }
      throw error;
    }
  }
};
