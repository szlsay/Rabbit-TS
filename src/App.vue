<script lang="ts"></script>
<template>
  <h1>app</h1>
  <ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
  </ul>
  <ol>
    <li>2</li>
    <li>2</li>
    <li>2</li>
    <li>2</li>
  </ol>
</template>
<style lang="less" scoped>
// 1. 在vite中，样式中使用@不需要~
// @import '@/assets/styles/variables.less';
// @import '@/assets/styles/mixins.less';
h1 {
  color: @xtxColor;
  background-color: @warnColor;
  .hoverShadow();
}
</style>
