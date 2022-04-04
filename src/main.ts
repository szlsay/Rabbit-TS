import { createApp } from 'vue'
import App from '@/App.vue'
// 引入通用样式，浏览器表现是一致的
import 'normalize.css'
// 引入项目中一些通用样式
import '@/assets/styles/common.less'
import router from '@/router'
import { createPinia } from 'pinia'
import XtxUI from '@/components'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

// 全局注册组件
// app.component('XtxSkeleton', XtxSkeleton)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(XtxUI)
app.use(pinia)
app.mount('#app')
