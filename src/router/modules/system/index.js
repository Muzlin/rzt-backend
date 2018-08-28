/**
 * 系统管理路由配置
 */
import Layout from '@/views/layout/Layout'

// 系统设置
import setting from './setting'
// 配置信息管理
import configuration from './configuration'

const systemRouter = [{
  path: '/sys',
  component: Layout,
  redirect: '/sys/setting',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统管理',
    icon: 'star'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [...setting, ...configuration]
}]

export default systemRouter
