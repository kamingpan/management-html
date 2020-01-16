<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="oauthClient" :model="oauthClient" label-position="right" label-width="110px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="客户端名称：" prop="name">
                <el-input v-model="oauthClient.name" placeholder="请输入客户端名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="客户端id：" prop="clientId">
                <el-input v-model="oauthClient.clientId" placeholder="请输入客户端id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="客户端密钥：" prop="clientSecret">
                <el-input v-model="oauthClient.clientSecret" placeholder="请输入客户端密钥"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'oauth-client:update'">
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
  nameExist, clientIdExist, getOauthClient, updateOauthClient
} from '@/api/system/oauth-client'

export default {
  name: 'oauthClientEdit',
  data() {
    const validateName = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入客户端名称'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 16) {
        callback(new Error('授权客户端名称长度在 2 到 16 之间'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!regexp.test(value)) {
        callback(new Error('授权客户端名称只能包含中文，英文字母和数字'))
        return
      }

      // 验证客户端名称是否重复
      nameExist(value, this.id).then(data => {
        if (data.result) {
          callback(new Error('该客户端名称已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    const validateClientId = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入客户端id'))
        return
      }

      // 验证客户端id是否重复
      clientIdExist(value, this.id).then(data => {
        if (data.result) {
          callback(new Error('该客户端id已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    return {
      id: this.$route.params.id,
      oauthClient: {},
      rules: {
        name: [{
          required: true, trigger: 'blur', validator: validateName
        }],
        clientId: [{
          required: true, trigger: 'blur', validator: validateClientId
        }],
        clientSecret: [{
          required: true, trigger: ['blur', 'change'], message: '请输入客户端密钥'
        }]
      },
      control: {
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.oauthClient.validate(valid => {
        if (valid) {
          this.control.loading = true

          updateOauthClient(this.oauthClient).then(data => {
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
      this.getInfo()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询授权客户端详情
    getInfo() {
      getOauthClient(this.id).then(data => {
        const oauthClient = data

        // 移除多余的字段（避免提交修改时报错）
        delete oauthClient.updateTime
        delete oauthClient.updater

        this.oauthClient = oauthClient
      }).catch(() => {
      })
    }
  },

  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
