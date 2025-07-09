import { useState } from 'react';
import { useRouter } from 'next/router';
import { quizData } from '../data/quizData';
import styles from '../styles/Quiz.module.css';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quizData[currentIndex];

  const handleOptionClick = (type) => {
    setAnswers([...answers, type]);

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 모든 질문에 응답 완료 → 결과 페이지로 이동 (query에 답변 전달)
      router.push({
        pathname: '/result',
        query: { answers: JSON.stringify([...answers, type]) }
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <h2 className={styles.question}>{currentQuestion.question}</h2>
        <ul className={styles.options}>
          {currentQuestion.options.map((option, idx) => (
            <li key={idx}>
              <button
                className={styles.optionButton}
                onClick={() => handleOptionClick(option.type)}
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
