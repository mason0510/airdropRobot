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

let gettxInfo;
let promise;
let privatekey0;
let privatekey1;
let privatekey2;
let privatekey3;
let privatekey4;
let newarr = [];
let bet_result;
let resnumber = []
let res;
let bool = false;
let db = [];

async function getPlayerInfo() {
    let playerInfosPromise = TableInfo.getPlayerTable();
    let playerInfos = await playerInfosPromise;
    console.log("playerInfos" + JSON.stringify(playerInfos.rows));
    //获取玩家信息并保存到redis
    if (playerInfos != null) {
        //await InternalInfo.save_playerInfos(playerInfos.rows);
        for (let i = 0; i < playerInfos.rows.length; i++) {
            let players = playerInfos.rows[i].player;
            console.log("players:====================" + players);
        }
    }
    return playerInfos;
}

async function getGameTable() {

    return new Promise(async (resolve)=>{
        let gameTablePromise = TableInfo.getGameTable()
        let gameTable = await gameTablePromise;
        resolve(gameTable);
    });
}
//497,undefined,24,1000,
async function noRealPlayer(roundId, accountname0, robot_amount, quantity0, end_time, playerInfos, gameTable, accountname1, robot_amount1, quantity1, accountname2, robot_amount2, quantity2, accountname3, robot_amount3, quantity3, accountname4, robot_amount4, quantity4) {
//获取新一轮的,轮次
    let area0 = constants.roulette_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo0 = roundId + "," +"undefined"+ ","+area0 + "," + robot_amount.toString() + ",";
    //===========12===========521,undefined,12,5000,
    console.log("==========="+area0+"==========="+memo0);
    gettxInfo = await PushAcition.Roulette(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable)
    //
    //await Sleep.sleep(2000);
    let area1 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo1 = roundId + ","  + area1 + "," + robot_amount1.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname1, privatekey1, quantity1, memo1, area1, roundId, end_time, playerInfos, gameTable)

    // await Sleep.sleep(2000);
    let area2 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo2 = roundId + ","  + area2 + "," + robot_amount2.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable)

    //  //await Sleep.sleep(2000);
    let area3 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo3 = roundId + ","  + area3 + "," + robot_amount3.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname3, privatekey3, quantity3, memo3, area3, roundId, end_time, playerInfos, gameTable)

    // await Sleep.sleep(2000);
    let area4 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo4 = roundId + "," + area4 + "," + robot_amount4.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname4, privatekey4, quantity4, memo4, area4, roundId, end_time, playerInfos, gameTable)
}

async function haveealPlayer(roundId, realPlayer_amount, accountname0, quantity0, end_time, playerInfos, gameTable, accountname1, robot_amount1, quantity1, accountname2, robot_amount2, quantity2) {


    let area0 = await constants.roulette_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo0 = roundId + "," +"undefined" +","+ area0 + "," + realPlayer_amount.toString() + ",";
    bet_result = await PushAcition.Roulette(accountname0, privatekey0, quantity0, memo0, area0, roundId, end_time, playerInfos, gameTable);

    console.log("==========="+area0+"==========="+memo0);
    // // await Sleep.sleep(2000);
    let area1 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo1 = roundId + "," + area1 + "," + robot_amount1.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname1, privatekey1, quantity1, memo1, area1, roundId, end_time, playerInfos, gameTable);

    //await Sleep.sleep(2000);
    let area2 = constants.baccarat_area[Math.floor(Math.random() * constants.roulette_area.length)];
    let memo2 = roundId + "," + area2 + "," + robot_amount2.toString() + ",";
    gettxInfo = await PushAcition.Roulette(accountname2, privatekey2, quantity2, memo2, area2, roundId, end_time, playerInfos, gameTable)
}

async function getPrivateKey(accountname0, accountname1, accountname2, accountname3, accountname4) {
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
}

function randomAmount() {
    let quantityr = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let realPlayer_amount = parseFloat(quantityr) * 10000;
    //console.log(quantity1);
    //console.log(realPlayer_amount);


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
    return {
        realPlayer_amount,
        quantity0,
        quantity1,
        quantity2,
        quantity3,
        quantity4,
        robot_amount,
        robot_amount1,
        robot_amount2,
        robot_amount3,
        robot_amount4
    };
}

async function getGameINfo() {
    let gameTable = await getGameTable();
    let playerInfos = await getPlayerInfo();

    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;
    return {gameTable, playerInfos, roundId, end_time};
}

async function getPlayersName() {
    resnumber = await randomNumber.__norepeatNumber(5);
    console.log("resnumber=====================================" + resnumber);
    let accountname0 = await newarr[resnumber[0]];
    let accountname1 = await newarr[resnumber[1]];
    let accountname2 = await newarr[resnumber[2]];
    let accountname3 = await newarr[resnumber[3]];
    let accountname4 = await newarr[resnumber[4]];
    return {accountname0, accountname1, accountname2, accountname3, accountname4};
}


async function getPlayerInfo() {
    let playerInfosPromise = await TableInfo.getPlayerTable();
    let playerInfos = await playerInfosPromise;
    console.log("playerInfos" + JSON.stringify(playerInfos.rows));
    //获取玩家信息并保存到redis
    if (playerInfos != null) {
        //await InternalInfo.save_playerInfos(playerInfos.rows);
        for (let i = 0; i < playerInfos.rows.length; i++) {
            let players = playerInfos.rows[i].player;
            console.log("players:====================" + players);
        }
    }
    return playerInfos;
}

async function getGameTable() {
    let gameTablePromise = await TableInfo.getGameTable();
    let gameTable = await gameTablePromise;
    console.log("gametable" + gameTable.rows);
    return gameTable;
}


start = async (arrInternal) => {
//先随机5个玩家
    // newarr = allres;
    // console.log(newarr);
    // let {realPlayer_amount, quantity0, quantity1, quantity2, quantity3, quantity4, robot_amount, robot_amount1, robot_amount2, robot_amount3, robot_amount4} = randomAmount();
    //发起两次网络请求

    let quantityr = RandomNumber.random_different_probability(constants.bet_amount, constants.bet_probability);
    let realPlayer_amount = parseFloat(quantityr) * 10000;
    //console.log(quantity1);
    //console.log(realPlayer_amount);


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

    console.log(quantity0+robot_amount);
    console.log(quantity1+robot_amount1);
    console.log(quantity2+robot_amount2);
    console.log(quantity3+robot_amount3);
    console.log(quantity4+robot_amount4);

    let gameTable = await getGameTable();
    let playerInfos = await getPlayerInfo();

    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;

    console.log(gameTable);
    console.log(playerInfos);

    let str = await Internal.get_humanais();

    db = await JSON.parse(str);

    let allres = arrInternal;
    //give value
    for (let i = 0; i < allres.length; i++) {
        newarr.push(allres[i]);
    }
    //有玩家 有新玩家
    if (playerInfos != null) {
        for (let j = 0; j < playerInfos.rows.length; j++) {
            let nowPlayer = playerInfos.rows[j].player;
            for (let i = 0; i < db.length; i++) {
                if (nowPlayer !== db[i].accountname) {
                    await Internal.set_verify("true");
                }
            }
        }
    }
    let {accountname0, accountname1, accountname2, accountname3, accountname4} = await getPlayersName();

    //await checkPlayerInfo(accountname0, accountname1, accountname2, accountname3, accountname4, playerInfos);

    let verifyres = await Internal.get_verifyres();
    console.log("accountname0:" + verifyres + "=========" + accountname0);

    //根据账户名查找加密私钥
    await getPrivateKey(accountname0, accountname1, accountname2, accountname3, accountname4);


    if (await Internal.get_verify() === "true") {
        //开奖概率10 设置概率
        //await Sleep.sleep(2000);
        await haveealPlayer(roundId, realPlayer_amount, accountname0, quantity0, end_time, playerInfos, gameTable, accountname1, robot_amount1, quantity1, accountname2, robot_amount2, quantity2);
    } else {
        await noRealPlayer(roundId, accountname0, robot_amount, quantity0, end_time, playerInfos, gameTable, accountname1, robot_amount1, quantity1, accountname2, robot_amount2, quantity2, accountname3, robot_amount3, quantity3, accountname4, robot_amount4, quantity4);
    }
    await Internal.set_verify(false)

};
module.exports = {start};
//返回全部数据
let arr = []
// let test = async () => {
//     let arrss = await Internal.get_afterDb();
//     // console.log("ss================="+typeof arrss);
//     arr = await arrss.split(',');
//     // console.log("ss================="+typeof arr);
//     start(arr);
// }
// test();
