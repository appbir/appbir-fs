(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["fs"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("fs"));
	else
		root["index"] = factory(root["fs"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

    var fs = __webpack_require__(1);
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
    const tree = path => {
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
/* harmony export (immutable) */ __webpack_exports__["tree"] = tree;



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
    const  createFile = (path, contentStr, errorCallback) =>{
        let paths = path.split('/');
        let directoryPath = paths.slice(0, paths.length - 1).join('/');
        if (!fs.existsSync(directoryPath)) { //目录不存在
            makeDirectory(directoryPath);
        }
        makeFile(path, contentStr, errorCallback);
    }
/* harmony export (immutable) */ __webpack_exports__["createFile"] = createFile;





/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNzU0YWY1ZDY2NjEzNDk3NTExYyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxDQUFJO0FBQ3pCO0FBQ0E7QUFDQSxlQUFlLEVBQUU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFBQTtBQUFBOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsSUFBVztBQUNYO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUFBO0FBQUE7Ozs7Ozs7OztBQzdGTCwrQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImZzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImZzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImluZGV4XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZnNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImluZGV4XCJdID0gZmFjdG9yeShyb290W1wiZnNcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA3NTRhZjVkNjY2MTM0OTc1MTFjIiwiLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgICDln7rkuo5mc+WwgeijheeahOacjeWKoeerr+aWh+S7tuaTjeS9nOW6k1xyXG4gKiBcclxuICogICAqIHRyZWUg6K+75Y+W56OB55uY5omA5pyJ5paH5Lu25ZKM5paH5Lu25aS5IOagkeW9oue7k+aehFxyXG4gKiAgICogY3JlYXRlRmlsZSDliJvlu7rmlofku7Yg5YyF5ZCr5paH5Lu25aS55ZKM5paH5Lu2XHJcbiAqIFxyXG4gKiAgXHJcbiAqICBleGFtcGxlOlxyXG4gKiBcclxuICogbGV0IHJlcyA9IHRyZWUoJy4vc3JjLycpO1xyXG4gKiBjcmVhdGVGaWxlKFwiLi90ZXN0L2NvbmZpZy5qc29uXCIsSlNPTi5zdHJpbmdpZnkocmVzLCBudWxsLCAyKSlcclxuICogXHJcbiAqIFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4gICAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICAgIC8qKlxyXG4gICAgICogIOivu+WPluebruW9leeUn+aIkOagkeW9ouaVsOaNrlxyXG4gICAgICogQHBhcmFtIHsqfSBwYXRoICDmnKzlnLDno4Hnm5jot6/lvoRcclxuICAgICAqIFxyXG4gICAgICogIOeUn+aIkOagkeW9oue7k+aehFxyXG4gICAgICogIHtcclxuICAgICAqICAgIGE6ICcnICwgLy8gYSDooajnpLrmlofku7blkI1cclxuICAgICAqICAgIGI6IHsgICAgLy8gYiDooajnpLrmlofku7blpLnlkI1cclxuICAgICAqICAgICAgICBjOiAnJ1xyXG4gICAgICogICAgfVxyXG4gICAgICogIH1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNvbnN0IHRyZWUgPSBwYXRoID0+IHtcclxuICAgICAgICBsZXQgZmlsZU5hbWVzID0ge307XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcclxuICAgICAgICAgICAgbGV0IGZpbGVzID0gZnMucmVhZGRpclN5bmMocGF0aCk7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJQYXRoID0gcGF0aCArIFwiL1wiICsgZmlsZTtcclxuICAgICAgICAgICAgICAgIGlmIChmcy5zdGF0U3luYyhjdXJQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+aWh+S7tuWkue+8micsIGN1clBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWVzW2ZpbGVdID0gdHJlZShjdXJQYXRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWVzW2ZpbGVdID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+aWh+S7tu+8micsIGZpbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnm67lvZXot6/lvoTkuI3lrZjlnKgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbGVOYW1lcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g5oyH5a6a6Lev5b6E5Yib5bu65paH5Lu2XHJcbiAgICBmdW5jdGlvbiBtYWtlRmlsZShwYXRoLCBmaWxlU3RyLCBlcnJvckNiKSB7XHJcbiAgICAgICAgbGV0IGRlZmF1bHRFcnJvckNhbGxiYWNrID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIGZpbGVTdHIsIGVycm9yQ2IgfHwgZGVmYXVsdEVycm9yQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6q546v5Yib5bu655uu5b2VXHJcbiAgICAgKiBAcGFyYW0geyp9IHVybCBcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbWFrZURpcmVjdG9yeSh1cmwpIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSB1cmwuc3BsaXQoJy8nKTsgLy/lsIZhL2IvY+aLhuWIhuaIkOaVsOe7hFsnYScsJ2InLCdjJ11cclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2UocGF0aCkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHBhdGhzLmxlbmd0aCArIDEpIHsgLy8g5aaC5p6c5Yiw57uI54K577yM5YGc5q2i6YCS5b2SXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGgpKSB7IC8v5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICAvL+WIm+W7uuaWh+S7tuWkuVxyXG4gICAgICAgICAgICAgICAgZnMubWtkaXIocGF0aCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2UocGF0aHMuc2xpY2UoMCwgKytpbmRleCkuam9pbignLycpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy/lrZjlnKhcclxuICAgICAgICAgICAgICAgIG1ha2UocGF0aHMuc2xpY2UoMCwgKytpbmRleCkuam9pbignLycpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1ha2UocGF0aHNbaW5kZXgrK10pIC8v5YWI5Y+W5Ye656ys5LiA5LiqXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOWIm+W7uuaWh+S7tlxyXG4gICAgLy8g55uu5b2V5LiN5a2Y5Zyo5pe2LOWIm+W7uuebruW9lVxyXG4gICAgLy8g5paH5Lu25a2Y5Zyo5pe277yM6KaG5YaZ5Y6f5p2l55qE5paH5Lu244CCXHJcbiAgICBleHBvcnQgY29uc3QgIGNyZWF0ZUZpbGUgPSAocGF0aCwgY29udGVudFN0ciwgZXJyb3JDYWxsYmFjaykgPT57XHJcbiAgICAgICAgbGV0IHBhdGhzID0gcGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIGxldCBkaXJlY3RvcnlQYXRoID0gcGF0aHMuc2xpY2UoMCwgcGF0aHMubGVuZ3RoIC0gMSkuam9pbignLycpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXJlY3RvcnlQYXRoKSkgeyAvL+ebruW9leS4jeWtmOWcqFxyXG4gICAgICAgICAgICBtYWtlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYWtlRmlsZShwYXRoLCBjb250ZW50U3RyLCBlcnJvckNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9