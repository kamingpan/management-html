<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-wechat fa-fw"></i> {{$t('operate.queryCriteria')}}
            </div>
          </template>

          <div class="in-query-body">
            <el-form ref="parameter" :model="parameter" @keydown.enter.native="query">
              <el-row :gutter="20">
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.nickname" placeholder="昵称"></el-input>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-select v-model="parameter.status" filterable clearable placeholder="状态" style="width: 100%">
                    <el-option v-for="item in control.statuses" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.openid" placeholder="openid"></el-input>
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
            <el-table-column prop="portrait" label="头像">
              <template slot-scope="scope">
                <img alt="头像" width="40px" style="border-radius: 10px; margin-bottom: -5px" :src="scope.row.portrait"/>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" sortable="custom"></el-table-column>
            <el-table-column prop="gender" label="性别" sortable="custom">
              <template slot-scope="scope">{{scope.row.genderLabel}}</template>
            </el-table-column>
            <el-table-column prop="status" label="状态" sortable="custom">
              <template slot-scope="scope">{{scope.row.statusLabel}}</template>
            </el-table-column>
            <el-table-column prop="openid" label="openid" sortable="custom"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small" v-waves>
                    {{$t('operate.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'mini-program-user:info'">
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
  getMiniProgramUsers
} from '@/api/system/mini-program-user'

export default {
  name: 'miniProgramUserList',
  data() {
    return {
      parameter: {
        nickname: '',
        status: '',
        openid: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      control: {
        queryCollapse: 'queryPanel',
        listLoading: false,
        statuses: [],
        subscribes: []
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

    // 查询用户列表
    query() {
      this.control.listLoading = true

      getMiniProgramUsers(this.parameter, this.pager).then(data => {
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

    // 用户详情
    info(id) {
      this.$router.push({
        name: 'miniProgramUserInfo',
        params: {
          id: id
        }
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
