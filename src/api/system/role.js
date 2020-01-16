/**
 * 角色
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询角色列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getRoles(parameter, pager) {
  return request({
    url: settings.serverRoot + '/role',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询角色详情
 * @param id 主键
 */
export function getRole(id) {
  return request({
    url: settings.serverRoot + '/role/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增角色
 * @param role 角色
 */
export function insertRole(role) {
  return request({
    url: settings.serverRoot + '/role',
    method: 'post',
    data: role
  })
}

/**
 * 更新角色
 * @param role 角色
 */
export function updateRole(role) {
  return request({
    url: settings.serverRoot + '/role/' + role.id,
    method: 'put',
    data: role
  })
}

/**
 * 删除角色
 * @param id 主键
 */
export function deleteRole(id) {
  return request({
    url: settings.serverRoot + '/role/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除角色
 * @param ids 角色主键列表
 */
export function deleteRoles(ids) {
  return request({
    url: settings.serverRoot + '/role',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}

/**
 * 启用角色
 * @param id 主键
 */
export function enableRole(id) {
  return request({
    url: settings.serverRoot + '/role/' + id + '/enable',
    method: 'patch'
  })
}

/**
 * 禁用角色
 * @param id 主键
 */
export function disableRole(id) {
  return request({
    url: settings.serverRoot + '/role/' + id + '/disable',
    method: 'patch'
  })
}

/**
 * 查询角色名是否存在
 * @param name 角色名
 * @param id 主键
 */
export function nameExist(name, id) {
  return request({
    url: settings.serverRoot + '/role/name-exist',
    method: 'get',
    params: {
      name: name,
      id: id
    }
  })
}

/**
 * 查询所有角色和当前管理员已被分配的角色
 * @param adminId 管理员主键
 */
export function getAllRoles(adminId) {
  return request({
    url: settings.serverRoot + '/role/list',
    method: 'get',
    params: {
      adminId: adminId
    }
  })
}

/**
 * 查询上级角色
 */
export function getSuperiors(id) {
  return request({
    url: settings.serverRoot + '/role/superior',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 授予权限
 * @param id 主键
 * @param permissions 角色列表
 */
export function grantPermission(id, permissions) {
  return request({
    url: settings.serverRoot + '/role/' + id + '/permission',
    method: 'post',
    data: {
      permissions: (!permissions || permissions.length <= 0) ? '' : permissions.join(',')
    }
  })
}
