// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import ProposalDetail from './pages/ProposalDetail';
import StoreList from './pages/StoreList';
import Favorite from './pages/Favorite';
import { authUtils } from './utils/auth';
import { orderService } from './services/orderService';
import { ownerRequestService } from './services/ownerRequestService';
import './styles/global.css';

// 인증된 사용자만 접근 가능한 라우트
function ProtectedRoute({ children }) {
  return authUtils.isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  const [requestData, setRequestData] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  // 주문서 조회 (앱 로드 시)
  useEffect(() => {
    if (authUtils.isAuthenticated()) {
      fetchOrders();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('📋 주문서 조회 시작');
      const orders = await orderService.getOrders();
      console.log('📋 주문서 조회 결과:', orders);
      
      if (orders && orders.length > 0) {
        setRequestData(orders[0]); // 가장 최근 주문서
      }
    } catch (error) {
      console.error('❌ 주문서 조회 실패:', error);
    }
  };

  // 사장 제안 조회
  useEffect(() => {
    if (requestData && authUtils.isAuthenticated()) {
      fetchProposals();
    }
  }, [requestData]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      console.log('🔍 사장 제안 조회 시작');
      const data = await ownerRequestService.getOwnerRequests();
      console.log('🔍 사장 제안 조회 결과:', data);
      setProposals(data || []);
    } catch (error) {
      console.error('❌ 제안 조회 실패:', error);
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  // 주문서 생성
  const handleRequestSubmit = async (data) => {
    try {
      setLoading(true);
      console.log('📝 주문서 생성 시작:', data);

      // API로 전송할 데이터 구성
      const orderData = {
        place: data.place,
        datetime: data.datetime,
        people: parseInt(data.people),
        totalBudget: parseInt(data.totalBudget) || 0,
        perPersonBudget: parseInt(data.perPersonBudget) || 0,
        categories: data.categories || []
      };

      console.log('📤 백엔드로 전송할 데이터:', orderData);

      const createdOrder = await orderService.createOrder(orderData);
      console.log('✅ 주문서 생성 성공:', createdOrder);
      
      setRequestData(createdOrder);
      
      // 제안 목록 자동 조회
      await fetchProposals();
      
      alert('주문서가 생성되었습니다!');
    } catch (error) {
      console.error('❌ 주문서 생성 실패:', error);
      alert(error.response?.data?.message || '주문서 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 주문서 수정
  const handleEditRequest = async () => {
    if (!requestData) return;

    try {
      setLoading(true);
      console.log('✏️ 주문서 수정 모드');
      
      // 기존 주문서 데이터는 유지하고, 폼만 다시 보이게
      const currentData = { ...requestData };
      setRequestData(null); // 폼을 다시 보이게 함
      
      // 이전 데이터를 폼에 채우려면 상태로 전달해야 함
      // 또는 수정 모달을 띄우는 방식도 가능
      
    } catch (error) {
      console.error('❌ 주문서 수정 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 새로 작성하기
  const handleNewRequest = () => {
    if (window.confirm('새로운 주문서를 작성하시겠습니까?')) {
      setRequestData(null);
      setProposals([]);
    }
  };

  // 좋아요 토글
  const toggleLike = async (proposalId) => {
    try {
      console.log('💖 좋아요 토글:', proposalId);
      await ownerRequestService.toggleLike(proposalId);
      
      // 로컬 상태 업데이트
      setProposals(prev =>
        prev.map(p =>
          p.id === proposalId ? { ...p, liked: !p.liked } : p
        )
      );
    } catch (error) {
      console.error('❌ 좋아요 토글 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <Router>
      <div className="app">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">로딩 중...</div>
          </div>
        )}
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          {/* 보호된 라우트 */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home
                  requestData={requestData}
                  proposals={proposals}
                  onSubmit={handleRequestSubmit}
                  onEdit={handleEditRequest}
                  onNewRequest={handleNewRequest}
                  toggleLike={toggleLike}
                  loading={loading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proposal/:id"
            element={
              <ProtectedRoute>
                <ProposalDetail proposals={proposals} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stores"
            element={
              <ProtectedRoute>
                <StoreList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />

          {/* 404 처리 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;