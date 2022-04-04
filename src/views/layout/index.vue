<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue'
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
import AppHeaderSticky from './components/app-header-sticky.vue'
</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <div class="app-body">
    <!-- 
    路由出口
    diff算法  对比前后的key属性，如果key属性发生了变化，不会复用
    -->
    <RouterView :key="$route.fullPath"></RouterView>
  </div>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
