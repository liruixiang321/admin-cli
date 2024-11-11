<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="authList"
      :check-strictly="true"
      show-checkbox
      :default-checked-keys="checkedNode"
      node-key="roleId"
      :props="{ label: 'name', children: 'roleList' }"
    />
    <el-button type="primary" @click="onChangeAuth">修改权限</el-button>
  </div>
</template>
<script lang="ts" setup>
  import { getAuthList, IAuth } from '@/api/auth';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const treeRef = ref<any>(null);
  let authList = ref<IAuth[]>([]);
  const checkedNode = ref<Array<number | string>>([]);
  const { query } = route;
  if (query.auth) {
    checkedNode.value = query.auth as string[];
  }
  onMounted(() => {
    getAuthList()
      .then((res) => {
        authList.value = res;
      })
      .catch(() => {});
  });
  const onChangeAuth = () => {
    const selectedTreeNode = treeRef.value.getCheckedNodes();
  };
</script>
