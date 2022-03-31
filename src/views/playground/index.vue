<script lang="ts" setup>
// import { useIntersectionObserver } from '@vueuse/core'
// import { ref } from 'vue'
// const target = ref<HTMLImageElement | null>(null)
// // stop停止监听
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   console.log('执行了')
//   console.log(isIntersecting)

import { ref } from 'vue'

//   if (isIntersecting) {
//     target.value!.src =
//       'https://yanxuan-item.nosdn.127.net/79f289a4e975fd030d5c37b98b9282c5.jpg'
//     stop()
//   }
// })
const url = ref(
  'https://yanxuan-item.nosdn.127.ne123123t/79f289a4e975fd030d5c37b98b9282c5.jpg'
)
</script>

<template>
  <div style="height: 10px"></div>
  <img v-lazy="url" alt="" />
</template>

<style scoed lang="less"></style>
