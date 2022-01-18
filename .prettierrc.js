/*
 * @Description: prettier配置
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-18 14:24:24
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-01-18 15:37:57
 */
module.exports = {
  "printWidth": 100, // 一行的字符数，如果超过会进行换行，默认为100
  "semi": true, // 行位是否使用分号，默认为true
  "singleQuote": true, // 字符串是否使用单引号
  "trailingComma": "none", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  "bracketSpacing": true, // 对象大括号直接是否有空格，默认为true
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "useTabs": false // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
};