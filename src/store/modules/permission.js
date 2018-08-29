import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 异步路由表
 * @param menus 用户已拥有的菜单
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  // filter 过滤器返回一个新的数组
  const accessedRouters = asyncRouterMap.filter(route => {
    let menuId = ''
    hasPermission(menus, route.meta.title, id => {
      menuId = id
    })
    if (menuId) {
      route.meta.id = menuId
      // 匹配儿子
      if (route.children && route.children.length > 0) {
        filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 匹配是否具有权限 利用回调函数返回菜单ID
 * @param {*} menus
 * @param {*} title
 * @param {*} callback 回调函数
 */
function hasPermission(menus, title, callback) {
  for (var i in menus) {
    if (menus[i].title === title) {
      callback(menus[i].id)
      break
    } else {
      hasPermission(menus[i].children, title, callback)
    }
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 根据菜单列表生成可访问的路由表
    GenerateRoutes({
      commit,
      rootState
    }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, data)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
