# vite-element-plus-admin
🔥 🎉 Vue 3.0 + Vite 2.0 + Pinia 2.0 + Vue-Router 4.0 + Element-Plus +  Axios 开发的后台管理系统

# 静态站点

[Github Pages](https://asasugar.github.io/vite-element-plus-admin/)
# 环境配置

- Vite 需要 Node.js 版本 >= 12.2.0。
- 推荐 `vscode` + `volar` , 禁用 `vuter`


# Run Project
## 安装依赖
```bish
yarn
```

## 添加husky hooks

```bish
Add a hook:
npx husky add .husky/pre-commit "yarn lint-staged"
git add .husky/pre-commit
```

## 运行

```bish
yarn dev
```


该版本的Vuex 在setup 中使用 map*辅助函数，用法，详见[#issues1725](https://github.com/vuejs/vuex/issues/1725)


辅助函数`已经提取成npm包`[npm地址](https://www.npmjs.com/package/vuex-composition-maphooks), 文档详看[github地址](https://github.com/asasugar/vuex-composition-maphooks)，**推荐使用[pinia](https://github.com/vuejs/pinia#readme)(真香)**

# 部分页面效果

![2022-03-23 14.04.43](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.04.43.gif)


![2022-03-23 14.09.04](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.09.04.gif)


![2022-03-23 14.20.19](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.20.19.gif)


![2022-03-23 14.19.45](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.19.45.gif)


![2022-03-23 14.10.49](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.10.49.gif)


![2022-03-23 14.12.02](https://raw.githubusercontent.com/asasugar/pic-bed/master/imgs/2022-03-23%2014.12.02.gif)
# 特别感谢

 - vue@^3.2.25
 - vite@^2.7.13
 - pinia@^2.0.13
 - vue-router@4
 - element-plus@1.3.0-beta.5
 - vue-vben-admin(UI参考)
