

require('../db/db');
let HumanUser=require("../model/humanAI");//privatekey
const accounts=[];
let cryptoUtil=require('../encryption/cryptoUtil');
let dbutils=require('../utils/dbutils');
let Eoshelper=require('../utils/eoshelper');//需要私钥

getAccounts= async ()=>{
    if (accounts.length === 0){
        let results= await HumanUser.find({});
        return results;
    }else {
        console.log("accounts");
        return accounts;
    }
};
let usrname;
start=async ()=> {
    console.log("airdrop");
    let results = await getAccounts();
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
        //打印条件
        // if (i>11&&i<23){
        //    6666comehere
        if (i === 12) {
            //获取账户名和密码 
           // console.log(results[i]);
            usrname = await results[i].accountname;
            let private_dec_key = await results[i].privatekey;
            let publickey = await results[i].publickey;
            //解密
            let deStr = await cryptoUtil.privateDecrypt(private_dec_key);
            console.log(usrname + "==========" + deStr + "==========" + publickey);
            //获取transaction
            let godappKey = await dbutils.companykey("godapp.e");
            // transaction();
            //console.log("godappKey=========="+godappKey);

            await transaction(godappKey, usrname, publickey);
        }
    }
}


async function transaction(godappKey, username, userpublickey) {
   let result= await Eoshelper.api.myFunc(godappKey).transact({
        actions: [{
            // 这个account是指合约名
            account: 'eosio',
            // 创建新账号的action名
            name: 'newaccount',
            authorization: [{
                actor: 'godapp.e',
                permission: 'active',
            }],
            data: {
                creator: 'godapp.e',
                // 这里的name指的是新用户的名字，在内部测试时候用的是name这个字段。
                name: username,
                // newcat 是公测链，新用户名的参数，可能版本不一样，字段不一样
                newact: username,
                owner: {
                    threshold: 1,
                    keys: [{
                        // 写入上面新生成的公钥
                        key: userpublickey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                },
                active: {
                    threshold: 1,
                    keys: [{
                        // 写入上面新生成的公钥
                        key: userpublickey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                },
            },
        },
            {
                account: 'eosio',
                // 购买内存的action名
                name: 'buyrambytes',
                authorization: [{
                    actor: 'godapp.e',
                    permission: 'active',
                }],
                data: {
                    payer: 'godapp.e',
                    receiver: username,
                    bytes: 3000,
                },
            },
            {
                account: 'eosio',
                // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
                name: 'delegatebw',
                authorization: [{
                    actor: 'godapp.e',
                    permission: 'active',
                }],
                data: {
                    from: 'godapp.e',
                    receiver: username,
                    // 这里的货币单位，要查询一下系统货币的名称才能填，可能是SYS或者EOS
                    stake_net_quantity: '10.0000 EOS',
                    stake_cpu_quantity: '10.0000 EOS',
                    transfer: false,
                }
            }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
   console.log("=========="+JSON.stringify(result));
}



test=async ()=> {
    await start();
};

test();