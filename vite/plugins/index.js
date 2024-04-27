import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import createAutoImport from './auto-import';
import createCompression from './compression';
import createSetupExtend from './setup-extend';
import createSetupMock from './setup-mock';
// import visualizer from './visualizer';

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue({
            script: {
                defineModel: true,
            },
        }),
        vueJsx(),
    ];
    vitePlugins.push(...createAutoImport());
    vitePlugins.push(createSetupExtend());
    vitePlugins.push(createSetupMock());

    if (isBuild) {
        vitePlugins.push(...createCompression(viteEnv));

        // vitePlugins.push(visualizer()); // 打包分析
    }

    return vitePlugins;
}
