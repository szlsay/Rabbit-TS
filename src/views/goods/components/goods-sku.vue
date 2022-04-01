<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from '@/types/goods'
import bwPowerSet from '@/utils/power-set'

const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()

const emit = defineEmits<{
  (e: 'changeSku', skuId: string): void
}>()

/**
 * 选中规格
 * @param item
 * @param sub
 */
const changeSelected = (item: Spec, sub: SpecValue) => {
  // 如果规格是禁用，直接不操作
  if (sub.disabled) return
  if (sub.selected) {
    // 如果已经是选中了，取消选中
    sub.selected = false
  } else {
    // 把同级所有(包括sub)的全部取消选中
    item.values.forEach((v) => (v.selected = false))
    // 让sub选中
    sub.selected = true
  }

  // 禁用按钮
  updateDisabledStatus()

  // 1. 判断规格是否全部选中
  const selected = getSelectedSpec().filter((v) => v)
  if (selected.length === props.goods.specs.length) {
    // 说明全部选中
    // 2. 去pathMap找到对应的skuid
    const key = selected.join('★')
    const [skuId] = pathMap[key]
    // 3. 子传父，给父组件
    emit('changeSku', skuId)
  } else {
    emit('changeSku', '')
  }
}

/**
 * 获取路径字典
 */
const getPathMap = () => {
  const pathMap: { [key: string]: string[] } = {}
  // 1. 过滤掉库存为0的sku
  const skus = props.goods.skus.filter((item) => item.inventory > 0)
  // console.log(skus)
  // 2. 遍历有效的sku,获取sku的幂集
  skus.forEach((item) => {
    const arr = item.specs.map((sub) => sub.valueName)
    // console.log(arr)
    // 3. 调用powerSet获取幂集
    const powerSet = bwPowerSet(arr)
    // 4. 把这些powerSet合并到一个路径字典中
    powerSet.forEach((sub) => {
      const key = sub.join('★')
      // 5. 判断pathMap中有没有key
      if (key in pathMap) {
        // 6. 存在
        pathMap[key].push(item.id)
      } else {
        // 7. 不存在
        pathMap[key] = [item.id]
      }
    })
  })

  return pathMap
}
// 获取选中的规格
const getSelectedSpec = () => {
  const arr: string[] = []
  props.goods.specs.forEach((item) => {
    const temp = item.values.find((sub) => sub.selected)
    arr.push(temp ? temp.name : '')
  })
  return arr
}

const pathMap = getPathMap()
// console.log('执行了', pathMap)

// 设置默认选中效果
const initSelectedSpec = () => {
  // console.log('哈哈哈')
  // 1. 根据skuId找到对应的sku
  const sku = props.goods.skus.find((item) => item.id === props.skuId)
  // console.log(sku)
  if (sku) {
    // 2. 如果找到，得到sku中选中的那些规格的值
    props.goods.specs.forEach((item, index) => {
      // 先让所有的规格不选中
      item.values.forEach((sub) => (sub.selected = false))
      const select = sku.specs[index].valueName
      const sub = item.values.find((sub) => sub.name === select)!
      sub.selected = true
    })
  }
}
initSelectedSpec()

// 更新按钮的禁用状态
const updateDisabledStatus = () => {
  // console.log('我执行吗')
  // const res = getSelectedSpec()
  // console.log(res)
  props.goods.specs.forEach((item, index) => {
    // 判断规格中某个值是否要被禁用
    const selectedSpec = getSelectedSpec()
    item.values.forEach((sub) => {
      // 把当前需要判断的规格放到 选中的数组中
      selectedSpec[index] = sub.name
      const key = selectedSpec.filter((v) => v).join('★')
      // console.log(key)
      if (key in pathMap) {
        sub.disabled = false
      } else {
        sub.disabled = true
      }
      // console.log(selectedSpec)
      // if (sub.name in pathMap) {
      //   // 当前规格的名字在pathMap存在，不禁用
      //   sub.disabled = false
      // } else {
      //   // 当前规格在pathMap找不到，禁用
      //   sub.disabled = true
      // }
    })
  })
}
updateDisabledStatus()
</script>
<template>
  <div class="goods-sku">
    <!-- 一个规格 -->
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <!-- 一个规格有多个值 -->
        <template v-for="sub in item.values" :key="sub.name">
          <img
            @click="changeSelected(item, sub)"
            v-if="sub.picture"
            :src="sub.picture"
            alt=""
            :title="sub.name"
            :class="{ selected: sub.selected, disabled: sub.disabled }"
          />
          <span
            :class="{ selected: sub.selected, disabled: sub.disabled }"
            @click="changeSelected(item, sub)"
            v-else
            >{{ sub.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
