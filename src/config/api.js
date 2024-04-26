/*
 * @Description:
 * @Date: 2022-08-26 14:12:54
 * @FilePath: /quzhou-carbon/src/config/api.js
 */
// let BASE_URL = "http://localhost:8888"; // 请求地址
let BASE_URL = import.meta.env.VITE_BASE_URL; // 请求地址
const TIME_OUT = 30 * 1000; // 超时时间

// 用户头部请求头
let prefix = '/qq-oms';

export { BASE_URL, TIME_OUT, prefix };
