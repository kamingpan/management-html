<template>
  <div class="app-container permission-list-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}"
              style="margin-bottom: 30px">
        <el-collapse v-model="control.queryCollapse">
          <el-collapse-item name="queryPanel">
            <template slot="title">
              <div class="in-query-header">
                <i class="fa fa-user-secret fa-fw"></i> 权限列表
              </div>
            </template>

            <el-row>
              <el-col>
                <div class="in-query-body">
                  <el-input placeholder="输入关键字进行过滤" v-model="control.filterText" size="small"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="in-query-body">
                  <el-tree class="filter-tree" :data="control.permissions" node-key="id" :props="control.defaultProps"
                           :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                    <span class="custom-tree-node" slot-scope="{node}">
                      <i :class="'fa ' + node.data.icon + ' fa-fw'"></i> {{node.data.name}}
                    </span>
                  </el-tree>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :xs="{span: 23, offset: 1}" :sm="{span: 15, offset: 1}" :md="{span: 15, offset: 1}"
              :lg="{span: 17, offset: 1}" :xl="{span: 19, offset: 1}">
        <div>
          <el-row style="margin-bottom: 30px">
            <el-col>
              <el-button type="primary" size="small" icon="el-icon-plus" @click="add" v-waves
                         v-has-permission="'permission:insert'">{{$t('operate.add')}}
              </el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="remove" v-waves
                         v-has-permission="'permission:delete'" :disabled="!permission || !permission.id">
                {{$t('operate.delete')}}
              </el-button>
              <el-button size="small" icon="el-icon-edit-outline" @click="edit" v-waves
                         v-has-permission="'permission:update'" :disabled="!permission || !permission.id">
                {{$t('operate.edit')}}
              </el-button>
            </el-col>
          </el-row>

          <!-- 添加面板 -->
          <el-row v-show="control.showPanel === 1">
            <el-col>
              <el-form ref="permissionAddFrom" :model="permissionAdd" label-position="right" label-width="110px"
                       :rules="rules" @keydown.enter.native="insert">
                <el-row>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="权限名称：" prop="name">
                      <el-input v-model="permissionAdd.name" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="所属模块：" prop="moduleId">
                      <el-select v-model="permissionAdd.moduleId" filterable clearable placeholder="请选择模块"
                                 @change="handleModuleChange">
                        <el-option v-for="item in control.modules" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="上级权限：" prop="superior">
                      <el-select v-model="permissionAdd.superior" filterable clearable placeholder="请选择上级权限">
                        <el-option v-for="item in control.addSuperiors" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="图标：" prop="icon">
                      <el-input placeholder="请选择图标" v-model="permissionAdd.icon" :readonly="true">
                        <template slot="prepend">
                          <i :class="'fa ' + permissionAdd.icon + ' fa-fw'"></i>
                        </template>
                      </el-input>
                    </el-form-item>

                    <div style="margin: 0px 0px 25px 110px">
                      <font-awesome-picker v-on:selectIcon="chooseIcon"
                                           seachbox="输入关键字进行过滤"></font-awesome-picker>
                    </div>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="权限字符串：" prop="authentication">
                      <el-input v-model="permissionAdd.authentication" placeholder="请输入权限字符串"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="排序：" prop="sort">
                      <el-input v-model="permissionAdd.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="请求方法：" prop="method">
                      <el-select v-model="permissionAdd.method" filterable clearable placeholder="请选择请求方法">
                        <el-option v-for="item in control.methods" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="备注：">
                      <el-input type="textarea" :rows="3" v-model="permissionAdd.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" icon="el-icon-circle-check" @click="insert" :loading="control.loading"
                                 v-has-permission="'permission:insert'" v-waves>{{$t('operate.save')}}
                      </el-button>
                      <el-button icon="el-icon-delete" @click="reset" v-waves>{{$t('operate.reset')}}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>

          <!-- 详情面板 -->
          <el-row v-if="permission && permission.id">
            <el-col v-if="control.showPanel === 2">
              <el-row>
                <el-col>
                  <el-form label-position="right" label-width="110px">
                    <el-row>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="权限名称：">
                          <label class="in-label">{{permission.name}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="所属模块：">
                          <label class="in-label">{{permission.moduleName}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="上级权限：">
                          <label class="in-label">{{permission.superiorName ? permission.superiorName : '无'}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="图标：">
                          <label class="in-label">
                            <i :class="'fa ' + permission.icon + ' fa-fw'"></i> {{permission.icon}}
                          </label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="权限字符串：">
                          <label class="in-label">{{permission.authentication}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="排序：">
                          <label class="in-label">{{permission.sort}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="请求方法：">
                          <label class="in-label">{{permission.method}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="备注：">
                          <el-input type="textarea" :rows="3" v-model="permission.remark" :readonly="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="修改人：">
                          <label class="in-label">{{permission.updater}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="修改时间：">
                          <label class="in-label">{{permission.updateTime}}</label>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>

              <el-row v-if="permission.id">
                <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                  <operate-log belong="Permission" :belongId="permission.id"></operate-log>
                </el-col>
              </el-row>
            </el-col>

            <!-- 编辑面板 -->
            <el-col v-show="control.showPanel === 3">
              <el-form ref="permissionForm" :model="permission" label-position="right" label-width="110px"
                       :rules="rules" @keydown.enter.native="update">
                <el-row>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="权限名称：">
                      <label class="in-label">{{permission.name}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="所属模块：" prop="moduleId">
                      <el-select v-model="permission.moduleId" filterable clearable placeholder="请选择模块"
                                 @change="handleModuleChange">
                        <el-option v-for="item in control.modules" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="上级权限：" prop="superior">
                      <el-select v-model="permission.superior" filterable clearable placeholder="请选择上级权限">
                        <el-option v-for="item in control.editSuperiors" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="图标：" prop="icon">
                      <el-input placeholder="请选择图标" v-model="permission.icon" :readonly="true">
                        <template slot="prepend">
                          <i :class="'fa ' + permission.icon + ' fa-fw'"></i>
                        </template>
                      </el-input>
                    </el-form-item>

                    <div style="margin: 0px 0px 25px 110px">
                      <font-awesome-picker v-on:selectIcon="chooseIcon"
                                           seachbox="输入关键字进行过滤"></font-awesome-picker>
                    </div>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="权限字符串：" prop="authentication">
                      <el-input v-model="permission.authentication" placeholder="请输入权限字符串"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="排序：" prop="sort">
                      <el-input v-model="permission.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="请求方法：" prop="method">
                      <el-select v-model="permission.method" filterable clearable placeholder="请选择请求方法">
                        <el-option v-for="item in control.methods" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="备注：">
                      <el-input type="textarea" :rows="3" v-model="permission.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" icon="el-icon-circle-check" @click="update" :loading="control.loading"
                                 v-has-permission="'permission:update'" v-waves>
                        {{$t('operate.save')}}
                      </el-button>
                      <el-button icon="el-icon-delete" @click="reset" v-waves>{{$t('operate.reset')}}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  fontAwesomePicker
} from 'font-awesome-picker'

import {
  getDataDictionaries
} from '@/api/system/system'
import {
  getSuperiors
} from '@/api/system/module'
import {
  getPermissions,
  getPermission,
  getSuperiorsByModuleId,
  insertPermission,
  updatePermission,
  deletePermission,
  nameExist,
  authenticationExist
} from '@/api/system/permission'

export default {
  name: 'permissionList',
  components: {
    OperateLog,
    fontAwesomePicker
  },
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value)
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入权限名称'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 16) {
        callback(new Error('权限名称长度在 2 到 16 之间'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!regexp.test(value)) {
        callback(new Error('权限名称只能包含中文，英文字母和数字'))
        return
      }

      // 验证权限名称是否重复
      nameExist(value, this.control.showPanel === 3 ? this.permission.id : '').then(data => {
        if (data.result) {
          callback(new Error('该权限名称已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    const validateAuthentication = (rule, value, callback) => {
      // 验证空字符串
      if (!value || value.trim() === '') {
        callback(new Error('请输入权限字符串'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 32) {
        callback(new Error('权限字符串长度在 2 到 32 之间'))
        return
      }

      // 验证格式
      const regexp = /^[A-Za-z:-]+$/
      if (!regexp.test(value)) {
        callback(new Error('权限字符串只能包含英文字母，冒号和横杠'))
        return
      }

      // 验证权限字符串是否重复
      authenticationExist(value, this.control.showPanel === 3 ? this.permission.id : '').then(data => {
        if (data.result) {
          callback(new Error('该权限字符串已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    const validateSort = (rule, value, callback) => {
      // 验证空字符串
      if (!value && value !== 0) {
        callback(new Error('请输入排序'))
        return
      }

      // 验证格式
      const regexp = /^\d+$/
      if (!regexp.test(value)) {
        callback(new Error('排序只能是正整数'))
        return
      }

      callback()
    }

    return {
      permission: {
        icon: ''
      },
      permissionAdd: {
        icon: ''
      },
      rules: {
        name: [{
          required: true, trigger: 'blur', validator: validateName
        }],
        moduleId: [{
          required: true, message: '请选择所属模块', trigger: 'change'
        }],
        superior: [{
          required: true, message: '请选择上级权限', trigger: 'change'
        }],
        icon: [{
          required: true, message: '请选择图标', trigger: 'change'
        }],
        authentication: [{
          required: true, trigger: 'blur', validator: validateAuthentication
        }],
        sort: [{
          required: true, trigger: 'blur', validator: validateSort
        }],
        method: [{
          required: true, message: '请选择请求方法', trigger: 'change'
        }]
      },
      control: {
        queryCollapse: 'queryPanel',
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        showPanel: 0, // 展示面板（1：添加面板，2：详情面板，3：编辑面板）
        loading: false,
        permissions: [],
        modules: [],
        addSuperiors: [],
        editSuperiors: [],
        methods: []
      }
    }
  },
  methods: {
    // 查询权限列表
    getList() {
      getPermissions().then(data => {
        this.control.permissions = data
      }).catch(() => {
      })
    },

    // 查询权限详情
    getInfo(id) {
      getPermission(id).then(data => {
        // 先去除对象，再重新赋值，才能触发子组件重新刷新
        this.permission = {
          icon: ''
        }

        this.$nextTick(() => {
          this.permission = data
        })
      }).catch(() => {
      })
    },

    // 查询模块列表
    getModule() {
      getSuperiors().then(data => {
        this.control.modules = data
      }).catch(() => {
      })
    },

    // 处理模块更改
    handleModuleChange() {
      if (this.control.showPanel === 1) {
        delete this.permissionAdd.superior
      } else if (this.control.showPanel === 3) {
        delete this.permission.superior
      }

      this.getSuperiors()
    },

    // 查询上级权限列表
    getSuperiors() {
      if (this.control.showPanel === 1) {
        const id = this.permissionAdd ? this.permissionAdd.id : ''
        getSuperiorsByModuleId(id, this.permissionAdd.moduleId).then(data => {
          this.control.addSuperiors = data
        }).catch(() => {
        })
      } else if (this.control.showPanel === 3) {
        const id = this.permission ? this.permission.id : ''
        getSuperiorsByModuleId(id, this.permission.moduleId).then(data => {
          this.control.editSuperiors = data
        }).catch(() => {
        })
      }
    },

    filterNode(value, data) {
      if (!value) {
        return true
      }

      return data.name.indexOf(value) !== -1
    },

    // 树状节点点击事件
    handleNodeClick(data) {
      // 展示详情面板
      this.control.showPanel = 2

      // 查询对应权限详情
      this.getInfo(data.id)
    },

    // 选择图标
    chooseIcon(selectedIcon) {
      if (this.control.showPanel === 1) {
        this.permissionAdd.icon = selectedIcon.className
      } else if (this.control.showPanel === 3) {
        this.permission.icon = selectedIcon.className
      }
    },

    // 查询方法列表
    getMethods() {
      getDataDictionaries({
        'clazz': 'Permission',
        'variable': 'method'
      }).then(data => {
        this.control.methods = data
      }).catch(() => {
      })
    },

    // 展示添加面板
    add() {
      this.permissionAdd = {
        icon: ''
      }
      this.control.addSuperiors = []

      this.control.showPanel = 1
    },

    // 新增权限
    insert() {
      this.$nextTick(() => {
        this.$refs.permissionAddFrom.validate(valid => {
          if (valid) {
            this.control.loading = true

            insertPermission(this.permissionAdd).then(data => {
              this.control.loading = false

              // 关闭所有展示面板
              this.control.showPanel = 0

              // 弹窗展示结果
              this.$message({
                message: this.$t('operate.saveSuccess'),
                type: 'success'
              })

              // 更新左侧列表
              this.getList()
            }).catch(() => {
              this.control.loading = false
            })
          } else {
            return false
          }
        })
      })
    },

    // 展示编辑面板
    edit() {
      this.control.showPanel = 3

      // 查询对应权限详情
      this.getInfo(this.permission.id)

      this.getSuperiors()
    },

    // 修改权限
    update() {
      this.$nextTick(() => {
        this.$refs.permissionForm.validate(valid => {
          if (valid) {
            this.control.loading = true

            const permission = Object.assign({}, this.permission)

            // 移除多余的字段（避免提交修改时报错）
            delete permission.updateTime
            delete permission.updater

            updatePermission(permission).then(data => {
              this.control.loading = false

              // 展示详情面板
              this.control.showPanel = 2

              // 查询对应权限详情
              this.getInfo(this.permission.id)

              // 弹窗展示结果
              this.$message({
                message: this.$t('operate.saveSuccess'),
                type: 'success'
              })

              // 更新左侧列表
              this.getList()
            }).catch(() => {
              this.control.loading = false
            })
          } else {
            return false
          }
        })
      })
    },

    // 重置
    reset() {
      if (this.control.showPanel === 1) {
        this.permissionAdd = {
          icon: ''
        }
      } else if (this.control.showPanel === 3) {
        // 查询对应权限详情
        this.getInfo(this.permission.id)
      }

      this.getSuperiors()
    },

    // 删除权限
    remove() {
      // 判断是否选择了权限
      if (!this.permission || !this.permission.id) {
        this.$alert({
          message: '请选择权限',
          type: 'warning'
        }).then(() => {
          // 点击了确定按钮，暂时不触发任何操作
        }).catch(() => {
          // 点击了关闭窗口，暂时不触发任何操作
        })
        return
      }

      // 删除操作
      this.$confirm('你确认要删除权限“' + this.permission.name + '”吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deletePermission(this.permission.id).then(data => {
          this.$message({
            message: this.$t('operate.deleteSuccess'),
            type: 'success'
          })

          // 重新查询列表
          this.getList()
          // 重置权限
          this.permission = {}
          // 隐藏所有面板
          this.control.showPanel = 0
        }).catch(() => {
        })
      }).catch(() => {
        // 取消不进行任何操作
      })
    }
  },
  mounted() {
    this.getList()
    this.getModule()
    this.getMethods()
  },
  computed: {
    filterText() {
      return this.control.filterText
    }
  }
}
</script>

<style>
  .permission-list-container .el-collapse, .permission-list-container .el-collapse-item__header,
  .permission-list-container .el-collapse-item__wrap {
    border-top: none;
    border-bottom: none;
  }

  .permission-list-container .el-input__inner {
    max-width: 300px;
  }

  #iconPicker {
    background: #ffffff;
  }

  .iconPicker__header {
    border: 1px solid #dcdfe6;
    border-radius: 4px 4px 0px 0px;
    border-bottom: none;
  }

  .iconPicker__header input {
    height: 36px;
    line-height: 36px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .iconPicker__header input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 14px;
  }

  .iconPicker__body {
    border: 1px solid #dcdfe6;
    border-radius: 0px 0px 4px 4px;
  }

  .iconPicker__icons .item {
    width: 48px;
    height: auto;
    line-height: 36px;
    padding: 0px;
  }

  .iconPicker__icons .item.selected {
    color: #ffffff;
    background: #409EFF;
    box-shadow: 0 0 0 1px #409EFF;
  }
</style>
