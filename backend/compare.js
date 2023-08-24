const express = require('express');
const { readFile } = require('fs').promises;
const Papa = require('papaparse');
const path = require('path');

const PORT = 3000;
const STATIC_IMAGE_PATH = 'D:\\Midjourney\\Dataset\\Upscales';
const CSV_PATH = 'D:\\Midjourney\\Dataset\\ALL20230713.csv';

const app = express();
let imageData = []; // 用于存储解析后的图片数据

// 提供图片的静态资源
app.use('/images', express.static(STATIC_IMAGE_PATH));

// 从CSV中读取图片文件的路径
async function getImagesFromCSV() {
    const csvFileContent = await readFile(CSV_PATH, 'utf-8');

    return new Promise((resolve, reject) => {
        Papa.parse(csvFileContent, {
            header: false,
            delimiter: ';',
            complete: function(results) {
                console.log("Total number of rows:", results.data.length);
                imageData = results.data.map(row => {
                    const fileName = path.basename(row[1]); 
                    const url = `http://localhost:${PORT}/images/${fileName}`;
                    const cmd = row[2];  
                    const prompt = row[3];

                    return [url, cmd, prompt];
                });
                resolve(imageData);
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

// 获取图片列表的接口并实现分页
app.get('/images', (req, res) => {    
    const limit = parseInt(req.query.limit) || 30;  
    const page = parseInt(req.query.page) || 1;     
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedImages = imageData.slice(startIndex, endIndex);
    res.json(paginatedImages);
});

// 启动服务器前先解析CSV
async function startServer() {
    try {
        await getImagesFromCSV();
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error while reading CSV:', err);
    }
}

startServer();
