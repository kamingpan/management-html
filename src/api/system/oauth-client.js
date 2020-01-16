/**
 * 授权客户端
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询授权客户端列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getOauthClients(parameter, pager) {
  return request({
    url: settings.serverRoot + '/oauth-client',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询授权客户端详情
 * @param id 主键
 */
export function getOauthClient(id) {
  return request({
    url: settings.serverRoot + '/oauth-client/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增授权客户端
 * @param oauthClient 授权客户端
 */
export function insertOauthClient(oauthClient) {
  return request({
    url: settings.serverRoot + '/oauth-client',
    method: 'post',
    data: oauthClient
  })
}

/**
 * 更新授权客户端
 * @param oauthClient 授权客户端
 */
export function updateOauthClient(oauthClient) {
  return request({
    url: settings.serverRoot + '/oauth-client/' + oauthClient.id,
    method: 'put',
    data: oauthClient
  })
}

/**
 * 删除授权客户端
 * @param id 主键
 */
export function deleteOauthClient(id) {
  return request({
    url: settings.serverRoot + '/oauth-client/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除授权客户端
 * @param ids 授权客户端主键列表
 */
export function deleteOauthClients(ids) {
  return request({
    url: settings.serverRoot + '/oauth-client',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}

/**
 * 查询授权客户端名称是否存在
 * @param name 授权客户端名称
 * @param id 主键
 */
export function nameExist(name, id) {
  return request({
    url: settings.serverRoot + '/oauth-client/name-exist',
    method: 'get',
    params: {
      name: name,
      id: id
    }
  })
}

/**
 * 查询授权客户端id是否存在
 * @param clientId 授权客户端id
 * @param id 主键
 */
export function clientIdExist(clientId, id) {
  return request({
    url: settings.serverRoot + '/oauth-client/client-exist',
    method: 'get',
    params: {
      clientId: clientId,
      id: id
    }
  })
}
