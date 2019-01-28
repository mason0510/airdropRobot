let constants=require('../utils/constants');
let dbutils=require("../utils/dbutils");
let Eoshelper=require("../utils/eoshelper");
let async=require("async");
const request= require('superagent');
let StringUtils=require('../utils/stringUtils');

let amount;
let cheCount=0;
//检查用户账户
// checkAccount=async(username,myprivatekey)=>{
//
//     console.log("==========begin");
//     await request
//         .post('https://eu.eosdac.io/v1/chain/get_account')
//         .timeout({
//             deadline:constants.deadlineTime,
//             response:constants.responseTime
//         })
//         .send({ account_name:"houseaccount"})
//         .then(async res=>{
//             let bodyliquid=await parseInt(res.body.core_liquid_balance);
//             //获取
//             if (bodyliquid-50<0){
//                 await buyeos("godapp.e",username,constants.buyeosmemo);
//             }
//             if (bodyliquid-100>0) {
//                 amount = StringUtils.intToeoe(bodyliquid);
//                 await reimbursement(username, "godapp.e", myprivatekey, amount, constants.sendbackmemo);
//             }
//         },async err=>{
//             if (err.timeout){
//                 //超时未连接
//                 console.log("Timeout"+err);
//             }
//         });
// };



let reimbursement = async (gameaccount,bankname,key,amount,memo) => {
    console.log(gameaccount+"=="+bankname+"=="+key+"==="+amount+"=="+memo);
   try {
       let result=await Eoshelper.api.myFunc(key).transact({
           actions:
               [
                   {
                       account: constants.eosio,
                       name: 'transfer',
                       authorization: [{
                           actor: gameaccount,
                           permission: 'active',
                       }],
                       data: {
                           from: gameaccount,
                           to: bankname,
                           quantity: amount,
                           memo: memo,
                       }
                   }]

       }, {
           blocksBehind: 3,
           expireSeconds: 30,
       });
       cheCount++;
       console.log(result);
       return result;
       console.log("==========结束"+cheCount);
   }catch (e) {
       console.log(e);
       return e.errmsg;
   }
};

let checkHouseAccount=async()=>{
    console.log("==========begin");
    await request
        .post(constants.url4)
        .timeout({
            deadline:constants.deadlineTime,
            response:constants.responseTime
        })
        .send({ account_name:"houseaccount"})
        .then(async res=>{
                    let body=await JSON.stringify(res.body);
                    //console.log(res.body.core_liquid_balance);
                    let bodyliquid=await parseInt(res.body.core_liquid_balance);
                    //console.log(bodyliquid);
                    if (bodyliquid>2000){
                        amount=StringUtils.intToeoe(bodyliquid,2000);
                        let mykey=await dbutils.companykey(constants.accountname[0]);
                       await reimbursement(constants.accountname[0],constants.accountname[1],mykey,amount,constants.sendbackmemo);
                    }
        },async err=>{
            if (err.timeout){
                //超时未连接
                console.log("Timeout"+err);
            }
        });

    setTimeout(checkHouseAccount,180000)
};

checkHouseAccount();