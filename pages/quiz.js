import { useState } from 'react';
import { quizData } from '../data/quizData';
import styles from '../styles/Quiz.module.css';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizData[currentIndex];

  const handleAnswer = (type) => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true); // 끝나면 결과 보기로 전환
    }
  };

  if (isFinished) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>🎉 결과 요약</h2>
        <ul className={styles.resultList}>
          {answers.map((type, idx) => (
            <li key={idx} className={styles.resultItem}>
              질문 {idx + 1}번 → 선택한 유형: {type}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <h2 className={styles.question}>
          {currentQuestion.question}
        </h2>
        <ul className={styles.options}>
          {currentQuestion.options.map((option, idx) => (
            <li key={idx}>
              <button
                className={styles.optionButton}
                onClick={() => handleAnswer(option.type)}
              >
                {option.text}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.progress}>
          {currentIndex + 1} / {quizData.length}
        </div>
      </div>
    </div>
  );
}
