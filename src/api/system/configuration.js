/**
 * 配置信息
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询配置信息列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getConfigurations(parameter, pager) {
  return request({
    url: settings.serverRoot + '/configuration',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询配置信息详情
 * @param id 主键
 */
export function getConfiguration(id) {
  return request({
    url: settings.serverRoot + '/configuration/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增配置信息
 * @param configuration 配置信息
 */
export function insertConfiguration(configuration) {
  return request({
    url: settings.serverRoot + '/configuration',
    method: 'post',
    data: configuration
  })
}

/**
 * 更新配置信息
 * @param configuration 配置信息
 */
export function updateConfiguration(configuration) {
  return request({
    url: settings.serverRoot + '/configuration/' + configuration.id,
    method: 'put',
    data: configuration
  })
}

/**
 * 删除配置信息
 * @param id 主键
 */
export function deleteConfiguration(id) {
  return request({
    url: settings.serverRoot + '/configuration/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除配置信息
 * @param ids 配置信息主键列表
 */
export function deleteConfigurations(ids) {
  return request({
    url: settings.serverRoot + '/configuration',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}

/**
 * 配置信息配置键是否存在
 * @param configKey 配置键
 * @param id 主键
 */
export function configKeyExist(configKey, id) {
  return request({
    url: settings.serverRoot + '/configuration/config-key-exist',
    method: 'get',
    params: {
      configKey: configKey,
      id: id
    }
  })
}
