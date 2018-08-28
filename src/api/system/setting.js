/**
 * 系统管理-系统设置API
 */
import request from '@/utils/request'

// #region 功能相关

/**
 * 分页获取功能列表
 *
 * @export
 * @param {*} payload {num,size}
 * @returns
 */
export function getFuncPage(payload) {
  return request({
    url: '/sys/set/funcListPage',
    method: 'post',
    data: payload
  })
}

/**
 * 获取所有功能
 *
 * @export
 * @param {*} payload {num,size}
 * @returns
 */
export function getFuncAll(payload) {
  return request({
    url: '/sys/set/funcList',
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
    url: '/sys/set/funcInfo',
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
    url: '/sys/set/funcAdd',
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
    url: '/sys/set/funcEdit',
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
    url: '/sys/set/funcDel',
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
    url: '/sys/set/menInfo',
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
    url: '/sys/set/menuAdd',
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
    url: '/sys/set/menuDel',
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
    url: '/sys/set/menuEdit',
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
    url: '/sys/set/menuList'
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
    url: '/sys/set/menuFuncList',
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
    url: '/sys/set/roleAdd',
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
    url: '/sys/set/roleDel',
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
    url: '/sys/set/roleEdit',
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
    url: '/sys/set/roleInfo',
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
    url: '/sys/set/roleList',
    data: payload || {
      num: '1',
      size: '1000'
    }
  })
}

/**
 * 获取角色拥有的权限(功能)
 * @param {*} payload
 */
export function getRoleFuncList(payload) {
  return request({
    url: '/sys/set/roleFuncList',
    data: payload
  })
}

// #endregion

// #region 用户相关

/**
 * 新增用户
 * @param {*} payload
 */
export function addUser(payload) {
  return request({
    url: '/sys/set/userAdd',
    data: payload
  })
}

/**
 * 获取当前登录用户
 * @param {*} payload
 */
export function getCurrentUser(payload) {
  return request({
    url: '/sys/set/userCurrentInfo',
    data: payload
  })
}

/**
 * 删除用户
 * @param {*} payload
 */
export function delUser(payload) {
  return request({
    url: '/sys/set/userDel',
    data: payload
  })
}

/**
 * 修改用户
 * @param {*} payload
 */
export function editUser(payload) {
  return request({
    url: '/sys/set/userEdit',
    data: payload
  })
}

/**
 * 修改用户密码
 * @param {*} payload
 */
export function editUserPwd(payload) {
  return request({
    url: '/sys/set/userEditPwd',
    data: payload
  })
}

/**
 * 获取用户
 * @param {*} payload
 */
export function getUser(payload) {
  return request({
    url: '/sys/set/userInfo',
    data: payload
  })
}

/**
 * 分页获取用户
 * @param {*} payload
 */
export function getUserPage(payload) {
  return request({
    url: '/sys/set/userListByPage',
    data: payload
  })
}

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
    url: '/sys/set/organizationAdd',
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
    url: '/sys/set/organizationDel',
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
    url: '/sys/set/organizationEdit',
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
    url: '/sys/set/organizationInfo',
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
    url: '/sys/set/organizationList',
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
    url: '/sys/set/jobAdd',
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
    url: '/sys/set/jobDel',
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
    url: '/sys/set/jobEdit',
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
    url: '/sys/set/jobInfo',
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
    url: '/sys/set/jobList',
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
    url: '/sys/set/jobRoleList',
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
    url: '/sys/set/jobRoleAllot',
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
    url: '/sys/set/menuFuncAllot',
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
    url: '/sys/set/roleFuncAllot',
    data: payload
  })
}

/**
 * 分配用户岗位
 * @param {*} payload
 */
export function distrUserJobs(payload) {
  return request({
    url: '/sys/set/userJobAllot',
    data: payload
  })
}

// #endregion

// #region 全局相关

/**
 * 更新缓存
 */
export function updateCache() {
  return request({
    url: '/sys/set/refreshRunFuncCache'
  })
}

// #endregion
