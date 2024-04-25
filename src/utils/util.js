/**
 * 今天、昨天、明天日期
 * @param dates 0代表今日,-1代表昨日，1代表明日
 * @param type "s"代表开始,"e"代表结束
 * @returns {string}
 */
export function getDate(dates, type = 's') {
  let dd = new Date()
  let n = dates || 0
  dd.setDate(dd.getDate() + n)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  let time = '00:00:00'
  if (type === 'e') {
    time = '23:59:59'
  }
  return y + '-' + m + '-' + d + ' ' + time
}

/**
 * 获取本周、上周、下周的起始、结束日期
 * @param type "s"代表开始,"e"代表结束
 * @param dates dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
 * @returns {string}
 */
export function getMonday(dates, type = 's') {
  let now = new Date()
  let nowTime = now.getTime()
  let day = now.getDay()
  let longTime = 24 * 60 * 60 * 1000
  let n = longTime * 7 * (dates || 0)
  let dd = null
  let time = '00:00:00'
  if (type === 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type === 'e') {
    dd = nowTime + (7 - day) * longTime + n
    time = '23:59:59'
  }
  dd = new Date(dd)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d + ' ' + time
}

/**
 * 获取本月、上月、下月的起始、结束日期
 * @param type "s"代表开始,"e"代表结束
 * @param months 为数字类型，不传或0代表本月，-1代表上月，1代表下月
 * @returns {string}
 */
export function getMonth(months, type = 's') {
  let d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months !== 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  let firstDay = year + '-' + month + '-' + '01'
  let lastDay = ''
  if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
    lastDay = year + '-' + month + '-' + 31
  } else if (month === '02') {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      lastDay = year + '-' + month + '-' + 29
    } else {
      lastDay = year + '-' + month + '-' + 28
    }
  } else {
    lastDay = year + '-' + month + '-' + 30
  }
  let day = ''
  if (type === 's') {
    day = firstDay + ' 00:00:00'
  } else {
    day = lastDay + ' 23:59:59'
  }
  return day
}

/**
 * 节点展开
 * @param { any[] } treeData 树形结构数据
 * @param { string } nodekey 节点对应的key
 * @param { number } deep 展开节点深度,默认为-1遍历所有节点
 * @param { string } children 子集对应的名称，默认为children
 * @returns { string[] } 返回展开点数组
 */
export function treeNodesOpen(treeData, nodekey, deep = -1, children = 'children') {
  let nodesArr = []
  if (deep === -1) {
    // 遍历所有节点
    treeData.forEach(item => {
      nodesArr.push(item[nodekey])
      if (item[children]?.length) {
        const arr = treeNodesOpen(item[children], nodekey, deep, children)
        nodesArr = [...nodesArr, ...arr]
      }
    })
  } else if (deep) {
    // 遍历指定深度节点
    treeData.forEach(item => {
      nodesArr.push(item[nodekey])
      if (item[children]?.length) {
        const arr = treeNodesOpen(item[children], nodekey, deep - 1, children)
        nodesArr = [...nodesArr, ...arr]
      }
    })
  }
  return nodesArr
}

/**
 * 16进制颜色添加透明度
 * @param {{color:string,opacity:number}} param0 16进制颜色值 , 透明度
 * @returns {string} 16进制颜色值
 */
export function getHexOpacityColor({ color = '#000', opacity = 0.5 }) {
  opacity = Math.max(opacity, 0)
  opacity = Math.min(opacity, 1)
  color = color.replace(/#/g, '').toUpperCase()
  if (color.length === 3) {
    let arr = color.split('')
    color = ''
    for (let i = 0; i < arr.length; i++) {
      color += arr[i] + arr[i] //将简写的3位字符补全到6位字符
    }
  }
  let num = Math.round(255 * opacity) //四舍五入
  let str = ''
  let arrHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'] //十六进制数组
  while (num > 0) {
    let mod = num % 16
    num = (num - mod) / 16
    str = arrHex[mod] + str
  }
  if (str.length === 1) str = '0' + str
  if (str.length === 0) str = '00'
  return `#${color + str}`
}

/**
 *  px 转 rem
 * @param size px尺寸
 * @returns {string} rem尺寸
 */
export function sizeRem(size) {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  const fontSize = clientWidth / 1920
  return size * fontSize
}

/**
 *  补全Echarts月份及对应的数据
 * @param data echarts 数据
 * @param isCompletion Y 是累积数据补充上一月数据 Z 是累积数据补''  N 非累积数据补null
 * @param year 年份
 * @param isMonth 是否是月份数据 默认月份数据
 * @param defaultData 替换的默认值
 * @returns {string} 补全的Echarts数据
 */
export function completionDate(data, year, isCompletion = 'N', isMonth = true, defaultData = null) {
  if (!data || !data.dataset || !data.dataset.source.length > 0 || !year) return null
  let fillData = null
  let dataArr = data.dataset.source // 数据数组
  dataArr.forEach((item, index) => {
    if (String(item[0]).indexOf('月') !== -1 && index > 0) {
      item[0] = item[0].split('月')[0]
      fillData = '月'
    } else if (String(item[0]).indexOf('-') !== -1 && index > 0) {
      fillData = item[0].split('-')[0] + '-'
      item[0] = item[0].split('-')[1]
    }
  })

  let afterData = [] // 传入数据中的月份/年份
  let allMonth = [] // 所有月份
  let allYear = [year - 3, year - 2, year - 1, +year, +year + 1, +year + 2] // 所有的年份数据
  let diffData = null //时间差集
  // 获取数据中的月份/年份
  for (let i = 1; i < dataArr.length; i++) {
    afterData.push(+dataArr[i][0])
  }
  // 获取月份差值数据
  if (isMonth) {
    // 获取🈷份数据
    let nowMonth = new Date().getMonth() + 1
    for (let i = 1; i < (isCompletion === 'Y' || isCompletion === 'Z' ? nowMonth : 13); i++) {
      allMonth.push(i)
    }
    diffData = allMonth.filter(val => {
      return afterData.indexOf(val) === -1
    })
  } else {
    diffData = allYear.filter(val => {
      return afterData.indexOf(val) === -1
    })
  }
  // 要补全的数据 - 补null
  diffData.forEach(item => {
    let completion = new Array(dataArr[0].length).fill(item, 0, 1).fill(defaultData, 1, dataArr[0].length)
    dataArr.push(completion)
  })
  dataArr = dataArr.sort((a, b) => a[0] - b[0])
  // 要补全的数据 - 补上一月的数据
  if (isCompletion === 'Y') {
    for (let i of diffData) {
      if (i !== 1) {
        dataArr[i] = JSON.parse(JSON.stringify(dataArr[i - 1]))
        dataArr[i][0] = i
      }
    }
  }
  if (fillData) {
    dataArr.forEach((item, index) => {
      if (fillData.indexOf('月') !== -1 && index > 0) {
        item[0] = item[0] + fillData
      } else if (fillData.indexOf('-') !== -1 && index > 0) {
        item[0] = fillData + item[0]
      }
    })
    fillData = null
  }
  return { source: dataArr }
}

/**
 *  动态填充图片路径 适用于图片路径在 assets/img 文件下的图片
 * @param url 图片地址
 * @returns 变量的方式传入图片地址
 */

export function getAssetsFile(url) {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @param immediate
 * @param resultCallback
 * @returns {function(...[*]): Promise<unknown>}
 */
export function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function (...args) {
    return new Promise(resolve => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function () {
    console.log(timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}

/**
 * 判断是否是空值, 是返回替代值, 不是返回传递的值
 * @param value 传递的值
 * @param subValue 替代值
 * @returns {boolean|*}
 */
export function isEmptyValue(value, subValue = '') {
  if ((value === undefined || value === null || value === '' || String(value).trim().length <= 0) && value !== 0) {
    return subValue
  } else {
    return value
  }
}

/**
 * 平面数据转树形
 * @param source
 * @param id
 * @param parentId
 * @param children
 * @returns {*}
 */
export function treeData(source, id = 'id', parentId = 'parent', children = 'children') {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] === child[parentId])
    branchArr.length > 0 ? (father[children] = branchArr) : ''
    return father[parentId] === '' // 如果第一层不是parentId=0，请自行修改
  })
}

/**
 * 树形数据数据扁平化
 * @param source tree数据
 * @param children 子集元素名称
 * @returns {*[]}
 */
export function treeDataFlattening(source, children = 'children') {
  let munuList = JSON.parse(JSON.stringify(source))
  return munuList.flatMap(item => [item, ...(item[children] ? treeDataFlattening(item[children]) : [])])
}

/**
 * @description: 获取顶部菜单栏
 * @param {Array} menuList 所有菜单列表
 * @return {*}
 */
export const getTopTabList = menuList => {
  const newList = JSON.parse(JSON.stringify(menuList))
  return newList
    .filter(item => item.meta.show !== false)
    .map(item => {
      return {
        title: item.meta.title,
        key: item.path,
        path: item.path
      }
    })
}

/**
 * @description: 获取缓存的列表
 * @param {Array} menuList 所有菜单列表
 * @return {*}
 */
export const getKeepAlives = menuList => {
  const newList = treeDataFlattening(menuList)
  let KeepAlives = []
  newList.forEach(item => {
    if (item.meta.keepAlive) KeepAlives.push(item.name)
  })
  return KeepAlives
}

/**
 * @description: 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 show == false 的菜单）
 * @param {Array} menuList 当前需处理的菜单列表
 * @return {*}
 */
export const getShowMenuList = menuList => {
  const newList = JSON.parse(JSON.stringify(menuList))
  return newList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return item.meta.show
  })
}

/**
 *  将base64转换为blob
 * @param dataurl bse64字符
 * @returns 变量的方式传入图片地址
 */

export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * @description: 将blob转换为file
 * @param {*} theBlob Blob值
 * @param {*} fileName 文件名称
 * @return {*}
 */
export function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date() // 文件最后的修改日期
  theBlob.name = fileName // 文件名
  return new File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() })
}

/**
 * 数判断一个字符串是否是JSON序列化的
 * @param str 需要判断的字符串
 */
export function isJSONSerialized(str) {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}
