const fs = require('fs');
const express = require('express');
const app = express();

app.get('/pdf/book', async (req, res) => {
  // 读入请求参数对应页码的文件流
  const pdf = fs.readFileSync(`book.pdf`);
  // 将文件页码总数写入到header中，返回给前端
  res.setHeader('totalPage', 14);
  // 返回文件流
  res.send(pdf);
});
// 获取某一页的pdf文件流
app.get('/pdf/:page', async (req, res) => {
  // 读入请求参数对应页码的文件流
  const pdf = fs.readFileSync(`file-${+req.params.page}.pdf`);
  // 将文件页码总数写入到header中，返回给前端
  res.setHeader('totalPage', 14);
  // 返回文件流
  res.send(pdf);
});

// 启动服务器
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
