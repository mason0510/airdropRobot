let request= require('request');
//获取当前的轮次
getGameTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
        await request.post('https://proxy.eosnode.tools/v1/chain/get_table_rows', {
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
        })
    });
    return promise;
};

getPlayerTable=async ()=>{
    // console.log("==============");
    let promise=new Promise(async resolve => {
        await request.post('https://proxy.eosnode.tools/v1/chain/get_table_rows', {
            json: {
                code: 'warofstar.e',
                table:"bets",
                scope:"warofstar.e",
                json:true
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
        })
    });
    return promise;
};


module.exports={getGameTable,getPlayerTable};

// let body=async()=>{
//     try {
//         let body=await getPlayerTable();
//         console.log(body.rows[0].player)
//      //   let player1=body.rows[0].player;
//     }catch (e) {
//         console.log(e)
//     }
//
//
// }
// body()