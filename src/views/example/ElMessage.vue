<template>
    <div>
        <el-button @click="showMessage({
            message: '这是一条消息提示',
            type: 'success',
            duration: 2000,
            center: true,
            showClose: true,
           
        })">弹出消息</el-button>
    </div>
</template>

<script setup lang="ts">
import showMessage from '@/components/message';

</script>

<style scoped>

</style>