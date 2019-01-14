let request= require('request');
let constants=require('../utils/constants');
//获取当前的轮次
getGameTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
          // await process.on("err",async()=>{
               await request.post(constants.url1+'/v1/chain/get_table_rows', {
                   json: {
                       code: 'warofstar.e',
                       table:"gametable",
                       scope:"warofstar.e",
                       json:true
                   }
               }, async (error, res, body) => {
                   if (error) {
                       console.error(error)
                       return
                   }
                   console.log(`statusCode: ${res.statusCode}`);
                   // let gamestatus =await body.rows[0].status;
                   // let end_time=await body.rows[0].end_time;
                   // let roundId=await body.rows[0].id;
                   return resolve(body);
               }).on("error", function(error) {
                   console.log("Error: Unable to get " + url, "#ff0000");
                   console.log(error, "#ff0000");
                   callback(null);
               });
           // })

    }).catch(async error=>{
        console.log(error);
        await request.post(constants.url2+'/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table:"gametable",
                scope:"warofstar.e",
                json:true
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`);
            // let gamestatus =await body.rows[0].status;
            // let end_time=await body.rows[0].end_time;
            // let roundId=await body.rows[0].id;
            return resolve(body);
        }).on("error", function(error) {
            console.log("Error: Unable to get " + url, "#ff0000");
            console.log(error, "#ff0000");
            callback(null);
        });
    });
    return promise;
};

getPlayerTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
   // await  process.on("err", async () => {
         await request.post(constants.url1+'/v1/chain/get_table_rows', {
             json: {
                 code: 'warofstar.e',
                 table: "bets",
                 scope: "warofstar.e",
                 json: true
             }
         }, async (error, res, body) => {
             if (error) {
                 console.error(error)
                 return
             }
             console.log(`statusCode: ${res.statusCode}`);
             return resolve(body);
         })
        }).catch(async error=>{
        await request.post(constants.url2+'/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table: "bets",
                scope: "warofstar.e",
                json: true
            }
        }, async (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`);
            return resolve(body);
        }).on("error", function(error) {
            console.log("Error: Unable to get " + url, "#ff0000");
            console.log(error, "#ff0000");
            callback(null);
        });
    });

    return promise;
};


getPlayerTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
       // await process.on("err", async () => {
            await request.post(constants.url1+'/v1/chain/get_table_rows', {
                json: {
                    code: 'warofstar.e',
                    table: "bets",
                    scope: "warofstar.e",
                    json: true
                }
            }, async (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                // [ { id: 33305,
                //     game_id: 7748,
                //     player: 'yiyiranranfc',
                //     referer: 'houseaccount',
                //     bet: '0.5000 EOS',
                //     bet_type: 2 } ],
                console.log(`statusCode: ${res.statusCode}`);
                // let gamestatus =await body.rows[0].status;
                // let end_time=await body.rows[0].end_time;
                // let roundId=await body.rows[0].id;
                //console.log(body.rows[0].player);
                return resolve(body);
            }).on("error", function(error) {
                console.log("Error: Unable to get " + url, "#ff0000");
                console.log(error, "#ff0000");
                callback(null);
            });


        // });
    }).catch(error=>{
        console.log(error);
    })
    return promise;
};

getPlayerInComeTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
            await request.post(constants.url1+'/v1/chain/get_table_rows', {
                json: {
                    code: 'warofstar.e',
                    table: "bets",
                    scope: "warofstar.e",
                    json: true
                }
            }, async (error, res, body) => {
                if (error) {
                    return
                }
                // [ { id: 33305,
                //     game_id: 7748,
                //     player: 'yiyiranranfc',
                //     referer: 'houseaccount',
                //     bet: '0.5000 EOS',
                //     bet_type: 2 } ],
                console.log(`statusCode: ${res.statusCode}`);
                // let gamestatus =await body.rows[0].status;
                // let end_time=await body.rows[0].end_time;
                // let roundId=await body.rows[0].id;
                //console.log(body.rows[0].player);
                return resolve(body);
            })
        }).catch(async error=>{
        await request.post(constants.url2+'/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table: "bets",
                scope: "warofstar.e",
                json: true
            }
        }, async (error, res, body) => {
            if (error) {
                return
            }
            // [ { id: 33305,
            //     game_id: 7748,
            //     player: 'yiyiranranfc',
            //     referer: 'houseaccount',
            //     bet: '0.5000 EOS',
            //     bet_type: 2 } ],
            console.log(`statusCode: ${res.statusCode}`);
            // let gamestatus =await body.rows[0].status;
            // let end_time=await body.rows[0].end_time;
            // let roundId=await body.rows[0].id;
            //console.log(body.rows[0].player);
            return resolve(body);
        }).on("error", function(error) {
            console.log("Error: Unable to get " + url, "#ff0000");
            console.log(error, "#ff0000");
            callback(null);
        });
    });
    return promise;
};


module.exports={getGameTable,getPlayerTable,getPlayerInComeTable};

// let body=async()=>{
//     try {
//         let body=await getGameTable();
//         if (body.rows.length!==0){
//             // console.log(body.rows[0].player)
//             //   let player1=body.rows[0].player;
//             console.log("结束时间"+body.rows[0].end_time);
//             console.log("当前时间"+parseInt(Date.now()/1000));
//         }
//     }catch (e) {
//         console.log(e)
//     }
//
//
// }
// body()