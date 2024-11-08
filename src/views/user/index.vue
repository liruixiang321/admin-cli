<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="ID" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="NickName" width="180">
      <template #default="scope">
        {{ scope.row.nickName }}
      </template>
    </el-table-column>
    <el-table-column label="roles" width="180">
      <template #default="scope">
        <div class="flex gap-2">
          <el-tag v-for="item in scope.row.roles" :key="item.role">{{ item.roleName }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> Edit </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  import { getUserList, userItem } from '@/api/user';
  import { onMounted, ref } from 'vue';

  const tableData = ref<userItem[]>([]);
  const fetchUserList = () => {
    return getUserList().then((res) => {
      tableData.value = res;
    });
  };
  onMounted(() => {
    fetchUserList();
  });
</script>
