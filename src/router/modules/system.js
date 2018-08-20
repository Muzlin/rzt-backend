/**
 * 系统管理路由配置
 */
import Layout from '@/views/layout/Layout'

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
  children: [
    {
      path: 'setting',
      redirect: '/sys/setting/organization',
      component: () => import('@/views/system'),
      meta: {
        title: '系统设置'
        // roles: ['admin', 'editor'] // you can set roles in root nav
      },
      children: [
        {
          path: 'organization',
          name: 'sys-setting-organization',
          component: () => import('@/views/system/setting/organization'),
          meta: {
            title: '组织机构管理'
          }
        },
        {
          path: 'role',
          name: 'sys-setting-role',
          component: () => import('@/views/system/setting/role'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: 'action',
          name: 'sys-setting-action',
          component: () => import('@/views/system/setting/action'),
          meta: {
            title: '功能管理'
          }
        },
        {
          path: 'menu',
          name: 'sys-setting-menu',
          component: () => import('@/views/system/setting/menu'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: 'user',
          name: 'sys-setting-user',
          component: () => import('@/views/system/setting/user'),
          meta: {
            title: '用户管理'
          }
        }
      ]
    }
  ]
}]

export default systemRouter
