Eos=require("eosjs");
//连接数据库
require("./db")

//延时工具
let Ut = require("./utils/common");

//获取对应的表
let AirUser=require("./model/allusers");

// config={
//     keyProvider: ['5KNf32JrmzQHdvvVU62FvSR8HxDHfaceqBSQxvmp5eQiw4yQNNr'], // 配置私钥字符串 私钥
//     httpEndpoint: 'https://eos.greymass.com', //DEV开发链url与端口 正式服务器 https://eosbp.atticlab.net
//     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 通过cleos get info可以获取chainId
//     expireInSeconds: 60,
//     broadcast: true,
//     debug: false,
//     sign: true,
//     authorization: null
// }
//
// //要求低版本的
// eos = Eos(config);


// options = {
//     authorization: 'godapp.e@active',
//     broadcast: true,
//     sign: true
// }
options = {
    authorization: 'eosluckcoin1@active',
    broadcast: true,
    sign: true
}

let api=require("./eoshelper");

let count=0;

//查询所有不重复的用户
const airdrop=async ()=>{
    let results= await AirUser.find({});
   // console.log(results);
    for (let i = 0; i <results.length; i++) {
     //  await setTimeout( async function () {
        //setTimeout(async function () {
            count++;
            if (results[i].b1=="gu2dambzg4ge") {
                console.log(count);
            }
         // await _airdrop(results[i].b1,"最新最燃爆的dapp游戏，你知道是什么吗？2019赚赚赚！！ 网址 godapp.com/dice");
       // }, i * 220);
    }
};

sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}

airdrop().catch(err=>{
    console.log("result"+err);
});



_airdrop=async (account,memo)=>{
    if(!account){
        return false
    }
    console.log("airdrop to" + account + "总第" + count + "次转账")
   // console.log("airdrop to",account);
    try {
        await api.transact({
            actions: [{
                account: 'eosluckcoin1',
                name: 'transfer',
                authorization: [{
                    actor: 'eosluckcoin1',
                    permission: 'active',
                }],
                data: {
                    from: 'eosluckcoin1',
                    to: account,
                    quantity: '100.0000 LUCK',
                    memo: memo,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });

      //  await markDropped(account)
        return false;
    }catch (e) {
        console.log(e);
        //再次空投
        await _airdrop(account,"最新最燃爆的dapp游戏，你知道是什么吗？2019赚赚赚！！ 网址 godapp.com/dice");
        //再次空投
        console.log("再次空投"+account);
        return false;
    }
    return true;

}



