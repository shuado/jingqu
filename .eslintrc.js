/*
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-11-14 09:39:45
 * @Description:
 */
module.exports = {
    // ...其他配置
    env: {
        node: true, // 设置Node.js环境
        browser: true,
    },
    plugins: ['vue', 'prettier'], // 添加Prettier插件
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        './.eslintrc-auto-import.json',
        'prettier', // 添加Prettier规则
    ],
    parserOptions: {
        ecmaVersion: 2022, // 使用的ECMAScript版本
    },
    globals: {
        createApp: 'writable',
        Vue: 'writable',
        project_version: 'writable',
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        // 'vue/multi-word-component-names': [
        //     'error',
        //     {
        //         ignores: ['index', 'home', 'menu', 'client', 'dept', 'user', 'dictbiz', 'userinfo', 'topmenu'], //需要忽略的组件名
        //     },
        // ],
        // 禁用 TypeScript 相关的规则
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': 'error', // 启用Prettier规则
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: 'off',
        'no-unused-vars': 'warn',
        'no-async-promise-executor': 'off',
        'vue/no-unused-vars': 'warn',
    },
    ignorePatterns: ['node_modules/', 'dist/', 'auto-imports.d.ts', 'components.d.ts', 'src/assets/', 'index.html', 'mock/'],
};
