<script lang="ts" setup>
import useStore from '@/store'
// import { useLazyData } from '@/utils/hooks'
import HomePanel from './home-panel.vue'
// import HomeSkeleton from './home-skeleton.vue'
const { home } = useStore()
home.getNewList()
// const target = useLazyData(() => {
//   home.getNewList()
// })
</script>
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
      <template #right><XtxMore /></template>
      <!-- 面板内容 -->
      <!-- Transition TransitionGroup -->
      <!-- <Transition name="fade"> -->
      <!-- {{ home.newGoodList }} -->
      <!-- <ul class="goods-list" v-if="home.newGoodList.length > 0"> -->
      <ul class="goods-list">
        <li v-for="item in home.newGoodList" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <!-- <HomeSkeleton v-else></HomeSkeleton> -->
      <!-- </Transition> -->
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
