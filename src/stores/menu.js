/*
 * @Description:
 * @Date: 2022-09-02 17:55:51
 * @FilePath: /quzhou-carbon/src/stores/menu.js
 */
// 菜单state
import { defineStore } from 'pinia'
import { USER_LOCALSTORAGE_NAME } from '@/config'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isRefresh: false, // 是否是刷新
    collapse: false, // 侧栏是否收起
    userRoutes: [], // 用户路由
    tabList: [], // 所有顶栏数据
    menuList: [], // 所有的侧栏数据
    currentLeftMenu: [], // 当前侧栏数据
    currentBar: '' // 当前选中的一级导航栏
  }),
  getters: {},
  actions: {
    // 初始化State
    initState() {
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))
      if (sys && sys.user.menu) {
        Object.keys(sys.user.menu).forEach(key => {
          this[key] = sys.user.menu[key]
        })
      }
    },

    // 设置侧栏状态
    setMenuCollapse(status) {
      this.collapse = status
    },

    // 设置用户路由数据
    setUserMenuRoutes(menus) {
      this.userRoutes = menus
    },

    // 设置侧栏数据
    setMenuList(menuList) {
      this.menuList = menuList
    },

    // 设置选中的导航栏
    setTabList(tabList) {
      this.tabList = tabList
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
      this.currentLeftMenu = []
      if (!this.currentBar || !this.currentBar.key) {
        return
      } else {
        for (let item of this.menuList) {
          if (item.path === this.currentBar.key) {
            this.currentLeftMenu = item.menuList
            break
          }
        }
      }
    }
  }
})
