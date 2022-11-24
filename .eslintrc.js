/*
 * @Description: eslint配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-18 13:55:50
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-05-05 22:13:02
 */
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      ts: '@typescript-eslint/parser', // eslint解析器，用于解析ts
      js: 'espree',
      '<template>': 'espree'
    },
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      tsx: true, // Allows for the parsing of JSX
      jsx: true
    }
  },
  extends: [
    // 'plugin:vue/base',
    'plugin:vue/vue3-recommended', // vue-eslint-parser
    'plugin:@typescript-eslint/recommended', // //定义文件继承的子规范 from the @typescript-eslint/eslint-plugin
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  env: {
    browser: true,
    node: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'warn',
    '@typescript-eslint/no-unused-vars': 'error'
  }
};
