import request from '@/utils/request'

/** 用户 */
export function getUserList(payload) {
  return request({
    url: '/auth/sysUser/index',
    method: 'post',
    data: payload || { page: 0, size: 1000 }
  })
}

export function addUser(payload) {
  return request({
    url: '/auth/sysUser/create',
    method: 'post',
    data: payload
  })
}

export function editUser(payload) {
  return request({
    url: '/auth/sysUser/edit',
    method: 'post',
    data: payload
  })
}

export function getUser(payload) {
  return request({
    url: '/auth/sysUser/view/',
    method: 'post',
    data: payload
  })
}

export function delUser(userId) {
  return request({
    url: '/auth/sysUser/delete/',
    method: 'post',
    data: userId
  })
}

/** 菜单 */

export function getMenuList() {
  return request({
    url: '/auth/sysMenu/viewAllMenuTree',
    method: 'post'
  })
}

export function getMenuInfo(menuId) {
  return request({
    url: '/auth/sysMenu/view/',
    method: 'post',
    data: menuId
  })
}

export function addMenu(payload) {
  return request({
    url: '/auth/sysMenu/create',
    method: 'post',
    data: payload
  })
}

export function delMenu(nodeId) {
  return request({
    url: '/auth/sysMenu/delete/',
    method: 'post',
    data: nodeId
  })
}

/** 角色 */

export function getRoleList(payload) {
  return request({
    url: '/auth/sysRole/index',
    method: 'post',
    data: payload || { page: 0, size: 1000 }
  })
}

export function addRole(payload) {
  return request({
    url: '/auth/sysRole/create',
    method: 'post',
    data: payload
  })
}

export function getRole(roleId) {
  return request({
    url: '/auth/sysRole/view/',
    method: 'post',
    data: roleId
  })
}

export function editRole(payload) {
  return request({
    url: '/auth/sysRole/edit',
    method: 'post',
    data: payload
  })
}

export function delRole(roleId) {
  return request({
    url: '/auth/sysRole/delete/',
    method: 'post',
    data: roleId
  })
}
