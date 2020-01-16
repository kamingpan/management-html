import store from '@/store'

export default {
  inserted(element, binding, vNode) {
    delay(element, binding, vNode)

    /* const {value} = binding

     // 从store中获取权限列表
     const permissions = store.state.user && store.state.user.permissions

     // 判断是否传入权限或者权限列表
     if (value && value instanceof Array && value.length > 0) {
     const needPermissions = value

     const hasPermission = permissions.some(permission => {
     return needPermissions.includes(permission)
     })

     if (!hasPermission) {
     element.parentNode && element.parentNode.removeChild(element)
     }
     } else if (value && (typeof value === 'string' && value.constructor === String) && value !== '') {
     if (!permissions.includes(value)) {
     // element.parentNode && element.parentNode.removeChild(element)
     element && element.remove()
     }
     } else {
     throw new Error(`need permissions! Like v-permission="['permission','permission1']"`)
     } */
  }
}

/**
 * 使用递归延迟加载，保证先获取到权限列表，再执行指令
 *
 * @param element
 * @param binding
 * @param vNode
 */
function delay(element, binding, vNode) {
  setTimeout(() => {
    const { value } = binding

    // 从store中获取权限列表
    const permissions = store.state.user && store.state.user.permissions

    if (!permissions || permissions.length <= 0) {
      delay(element, binding, vNode)
      return
    }

    // 判断是否传入权限或者权限列表
    if (value && value instanceof Array && value.length > 0) {
      const needPermissions = value

      const hasPermission = permissions.some(permission => {
        return needPermissions.includes(permission)
      })

      if (!hasPermission) {
        // element.parentNode && element.parentNode.removeChild(element)
        element && element.remove()
      }
    } else if (value && (typeof value === 'string' && value.constructor === String) && value !== '') {
      if (!permissions.includes(value)) {
        // element.parentNode && element.parentNode.removeChild(element)
        element && element.remove()
      }
    } else {
      throw new Error(`need permissions! Like v-permission="['permission','permission1']"`)
    }
  }, 100)
}
