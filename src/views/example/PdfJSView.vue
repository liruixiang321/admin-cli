<template>
  <div id="pdf-view">
    <div id="pdf-container">
      <canvas
        v-for="page in state.pdfPages"
        :key="page"
        :id="`pdfCanvas${page}`"
        style="border-bottom: 1px solid #d4d2d2"
      />
    </div>
    <div id="text-view"></div>

    <iframe
      :src="`/PDF.js/web/viewer.html?file=${pdf}`"
      width="800px"
      height="800px"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
  const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
  import * as PDF from 'pdfjs-dist';
  import axios from 'axios';
  PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const state = reactive({
    // 文件路径
    pdfPages: '', // 页数
    pdfWidth: '', // 宽度
    pdfSrc: '', // 地址
    pdfScale: 1.0, // 放大倍数
  });
  let pdfDoc: any = null;
  const pdf = ref('');
  function loadFile(url: string) {
    PDF.getDocument(url).promise.then((p: any) => {
      pdfDoc = p;
      const { numPages } = p;
      state.pdfPages = numPages;
      nextTick(() => {
        renderPage(1); // 从第一页开始渲染
      });
    });
  }
  function renderPage(num: number) {
    pdfDoc.getPage(num).then((page: any) => {
      const canvas: any = document.getElementById(`pdfCanvas${num}`);
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
      const ratio = dpr / bsr;
      const viewport = page.getViewport({ scale: state.pdfScale });
      canvas.width = viewport.width * ratio;
      canvas.height = viewport.height * ratio;
      canvas.style.width = '50%';
      canvas.style.height = '50%';
      state.pdfWidth = `${viewport.width}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // 将 PDF 页面渲染到 canvas 上下文中
      const renderContext = {
        canvasContext: ctx,
        viewport,
      };
      page.render(renderContext);
      if (state.pdfPages > num) renderPage(num + 1);
    });
  }

  onMounted(() => {
    axios
      .get('/pdf/book', {
        responseType: 'blob',
      })
      .then((res) => {
        const blob = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        pdf.value = blob;
        loadFile(pdf.value);
      });
  });
</script>
