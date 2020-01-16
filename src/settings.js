import variables from '@/styles/element-variables.scss'

export default {
  /**
   * @type {string}
   * @description 请求接口地址
   */
  serverRoot: document.location.protocol !== 'https:' ? process.env.VUE_APP_BASE_SERVER_URL
    : process.env.VUE_APP_BASE_SERVER_URL.replace('http://', 'https://'),

  /**
   * @type {array}
   * @description 分页行数列表
   */
  pageSizes: [1, 5, 10, 20, 50, 100, 200, 500],

  theme: variables.theme,

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false
}
