<!--
 * @Description: JsonEditor
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-18 14:02:44
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-12 18:18:17
-->
<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-input
        v-model="inputValue"
        :rows="10"
        :autosize="{ minRows: 6, maxRows: 10 }"
        type="textarea"
        placeholder="html"
      />
    </el-col>
    <el-col :span="14">
      <vue-json-pretty
        :path="'res'"
        :deep="3"
        :show-length="true"
        :data="jsonData"
        v-bind="{ ...attrs }"
      />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { useAttrs } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
const inputValue = ref<string>(
  `{"name": "BeJson","url": "http://www.xxx.com","page": 88,"isNonProfit": true,"address": {"street": "科技园路.", "city": "江苏苏州","country": "中国"},"links": [{"name": "Google","url": "http://www.xxx.com"},{"name": "Baidu","url": "http://www.xxx.com"}]}`
);
const jsonData = computed(() => {
  return JSON.parse(inputValue.value);
});
const attrs = useAttrs();
</script>
