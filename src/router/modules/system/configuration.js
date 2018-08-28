const configuration = [
  {
    path: 'configuration',
    redirect: '/sys/configuration/info',
    component: () => import('@/views/system'),
    alwaysShow: true,
    meta: {
      title: '配置管理'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'info',
        name: 'sys-configuration-info',
        component: () => import('@/views/system/configuration/info'),
        meta: {
          title: '信息管理'
        }
      },
      {
        path: 'type',
        name: 'sys-configuration-type',
        component: () => import('@/views/system/configuration/type'),
        meta: {
          title: '类型管理'
        }
      }
    ]
  }
]

export default configuration
