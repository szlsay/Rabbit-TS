<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">切换</button>
  <Transition name="aa">
    <div class="box" v-if="show">123</div>
  </Transition>
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
