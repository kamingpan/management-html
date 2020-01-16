const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  user: state => state.user.info,
  systemInformation: state => state.user.systemInformation,
  modules: state => state.user.modules,
  permissions: state => state.user.permissions,
  routers: state => state.user.routers
}

export default getters
