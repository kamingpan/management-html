// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'font-awesome/css/font-awesome.min.css' // font-awesome

import ElementUI from 'element-ui'
import './styles/element-variables.scss'

import 'photoviewer/dist/photoviewer.css' // photoviewer

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import vueBus from '@/utils/vue-bus'
import defaultSettings from '@/settings'

import './icons' // icon
import i18n from './lang' // Internationalization

// directive
import waves from '@/directive/waves' // Waves directive
import hasPermission from '@/directive/has-permission' // Has Permission directive

import * as filters from './filters' // global filters

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(waves)
Vue.use(vueBus)
Vue.use(hasPermission)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$pageSizes = defaultSettings.pageSizes
Vue.prototype.$serverRoot = defaultSettings.serverRoot

Vue.config.productionTip = false

// 缓存路由到store中
store.dispatch('user/SetRoutes', router.options.routes)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
