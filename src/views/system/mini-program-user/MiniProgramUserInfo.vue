<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 4, span: 16}" :md="{offset: 5, span: 14}"
              :lg="{offset: 7, span: 10}" :xl="{offset: 9, span: 6}">
        <el-form ref="miniProgramUser" :model="miniProgramUser" label-position="right" label-width="130px">
          <el-row>
            <el-col v-if="miniProgramUser.registeredUserId">
              <el-form-item label="关联用户：">
                <label class="in-label">
                  <a @click="userInfo(miniProgramUser.registeredUserId)">点击查看详情</a>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="昵称：">
                <label class="in-label">{{miniProgramUser.nickname}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="头像：">
                <label class="in-label">
                  <img alt="头像" height="64px" :src="miniProgramUser.portrait"/>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="电子邮箱：">
                <label class="in-label">{{miniProgramUser.email}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="手机号码：">
                <label class="in-label">{{miniProgramUser.mobile}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="性别：">
                <label class="in-label">{{miniProgramUser.genderLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="地址信息：">
                <label class="in-label">
                  {{miniProgramUser.country + miniProgramUser.province + miniProgramUser.city}}
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="openid：">
                <label class="in-label">{{miniProgramUser.openid}}</label>
              </el-form-item>
            </el-col>
            <el-col v-if="miniProgramUser.unionId">
              <el-form-item label="union id：">
                <label class="in-label">{{miniProgramUser.unionId}}</label>
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
  getMiniProgramUser
} from '@/api/system/mini-program-user'

export default {
  name: 'miniProgramUserInfo',
  data() {
    return {
      id: this.$route.params.id,
      miniProgramUser: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询用户详情
    getInfo() {
      getMiniProgramUser(this.id).then(data => {
        this.miniProgramUser = data
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
