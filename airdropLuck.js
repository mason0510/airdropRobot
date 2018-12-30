//重构空投

/**
 * 重构空投项目
 * **/

let dbHelper=require("./dbhelper")

//连接数据库
//let config=require("./db")

//获取用户
let AirUser=require("./model/godappuser");


//获取eos
let api=require("./eoshelper");

//转账配置
options = {
    authorization: 'eosluckcoin1@active',
    broadcast: true,
    sign: true
}

//获取空投账户
// const accounts = [
//     // 'geydmnrzgene',
//     // 'gy4tiobtgene',
//     // 'bijingaaaaaa',
//     // 'gm3doobqgene',
//     // 'godofwealths',
//     // 'gy2dcmjzgige',
//     // 'fuckyoumommm',
//     // 'airdropsdac1',
//     // 'sayyousayme1',
//     // 'wangruixiwww',
// ]
const accounts=[];



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
    console.log("airdrop");
    if (memo==null){return}
    let results=await getAccounts();
    for (let i = 0; i <results.length ; i++) {
        await _airdrop(results[i].username,memo)
        //await _airdrop(results[i],memo)
        await sleep(500)
    }
    console.log("airdrop finished");
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


markDropped=async (account)=>{
    //记录数据库

    let query={username:account};

    try {
        //用户在数据库中才修改 没在先添加再修改
        let res = AirUser.find(query).limit(1);
        if (!res) {
            console.log("用户不存在")
            //may not be in mongodb 账户名 资产 创建时间
            let user1 = new AirUser({
                            username: account,
                            assets: "0.0000 EOS",
                            block_time: "",
                            trx_id: "",
                            memo: "",
                            created: Date.now(),
                            isDrop: false
                        });
            await AirUser.create(user1);
            console.log("保存成功"+user1.username)
        }

        await  AirUser.findOneAndUpdate(query, { isDrop: 'true' }, {multi: true},()=>{
            console.log(account+"success");
        })
    }catch (e) {
        throw "err"
    }
}

_airdrop=async (account,memo)=>{
    if(!account){
        return false
    }
    console.log("airdrop to",account);
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

        await markDropped(account)
        return false;
    }catch (e) {
        console.log(e);
        return false;
    }
    return true;

}


start=async ()=> {
       // await reset();
        await airdrop("You HAVE know what GoDapp is if you're an EOS loyal supporter. Our website: godapp.com\n" +
            "如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com");
}

start();