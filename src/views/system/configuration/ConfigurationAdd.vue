<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="configuration" :model="configuration" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="标题：" prop="title">
                <el-input v-model="configuration.title" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="配置键：" prop="configKey">
                <el-input v-model="configuration.configKey" placeholder="请输入配置键"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="配置值：" prop="configValue">
                <el-input type="textarea" :rows="5" v-model="configuration.configValue" placeholder="请输入配置值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="描述：" prop="description">
                <el-input type="textarea" :rows="3" v-model="configuration.description" placeholder="请输入描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'configuration:insert'">
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
  configKeyExist, insertConfiguration
} from '@/api/system/configuration'

export default {
  name: 'configurationAdd',
  data() {
    const validateTitle = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入标题'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 32) {
        callback(new Error('标题长度在 2 到 32 之间'))
        return
      }

      callback()
    }

    const validateConfigKey = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入配置键'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 32) {
        callback(new Error('配置键长度在 2 到 32 之间'))
        return
      }

      // 验证格式
      const regexp = /^[a-zA-Z0-9_]+$/
      if (!regexp.test(value)) {
        callback(new Error('配置键只能包含英文字母，数字和下划线'))
        return
      }

      // 验证配置键是否重复
      configKeyExist(value).then(data => {
        if (data.result) {
          callback(new Error('该配置键已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    return {
      configuration: {},
      rules: {
        title: [{
          required: true, trigger: 'blur', validator: validateTitle
        }],
        configKey: [{
          required: true, trigger: 'blur', validator: validateConfigKey
        }],
        configValue: [{
          required: true, message: '请输入配置值', trigger: ['blur', 'change']
        }]
      },
      control: {
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.configuration.validate(valid => {
        if (valid) {
          this.control.loading = true

          insertConfiguration(this.configuration).then(data => {
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
      this.configuration = {}
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
