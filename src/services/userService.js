// src/services/userService.js
import apiClient from './api';

export const userService = {
  async createUser(userData) {
    try {
      // ✅ 백엔드 스웨거 기준: POST /api/users
      const res = await apiClient.post('/api/users', userData);

      // ✅ 응답 구조를 보기 위해 전체 로그 찍기
      console.log('createUser 응답 전체:', res.data);

      // 백엔드 응답이
      // { userId, message, accessToken }
      // 이런 형태라면 그대로 반환하면 됨
      return res.data;

      // 만약 나중에 보니까 이렇게 온다면:
      // { code: 201, message: "성공", data: { userId, accessToken, ... } }
      // 이럴 땐 이렇게 바꿔야 함:
      // return res.data.data;

    } catch (error) {
      console.error('createUser API 에러:', error);

      if (error.response) {
        console.log('서버 에러 응답:', error.response.data);

        const msg =
          error.response.data.message ||
          `서버 오류 (${error.response.status})`;

        throw new Error(msg);
      }

      throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};
