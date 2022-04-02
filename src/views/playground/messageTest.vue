<script lang="ts" setup name="PlayGround">
// h 等价于 createVNode
// createVNode: 作用：创建虚拟DOM
import { h, onMounted, render } from 'vue'
// 参数1：创建的虚拟DOM的节点类型  比如  div h1  a  img
// 参数2：虚拟DOM拥有的属性，是一个对象
// 参数3：虚拟DOM节点的内容
import XtxMessage from './message/index.vue'
// <h1 title="标题" id="box" class="aa">我是标题</h1>
// const vNode = h('h1', { title: '标题', id: 'box', className: 'aa' }, '我是标题')

// <XtxMessage type="error">我是内容</XtxMessage>
const vNode = h(XtxMessage, { type: 'error' }, () => '我是内容')
onMounted(() => {
  // 参数1：虚拟DOM
  // 参数2：真实的DOM，，，虚拟DOM的挂载点
  render(vNode, document.querySelector('.box')!)
})
</script>

<template>
  <div class="box">
    <!-- <h1 title="标题">我是一个标题</h1> -->
  </div>
</template>

<style scoped lang="less"></style>
