<template>
  <div class="menu-wrapper">

    <template v-if="!item.children">
      <app-link :to="resolvePath(item)">
        <el-menu-item :index="resolvePath(item)" :class="{'submenu-title-noDropdown': !isNest}">
          <item :icon="item.icon" :title="generateTitle(item.name)"></item>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item)" popper-append-to-body>
      <template slot="title">
        <item :icon="item.icon" :title="generateTitle(item.name)"></item>
      </template>

      <sidebar-item v-for="grandchildren in item.children" :key="grandchildren.id" :is-nest="true"
                    :item="grandchildren" :base-path="resolvePath(grandchildren)" class="nest-menu"></sidebar-item>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixIOSBug from './fix-ios-bug'

export default {
  name: 'SidebarItem',
  components: {
    Item,
    AppLink
  },
  mixins: [FixIOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(module) {
      let routePath = module.route

      // 判断路由路径是否为空，如果为空，表示拥有下级，不需要打开指定页面，因此直接返回模块id
      if (!routePath) {
        return '/' + module.id
      }

      // 处理理由类型为iframe的请求路径
      if (module.type === 'iframe') {
        routePath = '/iframe/' + module.id + '?src=' + encodeURIComponent(module.route)
      }

      if (isExternal(routePath)) {
        return routePath
      }

      return path.resolve(this.basePath, routePath)
    },
    generateTitle
  }
}
</script>
