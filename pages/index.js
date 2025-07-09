import { useRouter } from 'next/router';
import styles from '../styles/Intro.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>✈️ 어딩 트래블 카드 테스트</h1>
      <p className={styles.intro}>
        여행 준비의 시작, <br />
        💳 나에게 딱 맞는 트래블 카드부터 골라보세요.<br />
        어딩이 만든 <strong>1분 테스트</strong>로 <br />
        혜택·스타일·사용법까지 <strong>내 여행 성향에 맞는 카드</strong> 찾기!
     </p>
      <button
        className={styles.startBtn}
        onClick={() => router.push('/quiz')}
      >
        지금 시작하기 🚀
      </button>
    </div>
  );
}
