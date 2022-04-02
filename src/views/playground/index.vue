<script lang="ts" setup name="PlayGround">
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <div v-if="show">
    <Transition>
      <div class="box"></div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
</style>
