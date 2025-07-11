/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 정적 HTML로 내보내기
  basePath: '/travel-card-eoding2', // 하위 디렉토리 배포 경로
  assetPrefix: '/travel-card-eoding2/', // 정적 파일 경로 설정
  trailingSlash: true, // 모든 경로 뒤에 슬래시 붙이기
};

module.exports = nextConfig;
