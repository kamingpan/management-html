<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-mobile fa-fw"></i> {{$t('operate.queryCriteria')}}
            </div>
          </template>

          <div class="in-query-body">
            <el-form ref="parameter" :model="parameter" @keydown.enter.native="query">
              <el-row :gutter="20">
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.name" placeholder="客户端名称"></el-input>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.clientId" placeholder="客户端id"></el-input>
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
          <el-button type="primary" size="small" icon="el-icon-plus" @click="add" v-waves
                     v-has-permission="'oauth-client:insert'">
            {{$t('operate.add')}}
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" :disabled="this.control.selected.length <= 0"
                     v-if="true" @click="removes" v-has-permission="'oauth-client:delete'" v-waves>
            {{$t('operate.batchDelete')}}
          </el-button>
        </div>

        <div class="in-data-body" style="margin: 15px">
          <el-table v-loading="control.listLoading" :data="tableList" fit highlightCurrentRow
                    @selection-change="selectionChange" @sort-change="sortChange" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="客户端名称" sortable="custom"></el-table-column>
            <el-table-column prop="clientId" label="客户端id" sortable="custom"></el-table-column>
            <el-table-column prop="clientSecret" label="客户端密钥" sortable="custom"></el-table-column>
            <el-table-column prop="updater" label="修改人" sortable="custom"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160px" sortable="custom"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small" v-waves>
                    {{$t('operate.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'oauth-client:info'">
                      <i class="fa fa-info-circle fa-fw"></i> {{$t('operate.info')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="edit(scope.row.id)" v-has-permission="'oauth-client:update'">
                      <i class="fa fa-edit fa-fw"></i> {{$t('operate.edit')}}
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="remove(scope.row)"
                                      v-has-permission="'oauth-client:delete'">
                      <i class="fa fa-trash fa-fw"></i> {{$t('operate.delete')}}
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
  getOauthClients, deleteOauthClient, deleteOauthClients
} from '@/api/system/oauth-client'

export default {
  name: 'oauthClientList',
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value)
    }
  },
  data() {
    return {
      parameter: {
        name: '',
        clientId: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      control: {
        queryCollapse: 'queryPanel',
        listLoading: false,
        selected: [],
        filterText: ''
      },
      tableList: [],
      dialogVisible: false
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

    // 行数选择更改
    selectionChange(row) {
      this.control.selected = row
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

    // 查询授权客户端列表
    query() {
      this.control.listLoading = true

      getOauthClients(this.parameter, this.pager).then(data => {
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
    },

    // 授权客户端添加
    add() {
      this.$router.push({
        name: 'oauthClientAdd'
      })
    },

    // 授权客户端详情
    info(id) {
      this.$router.push({
        name: 'oauthClientInfo',
        params: {
          id: id
        }
      })
    },

    // 授权客户端编辑
    edit(id) {
      this.$router.push({
        name: 'oauthClientEdit',
        params: {
          id: id
        }
      })
    },

    // 授权客户端删除
    remove(row) {
      this.$confirm('你确认要删除客户端“' + row.name + '”吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deleteOauthClient(row.id).then(data => {
          this.$message({
            message: this.$t('operate.deleteSuccess'),
            type: 'success'
          })

          this.query()
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },

    // 授权客户端批量删除
    removes() {
      const ids = []
      this.control.selected.forEach(row => {
        ids.push(row.id)
      })

      this.$confirm('你确认要删除选中的“' + ids.length + '”行数据吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deleteOauthClients(ids).then(data => {
          this.$message({
            message: this.$t('operate.batchDeleteSuccess'),
            type: 'success'
          })

          this.query()
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },

    filterNode(value, data) {
      if (!value) {
        return true
      }

      return data.name.indexOf(value) !== -1
    }
  },
  mounted() {
    this.query()
  },
  computed: {
    filterText() {
      return this.control.filterText
    }
  }
}
</script>

<style scoped>
  .el-dialog__body {
    padding-top: 10px
  }
</style>
