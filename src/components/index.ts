// 统一的注册所有的全局组件
import { App } from 'vue'
import XtxSkeleton from '@/components/skeleton/index.vue'
export default {
  install(app: App) {
    app.component('XtxSkeleton', XtxSkeleton)
  },
}
