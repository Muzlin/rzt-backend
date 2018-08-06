import axios from 'axios'
// import Qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的 base_url
  timeout: 3, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  // 以下配置为 form data 格式提交
  // headers: {
  //   'Content-Type': ''
  // }
  // transformRequest(data) {
  //   data = Qs.stringify(data)
  //   return data
  // }
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${getToken()}` // 请求携带自定义token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) { // 改为 isSuccess接口返回 isSuccess
      if (res.error === 'ERROR_ACCESS_NEED_AUTH') {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message.error(res.errorDescription || 'code 为200 但是isSuccess 状态不存在')
      }
      return Promise.reject('error')
    } else {
      console.log('response ================>', response)
      if (response.data.result !== undefined && Object.keys(response.data.result).length === 0) {
        response.data.result = []
      }
      return response.data.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.dir(error.response)
    if (error.response.data.error === 'ERROR_ACCESS_NEED_AUTH') {
      // 登录失效
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
