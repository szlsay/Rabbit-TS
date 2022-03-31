<script lang="ts" setup name="Home">
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeNew from './components/home-new.vue'
</script>
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
      <!-- 新鲜好物 -->
      <HomeNew></HomeNew>
      <!-- <HomePanel title="新鲜好物" sub-title="我是子标题">
        <template #right>
          <XtxMore></XtxMore>
        </template>
        我是内容
      </HomePanel> -->
    </div>
  </div>
</template>

<style></style>
