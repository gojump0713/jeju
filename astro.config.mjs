// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages 프로젝트 페이지: https://gojump0713.github.io/jeju/
// 운영 도메인이 확정되면 site/base를 함께 변경한다 (작업지시서 12장 canonical).
export default defineConfig({
  site: 'https://gojump0713.github.io',
  base: '/jeju/',
  trailingSlash: 'ignore',
  build: {
    assets: '_assets',
  },
  // 하단 고정 CTA를 가리므로 개발 툴바 비활성화
  devToolbar: { enabled: false },
});
