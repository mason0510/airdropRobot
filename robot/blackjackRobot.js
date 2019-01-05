
//获取延时工具 eos实例
let sleep=require("../utils/sleep");
let eoshelper=require("../eoshelper");
let AccountInfo=require("../utils/accountInfo");
let EosAccount50=require("../model/godappusr1/eosusr(0-50)");
let EosAccount=require("../model/eosAccount");
let count=0;
//获取前50个账户 写入数据库
const writedb=async ()=>{
    const results = await EosAccount.find({});
    results.forEach(async (item,index) => {
        if(index<=49){
            //may not be in mongodb 账户名 资产 创建时间
            let res = EosAccount50.find({assets: item.assets}).limit(1);
            if (!res){
                let user1 = new EosAccount50({
                    accountname: item.accountname,
                    privatekey: item.privatekey,
                    publickey: item.publickey,
                    net_limit: { used: item.net_limit.used, available: item.net_limit.available,max:item.net_limit.max  },
                    cpu_limit: { used:item.cpu_limit.used , available: item.cpu_limit.available, max:item.cpu_limit.max},
                    ram_usage: item.ram_usage,
                    created:item.created
                });
                console.log(user1)
                await EosAccount50.create(user1);
            }
        }
    })
    console.log("finish");
};

//开始投注
_bet=async (account,privatekey,quantity,memo)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    console.log("airdrop to",account+memo);
    try {
        await eoshelper.api.myFunc(privatekey).transact({
            actions: [{
                account: "eosio.token",
                name: '0',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }]
            }],
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(account+"当前第"+count+"次下注"+"finish");
        return false;
    }catch (e) {
        console.log("error======"+e);
        return false;
    }
    return true;
}
_open=async (account,privatekey,quantity,memo)=>{
    if(!account&&!privatekey&&!memo){
        return false
    }
    console.log("airdrop to",account+memo);
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
                    from: account,
                    to: "blackjack.e",
                    quantity:"0.1000 EOS",
                    memo: memo,
                },
            }],
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(account+"当前第"+count+"次下注"+"finish");
        return false;
    }catch (e) {
        console.log("error======"+e);
        return false;
    }
    return true;
}




readdb=async ()=>{
    const results = await EosAccount50.find({});
    return results
};

let arr=["0.1000 EOS","0.2000 EOS","0.3000 EOS","0.4000 EOS","0.5000 EOS"];
let memo1="0,,";//下注
let memo2="1,,";//要牌
let memo3="4,,";//开启
let memo4="5,,";//弃牌




sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}

start=async ()=> {
    //获取投注账户
    const results=await readdb();
    for (let i = 0; i <results.length; i++) {
        let number=Math.floor(Math.random()*19)+79
        let quantity=arr[Math.floor(Math.random()*arr.length)]

        console.log(memo);
        console.log(quantity);
        await _bet(results[i].accountname,results[i].privatekey,quantity,memo);
        await sleep(2000)
        //开牌
        await _close(results[i].accountname,results[i].privatekey,quantity,memo);
        count++
    }
    await setTimeout(start,100000)
}

start();
//结束投注



