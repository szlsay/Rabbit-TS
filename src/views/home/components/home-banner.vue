<script lang="ts" setup name="HomeBanner"></script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  // background-color: pink;

  :deep(.prev) {
    left: 270px !important;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px !important;
  }
}
</style>
