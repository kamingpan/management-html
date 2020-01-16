<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="oauthClient" :model="oauthClient" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="客户端名称：">
                <label class="in-label">{{oauthClient.name}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="客户端id：">
                <label class="in-label">{{oauthClient.clientId}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="客户端密钥：">
                <label class="in-label">{{oauthClient.clientSecret}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{oauthClient.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{oauthClient.updateTime}}</label>
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

      <el-col v-if="oauthClient" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="OauthClient" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  getOauthClient
} from '@/api/system/oauth-client'

export default {
  name: 'oauthClientInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      oauthClient: {}
    }
  },
  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询授权客户端详情
    getInfo() {
      getOauthClient(this.id).then(data => {
        this.oauthClient = data
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
