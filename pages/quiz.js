import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Quiz.module.css';

const questions = [
  {
    question: '여행 스타일은?',
    options: [
      { text: '최대한 간단하게! 필요한 것만 챙긴다.', value: '심플' },
      { text: '가보던 아시아는 이젠 눈 감고도 다닌다.', value: '아시아러' },
      { text: '유럽 도시 감성 속을 걷고, 타고, 찍고, 쓴다.', value: '유럽러' },
      { text: '나라별 혜택을 꼼꼼히 챙긴다.', value: '혜택러' },
      { text: '모바일로 모든 걸 해결하는 편이다.', value: '테크러' },
      { text: '국내·해외 상관없이 실속파다.', value: '실속러' },
    ],
  },
  {
    question: '충전 방식은?',
    options: [
      { text: '내가 직접 관리하는 수동 충전!', value: '수동' },
      { text: '귀찮은 건 싫다. 자동 충전이지.', value: '자동' },
      { text: '외화 충전이라도 혜택 좋으면 OK.', value: '외화충전' },
    ],
  },
  {
    question: '선호하는 결제 경험은?',
    options: [
      { text: '알리페이처럼 현지에서 자연스럽게', value: '자연스러움' },
      { text: '대중교통까지 가능한 실용형', value: '실용형' },
      { text: '할인 혜택이 자동 적용되는 똑똑함', value: '혜택중시' },
      { text: 'UI 깔끔하고 디자인도 중요함', value: '디자인' },
      { text: '캐시백처럼 돌아오는 실익!', value: '캐시백' },
    ],
  },
  {
    question: '현지에서 가장 많이 쓰는 결제 방식은?',
    options: [
      { text: '신용카드', value: '카드' },
      { text: '모바일 간편결제', value: '테크러' },
      { text: '현금 인출해서 사용', value: '수동' },
    ],
  },
  {
    question: '기념품 살 때 중요한 건?',
    options: [
      { text: '가성비', value: '실속러' },
      { text: '현지에서만 살 수 있는 것', value: '유럽러' },
      { text: '포인트 적립/할인', value: '혜택러' },
    ],
  },
  {
    question: '주로 가는 여행지는?',
    options: [
      { text: '동남아/일본', value: '아시아러' },
      { text: '유럽/미국', value: '유럽러' },
      { text: '국내', value: '심플' },
    ],
  },
  {
    question: '여행 갈 때 카드 몇 장 챙겨?',
    options: [
      { text: '1~2장으로 최소화', value: '심플' },
      { text: '혜택별로 다 챙긴다', value: '혜택러' },
      { text: '해외 겸용카드 하나만', value: '트래블 월렛' },
    ],
  },
  {
    question: '결제 후 피드백은?',
    options: [
      { text: '알림 바로 오는 게 좋다', value: '토스카드' },
      { text: '내역 확인 편한 게 중요', value: '네이버페이머니카드' },
      { text: '알림은 필요 없다', value: '수동' },
    ],
  },
];

const calculateResult = (answers) => {
  const score = {
    '트래블 월렛': 0,
    '트래블로그 체크카드': 0,
    '트래블GO 체크카드': 0,
    '신한 SOL 트레블': 0,
    '토스카드': 0,
    '네이버페이머니카드': 0,
  };

  answers.forEach((answer) => {
    switch (answer) {
      case '심플':
      case '수동':
      case '트래블 월렛':
        score['트래블 월렛'] += 1;
        break;
      case '아시아러':
      case '자동':
      case '자연스러움':
        score['트래블로그 체크카드'] += 1;
        break;
      case '유럽러':
      case '실용형':
      case '외화충전':
        score['트래블GO 체크카드'] += 1;
        break;
      case '혜택러':
      case '혜택중시':
        score['신한 SOL 트레블'] += 1;
        break;
      case '테크러':
      case '디자인':
      case '토스카드':
        score['토스카드'] += 1;
        break;
      case '실속러':
      case '캐시백':
      case '네이버페이머니카드':
        score['네이버페이머니카드'] += 1;
        break;
    }
  });

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
};

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResult(newAnswers);
      router.push({ pathname: '/result', query: { card: result } });
    }
  };

  return (
    <div className={styles.container}>
      <h2>{questions[currentQuestion].question}</h2>
      <div className={styles.options}>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={styles['option-button']}
            onClick={() => handleAnswer(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
