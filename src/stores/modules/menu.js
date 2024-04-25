// 菜单state
import { defineStore } from 'pinia'
import { treeDataFlattening, getTopTabList, getKeepAlives, getShowMenuList } from '@/utils/util'
// import { USER_LOCALSTORAGE_NAME } from "@/config";
// import { GlobalStore } from "@/stores/modules/global";
// import piniaPersisConfig from "@/config/piniaPersist";

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isRefresh: false, // 是否是刷新
    collapse: false, // 侧栏是否收起
    userRoutes: [], // 用户路由
    currentLeftMenu: [], // 当前侧栏数据
    currentBar: {} // 当前选中的一级导航栏
  }),

  getters: {
    // 获取顶部导航 剔除掉 show: false 的菜单
    topTabListGet: state => getTopTabList(state.userRoutes),
    // 扁平化列表
    flatMenuList: state => treeDataFlattening(state.userRoutes),
    // 获取所有需要缓存的列表
    keepAliveName: state => getKeepAlives(state.userRoutes)
  },

  actions: {
    // 设置侧栏状态
    setMenuCollapse(status) {
      this.collapse = status
    },

    // 设置用户路由数据
    setUserMenuRoutes(menus) {
      this.userRoutes = menus
    },

    // 设置选中的导航栏
    setCurrentBar(tabName) {
      this.currentBar = tabName
    },

    // 设置当前状态
    setRefreshStatus(bool) {
      this.isRefresh = bool
    },

    // 获取当前侧边栏数据
    setMenuLeftDate() {
      let nowLeftMenu = this.userRoutes.find(item => item.path === this.currentBar.key)
      this.currentLeftMenu = getShowMenuList(nowLeftMenu.children)
    }
  }
})
