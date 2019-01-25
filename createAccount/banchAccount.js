require("../db/db");
let Eoshelper=require('../utils/eoshelper');//需要私钥
let HumanAi=require("../model/humanAI");
let EccUtils=require("../encryption/cryptoUtil");
let Dbutils=require("../utils/dbutils");
let count=0;

async function transaction(godappKey, username, userpublickey) {
    await Eoshelper.api.myFunc(godappKey).transact({
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
                    bytes: 2000,
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
                    stake_net_quantity: '1.0000 EOS',
                    stake_cpu_quantity: '1.0000 EOS',
                    transfer: false,
                }
            }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
}

async function createAccount() {
    //解密
    // let mykey=await DbUtils.mykey("godapp.e")
    let results=await HumanAi.find({}).limit(20);
    //创建
    for (let i = 0; i < results.length; i++) {
     console.log(results[i].accountname+""+"create==============================begin");
     //  let userkey=await EccUtils.privateDecrypt(results[0].privatekey)
       let username= results[i].accountname;
       let userpublickey= results[i].publickey;
        //console.log(results[0].accountname+"=========="+userkey+"=========="+results[0].publickey);
      //解密出godapp.e私钥
      let godappKey=await Dbutils.mykey("godapp.e");
     try {
         await transaction(godappKey, username, userpublickey).then(()=>{
             //更新字段
             markDropped(username);
             count++;
             console.log(results[i].accountname+"第"+count+"次"+"create=================end");
         });
     }catch (e) {
         console.log("=======================err"+e)
     }
    }

}

markDropped=async (account)=>{
    //记录数据库
  console.log("db begin");
    let query={accountname:account};

    try {
        //用户在数据库中才修改 没在先添加再修改
        let res = await HumanAi.find(query).limit(1);
        if (res){
            await  HumanAi.findOneAndUpdate(query, { active: 'true' }, {multi: true},()=>{
                console.log(account+" active");
            })
        }
    }catch (e) {
        throw "err"
    }
    console.log("db finish");
}


createAccount();
