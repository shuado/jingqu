/*
 * @Description:
 * @Date: 2022-09-06 15:22:51
 * @FilePath: /quzhou-carbon/src/api/bigSetting/index.js
 */
// 数据大屏配置
export class BigHomeModel {
  // 构造函数
  constructor() {
    // class初始化时将初始化数据保存
    this.oldModel = JSON.parse(JSON.stringify(this.model))
  }

  // 实际值
  model = {
    layoutDataBOS: [],
    layoutRefreshBOS: [],
    policiesRegulationsBOS: [],
    layoutDataCarbonTradingBOS: []
  }

  // 旧值 用于重置数据
  oldModel = {}

  /**
   * 重置对象
   */
  init() {
    // 重置数据
    this.model = JSON.parse(JSON.stringify(this.oldModel))
  }
}
