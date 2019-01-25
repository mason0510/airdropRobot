// tableInfo.js
const request = require('superagent');
let constants = require('../utils/constants');
let Sleep = require('../utils/sleep'); //

//获取进行中的游戏列表
getGameTable = async () => {
    // console.log("test========begin");
    let promise = new Promise(async resolve => {
        await request.post(constants.url1 + '/v1/chain/get_table_rows').timeout({
            deadline: constants.deadlineTime,
            response: constants.responseTime,
        }).send({
            code: constants.code[3],
            table: constants.gamestable[0],
            scope: constants.scope[3],
            json: true
        }).then(async res => {
            //req header status text 
            //console.log(JSON.stringify(res.body));
            await resolve(res.body);
        }, async err => {
            if (err.timeout) {
                //超时 一分钟之后再连接 
// await Sleep.sleep(60000); 
            } else {                        //其他错误 不处理 
            }
        })
    });
    return promise;
};

//获取玩家列表
getPlayerTable = async () => {
    // console.log("=========begin");
    let promise = new Promise(async resolve => {
        await request.post('https://eu.eosdac.io/v1/chain/get_table_rows').timeout({
            deadline: constants.deadlineTime,
            response: constants.responseTime
        }).send({
            code: constants.code[3],
            table: constants.gamestable[1],
            scope: constants.scope[3],
            json: true
        }).then(async res => {
            //let body = JSON.stringify(res);
          //  console.log(res.body);
            resolve(res.body);
        }, async err => {
            if (err.timeout) {
                //await Sleep.sleep(1000);
            } else {                     //其他错误不处理 
            }
        })
    });
    return promise;
};
baccarat_getGameTable = async () => {
    // console.log("test========begin");
    let promise = new Promise(async resolve => {
        await request.post(constants.url1 + '/v1/chain/get_table_rows').timeout({
            deadline: constants.deadlineTime,
            response: constants.responseTime,
        }).send({
            code: constants.code[3],
            table: constants.gamestable[0],
            scope: constants.scope[3],
            json: true
        }).then(async res => {
            //req header status text 
            //console.log(JSON.stringify(res.body));
            await resolve(res.body);
        }, async err => {
            if (err.timeout) {
                //超时 一分钟之后再连接 
// await Sleep.sleep(60000); 
            } else {                        //其他错误 不处理 
            }
        })
    });
    return promise;
};

baccarat_getPlayerTable = async () => {
    // console.log("=========begin");
    let promise = new Promise(async resolve => {
        await request.post('https://eu.eosdac.io/v1/chain/get_table_rows').timeout({
            deadline: constants.deadlineTime,
            response: constants.responseTime
        }).send({
            code: constants.code[3],
            table: constants.gamestable[1],
            scope: constants.scope[3],
            json: true
        }).then(async res => {
            //let body = JSON.stringify(res);
            //  console.log(res.body);
            resolve(res.body);
        }, async err => {
            if (err.timeout) {
                //await Sleep.sleep(1000);
            } else {                     //其他错误不处理 
            }
        })
    });
    return promise;
};


module.exports={getGameTable,getPlayerTable,baccarat_getGameTable,baccarat_getPlayerTable};





