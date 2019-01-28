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
let reimbursement = async (bankaccount, robotname, key, amount, memo) => {
     console.log(gameaccount+"=="+robotname+"=="+"==="+amount+"=="+memo);
    // godapp.e==fixsometimqq=====3.0000 EOS==deposit
    try {
        let promise=new Promise(async(resolve, reject) => {
            let result = await Eoshelper.api.myFunc(key).transact({
                actions:
                    [
                        {
                            account: constants.eosio,
                            name: 'transfer',
                            authorization: [{
                                actor: bankaccount,
                                permission: 'active',
                            }],
                            data: {
                                from: bankaccount,
                                to: robotname,
                                quantity: amount,
                                memo: memo,
                            }
                        }]

            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            resolve (result);
            cheCount++;
            //  console.log(result)
            console.log("==========结束" + cheCount);
        });
        return promise;
    } catch (e) {
       // console.log(e);

        return e.errmsg;
    }
};
let _checkRobotAccount = async (i,accountname) => {
     console.log("==========begin");
    let promise=new Promise(async(resolve, reject) => {
        let res;
        await request
            .post(constants.url1)
            .timeout({
                deadline: constants.deadlineTime,
                response: constants.responseTime
            })
            .send({account_name: accountname})
            .then(async res => {
                let bodyliquid = await parseInt(res.body.core_liquid_balance);
                let networkKey = await res.body.permissions[0].required_auth.keys[0].key;
                //获取
                let publickey = await dbutils.redblackpublickey(accountname);
                //相等就转
                if (networkKey !== publickey) {
                    return;
                }
                return {networkKey:networkKey,bodyliquid:bodyliquid,publickey:publickey}
            }, async err => {
                    console.log("Timeout" + err);
            }).then(async(data)=>{
                let bodyliquid=data.bodyliquid;
                console.log("获取到的结果"+bodyliquid);
                let finalNume=parseInt(bodyliquid);
                    if (finalNume < 20) {
                        amount = StringUtils.intToeoe(20, finalNume);
                        let mykey = await dbutils.companykey(constants.accountname[1]);
                        try {
                            res= await reimbursement(constants.accountname[1],accountname,mykey,amount,constants.depositememo);
                            return res;
                        } catch (e) {
                            return e.errmsg;
                        }
                    }else if (finalNume>50) {
                        amount = StringUtils.intToeoe(finalNume, 20);
                        let mykey = await dbutils.redblackkey(accountname);
                        try {
                            let res1= await reimbursement(accountname,constants.accountname[1],mykey,amount,constants.depositememo);
                            resolve (res1);
                        } catch (e) {
                            console.log(e) ;
                        }
                    }
            })
    });

        return promise;
};


let checkRobotAccount = async (i,accountname) => {
   console.log("==========begin");
        let promise=new Promise(async(resolve, reject) => {
            let res;
            await request
                .post(constants.url4)
                .timeout({
                    deadline: constants.deadlineTime,
                    response: constants.responseTime
                })
                .send({account_name: accountname})
                .then(async res => {

                    let bodyliquid = await parseInt(res.body.core_liquid_balance);
                    let networkKey = await res.body.permissions[0].required_auth.keys[0].key;
                    //获取
                    let publickey = await dbutils.redblackpublickey(accountname);
                    //相等就转
                    if (networkKey !== publickey) {
                        return;
                    }
                    return {networkKey:networkKey,bodyliquid:bodyliquid,publickey:publickey}
                }, async err => {
                        console.log("Timeout" + err);
                        reject(err)

                }).then(async(data)=>{
                    console.log("获取到的结果"+data);

                    let bodyliquid=data.bodyliquid;

                        if (bodyliquid < 100) {
                            amount = StringUtils.intToeoe(100, data.bodyliquid);
                            let mykey = await dbutils.companykey(constants.accountname[1]);
                            try {
                                res= await reimbursement(constants.accountname[1],accountname,mykey,amount,constants.depositememo);
                                return res;
                            } catch (e) {
                                console.error(e);
                            }
                        }else if (bodyliquid>200) {
                            amount = StringUtils.intToeoe(bodyliquid, 100);
                            let mykey = await dbutils.redblackkey(accountname);
                            try {
                                let res1= await reimbursement(accountname,constants.accountname[1],mykey,amount,constants.depositememo);
                                resolve(re1);
                            } catch (e) {
                                console.log(e) ;
                            }
                        }
                })
    });
        return promise;
};


let activate = async () => {
    let res1=await HumanAI.find({});
    for (let i = 0; i <res1.length ; i++) {
        if (i<=22){
            res = await checkRobotAccount(i,res1[i].accountname);
        }else {
            res = await _checkRobotAccount(i,res1[i].accountname);
        }
        console.log(res1[i].accountname);
    }
    for (let i in RedBlackAccount.redblackRobot ) {
        res = await checkRobotAccount(i,RedBlackAccount.redblackRobot[i])
    }
    setTimeout(activate,20000);
};

activate();
//checkHouseAccount(constants.accountname[0]);