// 统一的注册所有的全局组件
import { App } from 'vue'
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxMore from './more/index.vue'
import XtxBread from './bread/index.vue'
import XtxBreadItem from './bread/item.vue'
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/numbox/index.vue'
import XtxButton from '@/components/button/index.vue'
import XtxCheckbox from '@/components/checkbox/index.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxSwitch from '@/components/switch/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPane from '@/components/tabs/pane.vue'
export default {
  install(app: App) {
    app.component('XtxSkeleton', XtxSkeleton)
    app.component('XtxCarousel', XtxCarousel)
    app.component('XtxMore', XtxMore)
    app.component('XtxBread', XtxBread)
    app.component('XtxBreadItem', XtxBreadItem)
    app.component('XtxCity', XtxCity)
    app.component('XtxNumbox', XtxNumbox)
    app.component('XtxButton', XtxButton)
    app.component('XtxCheckbox', XtxCheckbox)
    app.component('XtxDialog', XtxDialog)
    app.component('XtxSwitch', XtxSwitch)
    app.component('XtxTabs', XtxTabs)
    app.component('XtxTabsPane', XtxTabsPane)

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
