/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-24 10:50:57
 * @Description:vite build
 */
export default ({ prod }) => {
    return {
        // minify: 'esbuild',
        minify: 'terser',
        terserOptions: {
            keep_classnames: true,
            sourceMap: true,
            compress: {
                // 禁用eval
                evaluate: false,
                booleans: true,
                dead_code: true,
                toplevel: true,
                drop_console: prod,
                drop_debugger: prod,
            },
            mangle: {
                eval: true,
            },
            ecma: 2020,
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[hash:16].js',
                entryFileNames: 'js/[hash:16].js',
                assetFileNames: 'assets/[ext]/[hash:16].[ext]',
            },
        },
        target: 'es2020', // 浏览器兼容性
        cssTarget: 'chrome87', // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
        chunkSizeWarningLimit: 4096, // chunk 大小警告的限制（以 kbs 为单位）。
        // assetsDir: 'static', // 指定生成静态资源的存放路径（相对于 build.outDir）。
        assetsInlineLimit: 1024, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        //启用/禁用 CSS 代码拆分
        cssCodeSplit: true,
        //构建后是否生成 source map 文件
        sourcemap: 'hidden',
        // sourcemap: false,
        emptyOutDir: true,
        manifest: true, // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
        reportCompressedSize: false,
    };
};
