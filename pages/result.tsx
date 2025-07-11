// pages/result.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (router.query.answers) {
      try {
        const parsed = JSON.parse(router.query.answers as string);
        setAnswers(parsed);
      } catch (e) {
        console.error('답변 파싱 실패:', e);
      }
    }
  }, [router.query.answers]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>여행 취향 결과</h1>
      {answers.length > 0 ? (
        <ul>
          {answers.map((answer, idx) => (
            <li key={idx}>질문 {idx + 1}: {answer}</li>
          ))}
        </ul>
      ) : (
        <p>결과를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
