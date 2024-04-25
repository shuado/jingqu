/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: /quzhou-carbon/vite.config.js
 */
import { defineConfig } from 'vite'
import commpressPlugin from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9999, // 启动端口
    open: true, // 打开默认浏览器
    hmr: true, //开启热更新
    host: '0.0.0.0',
    proxy: {
      '/dev': {
        target: 'https://quzhou.co2bigdata.com', //你要跨域访问的网址
        // target: 'http://47.97.192.55:8090/', //你要跨域访问的网址
        // target: 'http://10.10.10.34:8090/', //你要跨域访问的网址
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/dev/, '') // 重写路径把路径变成空字符
      },
      '/jwjt-acc-path': {
        target: 'https://quzhou.co2bigdata.com/jwjt-acc-path', //你要跨域访问的网址
        // target: 'http://47.97.192.55:8090/', //你要跨域访问的网址
        // target: 'http://10.10.10.230:8090/', //你要跨域访问的网址
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/jwjt-acc-path/, '') // 重写路径把路径变成空字符
      }
    }
  },
  plugins: [
    vue(),
    // 需要 nginx 开启gzip
    commpressPlugin({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz' //文件类型
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      }
    })
  ],
  build: {
    target: 'es2020',
    assetsDir: 'static',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]'
      }
    }
  },
  // 去除浏览器打印
  esbuild: {
    pure: ['console.log', 'debugger']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variable.scss" as *;`
      }
    }
  }
})
