/**
 * 权限指令
 */

import hasPermission from './has-permission'

const install = function (Vue) {
  Vue.directive('hasPermission', hasPermission)
}

if (window.Vue) {
  window.hasPermission = hasPermission
  Vue.use(install); // eslint-disable-line
}

hasPermission.install = install

export default hasPermission
