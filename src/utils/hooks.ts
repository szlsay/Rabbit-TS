import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

/**
 * 用于懒加载数据
 */
export function useLazyData(callback: () => void) {
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        callback()
        stop()
      }
    },
    {
      // 只要交叉，立马触发
      threshold: 0,
    }
  )
  return target
}

/**
 * 封装一个倒计时功能
 */
export function useCountDown(count: number = 60) {
  const time = ref(0)
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      if (time.value === 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )

  // 组件销毁时清除定时器
  onUnmounted(() => {
    pause()
  })

  const start = () => {
    time.value = count
    resume()
  }

  return {
    time,
    start,
  }
}
