let constants = require('../utils/constants');
let dbutils = require("../utils/dbutils");
let Eoshelper = require("../utils/eoshelper");
let async = require("async");
const request = require('superagent');
let StringUtils = require('../utils/stringUtils');
// let RedBlackAccount = require("../utils/constants");
// let BaccaratAccount = require("../utils/constants");
let logger=require('../exception/exception')

let amount;

let Internal=require("../db/internal");

//检查用户账户
let reimbursement = async (from, to, key, amount, memo) => {
    console.log(from+"======================="+to+"=="+"==="+amount+"=="+memo);
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
        }).then((data)=>{
            logger.debug(data);
        }).catch(err=>{
            logger.debug(err);
        });
};

async function jundgeSelection(data, accountname) {
    let value = parseInt(data.core_liquid_balance);
    console.log("==============value"+value);
    if (value < 188) {
        amount = StringUtils.intToeoe(188, value);
        //godapp转账给用户
        let mykey = await dbutils.companykey(constants.accountname[1]);
        await reimbursement(constants.accountname[1], accountname, mykey, amount, constants.depositememo);
    } else if(value >222){
        //用户转账给godapp
        amount = StringUtils.intToeoe(value,222 );
        let mykey = await dbutils.redblackkey(accountname);
        await reimbursement(accountname, constants.accountname[1], mykey, amount, constants.sendbackmemo);
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
    let value =parseInt(data.core_liquid_balance);
    if ( value>100) {
        amount = StringUtils.intToeoe(value, 100);
        let robotkey = await dbutils.myaikey(accountname);
        await reimbursement(accountname, constants.accountname[1], robotkey, amount, constants.robotdepositememo);
    } else if (value < 50) {
        amount = StringUtils.intToeoe(80, value);
        let companykey = await dbutils.companykey(constants.accountname[1]);
        await reimbursement(constants.accountname[1], accountname, companykey, amount, constants.godappdepositememo);
    }else {
        return
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

start=async()=>{
    console.log("humanairobot start");
    let str=await Internal.get_humanais();
    arr=await JSON.parse(str);
    for (let i = 0; i <arr.length ; i++) {
        await checkRobotAccount(i,arr[i].accountname);
    }
};

module.exports={start};
// start();