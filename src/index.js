/**
 * ---------------------------------------------------------
 *    基于fs封装的服务端文件操作库
 * 
 *   * tree 读取磁盘所有文件和文件夹 树形结构
 *   * createFile 创建文件 包含文件夹和文件
 * 
 *  
 *  example:
 * 
 * let res = tree('./src/');
 * createFile("./test/config.json",JSON.stringify(res, null, 2))
 * 
 * 
 * ---------------------------------------------------------
 */

    var fs = require('fs');
    /**
     *  读取目录生成树形数据
     * @param {*} path  本地磁盘路径
     * 
     *  生成树形结构
     *  {
     *    a: '' , // a 表示文件名
     *    b: {    // b 表示文件夹名
     *        c: ''
     *    }
     *  }
     */
    export const tree = path => {
        let fileNames = {};
        if (fs.existsSync(path)) {
            let files = fs.readdirSync(path);
            files.forEach((file) => {
                let curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    // console.log('文件夹：', curPath)
                    fileNames[file] = tree(curPath);
                } else {
                    fileNames[file] = '';
                    // console.log('文件：', file)
                }
            });
        } else {
            console.log('目录路径不存在');
        }
        return fileNames;
    }


    // 指定路径创建文件
    function makeFile(path, fileStr, errorCb) {
        let defaultErrorCallback = function (error) {
            console.log(error)
        }
        fs.writeFileSync(path, fileStr, errorCb || defaultErrorCallback);
    }

    /**
     * 循环创建目录
     * @param {*} url 
     */
    function makeDirectory(url) {
        let paths = url.split('/'); //将a/b/c拆分成数组['a','b','c']
        let index = 0;
        function make(path) {
            if (index === paths.length + 1) { // 如果到终点，停止递归
                return false;
            }
            if (!fs.existsSync(path)) { //不存在
                //创建文件夹
                fs.mkdir(path, function () {
                    make(paths.slice(0, ++index).join('/'))
                })
            } else { //存在
                make(paths.slice(0, ++index).join('/'))
            }
        }
        make(paths[index++]) //先取出第一个
    }


    // 创建文件
    // 目录不存在时,创建目录
    // 文件存在时，覆写原来的文件。
    export const  createFile = (path, contentStr, errorCallback) =>{
        let paths = path.split('/');
        let directoryPath = paths.slice(0, paths.length - 1).join('/');
        if (!fs.existsSync(directoryPath)) { //目录不存在
            makeDirectory(directoryPath);
        }
        makeFile(path, contentStr, errorCallback);
    }


