import { login } from '@/api/login'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { getMenuList } from '@/api/system/setting'

const user = {
  state: {
    token: getToken(),
    avatar: '',
    menus: [],
    userInfo: getUserInfo()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    Login({ commit }, userInfo) {
      // 去除登录账号的空格
      userInfo.loginName = userInfo.loginName.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(data => {
          // 设置token到 cookie
          commit('SET_TOKEN', data.result.token)
          setToken(data.result.token)
          // 设置用户信息到 cookie
          commit('SET_USER_INFO', data.result.user)
          setUserInfo(data.result.user)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户菜单信息
    GetUserMenus({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList().then(data => {
          // 设置拥有的菜单
          commit('SET_MENUS', data.result)
          resolve(data.result)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', '')
        removeToken()
        removeUserInfo()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
