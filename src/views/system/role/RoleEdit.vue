<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0}" :sm="{offset: 2}" :md="{offset: 4}" :lg="{offset: 5}" :xl="{offset: 6}">
        <el-form ref="role" :model="role" label-position="right" label-width="100px" :rules="rules"
                 @keydown.enter.native="submit">
          <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="角色名称：" prop="name">
                <label class="in-label">{{role.name}}</label>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="上级角色：" prop="superior">
                <el-select v-model="role.superior" filterable clearable placeholder="请选择上级角色">
                  <el-option v-for="item in control.roles" :key="item.id" :label="item.name"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="状态：" prop="status">
                <el-select v-model="role.status" filterable clearable placeholder="请选择状态">
                  <el-option v-for="item in control.statuses" :key="item.value" :label="item.label"
                             :value="parseInt(item.value)"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="3" v-model="role.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-check" @click="submit" :loading="control.loading" v-waves
                           v-has-permission="'role:update'">
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
  getSuperiors, getRole, updateRole
} from '@/api/system/role'

export default {
  name: 'roleEdit',
  data() {
    return {
      id: this.$route.params.id,
      role: {},
      rules: {
        status: [{
          required: true, message: '请选择状态', trigger: 'change'
        }]
      },
      control: {
        statuses: [],
        roles: [],
        loading: false
      }
    }
  },

  methods: {
    submit() {
      this.$refs.role.validate(valid => {
        if (valid) {
          this.control.loading = true

          updateRole(this.role).then(data => {
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
      this.getSuperiors()
      this.getStatuses()
      this.getInfo()
    },

    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'Role',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 查询上级角色
    getSuperiors() {
      getSuperiors().then(data => {
        this.control.roles = data
      }).catch(() => {
      })
    },

    // 查询角色详情
    getInfo() {
      getRole(this.id).then(data => {
        const role = data

        // 移除多余的字段（避免提交修改时报错）
        delete role.updateTime
        delete role.updater

        this.role = role
      }).catch(() => {
      })
    }
  },

  mounted() {
    this.getSuperiors()
    this.getStatuses()
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
