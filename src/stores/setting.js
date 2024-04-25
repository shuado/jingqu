import { defineStore } from 'pinia'
import { USER_LOCALSTORAGE_NAME } from '@/config'

export const useSettingStore = defineStore('useSettingStore', {
  state: () => {
    return {
      theme: 'light', // 侧边栏主题
      themeModel: 'light' // 主体模式
    }
  },
  getters: {},
  actions: {
    // 初始化State
    initState() {
      let sys = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_NAME))
      if (sys && sys.user.settings) {
        Object.keys(sys.user.settings).forEach(key => {
          this[key] = sys.user.settings[key]
        })
      }
    },

    // 设置侧栏主题
    setUpTheme(theme) {
      this.theme = theme
    },

    // 设置主题
    setThemeModel(theme) {
      this.themeModel = theme
    }
  }
})
