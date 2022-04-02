import Message from '@/components/message'
import useStore from '@/store'
import axios, { AxiosError } from 'axios'
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const request = axios.create({
  baseURL,
  // baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = useStore()
    if (user.profile.token && config.headers) {
      config.headers.Authorization = `Bearer ${user.profile.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    // Message.error(error.response.data.message)
    // 对响应错误做点什么
    if (!error.response) {
      Message.error('网络异常，请稍后重置')
    } else {
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default request
