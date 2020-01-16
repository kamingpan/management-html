/**
 * 模块
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询模块列表
 */
export function getModules() {
  return request({
    url: settings.serverRoot + '/module',
    method: 'get'
  })
}

/**
 * 查询模块详情
 * @param id 主键
 */
export function getModule(id) {
  return request({
    url: settings.serverRoot + '/module/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 根据角色查询所有模块
 * @param role 角色
 */
export function getAllModules(role) {
  return request({
    url: settings.serverRoot + '/module/list',
    method: 'get',
    params: {
      role: role
    }
  })
}

/**
 * 新增模块
 * @param module 模块
 */
export function insertModule(module) {
  return request({
    url: settings.serverRoot + '/module',
    method: 'post',
    data: module
  })
}

/**
 * 更新模块
 * @param module 模块
 */
export function updateModule(module) {
  return request({
    url: settings.serverRoot + '/module/' + module.id,
    method: 'put',
    data: module
  })
}

/**
 * 删除模块
 * @param id 主键
 */
export function deleteModule(id) {
  return request({
    url: settings.serverRoot + '/module/' + id,
    method: 'delete'
  })
}

/**
 * 查询模块名称是否存在
 * @param name 模块名
 * @param id 主键
 */
export function nameExist(name, id) {
  return request({
    url: settings.serverRoot + '/module/name-exist',
    method: 'get',
    params: {
      name: name,
      id: id
    }
  })
}

/**
 * 查询模块字符串是否存在
 * @param authentication 模块字符串
 * @param id 主键
 */
export function authenticationExist(authentication, id) {
  return request({
    url: settings.serverRoot + '/module/authentication-exist',
    method: 'get',
    params: {
      authentication: authentication,
      id: id
    }
  })
}

/**
 * 查询上级模块
 */
export function getSuperiors(hasHighest) {
  return request({
    url: settings.serverRoot + '/module/superior',
    method: 'get',
    params: {
      hasHighest: hasHighest
    }
  })
}
