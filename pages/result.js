import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { results } from '../data/resultData';
import styles from '../styles/Result.module.css';
import html2canvas from 'html2canvas';

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [isClient, setIsClient] = useState(false); // SSR 오류 방지
  const router = useRouter();
  const resultRef = useRef(null);

  useEffect(() => {
    setIsClient(true); // 브라우저에서만 true
    const type = localStorage.getItem('type');
    const found = results.find((r) => r.type === type);
    if (!found) {
      router.push('/'); // 잘못된 접근일 경우 홈으로
    } else {
      setResult(found);
    }
  }, []);

  const handleRetry = () => {
    router.push('/');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'travel-card-result.png';
    link.click();
  };

  if (!isClient || !result) {
    return <p className={styles.loading}>결과를 불러오는 중입니다...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card} ref={resultRef}>
        <img src={result.image} alt={result.title} className={styles.image} />
        <h1 className={styles.title}>{result.title}</h1>
        <h2 className={styles.subtitle}>{result.subtitle}</h2>
        <p className={styles.description}>{result.description}</p>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleRetry}>🔁 다시하기</button>
        <button className={styles.button} onClick={handleCopyLink}>🔗 링크 복사</button>
        <button className={styles.button} onClick={handleSaveImage}>💾 이미지 저장</button>
      </div>
    </div>
  );
}
