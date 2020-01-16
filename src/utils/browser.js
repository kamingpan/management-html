'use strict'

/**
 * 获取浏览器信息
 * @returns {{}}
 */
export function getBrowser() {
  let device = matchMobile()
  let browser = {}

  if (!device) {
    device = 'PC'
    const browserMessage = matchPC()
    browser.browser = browserMessage.browser + ' ' + browserMessage.version
  }

  browser.device = device
  return browser
}

/**
 * 匹配pc浏览器
 * @returns {*}
 */
function matchPC() {
  const userAgent = navigator.userAgent.toLowerCase()
  const ie = /(msie\s|trident\/7)([\w.]+)/
  const trident = /(trident)\/([\w.]+)/
  const firefox = /(firefox)\/([\w.]+)/
  const opera = /(opera).+version\/([\w.]+)/
  const newOpera = /(opr)\/(.+)/
  const chrome = /(chrome)\/([\w.]+)/
  const safari = /version\/([\w.]+).*(safari)/
  let matchBS, matchBS2

  matchBS = ie.exec(userAgent)
  if (matchBS !== null) {
    matchBS2 = trident.exec(userAgent)
    if (matchBS2 !== null) {
      switch (matchBS2[2]) {
        case '4.0':
          return { browser: 'IE', version: '8' }
        case '5.0':
          return { browser: 'IE', version: '9' }
        case '6.0':
          return { browser: 'IE', version: '10' }
        case '7.0':
          return { browser: 'IE', version: '11' }
        default:
          return { browser: 'IE', version: 'unknown' }
      }
    } else {
      return { browser: 'IE', version: matchBS[2] || '0' }
    }
  }

  matchBS = firefox.exec(userAgent)
  if ((matchBS !== null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
    return { browser: matchBS[1] || '', version: matchBS[2] || '0' }
  }
  matchBS = opera.exec(userAgent)
  if ((matchBS !== null) && (!(window.attachEvent))) {
    return { browser: matchBS[1] || '', version: matchBS[2] || '0' }
  }
  matchBS = chrome.exec(userAgent)
  if ((matchBS !== null) && (!!(window.chrome)) && (!(window.attachEvent))) {
    matchBS2 = newOpera.exec(userAgent)
    if (matchBS2 === null) {
      return { browser: matchBS[1] || '', version: matchBS[2] || '0' }
    } else {
      return { browser: 'Opera', version: matchBS2[2] || '0' }
    }
  }
  matchBS = safari.exec(userAgent)
  if ((matchBS !== null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
    return { browser: matchBS[2] || '', version: matchBS[1] || '0' }
  }
  if (matchBS !== null) {
    return { browser: 'unknown', version: '0' }
  }
}

/**
 * 匹配移动端设备信息
 * @returns {boolean}
 */
function matchMobile() {
  const userAgent = navigator.userAgent.toLowerCase()
  let device = false

  if (userAgent.match(/ipad/i) === 'ipad') {
    device = 'ipad'
  } else if (userAgent.match(/iphone os/i) === 'iphone os') {
    device = 'iphone os'
  } else if (userAgent.match(/midp/i) === 'midp') {
    device = 'midp'
  } else if (userAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4') {
    device = 'rv:1.2.3.4'
  } else if (userAgent.match(/ucweb/i) === 'ucweb') {
    device = 'ucweb'
  } else if (userAgent.match(/android/i) === 'android') {
    device = 'android'
  } else if (userAgent.match(/windows ce/i) === 'windows ce') {
    device = 'windows ce'
  } else if (userAgent.match(/windows mobile/i) === 'windows mobile') {
    device = 'windows mobile'
  }

  return device
}
