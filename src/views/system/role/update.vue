<!--
 * @Description: 新增/编辑用户角色
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-03-08 17:29:15
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-03-09 10:41:02
-->
<template>
  <as-page-wrapper header-title="新增角色">
    <template #bodyContent>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="rule-form">
        <el-form-item label="角色名称" prop="roleValue">
          <el-input v-model="ruleForm.roleValue"></el-input>
        </el-form-item>
        <el-form-item label="角色值" prop="roleKey">
          <el-input v-model="ruleForm.roleKey"></el-input>
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

type FormInstance = InstanceType<typeof ElForm>;

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  roleValue: '',
  roleKey: '',
  status: true,
  remark: ''
});

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
      trigger: 'change'
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
