// src/components/OwnerProposalEmpty.jsx
import React from 'react';

function OwnerProposalEmpty() {
  return (
    <div className="proposal-section">
      <h2 className="section-title">사장님의 제안을 야금야금</h2>

      <div className="empty-state">
        {/* 쿠키 캐릭터 */}
        <div className="cookie-character">
          <div className="cookie-body">
            <div className="cookie-eyes">
              <div className="eye">
                <div className="pupil"></div>
              </div>
              <div className="eye">
                <div className="pupil"></div>
              </div>
            </div>
            <div className="cookie-mouth"></div>
          </div>
        </div>

        <p className="empty-text">아직 도착한 사장님 제안이 없어요 ㅜ ㅜ</p>
      </div>
    </div>
  );
}

export default OwnerProposalEmpty;