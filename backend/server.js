const express = require('express');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');

const app = express();
const PORT = 3000;

// 提供图片的静态资源
app.use('/images', express.static('D:\\Midjourney\\Dataset\\Upscales'));

// 从CSV中读取图片文件的路径
function getImagesFromCSV() {
    const csvFilePath = 'D:\\Midjourney\\Dataset\\ALL20230713.csv';
    const csvFileContent = fs.readFileSync(csvFilePath, 'utf-8');

    // 使用papaparse解析CSV文件内容
    const results = Papa.parse(csvFileContent, {
        header: false,
        delimiter:';',
    });

    console.log("Total number of rows:", results.data.length);

    // 根据你CSV的结构，获取图片的路径，并转化为URL
    return results.data.map(row => `http://localhost:${PORT}/images/${row.image_path}`);
}

// 获取图片列表的接口并实现分页
app.get('/api/images', (req, res) => {
    const images = getImagesFromCSV();
    
    const limit = parseInt(req.query.limit) || 10;  // 默认每页显示10张
    const page = parseInt(req.query.page) || 1;     // 默认页码为1

    // 计算开始和结束的索引
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // 切片操作来获取当前页面的数据
    const paginatedImages = images.slice(startIndex, endIndex);

    // 返回分页后的结果
    res.json(paginatedImages);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
