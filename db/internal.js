// // let redis = require('redis');
// // let client = redis.createClient('redis://127.0.0.1:6379');
// // let util = require('util');
// // let getAsync = util.promisify(client.get).bind(client);
// //
// // save=()=>{
// //     client.set('abc', '床前明月光，疑是地上霜')
// // };
// //
// // get=async ()=>{
// //    let statement=await client.getAsync('abc');
// //     console.log(statement);
// // };
// //
// // save();
// // get();
// 'use strict'
// // require('./db')
// let redis = require('redis');
// let util = require('util');
// let client = redis.createClient('redis://127.0.0.1:6379');
// let getAsync = util.promisify(client.get).bind(client)
// let lrangeAsync = util.promisify(client.lrange).bind(client)
// let existsAsync = util.promisify(client.exists).bind(client)
// client.on('error', err=>{
//     console.log('redis connect fail: ' + err.toString());
// });
// async function  save() {
//     let key="1";
//     client.lpush(key, JSON.stringify({aa:"aa"}))
// }
// async function  save() {
//     let key="1";
//     client.get(key, JSON.stringify({aa:"aa"}))
// }
// save();
let redis = require("redis"),
    client = redis.createClient();

// async function  save() {
//     let key="1";
//     client.lpush(key, JSON.stringify({aa:"aa"}))
// }

async function  set_count(count) {
    let key="bet_interval_count";
   await client.set(key,count,redis.print)
}

async function get_count(){
  return new Promise(async (resolve)=>{
        await client.get("bet_interval_count", async (err,reply)=>{
            // console.log("reply"+reply);
            resolve (reply)
        })
    })
}
async function  set_beginTime(time) {
    let key="begin_time";
   await client.set(key,time,redis.print)
}

async function get_beginTime(){
    return new Promise(async (resolve)=>{
   await client.get("begin_time", async (err,reply)=>{
        // console.log("reply"+reply);
       //获取时间
       console.log("begin_time:"+reply);
        resolve (reply);
    })
    })
}

// save();
// get();
module.exports={set_count,set_beginTime,get_count,get_beginTime};

// set_count(1);

// test=async ()=>{
//   let aa=await get_count();
//   console.log("================",aa);
// };
// test();

// client.on("error", function (err) {
//     console.log("Error " + err);
// });
//
// //保存
// client.set("key", 1, redis.print);
//
//
//
//  client.get("key", async (err,reply)=>{
//     if (err)throw err;
//     console.log("reply:",reply);
//     console.log(typeof reply);
//     if (reply==="1"){
//         console.log("更新 执行");
//         await client.set("key", 3, redis.print);
//     }
// });
//  client.get("key",(err,response)=> {
//     console.log("最新数据'");
//     if (err)throw err;
//     console.log("reply 更新后的数据:",response);
//     }
// );
