import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Quiz.module.css';

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
        score['토스카드'] += 1;
        break;
      case '실속러':
      case '캐시백':
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
    if (currentQuestion + 1 < questions.length) {
      setAnswers(newAnswers);
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
        {questions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            className={styles.optionButton}
            onClick={() => handleAnswer(opt.value)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
