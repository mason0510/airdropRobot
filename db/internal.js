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

const rejson = require('redis-rejson');

rejson(redis);//将redis的所有包含到rejson中

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
            console.log("reply count"+reply);
            resolve (reply)
        })
    })
}
async function  set_beginTime(time) {
    let key="begin_time";
    console.log("set_beginTime"+time);
   await client.set(key,time,redis.print)
}

async function get_beginTime(){
    return new Promise(async (resolve)=>{
   await client.get("begin_time", async (err,reply)=>{
        console.log("reply"+reply);
       //获取时间
       console.log("get_beginTime:"+reply);
        resolve (reply);
    })
    })
}
async function  set_verify(verify) {
    let key="verify";
    await client.set(key,verify,redis.print)
}

async function get_verify(){
    return new Promise(async (resolve)=>{
        await client.get("verify", async (err,reply)=>{
            // console.log("reply"+reply);
            //获取时间
            console.log("verify:"+reply);
            console.log("verify:"+typeof reply);
            resolve (reply);
        })
    })
}
async function  set_position(num) {
    let key="position";
    await client.set(key,num,redis.print)
}

async function get_position(){
    return new Promise(async (resolve)=>{
        await client.get("position", async (err,reply)=>{
            // console.log("reply"+reply);
            //获取时间
            console.log("position:"+reply);
            resolve (reply);
        })
    })
}

async function  set_verifyres(res) {
    let key="verifyres";
    await client.set(key,res,redis.print)
}

async function get_verifyres(){
    return new Promise(async (resolve)=>{
        await client.get("verifyres", async (err,reply)=>{
            console.log("reply"+reply);
            //获取时间
            console.log("verifyres:"+reply);
            resolve (reply);
        })
    })
}



async function  set_playerInfo(player) {
    let key="player";
    //报错
    await client.set(key,player,redis.print)
}
//打印
//playerInfos[{"id":12627,"game_id":6878,"player":"dappgoqqqqqq",
// "referer":"houseaccount","bet":"10.0000 EOS","bet_type":2}]
//             async function get_PlayerInfo(){
//                 return new Promise(async (resolve)=> {
//                     await client.get("playerInfo", async (err, reply) => {
//                         // console.log("reply"+reply);
//                         //获取时间
//                         // console.log("playerInfo:"+reply);
//                         // console.log(reply);
//                     )}
//                     })
//                 }
//             }
            async function get_PlayerInfo(){
                return new Promise(async (resolve)=>{
                    await client.get("player",async (err,reply)=>{
                        if (err)console.log(err); 
                        console.log(reply);
                        resolve(reply)
                    })
                })
            }

            async function set_internal_time(internal_time) {
                let key = "internal_time";
                await client.set(key, internal_time, redis.print)
            }

            async function get_internal_time() {
                return new Promise(async (resolve) => {
                    await client.get("internal_time", async (err, reply) => {
                        // console.log("reply"+reply);
                        //获取时间
                        console.log("internal_time:" + reply);
                        resolve(reply);
                    })
                })
            }

//获取数据
            async function set_beforeDb(res) {
                let key = "beforeDb";
                await client.set(key, res, redis.print)
            }

            async function get_beforeDb() {
                return new Promise(async (resolve) => {
                    await client.get("beforeDb", async (err, reply) => {
                        // console.log("reply"+reply);
                        //获取时间
                        // console.log("beforeDb:"+reply);
                        resolve(reply);
                    })
                })
            }

//  get_beforeDb=()=>{
//     return new Promise(async (resolve)=>{
//         await client.get("beforeDb", async (err,reply)=>{
//             // console.log("reply"+reply);
//             //获取时间
//             // console.log("beforeDb:"+reply);
//             resolve (reply);
//         })
//     })
// }
            async function set_afterDb(res) {
                let key = "afterDb";
                await client.set(key, res, redis.print)
            }

            async function get_afterDb() {
                return new Promise(async (resolve) => {
                    await client.get("afterDb", async (err, reply) => {
                        // console.log("reply"+reply);
                        //获取时间
                        // console.log("afterDb:"+reply);
                        resolve(reply);
                    })
                })
            }

            async function set_testDb(res) {
                let key = "testDb";
                await client.set(key, res, redis.print)
            }

            async function get_testDb() {
                return new Promise(async (resolve) => {
                    await client.get("testDb", async (err, reply) => {
                        console.log("reply" + reply);
                        //获取时间
                        console.log("testDb:" + reply);
                        resolve(reply);
                    })
                })
            }
        async function set_Internal(overtime) {
            let key = "overtime";
            await client.set(key, overtime, redis.print)
        }

        async function get_Internal() {
            return new Promise(async (resolve) => {
                await client.get("overtime", async (err, reply) => {
                    console.log("reply" + reply);
                    //获取时间
                    console.log("overtime:" + reply);
                    resolve(reply);
                })
            })
        }

async function set_DbType(DbType) {
    let key = "DbType";
    await client.set(key, DbType, redis.print)
}

async function get_DbType() {
    return new Promise(async (resolve) => {
        await client.get("DbType", async (err, reply) => {
            console.log("reply DbType" + reply);
            //获取时间
            console.log("DbType:" + reply);
            resolve(reply);
        })
    })
}

async function set_Time(overtime) {
    let key = "judgetime";
    await client.set(key, overtime, redis.print)
}

async function get_Iime() {
    return new Promise(async (resolve) => {
        await client.get("judgetime", async (err, reply) => {
            console.log("reply judgetime" + reply);
            //获取时间
            console.log("judgetime:" + reply);
            resolve(reply);
        })
    })
}
async function save_playerInfos(playerInfos) {
    let key = "playerInfos";
    await client.set(key, playerInfos, redis.print)
}

async function fetch_playerInfos() {
    return new Promise(async (resolve) => {
        await client.get("playerInfos", async (err, reply) => {
            console.log("reply playerInfos" + reply);
            //获取时间
            console.log("playerInfos:" + reply);
            resolve(reply);
        })
    })
}
async function set_keys(keys) {
    let key = "keys";
    await client.set(key, keys, redis.print)
}

async function get_keys() {
    return new Promise(async (resolve) => {
        await client.get("keys", async (err, reply) => {
            console.log("reply keys" + reply);
            //获取时间
            console.log("keys:" + reply);
            resolve(reply);
        })
    })
}

async function set_humanais(humanais) {
    let key = "humanais";
    await client.set(key, humanais, redis.print)
}

async function get_humanais() {
    return new Promise(async (resolve) => {
        await client.get("humanais", async (err, reply) => {
            if (err)console.log(err); 
            console.log(reply);
            resolve(reply);
        })
    })
}


// save();
// get();
 module.exports = {set_humanais,get_humanais,set_keys,get_keys,fetch_playerInfos,save_playerInfos,
                set_playerInfo,
                set_DbType,
                get_DbType,
                get_Iime,
                set_Time,
                set_Internal,
                get_Internal,
                set_testDb,
                get_testDb,
                get_afterDb,
                set_afterDb,
                set_beforeDb,
                get_beforeDb,
                get_verifyres,
                set_verifyres,
                get_PlayerInfo,
                set_playerInfo,
                set_count,
                set_beginTime,
                get_count,
                get_beginTime,
                set_verify,
                get_verify,
                get_position,
                set_position
            };

// set_verify(false);
// get_verify();

// get_beforeDb();
// get_afterDb();
// set_count(1);

// robot=async ()=>{
//   let aa=await get_count();
//   console.log("================",aa);
// };
// robot();

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


// let getPlayer=async ()=>{
//     let obj=await get_PlayerInfo();
//     console.log(JSON.stringify(obj));
// };
// getPlayer();
