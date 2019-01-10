let User=require("../model/godappuser");
require("../db/db")
const { JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const rpc = new JsonRpc('https://proxy.eosnode.tools', { fetch });

let count=0;
let actionHistory
// rpc对象支持promise，所以使用 async/await 函数运行rpc命令
const  runRpc = async (username) => {
    //获取账号操作历史 1 500 2 500 3 1500
    for (let i = 0; i <10000000 ; i++) {
        setTimeout(async ()=> {
            // console.log("当前账户"+results[i].username+"总第"+count+"次转账");
            count++;
            actionHistory = await rpc.history_get_actions(username,i*50,i*50+50);
            console.log(actionHistory);
            //遍历所有的交易历史 打印
            for(let i in actionHistory.actions){
                console.log(actionHistory.actions[i]);
                //  获取所有的交易信息
                let block_time=actionHistory.actions[i].block_time
                let memo = actionHistory.actions[i].action_trace.act.data.memo
                let quantity = actionHistory.actions[i].action_trace.act.data.quantity
                let from = actionHistory.actions[i].action_trace.act.data.from
                let to = actionHistory.actions[i].action_trace.act.data.to
                let trx_id = actionHistory.actions[i].action_trace.trx_id
                let res= await User.findOne({username:from}).catch(result=>{console.log(result)});
                if (quantity!==""&&trx_id!==null&&from!=="undefined"&&from!=="whaleextrust"&&to==="whaleextrust"){
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
            },i*1000);


    }
};

//定时任务 newdexpocket

const  myfunc=async ()=>{
        runRpc("whaleextrust");
}

myfunc().catch(result=>{console.log(result)})