import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // getToken from cookie

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/authredirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // 顶部进度条开始
  // 判断是否有token
  if (getToken()) {
    // token 存在不允许重定向到login
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 访问其他页面 判断是否拉取拥有的菜单列表
      if (store.getters.menus.length === 0) {
        // 如果没有拉取菜单 则拉取所拥有的菜单列表
        store.dispatch('GetUserMenus').then(data => {
          // 根据已有的菜单列表生成可访问的路由表
          store.dispatch('GenerateRoutes', data).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to,
              replace: true
            })
          }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || '权限获取失败,请重新登录')
              next({
                path: '/'
              })
            })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
