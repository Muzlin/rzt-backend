import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    currentMenuId: '',
    currentMenuFuncList: [],
    menuRunFuncList: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_CURRENT_MENU_ID: (state, currentMenuId) => {
      state.currentMenuId = currentMenuId
    },
    SET_CURRENT_MENU_FUNC: (state, currentMenuFuncList) => {
      state.currentMenuFuncList = currentMenuFuncList
    },
    SET_MENU_RUN_FUNC: (state, menuRunFuncList) => {
      state.menuRunFuncList = menuRunFuncList
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    // 设置当前菜单ID
    setCurrentMenuId({ commit }, currentMenuId) {
      commit('SET_CURRENT_MENU_ID', currentMenuId)
    },
    // 设置当前菜单运行时功能
    setCurrentMenuFuncList({ commit }, currentMenuFuncList) {
      commit('SET_CURRENT_MENU_FUNC', currentMenuFuncList)
    },
    // 设置所有的菜单运行时功能
    setMenuRunFuncList({ commit }, menuRunFuncList) {
      commit('SET_MENU_RUN_FUNC', menuRunFuncList)
    }
  }
}

export default app
