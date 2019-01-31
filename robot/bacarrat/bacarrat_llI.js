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


// let bet_amount = ['1.0000 EOS', '1.0000 EOS', '5.0000 EOS', '10.0000 EOS', '50.0000 EOS'];

//没有玩家 0.1,(5%)
// 0.2,(5%)
// 0.3,（1%）
// 0.4,(2%)
// 0.5(13%)
// 0.8,(5%)
// 1,(20%)
// 1.6,（1%）
// 2,(10%)
// 3,（1%）
// 4,（1%）
// 5,（12%）
// 6,（1%）
// 8,(5%)
// 10,(5%)
// 15,（1%）
// 16,（1%）
// 20,(5%)
// 30,（1%）
// 32,（1%）
// 40,（1%）
// 48,（1%）
// 50（2%）
//
//
// 庄，（40%）
// 闲，（40%）
// 和，（10%）
// 龙7，（5%）
// 熊8，（5%）
// let bet_probability = [0.38, 0.3, 0.2, 0.1, 0.02];
//有玩家
// let bet_probability_realPlayer = [0.28, 0.1, 0.2, 0.3, 0.12];

let InternalInfo=require('../../db/internal');

let gettxInfo;
let promise;
let privatekey0;
let privatekey1;
let privatekey2;
let privatekey3;
let privatekey4;
let newarr = [];
let bet_result;
let resnumber=[]
let robotConstants=require('../../utils/robotAccountConstants');
let res;
let bool=false;

async function getPlayerInfo() {
    let playerInfosPromise = TableInfo.baccarat_getPlayerTable();
    let playerInfos = await playerInfosPromise;
    console.log("playerInfos" + JSON.stringify(playerInfos.rows));
    //获取玩家信息并保存到redis
    if (playerInfos != null) {
        await InternalInfo.save_playerInfos(playerInfos.rows);
        for (let i = 0; i < playerInfos.rows.length; i++) {
            let players = playerInfos.rows[i].player;
            console.log("players:====================" + players);
        }
    }
    return playerInfos;
}

async function getGameTable() {
    let gameTablePromise = TableInfo.baccarat_getGameTable();
    let gameTable = await gameTablePromise;
    console.log("gametable" + gameTable.rows);
    return gameTable;
}

async function checkPlayerInfo(accountname0, accountname1, accountname2, accountname3, accountname4, playerInfos) {
    console.log("accountname0=====================================" + accountname0);
    console.log("accountname1=====================================" + accountname1);
    console.log("accountname2=====================================" + accountname2);
    console.log("accountname2=====================================" + accountname3);
    console.log("accountname2=====================================" + accountname4);

    for (let i = 0; i < playerInfos.rows.length; i++) {
        let roundply = await playerInfos.rows[i].player;
            if (roundply === accountname0){
                await Internal.set_verifyres("1");
                //相等 让当前局失败
                accountname0="0"
            }if(roundply === accountname1){
            await Internal.set_verifyres("1");
            accountname1="0"
             } if( roundply === accountname2 ){
            await Internal.set_verifyres("1");
            accountname2="0"
             }if( roundply === accountname3) {
            await Internal.set_verifyres("1");
            accountname3="0"
             }if(roundply === accountname4) {
                //投注过
            accountname4="0";
                await Internal.set_verifyres("1");
                 bool=true;
            }else {
            await Internal.set_verifyres("0");
        }
        return bool;
    }
}

start = async (arrInternal) => {
    let quantityr = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let realPlayer_amount = parseFloat(quantityr) * 10000;
    let quantity0 = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let quantity1 = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let quantity2 = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let quantity3 = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let quantity4 = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let robot_amount = parseFloat(quantity0) * 10000;
    let robot_amount1 = parseFloat(quantity1) * 10000;
    let robot_amount2 = parseFloat(quantity2) * 10000;
    let robot_amount3 = parseFloat(quantity3) * 10000;
    let robot_amount4 = parseFloat(quantity4) * 10000;
    //发起两次网络请求
    let gameTable = await getGameTable();
    let playerInfos = await getPlayerInfo();

    newarr=arrInternal;
    resnumber = await randomNumber.__norepeatNumber(5);
    let accountname0 = await newarr[resnumber[0]];
    let accountname1 = await newarr[resnumber[1]];
    let accountname2 = await newarr[resnumber[2]];
    let accountname3 = await newarr[resnumber[3]];
    let accountname4 = await newarr[resnumber[4]];

    let status = gameTable.rows[0].status;
    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;


    let db=await HumanAi.find({});//改为从redis获取

        console.log("====================baccarat=======================================begin");
        if (playerInfos != null) {
          for (let i = 0; i <arrInternal.length; i++) {
                            for (let j = 0; j < playerInfos.rows.length; j++) {
                                let realPlayer = playerInfos.rows[j].player;
                           let dbres = arrInternal[i];
                           if (realPlayer===dbres){
                               await Internal.set_verify("false");
                           }
                        }
            }
        }


    await checkPlayerInfo(accountname0, accountname1, accountname2, accountname3, accountname4, playerInfos);


        //根据账户名查找加密私钥
        for (let i = 0; i < db.length; i++) {
            if (accountname0 === db[i].accountname) {
                privatekey0 = await db[i].privatekey;
            }
            if (accountname1 === db[i].accountname) {
                privatekey1 = await db[i].privatekey;
            }
            if (accountname2 === db[i].accountname) {
                privatekey2 = await db[i].privatekey;
            }
            if (accountname3 === db[i].accountname) {
                privatekey3 = await db[i].privatekey;
            }
            if (accountname4 === db[i].accountname) {
                privatekey4 = await db[i].privatekey;
            }
        }
    // console.log("accountname0:"+verifyres+"========="+accountname0+"========="+privatekey0);
    // console.log("accountname1:"+verifyres+"========="+accountname1+"========="+privatekey1);
    // console.log("accountname2:"+verifyres+"========="+accountname2+"========="+privatekey2);
    // console.log("accountname3:"+verifyres+"========="+accountname3+"========="+privatekey3);
    // console.log("accountname4:"+verifyres+"========="+accountname4+"========="+privatekey4);

    if (await Internal.get_verifyres()==="0"){
        promise = new Promise(async (resolve, reject) => {
            console.log("============================================开始下注"+ new Date()  + "==========" + "status:" + status);
            if (accountname0===undefined) {
                //重试
                 resnumber = await randomNumber.norepeatNumber(1);
                console.log("resnumber====================================="+resnumber);
                 accountname0 = await newarr[resnumber];
                for (let i = 0; i < arrInternal.length; i++) {
                    if (accountname0 === arrInternal[i]) {
                        privatekey0 = await arrInternal[i].privatekey;
                    }
                }
            }

            if (await Internal.get_verify()==="true") {
                //开奖概率10 设置概率
                //await Sleep.sleep(2000);
                let area0 = await constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + realPlayer_amount.toString() + ",";
                bet_result = await PushAcition._betBaccarat(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable);

                // await Sleep.sleep(2000);
                console.log("accountname1==============================get_verify"+"==========="+accountname0);
                let area1 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo1 = roundId + "," + accountname1 + "," + area1 + "," + robot_amount1.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname1, privatekey1, quantity1, memo1, area1, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname1, privatekey1, quantity1, memo1 ,area1, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                        //console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });

                //await Sleep.sleep(2000);
                console.log("accountname2==============================get_verify"+"==========="+accountname0);
                let area2 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo2 = roundId + "," + accountname2+ "," + area2 + "," + robot_amount2.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                        //console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });
            } else {
                //获取新一轮的,轮次
                console.log("accountname0==============================get_verify"+"==========="+accountname0);
                let area0 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + accountname0 + "," + area0 + "," + robot_amount.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                       // console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });

                //await Sleep.sleep(2000);
                console.log("accountname1==============================get_verify"+"==========="+accountname0);
                let area1 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo1 = roundId + "," + accountname1+ "," + area1 + "," + robot_amount1.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname1, privatekey1, quantity1, memo1, area1, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname1, privatekey1, quantity1, memo1 ,area1, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                        //console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });

               // await Sleep.sleep(2000);
                console.log("accountname2==============================get_verify"+"==========="+accountname0);
                let area2 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo2 = roundId + "," + accountname2 + "," + area2 + "," + robot_amount2.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                        //console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });

                //await Sleep.sleep(2000);
                console.log("accountname3==============================get_verify"+"==========="+accountname0);
                let area3 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo3 = roundId + "," + accountname3 + "," + area3 + "," + robot_amount3.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname3, privatekey3, quantity3, memo3, area3, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname3, privatekey3, quantity3, memo3, area3, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                       // console.log("===============下注结果" + res);
                    }
                }).catch(err => {
                    console.error(err);
                    reject(err)
                });

               // await Sleep.sleep(2000);
                console.log("accountname4==============================get_verify"+"==========="+accountname0);
                let area4 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo4 = roundId + "," + accountname4 + "," + area4 + "," + robot_amount4.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname4, privatekey4, quantity4, memo4, area4, roundId, end_time, playerInfos, gameTable).then(async (res) => {
                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname4, privatekey4, quantity4, memo4, area4, roundId, end_time, playerInfos, gameTable)
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
        return

        }

    return promise;
};
module.exports = {start};
//返回全部数据
let arr=[]
let test=async ()=>{
    let arrss=await Internal.get_afterDb();
    // console.log("ss================="+typeof arrss);
    arr=await arrss.split(',');
    // console.log("ss================="+typeof arr);
    start(arr);
}
// test();
