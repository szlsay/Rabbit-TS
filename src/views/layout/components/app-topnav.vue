<script lang="ts" setup name="AppTopnav">
import Confirm from '@/components/confirm'
import Message from '@/components/message'
import useStore from '@/store'
import { useRouter } from 'vue-router'

const { user } = useStore()
const router = useRouter()
const logout = async function () {
  try {
    await Confirm({
      title: '温馨提示',
      text: '你确定要退出吗',
    })
  } catch {
    return
  }
  // 清除用户数据
  user.logout()
  // 跳转到
  router.push('/login')
  // 提示消息
  Message.success('退出成功')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ user.profile.nickname || user.profile.account }}
            </a>
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <!-- <li><RouterLink to="/member">会员中心</RouterLink></li> -->
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
