let request= require('request');
let constants=require('../utils/constants');
//获取当前的轮次
getGameTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
               await request.post(constants.url1+'/v1/chain/get_table_rows', {
                   json: {
                       code: 'warofstar.e',
                       table:"gametable",
                       scope:"warofstar.e",
                       json:true
                   }
               }, async (error, res, body) => {
                   if (!error&&res.statusCode===200) {
                       console.log(`statusCode: ${res.statusCode}`);
                       // let gamestatus =await body.rows[0].status;
                       // let end_time=await body.rows[0].end_time;
                       // let roundId=await body.rows[0].id;
                        resolve(body);
                   }

               })
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
             if (!error&&res.statusCode===200) {
                // console.log(body)
                 /**
                  *    [ { id: 39078,
       game_id: 11154,
       player: 'happylilyyyy',
       referer: 'houseaccount',
       bet: '1.0000 EOS',
       bet_type: 4 } ],
                  */
                 console.log(`statusCode: ${res.statusCode}`);
                  resolve(body);
             }
         })
        });
    return promise;
};
// getPlayerTable=async ()=>{
//     // console.log("==============");
//     let promise=new Promise(async resolve => {
//        // await process.on("err", async () => {
//             await request.post(constants.url3+'/v1/chain/get_table_rows', {
//                 json: {
//                     code: 'warofstar.e',
//                     table: "bets",
//                     scope: "warofstar.e",
//                     json: true
//                 }
//             }, async (error, res, body) => {
//                 console.log("========="+body.rows[0]);
//                 if (!error&&res===200) {
//                     console.log(`statusCode: ${res.statusCode}`);
//                     return resolve(body);
//                 }
//             })
//         // });
//     })
//     return promise;
// };

getPlayerInComeTable=async ()=>{
    let promise=new Promise(async resolve => {
            await request.post(constants.url1+'/v1/chain/get_table_rows', {
                json: {
                    code: 'warofstar.e',
                    table: "bets",
                    scope: "warofstar.e",
                    json: true
                }
            }, async (error, res, body) => {
                if (!error&&res===200) {
                    console.log(`statusCode: ${res.statusCode}`);
                    return resolve(body);
                }

            })
        });
    return promise;
};


module.exports={getGameTable,getPlayerTable,getPlayerInComeTable};

let body=async()=>{
    try {
        let body=await getPlayerTable();
        console.log(body)
        // if (body.rows.length!==0){
        //     // console.log(body.rows[0].player)
        //     //   let player1=body.rows[0].player;
        //     console.log("结束时间"+body.rows[0].end_time);
        //     console.log("当前时间"+parseInt(Date.now()/1000));
        // }
    }catch (e) {
        console.log(e)
    }


}
body()