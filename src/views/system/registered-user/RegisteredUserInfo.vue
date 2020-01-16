<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 4, span: 16}" :md="{offset: 5, span: 14}"
              :lg="{offset: 7, span: 10}" :xl="{offset: 9, span: 6}">
        <el-form ref="registeredUser" :model="registeredUser" label-position="right" label-width="130px">
          <el-row>
            <el-col>
              <el-form-item label="用户名：">
                <label class="in-label">{{registeredUser.username}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态：">
                <label class="in-label">{{registeredUser.statusLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col v-if="registeredUser.subscriptionUserId">
              <el-form-item label="关联公众号用户：">
                <label class="in-label">
                  <a @click="subscriptionUserInfo(registeredUser.subscriptionUserId)">点击查看详情</a>
                </label>
              </el-form-item>
            </el-col>
            <el-col v-if="registeredUser.miniProgramUserId">
              <el-form-item label="关联小程序用户：">
                <label class="in-label">
                  <a @click="miniProgramUserInfo(registeredUser.miniProgramUserId)">点击查看详情</a>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{registeredUser.updateTime}}</label>
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
    </el-row>
  </div>
</template>

<script>
import {
  getRegisteredUser
} from '@/api/system/registered-user'

export default {
  name: 'registeredUserInfo',
  data() {
    return {
      id: this.$route.params.id,
      registeredUser: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询用户详情
    getInfo() {
      getRegisteredUser(this.id).then(data => {
        this.registeredUser = data
      }).catch(() => {
      })
    },

    // 跳转到公众号用户详情
    subscriptionUserInfo(id) {
      this.$router.push({
        name: 'subscriptionUserInfo',
        params: {
          id: id
        }
      })

      return false
    },

    // 跳转到小程序用户详情
    miniProgramUserInfo(id) {
      this.$router.push({
        name: 'miniProgramUserInfo',
        params: {
          id: id
        }
      })

      return false
    }
  },

  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
  a {
    color: #0000CC;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
