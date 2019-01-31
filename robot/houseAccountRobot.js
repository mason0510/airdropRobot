let constants=require('../utils/constants');
let dbutils=require("../utils/dbutils");
let Eoshelper=require("../utils/eoshelper");
const request= require('superagent');
let StringUtils=require('../utils/stringUtils');
let amount;
<<<<<<< HEAD
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
=======
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
>>>>>>> d38da3035aaf8501c258928302d18c36b2320fe7

        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log(result);
    }catch (e) {
        logger.debug(e);
    }
};

<<<<<<< HEAD
async function sendTrans(res) {
    console.log(res.body.core_liquid_balance);
    let value = await parseInt(res.body.core_liquid_balance);
    //houseaccount多余转出
    if (value > 2000) {
        amount = StringUtils.intToeoe(value, 2000);
        let mykey = await dbutils.companykey(constants.accountname[0]);
        await reimbursement(constants.accountname[0], constants.accountname[1], mykey, amount, constants.sendbackmemo);
        //小于godapp转入
    } else if (value < 1000) {
        amount = StringUtils.intToeoe(2000, value);
        let mykey = await dbutils.companykey(constants.accountname[1]);
        await reimbursement(constants.accountname[1], constants.accountname[0], mykey, amount, constants.depositememo);
    }
}

=======
>>>>>>> d38da3035aaf8501c258928302d18c36b2320fe7
//庄家账户给house账户转钱
let checkHouseAccount=async()=>{
    console.log("HouseAccount start");
    await request
        .post(constants.url4)
        .timeout({
            deadline:constants.deadlineTime,
            response:constants.responseTime
        })
        .send({ account_name:constants.accountname[0]})
        .then(async res=>{
<<<<<<< HEAD
            await sendTrans(res);
        });
=======
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
>>>>>>> d38da3035aaf8501c258928302d18c36b2320fe7
};
module.exports={checkHouseAccount};


