// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SnackRequestForm from '../components/SnackRequestForm';
import RequestSummary from '../components/RequestSummary';
import ProposalCard from '../components/ProposalCard';
import OwnerProposalEmpty from '../components/OwnerProposalEmpty';
import BottomNavBar from '../components/BottomNavBar';
import ZigzagBorder from '../components/ZigzagBorder';

//  프론트에서 쓰는 카테고리 id → 백엔드/더미데이터에서 쓰는 한글 라벨 매핑
const CATEGORY_LABEL_MAP = {
  bunsik: '분식',
  pizza: '피자',
  chicken: '치킨/닭강정',
  fastfood: '패스트푸드',
  donkatsu: '돈까스/회',
  asian: '아시안/중식',
  dosirak: '도시락/간편식',
  sandwich: '샌드위치',
  bread: '빵/디저트',
  drink: '음료',
};

function Home({ requestData, proposals, onSubmit, onEdit, onNewRequest, toggleLike, loading }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    place: '',
    datetime: '',
    people: '',
    totalBudget: '',
    perPersonBudget: '',
    categories: [], // 여기엔 bunsik, pizza 같은 id가 들어옴
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.place || !formData.datetime || !formData.people) {
      alert('필수 정보를 모두 입력해주세요!');
      return;
    }
    

    //  백엔드로 보낼 때는 한글 카테고리로 변환해서 보내기
    const mappedCategories = formData.categories.map(
      (id) => CATEGORY_LABEL_MAP[id] || id
    );

    const payload = {
      ...formData,
      people: Number(formData.people),
      totalBudget: Number(formData.totalBudget),
      perPersonBudget: Number(formData.perPersonBudget),
      categories: mappedCategories,
    };

    onSubmit(payload);
    // console.log('📝 주문서 제출:', formData);
    // await onSubmit(formData);
    
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleProposalClick = (proposalId) => {
    navigate(`/proposal/${proposalId}`);
  };

  return (
    <div className="page-container">
      <Header />
      <ZigzagBorder />

      <main className="main-content">
        {!requestData ? (
          <>
            <SnackRequestForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCategoryClick={() => setShowCategoryModal(true)}
            />

            <ZigzagBorder />

            <OwnerProposalEmpty />
          </>
        ) : (
          <>
            <section className="request-section">
              <h2 className="section-title">최근 요청한 간식</h2>
              <RequestSummary data={requestData} />

              <div className="action-buttons">
                <button className="action-btn secondary" onClick={onEdit}>
                  주문서 수정하기
                </button>
                <button className="action-btn secondary" onClick={onNewRequest}>
                  새로 작성하기
                </button>
              </div>
            </section>

            <ZigzagBorder />

            <section className="proposals-section">
              <h2 className="section-title">사장님의 제안을 야금야금</h2>
              <div className="proposals-list">
                {proposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onClick={() => handleProposalClick(proposal.id)}
                    onLikeToggle={() => toggleLike(proposal.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <BottomNavBar activeTab="home" />

      {showCategoryModal && (
        <CategoryModal
          selectedCategories={formData.categories}
          onSelect={handleCategorySelect}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
}

function CategoryModal({ selectedCategories, onSelect, onClose }) {
  const mealCategories = [
    { id: 'bunsik', label: '분식' },
    { id: 'pizza', label: '피자' },
    { id: 'chicken', label: '치킨/닭강정' },
    { id: 'fastfood', label: '패스트푸드' },
    { id: 'donkatsu', label: '돈까스/회' },
    { id: 'asian', label: '아시안/중식' },
    { id: 'dosirak', label: '도시락/간편식' },
    { id: 'sandwich', label: '샌드위치' },
  ];

  const dessertCategories = [
    { id: 'bread', label: '빵/디저트' },
    { id: 'drink', label: '음료' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="category-modal" onClick={(e) => e.stopPropagation()}>
        <h3>원하는 메뉴 카테고리를 골라주세요</h3>

        <div className="category-section">
          <h4>식사류</h4>
          <div className="category-grid">
            {mealCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${
                  selectedCategories.includes(cat.id) ? 'selected' : ''
                }`}
                onClick={() => onSelect(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="category-section">
          <h4>디저트류</h4>
          <div className="category-grid">
            {dessertCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${
                  selectedCategories.includes(cat.id) ? 'selected' : ''
                }`}
                onClick={() => onSelect(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          완료
        </button>
      </div>
    </div>
  );
}

export default Home;
