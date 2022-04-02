import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  // 支持setup的name属性
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import '@/assets/styles/variables.less';
          @import '@/assets/styles/mixins.less';
        `,
      },
    },
  },
  server: {
    port: 8080,
    host: 'www.corho.com',
    open: true,
    cors: true,
  },
})
