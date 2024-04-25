/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: \double-carbon-cloud\src\stores\user.js
 */
// 用户state
import { defineStore } from 'pinia'
import { getEntList } from '@/api/system/entpriseQuota'

export const useSystemStore = defineStore('system', {
  state: () => ({
    entList: []
  }),
  getters: {},
  actions: {
    // 初始化
    async initEntList() {
      const res = await getEntList()
      this.entList = res.data.map(item => {
        item.value = item.socCode
        item.label = item.orgName
        return item
      })
    }
  }
})
