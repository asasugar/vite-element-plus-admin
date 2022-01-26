<template lang="pug">
router-view
</template>

<script lang="ts" setup>
import SDK from '@/services';
import { useActions } from '@/hooks/vuex-composition-helpers';
import { useStore } from 'vuex';
const { asyncSetUserinfo } = useActions(['user/asyncSetUserinfo']);

// const store = useStore();
SDK.init().then(sdk => {
  // console.log(123, sdk)
  asyncSetUserinfo(sdk.user);
});
</script>
