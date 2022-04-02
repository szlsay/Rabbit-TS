<script setup lang="tsx" name="XtxTabs">
import { type } from 'os'
import { provide, toRef, toRefs, useSlots } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue', 'tab-click'])
// 通过useSlots可以获取到当前组件所有的插槽  this.$slots
const slots: any = useSlots()

const changeTab = (item: any, index: number) => {
  emit('update:modelValue', item.props.name)
  emit('tab-click', item, index)
}

// provide提供的数据需要响应式
const { modelValue } = toRefs(props)
provide('activeName', modelValue)
const VDom = () => {
  // 获取slots中的默认插槽的内容
  const arr: any[] = []
  const panes = slots.default()
  panes.forEach((item: any) => {
    // 判断是静态还是动态渲染的
    if (item.type.name === 'XtxTabsPane') {
      arr.push(item)
    } else if (item.children.length > 0) {
      // 动态渲染的
      item.children.forEach((sub: any) => {
        arr.push(sub)
      })
    }
  })

  const navs = (
    <nav>
      {arr.map((item: any, index: number) => {
        return (
          <a
            class={{ active: item.props.name === props.modelValue }}
            href="javascript:;"
            onClick={() => changeTab(item, index)}
          >
            {item.props.label}
          </a>
        )
      })}
    </nav>
  )
  return <div class="xtx-tabs">{[navs, arr]}</div>
}
</script>

<template>
  <VDom></VDom>
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
