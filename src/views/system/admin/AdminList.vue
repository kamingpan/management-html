<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-user-circle fa-fw"></i> {{$t('operate.queryCriteria')}}
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
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.fullName" placeholder="姓名"></el-input>
                </el-col>
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.phone" placeholder="手机号码"></el-input>
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
                     v-has-permission="'admin:insert'">
            {{$t('operate.add')}}
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" :disabled="this.control.selected.length <= 0"
                     @click="removes" v-has-permission="'admin:delete'" v-waves>
            {{$t('operate.batchDelete')}}
          </el-button>
        </div>

        <div class="in-data-body" style="margin: 15px">
          <el-table v-loading="control.listLoading" :data="tableList" fit highlightCurrentRow
                    @selection-change="selectionChange" @sort-change="sortChange" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="头像">
              <template slot-scope="scope">
                <img alt="头像" width="40px" style="border-radius: 10px; margin-bottom: -5px"
                     :src="(scope.row.portrait ? scope.row.portrait : './static/portrait-default.png')"/>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" sortable="custom"></el-table-column>
            <el-table-column prop="fullName" label="姓名" sortable="custom"></el-table-column>
            <el-table-column prop="phone" label="手机号码" min-width="110px" sortable="custom"></el-table-column>
            <el-table-column prop="status" label="状态" sortable="custom">
              <template slot-scope="scope">{{scope.row.statusLabel}}</template>
            </el-table-column>
            <el-table-column prop="updater" label="修改人" sortable="custom"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160px" sortable="custom"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="primary" size="small" v-waves>
                    {{$t('operate.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'admin:info'">
                      <i class="fa fa-info-circle fa-fw"></i> {{$t('operate.info')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="edit(scope.row.id)" v-has-permission="'admin:update'"
                                      v-if="scope.row.username != 'admin'">
                      <i class="fa fa-edit fa-fw"></i> {{$t('operate.edit')}}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status === 1" @click.native="enable(scope.row)"
                                      v-has-permission="'admin:enable'">
                      <i class="fa fa-check-circle-o fa-fw"></i> {{$t('operate.enable')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="disable(scope.row)" v-has-permission="'admin:disable'"
                                      v-if="scope.row.status === 0 && scope.row.username != 'admin'">
                      <i class="fa fa-ban fa-fw"></i> {{$t('operate.disable')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="resetPassword(scope.row)" v-has-permission="'admin:reset-password'"
                                      v-if="scope.row.username != 'admin'">
                      <i class="fa fa-undo fa-fw"></i> {{$t('operate.resetPassword')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="showAssignRoleDialog(scope.row)"
                                      v-has-permission="'admin:role'" v-if="scope.row.username != 'admin'">
                      <i class="fa fa-id-card fa-fw"></i> 分配角色
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="remove(scope.row)" v-has-permission="'admin:delete'"
                                      v-if="scope.row.username != 'admin'">
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

    <div class="dialog-container">
      <el-dialog title="分配角色" :visible.sync="dialogVisible">
        <el-row style="margin-bottom: 15px">
          <el-col>
            <el-input placeholder="输入关键字进行过滤" v-model="control.filterText">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-tree class="filter-tree" :data="control.roles" node-key="id" :props="control.defaultProps"
                     default-expand-all show-checkbox :check-strictly="true"
                     :filter-node-method="filterNode" ref="tree">
              <span class="custom-tree-node" slot-scope="{node}">
                <i :class="'fa ' + node.data.icon + ' fa-fw'"></i> {{node.data.name}}
              </span>
            </el-tree>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="assignRole" v-has-permission="'admin:role'" :loading="control.roleLoading"
                     v-waves>
            {{$t('operate.save')}}
          </el-button>
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
  getAllRoles
} from '@/api/system/role'
import {
  getDataDictionaries
} from '@/api/system/system'
import {
  getAdmins,
  deleteAdmin,
  deleteAdmins,
  enableAdmin,
  disableAdmin,
  resetPassword,
  assignRole
} from '@/api/system/admin'

export default {
  name: 'adminList',
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value)
    }
  },
  data() {
    return {
      parameter: {
        username: '',
        status: '',
        fullName: '',
        phone: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      control: {
        queryCollapse: 'queryPanel',
        listLoading: false,
        roleLoading: false,
        statuses: [],
        selected: [],
        filterText: '',
        roles: [],
        chooseRow: null,
        defaultProps: {
          children: 'children',
          label: 'name',
          icon: 'icon'
        }
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

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'Admin',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 查询管理员列表
    query() {
      this.control.listLoading = true

      getAdmins(this.parameter, this.pager).then(data => {
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

    // 管理员添加
    add() {
      this.$router.push({
        name: 'adminAdd'
      })
    },

    // 管理员详情
    info(id) {
      this.$router.push({
        name: 'adminInfo',
        params: {
          id: id
        }
      })
    },

    // 管理员编辑
    edit(id) {
      this.$router.push({
        name: 'adminEdit',
        params: {
          id: id
        }
      })
    },

    // 管理员删除
    remove(row) {
      this.$confirm('你确认要删除“' + row.username + '（' + row.fullName + '）”吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deleteAdmin(row.id).then(data => {
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

    // 管理员批量删除
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
        deleteAdmins(ids).then(data => {
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

    // 管理员启用
    enable(row) {
      this.$confirm('你确认要启用“' + row.username + '（' + row.fullName + '）”吗?', '启用确认', {
        type: 'info',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        enableAdmin(row.id).then(data => {
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

    // 管理员禁用
    disable(row) {
      this.$confirm('你确认要禁用“' + row.username + '（' + row.fullName + '）”吗?', '禁用确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        disableAdmin(row.id).then(data => {
          this.$alert(data, this.$t('operate.disableResult')).then(() => {
            this.query()
          }).catch(() => {
            this.query()
          })
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },

    // 重置管理员密码
    resetPassword(row) {
      this.$confirm('你确认要重置“' + row.username + '（' + row.fullName + '）”的密码吗?', '重置密码确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        resetPassword(row.id).then(data => {
          this.$alert(data, this.$t('operate.resetPasswordResult'))
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    },

    // 显示分配角色对话框
    showAssignRoleDialog(row) {
      getAllRoles(row.id).then(data => {
        this.control.chooseRow = row
        this.control.roles = data.roles

        this.$nextTick(() => {
          // 把已分配的角色在节点中选中
          this.$refs.tree.setCheckedKeys(data.ids)
        })

        this.dialogVisible = true
      }).catch(() => {
      })
    },

    // 关闭对话框
    closeDialog() {
      this.control.chooseRow = null
      this.dialogVisible = false
    },

    filterNode(value, data) {
      if (!value) {
        return true
      }

      return data.name.indexOf(value) !== -1
    },

    // 管理员分配角色
    assignRole() {
      this.control.roleLoading = true

      const roles = this.$refs.tree.getCheckedKeys()
      const row = this.control.chooseRow

      if (!roles || roles.length <= 0) {
        this.$confirm('你确认要移除“' + row.username + '（' + row.fullName + '）”的所有角色吗?', '移除确认', {
          type: 'warning',
          confirmButtonText: this.$t('operate.confirm'),
          cancelButtonText: this.$t('operate.cancel')
        }).then(() => {
          assignRole(row.id, roles).then(data => {
            this.$message({
              message: this.$t('operate.submitSuccess'),
              type: 'success'
            })

            this.closeDialog()
            this.control.roleLoading = false
          }).catch(() => {
            // 取消
            this.control.roleLoading = false
          })
        }).catch(() => {
          // 取消
          this.control.roleLoading = false
        })
      } else {
        assignRole(row.id, roles).then(data => {
          this.$message({
            message: this.$t('operate.submitSuccess'),
            type: 'success'
          })

          this.closeDialog()
          this.control.roleLoading = false
        }).catch(() => {
          this.control.roleLoading = false
        })
      }
    }
  },
  mounted() {
    this.query()
    this.getStatuses()
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
    padding-top: 10px;
  }
</style>
