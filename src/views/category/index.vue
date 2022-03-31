<script lang="ts" name="TopCategory" setup>
import { useRoute } from 'vue-router'
import useStore from '@/store'
import { watch, watchEffect } from 'vue'
const route = useRoute()
const { category } = useStore()

watch(
  () => route.params.id,
  (value) => {
    console.log('change:', value)
    category.getTopCategory(route.params.id as string)
  },
  {
    immediate: true,
  }
)

// watchEffect(() => {
//   const id = route.params.id as string
//   if(route.fullPath === `/cat`)
// })
</script>

<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
      </XtxBread>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
