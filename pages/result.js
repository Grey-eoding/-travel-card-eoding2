// pages/result.js
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { getTopResult } from '../data/data/resultData';
import styles from '../styles/Result.module.css';

const cardImages = {
  travelWallet: '/cards/travelWallet.png',
  travelLog: '/cards/travelLog.png',
  travelGo: '/cards/travelGo.png',
  shinhanSol: '/cards/shinhanSol.png',
  toss: '/cards/toss.png',
  naverPay: '/cards/naverPay.png',
};

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const router = useRouter();
  const resultRef = useRef(null);

  useEffect(() => {
    const scoreMap = JSON.parse(localStorage.getItem('quizScore'));
    if (!scoreMap) return;
    const topResult = getTopResult(scoreMap);
    setResult(topResult);
  }, []);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const link = document.createElement('a');
    link.download = 'travel-card-result.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었어요!');
  };

  if (!result) return <p>결과를 불러오는 중입니다...</p>;

  return (
    <div className={styles.container}>
      <div ref={resultRef} className={styles.card}>
        <img src={cardImages[result.key]} alt="카드 이미지" className={styles.image} />
        <h1>{result.title}</h1>
        <h3>{result.subtitle}</h3>
        <pre className={styles.description}>{result.description}</pre>
      </div>

      <div className={styles.buttons}>
        <button onClick={handleDownload}>이미지로 저장하기</button>
        <button onClick={() => router.push('/')}>다시 하기</button>
        <button onClick={handleCopyLink}>링크 복사</button>
      </div>
    </div>
  );
}
