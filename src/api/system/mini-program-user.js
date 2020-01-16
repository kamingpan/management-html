/**
 * 小程序用户
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询小程序用户列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getMiniProgramUsers(parameter, pager) {
  return request({
    url: settings.serverRoot + '/mini-program-user',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询小程序用户详情
 * @param id 主键
 */
export function getMiniProgramUser(id) {
  return request({
    url: settings.serverRoot + '/mini-program-user/' + id,
    method: 'get',
    params: {}
  })
}
