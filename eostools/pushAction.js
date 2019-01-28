let eoshelper = require("../utils/eoshelper");
let CryptoUtil = require('../encryption/cryptoUtil');
let time=require('../utils/time');
let Fileoperation = require('../utils/fileoperation');
let constants=require("../utils/constants");
let count=0;
let Sleep=require("../utils/sleep");
let Dbutils= require('../utils/dbutils');
_bet = async (account, privatekey, quantity, memo, betarea, roundId, endtime, playerInfos, gameTable) => {
    console.log("======================当前下注"+account+"+"+quantity+"+"+memo);
    console.log("memo======================"+memo);
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
    await Sleep.sleep(500);
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
betBaccarat = async (account, privatekey, quantity, memo, betarea, roundId, endtime, playerInfos, gameTable) => {
    console.log("======================当前下注"+account+"+"+quantity+"+"+memo);
    for (let i = 0; i <playerInfos.rows.length ; i++) {
        gameplayer=await playerInfos.rows[i].player;
        console.log("======================gameplayer"+gameplayer);
        if (account===gameplayer){
            newplayer=true;
        }
    }
    if (newplayer===true){
        return
    }
    let promise;
    let status = await gameTable.rows[0].status;
    // let currenttime = await time.networktime();
    // console.log("当前网络时间" + currenttime);
    // let bettime = Number(endtime * 1000 - currenttime);
    // let newtime=Math.abs(bettime);
    Sleep.sleep(500);
    console.log("privatekey:======================当前私钥"+privatekey);
    let mykey = await Dbutils.myaikey(privatekey);
    // console.log("=========="+mykey);
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
                                to: "baccarat.e",
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
                        console.log("bet_result:"+bet_result);
                        console.log("result:"+bet_result);
                        //保存结果
                        count++;
                        console.log("=============" + count + quantity);
                        // await Fileoperation.save(count, parseInt(quantity));
                        // await Fileoperation.saveBetData(count, parseInt(quantity));
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
        console.log("Game is no longer active"+e)
    }
    newplayer=false;
    return promise;
};
let gameplayer;
let newplayer=false;
_betBaccarat = async (account, privatekey, quantity, memo, betarea, roundId, endtime, playerInfos, gameTable) => {
    console.log("======================当前下注"+account+"+"+quantity+"+"+memo);
    for (let i = 0; i <playerInfos.rows.length ; i++) {
        gameplayer=await playerInfos.rows[i].player;
        console.log("======================gameplayer"+gameplayer);
        if (account===gameplayer){
            newplayer=true;
        }
    }
    if (newplayer===true){
        return
    }
    let promise;
    let status = await gameTable.rows[0].status;
    let currenttime = await time.networktime();
    // console.log("当前网络时间" + currenttime);
    let bettime = Number(endtime * 1000 - currenttime);
        if (bettime<5)
        {
            return
        }
        //再次检查账户是否在player中
    // let newtime=Math.abs(bettime);

        await Sleep.sleep(500);
        console.log("privatekey:======================当前加密前私钥"+privatekey);
        // let mykey = await Dbutils.myaikey(privatekey);
        let mykey = await CryptoUtil.privateDecrypt(privatekey);
        console.log("===================================================="+mykey);
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
                                    to: "baccarat.e",
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
                            console.log("bet_result:"+bet_result);
                            console.log("result:"+bet_result);
                            //保存结果
                            count++;
                            console.log("=============" + count + quantity);
                            // await Fileoperation.save(count, parseInt(quantity));
                            // await Fileoperation.saveBetData(count, parseInt(quantity));
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
            console.log("Game is no longer active"+e)
        }
    newplayer=false;
    return promise;
};

module.exports={_bet,betBaccarat,_betBaccarat};