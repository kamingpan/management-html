<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="admin" :model="admin" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="用户名：" prop="username">
                <el-input v-model="admin.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="admin.status" filterable clearable placeholder="请选择状态">
                  <el-option v-for="item in control.statuses" :key="item.value" :label="item.label"
                             :value="parseInt(item.value)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="姓名：" prop="fullName">
                <el-input v-model="admin.fullName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="admin.gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="手机号码：" prop="phone">
                <el-input v-model="admin.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="admin.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="限制ip：" prop="restrictIp">
                <el-input v-model="admin.restrictIp" placeholder="请输入ip"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'admin:insert'">
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
  </div>
</template>

<script>
import {
  getDataDictionaries
} from '@/api/system/system'
import {
  usernameExist, insertAdmin
} from '@/api/system/admin'

export default {
  name: 'adminAdd',
  data() {
    const validateUsername = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入用户名'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 16) {
        callback(new Error('用户名长度在 2 到 16 之间'))
        return
      }

      // 验证格式
      const regexp = /^[a-zA-Z0-9_.]+$/
      if (!regexp.test(value)) {
        callback(new Error('用户名只能包含英文字母，数字，点和下划线'))
        return
      }

      // 验证用户名是否重复
      usernameExist(value).then(data => {
        if (data.result) {
          callback(new Error('该用户名已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

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

    const validateIP = (rule, value, callback) => {
      // ip正则表达式
      const regexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

      // 验证格式
      if (value && value.trim() !== '' && !regexp.test(value)) {
        callback(new Error('请输入正确的ip地址'))
        return
      }

      callback()
    }

    return {
      admin: {},
      rules: {
        username: [{
          required: true, trigger: 'blur', validator: validateUsername
        }],
        status: [{
          required: true, message: '请选择状态', trigger: 'change'
        }],
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
        }],
        restrictIp: [{
          trigger: ['blur', 'change'], validator: validateIP
        }]
      },
      control: {
        statuses: [],
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.admin.validate(valid => {
        if (valid) {
          this.control.loading = true

          insertAdmin(this.admin).then(data => {
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
        } else {
          return false
        }
      })
    },

    reset() {
      this.admin = {}
      this.getStatuses()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'Admin',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    }
  },

  mounted() {
    this.getStatuses()
  }
}
</script>

<style scoped>

</style>
