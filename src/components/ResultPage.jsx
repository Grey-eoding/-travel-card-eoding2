// ResultPage.jsx
import React from 'react';
import { results, getTopResult } from './results';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const scoreMap = location.state?.scoreMap;

  if (!scoreMap) {
    return <div>결과 정보를 불러올 수 없습니다.</div>;
  }

  const resultData = getTopResult(scoreMap);

  return (
    <div className="result-container">
      <h1>{resultData.title}</h1>
      <h2>{resultData.subtitle}</h2>
      <p style={{ whiteSpace: 'pre-line' }}>{resultData.description}</p>
    </div>
  );
};

export default ResultPage;
