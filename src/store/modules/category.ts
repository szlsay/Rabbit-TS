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
      res.data.result.forEach((item) => { 
        item.open = false
      })
      this.list = res.data.result
    },
    show(id: string) { 
      const category = this.list.find((item) => item.id === id)
      category!.open = true
    },
    hide(id: string) { 
      const category = this.list.find((item) => item.id === id)
      category!.open = false
    }
  },

})