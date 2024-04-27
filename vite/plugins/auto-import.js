import autoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default function createAutoImport() {
    return [
        autoImport({
            imports: [
                'vue',
                'vue-router',
                'vuex',
                {
                    /* 自定义模块 */
                    // ['@/hooks']: [['default', 'hooks']],
                    ['@/hooks']: ['usePagingOption', 'usePermission', 'useSliceUpload', 'useAvueUploadFn', 'useLoadAMap', 'useAMapConfigRender', 'uploadFileContinue'],
                },
            ],
            resolvers: [ElementPlusResolver()],
            dts: true,
            eslintrc: {
                enabled: true, // Default `false`
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
            },
        }),
        Components({
            dirs: ['src/components/global'],
            resolvers: [ElementPlusResolver()],
        }),
    ];
}
