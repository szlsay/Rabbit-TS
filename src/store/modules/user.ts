import { ApiRes } from '@/types/data'
import { Profile } from '@/types/user'
import request from '@/utils/request'
import { getProfile, removeProfile, setProfile } from '@/utils/storage'
import { defineStore } from 'pinia'
import useStore from '..'

export default defineStore('user', {
  state: () => ({
    profile: getProfile(),
  }),
  actions: {
    // 用户名和密码登录
    async login(account: string, password: string) {
      const res = await request.post<ApiRes<Profile>>('/login', {
        account,
        password,
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      // 2. 存储一份到本地
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.mergeLocalCart()
    },
    // 获取手机验证码
    async sendMobileMsg(mobile: string) {
      await request.get('/login/code', {
        params: {
          mobile,
        },
      })
    },
    // 绑定qq的短信验证码
    async sendQQBindMsg(mobile: string) {
      await request.get('/login/social/code', {
        params: {
          mobile,
        },
      })
    },
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>('/login/code', {
        mobile,
        code,
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      // 2. 存储一份到本地
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.mergeLocalCart()
    },
    logout() {
      this.profile = {} as Profile
      removeProfile()
      // 清除购物车数据
      const { cart } = useStore()
      cart.clearCart()
    },
    async qqLogin(openId: string) {
      const res = await request.post<ApiRes<Profile>>('/login/social', {
        unionId: openId,
        source: 6,
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      // 2. 存储一份到本地
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.mergeLocalCart()
    },
    async qqBindLogin(openId: string, mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>('/login/social/bind', {
        mobile,
        code,
        unionId: openId,
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      // 2. 存储一份到本地
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.mergeLocalCart()
    },
    // 获取短信验证码
    // 绑定qq的短信验证码
    async sendQQPathMsg(mobile: string) {
      await request.get('/register/code', {
        params: {
          mobile,
        },
      })
    },

    async qqPatchLogin(data: any) {
      const res = await request.post<ApiRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      )
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      setProfile(res.data.result)
      const { cart } = useStore()
      cart.mergeLocalCart()
    },
  },
})
