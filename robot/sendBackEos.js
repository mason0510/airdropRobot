// // //获取eos实例
// //
let request = require("request");
//获取eos
Eos=require("eosjs");
//连接数据库
require("../db/db")
//获取
let Eoshelper=require("../utils/eoshelper");

//获取对应的表
let AirUser=require("../model/godappusr1/eosusr(0-50)");

let count=0;
let username;
let url='https://proxy.eosnode.tools/v1/chain/get_account'
//let username=""
// checkAccount=async ()=> {
//     count++;
//     let options = {
//         method: 'POST',
//         url: "https://proxy.eosnode.tools/v1/chain/get_account",
//         body: {account_name: "zhangaccount"},
//         json: true
//     };
//
//     // try {
//         await request(options, async (error, response, body) => {
//             console.log("======================"+body.toString());
//             console.log("======================"+response.toString());
//             console.log("======================"+body.assets);
//             if (error) {
//                 throw Error
//             } else {
//                 //计算cpu 和net 80
//                 if (body.assets <= 2) {
//                     console.log("attention==========================================" + username + "购买 cpu net ram");
//                     await buycpuNet("godapp.e", username)
//                 } else {
//                     //保存数据到数据库
//                     let query = {accountname: username};
//                     AirUser.findOneAndUpdate(query,
//                         {
//                             net_limit: {
//                                 used: body.net_limit.used,
//                                 available: body.net_limit.available,
//                                 max: body.net_limit.max
//                             },
//                             cpu_limit: {
//                                 used: body.cpu_limit.used,
//                                 available: body.cpu_limit.available,
//                                 max: body.cpu_limit.max
//                             },
//                             ram_usage: body.ram_usage,
//                             assets: body.core_liquid_balance
//                         },
//                         {multi: true})
//                     console.log("第" + count + "次审查" + username + "===" + "body.ram_quota" + body.ram_quota.used + "===" + "body.cpu_limit" + body.cpu_limit.used) + "update success";
//                 }
//
//             }
//         });
//     // } catch (e) {
//     //     console.log("==================err network");
//     //     console.log("==================try again");
//     //     let options = {
//     //         method: 'POST',
//     //         url: url,
//     //         body: {account_name: username},
//     //         json: true
//     //     };
//     //     await request(options, async (error, response, body) => {
//     //         if (error) {
//     //             throw Error
//     //         } else {
//     //             //计算cpu 和net 80
//     //             if (body.assets <= 2) {
//     //                 console.log("attention==========================================" + username + "购买 cpu net ram");
//     //                 await buycpu("godapp.e", username)
//     //             } else {
//     //                 //保存数据到数据库
//     //                 let query = {accountname: username};
//     //                 AirUser.findOneAndUpdate(query,
//     //                     {
//     //                         net_limit: {
//     //                             used: body.net_limit.used,
//     //                             available: body.net_limit.available,
//     //                             max: body.net_limit.max
//     //                         },
//     //                         cpu_limit: {
//     //                             used: body.cpu_limit.used,
//     //                             available: body.cpu_limit.available,
//     //                             max: body.cpu_limit.max
//     //                         },
//     //                         ram_usage: body.ram_usage,
//     //                         assets: body.core_liquid_balance
//     //                     },
//     //                     {multi: true})
//     //                 console.log("err===========================================update");
//     //             }
//     //
//     //         }
//     //     });
//
//     }
// //去购买cpu 和net
//
// let buycpu = async (bankaccount, username) => {
//         await Eoshelper.api.myFunc("5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD").transact({
//             actions:
//                 [
//                     {
//                         account: 'eosio',
//                         // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
//                         name: 'delegatebw',
//                         authorization: [{
//                             actor: bankaccount,
//                             permission: 'active',
//                         }],
//                         data: {
//                             from: bankaccount,
//                             receiver: username,
//                             // 这里的货币单位，要查询一下系统货币的名称才能填，可能是SYS或者EOS
//                             stake_net_quantity: '0.0001 EOS',
//                             stake_cpu_quantity: '1.0000 EOS',
//                             transfer: false,
//                         }
//                     }]
//
//         }, {
//             blocksBehind: 3,
//             expireSeconds: 30,
//         }).catch(
//             result => {
//                 console.log("购买失败" + result);
//             }
//         ).then(async () => {
//             console.log("====" + username + "购买成功")
//         });
//         count++;
//         console.log("====" + username + "购买结束")
//     }
// }
//
//
// // const queryaccount=async ()=>{
// //     let results= await AirUser.find({});
// //     if (results.length===0)return;
// //     for (let i = 0; i <results.length; i++) {
// //         setTimeout( async ()=> {
// //          username=results[i].accountname;
// //          await checkAccount(username);
// //         }, i * 200);
// //     }
// // };
//
//
// checkAccount;
//
// // setInterval(queryaccount,5000,"Interval");
//
// module.exports={queryaccount,checkAccount}
//
//
// let request = require("request");
//
// let options = { method: 'POST',
//     url: 'https://proxy.eosnode.tools/v1/chain/get_account',
//     body: { account_name: 'zhangaccount' },
//     json: true };
//
// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//
//     console.log(body);
// });


queryaccount=async ()=>{
    let results= await AirUser.find({});
    if (results.length===0)return;
    for (let i = 0; i <results.length; i++) {
        setTimeout( async ()=> {
         username=results[i].accountname;
         console.log(username);
            count++
         await checkAccount(username,results[i].privatekey);
        }, i * 2000);
   }
    await setTimeout(queryaccount,100000);

};

let buycpu = async (bankaccount,username) => {
    await Eoshelper.api.myFunc("5JgWbqPFygNyurb888NcjpLAtZEyW5cLvMDQ8586EhisrCusxBD").transact({
        actions:
            [
                {
                    account: 'eosio',
                    // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
                    name: 'delegatebw',
                    authorization: [{
                        actor: bankaccount,
                        permission: 'active',
                    }],
                    data: {
                        from: bankaccount,
                        receiver: username,
                        // 这里的货币单位，要查询一下系统货币的名称才能填，可能是SYS或者EOS
                        stake_net_quantity: '0.0001 EOS',
                        stake_cpu_quantity: '2.0000 EOS',
                        transfer: false,
                    }
                }]

    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    }).catch(
        result => {
            console.log("购买失败" + result);
        }
    )
    count++;
    console.log("====" + username + "购买cpu结束")
}


let canceleos = async (username,bankname,privatekey,memo) => {
    await Eoshelper.api.myFunc(privatekey).transact({
        actions:
            [
                {
                    account: 'eosio.token',
                    // 抵押资产的action名，用于租用带宽与cpu,抵押资产,抵押的越多，带宽和cup就越多
                    name: 'transfer',
                    authorization: [{
                        actor: username,
                        permission: 'active',
                    }],
                    data: {
                        from: username,
                        to: 'godapp.e',
                        quantity: '5.0000 EOS',
                        memo: memo,
                    }
                }]

    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    }).catch(
        result => {
            console.log("退还失败" + result);
        }
    )
    count++;
    console.log("====" + username + "退还eos结束")
}


checkAccount=(username,privatekey)=>{
    let request = require("request");
    let options = { method: 'POST',
    url: 'https://proxy.eosnode.tools/v1/chain/get_account',
    body: { account_name: username },
    json: true };

request(options, async function (error, response, body) {
                if (error) {
                    return
                }
                console.log("============="+body.core_liquid_balance);
                if (parseInt(body.core_liquid_balance,0)>=10){
                    console.log("=================="+username);
                  canceleos(username,"godapp.e",privatekey,"sendback eos")
                }
                //undelegatebw 解除抵押
                //let cpupecentage=body.cpu_limit.available/body.cpu_limit.max;
                //console.log("=================="+cpupecentage);
                // if ( cpupecentage>= 0.9) {
                //     //console.log(cpupecentage);
                //    // await cancelcpu("godapp.e",username)
                // }

                    //保存数据到数据库
                let query = {accountname: username};
                    AirUser.findOneAndUpdate(query,
                        {
                            net_limit: {
                                used: body.net_limit.used,
                                available: body.net_limit.available,
                                max: body.net_limit.max
                            },
                            cpu_limit: {
                                used: body.cpu_limit.used,
                                available: body.cpu_limit.available,
                                max: body.cpu_limit.max
                            },
                            ram_usage: body.ram_usage,
                            assets: body.core_liquid_balance
                        },
                        {multi: true}).catch(error=>{console.log(error);});
});
}

 queryaccount();