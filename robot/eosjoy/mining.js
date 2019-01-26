// let APi=require('../../utils/eoshelper_copy');
// let DbUtils=require('../../utils/dbutils');
// let constants=require('../../utils/constants');
// //激活游戏
// let activate=async ()=>{
//     let mykey = await DbUtils.companykey("godapp.e");
//         await APi.api.myFunc(mykey).transact({
//             actions: [{
//                 account: 'eosio.token',
//                 name: 'transfer',
//                 authorization: [{
//                     actor:constants.accountname[1],
//                     permission: 'active',
//                 }],
//                 data: {
//                     from: 'godapp.e',
//                     to: constants.accountname[2],
//                     quantity: '0.1000 EOS',
//                     memo: "1-0-zhangaccount-",
//                 },
//             }]
//         }, {
//             blocksBehind: 3,
//             expireSeconds: 30,
//         });
// };
// activate();
