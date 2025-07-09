import styles from '../styles/Quiz.module.css';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const cardResults = {
  "트래블 월렛": {
 title: "가성비 만렙 절약러 💸",
subtitle: "수수료 따윈 못 참지! 충전도, 결제도 깔끔하게.",
description: `
트레블 월렛은 ‘최소 비용 최대 효율’을 추구하는 당신에게 딱 맞는 카드예요.
연회비도 없고, 주요 통화 환전 수수료도 무료!  
가볍게 충전하고, 수수료 없이 똑똑하게 결제해보세요.  
현지 ATM 수수료도 월 500달러까지는 무료니까, 여행지에서도 안심!`
  },
  "트래블로그 체크카드": {
    title: "계획러의 똑똑한 선택 📒",
subtitle: "자동 충전 + 최다 환전 혜택? 완벽해.",
description: `
여행 전에 미리 준비하는 걸 좋아하는 당신이라면, 트래블 로그가 제격이에요.
자동 충전 기능으로 귀찮을 틈 없고,  
무려 58개국 환전 수수료가 2025년까지 무료예요!  
아시아 여행은 물론 유럽까지 커버 가능. 하나은행 연동으로 관리도 쉬워요.`
  },
  "트래블GO 체크카드": {
   title: "혜택은 챙기고, 간편함도 놓치지 않는 🧩",
subtitle: "혜택 골라쓰는 스타일! 유럽파 여행러에게 딱.",
description: `
해외 교통부터 환전 수수료까지,  
필요한 기능만 알차게 담은 트래블GO 체크카드.  
특히 유럽 여행에 최적화되어 있어요.  
연회비 없고, 충전 방식도 자유로우며,  
ATM은 일부 국가 무료 이용도 가능하답니다.`
  },
  "신한 SOL 트레블": {
   title: "혜택파 완전체 ✈️",
subtitle: "여행지 할인, 교통 혜택 다 갖춘 알짜카드.",
description: `
단순히 수수료 아끼는 걸 넘어,  
‘혜택은 확실하게 챙기고 싶은’ 당신께 추천!  
일본 편의점, 베트남 마트 & 그랩, 미국 스타벅스 할인까지 💥  
외화 계좌 충전이라 현지 결제도 빠르고 안정적이에요.  
실속도 감성도 다 갖춘 완전체 카드!`
  },
  "토스카드": {
   title: "모든 게 귀찮은 당신을 위한 카드 🛋️",
subtitle: "토스 하나로 결제, 충전, 환전까지 올인원!",
description: `
가볍고 직관적인 걸 선호한다면, 토스카드가 찰떡이에요.  
수수료 없음 + 자동 충전 + 토스뱅크 연결로  
여행 중에도 앱 하나로 돈 관리 끝!  
복잡한 건 싫고, 간편한 게 최고라면 이 카드가 딱이에요.`
  },
  "네이버페이머니카드": {
   title: "쓸수록 돌려받는 현금주의자 💰",
subtitle: "무제한 3% 캐시백은 못 참지!",
description: `
해외에서도 N페이 머니 쓰는 당신, 꽤 전략적이에요.  
결제 수수료 1.1%는 있지만, 무제한 3% 캐시백으로 보상받을 수 있어요.  
해외 직구, 출장, 장기 체류에 유용한 머니카드!  
게다가 비자 브랜드라 어디서든 결제 가능하죠.`
  },
};

// ✅ 카드명 ↔ 이미지 경로 매핑
const cardImageMap = {
  "트래블 월렛": "/images/travelwallet.png",
  "트래블로그 체크카드": "/images/travellog.png",
  "트래블GO 체크카드": "/images/travelgo.png",
  "신한 SOL 트레블": "/images/soltravel.png",
  "토스카드": "/images/toss.png",
  "네이버페이머니카드": "/images/naverpay.png",
};

export default function Result() {
  const router = useRouter();
  const { card } = router.query;
  const resultRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const cardData = cardResults[card];

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const link = document.createElement('a');
    link.download = `${card}_결과.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleRestart = () => {
    router.push('/quiz');
  };

  const handleShare = async () => {
    const shareText = `${cardData.title}\n\n${cardData.description}\n\n${cardData.hashtags}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 여행 카드 추천 결과',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        alert('공유가 취소되었어요.');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('클립보드 복사에 실패했어요.');
      }
    }
  };

  if (!cardData) {
    return <div className={styles.container}>결과를 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.container}>
      <div ref={resultRef} className={styles.cardBox}>
        <h1 className={styles.title}>{cardData.title}</h1>

        <img
          src={cardImageMap[card]}
          alt={cardData.title}
          className={styles.resultImage}
        />

        <p className={styles.description}>{cardData.description}</p>
        <p className={styles.hashtags}>{cardData.hashtags}</p>
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleDownloadImage} className={styles.button}>이미지로 저장하기</button>
        <button onClick={handleRestart} className={styles.button}>테스트 다시하기</button>
        <button onClick={handleShare} className={styles.button}>결과 공유하기</button>
        {copied && <span className={styles.copiedMessage}>📋 복사 완료!</span>}
      </div>
    </div>
  );
}
