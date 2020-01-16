<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="configuration" :model="configuration" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="标题：">
                <label class="in-label">{{configuration.title}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="配置键：">
                <label class="in-label">{{configuration.configKey}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="配置值：">
                <label class="in-label">{{configuration.configValue}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="描述：">
                <label class="in-label">{{configuration.description}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{configuration.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{configuration.updateTime}}</label>
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

      <el-col v-if="configuration" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="Configuration" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  getConfiguration
} from '@/api/system/configuration'

export default {
  name: 'configurationInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      configuration: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询配置信息详情
    getInfo() {
      getConfiguration(this.id).then(data => {
        this.configuration = data
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
