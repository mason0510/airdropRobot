// //重构空投
//
// /**
//  * 重构空投项目
//  * **/
//
// let dbHelper=require("./dbhelper")
//
// //连接数据库
// //let config=require("./db")
//
// //获取用户
// let AirUser=require("./model/godappusr");
//
//
// //获取eos
// let Eoshelper=require("./eoshelper");
//
// let count=0;
//
// //获取空投账户
// // const accounts = [
// //  'geydmnrzgene',
// //     'godapp12122',
// //     'zzzzz2zzzzzz',
// //     'miaoman12345',
// //     'dennis.e',
// //     'hicodemonkey',
// // ]
// const accounts=[];
//
//
//
// sleep=async (ms)=>{
//     return new Promise(resolve=>setTimeout(resolve,ms))
// }
//
//
// getAccounts= async ()=>{
//     if (accounts.length === 0){
//         let results= await AirUser.find({});
//         return results;
//     }else {
//         console.log("accounts");
//         return accounts;
//     }
// }
//
//
// airdrop=async (memo)=>{
//     console.log("airdrop");
//     if (memo==null){return}
//     let results=await getAccounts();
//     for (let i = 0; i <results.length ; i++) {
//         setTimeout(async () =>{
//             await _airdrop(results[i].username,memo)
//             //await _airdrop(results[i],memo)
//             // await sleep(100)
//             count++
//             console.log("当前空投账户"+results[i].username+"总第"+count+"次转账")
//
//             }, i * 200);
//         }
//
//     }
//     console.log("airdrop finished")
// }
//
// // reset= async ()=>{
// //     //将所有空投设置为false
// //     let results= await AirUser.find({});
// //     for (let i = 0; i <results.length ; i++) {
// //         let query={username:results[i].username};
// //         await  AirUser.findOneAndUpdate(query, { isDrop: false }, {multi: true},()=>{
// //             console.log(results[i].username+"reset");
// //         })
// //         }
// //     console.log("reset finished");
// // }
//
//
// markDropped=async (account)=>{
//     //记录数据库
//     let query={username:account};
//
//     try {
//         //用户在数据库中才修改 没在先添加再修改
//         let res = AirUser.find(query).limit(1);
//         if (!res) {
//             console.log("用户不存在")
//             //may not be in mongodb 账户名 资产 创建时间
//             let user1 = new AirUser({
//                             username: account,
//                             assets: "0.0000 EOS",
//                             block_time: "",
//                             trx_id: "",
//                             memo: "",
//                             created: Date.now(),
//                             isDrop: false
//                         });
//             await AirUser.create(user1);
//             console.log("保存成功"+user1.username)
//         }
//         await  AirUser.findOneAndUpdate(query, { isDrop: 'true' }, {multi: true},()=>{
//             console.log(account+"success");
//         })
//     }catch (e) {
//         throw "err"
//     }
// }
//
// _airdrop=async (account,memo)=>{
//     if(!account){
//         return false
//     }
//     console.log("airdrop to",account);
//     try {
//         //将私钥解密
//         await Eoshelper.api.myFunc("5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD").transact({
//             actions: [{
//                 account: 'eosio.token',
//                 name: 'transfer',
//                 authorization: [{
//                     actor: 'godapp.e',
//                     permission: 'active',
//                 }],
//                 data: {
//                     from: 'godapp.e',
//                     to: account,
//                     quantity: '0.0001 EOS',
//                     memo: memo,
//                 },
//             }]
//         }, {
//             blocksBehind: 3,
//             expireSeconds: 30,
//         })
//         await markDropped(account)
//         return false;
//
//     }catch (e) {
//         console.log(e);
//         return false;
//     }
//     return true;
//
// }
//
// let memo="You HAVE know what GoDapp is if you're an EOS loyal supporter. Our website: godapp.com 如果你是eos的忠实支持者，最好了解一下godapp是什么，我们的官网 godapp.com"
//
// start=async ()=> {
//         await _airdrop(memo);
// }
//
// start();

//重构空投

/**
 * 重构空投项目
 * **/

let dbHelper=require("../../db/dbHelper")

//连接数据库
//let config=require("./db")

//获取用户
let AirUser=require("../../model/godappusr");


//获取eos
let Eoshelper=require("../../utils/eoshelper");

let dbutils =require("../../utils/dbutils");

//转账配置
options = {
    authorization: 'eosluckcoin1@active',
    broadcast: true,
    sign: true
}

let count=0;

//获取空投账户
// const accounts = [
//  'geydmnrzgene',
//     'godapp12122',
//     'zzzzz2zzzzzz',
//     'miaoman12345',
//     'dennis.e',
//     'hicodemonkey',
// ]

const accounts = [
    'godappbaccar',
    'godapphouse1',
    'godappdice12',
    'godappredbla',
    'blackjackeee'
];
const accountKeys = [
    '5Hv131yHNVL4gjcSYWqDJJkGjmv15GoUhUubX55U9gEJKBgd8k9',
    '5KF518LG3sn37k4RgiyvE4qpH6WpSZ64DUoV69A5XYe6XkuD3s5',
    '5KKWX5QWLTYJHT1VNsL8e6jphs7HkVF1hrmRHYmHpKeJWUBB7gm',
    '5KcUAMxX9xdwpkynadu2DUYkVVsJ3JzEeysyVdeTv86hN3swTrb',
    '5JiDMnwYbdJ79sknVx715dvQSDDaN23WT3LaGw9PCV4a2EmmbJc'
];

// const accounts=[];



sleep=async (ms)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
};


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
        setTimeout(async () =>{
            // await _airdrop(results[i].username,memo)
            await _airdrop(results[i],memo,accountKeys[i]);
            // await sleep(200)
            count++;
            // console.log("当前空投账户"+results[i].username+"总第"+count+"次转账");
            console.log("当前空投账户"+results[i]+"总第"+count+"次转账");
        }, i * 10000);
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

_airdrop=async (account,memo,key)=>{
    if(!account){
        return false
    }
    console.log("airdrop to",account);
    let mykey = await dbutils.companykey(account);
    try {
        await Eoshelper.api.myFunc(mykey).transact({
            actions: [{
                account: 'eosio.token',
                name: 'transfer',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],
                data: {
                    from: account,
                    to:"godappbaccar" ,
                    quantity: '1.0000 EOS',
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

};


start=async ()=> {
    await airdrop("返奖率最高，返佣最高的星际大战（炸金花）棋牌游戏: godapp.com/redvsblue");
}

start();