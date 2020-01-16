/**
 * 数据字典
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询数据字典列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getDataDictionaries(parameter, pager) {
  return request({
    url: settings.serverRoot + '/data-dictionary',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询数据字典详情
 * @param id 主键
 */
export function getDataDictionary(id) {
  return request({
    url: settings.serverRoot + '/data-dictionary/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增数据字典
 * @param dataDictionary 数据字典
 */
export function insertDataDictionary(dataDictionary) {
  return request({
    url: settings.serverRoot + '/data-dictionary',
    method: 'post',
    data: dataDictionary
  })
}

/**
 * 更新数据字典
 * @param dataDictionary 数据字典
 */
export function updateDataDictionary(dataDictionary) {
  return request({
    url: settings.serverRoot + '/data-dictionary/' + dataDictionary.id,
    method: 'put',
    data: dataDictionary
  })
}

/**
 * 删除数据字典
 * @param id 主键
 */
export function deleteDataDictionary(id) {
  return request({
    url: settings.serverRoot + '/data-dictionary/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除数据字典
 * @param ids 数据字典主键列表
 */
export function deleteDataDictionaries(ids) {
  return request({
    url: settings.serverRoot + '/data-dictionary',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}
