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
let privatekey1;
let privatekey2;
let privatekey3;
let privatekey4;
let newarr = [];
let bet_result;
let resnumber=[]
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
    let db=await HumanAi.find({});

    let allres = arrInternal;
    
    console.log("allres:======================"+allres);
    //知道了name 还原回去
    //give value
    for (let i = 0; i < allres.length; i++) {
        newarr.push(allres[i]);
    }
     // newarr = allres;
     // console.log(newarr);
    let quantityr = RandomNumber.random_different_probability(bet_amount, bet_probability_realPlayer);
    let realPlayer_amount = parseFloat(quantityr) * 10000;
    //console.log(quantity1);
    //console.log(realPlayer_amount);


    let quantity0 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let quantity1 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let quantity2 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let quantity3 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let quantity4 = RandomNumber.random_different_probability(bet_amount, bet_probability);

    let robot_amount = parseFloat(quantity0) * 10000;
    let robot_amount1 = parseFloat(quantity1) * 10000;
    let robot_amount2 = parseFloat(quantity2) * 10000;
    let robot_amount3 = parseFloat(quantity3) * 10000;
    let robot_amount4 = parseFloat(quantity4) * 10000;



    if (status !== 2) {return console.log("游戏不活跃");}

        console.log("====================baccarat====================begin");
        if (playerInfos.rows.length !== 0 || playerInfos != null) {
            for (let j = 0; j < playerInfos.rows.length; j++) {
                let realPlayer = playerInfos.rows[j].player;
                        for (let i = 0; i <allres.length ; i++) {
                           let dbres = allres[i];
                           if (realPlayer===dbres){
                               await Internal.set_verify(false.toString());
                               console.log("==================================没有有新玩家 全部是机器人" + realPlayer)
                           }
                        }
            }
        }

        resnumber = await randomNumber._norepeatNumber(5);
        console.log("resnumber====================================="+resnumber);
        let accountname0 = await newarr[resnumber[0]];
        let accountname1 = await newarr[resnumber[1]];
        let accountname2 = await newarr[resnumber[2]];
        let accountname3 = await newarr[resnumber[3]];
        let accountname4 = await newarr[resnumber[4]];

    console.log("accountname0====================================="+accountname0);
    console.log("accountname1====================================="+accountname1);
    console.log("accountname2====================================="+accountname2);
    console.log("accountname2====================================="+accountname3);
    console.log("accountname2====================================="+accountname4);

    //审查账户

        //这里已经知道了账户名 这轮
        for (let i = 0; i <playerInfos.rows.length ; i++) {
            let roundply = await playerInfos.rows[i].player;
            console.log("=====================================roundply:"+roundply+"=========="+accountname0);
            if (roundply===accountname0||roundply===accountname1||roundply===accountname2||roundply===accountname3||roundply===accountname4){
                //投注过
               //await Internal.set_verifyres("0");
               //return
            }
            else {
                //没有投注过
               // await Internal.set_verifyres("1");
            }
        }
        let verifyres=await Internal.get_verifyres();
        console.log("accountname0:"+verifyres+"========="+accountname0);

            //!res=-1说明不存在
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
        console.log("==========" + new Date()  + "==========" + "status:" + status);

    // console.log("accountname0:"+verifyres+"========="+accountname0+"========="+privatekey0);
    // console.log("accountname1:"+verifyres+"========="+accountname1+"========="+privatekey1);
    // console.log("accountname2:"+verifyres+"========="+accountname2+"========="+privatekey2);
    // console.log("accountname3:"+verifyres+"========="+accountname3+"========="+privatekey3);
    // console.log("accountname4:"+verifyres+"========="+accountname4+"========="+privatekey4);

    if (verifyres==="0"){
        promise = new Promise(async (resolve, reject) => {
            console.log("============================================开始下注");
            if (accountname0===undefined) {
                //重试
                 resnumber = await randomNumber.norepeatNumber(1);
                console.log("resnumber====================================="+resnumber);
                 accountname0 = await newarr[resnumber];
                for (let i = 0; i < allres.length; i++) {
                    if (accountname0 === allres[i]) {
                        privatekey0 = await allres[i].privatekey;
                    }
                }
            }

            if (await Internal.get_verify()==="true") {
                console.log("accountname0==============================get_verify"+accountname0);
                //开奖概率10 设置概率
                await Sleep.sleep(3000);
                let area0 = await constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + realPlayer_amount.toString() + ",";
                bet_result = await PushAcition._betBaccarat(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable);
            } else {
                //获取新一轮的,轮次
                console.log("accountname0==============================get_verify"+"==========="+accountname0);
                let area0 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo0 = roundId + "," + newarr[resnumber] + "," + area0 + "," + robot_amount.toString() + ",";
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

                await Sleep.sleep(3000);
                console.log("accountname1==============================get_verify"+"==========="+accountname0);
                let area1 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo1 = roundId + "," + newarr[resnumber] + "," + area1 + "," + robot_amount1.toString() + ",";
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
                await Sleep.sleep(3000);
                console.log("accountname2==============================get_verify"+"==========="+accountname0);
                let area2 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo2 = roundId + "," + newarr[resnumber] + "," + area2 + "," + robot_amount2.toString() + ",";
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
                await Sleep.sleep(3000);
                console.log("accountname3==============================get_verify"+"==========="+accountname0);
                let area3 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo3 = roundId + "," + newarr[resnumber] + "," + area3 + "," + robot_amount3.toString() + ",";
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
                await Sleep.sleep(3000);
                console.log("accountname4==============================get_verify"+"==========="+accountname0);
                let area4 = constants.baccarat_area[Math.floor(Math.random() * constants.baccarat_area.length)];
                let memo4 = roundId + "," + newarr[resnumber] + "," + area4 + "," + robot_amount4.toString() + ",";
                gettxInfo = await PushAcition._betBaccarat(accountname4, privatekey4, quantity4, memo4, area4, roundId, end_time, playerInfos, gameTable).then(async (res) => {

                    if (res===undefined){
                        await PushAcition._betBaccarat(accountname4, privatekey4, quantity4, memo4, area4, roundId, end_time, playerInfos, gameTable)
                    }else {
                        bet_result = res;
                        resolve(bet_result);
                       // console.log("===============下注结果" + res);
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
    let arrss=await Internal.get_beforeDb();
    console.log("ss================="+typeof arrss);
    arr=await arrss.split(',');
    console.log("ss================="+typeof arr);
    start(arr);
}
test();
