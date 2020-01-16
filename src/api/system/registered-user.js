/**
 * 注册用户
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询注册用户列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getRegisteredUsers(parameter, pager) {
  return request({
    url: settings.serverRoot + '/registered-user',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询注册用户详情
 * @param id 主键
 */
export function getRegisteredUser(id) {
  return request({
    url: settings.serverRoot + '/registered-user/' + id,
    method: 'get',
    params: {}
  })
}
