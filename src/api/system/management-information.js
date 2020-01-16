/**
 * 管理端信息
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询管理端信息
 */
export function getInformation() {
  return request({
    url: settings.serverRoot + '/management-information',
    method: 'get',
    params: {}
  })
}

/**
 * 更新管理端信息
 * @param managementInformation 管理端信息
 */
export function updateInformation(managementInformation) {
  return request({
    url: settings.serverRoot + '/management-information',
    method: 'put',
    data: managementInformation
  })
}
