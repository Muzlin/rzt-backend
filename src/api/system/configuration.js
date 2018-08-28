/**
 * 系统管理-配置管理API
 */
import request from '@/utils/request'

// #region 配置信息相关

/**
 * 添加配置信息
 * @param {*} payload
 */
export function addAllocation(payload) {
  return request({
    url: '/sys/allocation/allocationAdd',
    data: payload
  })
}

/**
 * 删除配置信息
 * @param {*} payload
 */
export function delAllocation(payload) {
  return request({
    url: '/sys/allocation/allocationDel',
    data: payload
  })
}

/**
 * 修改配置信息
 * @param {*} payload
 */
export function editAllocation(payload) {
  return request({
    url: '/sys/allocation/allocationEdit',
    data: payload
  })
}

/**
 * 获取配置信息
 * @param {*} payload
 */
export function getAllocation(payload) {
  return request({
    url: '/sys/allocation/allocationInfo',
    data: payload
  })
}

/**
 * 分页获取配置信息
 * @param {*} payload
 */
export function getAllocationPage(payload) {
  return request({
    url: '/sys/allocation/allocationListByPage',
    data: payload
  })
}

// #endregion

// #region 配置类型相关

/**
 * 添加配置类型
 * @param {*} payload
 */
export function addAllocationType(payload) {
  return request({
    url: '/sys/allocation/allocationTypeAdd',
    data: payload
  })
}

/**
 * 删除配置类型
 * @param {*} payload
 */
export function delAllocationType(payload) {
  return request({
    url: '/sys/allocation/allocationTypeDel',
    data: payload
  })
}

/**
 * 修改配置类型
 * @param {*} payload
 */
export function editAllocationType(payload) {
  return request({
    url: '/sys/allocation/allocationTypeEdit',
    data: payload
  })
}

/**
 * 获取配置类型
 * @param {*} payload
 */
export function getAllocationType(payload) {
  return request({
    url: '/sys/allocation/allocationTypeInfo',
    data: payload
  })
}

/**
 * 分页获取配置类型
 * @param {*} payload
 */
export function getAllocationTypePage(payload) {
  return request({
    url: '/sys/allocation/allocationTypeListByPage',
    data: payload
  })
}

/**
 * 获取所有配置类型
 * @param {*} payload
 */
export function getAllocationTypeAll(payload) {
  return request({
    url: '/sys/allocation/allocationTypeListByAll',
    data: payload
  })
}

// #endregion

// #region 配置类型KEY相关

/**
 * 添加配置类型KEY
 * @param {*} payload
 */
export function addAllocationTypeKey(payload) {
  return request({
    url: '/sys/allocation/allocationTypeKeyAdd',
    data: payload
  })
}

/**
 * 删除配置类型KEY
 * @param {*} payload
 */
export function delAllocationTypeKey(payload) {
  return request({
    url: '/sys/allocation/allocationTypeKeyDel',
    data: payload
  })
}

/**
 * 修改配置类型KEY
 * @param {*} payload
 */
export function editAllocationTypeKey(payload) {
  return request({
    url: '/sys/allocation/allocationTypeKeyEdit',
    data: payload
  })
}

/**
 * 获取配置类型KEY
 * @param {*} payload
 */
export function getAllocationTypeKey(payload) {
  return request({
    url: '/sys/allocation/allocationTypeKeyInfo',
    data: payload
  })
}

/**
 * 分页获取配置类型KEY
 * @param {*} payload
 */
export function getAllocationTypeKeyPage(payload) {
  return request({
    url: '/sys/allocation/allocationTypeKeyListByPage',
    data: payload
  })
}

// #endregion
