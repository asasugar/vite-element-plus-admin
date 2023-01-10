<!--
 * @Description: 新增/编辑用户
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-04-11 17:22:54
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-01-10 10:50:46
-->
<template>
  <as-page-wrapper :header-title="headerTitle">
    <template #bodyContent>
      <div class="pb20">
        <el-radio-group v-model="size" class="mr20">
          <el-radio-button label="large">large</el-radio-button>
          <el-radio-button label="default">default</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="labelPosition">
          <el-radio-button label="left">Left</el-radio-button>
          <el-radio-button label="right">Right</el-radio-button>
          <el-radio-button label="top">Top</el-radio-button>
        </el-radio-group>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :size="size"
        label-width="90px"
        :label-position="labelPosition"
        class="rule-form"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="ruleForm.userName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="role.value">
              <el-select
                v-model="ruleForm.role.value"
                placeholder="请匹配角色"
                :size="size"
                filterable
                clearable
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.role.key"
                  :label="item.role.value"
                  :value="item.role.key"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
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
import { onUnmounted } from 'vue';
import { AsPageWrapper } from '@/containers/page-wrapper';
import { useRoute, useRouter } from 'vue-router';
import { userService } from '@/services';
import { setStorage, getStorage, removeStorage } from '@/utils/storage';
import type { ComponentSize } from 'element-plus';
import type { RoleItem } from '../role/typing';
import type { UserInsert } from './typing';
import type { EpPropMergeType } from 'element-plus/es/utils';

const route = useRoute();
const router = useRouter();

const size = $ref<ComponentSize>('default');
const labelPosition: EpPropMergeType<StringConstructor, 'right' | 'left' | 'top', unknown> =
  $ref('right');
const ruleFormRef = $ref<FormInstance>();
let ruleForm = $ref<UserInsert>({
  userName: '',
  role: {
    key: '',
    value: ''
  },
  email: ''
});
let headerTitle = $ref<string>('');
const storageFormDetail = getStorage('userFormDetail');
if (
  route.name === 'SystemUserEdit' &&
  route?.params?.data &&
  typeof route.params.data === 'string'
) {
  headerTitle = '编辑用户';
  ruleForm = JSON.parse(route.params.data) as UserInsert;
  setStorage('userFormDetail', ruleForm);
} else if (route.name === 'SystemUserEdit' && storageFormDetail) {
  headerTitle = '编辑用户';
  ruleForm = storageFormDetail;
} else {
  headerTitle = '新增用户';
}

const rules = $ref({
  userName: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ],
  'role.value': [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    }
  ]
});
let roleList = $ref<RoleItem[]>([]);
const getRoleList = async () => {
  const { content } = await userService.getRoleList({});
  roleList = content;
};
getRoleList();

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!');
      router.back();
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

onUnmounted(() => {
  removeStorage('roleFormDetail');
});
</script>
<style lang="less" scoped>
.rule-form {
  max-width: 600px;
}
</style>
