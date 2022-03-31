<script setup lang="ts" name="Layout">
import AppTopnav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
</script>

<template>
  <div>
    <app-topnav></app-topnav>
    <app-header></app-header>
    <div class="app-body">
      <!-- 路由出口 -->
      <RouterView></RouterView>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style lang="less" scoped></style>
