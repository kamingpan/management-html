<template>
  <div class="app-container">
    <div>
      <el-collapse v-model="control.queryCollapse">
        <el-collapse-item name="queryPanel">
          <template slot="title">
            <div class="in-query-header">
              <i class="fa fa-id-card fa-fw"></i> {{$t('operate.queryCriteria')}}
            </div>
          </template>

          <div class="in-query-body">
            <el-form ref="parameter" :model="parameter" @keydown.enter.native="query">
              <el-row :gutter="20">
                <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}"
                        class="in-query-item">
                  <el-input v-model="parameter.name" placeholder="角色名称"></el-input>
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
                  <el-input v-model="parameter.level" placeholder="级别"></el-input>
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
                     v-has-permission="'role:insert'">
            {{$t('operate.add')}}
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" :disabled="this.control.selected.length <= 0"
                     v-if="true" @click="removes" v-has-permission="'role:delete'" v-waves>
            {{$t('operate.batchDelete')}}
          </el-button>
        </div>

        <div class="in-data-body" style="margin: 15px">
          <el-table v-loading="control.listLoading" :data="tableList" fit highlightCurrentRow
                    @selection-change="selectionChange" @sort-change="sortChange" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="角色名称" sortable="custom"></el-table-column>
            <el-table-column prop="level" label="级别" sortable="custom"></el-table-column>
            <el-table-column prop="superior" label="上级角色" sortable="custom">
              <template slot-scope="scope">{{scope.row.superiorName}}</template>
            </el-table-column>
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
                    <el-dropdown-item @click.native="info(scope.row.id)" v-has-permission="'role:info'">
                      <i class="fa fa-info-circle fa-fw"></i> {{$t('operate.info')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="edit(scope.row.id)" v-has-permission="'role:update'">
                      <i class="fa fa-edit fa-fw"></i> {{$t('operate.edit')}}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status === 1" @click.native="enable(scope.row)"
                                      v-has-permission="'role:enable'">
                      <i class="fa fa-check-circle-o fa-fw"></i> {{$t('operate.enable')}}
                    </el-dropdown-item>
                    <el-dropdown-item v-else @click.native="disable(scope.row)" v-has-permission="'role:disable'">
                      <i class="fa fa-ban fa-fw"></i> {{$t('operate.disable')}}
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="showGrantPermissionDialog(scope.row)"
                                      v-has-permission="'role:permission'">
                      <i class="fa fa-user-secret fa-fw"></i> 授予权限
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="remove(scope.row)" v-has-permission="'role:delete'">
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
      <el-dialog title="授予权限" :visible.sync="dialogVisible">
        <el-row style="margin-bottom: 15px">
          <el-col>
            <el-input placeholder="输入关键字进行过滤" v-model="control.filterText">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-tree class="filter-tree" :data="control.permissions" node-key="id" :props="control.defaultProps"
                     default-expand-all show-checkbox :check-strictly="true" @check-change="handleCheckChange"
                     :filter-node-method="filterNode" ref="tree">
              <span class="custom-tree-node" slot-scope="{node}">
                <i :class="'fa ' + node.data.icon + ' fa-fw'"></i> {{node.data.name}}
              </span>
            </el-tree>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="grantPermission" v-has-permission="'role:permission'"
                     :loading="control.permissionLoading" v-waves>
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
  getDataDictionaries
} from '@/api/system/system'
import {
  getAllPermissions
} from '@/api/system/permission'
import {
  getRoles,
  deleteRole,
  deleteRoles,
  enableRole,
  disableRole,
  grantPermission
} from '@/api/system/role'

export default {
  name: 'roleList',
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value)
    }
  },
  data() {
    return {
      parameter: {
        name: '',
        status: '',
        level: ''
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      control: {
        queryCollapse: 'queryPanel',
        listLoading: false,
        permissionLoading: false,
        statuses: [],
        selected: [],
        filterText: '',
        permissions: [],
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
        'clazz': 'Role',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 查询角色列表
    query() {
      this.control.listLoading = true

      getRoles(this.parameter, this.pager).then(data => {
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

    // 角色添加
    add() {
      this.$router.push({
        name: 'roleAdd'
      })
    },

    // 角色详情
    info(id) {
      this.$router.push({
        name: 'roleInfo',
        params: {
          id: id
        }
      })
    },

    // 角色编辑
    edit(id) {
      this.$router.push({
        name: 'roleEdit',
        params: {
          id: id
        }
      })
    },

    // 角色删除
    remove(row) {
      this.$confirm('你确认要删除角色“' + row.name + '”吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deleteRole(row.id).then(data => {
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

    // 角色批量删除
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
        deleteRoles(ids).then(data => {
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

    // 角色启用
    enable(row) {
      this.$confirm('你确认要启用“' + row.name + '”吗?', '启用确认', {
        type: 'info',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        enableRole(row.id).then(data => {
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

    // 角色禁用
    disable(row) {
      this.$confirm('你确认要禁用“' + row.name + '”吗?', '禁用确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        disableRole(row.id).then(() => {
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
    },

    // 显示授予权限对话框
    showGrantPermissionDialog(row) {
      getAllPermissions(row.id).then(data => {
        this.control.chooseRow = row
        this.control.permissions = data.permissions

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

    // 点击选中节点
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.chooseAllSuperiorNode(data)
      } else {
        this.cancelAllChildrenNode(data)
      }
    },

    // 选中所有的父节点
    chooseAllSuperiorNode(data) {
      // 如果是最高节点，则直接结束
      if (!data || data.superior === '0') {
        return
      }

      // 获取父节点，并且选中，然后将父节点的数据进行递归，将所有父节点全部选中
      const node = this.$refs.tree.getNode(data.superior)
      this.$refs.tree.setChecked(node, true, false)
      this.chooseAllSuperiorNode(node.data)
    },

    // 取消所有的子节点
    cancelAllChildrenNode(data) {
      // 如果是最低节点，则直接结束
      if (!data || !data.children || data.children.length <= 0) {
        return
      }

      // 获取子节点，取消选中，然后将子节点的数据进行递归，将所有子节点全部取消选中
      for (const node of data.children) {
        this.$refs.tree.setChecked(node, false, true)
      }
    },

    filterNode(value, data) {
      if (!value) {
        return true
      }

      return data.name.indexOf(value) !== -1
    },

    // 角色授予权限
    grantPermission(id) {
      this.control.permissionLoading = true

      const permissions = this.$refs.tree.getCheckedKeys()
      const row = this.control.chooseRow

      if (!permissions || permissions.length <= 0) {
        this.$confirm('你确认要移除“' + row.name + '”的所有权限吗?', '移除确认', {
          type: 'warning',
          confirmButtonText: this.$t('operate.confirm'),
          cancelButtonText: this.$t('operate.cancel')
        }).then(() => {
          grantPermission(row.id, permissions).then(data => {
            this.$message({
              message: this.$t('operate.submitSuccess'),
              type: 'success'
            })

            this.closeDialog()
            this.control.permissionLoading = false
          }).catch(() => {
            // 取消
            this.control.permissionLoading = false
          })
        }).catch(() => {
          // 取消
          this.control.permissionLoading = false
        })
      } else {
        grantPermission(row.id, permissions).then(data => {
          this.$message({
            message: this.$t('operate.submitSuccess'),
            type: 'success'
          })

          this.closeDialog()
          this.control.permissionLoading = false
        }).catch(() => {
          // 取消
          this.control.permissionLoading = false
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
    padding-top: 10px
  }
</style>
