<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="demo" :model="demo" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="名称：" prop="name">
                <el-input v-model="demo.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="demo.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="图片：" prop="picture">
                <el-button @click="removeImage" size="small" v-if="demo.pictureUrl" v-waves>-</el-button>
                <el-button @click="showDialog" size="small" v-else v-waves>+</el-button>
                <div class="image-container" data-title="点击编辑" @click="showDialog" v-if="demo.pictureUrl">
                  <img class="img-circle" :src="demo.pictureUrl" width="200"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="爱好：" prop="hobby">
                <el-checkbox-group v-model="control.checked" prop="hobby">
                  <el-checkbox v-for="item in control.hobbies" :label="item.value" :key="item.value">
                    {{item.label}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="demo.email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="demo.status" filterable clearable placeholder="请选择状态">
                  <el-option v-for="item in control.statuses" :key="item.value" :label="item.label"
                             :value="parseInt(item.value)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="附件：" prop="attachment">
                <el-upload class="upload-file" ref="uploadFile" multiple action="string" :file-list="control.files"
                           :before-remove="beforeRemove" :on-remove="handleRemove" :on-preview="handlePreview"
                           ::auto-upload="false" :http-request="uploadFiles">
                  <el-button slot="trigger" size="small" type="primary">{{$t('operate.chooseFile')}}</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传不超过2MB的文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="介绍：" prop="introduction">
                <tinymce v-model="demo.introduction" :height="400"></tinymce>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="3" v-model="demo.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'demo:update'">
                  {{$t('operate.save')}}
                </el-button>
                <el-button icon="el-icon-delete" @click="reset" v-waves>{{$t('operate.reset')}}</el-button>
                <el-button type="danger" icon="el-icon-circle-close" @click="close" v-waves>
                  {{$t('operate.close')}}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <div class="dialog-container cropper-container">
      <el-dialog title="上传图片" :visible.sync="control.dialogVisible">
        <el-row>
          <el-col :span="12">
            <div style="height: 300px">
              <vueCropper ref="cropper" :img="option.img" :outputSize="option.size"
                          :outputType="option.outputType" :info="option.info" :full="option.full"
                          :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                          :fixedBox="option.fixedBox" :fixed="option.fixed" :fixedNumber="option.fixedNumber"
                          :original="option.original" :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
                          :centerBox="option.centerBox" :high="option.high"
                          :infoTrue="option.infoTrue" :enlarge="option.enlarge"
                          @realTime="realTime">
                <!--@imgLoad="imgLoad" @cropMoving="cropMoving"-->
              </vueCropper>
            </div>
          </el-col>
          <el-col :span="1">
            <br/>
          </el-col>
          <el-col :span="11">
            <div class="show-preview"
                 :style="{'width': '200px', 'height':'200px',  'overflow': 'hidden', 'margin': '0px auto'}">
              <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img"/>
              </div>
            </div>
            <div style="max-width: 275px; margin: 0px auto">
              <h5>操作</h5>
              <label class="btn btn-orange" for="uploads">更换图片</label>
              <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0)"
                     accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
              <el-button-group>
                <el-button size="small" @click="changeScale(1)" v-waves><i class="fa fa-plus fa-fw"></i></el-button>
                <el-button size="small" @click="changeScale(-1)" v-waves><i class="fa fa-minus fa-fw"></i></el-button>
                <el-button size="small" @click="rotateLeft" v-waves><i class="fa fa-rotate-left fa-fw"></i></el-button>
                <el-button size="small" @click="rotateRight" v-waves><i class="fa fa-rotate-right fa-fw"></i>
                </el-button>
              </el-button-group>
            </div>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="uploadPicture" v-has-permission="'demo:update'"
                     v-waves>
            {{$t('operate.submit')}}
          </el-button>
          <el-button @click="closeDialog" v-waves>{{$t('operate.close')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  VueCropper
} from 'vue-cropper'

import Tinymce from '@/components/Tinymce'
import {
  uploadImages, uploadFiles
} from '@/api/system/upload-file'
import {
  getDataDictionaries
} from '@/api/system/system'
import {
  nameExist, getDemo, updateDemo
} from '@/api/business/demo'

export default {
  name: 'demoEdit',
  components: {
    VueCropper,
    Tinymce
  },
  data() {
    const validateName = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入名称'))
        return
      }

      // 验证长度
      if (value.length < 1 || value.length > 16) {
        callback(new Error('名称长度在 1 到 16 之间'))
        return
      }

      // 验证用户名是否重复
      nameExist(value, this.$route.params.id).then(data => {
        if (data.result) {
          callback(new Error('该名称已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    const validatePhone = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入手机号码'))
        return
      }

      // 验证格式
      const regexp = /^[1][0-9]{10}$/
      if (!regexp.test(value)) {
        callback(new Error('请输入正确的手机号码'))
        return
      }

      callback()
    }

    const validatePicture = (rule, value, callback) => {
      // 验证空字符串
      if (!this.demo.picture || this.demo.picture === '') {
        callback(new Error('请上传图片'))
        return
      }

      callback()
    }

    const validateHobby = (rule, value, callback) => {
      // 验证空字符串
      if (!this.control.checked || this.control.checked.length <= 0) {
        callback(new Error('请选择爱好'))
        return
      }

      callback()
    }

    return {
      id: this.$route.params.id,
      demo: {},
      rules: {
        name: [{
          required: true, trigger: 'blur', validator: validateName
        }],
        phone: [{
          required: true, trigger: ['blur', 'change'], validator: validatePhone
        }],
        picture: [{
          required: true, trigger: 'change', validator: validatePicture
        }],
        hobby: [{
          required: true, trigger: ['blur', 'change'], validator: validateHobby
        }],
        email: [{
          type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']
        }],
        status: [{
          required: true, message: '请选择状态', trigger: 'change'
        }]
      },
      control: {
        statuses: [],
        hobbies: [],
        checked: [],
        files: [],
        loading: false,
        dialogVisible: false
      },
      option: {
        img: '',
        info: true, // 裁剪框的大小信息
        size: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 是否能缩放截图框
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        centerBox: false,
        downImg: '#'
      },
      previews: {},
      imgFile: ''
    }
  },

  methods: {
    submit() {
      this.$refs.demo.validate(valid => {
        if (valid) {
          // 赋值爱好
          this.demo.hobbies = (!this.control.checked || this.control.checked.length <= 0) ? '' : this.control.checked.join(',')

          // 更改保存按钮状态
          this.control.loading = true

          // 获取需要上传的图片列表
          const uploadFileList = this.$refs.uploadFile.uploadFiles.filter(item => item.status === 'ready')

          // 如果没有需要上传的文件，则直接新增示例，跳过上传文件步骤
          if (!uploadFileList || uploadFileList.length <= 0) {
            // 新增示例
            updateDemo(this.demo).then(data => {
              this.control.loading = false

              // 弹窗展示结果
              this.$message({
                message: this.$t('operate.saveSuccess'),
                type: 'success'
              })

              this.close()
            }).catch(() => {
              this.control.loading = false
            })

            return
          }

          // 创建上传表单
          const formData = new FormData()
          formData.append('belong', 'Demo')
          formData.append('belongVariable', 'attachment')

          // 遍历列表，把文件对象添加到表单中
          for (const uploadFile of uploadFileList) {
            if (uploadFile && uploadFile.raw) {
              // 校验文件大小
              const isLessThan2M = uploadFile.size / 1024 / 1024 < 2
              if (!isLessThan2M) {
                this.$alert(`上传文件（${uploadFile.name}）大小不能超过2MB!`, '上传异常', {
                  type: 'warning'
                })

                this.control.loading = false
                return
              }

              formData.append('file', uploadFile.raw, uploadFile.raw.name)
            }
          }

          // 上传图片
          uploadFiles(formData).then(data => {
            if (!this.demo.attachment) {
              this.demo.attachment = []
            }

            // 将文件id添加到附件列表中
            data.forEach(uploadFile => {
              if (uploadFile && uploadFile.id) {
                this.demo.attachment.push(uploadFile.id)
              }
            })

            // 新增示例
            updateDemo(this.demo).then(data => {
              this.control.loading = false

              // 弹窗展示结果
              this.$message({
                message: this.$t('operate.saveSuccess'),
                type: 'success'
              })

              this.close()
            }).catch(() => {
              this.control.loading = false
            })
          }).catch(() => {
            this.control.loading = false
          })
        } else {
          return false
        }
      })
    },

    // 查询示例详情
    getInfo() {
      getDemo(this.id).then(data => {
        this.demo = data

        // 字符串转换成json数组
        if (this.demo) {
          //  爱好列表转换
          if (this.demo.hobby) {
            this.control.checked = JSON.parse(this.demo.hobby)
          }

          // 文件列表转换
          if (this.demo.attachments) {
            for (const attachment of this.demo.attachments) {
              attachment.name = attachment.filename
            }
            this.control.files = this.demo.attachments
          }

          // 文件id列表转换
          if (this.demo.attachment) {
            this.demo.attachment = JSON.parse(this.demo.attachment)
          }
        }
      }).catch(() => {
      })
    },

    reset() {
      this.getInfo()
      this.getStatuses()
      this.getHobbies()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'Demo',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 查询爱好列表
    getHobbies() {
      getDataDictionaries({
        'clazz': 'Demo',
        'variable': 'hobby'
      }).then(data => {
        this.control.hobbies = data
      }).catch(() => {
      })
    },

    // 移除图片
    removeImage() {
      this.option.img = ''
      this.demo.pictureUrl = ''
      this.demo.picture = ''
    },

    // 显示对话框
    showDialog() {
      if (this.demo.pictureUrl) {
        this.option.img = this.demo.pictureUrl
      } else {
        this.option.img = ''
      }

      this.control.dialogVisible = true

      this.$nextTick(() => {
        // 刷新图片裁剪器
        this.$refs.cropper.refresh()
      })
    },

    // 关闭对话框
    closeDialog() {
      this.control.dialogVisible = false
    },

    // 实时预览函数
    realTime(data) {
      this.previews = data
    },

    // 选择本地图片
    uploadImg(e, num) {
      const _this = this

      // 上传图片
      const file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是gif,jpeg,jpg,png,bmp中的一种')
        return false
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }

        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }

      // 转化为base64
      // reader.readAsDataURL(file)

      // 转化为blob
      reader.readAsArrayBuffer(file)
    },

    // 放大/缩小
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },

    // 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },

    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    // 上传图片
    uploadPicture() {
      const formData = new FormData()
      formData.append('belong', 'Demo')
      formData.append('belongVariable', 'picture')

      // 输出文件
      this.$refs.cropper.getCropBlob((data) => {
        let img = window.URL.createObjectURL(data)
        this.model = true
        this.modelSrc = img
        formData.append('file', data, this.fileName)

        // 上传图片
        uploadImages(formData).then(response => {
          this.control.dialogVisible = false

          let data = response
          if (data.length > 0) {
            this.demo.pictureUrl = data[0].url
            this.demo.picture = data[0].id
          }
        }).catch(() => {
        })
      })
    },

    // 点击文件列表触发下载
    handlePreview(file) {
      // 如果文件未上传，则不触发下载
      if (!file || file.status === 'ready') {
        return
      }

      // 创建a标签元素触发下载文件
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = file.url
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },

    // 移除附件
    beforeRemove(file, fileList) {
      return this.$confirm(`确定要移除“${file.name}”吗？`)
    },

    // 移除附件
    handleRemove(file, fileList) {
      // 判断id和附件列表是否存在
      if (!file.id || !this.demo.attachment || this.demo.attachment.length <= 0) {
        return
      }

      // 移除附件列表中的指定文件id
      const index = this.demo.attachment.indexOf(file.id)
      if (index > -1) {
        this.demo.attachment.splice(index, 1)
      }
    },

    // 上传文件
    uploadFiles(param) {
      // 上传文件不做任何处理，在提交的时候再批量上传所有文件
    }
  },

  mounted() {
    this.getInfo()
    this.getStatuses()
    this.getHobbies()
  }
}
</script>

<style scoped>
  .image-container {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #d8dce5;
    border-radius: 50%;
  }

  .image-container:after {
    content: attr(data-title);
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding: 0.05em 0;
    text-align: center;
    color: #fff;
    background-color: rgba(52, 47, 41, .5);
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    opacity: 0;
  }

  .image-container:hover:after {
    opacity: 1;
    -webkit-transform: translate(0, -100%);
    transform: translate(0, -100%);
  }

  .show-preview .preview {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #d8dce5;
  }

  .cropper-container .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
</style>
