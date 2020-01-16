import md5 from 'js-md5'
import settings from '@/settings'
import request from '@/utils/request'
import { getBrowser } from '@/utils/browser'

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export function login(username, password) {
  // 获取当前浏览器信息
  const browser = getBrowser()

  return request({
    url: settings.serverRoot + '/system/login',
    method: 'post',
    data: {
      'username': username,
      'password': md5.hex(password),
      'browser': browser.browser,
      'device': browser.device
    }
  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: settings.serverRoot + '/system/logout',
    method: 'post'
  })
}

/**
 * 校验用户名是否存在
 * @param username 用户名
 */
export function usernameExist(username) {
  return request({
    url: settings.serverRoot + '/system/username-exist',
    method: 'get',
    params: {
      'username': username
    }
  })
}
