// src/components/OwnerProposalEmpty.jsx
import React from 'react';

function OwnerProposalEmpty() {
  return (
    <section className="proposals-section">
      <h2 className="section-title">사장님의 제안을 야금야금</h2>
      
      <div className="empty-proposals">
        <div className="empty-state">
          <div className="empty-character">
            <img 
              src="/images/empty-character.png" 
              alt="간식 캐릭터" 
              className="character-image"
            />
          </div>
          <p className="empty-message">
            간식을 요청하면<br />
            사장님들의 제안을 받을 수 있어요!
          </p>
        </div>
      </div>
    </section>
  );
}

export default OwnerProposalEmpty;