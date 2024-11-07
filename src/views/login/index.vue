<template>
  <div class="login-box">
    <div class="login-form">
      <h2>后台管理系统脚手架</h2>

      <el-form
        center
        ref="loginForm"
        show-message
        :model="userInfo"
        :rules="rules"
        class="login-info"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            :prefix-icon="User"
            v-model="userInfo.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            :prefix-icon="Lock"
            v-model="userInfo.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="userLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { User, Lock } from '@element-plus/icons-vue';
  const userStore = useUserStore();
  const router = useRouter();
  const userInfo = reactive({
    username: '',
    password: '',
  });
  const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  });
  function userLogin() {
    userStore.storeUserLogin(userInfo).then(() => {
      router.push('/home');
    });
  }
</script>

<style less="lang" scoped>
  .login-box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    background-color: var(--ad-background-color);
    .login-form {
      width: 300px;
      text-align: center;
      display: flex;
      flex-direction: column;
      .login-info {
        margin-top: 10%;
        height: max-content;
      }
    }
  }
</style>
