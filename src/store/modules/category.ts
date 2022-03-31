import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes, CategoryItem, TopCategory, SubCategory } from '@/types/data'
import { topCategory } from '../constants'
const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  }
})
export default defineStore('category', {
  state: () => ({
    list: defaultCategory as CategoryItem[],
    // 顶级分类
    topCategory: {} as TopCategory,
    // 二级分类
    subCategory: {} as SubCategory,
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get<ApiRes<CategoryItem[]>>(
        '/home/category/head'
      )
      // 1. 给每一个一级分类添加一个open属性，用于控制显示隐藏
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
    },
    async getTopCategory(id: string) {
      const res = await request.get<ApiRes<TopCategory>>('/category', {
        params: {
          id,
        },
      })
      this.topCategory = res.data.result
    },
    async getSubCategory(id: string) {
      const res = await request.get<ApiRes<SubCategory>>(
        '/category/sub/filter',
        {
          params: {
            id,
          },
        }
      )
      this.subCategory = res.data.result
    },
  },
})
