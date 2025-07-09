import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import styles from '../styles/Result.module.css';
import { results } from '../data/resultData';

export default function ResultPage() {
  const router = useRouter();
  const { type } = router.query;
  const result = results.find((r) => r.type === type);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    if (!type || !result) return;
  }, [type]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const link = document.createElement('a');
    link.download = 'travel-card-result.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleRetry = () => {
    router.push('/');
  };

  if (!result) return <p>결과를 불러오는 중입니다...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card} ref={resultRef}>
        <img src={result.image} alt={result.title} className={styles.image} />
        <h2 className={styles.title}>{result.title}</h2>
        <p className={styles.description}>{result.description}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleDownloadImage}>이미지로 저장</button>
        <button className={styles.button} onClick={handleRetry}>다시 하기</button>
        <button className={styles.button} onClick={handleCopyLink}>
          {copied ? '복사 완료!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
