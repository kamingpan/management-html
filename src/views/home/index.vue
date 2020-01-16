<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div :class="{hasTagsView: needTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar></navbar>
        <tags-view v-if="needTagsView"></tags-view>
      </div>

      <app-main></app-main>

      <right-panel v-if="showSettings">
        <settings></settings>
      </right-panel>

      <div class="main-container-footer"
           :style="'width: ' + (device === 'mobile' ? '100%' : (sidebar.opened ? 'calc(100vw - 210px)' : 'calc(100vw - 54px)'))">
        <div class="pull-left">{{systemInformation.name}}</div>
        <div class="pull-right">{{systemInformation.version}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResizeMixin from './mixin/resize-handler'
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'

export default {
  name: 'home',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  created() {
    // 渲染页面之前，查询对应的信息，保存到store中

    // 操作员信息
    this.$store.dispatch('user/GetOperator')

    // 系统信息
    this.$store.dispatch('user/GetSystemInformation')

    // 模块列表
    this.$store.dispatch('user/GetModules')

    // 权限列表
    this.$store.dispatch('user/GetPermissions')
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      systemInformation: state => state.user.systemInformation
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .main-container {
    position: relative;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .main-container-footer {
    background: none repeat scroll 0 0 #fff;
    overflow: hidden;
    padding: 10px 20px;
    height: 36px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #676a6c;

    border-top: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    position: fixed;
    bottom: 0px;
    z-index: 2000;
  }
</style>
