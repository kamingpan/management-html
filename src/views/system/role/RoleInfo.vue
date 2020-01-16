<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="role" :model="role" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="角色名称：">
                <label class="in-label">{{role.name}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="上级角色：">
                <label class="in-label">{{role.superiorName ? role.superiorName : '无'}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态：">
                <label class="in-label">{{role.statusLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注：">
                <label class="in-label">{{role.remark}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{role.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{role.updateTime}}</label>
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

      <el-col v-if="role" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="Role" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  getRole
} from '@/api/system/role'

export default {
  name: 'roleInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      role: {}
    }
  },
  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询角色详情
    getInfo() {
      getRole(this.id).then(data => {
        this.role = data
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
