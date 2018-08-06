import Layout from '@/views/layout/Layout'

const systemRouter = [{
  path: '/system',
  component: Layout,
  redirect: '/system/index',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统管理',
    icon: 'star'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: '/system/mm',
      name: 'sys-manage-menu',
      component: () => import('@/views/system/manage-menu'),
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: '/system/mr',
      name: 'sys-manage-role',
      component: () => import('@/views/system/manage-role'),
      meta: {
        title: '角色管理'
      }
    },
    {
      path: '/system/mu',
      name: 'sys-manage-user',
      component: () => import('@/views/system/manage-user'),
      meta: {
        title: '用户管理'
      }
    }
  ]
}]

export default systemRouter
