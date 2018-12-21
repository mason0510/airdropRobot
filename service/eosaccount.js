// require 查询并空投

const Betdice=require("../model/betdice");
const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
//连接节点
// const rpcUrl = 'http://jungle2.cryptolions.io:80'
const fetch = require('node-fetch');

// const actionUrl = 'http://47.89.225.96:8806/v1/chain/get_info' //只找到这个测试节点能够提供actions记录
const rpc = new JsonRpc('https://eosbp.atticlab.net', { fetch });

//处理账户交易记录
async function dealActions(accountName) {
    //获取记录
    // let rpsH=new JsonRpc(actionUrl,{fetch});
    let actionHistory=await rpc.history_get_actions(accountName);
    //获取最近的时间的actions

    //便利所有的交易历史
    for(let i in actionHistory.actions){
        //获取所有的交易信息
        let block_time=actionHistory.actions[i].block_time
        let memo = actionHistory.actions[i].action_trace.act.data.memo
        let quantity = actionHistory.actions[i].action_trace.act.data.quantity
        let from = actionHistory.actions[i].action_trace.act.data.from
        let to = actionHistory.actions[i].action_trace.act.data.to
        let trx_id = actionHistory.actions[i].action_trace.trx_id
        let global_action_seq = actionHistory.actions[i].global_action_seq
        let block_num = actionHistory.actions[i].block_num
        let producer_block_id = actionHistory.actions[i].producer_block_id

        console.log('memos'+i+'='+trx_id)
        //假数据 save mongodb
        if(accounName=="betdicehouse"){
            //保存到数据库
            console.log("save++++"+from)
        }
    }

    return actionHistory
}

//执行扫描 cleos -u http://api.eostribe.io get actions betdicehouse
dealActions("betdiceadmin");

//导出

module.exports={dealActions};