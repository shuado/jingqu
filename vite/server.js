/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-24 10:57:29
 * @Description:vite server
 */

export default () => {
    return {
        port: 9889,
        proxy: {
            '/api': {
                // target: 'http://192.168.13.170:8060/mngApi', //运杰
                // target: 'http://192.168.1.108:10092/mngApi', // 阿飞
                // target: 'http://192.168.13.183:8060/mngApi', // 子豪
                // target: 'http://192.168.1.114:10092/mngApi', // 展鹏
                //target: 'http://192.168.50.13:10092/mngApi', // 本地
                // target: 'http://192.168.1.110:10092/mngApi', // 陈超
                // target: 'http://192.168.50.13:10092/mngApi', // 忠旭
                target: 'https://gtpark-test-api.zjyolion.com/mngApi', // 线上测试
                // target: 'https://park-demo-api.zjyolion.com/mngApi', // demo演示
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    };
};
