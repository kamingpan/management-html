<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="operator" :model="operator" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="用户名：">
                <label class="in-label">{{operator.username}}</label>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="头像：">
                <el-button @click="removePortrait" size="small" v-if="operator.portraitUrl" v-waves>-</el-button>
                <el-button @click="showDialog" size="small" v-else v-waves>+</el-button>
                <div class="portrait-container" data-title="点击编辑" @click="showDialog" v-if="operator.portraitUrl">
                  <img class="img-circle" :src="operator.portraitUrl" width="200"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="姓名：" prop="fullName">
                <el-input v-model="operator.fullName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="operator.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="operator.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="operator.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading"
                           v-waves>
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
      <el-dialog title="上传头像" :visible.sync="control.dialogVisible">
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
          <el-button type="primary" @click="uploadPortrait" v-has-permission="'management-information:update'" v-waves>
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

import {
  uploadImages
} from '@/api/system/upload-file'
import {
  getOperator, updateOperator
} from '@/api/system/operator'

export default {
  name: 'operatorInformation',
  components: {
    VueCropper
  },
  data() {
    const validateFullName = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入姓名'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z·]+$/
      if (!regexp.test(value)) {
        callback(new Error('姓名只能包含中文，英文字母和点'))
        return
      }

      callback()
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

    return {
      id: 0,
      operator: {},
      rules: {
        fullName: [{
          required: true, trigger: ['blur', 'change'], validator: validateFullName
        }],
        gender: [{
          required: true, message: '请选择性别', trigger: 'change'
        }],
        phone: [{
          required: true, trigger: ['blur', 'change'], validator: validatePhone
        }],
        email: [{
          type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']
        }]
      },
      control: {
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
      this.$refs.operator.validate(valid => {
        if (valid) {
          this.control.loading = true

          updateOperator(this.operator).then(data => {
            this.control.loading = false

            // 弹窗展示结果
            this.$message({
              message: this.$t('operate.saveSuccess'),
              type: 'success'
            })

            // 更新操作员信息
            this.$store.dispatch('user/GetOperator')

            this.close()
          }).catch(() => {
            this.control.loading = false
          })
        } else {
          return false
        }
      })
    },

    reset() {
      this.getInfo()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询管理员详情
    getInfo() {
      getOperator(this.id).then(data => {
        const operator = data

        // 移除多余的字段（避免提交修改时报错）
        delete operator.updateTime
        delete operator.updater

        this.operator = operator
      }).catch(() => {
      })
    },

    // 移除头像
    removePortrait() {
      this.option.img = ''
      this.operator.portraitUrl = ''
      this.operator.portrait = ''
    },

    // 显示对话框
    showDialog() {
      if (this.operator.portraitUrl) {
        this.option.img = this.operator.portraitUrl
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

    // 上传头像
    uploadPortrait() {
      const formData = new FormData()
      formData.append('belong', 'Admin')
      formData.append('belongId', this.operator.id)
      formData.append('belongVariable', 'portrait')

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
            this.operator.portraitUrl = data[0].url
            this.operator.portrait = data[0].id
          }
        }).catch(() => {
        })
      })
    }
  },

  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
  .portrait-container {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #d8dce5;
    border-radius: 50%;
  }

  .portrait-container:after {
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

  .portrait-container:hover:after {
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
