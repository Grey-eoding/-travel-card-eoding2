/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 HTML 생성
  basePath: '/travel-card-eoding2', // GitHub Pages용 하위 경로
  assetPrefix: '/travel-card-eoding2/', // 정적 자산 경로 설정
  trailingSlash: true, // export 시 경로 오류 방지를 위해 슬래시 붙이기 (권장)
};

module.exports = nextConfig;
