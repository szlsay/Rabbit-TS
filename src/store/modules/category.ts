import { defineStore } from "pinia";
import request from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'
import { topCategory } from '../constants'
const defaultCategory = topCategory.map((item) => { 
  return {
    name: item
  }
})
export default defineStore('category', {
  state: () => ({ 
    count: 10,
    list: defaultCategory as (CategoryItem)[]
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
      console.log(res)
      this.list = res.data.result
    },
  },

})