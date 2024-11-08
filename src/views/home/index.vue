<template>
  <el-form :inline="true" :model="searchData">
    <el-form-item label="标题">
      <el-input v-model="searchData.title"></el-input>
    </el-form-item>
    <el-form-item label="介绍">
      <el-input v-model="searchData.introduce"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchProject">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="currentPageData" border>
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="introduce" label="介绍"></el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next,sizes"
    :total="Total"
    @current-change="handleCurrentChange"
    :page-size="PageSize"
    :page-sizes="[5, 10, 20, 30]"
    @update:page-size="handlePageSizeChange"
  />
</template>
<script setup lang="ts">
  import { getProjectList, IProject } from '@/api/project';
  import { computed, onMounted, reactive, ref } from 'vue';
  const tableData = ref<IProject[]>([]);
  const currentPage = ref(1);
  const Total = ref(1000);
  const PageSize = ref(5);
  const searchData = reactive({
    title: '',
    introduce: '',
  });
  const handleCurrentChange = (val: number) => {
    currentPage.value = val;
  };

  const currentPageData = computed(() => {
    return tableData.value.slice(
      (currentPage.value - 1) * PageSize.value,
      currentPage.value * PageSize.value,
    );
  });

  const handlePageSizeChange = (val: number) => {
    PageSize.value = val;
  };

  const fetchData = () => {
    return getProjectList().then((res) => {
      tableData.value = res;
      Total.value = res.length;
    });
  };
  onMounted(() => {
    fetchData();
  });

  const searchProject = async () => {
    await fetchData();
    let searchRes = [] as IProject[];
    if (searchData.title || searchData.introduce) {
      searchRes = tableData.value.filter((item) => {
        return (
          item.title.includes(searchData.title) && item.introduce.includes(searchData.introduce)
        );
      });
    } else {
      searchRes = tableData.value;
    }
    tableData.value = searchRes;
    Total.value = searchRes.length;
  };
</script>
