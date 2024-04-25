/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: \double-carbon-cloud\src\stores\user.js
 */
// 用户state
import { defineStore } from 'pinia'
import { getCarbonMapData } from '@/api/reduction/index'
import QZDistrictData from '@/utils/quzhou'

export const pageStore = defineStore('page', {
  state: () => ({
    mapData: QZDistrictData,
    pageName: 'HOME'
  }),
  getters: {},
  actions: {
    // 获取地图数据
    getMapData() {
      getCarbonMapData().then(res => {
        this.mapData = this.mapData.map(item => {
          let districtValue = res.data.atlasBOS.find(ele => ele.area === item.name)
          item.value = districtValue
          return item
        })
      })
    }
  }
})
