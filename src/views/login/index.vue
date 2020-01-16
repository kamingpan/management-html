<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left" @keydown.enter.native="handleLogin" :style="loginFormMarginTop">

      <div class="title-container">
        <h3 v-if="logo" class="logo" style="text-align: center">
          <img :src="logo" height="200px"/>
        </h3>
        <div style="position: relative">
          <h3 class="title">{{ title }}</h3>
          <language-select class="set-language"></language-select>
        </div>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.username" :placeholder="$t('login.username')" name="username" type="text"
                  auto-complete="on"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" :placeholder="$t('login.password')" name="password"
                  auto-complete="on" @keyup.enter.native="handleLogin"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%; margin-bottom:30px"
                 @click.native.prevent="handleLogin" v-waves>
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>

  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive

import LanguageSelect from '@/components/LanguageSelect'
import {
  usernameExist
} from '@/api/system/login'
import {
  getSystemInformation
} from '@/api/system/system'

export default {
  name: 'Login',
  components: {
    LanguageSelect
  },
  computed: {
    loginFormMarginTop() {
      return 'margin-top: calc((100vh - 300px ' + (this.logo ? '- 200px ' : '') + ') / 2)'
    }
  },
  directives: {
    waves
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      usernameExist(value).then(data => {
        if (!data.result) {
          callback(new Error('用户名不存在'))
          return
        }

        callback()
      }).catch(() => {
      })
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{
          required: true, trigger: 'blur', validator: validateUsername
        }],
        password: [{
          required: true, trigger: 'blur', validator: validatePassword
        }]
      },
      title: '',
      logo: '',
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)

    this.getSystemInformation()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/Login', this.loginForm).then(data => {
            this.loading = false
            this.$router.push({
              path: this.redirect || '/'
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    getSystemInformation() {
      getSystemInformation().then(data => {
        const systemInformation = data

        if (systemInformation.login) {
          this.$router.push({
            path: this.redirect || '/'
          })
          return
        }

        // 设置logo和系统名称
        this.logo = systemInformation.logoUrl
        this.title = systemInformation.name

        // 设置标题头
        document.getElementById('title').innerHTML = systemInformation.name

        // resolver(response)
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      // padding-bottom: 35px;
      margin: auto auto 0 auto;
      overflow: hidden;
    }
    .logo img {
      border-radius: 50%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
</style>
