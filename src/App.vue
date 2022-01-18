<template lang="pug">
router-view
</template>
<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore();
// 刷新时，持久化保存store
window.addEventListener("beforeunload", () => {
  window.localStorage.setItem(
    "StoreDefaults",
    JSON.stringify(store.state)
  );
});

</script>