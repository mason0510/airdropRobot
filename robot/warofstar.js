//星球大战



//获取延时工具 eos实例
let sleep=require("../utils/sleep");
let eoshelper=require("../eoshelper");
let AccountInfo=require("../utils/accountInfo");
let EosAccount50=require("../model/godappusr1/eosusr(0-50)");
let EosAccount=require("../model/eosAccount");
let request = require("request");
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
    console.log("beting 进行中",account+memo);
    try {
        await eoshelper.api.myFunc(privatekey).transact({
            actions: [{
                account: "eosio.token",
                name: 'transfer',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    from: account,
                    to: "godice.e",
                    quantity:quantity,
                    memo: memo,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        })
        //  getsult
        checkAccount(account)
        console.log(account+"当前第"+count+"次下注"+"finish");
        return false;
    }catch (e) {
        console.log("error======"+e);
        return false;
    }
    return true;
}

let checkAccount=async (username)=> {
    let options = { method: 'POST',
        url: 'https://eosbp.atticlab.net/v1/chain/get_account',
        body: { account_name: username },
        json: true };
    await request(options, async function (error, response, body) {
        if (error) {
            throw new Error(error);
        } else {
            //保存数据到数据库
            let query={accountname:username};
            EosAccount50.findOneAndUpdate(query,
                {net_limit: { used: body.net_limit.used, available:body.net_limit.available, max:body.net_limit.max },
                    cpu_limit: { used: body.cpu_limit.used, available:body.cpu_limit.available, max:body.cpu_limit.max },
                    ram_usage: body.ram_usage,
                    assets:body.core_liquid_balance
                },
                {multi: true},()=>{
                    console.log(username+"======"+"status success");
                })
        }
    });
}



readdb=async ()=>{
    const results = await EosAccount50.find({});
    return results
};


betresult=()=>{

}


sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}
let arr=["0.1000 EOS","0.2000 EOS","1.0000 EOS"];

start=async ()=> {
    //获取投注账户
    const results=await readdb();
    let randomaccount=await Math.floor(Math.random()*50);
    //随机投注的次数 每隔一段时间 取一次随机数 资产少 投的多 资产多投的多
    //console.log(results[randomaccount]);
    let betassets=await parseInt(results[randomaccount].assets);
    if (betassets!==0){
        await bet(betassets,results[randomaccount],results[randomaccount].accountname,results[randomaccount].privatekey);
    }else {
        return
    }
}


let bet=async (betassets,randomaccount,accountname,privatekey)=>{
    let bettimes=await Math.floor(Math.random()*3+1);
    if (1<=betassets<=5||betassets>11){
        //随机数123
        for (let i = 0; i <bettimes; i++) {
            let quantity=await arr[Math.floor(Math.random()*arr.length)]
            let number=await Math.floor(Math.random()*50)+47
            let memo=number+","+""+",";
            await _bet(accountname,privatekey,quantity,memo);
            await sleep(200)
            count++
        }
    }
    else if(5<betassets<=7){
        let bettimes2=Math.floor(Math.random()*3+3);
        //随机数345
        for (let i = 0; i <bettimes2; i++) {
            let quantity=arr[Math.floor(Math.random()*arr.length)]
            let number=Math.floor(Math.random()*20)+77
            let memo=number+","+""+",";
            await _bet(accountname,privatekey,quantity,memo);
            await sleep(200)
            count++
        }
    } else if(7<betassets<=9){
        let bettimes3=Math.floor(Math.random()*3+5);
        let quantity=arr[Math.floor(Math.random()*arr.length)]
        //随机数456
        for (let i = 0; i <bettimes3 ; i++) {
            let number=Math.floor(Math.random()*20)+77
            let memo=number+","+""+",";
            await _bet(accountname,privatekey,quantity,memo);
            await sleep(200)
            count++
        }
    }
    else if(9<betassets<=11){
        let bettimes4=Math.floor(Math.random()*3+9);
        //随机数789
        let quantity=arr[Math.floor(Math.random()*arr.length)]
        for (let i = 0; i <bettimes4 ; i++) {
            let number=Math.floor(Math.random()*20)+77
            let memo=number+","+""+",";
            await _bet(accountname,privatekey,quantity,memo);
            await sleep(200)
            count++
        }
    }
}





