/**
 * Created by jiachenpan on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 合法uri
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 大小写字母
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 正则表达式校验
 */
export function regexp(value, regular) {
  return regular.test(value)
}

/**
 * 手机格式校验
 */
export function phone(value) {
  const regular = /^[1][0-9]{10}$/
  return regular.test(value)
}

/**
 * ip地址格式校验
 */
export function ip(value) {
  const regular = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return regular.test(value)
}

/**
 * 输入不同校验
 */
export function notEqualTo(value, target) {
  return value !== target
}

/**
 * 中文字符校验
 */
export function chinese(value) {
  const regular = /^[\u0391-\uFFE5]+$/
  return regular.test(value)
}

/**
 * 英文字符校验
 */
export function english(value) {
  const regular = /^[A-Za-z]+$/
  return regular.test(value)
}

/**
 * qq校验
 */
export function qq(value) {
  const regular = /^[1-9]\d{4,12}$/
  return regular.test(value)
}

/**
 * 邮政编码校验
 */
export function zipCode(value) {
  const regular = /^[0-9]{6}$/
  return regular.test(value)
}

/**
 * 邮箱校验
 */
export function email(value) {
  const regular = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return regular.test(value)
}
