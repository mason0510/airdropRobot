let constants=require('../utils/constants');
let dbutils=require("../utils/dbutils");
let Eoshelper=require("../utils/eoshelper");
let async=require("async");
const request= require('superagent');
let StringUtils=require('../utils/stringUtils');

let amount;
let cheCount=0;

let reimbursement = async (from,to,key,amount,memo) => {
    console.log(from+"=="+to+"=="+key+"==="+amount+"=="+memo);
   try {
       let result=await Eoshelper.api.myFunc(key).transact({
           actions:
               [
                   {
                       account: constants.eosio,
                       name: 'transfer',
                       authorization: [{
                           actor: from,
                           permission: 'active',
                       }],
                       data: {
                           from: from,
                           to: to,
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

//庄家账户给house账户转钱
let checkHouseAccount=async()=>{
    console.log("==========begin");
    await request
        .post(constants.url4)
        .timeout({
            deadline:constants.deadlineTime,
            response:constants.responseTime
        })
        .send({ account_name:constants.accountname[0]})
        .then(async res=>{
                    let body=await JSON.stringify(res.body);
                    console.log(res.body.core_liquid_balance);
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

    // setTimeout(checkHouseAccount,20000)
};

checkHouseAccount();