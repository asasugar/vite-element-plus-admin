# vite-element-plus-admin

🔥 🎉 Vue 3.0 + Vite 2.0 + Pinia 2.0 + Vue-Router 4.0 + Element-Plus + Axios 开发的后台管理系统

# 静态站点

[Github Pages](https://asasugar.github.io/vite-element-plus-admin/)

# 环境配置

- Vite 需要 Node.js 版本 >= 12.2.0。
- 推荐 `vscode` + `volar` , 禁用 `vuter`

# Run Project

## 安装依赖

```bish
pnpm install
```

## 添加 husky hooks

```bish
Add a hook:
npx husky add .husky/pre-commit "pnpm lint-staged"
git add .husky/pre-commit
```

## 运行

```bish
pnpm dev
```

该版本的 Vuex 在 setup 中使用 map\*辅助函数，用法，详见[#issues1725](https://github.com/vuejs/vuex/issues/1725)

辅助函数`已经提取成npm包`[npm 地址](https://www.npmjs.com/package/vuex-composition-maphooks), 文档详看[github 地址](https://github.com/asasugar/vuex-composition-maphooks)，**推荐使用[pinia](https://github.com/vuejs/pinia#readme)(真香)**

# 部分页面效果

![2022-03-23 14.04.43](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.04.43.gif)

![2022-03-23 14.09.04](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.09.04.gif)

![2022-03-23 14.20.19](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.20.19.gif)

![2022-03-23 14.19.45](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.19.45.gif)

![2022-03-23 14.10.49](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.10.49.gif)

![2022-03-23 14.12.02](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.12.02.gif)

![2022-05-10 10.05.15](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-05-10%2010.05.15.gif)

![2022-05-10 10.05.53](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-05-10%2010.05.53.gif)

![2022-05-10 10.08.30](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-05-10%2010.08.30.gif)

![2022-05-10 10.08.50](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-05-10%2010.08.50.gif)

# 特别感谢

- vue@3
- vite@3
- pinia@^2.0.13
- vue-router@4
- element-plus@2
- vue-vben-admin(UI 参考)

不定时使用 npm-check-updates 更新最新依赖

# 注意事项

- `Node` 版本 >= 12.2.0
- `vite@2.9.0` 之前的版本，dev 模式下识别到新的依赖会`reload page`, 可结合[vite-plugin-optimize-persist](https://github.com/antfu/vite-plugin-optimize-persist)插件解决，>= 2.9.0 的不需要！
- Vue 3 版本状态管理推荐使用 `pinia`，api 友好许多, 非要用的话结合 [vuex-composition-maphooks](https://www.npmjs.com/package/vuex-composition-maphooks)
