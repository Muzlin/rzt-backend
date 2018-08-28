import request from '@/utils/request'

/**
 * 登录
 * @param {*} payload
 */
export function login(payload) {
  return request({
    url: '/sys/set/userLogin',
    data: payload
  })
}

/**
 * 刷新登录
 * @param {*} payload
 */
export function refLogin(payload) {
  return request({
    url: '/sys/set/userRefreshLogin',
    data: payload
  })
}
