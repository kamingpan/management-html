<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-user fa-fw"></i> {{$t('operate.queryCriteria')}}
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
                  <el-select v-model="parameter.status" filterable clearable placeholder="状态" style="width: 100%">
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
        </div>

        <div class="in-data-body" style="margin: 15px">
          <el-table v-loading="control.listLoading" :data="tableList" fit highlightCurrentRow
                    @sort-change="sortChange" style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="username" label="用户名" sortable="custom"></el-table-column>
            <el-table-column prop="status" label="状态" sortable="custom">
              <template slot-scope="scope">{{scope.row.statusLabel}}</template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160px" sortable="custom"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small" v-waves>
                    {{$t('operate.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'registered-user:info'">
                      <i class="fa fa-info-circle fa-fw"></i> {{$t('operate.info')}}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status === 1" @click.native="enable(scope.row)"
                                      v-has-permission="'user:enable'">
                      <i class="fa fa-check-circle-o fa-fw"></i> {{$t('operate.enable')}}
                    </el-dropdown-item>
                    <el-dropdown-item v-else @click.native="disable(scope.row)"
                                      v-has-permission="'user:disable'">
                      <i class="fa fa-ban fa-fw"></i> {{$t('operate.disable')}}
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
  enableUser, disableUser
} from '@/api/system/user'
import {
  getRegisteredUsers
} from '@/api/system/registered-user'

export default {
  name: 'registeredUserList',
  data() {
    return {
      parameter: {
        username: '',
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
        statuses: []
      },
      tableList: []
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
        'clazz': 'User',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },
    // 查询注册用户列表
    query() {
      this.control.listLoading = true

      getRegisteredUsers(this.parameter, this.pager).then(data => {
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
      this.getStatuses()
    },
    // 注册用户详情
    info(id) {
      this.$router.push({
        name: 'registeredUserInfo',
        params: {
          id: id
        }
      })
    },
    // 用户启用
    enable(row) {
      const confirmMessage = row.username ? ('你确认要启用“' + row.username + '”吗?') : '你确认要启用该用户吗?'
      this.$confirm(confirmMessage, '启用确认', {
        type: 'info',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        enableUser(row.userId).then(() => {
          this.$message({
            message: this.$t('operate.enableSuccess'),
            type: 'success'
          })

          this.query()
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },
    // 用户禁用
    disable(row) {
      const confirmMessage = row.username ? ('你确认要禁用“' + row.username + '”吗?') : '你确认要禁用该用户吗?'
      this.$confirm(confirmMessage, '禁用确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        disableUser(row.userId).then(data => {
          this.$message({
            message: this.$t('operate.disableSuccess'),
            type: 'success'
          })

          this.query()
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    }
  },
  mounted() {
    this.query()
    this.getStatuses()
  }
}
</script>

<style scoped>

</style>
