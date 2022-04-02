<script lang="ts" setup name="LoginCallback">
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import { ref } from 'vue'
import useStore from '@/store'
import Message from '@/components/message'
import { useRouter } from 'vue-router'
const { user } = useStore()
const hasAccount = ref(true)
const router = useRouter()
// 1. 判断是否qq登录成功
const isQQLogin = QC.Login.check()
if (isQQLogin) {
  // 2. 获取openId
  QC.Login.getMe(async (openId) => {
    console.log(openId)
    // 3. 拿着openId去发送请求进行登录
    await user.qqLogin(openId)
    Message.success('登录成功')
    // const path = (route.query.redirectUrl as string) || '/'
    const redirectUrl = localStorage.getItem('redirectUrl') || '/'
    localStorage.removeItem('redirectUrl')
    router.push(redirectUrl)
  })
}
</script>

<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        href="javascript:;"
        :class="{ active: hasAccount }"
        @click="hasAccount = true"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        :class="{ active: !hasAccount }"
        @click="hasAccount = false"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind></CallbackBind>
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch></CallbackPatch>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
