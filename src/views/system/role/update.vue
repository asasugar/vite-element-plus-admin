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
        label-width="auto"
        :label-position="labelPosition"
        class="rule-form"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleValue">
              <el-input v-model="ruleForm.role.value" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色值" prop="roleKey">
              <el-input v-model="ruleForm.role.key" placeholder="请输入角色值"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入..."></el-input>
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
import { setStorage, getStorage, removeStorage } from '@/utils/storage';
import type { ComponentSize } from 'element-plus';
import type { RoleItem } from './typing';
import type { EpPropMergeType } from 'element-plus/es/utils';

const route = useRoute();
const router = useRouter();

const size = ref<ComponentSize>('default');
const labelPosition =
  ref<EpPropMergeType<StringConstructor, 'right' | 'left' | 'top', unknown>>('right');
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref<RoleItem>({
  role: {
    key: '',
    value: ''
  },
  status: true,
  remark: ''
});
const headerTitle = ref<string>('');
const storageFormDetail = getStorage('roleFormDetail');

if (
  route.name === 'SystemRoleEdit' &&
  route?.params?.data &&
  typeof route.params.data === 'string'
) {
  headerTitle.value = '编辑角色';
  ruleForm.value = JSON.parse(route.params.data);
  setStorage('roleFormDetail', ruleForm);
} else if (route.name === 'SystemRoleEdit' && storageFormDetail) {
  headerTitle.value = '编辑用户';
  ruleForm.value = storageFormDetail;
} else {
  headerTitle.value = '新增角色';
}

const rules = reactive({
  'role.value': [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'blur'
    }
  ],
  'role.key': [
    {
      required: true,
      message: '请输入角色值',
      trigger: 'blur'
    }
  ]
});

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
