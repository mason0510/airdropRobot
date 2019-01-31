let constants = require('../utils/constants');
let dbutils = require("../utils/dbutils");
let Eoshelper = require("../utils/eoshelper");
let async = require("async");
const request = require('superagent');
let StringUtils = require('../utils/stringUtils');
let RedBlackAccount = require("../utils/constants");
 let BaccaratAccount = require("../utils/constants");
require('../db/db');
let HumanAI=require("../model/humanAI");

let amount;
let cheCount = 0;
let res;
let Sleep=require('../utils/sleep');


//检查用户账户
let reimbursement = async (from, to, key, amount, memo) => {
     console.log(from+"======================="+to+"=="+"==="+amount+"=="+memo);
    process.on('unhandledRejection', async(reason, promise) => {
        console.log('Unhandled Rejection at:', reason.stack || reason)
        // Recommended: send the information to sentry.io
        // or whatever crash reporting service you use
        const result  = await Eoshelper.api.myFunc(key).transact({
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
        // Exception.Logger(result)
    })

};

async function jundgeSelection(data, accountname) {
    let bodyliquid = data.core_liquid_balance;
    console.log("==============bodyliquid"+bodyliquid);
    let finalNume = parseInt(bodyliquid);
    console.log("==============finalNume"+finalNume);
    if (parseInt(finalNume) < 100) {
        amount = StringUtils.intToeoe(100, finalNume);
        let mykey = await dbutils.companykey(constants.accountname[1]);
        await reimbursement(constants.accountname[1], accountname, mykey, amount, constants.depositememo);

    } else if(parseInt(finalNume) >210){
        amount = StringUtils.intToeoe(finalNume, 200);
        let mykey = await dbutils.redblackkey(accountname);
        await reimbursement(accountname, constants.accountname[1], mykey, amount, constants.depositememo);
    }
}

//21后面的账户
let _checkRobotAccount = async (i,accountname) => {
        await request
            .post(constants.url4)
            .timeout({
                deadline: constants.deadlineTime,
                response: constants.responseTime
            })
            .send({account_name: accountname})
            .then(async data => {
                console.log("data:============="+data);
                await jundgeSelection(data.body, accountname);
            })
};

//godapp账户转钱给机器人 机器人赔光
async function sendTransaction(data, accountname) {
    let bodyliquid = data.core_liquid_balance;
    console.log("=============="+bodyliquid);
    if (parseInt(bodyliquid) < 100) {
        amount = StringUtils.intToeoe(100, data.bodyliquid);
        let companykey = await dbutils.companykey(constants.accountname[1]);

             await reimbursement(constants.accountname[1], accountname, companykey, amount, constants.depositememo);

    } else if (bodyliquid > 200) {
        amount = StringUtils.intToeoe(bodyliquid, 100);
        let robotkey = await dbutils.redblackkey(accountname);
       await reimbursement(accountname, constants.accountname[1], robotkey, amount, constants.depositememo);
    }
}


//前面的账户
let checkRobotAccount = async (i,accountname) => {
    process.on('unhandledRejection', async(reason, promise) => {
        console.log('Unhandled Rejection at:', reason.stack || reason)
        // Recommended: send the information to sentry.io
        // or whatever crash reporting service you use
        await request.post(constants.url).timeout({
            deadline: constants.deadlineTime,
            response: constants.responseTime
        })
            .send({account_name: accountname})
            .then(async data => {
                // console.log(data.body.core_liquid_balance);
                await sendTransaction(data.body,accountname);
            })
    })

};


let activate = async () => {
    let res1=await HumanAI.find({});
    console.log(res1.length);
    for (let i = 0; i <res1.length ; i++) {
        // setTimeout(async()=>{
                await _checkRobotAccount(i,res1[i].accountname);
        // },i*1000)
    }
};
//庄家账户给机器人账户转==============================账

//checkHouseAccount(constants.accountname[0]);
// checkRobotAccount(25,"monqwerfjpai");
// activate();
module.exports={activate};