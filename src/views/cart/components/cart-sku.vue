<script name="CartSku" setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { GoodsInfo, Sku } from '@/types/goods'
import Message from '@/components/message'
const props = defineProps({
  attrsText: {
    type: String,
    default: '',
  },
  skuId: {
    type: String,
    default: '',
  },
})

const visible = ref(false)
const toggle = () => {
  visible.value = !visible.value
}

const target = ref(null)
onClickOutside(target, () => {
  visible.value = false
})

const goods = ref<GoodsInfo>({} as GoodsInfo)
onMounted(async () => {
  // 根据props.skuId获取商品的信息
  const res = await request.get<ApiRes<GoodsInfo>>(`/goods/sku/${props.skuId}`)
  // console.log(res)
  goods.value = res.data.result
})

let currentSkuId = ''
const changeSku = (skuId: string) => {
  console.log(skuId)
  currentSkuId = skuId
}

const emit = defineEmits<{
  (e: 'change', sku: Sku): void
}>()
const submit = () => {
  // 判断，currentSkuId有值并且和原来的skuId不能相等
  if (currentSkuId && currentSkuId !== props.skuId) {
    // 子传父，把currentSkuId传回去
    const sku = goods.value.skus.find((item) => item.id === currentSkuId)
    console.log(sku)
    emit('change', sku as Sku)
  } else {
    Message.warning('商品规格不完整或者没变化')
  }
}
</script>

<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <GoodsSku
        :goods="goods"
        :sku-id="skuId"
        @change-sku="changeSku"
      ></GoodsSku>
      <XtxButton
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit"
      >
        确认
      </XtxButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
  }
}
</style>
