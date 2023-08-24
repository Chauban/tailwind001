const express = require('express');
const cors = require('cors');
const { readFile } = require('fs').promises;
const Papa = require('papaparse');
const path = require('path');

const PORT = 3000;
const STATIC_IMAGE_PATH = 'D:\\Midjourney\\Dataset';
const CSV_PATH = 'D:\\Midjourney\\Dataset\\ALL20230713.csv';

const app = express();
app.use(cors());

let imageData = []; // 用于存储解析后的图片数据

// 提供图片的静态资源
// 这是 Express 中的内置中间件函数，用于托管静态文件。函数的参数是你希望作为静态资源的地址
app.use('/images', express.static(STATIC_IMAGE_PATH));


// 从CSV中读取图片文件的路径
async function getImagesFromCSV() {
    const csvFileContent = await readFile(CSV_PATH, 'utf-8');

    // 使用一个Promise来处理PapaParse，因为它仍然是基于回调的
    return new Promise((resolve, reject) => {
        Papa.parse(csvFileContent, {
            header: false,
            delimiter: ';',
            complete: function(results) {
                // 过滤无效的行
                results.data = results.data.filter(row => row && row[2]);

                console.log("Total number of rows:", results.data.length);

                // 在这里转换完整的文件路径为URL格式
                imageData = results.data.map(row => {
                    const filePath = row[2]
                    // console.log(filePath.split('\\').slice(3).join('\\'))
                    // const fileName = path.basename(filePath); // 因为路径在第3列，所以用fullPath[1]
                    // const parentDirectory = path.basename(path.dirname(filePath));
                    // const url = `http://localhost:${PORT}/images/${path.join(parentDirectory, fileName)}`;
                    const url = `http://localhost:${PORT}/images/${filePath.split('\\').slice(3).join('\\')}`
                    const cmd = row[2];  // row[2] 是cmd
                    const prompt = row[3];  // row[3] 是prompt

                    return {
                        url: url,
                        cmd: cmd,
                        prompt: prompt
                    };
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
    const limit = parseInt(req.query.limit) || 30;  // 默认每页显示10张
    const page = parseInt(req.query.page) || 1;     // 默认页码为1
    // 计算开始和结束的索引
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    console.log('Respond image from index',startIndex, 'to', endIndex)

    // 切片操作来获取当前页面的数据
    const paginatedImages = imageData.slice(startIndex, endIndex);

    // 返回分页后的结果
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