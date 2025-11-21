// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { createOrder, getOrders, getOwnerRequests } from '../api/snactingApi';
import SnackRequestForm from '../components/SnackRequestForm';
import RecentRequest from '../components/RecentRequest';
import OwnerProposalEmpty from '../components/OwnerProposalEmpty';
import ProposalList from '../components/ProposalList';
import ProposalDetail from './ProposalDetail';
import BottomNavBar from '../components/BottomNavBar';
import '../styles/home.css';

function Home() {
  const [hasRequest, setHasRequest] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 기존 주문서 불러오기
  useEffect(() => {
    loadExistingOrders();
  }, []);

  const loadExistingOrders = async () => {
    try {
      setLoading(true);
      const orders = await getOrders();
      
      if (orders && orders.length > 0) {
        // 가장 최근 주문서 사용
        const latestOrder = orders[0];
        setRequestData(latestOrder);
        setHasRequest(true);
        
        // 예산에 맞는 제안들 불러오기
        loadProposals(latestOrder);
      }
    } catch (err) {
      console.error('주문서 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProposals = async (orderData) => {
    try {
      // 유저 예산 내 사장 제안 조회
      const ownerRequests = await getOwnerRequests({
        budget: orderData.totalBudget,
        people: orderData.people
      });
      setProposals(ownerRequests);
    } catch (err) {
      console.error('제안 불러오기 실패:', err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // 주문서 생성 API 호출
      const orderData = {
        location: formData.location,
        date: formData.date,
        time: formData.time,
        people: parseInt(formData.people),
        totalBudget: parseInt(formData.totalBudget),
        perPersonBudget: parseInt(formData.perPersonBudget),
        categories: formData.categories,
      };
      
      const response = await createOrder(orderData);
      
      console.log('주문서 생성 성공:', response);
      setRequestData(response);
      setHasRequest(true);
      
      // 제안 불러오기
      loadProposals(response);
      
    } catch (err) {
      console.error('주문서 생성 실패:', err);
      setError('요청을 전송하는데 실패했습니다. 다시 시도해주세요.');
      alert('요청 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setHasRequest(false);
  };

  const handleNewRequest = () => {
    setRequestData(null);
    setHasRequest(false);
    setProposals([]);
  };

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal);
  };

  const handleBackToList = () => {
    setSelectedProposal(null);
  };

  if (selectedProposal) {
    return <ProposalDetail proposal={selectedProposal} onClose={handleBackToList} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="cookie-left">
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
        </div>
        <h1 className="logo">Snacting</h1>
        <div className="cookie-right">
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
          <div className="cookie-pixel"></div>
        </div>
      </header>

      <div className="divider"></div>

      {error && (
        <div style={{ 
          padding: '10px', 
          background: '#ffebee', 
          color: '#c62828',
          textAlign: 'center',
          fontSize: '12px'
        }}>
          {error}
        </div>
      )}

      <main className="main-content">
        {!hasRequest ? (
          <>
            <SnackRequestForm onSubmit={handleSubmit} loading={loading} />
            <div className="divider reverse"></div>
            <OwnerProposalEmpty />
          </>
        ) : (
          <>
            <RecentRequest 
              data={requestData} 
              onEdit={handleEdit}
              onNew={handleNewRequest}
            />
            <div className="divider reverse"></div>
            <ProposalList 
              proposals={proposals} 
              onProposalClick={handleProposalClick}
            />
          </>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}

export default Home;