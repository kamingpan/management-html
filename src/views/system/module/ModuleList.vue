<template>
  <div class="app-container module-list-container">
    <el-row>
      <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 8}" :lg="{span: 6}" :xl="{span: 4}"
              style="margin-bottom: 30px">
        <el-collapse v-model="control.queryCollapse">
          <el-collapse-item name="queryPanel">
            <template slot="title">
              <div class="in-query-header">
                <i class="fa fa-th-list fa-fw"></i> 模块列表
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
                  <el-tree class="filter-tree" :data="control.modules" node-key="id" :props="control.defaultProps"
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
                         v-has-permission="'module:insert'">{{$t('operate.add')}}
              </el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="remove" v-waves
                         v-has-permission="'module:delete'" :disabled="!module || !module.id">{{$t('operate.delete')}}
              </el-button>
              <el-button size="small" icon="el-icon-edit-outline" @click="edit" v-waves
                         v-has-permission="'module:update'" :disabled="!module || !module.id">{{$t('operate.edit')}}
              </el-button>
            </el-col>
          </el-row>

          <!-- 添加面板 -->
          <el-row v-show="control.showPanel === 1">
            <el-col>
              <el-form ref="moduleAddForm" :model="moduleAdd" label-position="right" label-width="110px"
                       :rules="rules" @keydown.enter.native="insert">
                <el-row>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="模块名称：" prop="name">
                      <el-input v-model="moduleAdd.name" placeholder="请输入模块名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="图标：" prop="icon">
                      <el-input placeholder="请选择图标" v-model="moduleAdd.icon" :readonly="true">
                        <template slot="prepend">
                          <i :class="'fa ' + moduleAdd.icon + ' fa-fw'"></i>
                        </template>
                      </el-input>
                    </el-form-item>

                    <div style="margin: 0px 0px 25px 110px">
                      <font-awesome-picker v-on:selectIcon="chooseIcon"
                                           seachbox="输入关键字进行过滤"></font-awesome-picker>
                    </div>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="路由类型：" prop="type">
                      <el-select v-model="moduleAdd.type" filterable clearable placeholder="请选择路由类型">
                        <el-option v-for="item in control.types" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="路由路径：" prop="route">
                      <el-input v-model="moduleAdd.route" placeholder="请输入路由路径"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="排序：" prop="sort">
                      <el-input v-model="moduleAdd.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="上级模块：" prop="superior">
                      <el-select v-model="moduleAdd.superior" filterable clearable placeholder="请选择上级模块">
                        <el-option v-for="item in control.addSuperiors" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="状态：" prop="status">
                      <el-select v-model="moduleAdd.status" filterable clearable placeholder="请选择状态">
                        <el-option v-for="item in control.statuses" :key="item.value" :label="item.label"
                                   :value="parseInt(item.value)"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="备注：">
                      <el-input type="textarea" :rows="3" v-model="moduleAdd.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" icon="el-icon-circle-check" @click="insert" :loading="control.loading"
                                 v-has-permission="'module:insert'" v-waves>{{$t('operate.save')}}
                      </el-button>
                      <el-button icon="el-icon-delete" @click="reset" v-waves>{{$t('operate.reset')}}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>

          <!-- 详情面板 -->
          <el-row v-if="module && module.id">
            <el-col v-if="control.showPanel === 2">
              <el-row>
                <el-col>
                  <el-form label-position="right" label-width="110px">
                    <el-row>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="模块名称：">
                          <label class="in-label">{{module.name}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="图标：">
                          <label class="in-label">
                            <i :class="'fa ' + module.icon + ' fa-fw'"></i> {{module.icon}}
                          </label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="路由类型：">
                          <label class="in-label">{{module.typeLabel}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="路由路径：">
                          <label class="in-label">{{module.route}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="排序：">
                          <label class="in-label">{{module.sort}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="上级模块：">
                          <label class="in-label">{{module.superiorName ? module.superiorName : '无'}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="状态：">
                          <label class="in-label">{{module.statusLabel}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="备注：">
                          <el-input type="textarea" :rows="3" v-model="module.remark" :readonly="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="修改人：">
                          <label class="in-label">{{module.updater}}</label>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                        <el-form-item label="修改时间：">
                          <label class="in-label">{{module.updateTime}}</label>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>

              <el-row v-if="module.id">
                <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                  <operate-log belong="Module" :belongId="module.id"></operate-log>
                </el-col>
              </el-row>
            </el-col>

            <!-- 编辑面板 -->
            <el-col v-show="control.showPanel === 3">
              <el-form ref="moduleForm" :model="module" label-position="right" label-width="110px"
                       :rules="rules" @keydown.enter.native="update">
                <el-row>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="模块名称：">
                      <label class="in-label">{{module.name}}</label>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="图标：" prop="icon">
                      <el-input placeholder="请选择图标" v-model="module.icon" :readonly="true">
                        <template slot="prepend">
                          <i :class="'fa ' + module.icon + ' fa-fw'"></i>
                        </template>
                      </el-input>
                    </el-form-item>

                    <div style="margin: 0px 0px 25px 110px">
                      <font-awesome-picker v-on:selectIcon="chooseIcon"
                                           seachbox="输入关键字进行过滤"></font-awesome-picker>
                    </div>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="路由类型：" prop="type">
                      <el-select v-model="module.type" filterable clearable placeholder="请选择路由类型">
                        <el-option v-for="item in control.types" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="路由路径：" prop="route">
                      <el-input v-model="module.route" placeholder="请输入路由路径"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="排序：" prop="sort">
                      <el-input v-model="module.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="上级模块：" prop="superior">
                      <el-select v-model="module.superior" filterable clearable placeholder="请选择上级模块">
                        <el-option v-for="item in control.editSuperiors" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="状态：" prop="status">
                      <el-select v-model="module.status" filterable clearable placeholder="请选择状态">
                        <el-option v-for="item in control.statuses" :key="item.value" :label="item.label"
                                   :value="parseInt(item.value)"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 15}" :lg="{span: 14}" :xl="{span: 13}">
                    <el-form-item label="备注：">
                      <el-input type="textarea" :rows="3" v-model="module.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" icon="el-icon-circle-check" @click="update" :loading="control.loading"
                                 v-has-permission="'module:update'" v-waves>{{$t('operate.save')}}
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
  getModules,
  getModule,
  getSuperiors,
  insertModule,
  updateModule,
  deleteModule,
  nameExist
} from '@/api/system/module'

export default {
  name: 'moduleList',
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
        callback(new Error('请输入模块名称'))
        return
      }

      // 验证长度
      if (value.length < 2 || value.length > 16) {
        callback(new Error('模块名称长度在 2 到 16 之间'))
        return
      }

      // 验证格式
      const regexp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!regexp.test(value)) {
        callback(new Error('模块名称只能包含中文，英文字母和数字'))
        return
      }

      // 验证模块名称是否重复
      nameExist(value, this.control.showPanel === 3 ? this.module.id : '').then(data => {
        if (data.result) {
          callback(new Error('该模块名称已存在'))
          return
        }

        callback()
      }).catch(() => {
        callback()
      })
    }

    const validateRoute = (rule, value, callback) => {
      // 验证空字符串
      if (!value) {
        callback()
        return
      }

      // 验证格式
      const regexp = /^[A-Za-z0-9_.\-/]+$/
      if (!regexp.test(value)) {
        callback(new Error('路由路径只能包含英文字母，数字，点，斜杠，下划线和横杠'))
        return
      }

      callback()
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
      module: {
        icon: ''
      },
      moduleAdd: {
        icon: ''
      },
      rules: {
        name: [{
          required: true, trigger: 'blur', validator: validateName
        }],
        route: [{
          required: false, trigger: 'blur', validator: validateRoute
        }],
        type: [{
          required: true, message: '请选择路由类型', trigger: 'change'
        }],
        icon: [{
          required: true, message: '请选择图标', trigger: 'change'
        }],
        superior: [{
          required: true, message: '请选择上级模块', trigger: 'change'
        }],
        sort: [{
          required: true, trigger: 'blur', validator: validateSort
        }],
        status: [{
          required: true, message: '请选择状态', trigger: 'change'
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
        modules: [],
        types: [],
        addSuperiors: [],
        editSuperiors: [],
        statuses: []
      }
    }
  },
  methods: {
    // 查询模块列表
    getList() {
      getModules().then(data => {
        this.control.modules = data
      }).catch(() => {
      })
    },

    // 查询模块详情
    getInfo(id) {
      getModule(id).then(data => {
        // 先去除对象，再重新赋值，才能触发子组件重新刷新
        this.module = {
          icon: ''
        }

        this.$nextTick(() => {
          this.module = data
        })
      }).catch(() => {
      })
    },

    // 查询上级模块列表
    getSuperiors() {
      if (this.control.showPanel === 1) {
        getSuperiors(true).then(data => {
          this.control.addSuperiors = data
        }).catch(() => {
        })
      } else if (this.control.showPanel === 3) {
        getSuperiors(true).then(data => {
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

      // 查询对应模块详情
      this.getInfo(data.id)
    },

    // 选择图标
    chooseIcon(selectedIcon) {
      if (this.control.showPanel === 1) {
        this.moduleAdd.icon = selectedIcon.className
      } else if (this.control.showPanel === 3) {
        this.module.icon = selectedIcon.className
      }
    },

    // 查询路由类型列表
    getTypes() {
      getDataDictionaries({
        'clazz': 'Module',
        'variable': 'type'
      }).then(data => {
        this.control.types = data
      }).catch(() => {
      })
    },

    // 查询状态列表
    getStatuses() {
      getDataDictionaries({
        'clazz': 'Module',
        'variable': 'status'
      }).then(data => {
        this.control.statuses = data
      }).catch(() => {
      })
    },

    // 展示添加面板
    add() {
      this.moduleAdd = {
        icon: ''
      }
      this.control.showPanel = 1

      this.getSuperiors()
    },

    // 添加模块
    insert() {
      this.$nextTick(() => {
        this.$refs.moduleAddForm.validate(valid => {
          if (valid) {
            this.control.loading = true

            insertModule(this.moduleAdd).then(data => {
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

      // 查询对应模块详情
      this.getInfo(this.module.id)
      this.getSuperiors()
    },

    // 修改模块
    update() {
      this.$nextTick(() => {
        this.$refs.moduleForm.validate(valid => {
          if (valid) {
            this.control.loading = true

            const module = Object.assign({}, this.module)

            // 移除多余的字段（避免提交修改时报错）
            delete module.updateTime
            delete module.updater

            updateModule(module).then(data => {
              this.control.loading = false

              // 展示详情面板
              this.control.showPanel = 2

              // 查询对应模块详情
              this.getInfo(this.module.id)

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
        this.moduleAdd = {
          icon: ''
        }
      } else if (this.control.showPanel === 3) {
        // 查询对应权限详情
        this.getInfo(this.module.id)
      }

      this.getSuperiors()
    },

    // 删除模块
    remove() {
      // 判断是否选择了模块
      if (!this.module || !this.module.id) {
        this.$alert({
          message: '请选择模块',
          type: 'warning'
        }).then(() => {
          // 点击了确定按钮，暂时不触发任何操作
        }).catch(() => {
          // 点击了关闭窗口，暂时不触发任何操作
        })
        return
      }

      // 删除操作
      this.$confirm('你确认要删除模块“' + this.module.name + '”吗?', '删除确认', {
        type: 'warning',
        confirmButtonText: this.$t('operate.confirm'),
        cancelButtonText: this.$t('operate.cancel')
      }).then(() => {
        deleteModule(this.module.id).then(data => {
          this.$message({
            message: this.$t('operate.deleteSuccess'),
            type: 'success'
          })

          // 重新查询列表
          this.getList()
          // 重置模块
          this.module = {}
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
    this.getTypes()
    this.getStatuses()
  },
  computed: {
    filterText() {
      return this.control.filterText
    }
  }
}
</script>

<style>
  .module-list-container .el-collapse, .module-list-container .el-collapse-item__header,
  .module-list-container .el-collapse-item__wrap {
    border-top: none;
    border-bottom: none;
  }

  .module-list-container .el-input__inner {
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
