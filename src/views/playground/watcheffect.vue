<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const money = ref(100)
const name = ref('zs')

watchEffect(() => {
  console.log(name.value, '变化了')
  console.log(money.value, '变化了')
})
</script>

<template>
  <h3>哈哈哈</h3>
  <button @click="money++">加钱</button>
  <button @click="name = 'ls'">改名</button>
</template>

<style scoped lang="less">
.box {
  width: 40px;
}

.aa-enter-active {
  animation: heartBeat 0.3s linear;
}
.aa-leave-active {
  animation: heartBeat 0.3s linear reverse;
}

@keyframes heartBeat {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
