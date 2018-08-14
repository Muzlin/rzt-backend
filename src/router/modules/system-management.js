import Layout from '@/views/layout/Layout'

const systemRouter = [{
  path: '/sm',
  component: Layout,
  redirect: '/sm/setting',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统管理',
    icon: 'star'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'setting',
      redirect: '/sm/setting/m-organization',
      component: () => import('@/views/system-management/setting'),
      meta: {
        title: '系统设置'
        // roles: ['admin', 'editor'] // you can set roles in root nav
      },
      children: [
        {
          path: 'm-organization',
          name: 'sys-manage-organization',
          component: () => import('@/views/system-management/setting/manage-organization'),
          meta: {
            title: '组织机构管理'
          }
        },
        {
          path: 'm-role',
          name: 'sys-manage-role',
          component: () => import('@/views/system-management/setting/manage-role'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: 'm-action',
          name: 'sys-manage-action',
          component: () => import('@/views/system-management/setting/manage-action'),
          meta: {
            title: '功能管理'
          }
        },
        {
          path: 'm-menu',
          name: 'sys-manage-menu',
          component: () => import('@/views/system-management/setting/manage-menu'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: 'm-user',
          name: 'sys-manage-user',
          component: () => import('@/views/system-management/setting/manage-user'),
          meta: {
            title: '用户管理'
          }
        }
      ]
    }
  ]
}]

export default systemRouter
