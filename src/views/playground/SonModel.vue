<script lang="ts" setup name="PlayGround">
import { ref } from 'vue'
import Son from './Son.vue'

const money = ref(100)
</script>

<template>
  <h3>根组件</h3>
  <hr />
  <Son v-model:money="money"></Son>
</template>

<style scoped lang="less"></style>
