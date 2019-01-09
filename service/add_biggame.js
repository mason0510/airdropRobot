'use strict'
let User=require("../model/godappusr");
require("../db")
var schedule = require('node-schedule');
const {  JsonRpc } = require('eosjs');

// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
const fetch = require('node-fetch');

// rpc 对象可以运行 eos的rpc命令
const rpc = new JsonRpc('https://api3.eosmetal.io', { fetch });

let count=0;
let account="tpdappincome";

// rpc对象支持promise，所以使用 async/await 函数运行rpc命令
const  runRpc = async (username) => {
    //获取账号操作历史
    const actionHistory = await rpc.history_get_actions(username);
    //遍历所有的交易历史 打印
    if (actionHistory.length === 0) return;
    for (let i in actionHistory.actions) {
        //  获取所有的交易信息
        let block_time = actionHistory.actions[i].block_time
        let memo = actionHistory.actions[i].action_trace.act.data.memo
        let quantity = actionHistory.actions[i].action_trace.act.data.quantity
        let from = actionHistory.actions[i].action_trace.act.data.from
        let to = actionHistory.actions[i].action_trace.act.data.to
        let trx_id = actionHistory.actions[i].action_trace.trx_id
        //save
        let res = await User.findOne({username: from});
        if (to === account) {
            if (!res) {
                //may not be in mongodb 账户名 资产 创建时间
                let user = new User({
                    username: from,
                    assets: quantity,
                    block_time: block_time,
                    trx_id: trx_id,
                    memo: memo,
                    created: Date.now()
                });
                await User.create(user).catch(errmsg => {
                    console.log("error" + errmsg)
                });
                count++;
                console.log("第" + count + "次" + "trx_id" + trx_id + "block_time" + block_time + '+++++from' + '=' + from + "success save");
            }


        }
    }
    ;
}


const  myfunc=async ()=>{
    if (account.length===12){
        runRpc(account).catch(result=>{
            console.log("err"+result)
        })
     }
}

setInterval(myfunc,200,"Interval");

