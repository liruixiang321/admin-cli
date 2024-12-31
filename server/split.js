// split.js
const fs = require('fs')
const PDFDocument = require('pdf-lib').PDFDocument;

(async function() {
  // 原文件路径
  const pdfPath = 'book.pdf'
  // 生成每一页的pdf文件
  const docmentAsBytes = fs.readFileSync(pdfPath);
  // 加载pdf文件流
  const pdfDoc = await PDFDocument.load(docmentAsBytes)
  const numberOfPages = pdfDoc.getPages().length;
  for (let i = 0; i < numberOfPages; i++) {
    // 创建一个子文档实例对象
    const subDocument = await PDFDocument.create();
    // 拷贝对应页的文件流
    const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
    // 将拷贝的结果保存在刚创建的子文档实例对象中
    subDocument.addPage(copiedPage);
    // 保存子文档实例对象
    const pdfBytes = await subDocument.save()
    // 将子文档实例对象写入磁盘中，以文件形式存放在根目录下
    await writePdfBytesToFile(`file-${i + 1}.pdf`, pdfBytes);
  }
})()

// 将字节流写入磁盘中
async function writePdfBytesToFile(fileName, pdfBytes) {
  return fs.promises.writeFile(fileName, pdfBytes);
}
