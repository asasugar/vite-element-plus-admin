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

为了简便写法，通过hooks去包装（偷懒），修改`尤大大` 的[helper](https://github.com/vuejs/vuex/blob/main/src/helpers.js) 



useState
- `namespace` 参数非必填，如果 `modules` 设置 `namespaced: true` 时必填
- `state` 可选类型：数组 ｜ 对象 （支持自定义state方法名）

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useState } from '@/hooks/vuex-composition-helpers';

// use array parameters
const { userinfo } = useState('A', ['userinfo']);
const user = ref(userinfo());

// use object parameters
const { d } = useState('A', userinfo: 'd');
const user = ref(d());
</script>

```

useGetters

- `namespace` 参数非必填，如果 `modules` 设置 `namespaced: true` 时必填
- `getters` 可选类型：数组 ｜ 对象 （支持自定义getters方法名）

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useGetters } from '@/hooks/vuex-composition-helpers';

// use array parameters
const { unDoList, doList } = useGetters('A', ['unDoList', 'doList']);
// or
const { unDoList, doList } = useGetters(['A/unDoList', 'A/doList']);


const a = ref(unDoList());
const b = ref(doList());

// use object parameters
const { d, e } = useGetters('A',{ unDoList: 'd', doList: 'e'});
// or
const { d, e } = useGetters({ 'A/unDoList': 'd', 'A/doList': 'e'});

const a = ref(d());
const b = ref(e());
</script>

```


useMutations

- `namespace` 参数非必填，如果 `modules` 设置 `namespaced: true` 时必填
- `mutations` 可选类型：数组 ｜ 对象 （支持自定义mutations方法名）

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useMutations } from '@/hooks/vuex-composition-helpers';

// use array parameters
const { INCREMENT } = useMutations('A', ['INCREMENT']);
// or
const { INCREMENT } = useMutations(['A/INCREMENT']);

// use object parameters
const { d } = useMutations('A', { 'INCREMENT': 'd'});
// or
const { d} = useMutations({ 'A/INCREMENT': 'd'});
</script>

```

useActions
- `namespace` 参数非必填，如果 `modules` 设置 `namespaced: true` 时必填
- `actions` 可选类型：数组 ｜ 对象 （支持自定义actions方法名）

```vue
<script setup lang="ts">
// use array parameters
import { useActions } from '@/hooks/vuex-composition-helpers';

// A模块go方法、B模块back方法 

// 场景一： A、B模块不设置命明空间时
const { go, back } = useActions(['go','back']); // use array parameters

// 场景二：A模块设置命明空间，B模块不设置命明空间
const { go, back } = useActions(['A/go', 'back']);
// or
const { go } = useActions('A', ['go']);
const { back } = useActions(['back']);

// 场景三：A、B模块都设置命明空间
const { go, back } = useActions(['A/go', 'B/back']);
// or
const { go } = useActions('A', ['go']);
const { back } = useActions('B', ['back']);
</script>

```vue
<script setup lang="ts">
// use object parameters
import { useActions } from '@/hooks/vuex-composition-helpers';

// A模块go方法、B模块back方法 

// 场景一： A、B模块不设置命明空间时
const { d, e } = useActions({ go: 'd', back: 'e' }); // use object parameters to customize methods

// 场景二：A模块设置命明空间，B模块不设置命明空间
const { d, e } = useActions({ 'A/go': 'd', back: 'e' });
// or
const { d } = useActions({ 'A/go': 'd' }); 
const { e } = useActions({ back: 'd' });



// 场景三：A、B模块都设置命明空间
const { d, e } = useActions({ 'A/go': 'd', 'B/back': 'e' });
// or
const { d } = useActions({ 'A/go': 'd' }); 
const { e } = useActions({ 'B/back': 'e' });

</script>
```