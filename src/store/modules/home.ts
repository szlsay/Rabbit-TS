import {
  ApiRes,
  BannerItem,
  Brand,
  GoodItem,
  HotGoods,
  HomeProduct,
  Special,
} from '@/types/data'
import request from '@/utils/request'
import { defineStore } from 'pinia'

export default defineStore('home', {
  state: () => ({
    bannerList: [] as BannerItem[],
    newGoodList: [] as GoodItem[],
    hotGoodList: [] as HotGoods[],
    // 品牌数据
    brandList: [] as Brand[],
    productList: [] as HomeProduct[],
    specialList: [] as Special[],
  }),
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>('/home/banner')
      this.bannerList = res.data.result
    },

    async getNewList() {
      const res = await request.get<ApiRes<GoodItem[]>>('/home/new')
      // setTimeout(() => {
      this.newGoodList = res.data.result
      // }, 1000)
    },
    async getHotList() {
      const res = await request.get<ApiRes<HotGoods[]>>('/home/hot')
      // setTimeout(() => {
      // this.newGoodList = res.data.result
      this.hotGoodList = res.data.result
      // }, 1000)
    },
    async getBrandList() {
      const res = await request.get<ApiRes<Brand[]>>('/home/brand')
      console.log(res)
      this.brandList = res.data.result
    },
    async getProductList() {
      const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
      this.productList = res.data.result
    },
    async getSpecialList() {
      const res = await request.get<ApiRes<Special[]>>('/home/special')
      this.specialList = res.data.result
    },
  },
})
