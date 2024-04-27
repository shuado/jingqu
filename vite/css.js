/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-24 10:57:29
 * @Description:vite css
 */
import autoprefixer from 'autoprefixer';
export default () => {
    return {
        postcss: {
            plugins: [
                autoprefixer({
                    // 指定浏览器目标
                    overrideBrowserslist: ['chrome > 87'],
                }),
            ],
        },
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/each/mixins.scss"; @import "@/styles/each/variables.scss"; @import "@/assets/styles/variable.scss";',
            },
        },
        devSourcemap: true,
    };
};
