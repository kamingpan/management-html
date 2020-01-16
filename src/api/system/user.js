/**
 * 用户
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 启用用户
 * @param id 主键
 */
export function enableUser(id) {
  return request({
    url: settings.serverRoot + '/user/' + id + '/enable',
    method: 'patch'
  })
}

/**
 * 禁用用户
 * @param id 主键
 */
export function disableUser(id) {
  return request({
    url: settings.serverRoot + '/user/' + id + '/disable',
    method: 'patch'
  })
}
