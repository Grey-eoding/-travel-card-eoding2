import styles from '@/styles/Quiz.module.css';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const cardResults = {
  "트래블 월렛": {
    title: '💳 트래블 월렛',
    description:
      '“계획은 내가 한다. 예산은 내가 조절한다.”\n\n심플하고 빠른 선택을 선호하는 당신, 트래블 월렛은 불필요한 혜택 없이 딱 핵심만 담은 카드예요. 수동 충전 방식이라 내 지출을 정확히 컨트롤할 수 있고, 미국·일본·유럽처럼 자주 가는 지역에서 환전 수수료 0%라는 점도 강력한 장점! 자유여행러, 미니멀 여행자에게 특히 잘 어울려요.',
    hashtags: '#심플한여행 #수동충전러 #트래블월렛 #미일유럽맞춤 #환율걱정없음',
  },
  "트래블로그 체크카드": {
    title: '💳 트래블로그 체크카드',
    description:
      '“아시아 여행? 이제는 껌이지.”\n\n동남아, 중국, 일본, 대만 등 아시아 지역에 익숙한 당신에게 찰떡! 58개국 환전 수수료 면제는 물론, 자동 충전 기능까지 탑재되어 있어 귀찮은 충전 걱정도 NO. 유니온페이 브랜드를 선택하면 중국에서 알리페이처럼 자연스럽게 결제 가능해요. 출장 잦거나 자주 떠나는 아시아 여행자라면, 이 카드가 바로 여행 루틴의 시작!',
    hashtags: '#아시아여행러 #중국갈때필수 #자동충전 #수수료제로 #트래블로그',
  },
  "트래블GO 체크카드": {
    title: '💳 트래블GO 체크카드',
    description:
      '“유럽 도시는 걷고, 타고, 찍고, 쓰는 재미지.”\n\n유럽에서 대중교통까지 지원되는 실속파 카드! 체크카드지만 외화 충전 기반이라 환전 수수료도 적고, 현지에서 대중교통 결제도 가능해 별도 티켓 없이도 스무스하게 다닐 수 있어요. 백팩 여행자, 도시 탐험가, 유럽 한 달 살이 준비 중이라면 강추!',
    hashtags: '#유럽감성 #여행고수템 #대중교통마스터 #트래블GO는사랑',
  },
  "신한 SOL 트레블": {
    title: '💳 신한 SOL 트레블',
    description:
      '“혜택 빠삭하게 챙기는 사람, 바로 나.”\n\n이 카드 하나면 여행지별 할인 혜택이 자동 적용! 일본 편의점, 베트남 그랩·마트, 미국 스타벅스까지 나라별 혜택이 다 들어있어요. 신한은행 기반이라 외화 계좌 관리도 쉬우며, 혜택 + 실속 + 충전의 삼박자가 필요한 여행자라면 이 카드가 진리.',
    hashtags: '#혜택왕 #여행리워드 #스타벅스5퍼 #베트남그랩할인 #신한트레블',
  },
  "토스카드": {
    title: '💳 토스카드',
    description:
      '“심플하지만 강력한 한 방이 필요해.”\n\n앱 하나로 모든 걸 관리하는 토스카드. 디자인도 예쁘고 UI도 깔끔해, IT 감각 있는 여행자에게 딱이죠. 충전 한도도 넉넉해(하루 최대 1천만 원), 고액 경비가 필요한 상황에서도 당황할 일 없어요. 토스 앱 사용자이거나, 지갑 없이 다니는 모바일 중심 여행자라면 필수템.',
    hashtags: '#하루천만원가능 #간편UI #토스유저 #심플라이프 #테크여행러',
  },
  "네이버페이머니카드": {
    title: '💳 네이버페이머니카드',
    description:
      '“여행도 일상도, 결국 혜택으로 돌아온다.”\n\n체크카드 기반이라 국내에서 네이버페이 혜택도 누리고, 해외에선 무제한 3% 캐시백까지! 따로 외화 충전 없이도 카드만 들고 나가면 바로 결제 가능해요. “나는 여행을 가끔 가지만, 쓸 땐 혜택을 챙기고 싶어” 하는 실속형 여행자라면 이 카드가 제격이에요.',
    hashtags: '#국내해외모두OK #캐시백꿀 #네이버페이카드 #체크카드의힘 #일상여행러',
  },
};

export default function Result() {
  const router = useRouter();
  const { card } = router.query;
  const resultRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const cardData = cardResults[card];

  if (!cardData) {
    return <div className={styles.container}>결과를 불러오는 중입니다...</div>;
  }

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

  return (
    <div className={styles.container}>
      <div ref={resultRef}>
        <h1>{cardData.title}</h1>
        <p style={{ whiteSpace: 'pre-line' }}>{cardData.description}</p>
        <p className={styles.hashtags}>{cardData.hashtags}</p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={handleDownloadImage} className={styles.button}>이미지로 저장하기</button>
        <button onClick={handleRestart} className={styles.button}>테스트 다시하기</button>
        <button onClick={handleShare} className={styles.button}>결과 공유하기</button>
        {copied && <span style={{ color: 'green' }}>📋 복사 완료!</span>}
      </div>
    </div>
  );
}
