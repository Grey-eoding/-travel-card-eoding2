import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>여행 카드 테스트</title>
        {/* Pretendard 웹폰트 로드 (혹은 Noto Sans KR 등으로 교체 가능) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
