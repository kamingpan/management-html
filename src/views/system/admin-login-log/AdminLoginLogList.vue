<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-address-book fa-fw"></i> {{$t('operate.queryCriteria')}}
            </div>
          </template>

          <div class="in-query-body">
            <el-form ref="parameter" :model="parameter" @keydown.enter.native="query">
              <el-row :gutter="20">
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.username" placeholder="用户名"></el-input>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.fullName" placeholder="姓名"></el-input>
                </el-col>
                <el-col :xs="{span: 24}" :sm="{span: 16}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 6}"
                        class="in-query-item">
                  <el-date-picker v-model="control.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                                  end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                  style="width: 100%">
                  </el-date-picker>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-select v-model="parameter.status" filterable clearable placeholder="登录状态" style="width: 100%">
                    <el-option v-for="item in control.statuses" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24" class="text-right">
                  <el-button size="medium" icon="el-icon-delete" @click="reset" v-waves>
                    {{$t('operate.reset')}}
                  </el-button>
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="query" v-waves>
                    {{$t('operate.query')}}
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div>
      <div class="in-data-container">
        <div class="in-data-button" style="margin: 15px">
          <el-button type="success" size="small" icon="el-icon-download" @click="exportExcel" v-waves
                     v-has-permission="'admin-login-log:export'" :loading="control.exportLoading">
            {{$t('operate.export')}}
          </el-button>
        </div>

        <div class="in-data-body" style="margin: 15px">
          <el-table v-loading="control.listLoading" :data="tableList" fit highlightCurrentRow @sort-change="sortChange"
                    style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="头像">
              <template slot-scope="scope">
                <img alt="头像" width="40px" style="border-radius: 10px; margin-bottom: -5px"
                     :src="(scope.row.portrait ? scope.row.portrait : './static/portrait-default.png')"/>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" sortable="custom"></el-table-column>
            <el-table-column prop="fullName" label="姓名" sortable="custom"></el-table-column>
            <el-table-column prop="ip" label="登录ip" sortable="custom"></el-table-column>
            <el-table-column prop="loginTime" label="登录时间" min-width="160px" sortable="custom"></el-table-column>
            <el-table-column prop="status" label="登录状态" sortable="custom">
              <template slot-scope="scope">{{scope.row.statusLabel}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small" v-waves>
                    {{$t('operate.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'admin-login-log:info'">
                      <i class="fa fa-info-circle fa-fw"></i> {{$t('operate.info')}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="in-data-bottom">
          <el-pagination background @size-change="pageSizeChange" @current-change="pageNumChange"
                         :current-page="pager.pageNum" :page-size="pager.pageSize"
                         :total="pager.total" :page-sizes="$pageSizes"
                         layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </div>
      </div>
    </div>

    <div class="dialog-container cropper-container">
      <el-dialog title="日志详情" :visible.sync="control.dialogVisible">
        <el-row>
          <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 4, span: 18}" :md="{offset: 4, span: 14}"
                  :lg="{offset: 6, span: 10}" :xl="{offset: 8, span: 8}">
            <el-form ref="adminLoginLog" :model="adminLoginLog" label-position="right" label-width="110px">
              <el-row>
                <el-col>
                  <el-form-item label="用户名：">
                    <label class="in-label">{{adminLoginLog.username}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="姓名：">
                    <label class="in-label">{{adminLoginLog.fullName}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录时间：">
                    <label class="in-label">{{adminLoginLog.loginTime}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录状态：">
                    <label class="in-label">{{adminLoginLog.statusLabel}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录结果描述：">
                    <label class="in-label">{{adminLoginLog.result}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录ip：">
                    <label class="in-label">{{adminLoginLog.ip}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="真实地址：">
                    <label class="in-label">{{adminLoginLog.address}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录设备：">
                    <label class="in-label">{{adminLoginLog.device}}</label>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="登录浏览器：">
                    <label class="in-label">{{adminLoginLog.browser}}</label>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" v-waves>{{$t('operate.close')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  toOrderBy
} from '@/utils'
import {
  getDataDictionaries
} from '@/api/system/system'
import {
  getAdminLoginLogs, getAdminLoginLog, exportAdminLoginLogs
} from '@/api/system/admin-login-log'

export default {
  name: 'adminLoginLogList',
  data() {
    return {
      parameter: {
        username: '',
        fullName: '',
        status: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      control: {
        queryCollapse: 'queryPanel',
        listLoading: false,
        exportLoading: false,
        statuses: [],
        time: [],
        dialogVisible: false
      },
      tableList: [],
      adminLoginLog: {}
    }
  },
  methods: {
    // 每页数量更改
    pageSizeChange(pageSize) {
      this.pager.pageSize = pageSize
      this.query()
    },

    // 当前页面更改
    pageNumChange(pageNum) {
      this.pager.pageNum = pageNum
      this.query()
    },

    // 排序字段更改
    sortChange(row) {
      // 生成排序字符串
      const orderBy = toOrderBy(row.order, row.prop)

      if (orderBy === null) {
        delete this.pager.orderBy
      } else {
        this.pager.orderBy = orderBy
      }

      this.query()
    },

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'AdminLoginLog',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 查询数据字典列表
    query() {
      this.control.listLoading = true

      // 删除原有的日期参数，并赋值新的日期
      delete this.parameter.beginTime
      delete this.parameter.endTime
      if (this.control.time && this.control.time.length > 0) {
        this.parameter.beginTime = this.control.time[0]
        this.parameter.endTime = this.control.time[1]
      }

      getAdminLoginLogs(this.parameter, this.pager).then(data => {
        this.tableList = data.list
        this.pager = data.pager

        this.control.listLoading = false
      }).catch(() => {
        this.control.listLoading = false
      })
    },

    // 重置查询条件
    reset() {
      this.parameter = {}
      this.control.time = []
    },

    // 导出excel
    exportExcel() {
      this.$confirm('你确认要导出列表吗?', '导出确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        this.control.exportLoading = true

        // 删除原有的日期参数，并赋值新的日期
        delete this.parameter.beginTime
        delete this.parameter.endTime
        if (this.control.time && this.control.time.length > 0) {
          this.parameter.beginTime = this.control.time[0]
          this.parameter.endTime = this.control.time[1]
        }

        exportAdminLoginLogs(this.parameter).then(data => {
          const blobUrl = URL.createObjectURL(new Blob([data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = blobUrl
          link.setAttribute('download', '登录日志列表.xlsx')
          document.body.appendChild(link)
          link.click()
          link.remove()

          this.control.exportLoading = false
        }).catch(() => {
          this.control.exportLoading = false
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },

    // 管理员登录日志详情
    info(id) {
      getAdminLoginLog(id).then(data => {
        this.adminLoginLog = data

        this.control.dialogVisible = true
      }).catch(() => {
      })
    },

    // 关闭对话框
    closeDialog() {
      this.control.dialogVisible = false
      this.adminLoginLog = {}
    }
  },
  mounted() {
    this.getStatuses()
    this.query()
  }
}
</script>

<style scoped>

</style>
