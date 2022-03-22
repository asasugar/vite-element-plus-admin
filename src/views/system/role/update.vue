<!--
 * @Description: 新增/编辑用户角色
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-08 17:29:15
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-22 18:43:10
-->
<template>
  <as-page-wrapper header-title="新增角色">
    <template #bodyContent>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="rule-form">
        <el-form-item label="角色名称" prop="roleValue">
          <el-input v-model="ruleForm.role.value"></el-input>
        </el-form-item>
        <el-form-item label="角色值" prop="roleKey">
          <el-input v-model="ruleForm.role.key"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </as-page-wrapper>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { ElForm } from 'element-plus';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useRoute } from 'vue-router';
import { Product } from './types';

const route = useRoute();

type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
let ruleForm = reactive<Product>({
  role: {
    key: '',
    value: ''
  },
  status: true,
  remark: ''
});
if (
  route.name === 'SystemRoleEdit' &&
  route?.params?.data &&
  typeof route.params.data === 'string'
) {
  ruleForm = JSON.parse(route.params.data) as unknown as Product;
}

const rules = reactive({
  roleValue: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur'
    }
  ],
  roleKey: [
    {
      required: true,
      message: '请输入角色值',
      trigger: 'blur'
    }
  ]
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="less" scoped></style>
