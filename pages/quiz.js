import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  { text: "1. 여행 스타일은 어떤가요?", options: ["자유 여행", "패키지 여행"] },
  { text: "2. 주 사용 국가?", options: ["일본", "미국", "유럽"] },
  { text: "3. 환율 변동에 민감한가요?", options: ["예", "아니오"] },
  { text: "4. 카드 디자인도 중요한가요?", options: ["중요", "별로"] },
  { text: "5. 자주 여행하나요?", options: ["자주", "가끔"] },
  { text: "6. 지출 계획을 세우는 편인가요?", options: ["네", "아니요"] },
  { text: "7. 환전 수수료 신경쓰이나요?", options: ["네", "아니요"] },
  { text: "8. 카드 혜택이 복잡한 건 불편한가요?", options: ["네", "아니요"] },
];

export default function Quiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const score = newAnswers.filter(a => a === "자유 여행" || a === "일본" || a === "네").length;
      const result = score >= 5 ? "월런" : "클래식";
      router.push(`/result?type=${result}`);
    }
  };

  return (
    <div className="quiz">
      <h2>{questions[current].text}</h2>
      {questions[current].options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option)}>{option}</button>
      ))}
    </div>
  );
}
