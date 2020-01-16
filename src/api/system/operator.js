/**
 * 操作员
 */

import md5 from 'js-md5'
import request from '@/utils/request'
import settings from '@/settings'

/**
 * 查询当前操作员
 */
export function getOperator() {
  return request({
    url: settings.serverRoot + '/operator',
    method: 'get'
  })
}

/**
 * 更新当前操作员
 */
export function updateOperator(operator) {
  return request({
    url: settings.serverRoot + '/operator',
    method: 'put',
    data: operator
  })
}

/**
 * 更新当前操作员密码
 */
export function updatePassword(oldPassword, password) {
  return request({
    url: settings.serverRoot + '/operator/password',
    method: 'patch',
    data: {
      oldPassword: md5.hex(oldPassword),
      password: md5.hex(password)
    }
  })
}

/**
 * 验证密码
 */
export function passwordVerifier(password) {
  return request({
    url: settings.serverRoot + '/operator/password-verifier',
    method: 'get',
    params: {
      password: md5.hex(password)
    }
  })
}
