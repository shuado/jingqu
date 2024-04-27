import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';

import vite_build from './vite/build.js';
import vite_resolve from './vite/resolve.js';
import vite_server from './vite/server.js';
import vite_define from './vite/define.js';
import vite_css from './vite/css.js';
import vite_createVitePlugins from './vite/plugins/index.js';

import path from 'path';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default ({ mode, command }) => {
    const prod = mode === 'production';
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd());
    const { VITE_APP_BASE } = env;
    return defineConfig({
        base: VITE_APP_BASE,
        clearScreen: false,
        define: vite_define({ mode, command }),
        resolve: vite_resolve({ path, __dirname }),
        server: vite_server(),
        build: vite_build({ mode, command, prod }),
        css: vite_css(),
        plugins: vite_createVitePlugins(env, command === 'build'),
    });
};
