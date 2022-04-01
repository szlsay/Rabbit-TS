<script lang="ts" setup name="XtxCity">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { AreaList, CityResult } from '@/types/goods'
import axios from 'axios'

defineProps<{
  userAddress?: string
}>()
const emit = defineEmits<{
  (e: 'changeCity', value: CityResult): void
}>()
// 控制弹层的显示隐藏
const active = ref(false)
const toggle = () => {
  active.value = !active.value
}
const target = ref(null)
onClickOutside(target, (e) => {
  // console.log(e)
  // 当点击target元素的外面的时候，就会触发
  active.value = false
})

const cityList = ref<AreaList[]>([])
// 缓存所有的城市数据
const cacheList = ref<AreaList[]>([])
const getCityList = async () => {
  const res = await axios.get<AreaList[]>(
    'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
  )
  // console.log(res.data)
  cityList.value = res.data
  cacheList.value = res.data
}
getCityList()

const changeResult = ref({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
})
const selectCity = (city: AreaList) => {
  if (city.level === 0) {
    // 选择省
    changeResult.value.provinceCode = city.code
    changeResult.value.provinceName = city.name
    cityList.value = city.areaList
  }
  if (city.level === 1) {
    // 选择市
    changeResult.value.cityCode = city.code
    changeResult.value.cityName = city.name
    cityList.value = city.areaList
  }
  if (city.level === 2) {
    // 选择县
    changeResult.value.countyCode = city.code
    changeResult.value.countyName = city.name
    // 关闭
    active.value = false

    // 把完整的数据传递给父组件
    emit('changeCity', changeResult.value)
  }
}

// 关闭时，恢复数据
watch(active, (value) => {
  if (!value) {
    // 关闭
    cityList.value = cacheList.value
  }
})
</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active }">
      <span class="value" v-if="userAddress">{{ userAddress }}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span
        class="ellipsis"
        v-for="item in cityList"
        :key="item.code"
        @click="selectCity(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
