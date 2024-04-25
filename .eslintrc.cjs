/*
 * @Description:
 * @Date: 2022-06-30 09:35:53
 * @FilePath: /quzhou-carbon/.eslintrc.cjs
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended', './.eslintrc-auto-import.json'],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    semi: [0],
    'no-unused-vars': [
      0,
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none'
      }
    ],
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制使用全等
    'vue/no-unused-vars': 0,
    'vue/no-unused-components': 0,
    'vue/multi-word-component-names': 0,
    'vue/v-on-event-hyphenation': 0
  },
  globals: {
    AMap: 'true'
  }
}
