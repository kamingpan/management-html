import qs from 'qs'
import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { MessageBox } from 'element-ui'

import router from '@/router'
import { getToken } from '@/utils/token'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
  withCredentials: true, // 跨域请求时发送 cookies
  crossDomain: true
})

// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 设置请求头
    if (!config.headers['Content-Type'] || config.headers['Content-Type'].indexOf('multipart/form-data') === -1) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

      // 将入参格式化为from表单提交
      config.data = qs.stringify(config.data)
    }

    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }

    // 开启progress
    NProgress.start()
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug

    // 结束progress
    NProgress.done()

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response.data,
  response => {
    // 结束progress
    NProgress.done()

    // 如果响应的是文件流，则直接把整个结果返回
    if (response.headers['content-type'].indexOf('application/octet-stream') !== -1) {
      return response.data
    }

    return response.data.data
  },

  error => {
    // 结束progress
    NProgress.done()

    // 响应头状态码
    const status = error.response.status
    // 响应体
    const data = error.response.data
    const message = data.status ? data.message : error.response.statusText

    // 通过dom获取MessageBox元素，并判断是否“已有弹窗”，如果已经有了，则直接抛出异常，不进行弹窗处理
    const elMessageBox = document.getElementsByClassName('el-message-box__wrapper')
    const hasMessageBox = elMessageBox && elMessageBox.length > 0 && elMessageBox[0].style.display !== 'none'

    /* // 被替换为下面判断
     if (hasMessageBox) {
     return Promise.reject(error);
     } */

    // 当“已有弹窗”，不需要再弹出的时候，继续判断是该弹窗是“警告”类型还是“异常”类型
    if (hasMessageBox) {
      const errorIcon = elMessageBox[0].getElementsByClassName('el-icon-warning')
      const showMessageBox = !errorIcon || errorIcon.length <= 0

      // 只有异常类型不允许继续弹窗，警告类型可以继续弹窗（该处设定：服务器返回异常都为“异常弹窗”，系统中确认弹窗都为“警告弹窗”）
      if (showMessageBox) {
        return Promise.reject(error)
      }
    }

    if (status === 400) {
      MessageBox.alert(message, status + '异常', {
        type: 'error'
      }).then(function () {
      }).catch(function () {
      })
    } else if (status === 401) {
      // 登录超时
      if (data.status === '01001') {
        MessageBox.alert(message, '登录异常', {
          type: 'error'
        }).then(function () {
          // 点击了确定按钮，跳转到登录页面（带上当前页面作为重新登录后重定向页面）
          if (router.history.current.path !== '/login') {
            router.push({
              path: '/login?redirect=' + router.history.current.fullPath
            })
          }
        }).catch(function () {
          // 点击了关闭窗口，暂时不触发任何操作
        })
      } else if (data.status === '02001') {
        MessageBox.alert('无该操作权限，请联系管理员', '权限异常', {
          type: 'error'
        }).then(function () {
          // 点击了确定按钮，暂时不触发任何操作
        }).catch(function () {
          // 点击了关闭窗口，暂时不触发任何操作
        })
      } else {
        // 剩余情况弹窗提示
        MessageBox.alert(message, status + '异常', {
          type: 'error'
        }).then(function () {
          // 点击了确定按钮，暂时不触发任何操作
        }).catch(function () {
          // 点击了关闭窗口，暂时不触发任何操作
        })
      }
    } else if (status === 404) {
      MessageBox.alert('请求不存在，请联系管理员', status + '请求异常', {
        type: 'error'
      }).then(function () {
        // 点击了确定按钮，暂时不触发任何操作
      }).catch(function () {
        // 点击了关闭窗口，暂时不触发任何操作
      })
    } else if (status === 408) {
      // 请求超时
      MessageBox.alert('请求超时，请重新发起请求', status + '请求异常', {
        type: 'error'
      }).then(function () {
        // 点击了确定按钮，暂时不触发任何操作
      }).catch(function () {
        // 点击了关闭窗口，暂时不触发任何操作
      })
    } else if (status === 500) {
      // 组装异常详情html
      let html = '<div class="error-message-box text-center">'
      html += '<h1>500</h1>'
      html += '<h3 class="font-bold">服务器内部错误</h3>'
      html += '<div class="error-desc">服务器好像出错了，您可以点击“<strong>详情</strong>”查看详细信息<br/>'
      html += '<button type="button" class="el-button el-button--default el-button--small el-button--primary detail-button"' +
        'onclick="document.getElementById(\'error-message-detail\').style.display = \'block\'"><span>详情</span></button>'
      html += '</div>'
      html += '<pre id="error-message-detail">' + data.error + '</pre>'
      html += '</div>'

      // 弹出异常详情页面
      MessageBox.alert(html, '服务器异常', {
        type: 'error',
        iconClass: 'display-none',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false
      }).then(function () {
        // 点击了确定按钮，暂时不触发任何操作
      }).catch(function () {
        // 点击了关闭窗口触发

        // 将异常详情重新隐藏
        document.getElementById('error-message-detail').style.display = 'none'

        // 将弹窗的宽度设置回默认状态
        const errorMessageBox = document.getElementsByClassName('el-message-box')
        if (errorMessageBox && errorMessageBox.length > 0) {
          errorMessageBox[0].style.width = ''
          errorMessageBox[0].style.minWidth = ''
        }
      })

      // 将弹窗的宽度设置为适合大小
      const errorMessageBox = document.getElementsByClassName('el-message-box')
      if (errorMessageBox && errorMessageBox.length > 0) {
        errorMessageBox[0].style.width = '70%'
        errorMessageBox[0].style.minWidth = '420px'
      }
    } else {
      // 剩余情况弹窗提示
      MessageBox.alert(message, status + '异常', {
        type: 'error'
      }).then(function () {
        // 点击了确定按钮，暂时不触发任何操作
      }).catch(function () {
        // 点击了关闭窗口，暂时不触发任何操作
      })
    }

    return Promise.reject(error)
  }
)

export default service
