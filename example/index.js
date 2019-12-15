let {tree, createFile} = require('../dist/index.js');
// 读取根目录磁盘
let res = tree('./src');
// 写入测试目录下的config.json文件下
createFile("./test/config.json",JSON.stringify(res, null, 2))