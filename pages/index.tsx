// pages/index.tsx
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>어딩 트래블 카드 테스트</h1>
      <p>여행 준비의 시작, <br />
        👉 나에게 딱 맞는 트래블 카드부터 골라보세요!
      </p>
      <Link href="/quiz">
        <button style={{ marginTop: "1rem" }}>지금 시작하기 👉</button>
      </Link>
    </main>
  );
}
