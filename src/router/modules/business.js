import Layout from '@/views/layout/Layout'

const businessRouter = [
  {
    path: '/business',
    component: Layout,
    redirect: 'entry',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '标的管理',
      icon: 'clipboard'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'entry',
        name: 'business-entry',
        component: () => import('@/views/business/entry'),
        meta: {
          title: '产品录入'
        }
      }
    ]
  }
]
export default businessRouter
