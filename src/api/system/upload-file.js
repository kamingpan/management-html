/**
 * 文件上传
 */

import request from '@/utils/request'
import settings from '@/settings'

/**
 * 上传文件列表
 * @param formData 表单数据
 */
export function uploadFiles(formData) {
  return request({
    url: settings.serverRoot + '/upload-file',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: formData
  })
}

/**
 * 上传图片列表
 * @param formData 表单数据
 */
export function uploadImages(formData) {
  return request({
    url: settings.serverRoot + '/upload-file/upload-images',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: formData
  })
}
