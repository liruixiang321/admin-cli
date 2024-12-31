<template>
  <div class="container">
    <div class="pdf-box">
      <VuePdfEmbed
        annotationLayer
        textLayer
        @rendering-failed="handleRenderFailed"
        :source="doc"
        class="vue-pdf-embed"
      />
    </div>
    <div class="operation">
      <button @click="handleClick('prev')">&lt;</button>
      <span>{{ pageNum }}/{{ pageTotalNum }}</span>
      <button @click="handleClick('next')">&gt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, nextTick } from 'vue';
  import VuePdfEmbed, { useVuePdfEmbed } from 'vue-pdf-embed';

  import 'vue-pdf-embed/dist/styles/annotationLayer.css';
  import 'vue-pdf-embed/dist/styles/textLayer.css';
  import axios from 'axios';

  onMounted(() => {
    request();
  });

  const pageTotalNum = ref(0); // 总页数
  const pageNum = ref(1);
  const pdfSource = ref('');

  // 用来排查展示失败错误
  const handleRenderFailed = (err) => {
    console.log(err, 'err');
  };

  // 请求获取pdf对应页码的文件流，并转为url
  const request = async () => {
    pdfSource.value = '';
    axios
      .get(`/pdf/${pageNum.value}`, {
        responseType: 'blob',
      })
      .then((res) => {
        pageTotalNum.value = +res.headers.totalpage;
        const blob = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        pdfSource.value = blob;
      });
  };

  const handleClick = (type: string) => {
    if (type === 'prev') {
      pageNum.value--;
    } else if (type === 'next') {
      pageNum.value++;
    }
    if (pageNum.value <= 0) {
      pageNum.value = pageTotalNum.value;
    } else if (pageNum.value > pageTotalNum.value) {
      pageNum.value = 1;
    }
    window.URL.revokeObjectURL(pdfSource.value); //当你完成对对象 URL 的使用后，请调用此方法，让浏览器知道无需再保持对文件的引用。
    nextTick(() => {
      request();
    });
  };
  const { doc } = useVuePdfEmbed({
    source: pdfSource,
  });

  watch(
    () => pageNum.value,
    () => {
      doc.value?.destroy();
    },
    {
      immediate: true,
    },
  );
</script>

<style scoped lang="scss">
  .container {
    width: 500px;
    background-color: #999;

    .pdf-box {
      width: 100%;
      height: 100%;
    }
  }

  .operation {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 50px;
      text-align: center;
    }
  }

  button {
    width: 50px;
    height: 50px;
  }
</style>
