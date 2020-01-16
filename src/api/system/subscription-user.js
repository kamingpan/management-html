/**
 * 公众号用户
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询公众号用户列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getSubscriptionUsers(parameter, pager) {
  return request({
    url: settings.serverRoot + '/subscription-user',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询公众号用户详情
 * @param id 主键
 */
export function getSubscriptionUser(id) {
  return request({
    url: settings.serverRoot + '/subscription-user/' + id,
    method: 'get',
    params: {}
  })
}
