//重构空投

/**
 * 重构空投项目
 * **/
let request = require("request");
//获取eos
Eos=require("eosjs");
//连接数据库
require("./db")
//获取
let api=require("./eoshelper");

//获取对应的表
let AirUser=require("./model/godappusr1/eosusr(0-50)");

let count=0;


//获取空投账户
// const accounts = [
//     'geydmnrzgene',
//     'godapp12122',
//     'zzzzz2zzzzzz',
//     'miaoman12345',
//     'dennis.e',
//     'hicodemonkey',
// ]
const accounts = []
// const accounts=["zhangaccount"];



sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}


getAccounts= async ()=>{
    if (accounts.length === 0){
        let results= await AirUser.find({});
        return results;
    }else {
        console.log("accounts");
        return accounts;
    }
}


airdrop=async (memo)=>{
    console.log("transfer");
    if (memo==null){return}
    let results=await getAccounts();
    for (let i = 0; i <results.length ; i++) {

         await _airdrop(results[i].accountname,'10.1000 EOS',memo)
        //await _airdrop(results[i],memo)
        await sleep(500)
        count++
        console.log("当前转账账户"+results[i].accountname+"总第"+count+"次转账")
      //  console.log("当前转账账户"+results[i]+"总第"+count+"次转账")
    }
    console.log("finished");
}

reset= async ()=>{
    //将所有空投设置为false
    let results= await AirUser.find({});
    for (let i = 0; i <results.length ; i++) {
        let query={username:results[i].username};
        await  AirUser.findOneAndUpdate(query, { isDrop: false }, {multi: true},()=>{
            console.log(results[i].username+"reset");
        })
        }
    console.log("reset finished");
}


markDropped=async (account,quantity)=>{
    //记录数据库

    let query={username:account};

    try {
        //用户在数据库中才修改 没在先添加再修改
        let res = AirUser.find(query).limit(1);
        if (!res) {
            console.log(account+"用户不存在")
            //may not be in mongodb 账户名 资产 创建时间
            let user1 = new AirUser({
                assets: "10.0000 EOS"
                        });
           // await AirUser.create(user1);
            //console.log("保存成功"+user1.username)
        }else {
            await  AirUser.findOneAndUpdate(query, { assets: quantity }, {multi: true},()=>{
                console.log(account+"isDrop"+"success");
            })
        }

    }catch (e) {
        throw "err"
    }
}

_airdrop=async (account,quantity,memo)=>{
    if(!account){
        return false
    }
    console.log("airdrop to",account);
    try {
        await api.transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: 'godapp.e',
                    permission: 'active',
                }],
                data: {
                    from: 'godapp.e',
                    to: account,
                    quantity: '10.1000 EOS',
                    memo: memo,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });

       await markDropped(account,quantity)
        return false;
    }catch (e) {
        console.log(e);
        return false;
    }
    return true;

}


start=async ()=> {
       // await reset();
        await airdrop("first stage,50 dice robot account, every account 10EOS");
}

start();