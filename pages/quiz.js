// pages/quiz.js
import { useState } from 'react';
import styles from '../styles/Quiz.module.css';

const questions = [
  {
    question: '여행 전, 돈은 이렇게 챙기는 스타일이야',
    answers: [
      { text: '자동충전이 최고죠', score: { auto: 2 } },
      { text: '수동충전이 더 믿음감', score: { manual: 2 } },
      { text: '상황 따라 다르게', score: { auto: 1, manual: 1 } },
    ],
  },
  {
    question: '결제 수수료, 너~~무 아까워!',
    answers: [
      { text: '절대 안 내고 싶음', score: { noFee: 2 } },
      { text: '조금은 괜찮아', score: { someFee: 1 } },
      { text: '혜택만 좋다면 상관없음', score: { benefitOverFee: 2 } },
    ],
  },
  {
    question: '환전 수수료, 나는 이렇게 생각해',
    answers: [
      { text: '무조건 무료여야지', score: { fxFree: 2 } },
      { text: '조금 내는 건 괜찮아', score: { fxOk: 1 } },
      { text: '혜택 좋으면 감수 가능', score: { benefitOverFee: 1 } },
    ],
  },
  {
    question: '해외 결제 혜택이 있다면?',
    answers: [
      { text: '최고죠! 무조건 있어야 함', score: { overseasReward: 2 } },
      { text: '있으면 좋고, 없어도 그만', score: { overseasReward: 1 } },
      { text: '별로 중요하지 않음', score: { overseasReward: 0 } },
    ],
  },
  {
    question: '해외 ATM 뽑기 수수료는?',
    answers: [
      { text: '무료여야 안심됨', score: { atmFree: 2 } },
      { text: '약간은 괜찮음', score: { atmOk: 1 } },
      { text: '사용 안 할 거라 상관없음', score: { atmIgnore: 2 } },
    ],
  },
  {
    question: '외화 보유 한도는?',
    answers: [
      { text: '많을수록 좋다', score: { bigLimit: 2 } },
      { text: '적당하면 돼요', score: { midLimit: 1 } },
      { text: '크게 신경 안 써요', score: { lowLimit: 1 } },
    ],
  },
  {
    question: '대중교통 결제 혜택이 있다면?',
    answers: [
      { text: '매우 유용해요!', score: { transportReward: 2 } },
      { text: '잘 모르겠어요', score: { transportReward: 1 } },
      { text: '거의 안 타요', score: { transportReward: 0 } },
    ],
  },
  {
    question: '너무 복잡한 앱은 못 참아',
    answers: [
      { text: '심플한 사용성 필수', score: { uxSimple: 2 } },
      { text: '약간 복잡해도 괜찮음', score: { uxMid: 1 } },
      { text: '혜택만 좋으면 복잡해도 OK', score: { uxTolerant: 2 } },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});

  const handleAnswer = (score) => {
    const updatedScores = { ...scores };
    Object.keys(score).forEach((key) => {
      updatedScores[key] = (updatedScores[key] || 0) + score[key];
    });
    setScores(updatedScores);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    // 추후 결과 계산 로직 삽입
    return (
      <div className={styles.resultContainer}>
        <h2>🎉 테스트 완료!</h2>
        <p>가장 어울리는 트래블 카드를 계산 중이에요...</p>
        <pre>{JSON.stringify(scores, null, 2)}</pre>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className={styles.quizContainer}>
      <h2>{q.question}</h2>
      <div className={styles.answerGroup}>
        {q.answers.map((a, idx) => (
          <button
            key={idx}
            className={styles.answerBtn}
            onClick={() => handleAnswer(a.score)}
          >
            {a.text}
          </button>
        ))}
      </div>
    </div>
  );
}
