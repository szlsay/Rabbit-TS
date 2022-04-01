<script lang="ts" setup name="Goods">
import useStore from '@/store'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSale from './components/goods-sale.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from './components/goods-detail.vue'
import GoodsHot from './components/goods-hot.vue'
// import Message from '@/components/message'
// import { CartItem } from '@/types/cart'
// 组件中的数据： 组件销毁的时候，数据就销毁了
// pinia中的数据：组件销毁，pinia的数据还在
// 理论：组件销毁的时候，销毁pinia中的数据
const { goods } = useStore()
const route = useRoute()
watchEffect(() => {
  const id = route.params.id as string
  if (route.fullPath === `/goods/${id}`) {
    // 获取商品信息
    goods.getGoodsInfo(id)
  }
})
// onMounted(() => {
//   console.log('goods组件创建了')
// })
onUnmounted(() => {
  // console.log('goods组件销毁了')
  // console.log(goods)
  // 当组件销毁的时候，重置goods的数据
  goods.$reset()
})
const { info } = storeToRefs(goods)
let currentSkuId = ''
const changeSku = (skuId: string) => {
  currentSkuId = skuId
  // 1. 根据接收到的skuId找到对应的sku
  // 2. 修改商品的价钱库存
  const sku = info.value.skus.find((item) => item.id === skuId)
  if (sku) {
    info.value.price = sku.price
    info.value.oldPrice = sku.oldPrice
    info.value.inventory = sku.inventory
  }
}
const count = ref(1)

// const addCart = async () => {
//   if (!currentSkuId) {
//     return Message.warning('请选择完整的商品信息')
//   }
//   // 当前需要添加的商品的sku
//   const sku = info.value.skus.find((item) => item.id === currentSkuId)!
//   const attrsText = sku.specs
//     .map((item) => item.name + ':' + item.valueName)
//     .join(' ')
//   // console.log(attrsText)
//   cart.addCart({
//     // 本地添加
//     id: info.value.id,
//     name: info.value.name,
//     picture: info.value.mainPictures[0],
//     price: info.value.price,
//     count: count.value,
//     skuId: currentSkuId,
//     attrsText: attrsText,
//     selected: true,
//     nowPrice: info.value.price,
//     stock: info.value.inventory,
//     isEffective: true,
//   } as CartItem)

//   Message.success('添加成功')
// }
</script>
<template>
  <div class="xtx-goods-page" v-if="info.categories">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${info.categories[1].id}`">
          {{ info.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${info.categories[0].id}`">
          {{ info.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem>{{ info.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="info.mainPictures"></GoodsImage>
          <GoodsSale></GoodsSale>
        </div>
        <div class="spec">
          <GoodsName :goods="info"></GoodsName>
          <!-- 1369155872197971970  -->
          <GoodsSku :goods="info" @changeSku="changeSku"></GoodsSku>
          <!-- 数字选择框 -->
          <XtxNumbox
            v-model="count"
            showLabel
            :max="info.inventory"
          ></XtxNumbox>
          <!-- 加入购物车 -->
          <XtxButton style="margin-top: 20px" type="primary">
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsDetail :goods="info"></GoodsDetail>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1"></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
          <GoodsHot :type="3"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
