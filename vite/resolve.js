/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-24 10:55:08
 * @Description:vite resolve
 */

export default ({ path, __dirname }) => {
    return {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            styles: path.resolve(__dirname, './src/styles'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    };
};
