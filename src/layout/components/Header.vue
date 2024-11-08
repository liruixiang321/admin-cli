<template>
  <div class="header">
    <div class="flex-center">logo区域</div>
    <div class="flex-grow"></div>
    <div class="flex-center m05 color-dark-black"><i-ep-user></i-ep-user>用户名</div>
    <div class="flex-center m05 color-dark-black setting" @click="handleSetting"
      ><i-ep-setting></i-ep-setting
    ></div>
    <el-drawer v-model="showSetting" title="项目配置" :before-close="handleClose">
      <div class="out">
        <el-button type="primary" @click="logout">退出登陆</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const showSetting = ref(false);
  const handleSetting = () => {
    showSetting.value = true;
  };
  const handleClose = () => {
    showSetting.value = false;
  };
  const logout = () => {
    localStorage.removeItem('userInfo');
    router.push('/login');
  };
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 0 15px;
    box-shadow: 0 0 20px rgb(195 223 252 / 40%);
  }
  .setting {
    cursor: pointer;
  }
  .out {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
