<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="operator" :model="operator" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="旧密码：" prop="oldPassword">
                <el-input type="password" v-model="operator.oldPassword" placeholder="请输入旧密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="新密码：" prop="password">
                <el-input type="password" v-model="operator.password" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="确认密码：" prop="confirmPassword">
                <el-input type="password" v-model="operator.confirmPassword" placeholder="请输入确认密码"></el-input>
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
  </div>
</template>

<script>
import {
  MessageBox
} from 'element-ui'
import {
  passwordVerifier, updatePassword
} from '@/api/system/operator'

export default {
  name: 'changePassword',
  data() {
    const validateOldPassword = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入旧密码'))
        return
      }

      if (value.length < 6 || value.length > 16) {
        callback(new Error('旧密码长度在 6 到 16 之间'))
        return
      }

      passwordVerifier(value).then(data => {
        if (!data.result) {
          callback(new Error('旧密码错误，请重新输入'))
          return
        }

        callback()
      }).catch(() => {
      })
    }

    const validatePassword = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入新密码'))
        return
      }

      if (value.length < 6 || value.length > 16) {
        callback(new Error('新密码长度在 6 到 16 之间'))
        return
      }

      if (value === this.operator.oldPassword) {
        callback(new Error('新密码和旧密码不能相同，请重新输入'))
        return
      }

      callback()
    }

    const validateConfirmPassword = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入确认密码'))
        return
      }

      if (value.length < 6 || value.length > 16) {
        callback(new Error('确认密码长度在 6 到 16 之间'))
        return
      }

      if (value !== this.operator.password) {
        callback(new Error('确认密码和新密码不一致，请重新输入'))
        return
      }

      callback()
    }

    return {
      operator: {},
      rules: {
        oldPassword: [{
          required: true, trigger: ['blur'], validator: validateOldPassword
        }],
        password: [{
          required: true, trigger: ['blur', 'change'], validator: validatePassword
        }],
        confirmPassword: [{
          required: true, trigger: ['blur', 'change'], validator: validateConfirmPassword
        }]
      },
      control: {
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.operator.validate(valid => {
        if (valid) {
          this.control.loading = true

          const _this = this
          updatePassword(this.operator.oldPassword, this.operator.password).then(() => {
            this.control.loading = false

            // 弹窗展示结果
            MessageBox.alert('修改密码成功，请重新登录', '修改成功', {
              type: 'success'
            }).then(function () {
              // 点击了确定按钮，跳转到登录页面
              _this.$router.push({
                name: 'login'
              })
            }).catch(function () {
              // 点击了关闭窗口，暂时不触发任何操作
            })
          }).catch(() => {
            this.control.loading = false
          })
        } else {
          return false
        }
      })
    },

    reset() {
      this.operator = {}
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    }
  }
}
</script>

<style scoped>

</style>
