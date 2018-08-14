import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    clientName: 'backend',
    clientSecret: 'hzg-dev',
    loginName: username,
    password

  }
  return request({
    url: '/security/token',
    method: 'post',
    params: data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
