import { createApp } from 'vue'
import App from '@/App.vue'
// 引入通用样式，浏览器表现是一致的
import 'normalize.css'
// 引入项目中一些通用样式
import '@/assets/styles/common.less'

createApp(App).mount('#app')
