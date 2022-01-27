<template lang="pug">
router-view
</template>

<script lang="ts" setup>
import SDK from '@/services';
import { useActions } from '@/hooks/vuex-composition-helpers';
const { asyncSetUserinfo } = useActions(['user/asyncSetUserinfo']);

SDK.init().then(sdk => {
  // 刷新时初始化存储用户信息至store
  asyncSetUserinfo(sdk.user);
});
</script>
