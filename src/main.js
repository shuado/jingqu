/*
 * @Description:
 * @Date: 2022-08-30 14:43:30
 * @FilePath: /quzhou-carbon/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import request from './api/request'

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import 'normalize.css' // 全局样式格式化
import pinia from '@/stores'
import router from '@/router'
import '@/utils/rem'
import DataVVue3 from '@kjgl77/datav-vue3'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import BaiduMap from 'vue-baidu-map-3x'
import Avue from '@yolion/avue'
import '@yolion/avue/lib/index.css'
import avueUeditor from 'avue-plugin-ueditor'



const app = createApp(App)

window.axios = request.axios

app.use(Avue, {
  axios:request.axios,
  columnMenuColor: {
    del: '#f56c6c'
  },
  calcHeight: 10,

  hideColumnMenu2Icon: true,
  dialogFullscreen: true
})


app.use(avueUeditor, { axios })

app.use(DataVVue3)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(VueDOMPurifyHTML)
app.use(pinia)
app.use(router)
app.use(BaiduMap, {
  ak: 'OSgwWgE9Ha4RfTyyNU7UPpBv'
})
app.mount('#app')
