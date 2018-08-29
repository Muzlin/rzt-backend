<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

      <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
          <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>

          <router-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)" @click="setMenuId(child)">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
import { getMenuActionList } from '@/api/system/setting'

export default {
  name: 'SidebarItem',
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
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    },
    generateTitle,
    setMenuId(menu) {
      const menuId = menu.meta.id
      if (menuId) {
        // 存入当前的菜单ID
        this.$store.dispatch('setCurrentMenuId', menuId)
        // 先从vuex中查询
        const menuRunFuncList = this.$store.getters.menuRunFuncList || []
        const currentMenuFuncList = menuRunFuncList.find(item => item.menuId === menuId)
        console.log(currentMenuFuncList)
        // 如果vuex中没有菜单当前的运行时功能 再请求接口
        if (!currentMenuFuncList) {
          // 获取当前菜单的运行时功能
          getMenuActionList(menuId).then(data => {
            // 存入当前的菜单运行时功能
            this.$store.dispatch('setCurrentMenuFuncList', data.result)
            // 是否存入vuex 构造返回数据
            const v_menuFuncList = { menuId, list: data.result }
            // 如果没有存入则存入vuex 菜单ID作为索引
            if (!menuRunFuncList.includes(v_menuFuncList)) {
              menuRunFuncList.push(v_menuFuncList)
              this.$store.dispatch('setMenuRunFuncList', menuRunFuncList)
            }
          })
        } else {
          // 存入vuex
          this.$store.dispatch('setCurrentMenuFuncList', currentMenuFuncList)
        }
      } else {
        this.$message.error('获取运行时功能失效')
      }
    }
  }
}
</script>
