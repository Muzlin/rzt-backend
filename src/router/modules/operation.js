import Layout from '@/views/layout/Layout'

const operationRouter = [
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '运营管理',
      icon: 'international'
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: '/project/init-project',
        name: 'init-project',
        component: () => import('@/views/project/init-project'),
        meta: {
          title: '产品录入'
        }
      },
      {
        path: '/project/lwa',
        name: 'list-wait-audit',
        component: () => import('@/views/project/wait-audit'),
        meta: {
          title: '待提交列表'
        }
      },
      {
        path: '/project/laf',
        name: 'list-audit-first',
        component: () => import('@/views/project/audit-first'),
        meta: {
          title: '产品初审列表'
        }
      },
      {
        path: '/project/list-audit-risk',
        name: 'list-audit-risk',
        component: () => import('@/views/project/list-audit-risk'),
        meta: {
          title: '风控复审列表'
        }
      },
      {
        path: '/project/list-wait-release',
        name: 'list-wait-release',
        component: () => import('@/views/project/list-wait-release'),
        meta: {
          title: '待发布列表'
        }
      },
      {
        path: '/project/list-raise',
        name: 'list-raise',
        component: () => import('@/views/project/list-raise'),
        meta: {
          title: '募集中列表'
        }
      },
      {
        path: '/project/list-audit-finance',
        name: 'list-audit-finance',
        component: () => import('@/views/project/list-audit-finance'),
        meta: {
          title: '财务审核列表'
        }
      },
      {
        path: '/project/list-repaying',
        name: 'list-repaying',
        component: () => import('@/views/project/list-repaying'),
        meta: {
          title: '还款中列表'
        }
      },
      {
        path: '/project/list-repayed',
        name: 'list-repayed',
        component: () => import('@/views/project/list-repayed'),
        meta: {
          title: '已还款列表'
        }
      },
      {
        path: '/project/list-fail',
        name: 'list-fail',
        component: () => import('@/views/project/list-fail'),
        meta: {
          title: '已流标列表'
        }
      },
      {
        path: '/project/list-discard',
        name: 'list-discard',
        component: () => import('@/views/project/list-discard'),
        meta: {
          title: '已废弃列表'
        }
      },
      {
        path: '/project/hebao-setting',
        name: 'hebao-setting',
        component: () => import('@/views/project/hebao-setting'),
        meta: {
          title: '和宝业务设置'
        }
      },
      {
        path: '/project/early-repay-setting',
        name: 'early-repay-setting',
        component: () => import('@/views/project/early-repay-setting'),
        meta: {
          title: '提前还款设置'
        }
      }
    ]
  }
]
export default operationRouter
