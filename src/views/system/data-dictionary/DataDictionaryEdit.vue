<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="dataDictionary" :model="dataDictionary" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="类：">
                <label class="in-label">{{dataDictionary.clazz}}</label>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="变量：">
                <label class="in-label">{{dataDictionary.variable}}</label>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="标签：" prop="label">
                <el-input v-model="dataDictionary.label" placeholder="请输入标签"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="值：" prop="value">
                <el-input v-model="dataDictionary.value" placeholder="请输入值"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="类型：" prop="type">
                <el-select v-model="dataDictionary.type" filterable clearable placeholder="请选择类型">
                  <el-option v-for="item in control.types" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="排序：" prop="sort">
                <el-input v-model="dataDictionary.sort" placeholder="请输入排序"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="3" v-model="dataDictionary.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'data-dictionary:update'">
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
  getDataDictionary, updateDataDictionary
} from '@/api/system/data-dictionary'

export default {
  name: 'dataDictionaryAdd',
  data() {
    const validateLabel = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入标签'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!regexp.test(value)) {
        callback(new Error('标签只能包含中文，英文字母和数字'))
        return
      }

      callback()
    }

    const validateValue = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入值'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!regexp.test(value)) {
        callback(new Error('值只能包含中文，英文字母和数字'))
        return
      }

      callback()
    }

    const validateSort = (rule, value, callback) => {
      // 验证空字符串
      if (!value) {
        callback(new Error('请输入排序'))
        return
      }

      // 验证格式
      const regexp = /^\d+$/
      if (!regexp.test(value)) {
        callback(new Error('排序只能是正整数'))
        return
      }

      callback()
    }

    return {
      id: this.$route.params.id,
      dataDictionary: {},
      rules: {
        label: [{
          required: true, trigger: 'blur', validator: validateLabel
        }],
        value: [{
          required: true, trigger: 'blur', validator: validateValue
        }],
        type: [{
          required: true, message: '请选择类型', trigger: 'change'
        }],
        sort: [{
          required: true, trigger: 'blur', validator: validateSort
        }]
      },
      control: {
        types: [],
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.dataDictionary.validate(valid => {
        if (valid) {
          this.control.loading = true

          updateDataDictionary(this.dataDictionary).then(data => {
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
      this.getTypes()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询状态列表
    getTypes() {
      getDataDictionaries({
        'clazz': 'DataDictionary',
        'variable': 'type'
      }).then(data => {
        this.control.types = data
      }).catch(() => {
      })
    },

    // 查询数据字典详情
    getInfo() {
      getDataDictionary(this.id).then(data => {
        this.dataDictionary = data
      }).catch(() => {
      })
    }
  },

  mounted() {
    this.getInfo()
    this.getTypes()
  }
}
</script>

<style scoped>

</style>
