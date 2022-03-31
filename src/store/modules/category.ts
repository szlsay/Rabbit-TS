import { defineStore } from "pinia";
import request from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'
export default defineStore('category', {
  state: () => ({ 
    count: 10,
    list: [] as (CategoryItem)[]
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
      console.log(res)
      this.list = res.data.result
    },
  },

})