/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-24 10:57:29
 * @Description:vite server
 */

export default () => {
    return {
        port: 9889,
        proxy: {
            '/dev': {
                target: 'https://flby-order.gzflby.cn/api/', //你要跨域访问的网址
                // target: 'http://47.97.192.55:8090/', //你要跨域访问的网址
                // target: 'http://10.10.10.34:8090/', //你要跨域访问的网址
                changeOrigin: true, // 允许跨域
                rewrite: (path) => path.replace(/^\/dev/, ''), // 重写路径把路径变成空字符
            },
            '/jwjt-acc-path': {
                target: 'https://quzhou.co2bigdata.com/jwjt-acc-path', //你要跨域访问的网址
                // target: 'http://47.97.192.55:8090/', //你要跨域访问的网址
                // target: 'http://10.10.10.230:8090/', //你要跨域访问的网址
                changeOrigin: true, // 允许跨域
                rewrite: (path) => path.replace(/^\/jwjt-acc-path/, ''), // 重写路径把路径变成空字符
            },
        },
    };
};
