import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from '@/store'
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue'),
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/category/sub.vue'),
        },
        {
          path: '/goods/:id',
          component: () => import('@/views/goods/index.vue'),
        },
        {
          path: '/cart',
          component: () => import('@/views/cart/index.vue'),
        },
        {
          path: '/member/checkout',
          component: () => import('@/views/member/pay/checkout.vue'),
        },
        {
          path: '/member/pay',
          component: () => import('@/views/member/pay/index.vue'),
        },
        {
          path: '/pay/callback',
          component: () => import('@/views/member/pay/callback.vue'),
        },
        {
          path: '/member',
          component: () => import('@/views/member/layout/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/member/home/index.vue'),
            },
            {
              path: 'order',
              component: () => import('@/views/member/order/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/login/callback',
      component: () => import('@/views/login/callback.vue'),
    },
    {
      path: '/playground',
      component: () => import('@/views/playground/index.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const { cart } = useStore()
  // 如果登录了
  if (cart.isLogin) {
    return next()
  }
  // 如果没有登录

  if (to.path.startsWith('/member')) {
    // 需要登录才能访问
    next({
      path: '/login',
    })
    localStorage.setItem('redirectUrl', to.fullPath)
  } else {
    next()
  }
})

export default router
