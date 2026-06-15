import React from 'react';
import PORTFOLIO from './data.js';

export default function Chrome({ active, go }) {
  const P = PORTFOLIO;
  const sec = P.sections[active];
  const progress = active / (P.sections.length - 1);

  return (
    <div className="chrome">
      {/* brand mark — top left */}
      <div className="brand">
        <span className="dot" />
        {P.name}
      </div>


{/* scroll progress — bottom left */}
      <div className="scrollhint" aria-hidden="true">
        <span>{sec.num} / 0{P.sections.length}</span>
        <span className="bar">
          <i style={{ width: (progress * 100) + '%' }} />
        </span>
        <span>{sec.label}</span>
      </div>
    </div>
  );
}
