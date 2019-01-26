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
//检查用户账户
let reimbursement = async (gameaccount, bankname, key, amount, memo) => {
     console.log(gameaccount+"=="+bankname+"=="+"==="+amount+"=="+memo);
    try {
        let promise=new Promise(async(resolve, reject) => {
            let result = await Eoshelper.api.myFunc(key).transact({
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

let checkRobotAccount = async (i,accountname) => {
  //  console.log("==========begin");
        let promise=new Promise(async(resolve, reject) => {
            let res;
            await request
                .post('https://eu.eosdac.io/v1/chain/get_account')
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
                    if (err.timeout) {
                        //超时未连接
                        console.log("Timeout" + err);
                        return err
                    }
                }).then(async(data)=>{
                    console.log("获取到的结果"+data.bodyliquid);
                    // console.log(bodyliquid);
                    let bodyliquid=data.bodyliquid;
                    if (i<=22){
                        if (bodyliquid < 100) {
                            amount = StringUtils.intToeoe(100, data.bodyliquid);
                            let mykey = await dbutils.companykey(constants.accountname[1]);
                            try {
                                res= await reimbursement(constants.accountname[1],accountname,mykey,amount,constants.depositememo);
                                return res;
                            } catch (e) {
                                //console.error(e);
                                return e.errmsg;
                            }
                        }else if (bodyliquid>200) {
                            amount = StringUtils.intToeoe(bodyliquid, 100);
                            let mykey = await dbutils.redblackkey(accountname);
                            try {
                                let res1= await reimbursement(accountname,constants.accountname[1],mykey,amount,constants.depositememo);
                                return res1;
                            } catch (e) {
                                return e;
                            }
                        }
                    }else {
                        if (bodyliquid < 20) {
                            amount = StringUtils.intToeoe(20, data.bodyliquid);
                            let mykey = await dbutils.companykey(constants.accountname[1]);
                            try {
                                res= await reimbursement(constants.accountname[1],accountname,mykey,amount,constants.depositememo);
                                return res;
                            } catch (e) {
                                return e.errmsg;
                            }
                        }else if (bodyliquid>50) {
                            amount = StringUtils.intToeoe(bodyliquid, 20);
                            let mykey = await dbutils.redblackkey(accountname);
                            try {
                                let res1= await reimbursement(accountname,constants.accountname[1],mykey,amount,constants.depositememo);
                                return res1;
                            } catch (e) {
                                return e;
                            }
                        }
                    }
                }).then(async(data)=>{
                    console.log("最终结果：",data);
                    resolve (data)
                });
    });


    //setImmediate(checkHouseAccount,180000)
};
//checkHouseAccount(constants.accountname[0]);

let activate = async () => {
    //取出所有账户
    let res1=await HumanAI.find({});
    // console.log(res);
    for (let i = 0; i <res1.length ; i++) {
        res = await checkRobotAccount(i,res1[i].accountname);
        console.log(res1[i].accountname);
    }
    // for (let i in BaccaratAccount.baccaratRobot) {
    //    // console.log(RedBlackAccount.redblackRobot[i]);
    //     res = await checkRobotAccount(i,BaccaratAccount.baccaratRobot[i].accountname)
    // }
    // for (let i in RedBlackAccount.redblackRobot ) {
    //     res = await checkRobotAccount(i,RedBlackAccount.redblackRobot[i])
    // }
    //转账
    //定时
    console.log("回调的最终结果："+res);
    setTimeout(activate,180000);
};

activate();