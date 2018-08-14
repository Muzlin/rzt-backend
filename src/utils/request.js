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
  timeout: 3000, // 请求超时时间
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
    config.method = 'post' // 默认请求post
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
    if (!res.code) {
      // if (res.error === 'ERROR_ACCESS_NEED_AUTH') {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // } else {
      Message.error(res.message || 'status 为200 但是code 不存在')
      // }
      return Promise.reject('error')
    } else {
      if (res.result === undefined || Object.keys(res.result).length === 0) {
        res.result = []
      }
      console.log('response ================>', res)
      return res
    }
  },
  error => {
    console.log('resp-error========>')
    console.dir(error.response)
    // data存在
    if (error.response) {
      Message.error(`${error.response.status}:${error.response.data}`)
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
    }
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 7 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
