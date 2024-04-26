/*
 * @Description:
 * @Date: 2022-08-30 14:43:30
 * @FilePath: /quzhou-carbon/src/main.js
 */
import { createApp } from 'vue';
import App from './App.vue';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { language, messages } from './lang/';
import request from './api/request';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import 'normalize.css'; // 全局样式格式化
import pinia from '@/stores';
import router from '@/router';
import '@/utils/rem';
import DataVVue3 from '@kjgl77/datav-vue3';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import BaiduMap from 'vue-baidu-map-3x';
import NfDesignBase from '@saber/nf-design-base-elp';
import basicContainer from '@/components/basic-container/main.vue';
import Avue from '@yolion/avue';
import '@yolion/avue/lib/index.css';
import avueUeditor from 'avue-plugin-ueditor';

const app = createApp(App);

window.axios = request.axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(Avue, {
    axios: request.axios,
    columnMenuColor: {
        del: '#f56c6c',
    },
    calcHeight: 10,

    hideColumnMenu2Icon: true,
    dialogFullscreen: true,
});

app.component('BasicContainer', basicContainer);

app.use(ElementPlus, {
    locale: messages[language],
});

app.use(avueUeditor, { axios: request.axios });

app.use(DataVVue3);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(VueDOMPurifyHTML);
app.use(NfDesignBase);
app.use(pinia);
app.use(router);
app.use(BaiduMap, {
    ak: 'OSgwWgE9Ha4RfTyyNU7UPpBv',
});
app.mount('#app');
