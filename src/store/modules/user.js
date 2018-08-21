import {
  loginByUsername,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  getMenuList
} from '@/api/system-management'
import {
  MessageBox
} from 'element-ui'

const user = {
  state: {
    token: getToken(),
    avatar: '',
    menus: []
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
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(result => {
          commit('SET_TOKEN', result.token)
          setToken(result.token)
          resolve()
        }).catch(error => {
          // TODO:失败写入token 信息 绕过登录验证
          commit('SET_TOKEN', 'dsadsad')
          setToken('dsahdjkh')
          reject(error)
        })
      })
    },

    // 获取用户菜单信息
    GetUserMenus({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList().then(data => {
          if (data.result.length === 0) {
            MessageBox.confirm('你当前暂无权限，可以取消继续留在该页面，或者退出', '确定登出', {
              confirmButtonText: '退出',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.FedLogOut.then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            })
          } else {
            // 设置拥有的菜单
            commit('SET_MENUS', data.result)
          }
          resolve(data.result)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit
    }, role) {
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
