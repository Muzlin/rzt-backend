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
  const menusStr = JSON.stringify(menus)
  // filter 过滤器返回一个新的数组
  const accessedRouters = asyncRouterMap.filter(route => {
    // 通过title匹配
    if (menusStr.indexOf(route.meta.title) >= 0) {
      // 父级匹配到 则继续匹配子级
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
      }
      return true
    }
    return false
  })
  return accessedRouters
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
