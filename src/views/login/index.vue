<!--
 * @Description: 登录页
 * @Author: Xiongjie.Xue(xxj95719@gmail.com)
 * @Date: 2022-01-17 20:26:01
 * @LastEditors: Xiongjie.Xue(xxj95719@gmail.com)
 * @LastEditTime: 2023-04-25 14:23:13
-->
<template>
  <div class="login">
    <AsMousemovePanel />
    <div class="login-container">
      <div class="container-header">
        <div class="container-header__title">Vue3.0 后台管理系统</div>
        <div class="f16 color-gray6">账号：admin;密码：123456</div>
      </div>
      <el-form
        ref="ruleFormRef"
        class="container-form"
        label-position="top"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="ruleForm.username" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="ruleForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">
            登录表示您已同意
            <a>《服务条款》</a>
          </div>
          <el-button style="width: 100%" type="primary" :loading="isLoading" @click="submitForm"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
import { userService } from '@/services';
import { setToken } from '@/utils/token';
import { useUserStore } from '@/pinia';
import AsMousemovePanel from '@/components/mousemove-panel';
import type { FormItemRule } from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils';
import type { ApiLoginData } from '@/apis/user/typing';

const router = useRouter();
const isLoading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref<ApiLoginData>({
  username: 'admin',
  password: '123456'
});
const rules = reactive<Partial<Record<string, Arrayable<FormItemRule>>>>({
  username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
});

// 登录
const submitForm = () => {
  isLoading.value = true;
  ruleFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      const { username, password } = ruleForm.value;
      const content = await userService.loginAction({
        username,
        password
      });
      isLoading.value = false;
      if (content) {
        ElNotification({
          title: '登录成功',
          message: `欢迎回来：${content.username}`,
          type: 'success'
        });
        setToken(content.token);

        const { updateUserinfo } = useUserStore();
        updateUserinfo(content);
        router.replace({
          name: 'Home'
        });
      }
    } else {
      isLoading.value = false;
      console.log('error submit!!');
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(25deg, @bg-color, @theme-color);

  .login-container {
    width: 420px;
    padding-bottom: 80px;
    background-color: @bg-color;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);

    .container-header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 40px 0 20px 0;

      &__title {
        font-size: 28px;
        color: @theme-color;
        font-weight: bold;
      }
    }

    .container-form {
      width: 70%;
      margin: 0 auto;
    }
  }
}
</style>
