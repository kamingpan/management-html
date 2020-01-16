<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 4, span: 16}" :md="{offset: 5, span: 14}"
              :lg="{offset: 7, span: 10}" :xl="{offset: 9, span: 6}">
        <el-form ref="subscriptionUser" :model="subscriptionUser" label-position="right" label-width="130px">
          <el-row>
            <el-col v-if="subscriptionUser.registeredUserId">
              <el-form-item label="关联用户：">
                <label class="in-label">
                  <a @click="userInfo(subscriptionUser.registeredUserId)">点击查看详情</a>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="昵称：">
                <label class="in-label">{{subscriptionUser.nickname}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="头像：">
                <label class="in-label">
                  <img alt="头像" height="64px" :src="subscriptionUser.portrait"/>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="电子邮箱：">
                <label class="in-label">{{subscriptionUser.email}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="手机号码：">
                <label class="in-label">{{subscriptionUser.mobile}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="性别：">
                <label class="in-label">{{subscriptionUser.genderLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="地址信息：">
                <label class="in-label">
                  {{subscriptionUser.country + subscriptionUser.province + subscriptionUser.city}}
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="openid：">
                <label class="in-label">{{subscriptionUser.openid}}</label>
              </el-form-item>
            </el-col>
            <el-col v-if="subscriptionUser.unionId">
              <el-form-item label="union id：">
                <label class="in-label">{{subscriptionUser.unionId}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="公众号关注状态：">
                <label class="in-label">{{subscriptionUser.subscribedLabel}}</label>
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
  getSubscriptionUser
} from '@/api/system/subscription-user'

export default {
  name: 'subscriptionUserInfo',
  data() {
    return {
      id: this.$route.params.id,
      subscriptionUser: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询用户详情
    getInfo() {
      getSubscriptionUser(this.id).then(data => {
        this.subscriptionUser = data
      }).catch(() => {
      })
    },

    // 跳转到用户详情
    userInfo(id) {
      this.$router.push({
        name: 'userInfo',
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
