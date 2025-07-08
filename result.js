import { useRouter } from 'next/router';

export default function Result() {
  const { query } = useRouter();
  const cardType = query.type;

  const resultText = {
    "월런": {
      title: "💳 트래블 월런",
      desc: "계획은 내가, 예산은 조절한다! 수동 충전으로 지출 컨트롤, 환전 수수료 0%!",
      tags: "#심플한여행 #트래블월런 #수수료0% #환율걱정없음"
    },
    "클래식": {
      title: "💳 트래블 클래식",
      desc: "여행의 품격을 높이는 혜택 중심 카드! 디자인까지 완벽하게.",
      tags: "#혜택중심 #디자인중요 #클래식감성"
    }
  };

  const result = resultText[cardType] || {};

  return (
    <div className="result">
      <h1>{result.title}</h1>
      <p>{result.desc}</p>
      <p>{result.tags}</p>
      <button onClick={() => location.href = '/'}>다시하기</button>
    </div>
  );
}
