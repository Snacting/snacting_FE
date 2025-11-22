
function RequestSummary({ data }) {
    // data 자체가 없으면 그냥 아무것도 렌더링하지 않기
    if (!data) {
      return null;
    }
  
    console.log('🧐 RequestSummary data:', data);
  
    // ✅ 백엔드 응답 스펙에 맞춰서 구조 분해
    const {
      nickname,
      headcount,
      totalBudget,
      budgetPerPerson,
      categories,
      detailAddress,
      date,
    } = data;
  
    // ✅ categories가 undefined/null이어도 에러 안 나게
    const safeCategories = Array.isArray(categories) ? categories : [];
  
    return (
      <div className="request-summary">
        <p className="request-title">
          {nickname ? `${nickname}님이 요청한 간식` : '요청한 간식 정보'}
        </p>
  
        <div className="request-summary-grid">
          <div className="request-row">
            <span className="request-key">인원</span>
            <span className="request-val">{headcount}명</span>
          </div>
          <div className="request-row">
            <span className="request-key">총 예산</span>
            <span className="request-val">
              {totalBudget?.toLocaleString()}원
            </span>
          </div>
          <div className="request-row">
            <span className="request-key">1인 예산</span>
            <span className="request-val">
              {budgetPerPerson?.toLocaleString()}원
            </span>
          </div>
          <div className="request-row">
            <span className="request-key">날짜</span>
            <span className="request-val">{date}</span>
          </div>
          <div className="request-row">
            <span className="request-key">장소</span>
            <span className="request-val">{detailAddress}</span>
          </div>
        </div>
  
        <div className="request-categories">
          <span className="request-key">선호 카테고리</span>
          {safeCategories.length > 0 ? (
            <div className="category-tags">
              {safeCategories.map((cat, idx) => (
                <span key={idx} className="category-tag">
                  {cat}
                </span>
              ))}
            </div>
          ) : (
            <span className="request-val">선호 카테고리가 없습니다</span>
          )}
        </div>
      </div>
    );
  }
  
  export default RequestSummary;