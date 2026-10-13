import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 使用相对路径，兼容 GitHub Pages 根路径 / 子路径部署
  base: './',
})
