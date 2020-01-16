import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

/**
 * 定义输出异步路由列表
 * @type {Array}
 */
export const constantRouters = [
  {
    name: 'home',
    path: '',
    component: Home,
    redirect: 'index'
  },
  {
    path: '',
    component: Home,
    children: [{
      name: 'index',
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: 'index', affix: true
      }
    }]
  },
  {
    path: '/iframe',
    component: Home,
    redirect: '/iframe/:id', // you can set roles in root nav
    children: [{
      name: 'Iframe',
      path: ':id',
      // component: () => import('@/views/iframe/index'),
      component: resolve => require(['@/views/iframe/index'], resolve), // 懒加载模式
      meta: {
        title: 'iframe'
      }
    }]
  },
  {
    path: '/redirect',
    component: Home,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index')
  }
]

const errorRouters = [
  {
    path: '*',
    component: Home,
    hidden: true,
    children: [
      {
        name: 'error404',
        path: '',
        component: () => import('@/views/error/404'),
        hidden: true,
        meta: {
          title: 'error404'
        }
      }
    ]
  }
]

const asyncRouters = [
  {
    name: 'admin',
    path: '/admin',
    component: Home,
    redirect: '/admin/list',
    meta: {
      title: 'admin'
    },
    children: [
      {
        name: 'adminList',
        path: 'list',
        // component: () => import('@/views/system/admin/AdminList'),
        component: resolve => require(['@/views/system/admin/AdminList'], resolve), // 懒加载模式
        meta: {
          title: 'adminList'
        }
      },
      {
        name: 'adminInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/admin/AdminInfo'),
        component: resolve => require(['@/views/system/admin/AdminInfo'], resolve), // 懒加载模式
        meta: {
          title: 'adminInfo'
        }
      },
      {
        name: 'adminAdd',
        path: 'add',
        // component: () => import('@/views/system/admin/AdminAdd'),
        component: resolve => require(['@/views/system/admin/AdminAdd'], resolve), // 懒加载模式
        meta: {
          title: 'adminAdd'
        }
      },
      {
        name: 'adminEdit',
        path: 'edit/:id',
        // component: () => import('@/views/system/admin/AdminEdit'),
        component: resolve => require(['@/views/system/admin/AdminEdit'], resolve), // 懒加载模式
        meta: {
          title: 'adminEdit'
        }
      }
    ]
  },
  {
    name: 'adminLoginLog',
    path: '/admin-login-log',
    component: Home,
    redirect: '/admin-login-log/list',
    meta: {
      title: 'adminLoginLog'
    },
    children: [
      {
        name: 'adminLoginLogList',
        path: 'list',
        // component: () => import('@/views/system/admin-login-log/AdminLoginLogList'),
        component: resolve => require(['@/views/system/admin-login-log/AdminLoginLogList'], resolve), // 懒加载模式
        meta: {
          title: 'adminLoginLogList'
        }
      }
    ]
  },
  {
    name: 'role',
    path: '/role',
    component: Home,
    redirect: '/role/list',
    meta: {
      title: 'role'
    },
    children: [
      {
        name: 'roleList',
        path: 'list',
        // component: () => import('@/views/system/role/RoleList'),
        component: resolve => require(['@/views/system/role/RoleList'], resolve), // 懒加载模式
        title: 'roleList',
        meta: {
          title: 'roleList'
        }
      },
      {
        name: 'roleInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/role/RoleInfo'),
        component: resolve => require(['@/views/system/role/RoleInfo'], resolve), // 懒加载模式
        meta: {
          title: 'roleInfo'
        }
      },
      {
        name: 'roleAdd',
        path: 'add',
        // component: () => import('@/views/system/role/RoleAdd'),
        component: resolve => require(['@/views/system/role/RoleAdd'], resolve), // 懒加载模式
        meta: {
          title: 'roleAdd'
        }
      },
      {
        name: 'roleEdit',
        path: 'edit/:id',
        // component: () => import('@/views/system/role/RoleEdit'),
        component: resolve => require(['@/views/system/role/RoleEdit'], resolve), // 懒加载模式
        meta: {
          title: 'roleEdit'
        }
      }
    ]
  },
  {
    name: 'permission',
    path: '/permission',
    component: Home,
    redirect: '/permission/list',
    meta: {
      title: 'permission'
    },
    children: [
      {
        name: 'permissionList',
        path: 'list',
        // component: () => import('@/views/system/permission/PermissionList'),
        component: resolve => require(['@/views/system/permission/PermissionList'], resolve), // 懒加载模式
        meta: {
          title: 'permissionList'
        }
      }
    ]
  },
  {
    name: 'module',
    path: '/module',
    component: Home,
    redirect: '/module/list',
    meta: {
      title: 'module'
    },
    children: [
      {
        name: 'moduleList',
        path: 'list',
        // component: () => import('@/views/system/module/ModuleList'),
        component: resolve => require(['@/views/system/module/ModuleList'], resolve), // 懒加载模式
        meta: {
          title: 'moduleList'
        }
      }
    ]
  },
  {
    name: 'registeredUser',
    path: '/registered-user',
    component: Home,
    redirect: '/registered-user/list',
    meta: {
      title: 'registeredUser'
    },
    children: [
      {
        name: 'registeredUserList',
        path: 'list',
        // component: () => import('@/views/system/registered-user/RegisteredUserList'),
        component: resolve => require(['@/views/system/registered-user/RegisteredUserList'], resolve), // 懒加载模式
        meta: {
          title: 'registeredUserList'
        }
      },
      {
        name: 'registeredUserInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/registered-user/RegisteredUserInfo'),
        component: resolve => require(['@/views/system/registered-user/RegisteredUserInfo'], resolve), // 懒加载模式
        meta: {
          title: 'registeredUserInfo'
        }
      }
    ]
  },
  {
    name: 'subscriptionUser',
    path: '/subscription-user',
    component: Home,
    redirect: '/subscription-user/list',
    meta: {
      title: 'subscriptionUser'
    },
    children: [
      {
        name: 'subscriptionUserList',
        path: 'list',
        // component: () => import('@/views/system/subscription-user/SubscriptionUserList'),
        component: resolve => require(['@/views/system/subscription-user/SubscriptionUserList'], resolve), // 懒加载模式
        meta: {
          title: 'subscriptionUserList'
        }
      },
      {
        name: 'subscriptionUserInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/subscription-user/SubscriptionUserInfo'),
        component: resolve => require(['@/views/system/subscription-user/SubscriptionUserInfo'], resolve), // 懒加载模式
        meta: {
          title: 'subscriptionUserInfo'
        }
      }
    ]
  },
  {
    name: 'miniProgramUser',
    path: '/mini-program-user',
    component: Home,
    redirect: '/mini-program-user/list',
    meta: {
      title: 'miniProgramUser'
    },
    children: [
      {
        name: 'miniProgramUserList',
        path: 'list',
        // component: () => import('@/views/system/mini-program-user/MiniProgramUserList'),
        component: resolve => require(['@/views/system/mini-program-user/MiniProgramUserList'], resolve), // 懒加载模式
        meta: {
          title: 'miniProgramUserList'
        }
      },
      {
        name: 'miniProgramUserInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/mini-program-user/MiniProgramUserInfo'),
        component: resolve => require(['@/views/system/mini-program-user/MiniProgramUserInfo'], resolve), // 懒加载模式
        meta: {
          title: 'miniProgramUserInfo'
        }
      }
    ]
  },
  {
    name: 'dataDictionary',
    path: '/data-dictionary',
    component: Home,
    redirect: '/data-dictionary/list',
    meta: {
      title: 'dataDictionary'
    },
    children: [
      {
        name: 'dataDictionaryList',
        path: 'list',
        // component: () => import('@/views/system/data-dictionary/DataDictionaryList'),
        component: resolve => require(['@/views/system/data-dictionary/DataDictionaryList'], resolve), // 懒加载模式
        meta: {
          title: 'dataDictionaryList'
        }
      },
      {
        name: 'dataDictionaryInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/data-dictionary/DataDictionaryInfo'),
        component: resolve => require(['@/views/system/data-dictionary/DataDictionaryInfo'], resolve), // 懒加载模式
        meta: {
          title: 'dataDictionaryInfo'
        }
      },
      {
        name: 'dataDictionaryAdd',
        path: 'add',
        // component: () => import('@/views/system/data-dictionary/DataDictionaryAdd'),
        component: resolve => require(['@/views/system/data-dictionary/DataDictionaryAdd'], resolve), // 懒加载模式
        meta: {
          title: 'dataDictionaryAdd'
        }
      },
      {
        name: 'dataDictionaryEdit',
        path: 'edit',
        // component: () => import('@/views/system/data-dictionary/DataDictionaryEdit'),
        component: resolve => require(['@/views/system/data-dictionary/DataDictionaryEdit'], resolve), // 懒加载模式
        meta: {
          title: 'dataDictionaryEdit'
        }
      }
    ]
  },
  {
    name: 'configuration',
    path: '/configuration',
    component: Home,
    redirect: '/configuration/list',
    meta: {
      title: 'configuration'
    },
    children: [
      {
        name: 'configurationList',
        path: 'list',
        // component: () => import('@/views/system/configuration/ConfigurationList'),
        component: resolve => require(['@/views/system/configuration/ConfigurationList'], resolve), // 懒加载模式
        meta: {
          title: 'configurationList'
        }
      },
      {
        name: 'configurationInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/configuration/ConfigurationInfo'),
        component: resolve => require(['@/views/system/configuration/ConfigurationInfo'], resolve), // 懒加载模式
        meta: {
          title: 'configurationInfo'
        }
      },
      {
        name: 'configurationAdd',
        path: 'add',
        // component: () => import('@/views/system/configuration/ConfigurationAdd'),
        component: resolve => require(['@/views/system/configuration/ConfigurationAdd'], resolve), // 懒加载模式
        meta: {
          title: 'configurationAdd'
        }
      },
      {
        name: 'configurationEdit',
        path: 'edit',
        // component: () => import('@/views/system/configuration/ConfigurationEdit'),
        component: resolve => require(['@/views/system/configuration/ConfigurationEdit'], resolve), // 懒加载模式
        meta: {
          title: 'configurationEdit'
        }
      }
    ]
  },
  {
    path: '/management-information',
    component: Home,
    children: [
      {
        name: 'managementInformation',
        path: '',
        // component: () => import('@/views/system/management-information/index'),
        component: resolve => require(['@/views/system/management-information/index'], resolve), // 懒加载模式
        meta: {
          title: 'managementInformation'
        }
      }
    ]
  },
  {
    path: '/personal-information',
    component: Home,
    children: [
      {
        name: 'operatorInformation',
        path: '',
        // component: () => import('@/views/system/operator/OperatorInformation'),
        component: resolve => require(['@/views/system/operator/OperatorInformation'], resolve), // 懒加载模式
        meta: {
          title: 'personalInformation'
        }
      }
    ]
  },
  {
    path: '/change-password',
    component: Home,
    children: [
      {
        name: 'changePassword',
        path: '',
        // component: () => import('@/views/system/operator/ChangePassword'),
        component: resolve => require(['@/views/system/operator/ChangePassword'], resolve), // 懒加载模式
        meta: {
          title: 'changePassword'
        }
      }
    ]
  },
  {
    name: 'oauthClient',
    path: '/oauth-client',
    component: Home,
    redirect: '/oauth-client/list',
    meta: {
      title: 'oauthClient'
    },
    children: [
      {
        name: 'oauthClientList',
        path: 'list',
        // component: () => import('@/views/system/oauth-client/OauthClientList'),
        component: resolve => require(['@/views/system/oauth-client/OauthClientList'], resolve), // 懒加载模式
        title: 'oauthClientList',
        meta: {
          title: 'oauthClientList'
        }
      },
      {
        name: 'oauthClientInfo',
        path: 'info/:id',
        // component: () => import('@/views/system/oauth-client/OauthClientInfo'),
        component: resolve => require(['@/views/system/oauth-client/OauthClientInfo'], resolve), // 懒加载模式
        meta: {
          title: 'oauthClientInfo'
        }
      },
      {
        name: 'oauthClientAdd',
        path: 'add',
        // component: () => import('@/views/system/oauth-client/OauthClientAdd'),
        component: resolve => require(['@/views/system/oauth-client/OauthClientAdd'], resolve), // 懒加载模式
        meta: {
          title: 'oauthClientAdd'
        }
      },
      {
        name: 'oauthClientEdit',
        path: 'edit/:id',
        // component: () => import('@/views/system/oauth-client/OauthClientEdit'),
        component: resolve => require(['@/views/system/oauth-client/OauthClientEdit'], resolve), // 懒加载模式
        meta: {
          title: 'oauthClientEdit'
        }
      }
    ]
  },
  {
    name: 'demo',
    path: '/demo',
    component: Home,
    redirect: '/demo/list',
    meta: {
      title: 'demo'
    },
    children: [
      {
        name: 'demoList',
        path: 'list',
        // component: () => import('@/views/business/demo/DemoList'),
        component: resolve => require(['@/views/business/demo/DemoList'], resolve), // 懒加载模式
        meta: {
          title: 'demoList'
        }
      },
      {
        name: 'demoInfo',
        path: 'info/:id',
        // component: () => import('@/views/business/demo/DemoInfo'),
        component: resolve => require(['@/views/business/demo/DemoInfo'], resolve), // 懒加载模式
        meta: {
          title: 'demoInfo'
        }
      },
      {
        name: 'demoAdd',
        path: 'add',
        // component: () => import('@/views/business/demo/DemoAdd'),
        component: resolve => require(['@/views/business/demo/DemoAdd'], resolve), // 懒加载模式
        meta: {
          title: 'demoAdd'
        }
      },
      {
        name: 'demoEdit',
        path: 'edit/:id',
        // component: () => import('@/views/business/demo/DemoEdit'),
        component: resolve => require(['@/views/business/demo/DemoEdit'], resolve), // 懒加载模式
        meta: {
          title: 'demoEdit'
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters.concat(asyncRouters).concat(errorRouters)
})
