// src/components/ProposalList.jsx
import React from 'react';
import ProposalCard from './ProposalCard';

function ProposalList({ proposals, onProposalClick }) {
  return (
    <section className="proposal-list-section">
      <h2 className="proposal-list-title">사장님의 제안을 야금야금</h2>

      <div className="proposal-cards">
        {proposals.map((proposal) => (
          <ProposalCard 
            key={proposal.id} 
            proposal={proposal}
            onClick={() => onProposalClick(proposal)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProposalList;