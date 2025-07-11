import { useState } from 'react';
import { useRouter } from 'next/router';
import { quizData } from '../data/quizData';
import styles from '../styles/Quiz.module.css';

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = quizData[currentIndex];

  const handleOptionClick = (type: string) => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 마지막 질문 후 결과 페이지로 이동
      const queryParams = new URLSearchParams({
        answers: JSON.stringify(updatedAnswers),
      }).toString();

      router.push(`/result?${queryParams}`);
    }
  };

  if (!currentQuestion) return <p>질문을 불러오는 중입니다...</p>;

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
