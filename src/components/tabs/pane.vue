<script setup lang="ts" name="XtxTabsPane">
import { inject } from 'vue'

defineProps<{
  label?: string
  name?: string
}>()
const activeName = inject('activeName')
</script>

<template>
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot></slot>
  </div>
</template>
