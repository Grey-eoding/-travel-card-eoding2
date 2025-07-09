// pages/result.js

import React from 'react';
import { useRouter } from 'next/router';
import { getTopResult } from '../data/resultData';

const ResultPage = () => {
  const router = useRouter();
  const { scores } = router.query;

  if (!scores) {
    return <div>결과를 불러오는 중입니다...</div>;
  }

  // URL 쿼리 파라미터는 문자열이므로 JSON으로 파싱
  let parsedScores;
  try {
    parsedScores = JSON.parse(scores);
  } catch (error) {
    return <div>잘못된 점수 데이터입니다.</div>;
  }

  const result = getTopResult(parsedScores);

  if (!result) {
    return <div>추천 결과를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>{result.title}</h1>
      <h2 style={{ color: '#555' }}>{result.subtitle}</h2>
      <p style={{ whiteSpace: 'pre-line', marginTop: '20px', lineHeight: '1.6' }}>
        {result.description}
      </p>
    </div>
  );
};

export default ResultPage;
