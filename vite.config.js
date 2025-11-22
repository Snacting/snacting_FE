// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://43.201.67.97', // 백엔드 주소
        changeOrigin: true,
      },
    },
  },
});
