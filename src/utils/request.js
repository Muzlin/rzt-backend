import md5 from 'blueimp-md5'
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
import {
  isString
} from 'util'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的 base_url
  timeout: 5000, // 请求超时时间
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

/**
 * 参数加签
 * @param {*} privateKey
 * @param {*} timestamp
 * @param {*} data
 */
function getSign(privateKey, timestamp, data) {
  //
  privateKey = privateKey || '52c4e3cd792eb21e38e309166da66a05'
  // 非string 转换string
  if (!isString(data)) {
    data = JSON.stringify(data)
  }
  // 转换data为 string 去除\r \n 以及带长度空字符串
  data = data.replace(/\s+/g, '').replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '')
  const dataStrByUrl = encodeURIComponent(data)
  // 加签 私钥+时间戳+请求文本  以md5方式进行加密
  return md5(privateKey + timestamp + dataStrByUrl)
}

// request拦截器
service.interceptors.request.use(config => {
  config.method = 'post' // 默认请求post
  // 添加API header
  const timestamp = new Date().getTime().toString() // 当前时间戳
  config.headers['mid'] = '2905c8ff-32ff-4023-915a-bec0bf93d8cc' // 开发者证书
  config.headers['timestamp'] = timestamp // 时间错
  config.headers['sign'] = getSign('', timestamp, config.data || 'no data') // 签名
  // 如果为空data 加一个非空字符
  if (!config.data) {
    config.data = 'no data'
  }
  if (store.getters.token) {
    config.headers['token'] = getToken() // 请求携带自定义token
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
    console.log('resp-response=========>', response)
    const res = response.data
    if (res.code !== '0') {
      // 失败
      Message.error(`${res.code}:${res.message}`)
      return Promise.reject('error')
    } else {
      // 成功
      if (res.result === undefined || Object.keys(res.result).length === 0) {
        res.result = []
      }
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('resp-error========>')
    console.dir(error)
    const response = error.response
    // 存在响应
    if (response) {
      // token失效
      if (response.status === 403 && response.data.code === '10003') {
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
        Message.error(`${response.status}:${response.data.message || response.statusText}`)
      }
    } else {
      // 请求超时
      if (error.code === 'ECONNABORTED') {
        Message({
          message: '请求超时',
          type: 'error',
          duration: 7 * 1000
        })
      } else {
        Message.error(`${error.response.status}:${error.response.statusText}`)
      }
    }
    return Promise.reject(error)
  }
)

export default service
