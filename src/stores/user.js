/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: \double-carbon-cloud\src\stores\user.js
 */
// 用户state
import { defineStore } from 'pinia'
import { USER_LOCALSTORAGE_NAME } from '@/config'
import { useMenuStore } from '@/stores/menu'
import { useSettingStore } from '@/stores/setting'
import { getMenuList } from '@/api/menuApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLogin: false, // 是否登录
      token: '', // token令牌
      info: {}, // 用户信息
      menu: {
        collapse: false,
        userRoutes: []
      }, // 菜单信息
      settings: {}, // 个性设置,
      tableData: [], // 新增的表格数据
      entInfo: {}, // 企业信息 非企业用户为空
      identityIdSet: [], // 用户权限
      selectBySysType: {}
    },
    token: JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '',
    queryItem: JSON.parse(localStorage.getItem('queryItem')) ? JSON.parse(localStorage.getItem('queryItem')) : ''
  }),
  getters: {},
  actions: {
    // 初始化
    initState() {
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))
      if (sys && sys.user.info) {
        this.user.info = sys.user.info
        this.user.token = sys.user.token
        this.user.isLogin = sys.user.isLogin
        this.user.entInfo = sys.user.entInfo
        this.user.identityIdSet = sys.user.identityIdSet
        this.user.selectBySysType = sys.user.selectBySysType
      }
    },

    // 设置用户信息
    setUser(userInfo) {
      this.user.info = userInfo
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))
      if (sys) {
        sys.user.info = userInfo
      } else {
        sys = {
          user: this.user
        }
      }
      saveStoreStorage(sys, USER_LOCALSTORAGE_NAME)
    },
    // 设置用户信息
    setEntInfo(entInfo) {
      this.user.entInfo = entInfo
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))

      if (sys) {
        sys.user.entInfo = entInfo
      } else {
        sys = {
          user: this.user
        }
      }
      saveStoreStorage(sys, USER_LOCALSTORAGE_NAME)
    },

    // 用户数据持久化存储
    storeStorage() {
      let menuStore = useMenuStore()
      let settingStore = useSettingStore()
      this.user.menu = menuStore.$state
      this.user.settings = settingStore.$state
      saveStoreStorage({ user: this.user }, USER_LOCALSTORAGE_NAME)
      saveStoreStorage(this.queryItem, 'queryItem')
    },

    // 设置token
    setToken(token) {
      this.token = token
      this.user.token = token
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))

      if (sys) {
        sys.user.token = token
        saveStoreStorage({ user: this.user }, USER_LOCALSTORAGE_NAME)
      }
      saveStoreStorage(token, 'token')
    },

    // 设置用户登录状态
    setLoginStatus(isLogin) {
      this.user.isLogin = isLogin

      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))

      if (sys) {
        sys.user.isLogin = isLogin

        saveStoreStorage(sys, USER_LOCALSTORAGE_NAME)
      }
    },

    // 新增表格数据
    setTableData(data) {
      this.user.tableData.push(data)
    },

    // 设置权限
    setPower(power) {
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))

      if (sys) {
        this.user.identityIdSet = power
        sys.user.identityIdSet = power
        saveStoreStorage(sys, USER_LOCALSTORAGE_NAME)
      }
      getMenuList()
    },

    // 清除用户信息
    clearUser() {
      this.user.isLogin = false
      this.token = ''
      this.setPower([])
      localStorage.removeItem(USER_LOCALSTORAGE_NAME)
      localStorage.removeItem('queryItem')
      localStorage.removeItem('token')
    }
  }
})

function saveStoreStorage(sys, name) {
  localStorage.setItem(name, JSON.stringify(sys))
}
