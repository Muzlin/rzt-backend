import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// import capital from './modules/capital'
// import distribution from './modules/distribution'
// import operation from './modules/operation'
// import provider from './modules/provider'
// import user from './modules/user'
import system from './modules/system.js'
import business from './modules/business'
export const asyncRouterMap = [
  ...system,
  ...business,
  // ...user,
  // ...capital,
  // ...operation,
  // ...distribution,
  // ...provider,

  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]
