<script lang="ts"></script>
<template>
  <h1>app</h1>
</template>
<style lang="less" scoped>
// 1. 在vite中，样式中使用@不需要~
@import '@/assets/styles/variables.less';
@import '@/assets/styles/mixins.less';
h1 {
  color: @xtxColor;
  background-color: @warnColor;
  .hoverShadow();
}
</style>
