// src/services/ownerRequestService.js
import apiClient from './api';

export const ownerRequestService = {
  // 유저 예산 내 사장 제안 조회
  getOwnerRequests: async () => {
    try {
      console.log('🔍 유저 예산 내 사장 제안 조회 시작');
      const response = await apiClient.get('/api/owner-requests');
      console.log('✅ getOwnerRequests 성공:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ getOwnerRequests 에러:', error);
      // 500 에러거나 주문서가 없으면 빈 배열 반환
      if (error.response?.status === 500 || error.response?.status === 404) {
        console.warn('⚠️ 주문서가 없거나 제안이 없습니다.');
        return [];
      }
      throw error;
    }
  },

  // 사장 제안 단건 조회
  getOwnerRequestById: async (ownerRequestId) => {
    try {
      console.log('🔍 사장 제안 단건 조회:', ownerRequestId);
      const response = await apiClient.get(`/api/owner-requests/${ownerRequestId}`);
      return response.data;
    } catch (error) {
      console.error('❌ getOwnerRequestById 에러:', error);
      throw error;
    }
  },

  // 좋아요한 사장 제안 조회
  getLikedOwnerRequests: async () => {
    try {
      console.log('🔍 좋아요한 사장 제안 조회 시작');
      const response = await apiClient.get('/api/owner-requests/liked');
      console.log('✅ getLikedOwnerRequests 성공:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('❌ getLikedOwnerRequests 에러:', error);
      // 에러 발생 시 빈 배열 반환 (좋아요 없음으로 처리)
      return [];
    }
  },

  // 사장 제안 좋아요 토글
  toggleLike: async (ownerRequestId) => {
    try {
      console.log('💖 좋아요 토글:', ownerRequestId);
      const response = await apiClient.post(`/api/owner-requests/${ownerRequestId}/like`);
      console.log('✅ toggleLike 성공:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ toggleLike 에러:', error);
      throw error;
    }
  }
};