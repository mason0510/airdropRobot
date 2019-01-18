let eoshelper = require("../utils/eoshelper");
let CryptoUtil = require('../encryption/cryptoUtil');
let time=require('../utils/time');
let Fileoperation = require('../utils/fileoperation');
let count=0;
_bet = async (account, privatekey, quantity, memo, betarea, roundId, endtime, playerInfos, gameTable) => {
    let promise;
        let status = await gameTable.rows[0].status;
        let currenttime = await time.networktime();
        // console.log("当前网络时间" + currenttime);
        console.log(endtime);
        let bettime = Number(endtime * 1000 - currenttime);
        console.log("=================bettime" + bettime);
        let newtime=Math.abs(bettime);
        console.log("=================newtime" + newtime);
        let mytime=Math.abs(bettime)+20;
        if (status===2&&bettime>=2000) {
            //判断下注数字 如果随机出一样的 不再下注
            let mykey = CryptoUtil.privateDecrypt(privatekey);
            try {
                if (playerInfos.rows.length === 0) {
                    promise=new Promise(async (resolve,reject)=>{
                        if (reject)
                       eoshelper.api.myFunc(mykey).transact({
                           actions: [{
                               account: "eosio.token",
                               name: 'transfer',
                               authorization: [{
                                   actor: account,
                                   permission: 'active',
                               }],
                               data: {
                                   from: account,
                                   to: "warofstar.e",
                                   quantity: quantity,
                                   memo: memo,
                               },
                           }]
                       }, {
                           blocksBehind: 3,
                           expireSeconds: 30,
                       }, function (error) {
                           if (error) return reject(error);
                       }).then(async result=>{
                           // await save(quantity);
                           let bet_result=await JSON.stringify(result);
                           console.log("======================================================结束" + bet_result);
                           //保存结果
                           count++;
                           console.log("=============" + count + quantity);
                           await Fileoperation.save(count, parseInt(quantity));
                           await Fileoperation.saveBetData(count, parseInt(quantity));
                               resolve(bet_result);
                       });

                   });

                } else {
                    for (let i = 0; i < playerInfos.rows.length; i++) {
                        let item=playerInfos.rows[i];
                        if (item.player === account && item.bet_type !== betarea) {
                            return
                        }
                    }
                }

            } catch (e) {
                console.log("Game is no longer active")
            } finally {
                isRunning = false;
            }
        } else {
            console.log("警告！！！结算中 不能下注");
        }
    return promise;
};
module.exports={_bet};