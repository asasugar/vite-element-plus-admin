<!--
 * @Description: 修改密码
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-02-25 17:56:37
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2022-04-22 17:43:15
-->
<template>
  <el-card class="card-wrapper" :body-style="{ padding: '12px 12px 2px 12px' }">
    <template #header>
      <div class="flex between verticalcenter">
        <span>修改密码</span>
      </div>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="rule-form"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="ruleForm.oldPassword"
              show-password
              type="password"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="ruleForm.newPassword"
              show-password
              type="password"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="确认新密码" prop="againNewPassword">
            <el-input
              v-model="ruleForm.againNewPassword"
              show-password
              type="password"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { FormInstance } from '#/global';
import { ElNotification } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  oldPassword: '',
  newPassword: '',
  againNewPassword: ''
});

const checkAgainPassword = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('不能为空'));
  }
  if (value !== ruleForm.value.newPassword) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive({
  oldPassword: [
    {
      required: true,
      message: '请输入当前密码',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur'
    }
  ],
  againNewPassword: [
    {
      required: true,
      validator: checkAgainPassword,
      trigger: 'blur'
    }
  ]
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!');
      ElNotification({
        title: 'Success',
        message: '修改成功',
        type: 'success'
      });
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
