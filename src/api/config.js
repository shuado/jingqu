/*
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 18:34:01
 * @Description:
 */
// let BASE_URL = "http://localhost:8888"; // 请求地址
let BASE_URL = import.meta.env.VITE_BASE_URL; // 请求地址
const TIME_OUT = 50000; // 超时时间

export { BASE_URL, TIME_OUT };
