const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


const csvFilePath = 'D:\\Midjourney\\Dataset\\ALL20230713.csv';
const csvFileContent = fs.readFileSync(csvFilePath, 'utf-8');

// 使用papaparse解析CSV文件内容
Papa.parse(csvFileContent, {
    header: false,
    delimiter:';',
    complete: function(results) {
        // 打印前10张图的路径
        for (let i = 0; i < 10 && i < results.data.length; i++) {
            console.log(results.data[i][2]);  // 这里假设CSV的列名是'path'，你可能需要根据实际情况调整
        }
    }
});