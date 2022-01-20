# vite-element-plus-admin
🔥 🎉 Vue 3.0 + Vite 2.0 + Vuex 4.0 + Vue-Router 4.0 + Element-Plus +  Axios 开发的后台管理系统

# 环境配置

- Vite 需要 Node.js 版本 >= 12.0.0。
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

## 🙏感谢

- vue@3.2.25
- vite@2.7.13
- vuex@4.0.2
- vue-router@4
- element-plus@1.3.0-beta.5

该版本的Vuex 在setup 中使用 map*辅助函数，用法，详见[#issues1725](https://github.com/vuejs/vuex/issues/1725)

```vue
<script setup lang="ts">
import { useStore, mapActions } from 'vuex';

const asyncSetUserinfo = mapActions('user',['asyncSetUserinfo']).asyncSetUserinfo.bind({
  $store: store
});
</script>
```

为了简便写法，通过hooks去包装（偷懒），修改`尤大大` 的[helper](https://github.com/vuejs/vuex/blob/main/src/helpers.js) ,等Vuex官方如果更新该hooks的支持，在升级vuex版本

