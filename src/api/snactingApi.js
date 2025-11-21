// src/api/snactingApi.js
import axiosInstance from './axios';

// ========================================
// User API - 유저 관련
// ========================================

/**
 * 유저 생성
 * POST /api/users
 */
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========================================
// Order API - 주문서 관련
// ========================================

/**
 * 주문서 조회
 * GET /api/orders
 */
export const getOrders = async () => {
  try {
    const response = await axiosInstance.get('/api/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 주문서 생성
 * POST /api/orders
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/api/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 주문서 수정
 * PUT /api/orders
 */
export const updateOrder = async (orderData) => {
  try {
    const response = await axiosInstance.put('/api/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========================================
// Owner Request API - 사장 제안 관련
// ========================================

/**
 * 유저 예산 내 사장 제안 조회
 * GET /api/owner-requests
 */
export const getOwnerRequests = async (params) => {
  try {
    const response = await axiosInstance.get('/api/owner-requests', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 사장 제안 단건 조회
 * GET /api/owner-requests/{ownerRequestId}
 */
export const getOwnerRequestById = async (ownerRequestId) => {
  try {
    const response = await axiosInstance.get(`/api/owner-requests/${ownerRequestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 좋아요한 사장 제안 조회
 * GET /api/owner-requests/liked
 */
export const getLikedOwnerRequests = async () => {
  try {
    const response = await axiosInstance.get('/api/owner-requests/liked');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 사장 제안 좋아요 토글
 * POST /api/owner-requests/{ownerRequestId}/like
 */
export const toggleOwnerRequestLike = async (ownerRequestId) => {
  try {
    const response = await axiosInstance.post(`/api/owner-requests/${ownerRequestId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========================================
// Product API - 상품 관련
// ========================================

/**
 * 전체 상품 조회
 * GET /api/products/all
 */
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/api/products/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 유저 예산 내 상품 조회
 * GET /api/products
 */
export const getProducts = async (params) => {
  try {
    const response = await axiosInstance.get('/api/products', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 상품 단건 조회
 * GET /api/products/{productId}
 */
export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 좋아요한 상품 조회
 * GET /api/products/liked
 */
export const getLikedProducts = async () => {
  try {
    const response = await axiosInstance.get('/api/products/liked');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 상품 좋아요 토글
 * POST /api/products/{productId}/like
 */
export const toggleProductLike = async (productId) => {
  try {
    const response = await axiosInstance.post(`/api/products/${productId}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
};