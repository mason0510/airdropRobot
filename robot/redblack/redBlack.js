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
 let dbutils = require("../../utils/dbutils");

let Account = require('../../eostools/accountInfo');

let DbManage = require('../../utils/dbManage');

let fs = require('fs');



let Subting = require('../../utils/subtring');


let RandomNumber = require('../../utils/randomNumber');

let time = require('../../utils/time');

let TableInfo = require('../../eostools/tableInfo_superagent');

let constants = require("../../utils/constants");

let randomNumber = require('../../utils/randomNumber');

let PushAcition = require('../../eostools/pushAction');

let HumanAi = require("../../model/humanAI");

 let result = require('../../db/db');


let gamestatus;
let end_time;
let roundId;
let count = 0;
//获取前50个账户
let strarr;
let allAmount = 0
let res;
let amount;

//是否已经投注过
let areadyBet = false;
let thisTurn = 0;
let newTurn = 0;
//开始投注
let verify = false;

//let
let isRunning = false;

//let times1    = [1,6,11,16,21,26,31,36,41,46,51,56];
let times1 = [1, 21, 41];

let bet_amount = ['0.5000 EOS', '1.0000 EOS', '5.0000 EOS', '10.0000 EOS', '50.0000 EOS'];
//没有玩家
let bet_probability = [0.38, 0.3, 0.2, 0.1, 0.02];
//有玩家
let bet_probability_realPlayer = [0.28, 0.1, 0.2, 0.3, 0.12];

let gettxInfo;
let promise;
start = async () => {
    console.log("====================redBlue====================begin");
    let gameTablePromise = TableInfo.getGameTable();
    let playerInfosPromise = TableInfo.getPlayerTable();
    let gameTable = await gameTablePromise;
    let playerInfos = await playerInfosPromise;
    console.log(gameTable.rows);
    console.log(playerInfos.rows);
    let status = gameTable.rows[0].status;
    let roundId = gameTable.rows[0].id;
    let end_time = gameTable.rows[0].end_time;
    let res = await HumanAi.find({})
    let newarr = [];
    let bet_result;
    let quantity1 = RandomNumber.random_different_probability(bet_amount, bet_probability_realPlayer);
    let realPlayer_amount = parseFloat(quantity1)*10000;
     //console.log(quantity1);
     //console.log(realPlayer_amount);
    let quantity2 = RandomNumber.random_different_probability(bet_amount, bet_probability);
    let robot_amount = parseFloat(quantity2)*10000;
    //console.log(quantity2);
    //console.log(robot_amount);

    if (status === 2) {
        for (let i = 0; i < res.length; i++) {
            let name = await res[i].accountname;
            newarr.push(name);
        }

        if (playerInfos.rows.length !== 0) {
            for (let j = 0; j < playerInfos.rows.length; j++) {
                let realPlayer = playerInfos.rows[j].player;
                //console.log(realPlayer);
                //只包含名字的新数组
                let res = newarr.indexOf(realPlayer);
                if (res !== -1) {
                    console.log("==================================没有新玩家")
                } else {
                    verify = true;
                    console.log("==================================有新玩家" + realPlayer)
                }
            }
        }
        let resnumber = await randomNumber.__norepeatNumber(1);
        let accountname0 = res[resnumber[0]].accountname;
        let privatekey0 = res[resnumber[0]].privatekey;

        console.log("==========" + new Date() + "=========" + "verify:" + verify + "==========" + "status:" + status);
 promise=new Promise(async (resolve,reject)=>{
    if (verify) {
        //开奖概率10 设置概率
        let area0 = await constants.betarea[Math.floor(Math.random() * constants.betarea.length)];
        let memo0 = roundId + "," + res[resnumber[0]].accountname + "," + area0 + "," + realPlayer_amount.toString() + ",";
        bet_result=await PushAcition._bet(accountname0, privatekey0, quantity1, memo0, area0, roundId, end_time, playerInfos, gameTable);
    } else {
        //获取新一轮的,轮次
        let area0 = constants.betarea[Math.floor(Math.random() * constants.betarea.length)];
        let memo0 = roundId + "," + res[resnumber[0]].accountname + "," + area0 + "," + robot_amount.toString() + ",";
        gettxInfo= await PushAcition._bet(accountname0, privatekey0, quantity2, memo0, area0, roundId, end_time, playerInfos, gameTable).then(async (res)=>{
            console.log("===============下注结果"+res);
            bet_result=res;
           resolve (bet_result);
        }).catch(err=>{
            console.error(err);
        });
    }
    //重置数据
    verify = false;
});

    }
    return promise;
};
module.exports = {start};

 async function testres(){
    let res= await start();
    console.log("testres============================="+res);
}


// testres();
// start();