import request from '@/utils/request'

// #region 功能相关

/**
 * 分页获取功能列表
 *
 * @export
 * @param {*} payload {pageNum,pageSize}
 * @returns
 */
export function getFuncPage(payload) {
  return request({
    url: '/sys/funcListPage',
    method: 'post',
    data: payload
  })
}

/**
 * 获取所有功能
 *
 * @export
 * @param {*} payload {pageNum,pageSize}
 * @returns
 */
export function getFuncAll(payload) {
  return request({
    url: '/sys/funcList',
    method: 'post',
    data: payload
  })
}

/**
 * 获取功能详情
 *
 * @export
 * @param {*} id
 * @returns
 */
export function getFunc(payload) {
  return request({
    url: '/sys/funcInfo',
    method: 'post',
    data: payload
  })
}

/**
 * 新增功能
 *
 * @export
 * @param {*} payload
 */
export function addFunc(payload) {
  return request({
    url: '/sys/funcAdd',
    method: 'post',
    data: payload
  })
}

/**
 * 修改功能
 *
 * @export
 * @param {*} payload
 */
export function editFunc(payload) {
  return request({
    url: '/sys/funcEdit',
    method: 'post',
    data: payload
  })
}

/**
 * 删除功能
 *
 * @export
 * @param {*} payload
 */
export function delFunc(payload) {
  return request({
    url: '/sys/funcDel',
    method: 'post',
    data: payload
  })
}

// #endregion

// #region 菜单相关

/**
 * 获取菜单信息
 *
 * @export
 * @returns
 */
export function getMenu(payload) {
  return request({
    url: '/sys/menInfo',
    method: 'post',
    data: payload
  })
}

/**
 * 添加菜单
 *
 * @export
 * @returns
 */
export function addMenu(payload) {
  return request({
    url: '/sys/menuAdd',
    method: 'post',
    data: payload
  })
}

/**
 * 删除菜单
 *
 * @export
 * @returns
 */
export function delMenu(payload) {
  return request({
    url: '/sys/menuDel',
    method: 'post',
    data: payload
  })
}

/**
 * 修改菜单
 *
 * @export
 * @returns
 */
export function editMenu(payload) {
  return request({
    url: '/sys/menuEdit',
    method: 'post',
    data: payload
  })
}

/**
 * 获取所有菜单树
 *
 * @export
 * @returns
 */
export function getMenuList() {
  return request({
    url: '/sys/menuList'
  })
}

/**
 * 获取菜单已经分配的功能
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function getMenuActionList(payload) {
  return request({
    url: '/sys/runFuncList',
    method: 'post',
    data: payload
  })
}

// #endregion

// #region 角色相关

/**
 * 新增角色
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function addRole(payload) {
  return request({
    url: '/sys/roleAdd',
    data: payload
  })
}

/**
 * 删除角色
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function delRole(payload) {
  return request({
    url: '/sys/roleDel',
    data: payload
  })
}

/**
 * 修改角色
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function editRole(payload) {
  return request({
    url: '/sys/roleEdit',
    data: payload
  })
}

/**
 * 获取角色信息
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function getRole(payload) {
  return request({
    url: '/sys/roleInfo',
    data: payload
  })
}

/**
 * 获取角色列表
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function getRoleList(payload) {
  return request({
    url: '/sys/roleList',
    data: payload || { pageNum: '1', pageSize: '1000' }
  })
}

// #endregion

// #region 用户相关

// #endregion

// #region 组织机构相关

/**
 * 添加机构
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function addOrganization(payload) {
  return request({
    url: '/sys/organizationAdd',
    data: payload
  })
}

/**
 * 删除机构
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function delOrganization(payload) {
  return request({
    url: '/sys/organizationDel',
    data: payload
  })
}

/**
 * 修改机构
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function editOrganization(payload) {
  return request({
    url: '/sys/organizationEdit',
    data: payload
  })
}

/**
 * 获取机构信息
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function getOrganization(payload) {
  return request({
    url: '/sys/organizationInfo',
    data: payload
  })
}

/**
 * 获取机构树形列表
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function getOrganizationList(payload) {
  return request({
    url: '/sys/organizationList',
    data: payload
  })
}

// #endregion

// #region 岗位相关

/**
 * 新增岗位
 *
 * @export
 * @param {*} payload
 */
export function addJob(payload) {
  return request({
    url: '/sys/jobAdd',
    data: payload
  })
}

/**
 * 删除岗位
 *
 * @export
 * @param {*} payload
 */
export function delJob(payload) {
  return request({
    url: '/sys/jobDel',
    data: payload
  })
}

/**
 * 修改岗位
 *
 * @export
 * @param {*} payload
 */
export function editJob(payload) {
  return request({
    url: '/sys/jobEdit',
    data: payload
  })
}

/**
 * 获取岗位信息
 *
 * @export
 * @param {*} payload
 */
export function getJob(payload) {
  return request({
    url: '/sys/jobInfo',
    data: payload
  })
}

/**
 * 获取机构下的岗位列表
 *
 * @export
 * @param {*} payload
 */
export function getJobListByOrgId(payload) {
  return request({
    url: '/sys/jobList',
    data: payload
  })
}

/**
 * 获取岗位下的角色列表
 *
 * @export
 * @param {*} payload
 */
export function getRoleListByJobId(payload) {
  return request({
    url: '/sys/jobRoleList',
    data: payload
  })
}

// #endregion

// #region 分配相关

/**
 * 分配岗位角色
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function distrJobRoles(payload) {
  return request({
    url: '/sys/jobRoleAllot',
    data: payload
  })
}

/**
 * 分配菜单运行功能
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function distrMenuActions(payload) {
  return request({
    url: '/sys/runFuncAllot',
    data: payload
  })
}

/**
 * 分配角色功能
 *
 * @export
 * @param {*} payload
 * @returns
 */
export function distrRoleActions(payload) {
  return request({
    url: '/sys/roleFuncAllot',
    data: payload
  })
}

// #endregion
