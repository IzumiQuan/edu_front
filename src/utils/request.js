// src/utils/request.js
import axios from 'axios'

class Request {
  constructor(config) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在这里可以添加token等全局请求头
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 在这里可以对响应数据做统一处理
        return response.data
      },
      (error) => {
        // 在这里对错误做统一处理
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.error('未授权，请重新登录')
              // 可以跳转到登录页
              break
            case 403:
              console.error('拒绝访问')
              break
            case 404:
              console.error('请求资源不存在')
              break
            case 500:
              console.error('服务器错误')
              break
            default:
              console.error('其他错误')
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // 封装通用请求方法
  request(config) {
    return this.instance.request(config)
  }

  // 封装GET方法
  get(url, config = {}) {
    return this.instance.get(url, config)
  }

  // 封装POST方法
  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config)
  }

}

// 创建请求实例
const request = new Request({
  baseURL: 'http://192.168.8.32:8080/api', // 从环境变量获取基础URL
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default request