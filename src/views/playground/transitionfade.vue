<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">切换</button>
  <Transition name="fade">
    <div class="box" v-if="show"></div>
  </Transition>
</template>

<style scoped lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
}
.fade-enter-from {
  transform: translateX(-100%);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  transform: translateX(0%);
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
