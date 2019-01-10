
//获取延时工具 eos实例
let sleep=require("../utils/sleep");
let eoshelper=require("../utils/eoshelper");
let AccountInfo=require("../utils/accountInfo");
let EosAccount50=require("../model/godappusr1/eosusr(0-50)");
let EosAccount=require("../model/eosAccount");
let count=0;
//获取前50个账户 写入数据库

_open=async (account,privatekey,quantity,memo,action)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    console.log("opencard=====",account+"====="+memo);
    try {
        await eoshelper.api.myFunc(privatekey).transact({
            actions: [{
                account: "blackjack.e",
                name: 'playeraction',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    player: account,
                    action: action,
                },
            }],
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log("总第"+count+"次"+account+"开牌");
        return false;
    }catch (e) {
        console.log("error======"+e);
        return false;
    }
    return true;
}


let arr=["0.1000 EOS","0.2000 EOS","0.3000 EOS","0.4000 EOS","0.5000 EOS"];
let memo1="0,,";//下注
let memo2="1,,";//要牌
let memo3="4,,";//开启
let memo4="5,,";//弃牌

let action3=4.0;
let action4=5.0;


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}


_open("aizxgztvwfnw","5JyuFGqUt8WCA6AYdbG4r89XHDfVgRjTFZ8thb331h1ESwkJLWK",0,memo3);