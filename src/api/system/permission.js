/**
 * 权限
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询权限列表
 */
export function getPermissions() {
  return request({
    url: settings.serverRoot + '/permission',
    method: 'get'
  })
}

/**
 * 查询权限详情
 * @param id 主键
 */
export function getPermission(id) {
  return request({
    url: settings.serverRoot + '/permission/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 根据角色查询所有权限
 * @param roleId 角色主键
 */
export function getAllPermissions(roleId) {
  return request({
    url: settings.serverRoot + '/permission/list',
    method: 'get',
    params: {
      roleId: roleId
    }
  })
}

/**
 * 根据模块查询上级权限
 */
export function getSuperiorsByModuleId(id, moduleId) {
  return request({
    url: settings.serverRoot + '/permission/superior',
    method: 'get',
    params: {
      id: id,
      moduleId: moduleId
    }
  })
}

/**
 * 新增权限
 * @param permission 权限
 */
export function insertPermission(permission) {
  return request({
    url: settings.serverRoot + '/permission',
    method: 'post',
    data: permission
  })
}

/**
 * 更新权限
 * @param permission 权限
 */
export function updatePermission(permission) {
  return request({
    url: settings.serverRoot + '/permission/' + permission.id,
    method: 'put',
    data: permission
  })
}

/**
 * 删除权限
 * @param id 主键
 */
export function deletePermission(id) {
  return request({
    url: settings.serverRoot + '/permission/' + id,
    method: 'delete'
  })
}

/**
 * 查询权限名称是否存在
 * @param name 权限名
 * @param id 主键
 */
export function nameExist(name, id) {
  return request({
    url: settings.serverRoot + '/permission/name-exist',
    method: 'get',
    params: {
      name: name,
      id: id
    }
  })
}

/**
 * 查询权限字符串是否存在
 * @param authentication 权限字符串
 * @param id 主键
 */
export function authenticationExist(authentication, id) {
  return request({
    url: settings.serverRoot + '/permission/authentication-exist',
    method: 'get',
    params: {
      authentication: authentication,
      id: id
    }
  })
}
