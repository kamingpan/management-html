<template>
  <div class="operate-panel" v-if="operateLogs.length > 0">
    <div class="operate-title">
      <i class="el-icon-document"></i> {{$t('operate.operateLog')}}
    </div>
    <el-collapse v-model="operateCollapse" v-for="operateLog in operateLogs" :key="operateLog.id">
      <el-collapse-item>
        <template slot="title">
          <div class="operate-container">
            <div class="img-pull-left">
              <img class="img-circle"
                   :src="operateLog.portrait ? operateLog.portrait : './static/portrait-default.png'"/>
            </div>
            <div class="operate-body">
              由 <strong>{{operateLog.operator}}</strong> {{operateLog.type}}<br/>
              <small>{{operateLog.operateTime}}</small>
            </div>
          </div>
        </template>
        <div class="operate-content" v-if="operateLog.content" v-html="operateLog.content"></div>
        <div class="operate-content" v-else style="margin-top: -40px;"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getOperateLogs } from '@/api/system/system'

export default {
  name: 'operateLog',
  props: ['belong', 'belongId', 'order'],
  data() {
    return {
      operateLogs: [],
      operateCollapse: 'operateCollapse'
    }
  },
  methods: {
    getList() {
      if (this.belongId && this.belong) {
        getOperateLogs(
          {
            belong: this.belong,
            belongId: this.belongId,
            orderType: this.order ? this.order : ''
          }).then(data => {
          this.operateLogs = data
        }).catch(() => {
        })
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>
  .operate-panel .el-collapse {
    border-bottom: 0px;
  }

  .operate-panel .el-collapse-item__header {
    height: auto;
  }

  .operate-panel .el-collapse-item__content {
    padding-bottom: 18px;
  }

  .operate-panel {
    background-color: #fff;
    color: inherit;
    border-color: #e7eaec;
    -webkit-border-image: none;
    -o-border-image: none;
    border-image: none;
  }

  .operate-panel .operate-title {
    font-size: 14px;
    line-height: 24px;
    color: #676a6c;
    padding: 8px;
  }

  .operate-panel .operate-container {
    margin: 10px;
    width: 100%;
  }

  .operate-panel .operate-container .img-pull-left {
    float: left;
    height: 38px;
    margin-right: 10px;
  }

  .operate-panel .operate-container .img-circle {
    border-radius: 50%;
    width: 38px;
    height: 38px;
  }

  .operate-panel .operate-body {
    font-size: 12px;
    line-height: 20px;
    color: #676a6c;
    min-width: 220px;
  }

  .operate-panel .operate-content {
    border: 1px solid #e7eaec;
    box-shadow: none;
    margin: 0px 18px;
    padding: 10px 15px;
    font-size: 11px;
    line-height: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
</style>
