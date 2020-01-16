import {
  login, logout
} from '@/api/system/login'
import {
  getToken, setToken, removeToken
} from '@/utils/token'
import {
  getOperator, getModules, getPermissions, getSystemInformation
} from '@/api/system/system'

const state = {
  info: '',
  systemInformation: '',
  user: '',
  status: '',
  code: '',
  token: getToken(),
  modules: [],
  permissions: [],
  routers: []
}

const mutations = {
  SET_USER: (state, info) => {
    state.info = info
  },
  SET_SYSTEM_INFORMATION: (state, systemInformation) => {
    state.systemInformation = systemInformation
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MODULES: (state, modules) => {
    state.modules = modules
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ROUTERS: (state, routers) => {
    state.routers = routers
  }
}

const actions = {
  // 登录
  Login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user.username, user.password).then(data => {
        const token = data.token
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  Logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_USER', {})
        commit('SET_SYSTEM_INFORMATION', {})
        commit('SET_TOKEN', '')
        commit('SET_MODULES', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_ROUTERS', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取操作员信息
  GetOperator({ commit }) {
    return new Promise((resolve, reject) => {
      getOperator().then(data => {
        commit('SET_USER', data)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取系统信息
  GetSystemInformation({ commit }) {
    return new Promise((resolve, reject) => {
      getSystemInformation().then(data => {
        commit('SET_SYSTEM_INFORMATION', data)

        // 设置标题头
        document.getElementById('title').innerHTML = data.name

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户模块
  GetModules({ commit }) {
    return new Promise((resolve, reject) => {
      getModules().then(data => {
        const modules = data
        if (modules && modules.length > 0) {
          commit('SET_MODULES', modules)
        } else {
          reject(new Error('该用户没有相关的模块'))
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户权限
  GetPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      getPermissions().then(data => {
        const permissions = data
        if (permissions && permissions.length > 0) {
          commit('SET_PERMISSIONS', permissions)
        } else {
          reject(new Error('该用户没有相关的权限'))
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取路由模块
  SetRoutes({ commit }, routes) {
    return new Promise((resolve, reject) => {
      if (routes && routes.length > 0) {
        commit('SET_ROUTERS', routes)
      } else {
        reject(new Error('该用户没有相关的路由'))
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
