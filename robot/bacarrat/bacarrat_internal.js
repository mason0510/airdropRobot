//获取所有准备的数据
//
let Sleep = require("../../utils/sleep");

let eoshelper = require("../../utils/eoshelper");

let AccountInfo = require("../../utils/accountInfo");
//星球大战
let Humanais = require("../../model/humanAI");
//累计下注额
let betRecoders = require("../../model/betRecoders");

let request = require("request");

let CryptoUtil = require('../../encryption/cryptoUtil');

let Eoshelper = require("../../utils/eoshelper");
// let {Buyeos,Rentcpu}=require("../robot/checkCPU");
// let dbutils = require("../utils/dbutils");

let Account = require('../../eostools/accountInfo');

let DbManage = require('../../utils/dbManage');

let fs = require('fs');


let RandomNumber = require('../../utils/randomNumber');

let time = require('../../utils/time');

let TableInfo = require('../../eostools/tableInfo_superagent');

let constants = require("../../utils/constants");

let randomNumber = require('../../utils/randomNumber');

let PushAcition = require('../../eostools/pushAction');

let HumanAi = require("../../model/humanAI");

let result = require('../../db/db');

let Iemainder_redis = require('../../utils/remainder_redis');

let Internal = require('../../db/internal');


let bet_amount = ['0.1000 EOS', '1.0000 EOS', '5.0000 EOS', '10.0000 EOS', '50.0000 EOS'];
//没有玩家
let bet_probability = [0.38, 0.3, 0.2, 0.1, 0.02];
//有玩家
let bet_probability_realPlayer = [0.28, 0.1, 0.2, 0.3, 0.12];

let gettxInfo;
let promise;
let privatekey0;
let newarr = [];
let bet_result;
let res;
start = async (arrInternal) => {
    let gameTablePromise = TableInfo.baccarat_getGameTable();
    let playerInfosPromise = TableInfo.baccarat_getPlayerTable();
    //get var
    let gameTable = await gameTablePromise;
    let playerInfos = await playerInfosPromise;
    console.log("gametable" + gameTable.rows);
    console.log("playerInfos" + playerInfos.rows);
    let status = gameTable.rows[0].status;
    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;
    let allres = await HumanAi.find({}).limit(33);
    //give value
     newarr = arrInternal;
     console.log(newarr);
    let quantity1 = RandomNumber.random_different_probability(bet_amount, bet_probability_realPlayer);
    let realPlayer_amount = parseFloat(quantity1) * 10000;
    //console.log(quantity1);
    //console.log(realPlayer_amount);
    let quantity2 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let robot_amount = parseFloat(quantity2) * 10000;

    if (status !== 2) {return console.log("游戏不活跃");}

        console.log("====================baccarat====================begin");
        if (playerInfos.rows.length !== 0 || playerInfos != null) {
            for (let j = 0; j < playerInfos.rows.length; j++) {
                let realPlayer = playerInfos.rows[j].player;
                //console.log(realPlayer);
                //只包含名字的新数组
                    if (newarr===null||playerInfos===null){return }
                console.log("res:=================================="+res);
                console.log("realPlayer:=================================="+realPlayer);
                console.log("newarr:=================================="+newarr);
                    if (realPlayer!=null){
                         res = newarr.indexOf(realPlayer);
                    }
                    if (res!==-1) {
                        await Internal.set_verify(true);
                        console.log("==================================有新玩家" + realPlayer)
                    } 

            }
        }

        let resnumber = await randomNumber.norepeatNumber(1);
        let accountname0 = await newarr[resnumber];
        //根据账户名查找加密私钥
        for (let i = 0; i < allres.length; i++) {
            if (accountname0 === allres[i].accountname) {
                privatekey0 = await allres[i].privatekey;
            }
        }
        if (privatekey0==="undefined") {return}
        console.log("==========" + new Date()  + "==========" + "status:" + status);
        promise = new Promise(async (resolve, reject) => {
            if (await Internal.get_verify()) {
                //开奖概率10 设置概率
                let area0 = await constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + realPlayer_amount.toString() + ",";
                bet_result = await PushAcition._betBaccarat(accountname0, privatekey0, quantity1, memo0, area0, roundId, end_time, playerInfos, gameTable);
            } else {
                //获取新一轮的,轮次
                let area0 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + robot_amount.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname0, privatekey0, quantity2, memo0, area0, roundId, end_time, playerInfos, gameTable).then(async (res) => {
                    console.log("===============下注结果" + res);
                    bet_result = res;
                    resolve(bet_result);
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });
            }
            await Internal.set_verify(false)
        });

    return promise;
};
module.exports = {start};
