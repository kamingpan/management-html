<template>
  <div class="in-form-container">
    <el-row>
      <el-col :xs="{offset: 0, span: 24}" :sm="{offset: 1, span: 14}" :md="{offset: 3, span: 13}"
              :lg="{offset: 4, span: 12}" :xl="{offset: 6, span: 8}">
        <el-form ref="demo" :model="demo" label-position="right" label-width="100px">
          <el-row>
            <el-col>
              <el-form-item label="名称：">
                <label class="in-label">{{demo.name}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="手机号码：">
                <label class="in-label">{{demo.phone}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="图片：">
                <div class="image-container">
                  <img class="img-circle cursor-pointer" :src="demo.pictureUrl" width="200"
                       @click="showPhotoViewer(demo.pictureUrl)"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="爱好：">
                <label class="in-label">{{demo.hobbies ? demo.hobbies.join(', ') : ''}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="电子邮箱：">
                <label class="in-label">{{demo.email}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="状态：">
                <label class="in-label">{{demo.statusLabel}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="附件：" class="attachment-container">
                <label class="in-label">
                  <p v-for="attachment in demo.attachments" v-bind:key="attachment.id">
                    <i class="el-icon-document"></i>
                    <a title="点击下载预览" target="_blank" :href="attachment.url">{{attachment.filename}}</a>
                  </p>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="介绍：">
                <label class="in-label">
                  <div v-html="demo.introduction"></div>
                </label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="备注：">
                <label class="in-label">{{demo.remark}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改人：">
                <label class="in-label">{{demo.updater}}</label>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="修改时间：">
                <label class="in-label">{{demo.updateTime}}</label>
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

      <el-col v-if="demo" :xs="{span: 24}" :sm="{span: 8}" :md="{span: 7}" :lg="{span: 6}" :xl="{span: 4}">
        <operate-log belong="Demo" :belongId="id"></operate-log>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PhotoViewer from 'photoviewer'

import OperateLog from '@/components/OperateLog'
import {
  getDemo
} from '@/api/business/demo'

export default {
  name: 'demoInfo',
  components: {
    OperateLog
  },
  data() {
    return {
      id: this.$route.params.id,
      demo: {}
    }
  },

  methods: {
    close() {
      // 调用广播方法关闭当前组件标签
      this.$bus.$emit('closeCurrentTag')
    },

    // 查询示例详情
    getInfo() {
      getDemo(this.id).then(data => {
        this.demo = data
      }).catch(() => {
      })
    },

    // 查看图片预览
    showPhotoViewer(url) {
      const items = [
        {
          src: url
        }
      ]

      const options = {
        index: 0,
        title: false,
        fixedModalPos: true
      }

      /* eslint-disable no-new */
      new PhotoViewer(items, options)
    }
  },

  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
  .image-container {
    position: relative;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border: 1px solid #d8dce5;
    border-radius: 50%;
  }

  .attachment-container p {
    margin: 0px;
  }

  .attachment-container p a {
    color: #0000CC;
  }

  .attachment-container p a:hover {
    text-decoration: underline;
  }
</style>
