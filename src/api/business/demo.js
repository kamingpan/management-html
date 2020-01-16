/**
 * 示例
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询示例列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getDemos(parameter, pager) {
  return request({
    url: settings.serverRoot + '/demo',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询示例详情
 * @param id 主键
 */
export function getDemo(id) {
  return request({
    url: settings.serverRoot + '/demo/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增示例
 * @param demo 示例
 */
export function insertDemo(demo) {
  return request({
    url: settings.serverRoot + '/demo',
    method: 'post',
    data: demo
  })
}

/**
 * 更新示例
 * @param demo 示例
 */
export function updateDemo(demo) {
  return request({
    url: settings.serverRoot + '/demo/' + demo.id,
    method: 'put',
    data: demo
  })
}

/**
 * 删除示例
 * @param id 主键
 */
export function deleteDemo(id) {
  return request({
    url: settings.serverRoot + '/demo/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除示例
 * @param ids 示例主键列表
 */
export function deleteDemos(ids) {
  return request({
    url: settings.serverRoot + '/demo',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}

/**
 * 启用示例
 * @param id 主键
 */
export function enableDemo(id) {
  return request({
    url: settings.serverRoot + '/demo/' + id + '/enable',
    method: 'patch'
  })
}

/**
 * 禁用示例
 * @param id 主键
 */
export function disableDemo(id) {
  return request({
    url: settings.serverRoot + '/demo/' + id + '/disable',
    method: 'patch'
  })
}

/**
 * 示例名称是否存在
 * @param name 名称
 * @param id 主键
 */
export function nameExist(name, id) {
  return request({
    url: settings.serverRoot + '/demo/name-exist',
    method: 'get',
    params: {
      name: name,
      id: id
    }
  })
}
