let constants=require('../utils/constants');
let dbutils=require("../utils/dbutils");
let Eoshelper=require("../utils/eoshelper");
let async=require("async");
const request= require('superagent');
let StringUtils=require('../utils/stringUtils');

let amount;
let cheCount=0;
//检查用户账户
checkAccount=async(username,myprivatekey)=>{

    console.log("==========begin");
    await request
        .post('https://eu.eosdac.io/v1/chain/get_account')
        .timeout({
            deadline:constants.deadlineTime,
            response:constants.responseTime
        })
        .send({ account_name:"houseaccount"})
        .then(async res=>{
            let bodyliquid=await parseInt(res.body.core_liquid_balance);
            //获取
            if (bodyliquid-50<0){
                await buyeos("godapp.e",username,constants.buyeosmemo);
            }
            if (bodyliquid-100>0) {
                amount = StringUtils.intToeoe(bodyliquid);
                await reimbursement(username, "godapp.e", myprivatekey, amount, constants.sendbackmemo);
            }
        },async err=>{
            if (err.timeout){
                //超时未连接
                console.log("Timeout"+err);
            }
        });
};



let reimbursement = async (gameaccount,bankname,key,amount,memo) => {
  // console.log(gameaccount+"=="+bankname+"=="+key+"==="+amount+"=="+memo);
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
       console.log(result)
       console.log("==========结束"+cheCount);
   }catch (e) {
       console.log(e);
   }
};

let checkHouseAccount=async()=>{
    console.log("==========begin");
    await request
        .post('https://eu.eosdac.io/v1/chain/get_account')
        .timeout({
            deadline:constants.deadlineTime,
            response:constants.responseTime
        })
        .send({ account_name:"godapp.e"})
        .then(async res=>{
                    let body=await JSON.stringify(res.body);
                    //console.log(res.body.core_liquid_balance);
                    let bodyliquid=await parseInt(res.body.core_liquid_balance);
                    //console.log(bodyliquid);
                    if (bodyliquid-2000>0){
                        amount=StringUtils.intToeoe(bodyliquid,2000);
                        let mykey=await dbutils.companykey(constants.accountname[1]);
                       if (constants.accountname[1]==='godapp.e'&&constants.accountname[0]==='houseaccount'){
                           await reimbursement(constants.accountname[1],constants.accountname[0],mykey,amount,constants.depositememo);
                       }
                    }
        },async err=>{
            if (err.timeout){
                //超时未连接
                console.log("Timeout"+err);
            }
        });

    // setImmediate(checkHouseAccount,180000)
};
//
// let activate=()=>{
//     async.waterfall([async function (callback) {
//         console.log(1);
//         let options = {
//             method: 'POST',
//             url: constants.url+'/v1/chain/get_account',
//             body: { account_name:constants.accountname[0]},
//             json: true };
//
//         await request(options, async function (error, response, body) {
//             if (error){
//                 return;
//             }
//             if (!error&&response.statusCode===200) {
//                 let zz=await parseInt(body.core_liquid_balance);
//                 if (zz-1200>0){
//                     amount=String(zz-1200)+".0000 EOS";
//                     let mykey=await dbutils.companykey(constants.accountname[0]);
//                     await callback(null,amount,mykey);
//                     console.log(mykey+"=========="+amount);
//                 }
//             }
//         });
//     },async function (amount,mykey,callback) {
//         console.log(2);
//         let result=await reimbursement(constants.accountname[0],constants.accountname[1],mykey,amount,constants.sendbackmemo)
//         await callback(null,result);
//     }
//     ],function (err,result) {
//         if (err){
//             return;
//         }
//         console.log(result)
//     });
// };
//

//checkHouseAccount(constants.accountname[0]);

module.exports={checkAccount,checkHouseAccount,reimbursement}
checkHouseAccount();