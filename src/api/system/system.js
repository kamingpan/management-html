import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询当前操作员
 */
export function getOperator() {
  return request({
    url: settings.serverRoot + '/operator',
    method: 'get'
  })
}

/**
 * 查询系统信息
 */
export function getSystemInformation() {
  return request({
    url: settings.serverRoot + '/system/information',
    method: 'get'
  })
}

/**
 * 查询当前登录用户拥有的模块
 */
export function getModules() {
  return request({
    url: settings.serverRoot + '/system/module',
    method: 'get'
  })
}

/**
 * 查询当前登录用户拥有的权限
 */
export function getPermissions() {
  return request({
    url: settings.serverRoot + '/system/permission',
    method: 'get'
  })
}

/**
 * 查询当前用户拥有的路由
 */
export function getRouters() {
  return request({
    url: settings.serverRoot + '/system/router',
    method: 'get'
  })
}

/**
 * 根据参数查询数据字典
 * @param parameter 参数
 */
export function getDataDictionaries(parameter) {
  return request({
    url: settings.serverRoot + '/system/data-dictionary',
    method: 'get',
    params: parameter,
    data: {}
  })
}

/**
 * 根据参数查找操作日志
 * @param parameter 参数
 */
export function getOperateLogs(parameter) {
  return request({
    url: settings.serverRoot + '/system/operate-log',
    method: 'get',
    params: parameter,
    data: {}
  })
}
