//diceusers
'use strict'
let User=require("../model/godappuser");
require("../db")
var schedule = require('node-schedule');
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');

// 只有在node.js环境下，才需要以下模组； 浏览器不需要引入这个模组。
const fetch = require('node-fetch');
// 只有在node.js / IE11 /IE Edge 浏览器环境下，需要以下模组；
const { TextDecoder, TextEncoder } = require('text-encoding');

// rpc 对象可以运行 eos的rpc命令
// rpc 命令查询 https://eosio.github.io/eosjs/classes/json_rpc.jsonrpc.html
//http://eos.greymass.com/
//http://eu.eosdac.io
const rpc = new JsonRpc('https://eos.greymass.com', { fetch });

let count=0;

// rpc对象支持promise，所以使用 async/await 函数运行rpc命令
const  runRpc = async (username) => {
    //获取账号操作历史
    const actionHistory = await rpc.history_get_actions(username,0,500);

    //遍历所有的交易历史 打印
     for(let i in actionHistory.actions){
    //  获取所有的交易信息
        let block_time=actionHistory.actions[i].block_time
        let memo = actionHistory.actions[i].action_trace.act.data.memo
        let quantity = actionHistory.actions[i].action_trace.act.data.quantity
        let from = actionHistory.actions[i].action_trace.act.data.from
        let to = actionHistory.actions[i].action_trace.act.data.to
        let trx_id = actionHistory.actions[i].action_trace.trx_id
        // let global_action_seq = actionHistory.actions[i].global_action_seq
        // let block_num = actionHistory.actions[i].block_num
        // let producer_block_id = actionHistory.actions[i].producer_block_id
         //save mongodb  query table
          let res= await User.findOne({username:from}).catch(result=>{console.log(result)});
         if (quantity!==""&&trx_id!==null&&from!=="undefined"&&from!=="eosbetcrash1"&&to==="eosbetcrash1"){
             if(!res){
                 //may not be in mongodb 账户名 资产 创建时间
                 let user=new User({
                     username:from,
                     assets:quantity,
                     block_time:block_time,
                     trx_id:trx_id,
                     memo:memo,
                     created:Date.now()
                 });
                 await User.create(user).catch(errmsg=>{console.log("error"+errmsg)});
                 console.log("保存成功")
             }
         }
         count++;
         console.log("第"+count+"次"+"trx_id"+trx_id+"block_time"+block_time+'+++++from'+'='+from);
    }
};

//定时任务 newdexpocket

const  myfunc=async (Interval)=>{
        runRpc("eosbetcrash1").catch(result=>{
            //get info
            console.log("异常情况"+result)
        })
}

setInterval(myfunc,1000,"Interval");

