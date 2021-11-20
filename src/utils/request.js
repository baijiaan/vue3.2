import axios from 'axios'
// 利用element框架机制导入报错时弹出
import { ElMessage } from 'element-plus'
import { isCheckTimeOut } from './auth.js'
// import { getItem } from '@/utils/storage.js'
// import { TOKEN } from '@/common/common.js'

// 导入vuex中的token值
import store from '@/store/index.js'
// 封装axios
const server = axios.create({
  // 后台代理
  timeout: 5000,
  baseURL: '/api'
})

// 不需要登录 (不需要token) 就能访问的接口  也就是白名单
// 多个白名单
// const whiteUrl = ['/sys/login']
// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    // if (whiteUrl.includes(config.url) <= -1) {

    if (store.getters.token) {
      // 如果存在TOKEN 进行封装,不存在就不封装
      // 请求的不是login
      if (!isCheckTimeOut()) {
        // 过期执行退出登录
        store.dispatch('user/logout')
        // 不应该请求
        return Promise.reject(new Error('token 过期'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    // }

    // 在发送请求之前做的操作
    return config
  },
  (error) => {
    // Do something with request error
    console.log('白家安白家安吧唧吧唧啊')
    return Promise.reject(error)
  }
)

// 错误处理 服务器返回错误  消息提醒
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么 对的数据 和 错的数据
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      console.log('xxxxxx')
      ElMessage({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token 失效(code 401) 单点登录 后台会返回特定的状态码 执行退出
    if (error.response && error.respones && error.response.data.code === 401) {
      store.dispatch('user/logout')
    }
    console.log(error, '白家安不吧唧吧唧')
    // 服务器没有返回数据或者是服务器未知错误
    ElMessage({
      type: 'error',
      message: error.message
    })
    // Do something with response error
    return Promise.reject(error)
  }
)

// 封装好的token

// 导出一个对象
export default server
