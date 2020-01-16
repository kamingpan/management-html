<template>
  <div class="index-container">

    <el-row>
      <el-col class="chart-wrapper" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 14}" :lg="{span: 17}"
              :xl="{span: 19}">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>登录统计</span>
          </div>
          <login-log-line-chart></login-log-line-chart>
        </el-card>
      </el-col>

      <el-col class="chart-wrapper" :xs="{span: 24}" :sm="{span: 24}" :md="{span: 10}" :lg="{span: 7}" :xl="{span: 5}">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>最近登录</span>
          </div>
          <div class="admin-login-log-container">
            <div class="admin-login-log-row" v-for="loginLog in loginLogs" v-bind:key="loginLog.id">
              <div class="img-pull-left">
                <img class="img-circle"
                     :src="loginLog.portrait ? loginLog.portrait : './static/portrait-default.png'"/>
              </div>
              <div class="admin-login-log-body">
                <strong>{{loginLog.fullName}}</strong> 从 <strong>{{loginLog.ip}}</strong> 登录了系统
                <br>
                <small class="text-muted">{{loginLog.loginTime}}</small>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import LoginLogLineChart from './components/LoginLogLineChart'

import {
  getLastAdminLoginLog
} from '@/api/system/admin-login-log'

export default {
  name: 'index',
  components: {
    LoginLogLineChart
  },
  data() {
    return {
      loginLogs: []
    }
  },
  methods: {
    // 查询状态列表
    getLoginLogs() {
      getLastAdminLoginLog().then(data => {
        this.loginLogs = data
      }).catch(() => {
      })
    }
  },
  mounted() {
    this.getLoginLogs()
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index-container {
    padding: 16px;
    // background-color: rgb(240, 242, 245);

    .chart-wrapper {
      background: #fff;
      padding: 16px;
    }

    .admin-login-log-container {

      .admin-login-log-row {
        margin-bottom: 15px;
      }

      .img-pull-left {
        float: left;
        height: 45px;
        margin-right: 10px;
      }

      .img-circle {
        border-radius: 50%;
        width: 38px;
        height: 38px;
      }

      .admin-login-log-body {
        font-size: 12px;
        line-height: 20px;
        color: #676a6c;
      }
    }
  }
</style>
