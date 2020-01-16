/**
 * 管理员登录日志
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询管理员登录日志列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getAdminLoginLogs(parameter, pager) {
  return request({
    url: settings.serverRoot + '/admin-login-log',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询管理员登录日志详情
 * @param id 主键
 */
export function getAdminLoginLog(id) {
  return request({
    url: settings.serverRoot + '/admin-login-log/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 导出管理员登录日志列表
 * @param parameter 查询参数
 */
export function exportAdminLoginLogs(parameter) {
  return request({
    url: settings.serverRoot + '/admin-login-log/export',
    method: 'get',
    params: parameter,
    responseType: 'blob' // 表明服务器返回的数据类型
  })
}

/**
 * 查询最后10次的管理员登录日志
 */
export function getLastAdminLoginLog() {
  return request({
    url: settings.serverRoot + '/admin-login-log/last',
    method: 'get'
  })
}

/**
 * 查询最后一个月的管理员登录日志
 */
export function getLastMonthLoginLog() {
  return request({
    url: settings.serverRoot + '/admin-login-log/last-month',
    method: 'get'
  })
}
