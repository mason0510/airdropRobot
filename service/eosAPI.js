Eos = require('eosjs')

config={
    keyProvider: ['5J8whQfjNJBA3tFiVSQWcTECu1foENHbpKhTknbarULPAxktMsL'], // 配置私钥字符串
    httpEndpoint: 'http://jungle2.cryptolions.io:8888', //DEV开发链url与端口
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 通过cleos get info可以获取chainId
    expireInSeconds: 60,
    broadcast: false,
    debug: false,
    sign: true,
    authorization: null
}

eos = Eos(config);

options = {
    authorization: 'accountcreat@active',
    broadcast: true,
    sign: true
}

//转账 给n个账户 从数据库查询 根据索引0
eos.transfer('accountcreat', 'lioninjungle', '0.0010 EOS', 'hello im xiaocong', options).catch(err=>{
    //console.log("api error: ",err)
});


//查看区块
eos.getBlock(1000).then(result=>{
   // console.log(result)
});

//查看账户
eos.getAccount({account_name:"accountcreat"}).then(result=>{
   // console.log(result)
}).catch(error=>{console.log(error)})

//获取公钥账户

eos.getKeyAccounts("EOS5YVarXPovxLsEJCVzQ7E5xhGxk7LY9Mqoq7GuU51wQPyZMcGrZ")
            .then(result=>{console.log("账户加挂结果"+result[0])}).catch(error=>{
                console.log(error)
});

//账户余额
eos.getCurrencyBalance("eosio.token","accountcreat","EOS")
.then(result=>console.log(result))
.catch(error=>console.log(error))

//获取代币信息 当前提供的代币总数
//eos.getCurrencyStats("eosio.token","EOS",(error,result)=>console.log(error,result))
// { supply: '4124.2500 TOP',
//     max_supply: '1000000000.0000 TOP',
//     issuer: 'toppaigow123' } }
eos.getCurrencyStats({code:"topdapptoken",symbol:"TOP"}).then(console.log);
