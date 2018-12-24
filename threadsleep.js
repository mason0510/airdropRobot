// //
// // let async = require('async');
// // let Http=require("http");
// // let task=[];
// //
// // //请求百度
// // task.push( callback=>{
// //     console.time("访问三个网站时间统计");
// //     Http.get("http://www.baidu.com/", (res)=>{
// //         console.log("百度"+res.statusCode);
// //         callback(null);
// //     }).on("error", (err)=>{
// //         console.log(err);
// //         callback(err);
// //     })
// // })
// //
// //
// // //请求优酷
// //
// //
// // task.push(callback=>{
// //    // console.log("访问三个网站时间统计")
// //     Http.get("http://www.youku.com/", (res)=>{
// //         console.log("优酷"+res.statusCode);
// //        callback(null);
// //     }).on("error", (err)=>{
// //         console.log(err);
// //
// //     })
// // })
// // //请求腾讯
// // task.push( callback=>{
// //    // console.log("访问三个网站时间统计")
// //     Http.get("http://www.qq.com/", (res)=>{
// //         console.log("腾讯"+res.statusCode);
// //         callback(null)
// //     }).on("error", (err)=>{
// //         console.log(err);
// //
// //     })
// // })
// //
// // //处理返回信息
// // async.waterfall(task, (err,result)=>{
// //     console.timeEnd("j")
// //     if (err) return console.log(err);
// //     console.log("succeful");
// // })
// // // // console.time('small loop');
// // // // for (var i = 0; i < 100000; i++) {
// // // //     ;
// // // // }
// // // // console.timeEnd('small loop');
// // let async = require('async');
// // let http = require('http');
// // let task = [];
// // task.push((callback)=>{
// //     console.time('访问3个网站时间统计');
// //     http.get('http://www.baidu.com/', (res)=> {
// //         console.log("百度访问结果: " + res.statusCode);
// //         setTimeout(function() {
// //             callback(null);
// //         }, 5000);
// //     }).on('error', function(e) {
// //         console.log("百度访问结果: " + e.message);
// //         callback(e);
// //     });
// // })
// //
// // task.push((callback)=>{
// //     http.get('http://www.youku.com/', (res)=> {
// //     console.log("优酷访问结果: " + res.statusCode);
// //     setTimeout(function() {
// //         callback(null);
// //     }, 10000);
// // }).on('error', function(e) {
// //     console.log("优酷访问结果: " + e.message);
// //     callback(e);
// // });
// // })
// //
// // task.push((callback)=>{
// //     http.get('http://www.qq.com/', (res)=> {
// //         console.log("腾讯访问结果: " + res.statusCode);
// //         callback(null);
// //     }).on('error', function(e) {
// //         console.log("腾讯访问结果: " + e.message);
// //         callback(e);
// //     });
// // })
// //
// // async.waterfall(task, (err,result)=>{
// //     console.timeEnd('访问3个网站时间统计');
// //     if(err) return console.log(err);
// //     console.log('全部访问成功');
// // })
//
// //改造。 function(set){}   (set)=>{} function get(){} const test=()=>{}
//
// //导入模块
// let async=require("async");
// let http=require("http");
// let tast=[];
// tast.push((callback)=>{
//     console.time("开始计时");
//     http.get("http://www.baidu.com/",res=>{
//         console.log(res.statusCode);
//         setImmediate callback(null)
//     })
// });
// tast.push((callback)=>{
//
//     http.get("http://www.qq.com/",res=>{
//         console.log(res.statusCode);
//         callback(null)
//     })
// });
// tast.push((callback)=>{
//
//     http.get("http://www.youku.com/",res=>{
//         console.log(res.statusCode);
//         callback(null)
//     })
// });
// async.waterfall(tast,(err,result)=>{
//     console.timeEnd('开始计时');
//     if(err) return console.log(err);
//     console.log("全部成功"+result);
// })
// class Waiter {
//     //返回一个promise 允许使用await等待 直到promise处理完毕
//   async waiter(){
//
//       return await Promise.resolve(1);
//   }
// }
// new Waiter().waiter().then(result=>alert(result))
// async function f() {
//     let response = await fetch('http://no-such-url')
// }
// // f()变成了一个rejected的promise
// f().catch(alert) // TypeError: failed to fetch
//会触发
// new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         throw new Error("Whoops!");
//     }, 1000);
// }).catch(alert);
new Promise(function(resolve) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).then(()=>{console.log("test");})