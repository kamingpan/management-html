<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="admin" :model="admin" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="用户名：">
                <label class="in-label">{{admin.username}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态：">
                <label class="in-label">{{admin.statusLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="姓名：">
                <label class="in-label">{{admin.fullName}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="性别：">
                <label class="in-label">{{admin.genderLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="手机号码：">
                <label class="in-label">{{admin.phone}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="邮箱：">
                <label class="in-label">{{admin.email}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="限制ip：">
                <label class="in-label">{{admin.restrictIp}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{admin.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{admin.updateTime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="danger" icon="el-icon-circle-close" @click="close" v-waves>
                  {{$t('operate.close')}}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col v-if="admin" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="Admin" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  getAdmin
} from '@/api/system/admin'

export default {
  name: 'adminInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      admin: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询管理员详情
    getInfo() {
      getAdmin(this.id).then(data => {
        this.admin = data
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
