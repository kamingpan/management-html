/**
 * 管理员
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询管理员列表
 * @param parameter 查询参数
 * @param pager 分页
 */
export function getAdmins(parameter, pager) {
  return request({
    url: settings.serverRoot + '/admin',
    method: 'get',
    params: Object.assign({}, parameter, pager)
  })
}

/**
 * 查询管理员详情
 * @param id 主键
 */
export function getAdmin(id) {
  return request({
    url: settings.serverRoot + '/admin/' + id,
    method: 'get',
    params: {}
  })
}

/**
 * 新增管理员
 * @param admin 管理员
 */
export function insertAdmin(admin) {
  return request({
    url: settings.serverRoot + '/admin',
    method: 'post',
    data: admin
  })
}

/**
 * 更新管理员
 * @param admin 管理员
 */
export function updateAdmin(admin) {
  return request({
    url: settings.serverRoot + '/admin/' + admin.id,
    method: 'put',
    data: admin
  })
}

/**
 * 删除管理员
 * @param id 主键
 */
export function deleteAdmin(id) {
  return request({
    url: settings.serverRoot + '/admin/' + id,
    method: 'delete'
  })
}

/**
 * 批量删除管理员
 * @param ids 管理员主键列表
 */
export function deleteAdmins(ids) {
  return request({
    url: settings.serverRoot + '/admin',
    method: 'delete',
    data: {
      ids: ids.join(',')
    }
  })
}

/**
 * 启用管理员
 * @param id 主键
 */
export function enableAdmin(id) {
  return request({
    url: settings.serverRoot + '/admin/' + id + '/enable',
    method: 'patch'
  })
}

/**
 * 禁用管理员
 * @param id 主键
 */
export function disableAdmin(id) {
  return request({
    url: settings.serverRoot + '/admin/' + id + '/disable',
    method: 'patch'
  })
}

/**
 * 分配角色
 * @param id 主键
 * @param roles 角色列表
 */
export function assignRole(id, roles) {
  return request({
    url: settings.serverRoot + '/admin/' + id + '/role',
    method: 'post',
    data: {
      roles: (!roles || roles.length <= 0) ? '' : roles.join(',')
    }
  })
}

/**
 * 重置密码
 * @param id 主键
 */
export function resetPassword(id) {
  return request({
    url: settings.serverRoot + '/admin/' + id + '/reset-password',
    method: 'patch'
  })
}

/**
 * 管理员用户名是否存在
 * @param username 用户名
 * @param id 主键
 */
export function usernameExist(username, id) {
  return request({
    url: settings.serverRoot + '/admin/username-exist',
    method: 'get',
    params: {
      username: username,
      id: id
    }
  })
}
