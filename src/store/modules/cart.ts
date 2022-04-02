import { CartItem } from '@/types/cart'
import { ApiRes } from '@/types/data'
import { Sku } from '@/types/goods'
import request from '@/utils/request'
import { defineStore } from 'pinia'
import useStore from '..'

const useCartStore = defineStore({
  id: 'cart',
  // 开启自动存储
  persist: {
    key: 'rabbit-cart-92',
  },
  // 状态
  state: () => ({
    // 所有的商品的列表
    list: [] as CartItem[],
  }),
  actions: {
    // 添加购物车
    async addCart(data: CartItem) {
      if (this.isLogin) {
        await request.post('/member/cart', {
          skuId: data.skuId,
          count: data.count,
        })
        // 重新获取购物车数据
        this.getCartList()
      } else {
        // 本地逻辑
        // 1. 判断需要添加的购物车信息是否存在
        const goods = this.effectiveList.find(
          (item) => item.skuId === data.skuId
        )
        // 2. 购物车已经存在该商品
        if (goods) {
          goods.count += data.count
        } else {
          //3. 购物车不存在该商品
          this.list.unshift(data)
        }
      }
    },
    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
        this.list = res.data.result
      } else {
        // console.log('本地获取')
        // 本地数据可能会过期
        // 遍历，挨个更新所有的商品
        this.list.forEach(async (item) => {
          const { skuId } = item
          const res = await request.get<ApiRes<CartItem>>(
            `/goods/stock/${skuId}`
          )
          const data = res.data.result
          item.stock = data.stock
          item.nowPrice = data.nowPrice
          item.isEffective = data.isEffective
        })
      }
    },
    // 删除购物车列表
    async delCart(skuIds: string[]) {
      if (this.isLogin) {
        await request.delete('/member/cart', {
          data: {
            ids: skuIds,
          },
        })
        this.getCartList()
      } else {
        // 从本地删除
        // skuIds对应的都需要删除
        this.list = this.list.filter((item) => !skuIds.includes(item.skuId))
      }
    },
    // 修改购物车商品
    async updateCart(
      skuId: string,
      data: { selected?: boolean; count?: number }
    ) {
      if (this.isLogin) {
        await request.put(`/member/cart/${skuId}`, data)
        // 重新获取最新购物车列表
        this.getCartList()
      } else {
        const sku = this.effectiveList.find((item) => item.skuId === skuId)!
        if (data.selected !== undefined) sku.selected = data.selected
        if (data.count !== undefined) sku.count = data.count
      }
    },
    // 修改全选或者全不选
    async updateCartAllSelected(isSelected: boolean) {
      if (this.isLogin) {
        await request.put('/member/cart/selected', {
          selected: isSelected,
        })
        // 获取购物车列表
      } else {
        this.effectiveList.forEach((item) => (item.selected = isSelected))
      }
      this.getCartList()
    },
    /* 
      核心思路：
        1. 先删除原先的商品  3
        2. 添加新的商品     
      
      登录了
        1.  删除  oldSkuId
        2.  添加： skuId   + count

      没有登录
        1. 删除  oldSkuId
        2. 添加   sku  price  oldPrice inventory skuId
    */
    async updateCartSku(oldSkuId: string, sku: Sku) {
      if (this.isLogin) {
        // 1. 先获取老的商品信息
        const oldSku = this.effectiveList.find(
          (item) => item.skuId === oldSkuId
        )
        // 2. 发送请求删除旧的商品
        await request.delete('/member/cart', {
          data: {
            ids: [oldSkuId],
          },
        })
        // 3. 新增商品
        await request.post('/member/cart', {
          skuId: sku.id,
          count: oldSku?.count,
        })
        // 4. 重新渲染
        this.getCartList()
      } else {
        // 思路：
        // 1. 删除原来的商品
        const oldSku = this.effectiveList.find(
          (item) => item.skuId === oldSkuId
        )!
        this.delCart([oldSkuId])
        // 2. 添加新的商品
        this.addCart({
          ...oldSku,
          skuId: sku.id,
          nowPrice: sku.price,
          price: sku.price,
          stock: sku.inventory,
          attrsText: sku.specs
            .map((item) => item.name + ':' + item.valueName)
            .join(' '),
        })
      }
    },
    clearCart() {
      this.list = []
    },
    // 合并购物车
    async mergeLocalCart() {
      const data = this.list.map(({ skuId, selected, count }) => ({
        skuId,
        selected,
        count,
      }))
      await request.post('/member/cart/merge', data)
      // 合并成功，重新获取购物车列表
      this.getCartList()
    },
  },
  getters: {
    // 判断是否登录
    isLogin(): boolean {
      const { user } = useStore()
      return !!user.profile.token
    },
    // 有效的商品列表
    effectiveList(): CartItem[] {
      return this.list.filter((item) => item.stock > 0 && item.isEffective)
    },
    // 所有有效的商品的数量
    effectiveListCounts(): number {
      return this.effectiveList.reduce((sum, item) => sum + item.count, 0)
    },
    // 所有有效商品的总价钱
    effectiveListPrice(): number {
      return +this.effectiveList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2)
    },
    isAllSelected(): boolean {
      return this.effectiveList.every((item) => item.selected)
    },
    // 选中的列表
    selectedList(): CartItem[] {
      return this.effectiveList.filter((item) => item.selected)
    },
    selectedListCounts(): number {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0)
    },
    selectedListPrice(): number {
      return +this.selectedList
        .reduce((sum, item) => sum + item.count * Number(item.nowPrice), 0)
        .toFixed(2)
    },
  },
})

export default useCartStore
