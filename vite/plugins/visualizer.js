import { visualizer } from 'rollup-plugin-visualizer';

export default () => {
    return visualizer({
        filename: 'visualizer.html',
        title: '打包分析',
        gzipSize: true,
        brotliSize: true,
    });
};
