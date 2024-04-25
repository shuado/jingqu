/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: \double-carbon-cloud\src\stores\user.js
 */
// 用户state
import { defineStore } from 'pinia'
import { getCarbonMapData } from '@/api/reduction/index'

export const mapDataStore = defineStore('mapData', {
  state: () => ({
    mapData: []
  }),
  getters: {},
  actions: {
    // 获取地图数据
    getMapData() {
      getCarbonMapData().then(res => {
        this.mapData = res.data.atlasBOS
      })
    }
  }
})
