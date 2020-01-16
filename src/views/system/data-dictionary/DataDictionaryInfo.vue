<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="dataDictionary" :model="dataDictionary" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="类：">
                <label class="in-label">{{dataDictionary.clazz}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="变量：">
                <label class="in-label">{{dataDictionary.variable}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="标签：">
                <label class="in-label">{{dataDictionary.label}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="值：">
                <label class="in-label">{{dataDictionary.value}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="类型：">
                <label class="in-label">{{dataDictionary.type}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="排序：">
                <label class="in-label">{{dataDictionary.sort}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注：">
                <label class="in-label">{{dataDictionary.remark}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{dataDictionary.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{dataDictionary.updateTime}}</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="danger" icon="el-icon-circle-close" @click="close" v-waves>
                  {{$t('operate.close')}}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>

      <el-col v-if="dataDictionary" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="DataDictionary" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OperateLog from '@/components/OperateLog'
import {
  getDataDictionary
} from '@/api/system/data-dictionary'

export default {
  name: 'dataDictionaryInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      dataDictionary: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询数据字典详情
    getInfo() {
      getDataDictionary(this.id).then(data => {
        this.dataDictionary = data
      }).catch(() => {
      })
    }
  },

  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
