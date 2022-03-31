// 统一的注册所有的全局组件
import { App } from 'vue'
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import XtxBread from './bread/index.vue'
import XtxBreadItem from './bread/item.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
export default {
  install(app: App) {
    app.component('XtxSkeleton', XtxSkeleton)
    app.component('XtxCarousel', XtxCarousel)
    app.component('XtxMore', XtxMore)
    app.component('XtxBread', XtxBread)
    app.component('XtxBreadItem', XtxBreadItem)

    // 自定义指令
    app.directive('lazy', {
      mounted(el: HTMLImageElement, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // 当前元素在可视区
          if (isIntersecting) {
            el.src = binding.value
            // 停止监听
            stop()

            el.onerror = function () {
              // console.log('图片加载失败')
              el.src = defaultImg
            }
          }
        })
      },
    })
  },
}
