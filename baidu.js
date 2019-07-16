var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = process.env.BAIDU_APP_ID;
var API_KEY = process.env.BAIDU_API_KEY;
var SECRET_KEY = process.env.BAIDU_SECRET_KEY;


var options = {};
options["language_type"] = "CHN_ENG";
options["detect_direction"] = "true";
options["detect_language"] = "true";
options["probability"] = "true";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

// 新建一个对象，建议只保存一个对象调用服务接口
var ocrClient = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = {
    searchImg: (base64img) => {
        return client.advancedGeneral(base64img);
    },
    ocr: (base64img) => {
        return ocrClient.generalBasic(base64img, options);
    }
};


// process.exit(0)
// // 新建一个对象，建议只保存一个对象调用服务接口
// var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

// // 新建一个对象，建议只保存一个对象调用服务接口
// var ocrClient = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);


// var fs = require('fs');

// var image = fs.readFileSync("/tmp/webwxgetmsgimg.jpeg").toString("base64");
// // var image = fs.readFileSync("/home/magicoon/Downloads/918348559.jpg").toString("base64");
// bd.searchImg(image).then(res => {
//     console.log(res);
// }).catch(e => {
//     console.log(e)
// })

// // 调用通用物体识别
// client.advancedGeneral(image).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });

// // 如果有可选参数
// var options = {};
// options["baike_num"] = "5";

// // 带参数调用通用物体识别
// client.advancedGeneral(image, options).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });;





// // 调用通用文字识别, 图片参数为本地图片
// ocrClient.generalBasic(image).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });

// // 如果有可选参数
// var options = {};
// options["language_type"] = "CHN_ENG";
// options["detect_direction"] = "true";
// options["detect_language"] = "true";
// options["probability"] = "true";

// // 带参数调用通用文字识别, 图片参数为本地图片
// ocrClient.generalBasic(image, options).then(function(result) {
//     console.log(result);
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });;

// var url = "http//www.x.com/sample.jpg";

// // 调用通用文字识别, 图片参数为远程url图片
// client.generalBasicUrl(url).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });

// // 如果有可选参数
// var options = {};
// options["language_type"] = "CHN_ENG";
// options["detect_direction"] = "true";
// options["detect_language"] = "true";
// options["probability"] = "true";

// // 带参数调用通用文字识别, 图片参数为远程url图片
// client.generalBasicUrl(url, options).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });;
