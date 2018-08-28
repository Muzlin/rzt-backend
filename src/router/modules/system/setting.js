const settingRouter = [
  {
    path: 'setting',
    redirect: '/sys/setting/organization',
    component: () => import('@/views/system'),
    meta: {
      title: '系统设置'
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
export default settingRouter
