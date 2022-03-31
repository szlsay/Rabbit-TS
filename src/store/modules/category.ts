import { defineStore } from "pinia";
import request from '@/utils/request'
export default defineStore('category', {
  state: () => ({ 
    count: 10,
    list: []
  }),
  actions: {
    async getAllCategory() {
      const res = await request.get('/home/category/head')
      console.log(res)
    },
  },

})