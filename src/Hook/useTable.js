/*
 * @Description:
 * @Date: 2022-07-06 13:34:55
 * @FilePath: /quzhou-carbon/src/Hook/useTableForPage.js
 */
import { reactive } from 'vue'

/**
 * 分页表格Hook
 * @param fu 当页码或每页展示条数发生改变后要执行的方法
 * @param size 每页展示条数
 * @returns {{tableConfig: UnwrapNestedRefs<{total: number, current: number, rowsCount: number, tableData: *[]}>, handleSizeChange: handleSizeChange, handlePageChange: handlePageChange}}
 */
export function useTable(fu, size = 10) {
  let tableConfig = reactive({
    tableData: [], // 表格数据
    total: 0, // 数据总条数
    current: 1, // 当前页码
    size: size // 每页数据展示条数
  })

  // 页码发生改变时
  const handlePageChange = currents => {
    tableConfig.current = currents
    fu()
  }

  // 每页展示条数发生改变时
  const handleSizeChange = pageSize => {
    let oldSize = JSON.parse(JSON.stringify(tableConfig.size))
    tableConfig.size = pageSize
    // 获取最大页数
    let pageMax = Math.ceil(tableConfig.total / pageSize)
    // 判断跳转页数是否大于最大页数，如果大于，跳转页数就等于最大页数
    if (tableConfig.current <= pageMax || (oldSize > pageSize && tableConfig.size <= tableConfig.total)) {
      fu()
    }
  }

  // 重置表单数据
  const initTableConfig = () => {
    tableConfig.tableData = []
    tableConfig.total = 0
    tableConfig.current = 1
    tableConfig.size = 10
  }

  // 数据发生改变时(适合特定场景)
  const handleChangeData = data => {
    tableConfig.total = data.total
    tableConfig.current = parseInt(data.currentPage || data.totalPage)
    tableConfig.size = data.size
    tableConfig.tableData = data.data.map((item, index) => {
      item.serialNumber = index + 1 + (tableConfig.current - 1) * 10
      return item
    })
  }

  return {
    tableConfig,
    handlePageChange,
    handleChangeData,
    handleSizeChange,
    initTableConfig
  }
}
