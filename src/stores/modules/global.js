/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: /quzhou-carbon/src/stores/modules/global.js
 */
// 用户state
import { defineStore } from 'pinia'
import piniaPersisConfig from '@/config/piniaPersist'
import { USER_LOCALSTORAGE_NAME } from '@/config'
// import { getQueryItem } from '@/api/login'
import { useMenuStore } from '@/stores/modules/menu'

export const GlobalStore = defineStore({
  id: 'GlobalState',

  state: () => ({
    // user: '',
    user: 'PERSONNEL',
    isLogin: false,
    token: '',
    expirationTime: '',
    queryItem: {}
  }),

  actions: {
    // 设置用户信息
    setUser(user) {
      this.user = user
    },

    // 设置token
    setToken(token) {
      this.token = token
    },

    // 设置过期时间
    setTime(data) {
      this.expirationTime = data
    },

    // 设置用户登录状态
    setLoginStatus(isLogin) {
      this.isLogin = isLogin
    },

    // 清除用户信息
    clearUser() {
      this.$reset()
      const menuStore = useMenuStore()
      menuStore.$reset()
    }
  },

  persist: piniaPersisConfig(USER_LOCALSTORAGE_NAME)
})
