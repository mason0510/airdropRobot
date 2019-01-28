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


let bet_amount = ['1.0000 EOS', '1.0000 EOS', '5.0000 EOS', '10.0000 EOS', '50.0000 EOS'];
//没有玩家
let bet_probability = [0.38, 0.3, 0.2, 0.1, 0.02];
//有玩家
let bet_probability_realPlayer = [0.28, 0.1, 0.2, 0.3, 0.12];

let InternalInfo=require('../../db/internal');

let gettxInfo;
let promise;
let privatekey0;
let newarr = [];
let bet_result;
let robotConstants=require('../../utils/robotAccountConstants');
let res;
start = async (arrInternal) => {
    let gameTablePromise = TableInfo.baccarat_getGameTable();
    let playerInfosPromise = TableInfo.baccarat_getPlayerTable();
    //get var
    let gameTable = await gameTablePromise;
    let playerInfos = await playerInfosPromise;
    console.log("gametable" + gameTable.rows);
    console.log("playerInfos" + JSON.stringify(playerInfos.rows));
    //获取玩家信息并保存到redis
    if (playerInfos!=null){
        await InternalInfo.set_playerInfo(playerInfos.rows);
        for (let i = 0; i <playerInfos.rows.length; i++) {
           let players=playerInfos.rows[i].player;
            console.log("players:===================="+players);
        }
    }

    let status = gameTable.rows[0].status;
    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;
    let allres = await HumanAi.find({});
    //give value
     newarr = arrInternal;
     // console.log(newarr);

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
                        for (let i = 0; i <allres.length ; i++) {
                           let dbres = allres[i].accountname;
                           if (realPlayer===dbres){
                               await Internal.set_verify(false);
                               console.log("==================================没有有新玩家 全部是机器人" + realPlayer)
                           }
                        }
            }
        }

        let resnumber = await randomNumber.norepeatNumber(1);
        console.log("resnumber====================================="+resnumber);
        let accountname0 = await newarr[resnumber];

        //这里已经知道了账户名
        for (let i = 0; i <playerInfos.rows.length ; i++) {
            let roundply = await playerInfos.rows[i].player;
            console.log("=====================================roundply:"+roundply+"=========="+accountname0);
            if (roundply===accountname0){
                //投注过
               await Internal.set_verifyres(1);
            }else {
                //没有投注过
                await Internal.set_verifyres(0);
            }
        }
        let verifyres=await Internal.get_verifyres();
        console.log("accountname0:"+verifyres+"========="+accountname0);

            //!res=-1说明不存在
        //根据账户名查找加密私钥
        for (let i = 0; i < allres.length; i++) {
            if (accountname0 === allres[i].accountname) {
                privatekey0 = await allres[i].privatekey;
            }
        }
        console.log("==========" + new Date()  + "==========" + "status:" + status);
    if (verifyres==="0"){
        promise = new Promise(async (resolve, reject) => {
            console.log("============================================开始下注");
            if (accountname0===undefined) {
                //重试
                 resnumber = await randomNumber.norepeatNumber(1);
                console.log("resnumber====================================="+resnumber);
                 accountname0 = await newarr[resnumber];
                for (let i = 0; i < allres.length; i++) {
                    if (accountname0 === allres[i].accountname) {
                        privatekey0 = await allres[i].privatekey;
                    }
                }
            }

            if (await Internal.get_verify()==="true") {
                console.log("accountname0==============================get_verify"+accountname0);
                //开奖概率10 设置概率
                let area0 = await constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + realPlayer_amount.toString() + ",";
                bet_result = await PushAcition._betBaccarat(accountname0, privatekey0, quantity1, memo0, area0, roundId, end_time, playerInfos, gameTable);
            } else {
                //获取新一轮的,轮次
                console.log("accountname0==============================get_verify"+"==========="+accountname0);
                let area0 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + robot_amount.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname0, privatekey0, quantity2, memo0, area0, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname0, privatekey0, quantity2, memo0, area0, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                        console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });
            }
            await Internal.set_verify(false)
        });
        }else if(verifyres==="1"){
            console.log("已经下过注");
            //重置状态
            await Internal.set_verifyres(0);
        }

    return promise;
};
module.exports = {start};
//返回全部数据


start(robotConstants.arr7);
