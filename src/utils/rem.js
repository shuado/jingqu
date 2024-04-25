/*
 * @Description: rem配置
 * @Date: 2021-04-21 17:43:20
 */
;(function () {
  function refreshRem() {
    const designSize = 1920 // 设计图尺寸
    const html = document.documentElement
    const wW = html.clientWidth // 窗口宽度
    const rem = (wW * 100) / designSize

    document.documentElement.style.fontSize = rem + 'px'
  }

  window.onresize = function () {
    refreshRem()
  }

  refreshRem()
})(window)
